// LICENSE : MIT
"use strict";
/**
 * 「と」といったペアがちゃんと閉じられているかをチェックします
 * @param {object} context
 * @param {string} left
 * @param {string} right
 * @returns {object}
 */
import assert from "assert";
import {RuleHelper} from "textlint-rule-helper";
export function checkPair(context, { left, right }) {
    assert(left);
    assert(right);
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
            // left を探す
            let index = text.indexOf(left);
            if (index !== -1) {
                matchParentheses.push({
                    node,
                    index
                });
            }
            // right を探す
            let pairIndex = text.indexOf(right, index);
            if (pairIndex !== -1) {
                matchParentheses.pop();
            }
        },
        [`${Syntax.Paragraph}:exit`](node){
            isInParagraph = false;
            // 全ての対が見つかったなら配列は空になる
            if (matchParentheses.length === 0) {
                return;
            }

            matchParentheses.forEach(({node, index}) => {
                report(node, new RuleError(`${left}の対となる${right}が見つかりません。${left}${right}`, index));
            });
        }
    };

}