// LICENSE : MIT
"use strict";
import {isUserWrittenNode} from "./util/node-util";
import {matchAll} from "./util/match-index";

/*
3.1.2. 全角文字どうし

原則として、全角文字どうしの間にスペースを入れません。ただしカタカナ複合語の場合を除きます。
「2.1.7 カタカナ複合語」を参照してください。
 */
function reporter(context) {
    let {Syntax, RuleError, report, fixer, getSource} = context;
    return {
        [Syntax.Str](node){
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            const text = getSource(node);
            // 全角同士の間は半角スペースを入れない
            const matchReg = /(?:[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ])( )(?:[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ])/g;
            const katakakana = /[ァ-ヶ]( )[ァ-ヶ]/;
            matchAll(text, matchReg).forEach(match => {
                const {input, captureGroups} = match;
                // ただしカタカナ複合語の場合を除きます。
                if (katakakana.test(input)) {
                    return;
                }
                captureGroups.forEach(captureGroup => {
                    const index = captureGroup.index;
                    report(node, new RuleError("原則として、全角文字どうしの間にスペースを入れません。", {
                        column: index,
                        fix: fixer.replaceTextRange([index, index + 1], "")
                    }));
                });
            });
        }
    }
}
export default {
    linter: reporter,
    fixer: reporter
}