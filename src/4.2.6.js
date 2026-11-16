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
import { japaneseRegExp } from "./util/regexp";
import mergeMatches from "./util/merge-matches";
const rightRegExp = new RegExp(`${japaneseRegExp.source}(\\-)`, "g");
const leftRegExp = new RegExp(`(\\-)${japaneseRegExp.source}`, "g");
module.exports = function (context) {
    let { Syntax, RuleError, report, getSource } = context;
    return {
        [Syntax.Str](node) {
            const text = getSource(node);
            // ハイフンがないなら、どのパターンにもマッチしない
            if (text.indexOf("-") === -1) {
                return;
            }
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            // 和文ではハイフン(-)を使用しません
            // right
            const rightMatches = matchCaptureGroupAll(text, rightRegExp);
            // left
            const leftMatches = matchCaptureGroupAll(text, leftRegExp);
            const matches = mergeMatches(leftMatches, rightMatches);
            matches.forEach((match) => {
                const { index } = match;
                // 数値の符号としてのハイフンは許可する
                const nextChar = text[index + 1];
                if (nextChar && /[0-9]/.test(nextChar)) {
                    return;
                }
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
