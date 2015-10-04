// LICENSE : MIT
"use strict";
import {isUserWrittenNode} from "./util/node-util";
function matchToReplace(text, pattern, matchFn) {
    var match = text.match(pattern);
    if (match) {
        return matchFn(text, pattern, match);
    }
    return null
}

const numberMap = {
    "一": 1,
    "二": 2,
    "三": 3,
    "四": 4,
    "五": 5,
    "六": 6,
    "七": 7,
    "八": 8,
    "九": 9,
    "十": 10,
    "壱": 1,
    "弐": 2,
    "参": 3,
    "拾": 10,
    "百": 100,
    "〇": 0
};
const kanNumberMap = {
    "0": "〇",
    "1": "一",
    "2": "二",
    "3": "三",
    "4": "四",
    "5": "五",
    "6": "六",
    "7": "七",
    "8": "八",
    "9": "九",
    "０": "〇",
    "１": "一",
    "２": "二",
    "３": "三",
    "４": "四",
    "５": "五",
    "６": "六",
    "７": "七",
    "８": "八",
    "９": "九"
};
// 2.2.2. 算用数字と漢数字の使い分け
export default function (context) {
    let {Syntax, RuleError, report, getSource} = context;
    return {
        [Syntax.Str](node){
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            let text = getSource(node);
            // 漢数字 -> 算用数字
            let toNumber = (text, pattern, match) => {
                var expected = text.replace(pattern, function (all, match) {
                    let result = 0;
                    match.split("").forEach(kanNumber => {
                        result += numberMap[kanNumber];
                    });
                    return all.replace(match, result);
                });
                report(node, new RuleError(`${text} => ${expected}`));
            };


            function _num2ja(num, opt) {
                var sign = {
                    '+': '',
                    '-': '−'
                };
                var zero = '零';
                var point = '点';
                var zero2nine = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
                var ten2thou = ['', '十', '百', '千'];
                var suffices = [
                    '', '万', '億', '兆', '京', '垓', '禾予', '穣', '溝', '澗', '正', '載,', '極', '恒河沙', '阿僧祇', '那由他', '不可思議',
                    '無量大数'
                ];

                num = num.replace(/,/g, '');
                num.match(/([+-])?(\d+)(?:\.(\d+))?/i);
                var sig = RegExp.$1;
                var int = RegExp.$2;
                var fract = RegExp.$3;
                var seisuu = '';
                var shousuu = '';
                var shins = [];
                var counter = 0;

                for (let i = int.length; i > 0; i -= 4) {
                    shins.push(int.substring(i, i - 4));
                }
                if (shins.length >= 18) {
                    return suffices[17];
                }

                var suffix = 0;
                for (let i = 0; i < shins.length; i++) {
                    var shin = shins[i];
                    if (shin == '0000') {
                        suffix++;
                        continue;
                    }
                    var sens = '';
                    var keta = 0;
                    var digits = shin.split('').reverse();
                    for (var j = 0; j < digits.length; j++) {
                        var digit = digits[j];

                        if (opt['fixed4'] || opt['with_arabic']) {
                            if (opt['with_arabic']) {
                                var flg = 0;
                                // 余分な 0 を削除する
                                if (digit == '0') {
                                    for (var k = j + 1; k < digits.length; k++) {
                                        flg += (digits[k] == '0') ? 0 : 1;
                                    }
                                    if (flg == 0) {
                                        digit = '';
                                    }
                                }
                                sens = digit + sens;
                            } else {
                                sens = zero2nine[digit] + sens;
                            }
                        } else {
                            var suuji = (digit == 1 && !opt['p_one'] && keta > 0) ? '' : zero2nine[digit];
                            if (digit != 0) {
                                sens = suuji + ten2thou[keta] + sens
                            }
                        }
                        keta++;
                    }
                    seisuu = sens + suffices[suffix++] + seisuu;
                }
                var result = (sign[sig] || '') + seisuu;
                result = result || zero;
                if (fract) {
                    result = result + point + fract;
                }
                return result;
            }

            // 算用数字 -> 漢数字
            let toKanNumber = (text, pattern, match) => {
                var expected = text.replace(pattern, function (all, match) {
                    return all.replace(match, _num2ja(match, {'with_arabic': false}));
                });
                report(node, new RuleError(`${text} => ${expected}`));
            };

            matchToReplace(text,
                /([一二三四五六七八九十壱弐参拾百〇]+)[兆億万]/g, toNumber
            )
            ;
            matchToReplace(text, /([一二三四五六七八九十壱弐参拾百〇]+)つ/g, toNumber);
            matchToReplace(text, /([一二三四五六七八九十壱弐参拾百〇]+)回/g, toNumber);
            matchToReplace(text, /([一二三四五六七八九十壱弐参拾百〇]+)か月/g, toNumber);
            matchToReplace(text, /([一二三四五六七八九十壱弐参拾百〇]+)番目/g, toNumber);
            matchToReplace(text, /([一二三四五六七八九十壱弐参拾百〇]+)進法/g, toNumber);
            matchToReplace(text, /([一二三四五六七八九十壱弐参拾百〇]+)次元/g, toNumber);
            //  漢数字を使う
            matchToReplace(text, /世界([0-9]+)/g, toKanNumber);
            matchToReplace(text, /([0-9]+)時的/g, toKanNumber);
            matchToReplace(text, /([0-9]+)部分/g, toKanNumber);
            matchToReplace(text, /第([0-9]+)者/g, toKanNumber);
            matchToReplace(text, /([0-9]+)種/g, toKanNumber);
            matchToReplace(text, /([0-9]+)部の/g, toKanNumber);
            matchToReplace(text, /([0-9]+)番に/g, toKanNumber);
            matchToReplace(text, /([0-9]+)倍/g, toKanNumber);
            matchToReplace(text, /([0-9]+)次関数/g, toKanNumber);
            matchToReplace(text, /([0-9]+)大陸/g, toKanNumber);
        }
    }
}