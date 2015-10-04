// LICENSE : MIT
"use strict";
/*
3.3. かっこ類と隣接する文字の間のスペースの有無
かっこの外側、内側ともにスペースを入れません。
 */
import {isUserWrittenNode} from "./util/node-util";
const brackets = [
    "[", "]", "[", "（", "）", "［", "］", "「", "」", "『", "』"
];

const leftBrackets = brackets.map(bracket => {
    return " " + bracket;
});
const rightBrackets = brackets.map(bracket => {
    return bracket + " ";
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
                    report(node, new RuleError("かっこの外側、内側ともにスペースを入れません。", index));
                }
            });
            rightBrackets.forEach(pattern => {
                var index = text.indexOf(pattern);
                if(index !== -1) {
                    report(node, new RuleError("かっこの外側、内側ともにスペースを入れません。", index));
                }
            })
        }
    }
}