// LICENSE : MIT
"use strict";
import {isUserWrittenNode} from "./util/node-util";
/*
3.1.2. 全角文字どうし

原則として、全角文字どうしの間にスペースを入れません。ただしカタカナ複合語の場合を除きます。
「2.1.7 カタカナ複合語」を参照してください。
 */
export default function (context) {
    let {Syntax, RuleError, report, getSource} = context;
    return {
        [Syntax.Str](node){
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            let text = getSource(node);
            // 全角同士の間は半角スペースを入れない
            let matchReg = /([\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ]) ([\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ])/g;
            let katakakana = /[ァ-ヶ] [ァ-ヶ]/;
            if (matchReg.test(text)) {
                var matches = text.match(matchReg);
                matches.forEach(match => {
                    // ただし、カタカナ同士は例外
                    if (!katakakana.test(match)) {
                        report(node, new RuleError("原則として、全角文字どうしの間にスペースを入れません。"))
                    }
                })
            }
        }
    }
}