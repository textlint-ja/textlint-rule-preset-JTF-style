// LICENSE : MIT
"use strict";
/*
4.3.2.大かっこ［］
コンピューターの画面用語などの特殊な表記で使用します。
全角の大かっこを使用します
 */
import { isUserWrittenNode } from "./util/node-util";
import { matchCaptureGroupAll } from "match-index";
import regx from "regx";
import { japaneseRegExp } from "./util/regexp";
const rx = regx("g");

const replaceSymbol = (symbol) => {
    var newSymbol = {
        "[": "［",
        "]": "］"
    }[symbol];
    if (!newSymbol) {
        throw new Error("fail to replace symbol");
    }
    return newSymbol;
};
function reporter(context) {
    let { Syntax, RuleError, report, fixer, getSource } = context;
    return {
        [Syntax.Str](node) {
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            // 半角のかっこ[]は使用しないで全角のかっこを使用する
            const text = getSource(node);
            // 日本語の前後どちらに隣接していても半角の大かっこにマッチする
            // (行頭や数字の後ろなど、前が日本語でない開きかっこも修正対象にする)
            const matchRegExpAfterJapanese = rx`(?:${japaneseRegExp})([\[\]])`;
            const matchRegExpBeforeJapanese = rx`([\[\]])(?=${japaneseRegExp})`;
            // 両側が日本語のかっこは両方の正規表現にマッチするため、indexで重複を除く
            const reportedIndexes = new Set();
            const matches = [
                ...matchCaptureGroupAll(text, matchRegExpAfterJapanese),
                ...matchCaptureGroupAll(text, matchRegExpBeforeJapanese)
            ];
            matches.forEach((match) => {
                if (reportedIndexes.has(match.index)) {
                    return;
                }
                reportedIndexes.add(match.index);
                const { index } = match;
                report(
                    node,
                    new RuleError("半角の大かっこ[]が使用されています。全角のかっこ［］を使用してください。", {
                        index: index,
                        fix: fixer.replaceTextRange([index, index + 1], replaceSymbol(match.text))
                    })
                );
            });
        }
    };
}
module.exports = {
    linter: reporter,
    fixer: reporter
};
