// LICENSE : MIT
"use strict";
import {isUserWrittenNode} from "./util/node-util";
/*
1.2.2. ピリオド(.)とカンマ(,)
欧文で表記する組織名などの固有名詞や数字にピリオド(.)やカンマ(,)が含まれる場合は、和文中でもピリオ ド(.)とカンマ(,)を使用します。いずれの場合も半角で表記します。「4.1.3 ピリオド(.)、カンマ(,)」を参照してく ださい。
 */
export default function punctuationMark(context) {
    let {Syntax, RuleError, report, getSource} = context;
    return {
        [Syntax.Str](node){
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            let text = getSource(node);
            // 1.2.2. ピリオド(.)とカンマ(,)
            if (/[．，]/.test(text)) {
                report(node, new RuleError("全角のピリオドとカンマは使用しません。"));
            }
        }
    }
}