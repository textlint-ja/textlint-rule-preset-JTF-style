// LICENSE : MIT
"use strict";
/*
2.1.10.算用数字の位取りの表記
桁区切りには「カンマ」、小数点には「ピリオド」を使います。
ただし桁区切りの「カンマ」は省略する場合があります。
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
            // 数字,で絞って
            let numberWithComma = /([\d,]+)/g;
            // 0,xxx な文字列を検出する
            let strictMatchReg = /(^0+,\d+$)/;
            let match;
            while (match = numberWithComma.exec(text)) {
                // この段階では 10,000 も含まれている
                // ^0,xxx をだけを取り出す
                let matchedString = match[0];
                let index = matchedString.search(strictMatchReg);
                if (index !== -1) {
                    report(node, new RuleError("小数点には「ピリオド」を使います。", index));
                }
            }
        }
    }
}