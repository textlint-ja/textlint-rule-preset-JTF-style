// LICENSE : MIT
"use strict";
/*
2.1.8.算用数字
算用数字は「半角」で表記します。
用途によっては全角を許容します。
ただし、表記をできるだけ統一するため、特別な理由がない限り半角での表記を原則とします。
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
            let matchReg = /[０-９]/;
            let index = text.search(matchReg);
            if (index !== -1) {
                report(node, new RuleError("算用数字は「半角」で表記します。", index));
            }
        }
    }
}