// LICENSE : MIT
"use strict";
/*
1.1.2.見出し

本文が敬体であっても、見出しには常体や体言止めを使います。
一般向けのマニュアルでは、「~には」や「~とは」などの助詞で止める文形も使います。
見出しの文末には、句点(。)を付けません。

# Header

のみをサポート

Header
=======

は無視する
 */
import {isUserWrittenNode} from "./util/node-util";
export default function (context) {
    let {Syntax, RuleError, report, getSource} = context;
    return {
        [Syntax.Header](node){
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            let text = getSource(node);
            // Headerの末尾には。をつけない
            let matchReg = /。(\s*?)$/;
            let index = text.search(matchReg);
            if (index !== -1) {
                report(node, new RuleError("見出しの文末には、句点(。)を付けません。", index));
            }
        }
    }
}