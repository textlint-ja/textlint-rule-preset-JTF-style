// LICENSE : MIT
"use strict";
/*
4.2.4.中黒(・)
カタカナ複合語を区切る場合、同格の語句を並列する場合に使用します。
同一の文書で、カタカナ複合語の区切りに中黒を使い、同格の語句の並列にも中黒を使用するのは、お勧めしません。
読み手の理解を妨げる場合があるからです。「2.1.7 カタカナ複合語」を参照してください

「･」と「・」
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
            // 和文で半角の･は利用しない
            var matchHanNakaguro = /･/;
            var index = text.search(matchHanNakaguro);
            if (index !== -1) {
                return report(node, new RuleError("カタカナ複合語を区切る場合または同格の語句を並列する場合には全角の中黒（・）を使用します。", index));
            }
        }
    };
}