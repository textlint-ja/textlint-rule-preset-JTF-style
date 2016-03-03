// LICENSE : MIT
"use strict";
/*
4.2.5.波線(〜)
数値の範囲を示す場合に使用します。
 */
import {isUserWrittenNode} from "./util/node-util";
import {matchCaptureGroupAll} from "./util/match-index";

function reporter(context) {
    let {Syntax, RuleError, report, fixer, getSource} = context;
    return {
        [Syntax.Str](node){
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            const text = getSource(node);
            // 和文で半角の?は利用しない
            const matchHanQuestion = /\d(~)\d/g;
            matchCaptureGroupAll(text, matchHanQuestion).forEach(match => {
                const {index} = match;
                report(node, new RuleError("数値の範囲を示す場合には全角の〜を使用します。", {
                    column: index,
                    fix: fixer.replaceTextRange([index, index + 1], "〜")
                }));
            });
        }
    };
}
export default {
    linter: reporter,
    fixer: reporter
}