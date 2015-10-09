// LICENSE : MIT
"use strict";
/*
4.3.3.かぎかっこ「」
引用、参照先、入力する文字を示す場合、語句を強調する場合に使用します。

パラグラフをまたぐかぎかっこが存在しないことを検証する
 */
import {RuleHelper} from "textlint-rule-helper";
export default function (context) {
    let {Syntax, RuleError, report, getSource} = context;
    let helper = new RuleHelper(context);
    let isInParagraph = false;
    let matchParentheses = [];
    return {
        [Syntax.Paragraph](node){
            if (helper.isChildNode(node, [Syntax.BlockQuote])) {
                return;
            }
            isInParagraph = true
        },
        [Syntax.Str](node){
            if (!isInParagraph) {
                return;
            }
            let text = getSource(node);
            // 「 を探す
            let index = text.indexOf("「");
            if(index !== -1) {
                matchParentheses.push({
                    node,
                    index
                });
            }
            // 」 を探す
            let pairIndex = text.indexOf("」", index);
            if (pairIndex !== -1) {
                matchParentheses.pop();
            }
        },
        [`${Syntax.Paragraph}:exit`](node){
            isInParagraph = false;
            // 全てのかっこの対が見つかったなら配列は空になる
            if (matchParentheses.length === 0) {
                return;
            }

            matchParentheses.forEach(({node, index}) => {
                report(node, new RuleError("対となるかぎかっこ「」が見つかりません。", index));
            });
        }
    };
}