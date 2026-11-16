// LICENSE : MIT
"use strict";
/*
4.3.1.丸かっこ（）
直前の内容を補足して説明する場合や言い換える場合に使用します。
全角のかっこを使用します
 */
import { isUserWrittenNode } from "./util/node-util";
import { matchCaptureGroupAll } from "match-index";
import { japaneseRegExp } from "./util/regexp";
// 半角のかっこ()は使用しないで全角のかっこを使用する
const matchRegExps = [
    new RegExp(`([\\(\\)])(?:.*${japaneseRegExp.source}.*)([\\(\\)])`, "g"),
    new RegExp(`(?:${japaneseRegExp.source})([\\(\\)])(?:${japaneseRegExp.source})`, "g"),
    new RegExp(`^(\\()(?:${japaneseRegExp.source})`, "g"),
    new RegExp(`(?:${japaneseRegExp.source})(\\))$`, "g")
];

/**
 * 1つ目のパターン(かっこ...和文...かっこ)がマッチしうるかを返す
 * 最初のかっこと最後のかっこの間に和文の文字がない場合は、マッチしない
 * `.*` のバックトラックが重いので、先に調べる
 */
const hasJapaneseBetweenParentheses = (text) => {
    const firstOpen = text.indexOf("(");
    const firstClose = text.indexOf(")");
    const first = firstOpen === -1 ? firstClose : firstClose === -1 ? firstOpen : Math.min(firstOpen, firstClose);
    const last = Math.max(text.lastIndexOf("("), text.lastIndexOf(")"));
    if (first === last) {
        return false;
    }
    return japaneseRegExp.test(text.slice(first + 1, last));
};

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
            const text = getSource(node);
            // 半角のかっこがないなら、どのパターンにもマッチしない
            if (text.indexOf("(") === -1 && text.indexOf(")") === -1) {
                return;
            }
            // どのパターンも和文の文字を含むので、和文の文字がないならマッチしない
            if (!japaneseRegExp.test(text)) {
                return;
            }
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            const skipFirstPattern = !hasJapaneseBetweenParentheses(text);
            matchRegExps.forEach((matchRegExp, i) => {
                if (i === 0 && skipFirstPattern) {
                    return;
                }
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
