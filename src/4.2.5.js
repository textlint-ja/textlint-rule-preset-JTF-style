// LICENSE : MIT
"use strict";
/*
4.2.5.波線(〜)
数値の範囲を示す場合に使用します。
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
            // 和文で半角の?は利用しない
            var matchHanQuestion = /\d(~)\d/;
            var index = text.search(matchHanQuestion);
            if (index !== -1) {
                console.log(index);
                return report(node, new RuleError("数値の範囲を示す場合には全角の〜を使用します。", index + 1 + 1));
            }
        }
    };
}