// LICENSE : MIT
"use strict";
/*
4.3.1.丸かっこ（）
直前の内容を補足して説明する場合や言い換える場合に使用します。
全角のかっこを使用します
 */
import { isUserWrittenNode } from "./util/node-util";
import { matchCaptureGroupAll } from "match-index";
import regx from "regx";
import { japaneseRegExp } from "./util/regexp";
const rx = regx("g");

const replaceSymbol = (symbol) => {
    var newSymbol = {
        "(": "（",
        ")": "）"
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
            // 半角のかっこ()は使用しないで全角のかっこを使用する
            const text = getSource(node);
            const matchRegExps = [
                // FIXME: https://github.com/textlint-ja/textlint-rule-preset-JTF-style/issues/79
                // rx`([\(\)])(?:${japaneseRegExp}+)([\(\)])`,
                // rx`([\(\)])(?:${japaneseRegExp})`,
                rx`(?:${japaneseRegExp})([\(\)])`
            ];
            matchRegExps.forEach((matchRegExp) => {
                matchCaptureGroupAll(text, matchRegExp).forEach((match) => {
                    const { index } = match;
                    report(
                        node,
                        new RuleError("半角のかっこ()が使用されています。全角のかっこ（）を使用してください。", {
                            index: index,
                            fix: fixer.replaceTextRange([index, index + 1], replaceSymbol(match.text))
                        })
                    );
                });
            });
        }
    };
}
module.exports = {
    linter: reporter,
    fixer: reporter
};
