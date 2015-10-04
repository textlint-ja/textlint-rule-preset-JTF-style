// LICENSE : MIT
"use strict";
/*
4.1.1. 句点(。)
句点(。)は「全角」で表記します。
句点は文の終わりに付けます。
文中にかぎかっこが入る場合は、閉じかっこの前に句点を打ちません。
文中に丸かっこが入る場合も閉じかっこの前に句点を打ちません。。
 */
import {isUserWrittenNode} from "./util/node-util";
const brackets = [
    "」", "）", ")"
];
const leftBrackets = brackets.map(bracket => {
    return "。" + bracket;
});
export default function punctuationMark(context) {
    let {Syntax, RuleError, report, getSource} = context;
    return {
        [Syntax.Str](node){
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            let text = getSource(node);
            // ←にスペース
            leftBrackets.forEach(pattern => {
                var index = text.indexOf(pattern);
                if (index !== -1) {
                    report(node, new RuleError("文中にかぎかっこが入る場合は、閉じかっこ の前に句点を打ちません。", index));
                }
            });
        }
    };
}