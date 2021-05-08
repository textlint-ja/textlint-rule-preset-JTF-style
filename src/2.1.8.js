// LICENSE : MIT
"use strict";
/*
2.1.8.算用数字
算用数字は「半角」で表記します。
用途によっては全角を許容します。
ただし、表記をできるだけ統一するため、特別な理由がない限り半角での表記を原則とします。
 */
import { isUserWrittenNode } from "./util/node-util";
import moji from "moji";
import { matchCaptureGroupAll } from "match-index";
function toHankaku(string) {
    return moji(string).convert("ZE", "HE").toString();
}
function reporter(context) {
    let { Syntax, RuleError, report, fixer, getSource } = context;
    return {
        [Syntax.Str](node) {
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            const text = getSource(node);
            const matchRegExp = /([０-９]+)/;
            matchCaptureGroupAll(text, matchRegExp).forEach((match) => {
                const { index, text } = match;
                report(
                    node,
                    new RuleError("算用数字は「半角」で表記します。", {
                        index: index,
                        fix: fixer.replaceTextRange([index, index + text.length], toHankaku(text))
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
