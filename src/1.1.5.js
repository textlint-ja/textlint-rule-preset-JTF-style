// LICENSE : MIT
"use strict";
/*
1.1.5.図表のキャプション
文章の内容に応じて、敬体、常体、体言止めを使います。
いずれの場合も、複数の文体をできるだけ混在させないことが重要です。
通常、文末に句点(。)を付けませんが、複数の文章になる場合は句点を使用します。
 */
import {analyzeDesumasu, analyzeDearu} from "analyze-desumasu-dearu";
export default function (context) {
    let {Syntax, RuleError, report, getSource} = context;
    let desumasuList = [];
    let dearuList = [];

    function reportResult(list, message) {
        list.forEach(({node, matches}) => {
            matches.forEach(match => {
                report(node, new RuleError(message, {
                    line: match.lineNumber - 1,
                    column: match.colorIndex
                }));
            });
        });
    }

    return {
        [Syntax.Image](node){
            let text = node.alt;
            let retDesumasu = analyzeDesumasu(text);
            if (retDesumasu.length > 0) {
                desumasuList.push({
                    node: node,
                    matches: retDesumasu
                });
            }
            let retDearu = analyzeDearu(text);
            if (retDearu.length > 0) {
                dearuList.push({
                    node: node,
                    matches: retDearu
                });
            }
        },
        [`${Syntax.Document}:exit`](){
            if (desumasuList.length === 0 || dearuList.length === 0) {
                return;
            }
            if (desumasuList.length > dearuList.length) {
                reportResult(dearuList, "図表のキャプションをですます調(敬体)に統一して下さい。図表のキャプション内で敬体、常体を混在させないことが重要です");
            } else if (desumasuList.length < dearuList.length) {
                reportResult(desumasuList, "図表のキャプションをである調(常体)に統一して下さい。図表のキャプション内で敬体、常体を混在させないことが重要です");
            } else {
                reportResult(dearuList, "図表のキャプションをですます調(敬体)に統一して下さい。図表のキャプション内で敬体、常体を混在させないことが重要です");
            }
        }
    }
}