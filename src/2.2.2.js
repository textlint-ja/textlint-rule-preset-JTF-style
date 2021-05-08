// LICENSE : MIT
"use strict";
import { isUserWrittenNode } from "./util/node-util";
import ja2num from "japanese-numerals-to-number";

function matchToReplace(text, pattern, matchFn) {
    var match = pattern.exec(text);
    if (match) {
        return matchFn(text, pattern, match);
    }
    return null;
}

// http://www.drk7.jp/MT/archives/001587.html
function _num2ja(num, opt) {
    var sign = {
        "+": "",
        "-": "−"
    };
    var zero = "零";
    var point = "点";
    var zero2nine = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    var ten2thou = ["", "十", "百", "千"];
    var suffices = [
        "",
        "万",
        "億",
        "兆",
        "京",
        "垓",
        "禾予",
        "穣",
        "溝",
        "澗",
        "正",
        "載,",
        "極",
        "恒河沙",
        "阿僧祇",
        "那由他",
        "不可思議",
        "無量大数"
    ];

    num = num.replace(/,/g, "");
    num.match(/([+-])?(\d+)(?:\.(\d+))?/i);
    var sig = RegExp.$1;
    var int = RegExp.$2;
    var fract = RegExp.$3;
    var seisuu = "";
    var shins = [];

    for (let i = int.length; i > 0; i -= 4) {
        shins.push(int.substring(i, i - 4));
    }
    if (shins.length >= 18) {
        return suffices[17];
    }

    var suffix = 0;
    for (let i = 0; i < shins.length; i++) {
        var shin = shins[i];
        if (shin == "0000") {
            suffix++;
            continue;
        }
        var sens = "";
        var keta = 0;
        var digits = shin.split("").reverse();
        for (var j = 0; j < digits.length; j++) {
            var digit = digits[j];

            if (opt["fixed4"] || opt["with_arabic"]) {
                if (opt["with_arabic"]) {
                    var flg = 0;
                    // 余分な 0 を削除する
                    if (digit == "0") {
                        for (var k = j + 1; k < digits.length; k++) {
                            flg += digits[k] == "0" ? 0 : 1;
                        }
                        if (flg == 0) {
                            digit = "";
                        }
                    }
                    sens = digit + sens;
                } else {
                    sens = zero2nine[digit] + sens;
                }
            } else {
                var suuji = digit == 1 && !opt["p_one"] && keta > 0 ? "" : zero2nine[digit];
                if (digit != 0) {
                    sens = suuji + ten2thou[keta] + sens;
                }
            }
            keta++;
        }
        seisuu = sens + suffices[suffix++] + seisuu;
    }
    var result = (sign[sig] || "") + seisuu;
    result = result || zero;
    if (fract) {
        result = result + point + fract;
    }
    return result;
}

function reporter(context) {
    let { Syntax, RuleError, report, fixer, getSource } = context;
    return {
        [Syntax.Str](node) {
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            const text = getSource(node);
            // 漢数字 -> 算用数字
            const toNumber = (text, pattern, match) => {
                const matchedString = match[0];
                const index = match.index;
                const expected = matchedString.replace(pattern, function (all, match) {
                    return all.replace(match, ja2num(match));
                });
                const ruleError = new RuleError(
                    `${matchedString} => ${expected}
数量を表現し、数を数えられるものは算用数字を使用します。任意の数に置き換えても通用する語句がこれに該当します。`,
                    {
                        index: index,
                        fix: fixer.replaceTextRange([index, index + matchedString.length], expected)
                    }
                );
                report(node, ruleError);
            };

            /**
             * 算用数字 -> 漢数字
             * @param {string} text
             * @param {RegExp} pattern
             * @param {*[]} match
             */
            const toKanNumber = (text, pattern, match) => {
                const matchedString = match[0];
                const expected = matchedString.replace(pattern, function (all, match) {
                    return all.replace(match, _num2ja(match, { with_arabic: false }));
                });
                const index = match.index;
                report(
                    node,
                    new RuleError(
                        `${matchedString} => ${expected}
慣用的表現、熟語、概数、固有名詞、副詞など、漢数字を使用することが一般的な語句では漢数字を使います。`,
                        {
                            index: index,
                            fix: fixer.replaceTextRange([index, index + matchedString.length], expected)
                        }
                    )
                );
            };

            // ignorePatternにマッチしたらmatchFnを呼ばないようにする(エラーを無視する)
            const ignoreWhenMatched = (ignorePatterns, matchFn) => {
                return (text, pattern, match) => {
                    if (ignorePatterns.some((p) => p.test(text))) {
                        return null;
                    } else {
                        return matchFn(text, pattern, match);
                    }
                };
            };

            // ＊数えられる数字は算用数字を使う
            // 数十万、数百億にマッチしないように"数"という文字から始まるものは除外
            // https://github.com/textlint-ja/textlint-rule-preset-jtf-style/pull/23
            matchToReplace(
                text,
                /([一二三四五六七八九十壱弐参拾百〇]+)[兆億万]/g,
                ignoreWhenMatched([/(数|何)([一二三四五六七八九十壱弐参拾百〇]+)[兆億万]/g], toNumber)
            );
            matchToReplace(
                text,
                /([一二三四五六七八九十壱弐参拾百〇]+)つ/g,
                ignoreWhenMatched(
                    [
                        /[一二三四五六七八九]つ(返事|子|ひとつ|星|編|葉|橋|と[無な]い|に一つ)/g,
                        /(ただ|唯|[女男]手|穴|瓜|馬鹿の)[一二]つ/g
                    ],
                    toNumber
                )
            );
            matchToReplace(text, /([一二三四五六七八九十壱弐参拾百〇]+)回/g, toNumber);
            matchToReplace(text, /([一二三四五六七八九十壱弐参拾百〇]+)か月/g, toNumber);
            matchToReplace(text, /([一二三四五六七八九十壱弐参拾百〇]+)番目/g, toNumber);
            matchToReplace(text, /([一二三四五六七八九十壱弐参拾百〇]+)進法/g, toNumber);
            matchToReplace(text, /([一二三四五六七八九十壱弐参拾百〇]+)次元/g, toNumber);
            matchToReplace(text, /第([一二三四五六七八九十壱弐参拾百〇]+)章/g, toNumber);
            matchToReplace(text, /第([一二三四五六七八九十壱弐参拾百〇]+)節/g, toNumber);
            // ＊漢数字を使う
            // 慣用的表現、熟語、概数、固有名詞、副詞など、漢数字を使用することが一般的な語句では漢数字を使います。
            matchToReplace(text, /世界(1)/g, toKanNumber);
            matchToReplace(text, /(1)時的/g, toKanNumber);
            matchToReplace(text, /(1)部分/g, toKanNumber);
            matchToReplace(text, /第(3)者/g, toKanNumber);
            // 1種 -> 一種: 11種類などにはマッチしない
            matchToReplace(text, /[^\d](1)種(?!類)/g, toKanNumber);
            matchToReplace(text, /(1)部の/g, toKanNumber);
            matchToReplace(text, /(1)番に/g, toKanNumber);
            matchToReplace(text, /数(10+)倍/g, toKanNumber);
            matchToReplace(text, /数(10+)[兆億万]/g, toKanNumber);
            matchToReplace(text, /数(10+)年/g, toKanNumber);
            matchToReplace(text, /([0-9]+)次関数/g, toKanNumber);
            matchToReplace(text, /(5)大陸/g, toKanNumber);
        }
    };
}

// 2.2.2. 算用数字と漢数字の使い分け
module.exports = {
    linter: reporter,
    fixer: reporter
};
