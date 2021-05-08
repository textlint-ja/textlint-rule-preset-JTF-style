// LICENSE : MIT
"use strict";
/*
2.1.10.算用数字の位取りの表記
桁区切りには「カンマ」、小数点には「ピリオド」を使います。
ただし桁区切りの「カンマ」は省略する場合があります。
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
            // 数字,で絞って
            let numberWithComma = /([\d,]+)/g;
            // 0,xxx な文字列を検出する
            let strictMatchReg = /^0+(,)\d+$/;
            let match;
            while ((match = numberWithComma.exec(text))) {
                // この段階では 10,000 も含まれている
                // ^0,xxx をだけを取り出す
                let matchedString = match[0];
                matchCaptureGroupAll(matchedString, strictMatchReg).forEach((subMatch) => {
                    const { index } = subMatch;
                    report(
                        node,
                        new RuleError("小数点には「ピリオド」を使います。", {
                            index: match.index + index,
                            fix: fixer.replaceTextRange([match.index + index, match.index + index + 1], ".")
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
