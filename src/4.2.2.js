// LICENSE : MIT
"use strict";
/*
4.2.2.疑問符(?)
和文の実務文章の場合、本文では疑問符を多用しません。
原文で疑問符が使われている場合も、和文ではできるだけ句点を使用します。
ただし、見出しや広告関連の文章、読み手の回答を求める質問文など、
疑問符の使用が適切と判断される場合には、疑問符を使用します。
使用する場合は「全角」で表記します。
文末に疑問符を使用し、後に別の 文が続く場合は、直後に全角スペースを挿入します。
文中に疑問符を使用する場合はスペースを挿入しません。
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
            // 和文で半角の?は利用しない
            var matchHanQuestion = /([\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ])\?/;
            var index = text.search(matchHanQuestion);
            if (index !== -1) {
                return report(node, new RuleError("疑問符(？)を使用する場合は「全角」で表記します。", index + 1))
            }
        }
    };
}