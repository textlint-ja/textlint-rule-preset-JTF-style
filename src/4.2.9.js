// LICENSE : MIT
"use strict";
/*
4.2.9.ダッシュ(-)
原則として和文ではダッシュ(-)を使用しません。
和文でダッシュを使用すると、電子文書として処理する際に不都合が生じる場合があります。

Note: ここでのダッシュはU+2012-U+2015とする
全角 —— のように使われてる事が多い
https://ja.wikipedia.org/wiki/%E3%83%80%E3%83%83%E3%82%B7%E3%83%A5_%28%E8%A8%98%E5%8F%B7%29
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
            // 和文でダッシュは使用しない
            var matchHanQuestion = /([\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ])[\u2012-\u2015]/;
            var index = text.search(matchHanQuestion);
            if (index !== -1) {
                return report(node, new RuleError("原則として和文ではダッシュ(―)を使用しません。", index + 1))
            }
        }
    };
}