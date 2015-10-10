// LICENSE : MIT
"use strict";
import {isUserWrittenNode} from "./util/node-util";
/*
1.1.5.図表のキャプション
文章の内容に応じて、敬体、常体、体言止めを使います。
いずれの場合も、複数の文体をできるだけ混在させないことが重要です。
通常、文末に句点(。)を付けませんが、複数の文章になる場合は句点を使用します。
 */
export default function (context) {
    let {Syntax, RuleError, report, getSource} = context;
    return {
        [Syntax.Image](node){
            let text = getSource(node);
        }
    }
}