// LICENSE : MIT
"use strict";
/*
4.2.8.セミコロン(;)
原則として和文ではセミコロン(;)を使用しません。
原文でセミコロンが使われている場合も、和文では使用しません。
 */
import { isUserWrittenNode } from "./util/node-util";
import { matchCaptureGroupAll } from "match-index";
import regx from "regx";
import { japaneseRegExp } from "./util/regexp";
const rx = regx("g");
module.exports = function (context) {
    let { Syntax, RuleError, report, getSource } = context;
    return {
        [Syntax.Str](node) {
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            const text = getSource(node);
            // "和文;" というような半角;は使用しない
            const matchRegExp = rx`(?:${japaneseRegExp})(;)`;
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
