// LICENSE : MIT
"use strict";
/*

4.1.3. ピリオド(.)、カンマ(,)
ピリオド(.)とカンマ(,)は「半角」で表記します。
桁区切りのカンマ(,)、小数点のピリオド(.)、箇条書きの数字に 付加するピリオド(.)としても使用します。
和文の句読点としては使用しません。「1.2.2 ピリオド(.)とカンマ(,)」を 参照してください
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
            // 和文. はエラー
            const matchReg = /(?:[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ])(\.)/g;
            matchCaptureGroupAll(text, matchReg).forEach((match) => {
                const index = match.index;
                report(
                    node,
                    new RuleError("和文の句読点としてはピリオドを使用しません。", {
                        index: index,
                        fix: fixer.replaceTextRange([index, index + 1], "。")
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
