// LICENSE : MIT
"use strict";
/*
2.1.5.カタカナ
カタカナは「全角」で表記します。
半角カタカナは特殊な用途を除いて、原則として使いません。

Halfwidth Katakana variants（半角片仮名）
\uFF65-\uFF9F とする
http://www.asahi-net.or.jp/~ax2s-kmtn/ref/unicode/uff00.html
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
            // 半角カタカナを見つける
            let matchReg = /[\uFF65-\uFF9F]/;
            let index = text.search(matchReg);
            if (index !== -1) {
                report(node, new RuleError("カタカナは「全角」で表記します。", index));
            }
        }
    }
}