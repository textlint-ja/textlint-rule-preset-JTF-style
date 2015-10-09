// LICENSE : MIT
"use strict";
/*
4.2.8.セミコロン(;)
原則として和文ではセミコロン(;)を使用しません。
原文でセミコロンが使われている場合も、和文では使用しません。
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
            // "和文;" というような半角;は使用しない
            var matchHanQuestion = /([\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ]);/;
            var index = text.search(matchHanQuestion);
            if (index !== -1) {
                return report(node, new RuleError("原則として和文ではセミコロン(;)を使用しません。", index + 1))
            }
        }
    };
}