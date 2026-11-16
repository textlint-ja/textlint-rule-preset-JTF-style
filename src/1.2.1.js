// LICENSE : MIT
"use strict";
import { japaneseRegExp } from "./util/regexp";
import { matchCaptureGroupAll } from "match-index";
import mergeMatches from "./util/merge-matches";
/*
1.2.1. 句点(。)と読点(、)
句読点には全角の「、」と「。」を使います。和文の句読点としてピリオド(.)とカンマ(,)を使用しません。
「4.1.1 句点(。)」と「4.1.2 読点(、)」を参照してください。
 */
import { isUserWrittenNode } from "./util/node-util";

// [,.]{日本語}
const leftTarget = new RegExp(`([,\\.])${japaneseRegExp.source}`, "g");
// {日本語}[,.]
const rightTarget = new RegExp(`${japaneseRegExp.source}([,\\.])`, "g");
// leftTarget か rightTarget のどちらかにマッチするかを1回で調べる
const anyTarget = new RegExp(`[,\\.]${japaneseRegExp.source}|${japaneseRegExp.source}[,\\.]`);
// . => 。 の置換マップ
const replaceSymbol = {
    ".": "。",
    ",": "、"
};

const reporter = (context) => {
    let { Syntax, RuleError, report, fixer, getSource } = context;
    return {
        [Syntax.Str](node) {
            const text = getSource(node);
            // 半角のピリオドとカンマがないなら、どのパターンにもマッチしない
            if ((text.indexOf(",") === -1 && text.indexOf(".") === -1) || !anyTarget.test(text)) {
                return;
            }
            if (!isUserWrittenNode(node, context)) {
                return;
            }
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
