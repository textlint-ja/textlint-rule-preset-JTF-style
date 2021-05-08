// LICENSE : MIT
"use strict";
/*
4.2.7.コロン(：)
原則として和文ではコロン(:)を使用しません。
原文でコロンが使われている場合も、和文では使用しません。
ただし和文でも、見出し語とその説明の間にコロンを使う場合があります。使用する場合は全角で表記します。
 */
import { isUserWrittenNode } from "./util/node-util";
import { matchCaptureGroupAll } from "match-index";
import regx from "regx";
import { japaneseRegExp } from "./util/regexp";
const rx = regx("g");
function reporter(context) {
    let { Syntax, RuleError, report, fixer, getSource } = context;
    return {
        [Syntax.Str](node) {
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            const text = getSource(node);
            // "和文:" というような半角:は使用しない

            const matchHanQuestion = rx`(?:${japaneseRegExp})(:)`;
            matchCaptureGroupAll(text, matchHanQuestion).forEach((match) => {
                const { index } = match;
                report(
                    node,
                    new RuleError("コロン(：)を使用する場合は「全角」で表記します。", {
                        index: index,
                        fix: fixer.replaceTextRange([index, index + 1], "：")
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
