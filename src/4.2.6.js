// LICENSE : MIT
"use strict";
/*
4.2.6.ハイフン(-)
原則として和文ではハイフン(-)を使用しません。
使用する場合は半角で表記します。原文でハイフンが使われている場合も、和文では使用しません。
例外は、住所や電話番号の区切りに使う場合です。
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
            // 基本的にハイフン(-)を使用しません
            var index = text.indexOf("-");
            if (index !== -1) {
                // 例外として、住所や電話番号の区切りにはハイフン(-)を使用できる
                // ?-? を取り出して \d-\d ならOK、そうでないならダメ
                var bufOfIndex = text.slice(index - 1, index + 2);
                // [^A-Za-z0-9_] = \w
                if (!/^\w\-\w$/.test(bufOfIndex)) {
                    report(node, new RuleError(`原則として和文ではハイフン(-)を使用しません。
例外は、住所や電話番号の区切りに使う場合です。`, index));
                }
            }
        }
    };
}