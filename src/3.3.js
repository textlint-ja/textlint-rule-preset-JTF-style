// LICENSE : MIT
"use strict";
/*
3.3. かっこ類と隣接する文字の間のスペースの有無
かっこの外側、内側ともにスペースを入れません。
 */
import { isUserWrittenNode } from "./util/node-util";
import { matchCaptureGroupAll } from "match-index";

const brackets = ["\\[", "\\]", "（", "）", "［", "］", "「", "」", "『", "』"];

const leftBrackets = brackets.map((bracket) => {
    return new RegExp("([ 　])" + bracket, "g");
});
const rightBrackets = brackets.map((bracket) => {
    return new RegExp(bracket + "([ 　])", "g");
});
function reporter(context) {
    let { Syntax, RuleError, report, fixer, getSource } = context;
    return {
        [Syntax.Str](node) {
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            const text = getSource(node);
            // 左にスペース
            leftBrackets.forEach((pattern) => {
                matchCaptureGroupAll(text, pattern).forEach((match) => {
                    const { index } = match;
                    report(
                        node,
                        new RuleError("かっこの外側、内側ともにスペースを入れません。", {
                            index: index,
                            fix: fixer.replaceTextRange([index, index + 1], "")
                        })
                    );
                });
            });
            // 右にスペース
            rightBrackets.forEach((pattern) => {
                matchCaptureGroupAll(text, pattern).forEach((match) => {
                    const { index, text } = match;
                    report(
                        node,
                        new RuleError("かっこの外側、内側ともにスペースを入れません。", {
                            index: index,
                            fix: fixer.replaceTextRange([index, index + 1], "")
                        })
                    );
                });
            });
        }
    };
}
module.exports = {
    linter: reporter,
    fixer: reporter
};
