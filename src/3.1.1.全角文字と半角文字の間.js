// LICENSE : MIT
"use strict";
import {isUserWrittenNode} from "./util/node-util";
/*
3.1.1. 全角文字と半角文字の間
原則として、全角文字と半角文字の間にスペースを入れません。

。ただしカタカナ複合語の場合を除きます。「2.1.7 カタカナ複合語」を参照してください。
 */
export default function punctuationMark(context) {
    let {Syntax, RuleError, report, getSource} = context;
    return {
        [Syntax.Str](node){
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            let text = getSource(node);
            let betweenHanAndZen = /[A-Za-z0-9_!#%&=~<>@`/,"'\-\^\$\\.\*\+\?\(\)\[\]\{\}\|] (?:[ぁ-んァ-ヶ]|[々〇〻\u3400-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF])/;
            let betweenZenAndHan = /(?:[ぁ-んァ-ヶ]|[々〇〻\u3400-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]) [A-Za-z0-9_!#%&=~<>@`/,"'\-\^\$\\.\*\+\?\(\)\[\]\{\}\|]/;
            if (betweenZenAndHan.test(text) || betweenHanAndZen.test(text)) {
                report(node, new RuleError("原則として、全角文字と半角文字の間にスペースを入れません。"));
            }
        }
    }
}