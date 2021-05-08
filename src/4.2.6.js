// LICENSE : MIT
"use strict";
/*
4.2.6.ハイフン(-)
原則として和文ではハイフン(-)を使用しません。
使用する場合は半角で表記します。原文でハイフンが使われている場合も、和文では使用しません。
例外は、住所や電話番号の区切りに使う場合です。
 */
import { isUserWrittenNode } from "./util/node-util";
import { matchCaptureGroupAll } from "match-index";
import regx from "regx";
import { japaneseRegExp } from "./util/regexp";
import mergeMatches from "./util/merge-matches";
const rx = regx("g");
module.exports = function (context) {
    let { Syntax, RuleError, report, getSource } = context;
    return {
        [Syntax.Str](node) {
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            let text = getSource(node);
            // 和文ではハイフン(-)を使用しません
            // right
            const rightMatches = matchCaptureGroupAll(text, rx`${japaneseRegExp}(\-)`);
            // left
            const leftMatches = matchCaptureGroupAll(text, rx`(\-)${japaneseRegExp}`);
            const matches = mergeMatches(leftMatches, rightMatches);
            matches.forEach((match) => {
                const { index } = match;
                report(
                    node,
                    new RuleError(
                        `原則として和文ではハイフン(-)を使用しません。
例外は、住所や電話番号の区切りに使う場合です。`,
                        {
                            index: index
                        }
                    )
                );
            });
        }
    };
};
