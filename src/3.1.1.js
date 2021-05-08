// LICENSE : MIT
"use strict";
/*
3.1.1. 全角文字と半角文字の間
原則として、全角文字と半角文字の間にスペースを入れません。

。ただしカタカナ複合語の場合を除きます。「2.1.7 カタカナ複合語」を参照してください。
 */
import { isUserWrittenNode } from "./util/node-util";
import { matchCaptureGroupAll } from "match-index";
function reporter(context) {
    let { Syntax, RuleError, report, fixer, getSource } = context;
    return {
        [Syntax.Str](node) {
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            let text = getSource(node);
            // アルファベットと全角の間は半角スペースではない
            let betweenHanAndZen = matchCaptureGroupAll(
                text,
                /[A-Za-z0-9]( )(?:[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ])/
            );
            let betweenZenAndHan = matchCaptureGroupAll(
                text,
                /(?:[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ])( )[A-Za-z0-9]/
            );
            const reportMatch = (match) => {
                const { index } = match;
                report(
                    node,
                    new RuleError("原則として、全角文字と半角文字の間にスペースを入れません。", {
                        index: match.index,
                        fix: fixer.replaceTextRange([index, index + 1], "")
                    })
                );
            };
            betweenHanAndZen.forEach(reportMatch);
            betweenZenAndHan.forEach(reportMatch);
        }
    };
}
module.exports = {
    linter: reporter,
    fixer: reporter
};
