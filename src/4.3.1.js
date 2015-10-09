// LICENSE : MIT
"use strict";
/*
4.3.1.丸かっこ（）
直前の内容を補足して説明する場合や言い換える場合に使用します。
全角のかっこを使用します
 */
import {isUserWrittenNode} from "./util/node-util";
export default function punctuationMark(context) {
    let {Syntax, RuleError, report, getSource} = context;
    return {
        [Syntax.Str](node){
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            let text = getSource(node);
            // 半角のかっこ()は使用しない
            var matchHanQuestion = /([\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ])[\(\)]/;
            var index = text.search(matchHanQuestion);
            if (index !== -1) {
                return report(node, new RuleError("半角のかっこ()が使用されています。", index + 1))
            }
        }
    };
}