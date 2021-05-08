// LICENSE : MIT
"use strict";
import regx from "regx";
import { japaneseRegExp } from "./util/regexp";
import { matchCaptureGroupAll } from "match-index";
import mergeMatches from "./util/merge-matches";
const rx = regx("g");
/*
1.2.1. 句点(。)と読点(、)
句読点には全角の「、」と「。」を使います。和文の句読点としてピリオド(.)とカンマ(,)を使用しません。
「4.1.1 句点(。)」と「4.1.2 読点(、)」を参照してください。
 */
import { isUserWrittenNode } from "./util/node-util";

// [,.]{日本語}
const leftTarget = rx`
        ([,\.])
        ${japaneseRegExp}
    `;
// {日本語}[,.]
const rightTarget = rx`
        ${japaneseRegExp}
        ([,\.])
    `;
// . => 。 の置換マップ
const replaceSymbol = {
    ".": "。",
    ",": "、"
};

const reporter = (context) => {
    let { Syntax, RuleError, report, fixer, getSource } = context;
    return {
        [Syntax.Str](node) {
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            const text = getSource(node);
            const leftMatches = matchCaptureGroupAll(text, leftTarget);
            const rightMatches = matchCaptureGroupAll(text, rightTarget);
            const matches = mergeMatches(leftMatches, rightMatches);
            matches.forEach((match) => {
                const symbol = replaceSymbol[match.text];
                const indexOfSymbol = match.index;
                report(
                    node,
                    new RuleError(
                        "句読点には全角の「、」と「。」を使います。和文の句読点としてピリオド(.)とカンマ(,)を使用しません。",
                        {
                            index: indexOfSymbol,
                            fix: fixer.replaceTextRange([indexOfSymbol, indexOfSymbol + 1], symbol)
                        }
                    )
                );
            });
        }
    };
};
module.exports = {
    linter: reporter,
    fixer: reporter
};
