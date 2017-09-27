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
import { RuleHelper } from "textlint-rule-helper";
export function checkPair(context, { left, right }) {
    assert(left);
    assert(right);
    let { Syntax, RuleError, report, getSource } = context;
    let helper = new RuleHelper(context);
    let isInParagraph = false;
    let currentStrInParagraph = [];
    /**
     * `Str` nodeの配列を受け取り、pairが見つからないnodeを返す
     * @param {Object} currentStrInParagraph
     * @returns {{node, index}[]}
     */
    const foundMissingPairNodes = currentStrInParagraph => {
        let foundLeft = false;
        let matchParentheses = [];
        currentStrInParagraph.forEach(node => {
            const text = getSource(node);
            // left を探す
            let leftIndex = -1;
            if (!foundLeft) {
                leftIndex = text.indexOf(left);
                if (leftIndex !== -1) {
                    matchParentheses.push({
                        node,
                        index: leftIndex
                    });
                    foundLeft = true;
                }
            }
            // right を探す
            let pairIndex = text.indexOf(right, leftIndex + 1);
            if (pairIndex !== -1) {
                matchParentheses.pop();
                foundLeft = false;
            }
        });
        return matchParentheses;
    };
    return {
        [Syntax.Paragraph](node) {
            if (helper.isChildNode(node, [Syntax.BlockQuote])) {
                return;
            }
            currentStrInParagraph = [];
            isInParagraph = true;
        },
        [Syntax.Str](node) {
            if (!isInParagraph) {
                return;
            }
            currentStrInParagraph.push(node);
        },
        [`${Syntax.Paragraph}:exit`]() {
            const missingPairList = foundMissingPairNodes(currentStrInParagraph);
            // 探索おわり
            isInParagraph = false;
            // 全ての対が見つかったなら配列は空になる
            if (missingPairList.length === 0) {
                return;
            }
            missingPairList.forEach(({ node, index }) => {
                report(
                    node,
                    new RuleError(`${left}の対となる${right}が見つかりません。${left}${right}`, {
                        index
                    })
                );
            });
        }
    };
}
