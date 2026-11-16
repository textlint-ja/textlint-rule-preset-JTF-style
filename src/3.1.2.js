// LICENSE : MIT
"use strict";
import { isUserWrittenNode } from "./util/node-util";
import { matchAll } from "match-index";
import { japaneseRegExp } from "./util/regexp";
// 全角同士の間は半角スペースを入れない
const matchReg = new RegExp(`${japaneseRegExp.source}( )${japaneseRegExp.source}`, "g");
const matchRegTest = new RegExp(matchReg.source);
const katakakana = /[ァ-ヶ]( )[ァ-ヶ]/;
/*
3.1.2. 全角文字どうし

原則として、全角文字どうしの間にスペースを入れません。ただしカタカナ複合語の場合を除きます。
「2.1.7 カタカナ複合語」を参照してください。
 */
function reporter(context) {
    let { Syntax, RuleError, report, fixer, getSource } = context;
    return {
        [Syntax.Str](node) {
            const text = getSource(node);
            // 半角スペースがないなら、マッチしない
            if (text.indexOf(" ") === -1 || !matchRegTest.test(text)) {
                return;
            }
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            matchAll(text, matchReg).forEach((match) => {
                const { input, captureGroups } = match;
                // ただしカタカナ複合語の場合を除きます。
                if (katakakana.test(input)) {
                    return;
                }
                captureGroups.forEach((captureGroup) => {
                    const index = captureGroup.index;
                    report(
                        node,
                        new RuleError("原則として、全角文字どうしの間にスペースを入れません。", {
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
