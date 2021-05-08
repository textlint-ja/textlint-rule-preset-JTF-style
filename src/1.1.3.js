// LICENSE : MIT
"use strict";
/*
1.1.3.箇条書き

基本的に本文の文体に合わせます。
ただし、本文が「敬体」である場合、箇条書きに「常体」または「体言止め」も使う場合があります。
一般読者向け の文書で、本文が敬体である場合、多くの場合、箇条書きでも敬体を使います。
本文が「常体」である場合、箇条書きには「常体」または「体言止め」を使います。「敬体」は使いません。
いずれの場合も、ひとまとまりの箇条書きでは、敬体と常体を混在させません。文末に句点(。)を付けるかどうかも統一します。
 */
import { analyzeDesumasu, analyzeDearu } from "analyze-desumasu-dearu";
module.exports = function (context) {
    let { Syntax, RuleError, report, getSource } = context;
    let desumasuList = [];
    let dearuList = [];
    // 。付きのListItem
    let withPointList = [];
    // 。なしのListItem
    let withoutPointList = [];

    function resetList() {
        dearuList = [];
        desumasuList = [];
        withPointList = [];
        withoutPointList = [];
    }

    function reportPointResult(nodeList, { shouldUsePoint }) {
        nodeList.forEach((node) => {
            let message;
            if (shouldUsePoint) {
                message = `箇条書きの文末に句点(。)を付けて下さい。\n箇条書きの文末に句点(。)を付けるかを統一します。`;
            } else {
                message = `箇条書きの文末から句点(。)を外して下さい。\n箇条書きの文末に句点(。)を付けるかを統一します。`;
            }
            report(node, new RuleError(message));
        });
    }

    function reportDesumaruDearuResult(list, { desumasu, dearu }) {
        list.forEach(({ node, matches }) => {
            matches.forEach((match) => {
                let message;
                if (desumasu) {
                    message = `箇条書きを敬体(ですます調)に統一して下さい。\nひとまとまりの箇条書きでは、敬体と常体を混在させません。\n"${match.value}"が常体(である調)です。`;
                } else if (dearu) {
                    message = `箇条書きを常体(である調)に統一して下さい。\nひとまとまりの箇条書きでは、敬体と常体を混在させません。\n"${match.value}"が敬体(ですます調)です。`;
                }
                report(
                    node,
                    new RuleError(message, {
                        line: match.lineNumber - 1,
                        column: match.columnIndex
                    })
                );
            });
        });
    }

    // 末尾に。があるかが統一されているのチェック
    function countingPoint(withPointList, withoutPointList) {
        if (withPointList.length === 0 || withoutPointList.length === 0) {
            return;
        }
        if (withPointList.length > withoutPointList.length) {
            // 。ありに統一
            reportPointResult(withoutPointList, {
                shouldUsePoint: true
            });
        } else if (withPointList.length < withoutPointList.length) {
            // 。なしに統一
            reportPointResult(withPointList, {
                shouldUsePoint: false
            });
        } else {
            // 。ありに統一
            reportPointResult(withoutPointList, {
                shouldUsePoint: true
            });
        }
    }

    // 敬体(ですます調)あるいは常体(である調)なのかのチェック
    function countingDesumasuDearu(desumasuList, dearuList) {
        let desumasuCount = desumasuList.reduce((count, { matches }) => count + matches.length, 0);
        let dearuCount = dearuList.reduce((count, { matches }) => count + matches.length, 0);
        if (desumasuCount === 0 || dearuCount === 0) {
            return;
        }
        // ですます優先
        if (desumasuCount > dearuCount) {
            reportDesumaruDearuResult(dearuList, {
                desumasu: true
            });
        } else if (desumasuCount < dearuCount) {
            // である優先
            reportDesumaruDearuResult(desumasuList, {
                dearu: true
            });
        } else {
            // 同等の場合はですます優先
            reportDesumaruDearuResult(dearuList, {
                desumasu: true
            });
        }
    }

    return {
        [Syntax.List](node) {
            resetList();
        },
        [Syntax.ListItem](node) {
            let text = getSource(node);
            // 末尾に。があるかが統一されているのチェック
            let matchPointReg = /。(\s*?)$/;
            if (matchPointReg.test(text)) {
                // 。あり
                withPointList.push(node);
            } else {
                // 。なし
                withoutPointList.push(node);
            }
            // 敬体(ですます調)あるいは常体(である調)なのかのチェック
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
        [`${Syntax.List}:exit`](node) {
            countingPoint(withPointList, withoutPointList);

            countingDesumasuDearu(desumasuList, dearuList);
        }
    };
};
