// LICENSE : MIT
"use strict";
/*
4.2.9.ダッシュ(-)
原則として和文ではダッシュ(-)を使用しません。
和文でダッシュを使用すると、電子文書として処理する際に不都合が生じる場合があります。

Note: ここでのダッシュはU+2012-U+2015とする
全角 —— のように使われてる事が多い
https://ja.wikipedia.org/wiki/%E3%83%80%E3%83%83%E3%82%B7%E3%83%A5_%28%E8%A8%98%E5%8F%B7%29
 */
import { isUserWrittenNode } from "./util/node-util";
import { matchCaptureGroupAll } from "match-index";
import { japaneseRegExp } from "./util/regexp";
// 和文でダッシュは使用しない
const matchRegExp = new RegExp(`(?:${japaneseRegExp.source})([\\u2012-\\u2015])`, "g");
const dashRegExp = /[\u2012-\u2015]/;
module.exports = function (context) {
    let { Syntax, RuleError, report, getSource } = context;
    return {
        [Syntax.Str](node) {
            const text = getSource(node);
            // ダッシュがないなら、マッチしない
            if (!dashRegExp.test(text)) {
                return;
            }
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            matchCaptureGroupAll(text, matchRegExp).forEach((match) => {
                const { index } = match;
                report(
                    node,
                    new RuleError("原則として和文ではダッシュ(―)を使用しません。", {
                        index
                    })
                );
            });
        }
    };
};
