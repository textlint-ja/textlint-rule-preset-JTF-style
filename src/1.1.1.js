// LICENSE : MIT
"use strict";
/*
1.1.1.本文

本文の文体は、敬体(ですます調)あるいは常体(である調)のどちらかで統一します。
敬体と常体を混在させないようにします。
敬体と常体のどちらを使うかは、文書の目的や読み手に応じて決めます。

 敬体(ですます調)
一般読者向けの紹介文、パンフレット、マニュアル、ウェブサイトの本文では、基本的に「敬体」を使います。
親しみやすい、柔らかい雰囲気で内容を伝えることができます。

 常体(である調)
常体は、簡潔に、力強い雰囲気で内容を伝えることができる文体です
丁寧ではない印象を読み手に与える場合があるため、通常、一般向けのマニュアルの本文では使われません。
 */
import { analyzeDesumasu, analyzeDearu } from "analyze-desumasu-dearu";
import { RuleHelper } from "textlint-rule-helper";
module.exports = function (context) {
    let { Syntax, RuleError, report, getSource } = context;
    let helper = new RuleHelper(context);
    let desumasuList = [];
    let dearuList = [];

    function reportResult(list, { desumasu, dearu }) {
        list.forEach(({ node, matches }) => {
            matches.forEach((match) => {
                let message;
                if (desumasu) {
                    message = `本文を常体(である調)に統一して下さい。\n本文の文体は、敬体(ですます調)あるいは常体(である調)のどちらかで統一します。\n"${match.value}"が敬体(ですます調)です。`;
                } else if (dearu) {
                    message = `本文を敬体(ですます調)に統一して下さい。\n本文の文体は、敬体(ですます調)あるいは常体(である調)のどちらかで統一します。\n"${match.value}"が常体(である調)です。`;
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

    return {
        [Syntax.Document]() {
            desumasuList = [];
            dearuList = [];
        },
        [Syntax.Str](node) {
            // 本文以外は無視する
            // => isUserWrittenNode
            if (helper.isChildNode(node, [Syntax.Link, Syntax.Image, Syntax.BlockQuote, Syntax.Emphasis])) {
                return;
            }
            // Listについては1.1.3. 箇条書きで扱う
            if (helper.isChildNode(node, [Syntax.ListItem])) {
                return;
            }
            let text = getSource(node);
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
                reportResult(dearuList, { dearu: true });
            } else if (desumasuCount < dearuCount) {
                reportResult(desumasuList, { desumasu: true });
            } else {
                reportResult(dearuList, { dearu: true });
            }
        }
    };
};
