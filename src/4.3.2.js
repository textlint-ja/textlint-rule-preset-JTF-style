// LICENSE : MIT
"use strict";
/*
4.3.2.大かっこ［］
コンピューターの画面用語などの特殊な表記で使用します。
全角の大かっこを使用します
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
            // 半角の大かっこ[]は使用しない
            var matchHanQuestion = /[\[\]]/;
            var index = text.search(matchHanQuestion);
            if (index !== -1) {
                return report(node, new RuleError("半角の大かっこ[]が使用されています。", index + 1))
            }
        }
    };
}