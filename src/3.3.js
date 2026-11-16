// LICENSE : MIT
"use strict";
/*
3.3. かっこ類と隣接する文字の間のスペースの有無
かっこの外側、内側ともにスペースを入れません。
 */
import { isUserWrittenNode } from "./util/node-util";
import { matchCaptureGroupAll } from "match-index";
import { japaneseRegExp } from "./util/regexp";

const brackets = ["\\(", "\\)", "\\[", "\\]", "（", "）", "［", "］", "「", "」", "『", "』"];
// 各パターンが必要とするかっこの文字
const bracketChars = brackets.map((bracket) => bracket.replace("\\", ""));
const leftBrackets = brackets.map((bracket) => {
    return new RegExp("([ 　])" + bracket, "g");
});
const rightBrackets = brackets.map((bracket) => {
    return new RegExp(bracket + "([ 　])", "g");
});
// かっこ類がない場合は、どのパターンにもマッチしない
const anyBracketRegExp = /[()[\]（）［］「」『』]/;
// かっこ類の左右にスペースが隣接していない場合は、leftBrackets / rightBrackets にマッチしない
const spaceBeforeBracketRegExp = /[ 　][()[\]（）［］「」『』]/;
const spaceAfterBracketRegExp = /[()[\]（）［］「」『』][ 　]/;
const hasSpaceBefore = (text, bracketChar) =>
    text.indexOf(" " + bracketChar) !== -1 || text.indexOf("　" + bracketChar) !== -1;
const hasSpaceAfter = (text, bracketChar) =>
    text.indexOf(bracketChar + " ") !== -1 || text.indexOf(bracketChar + "　") !== -1;
const leftHalfParentheses = new RegExp(`${japaneseRegExp.source}(\\()`, "g");
const rightHalfParentheses = new RegExp(`(\\))${japaneseRegExp.source}`, "g");
const defaultOptions = {
    allowOutsideHalfParentheses: true,
    requireOutsideHalfParentheses: false
};
function reporter(context, options) {
    let { Syntax, RuleError, report, fixer, getSource } = context;
    const allowOutsideHalfParentheses =
        options.allowOutsideHalfParentheses ?? defaultOptions.allowOutsideHalfParentheses;
    const requireOutsideHalfParentheses =
        options.requireOutsideHalfParentheses ?? defaultOptions.requireOutsideHalfParentheses;
    return {
        [Syntax.Str](node) {
            const text = getSource(node);
            if (!anyBracketRegExp.test(text)) {
                return;
            }
            const hasLeftSpace = spaceBeforeBracketRegExp.test(text);
            const hasRightSpace = spaceAfterBracketRegExp.test(text);
            // 半角かっこの外側のスペースを必須にする場合は、スペースがなくてもエラーになる
            if (!hasLeftSpace && !hasRightSpace && !requireOutsideHalfParentheses) {
                return;
            }
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            // 左にスペース
            leftBrackets.forEach((pattern, i) => {
                if (!hasLeftSpace || !hasSpaceBefore(text, bracketChars[i])) {
                    return;
                }
                matchCaptureGroupAll(text, pattern).forEach((match) => {
                    const { index } = match;
                    if (allowOutsideHalfParentheses && text.substring(index, index + 2) === " (") {
                        return;
                    }
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
            rightBrackets.forEach((pattern, i) => {
                if (!hasRightSpace || !hasSpaceAfter(text, bracketChars[i])) {
                    return;
                }
                matchCaptureGroupAll(text, pattern).forEach((match) => {
                    const { index } = match;
                    if (allowOutsideHalfParentheses && text.substring(index - 1, index + 1) === ") ") {
                        return;
                    }
                    report(
                        node,
                        new RuleError("かっこの外側、内側ともにスペースを入れません。", {
                            index: index,
                            fix: fixer.replaceTextRange([index, index + 1], "")
                        })
                    );
                });
            });
            if (requireOutsideHalfParentheses) {
                // 左にスペース必須
                matchCaptureGroupAll(text, leftHalfParentheses).forEach((match) => {
                    const { index } = match;
                    report(
                        node,
                        new RuleError("半角かっこの外側に半角スペースが必要です。", {
                            index,
                            fix: fixer.replaceTextRange([index, index + 1], " " + match.text)
                        })
                    );
                });
                // 右にスペース必須
                matchCaptureGroupAll(text, rightHalfParentheses).forEach((match) => {
                    const { index } = match;
                    report(
                        node,
                        new RuleError("半角かっこの外側に半角スペースが必要です。", {
                            index,
                            fix: fixer.replaceTextRange([index, index + 1], match.text + " ")
                        })
                    );
                });
            }
        }
    };
}
module.exports = {
    linter: reporter,
    fixer: reporter
};
