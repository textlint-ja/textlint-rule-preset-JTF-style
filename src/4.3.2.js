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
            const matchRegExp = rx`(?:${japaneseRegExp})([\[\]])`;
            matchCaptureGroupAll(text, matchRegExp).forEach((match) => {
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
