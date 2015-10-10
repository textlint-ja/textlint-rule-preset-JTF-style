// LICENSE : MIT
"use strict";
/*
1.2.1. 句点(。)と読点(、)
句読点には全角の「、」と「。」を使います。和文の句読点としてピリオド(.)とカンマ(,)を使用しません。
「4.1.1 句点(。)」と「4.1.2 読点(、)」を参照してください。
 */
import {isUserWrittenNode} from "./util/node-util";
export default function (context) {
    let {Syntax, RuleError, report, getSource} = context;
    return {
        [Syntax.Str](node){
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            let text = getSource(node);
            // 1.2.1. 句点(。)と読点(、)
            if (/[,\.]([\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ])/.test(text) || /([\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ])[,\.]/.test(text)) {
                report(node, new RuleError("句読点には全角の「、」と「。」を使います。和文の句読点としてピリオド(.)とカンマ(,)を使用しません。"));
            }
        }
    }
}