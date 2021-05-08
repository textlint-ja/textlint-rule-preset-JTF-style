// LICENSE : MIT
"use strict";
/*
1.1.5.図表のキャプション
文章の内容に応じて、敬体、常体、体言止めを使います。
いずれの場合も、複数の文体をできるだけ混在させないことが重要です。
通常、文末に句点(。)を付けませんが、複数の文章になる場合は句点を使用します。

キャプション間で文体が混ざっていないことを確認する。
 */
import { analyzeDesumasu, analyzeDearu } from "analyze-desumasu-dearu";
module.exports = function (context) {
    let { Syntax, RuleError, report, getSource } = context;
    let desumasuList = [];
    let dearuList = [];

    function resetState() {
        desumasuList = [];
        dearuList = [];
    }

    const imagePaddingLet = 2; // ![ の分paddingを付ける
    function reportResult(list, { desumasu, dearu }) {
        list.forEach(({ node, matches }) => {
            matches.forEach((match) => {
                let message;
                if (desumasu) {
                    message = `図表のキャプションを敬体(ですます調)に統一して下さい。\n図表のキャプション内で敬体、常体を混在させないことが重要です。\n"${match.value}"が常体(である調)です。`;
                } else if (dearu) {
                    message = `図表のキャプションを常体(である調)に統一して下さい。\n図表のキャプション内で敬体、常体を混在させないことが重要です。\n"${match.value}"が敬体(ですます調)です。`;
                }
                report(
                    node,
                    new RuleError(message, {
                        line: match.lineNumber - 1,
                        column: match.columnIndex + imagePaddingLet
                    })
                );
            });
        });
    }

    return {
        [Syntax.Document]: resetState,
        [Syntax.Image](node) {
            let text = node.alt;
            // alt がない場合は無視する
            if (text === undefined || text === null) {
                return;
            }
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
        [`${Syntax.Document}:exit`]() {
            let desumasuCount = desumasuList.reduce((count, { matches }) => count + matches.length, 0);
            let dearuCount = dearuList.reduce((count, { matches }) => count + matches.length, 0);
            if (desumasuCount === 0 || dearuCount === 0) {
                return;
            }
            if (desumasuCount > dearuCount) {
                reportResult(dearuList, {
                    desumasu: true
                });
            } else if (desumasuCount < dearuCount) {
                reportResult(desumasuList, {
                    dearu: true
                });
            } else {
                reportResult(dearuList, {
                    desumasu: true
                });
            }
        }
    };
};
