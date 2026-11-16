// LICENSE : MIT
"use strict";
/*
4.2.8.セミコロン(;)
原則として和文ではセミコロン(;)を使用しません。
原文でセミコロンが使われている場合も、和文では使用しません。
 */
import { isUserWrittenNode } from "./util/node-util";
import { matchCaptureGroupAll } from "match-index";
import { japaneseRegExp } from "./util/regexp";
// "和文;" というような半角;は使用しない
const matchRegExp = new RegExp(`(?:${japaneseRegExp.source})(;)`, "g");
module.exports = function (context) {
    let { Syntax, RuleError, report, getSource } = context;
    return {
        [Syntax.Str](node) {
            const text = getSource(node);
            // 半角のセミコロンがないなら、マッチしない
            if (text.indexOf(";") === -1) {
                return;
            }
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            matchCaptureGroupAll(text, matchRegExp).forEach((match) => {
                const { index } = match;
                report(
                    node,
                    new RuleError("原則として和文ではセミコロン(;)を使用しません。", {
                        index: index
                    })
                );
            });
        }
    };
};
