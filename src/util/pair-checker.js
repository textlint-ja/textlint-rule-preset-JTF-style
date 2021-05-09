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
    const foundMissingPairNodes = (currentStrInParagraph) => {
        let foundLeft = false;
        let matchParentheses = [];
        let leftIndex = 0;
        const text = currentStrInParagraph.map((node) => getSource(node)).join("");

        while (leftIndex >= 0) {
            if (!foundLeft) {
                // left を探す
                leftIndex = text.indexOf(left, leftIndex);
                if (leftIndex !== -1) {
                    matchParentheses.push({
                        index: leftIndex
                    });
                    foundLeft = true;
                }
            } else {
                // right を探す
                let pairIndex = text.indexOf(right, leftIndex + 1);
                if (pairIndex !== -1) {
                    matchParentheses.pop();
                    foundLeft = false;
                    leftIndex = pairIndex + 1;
                } else {
                    break;
                }
            }
        }
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
        [Syntax.Code](node) {
            const missingPairList = foundMissingPairNodes([node]);
            if (missingPairList.length === 0) {
                return;
            }
            missingPairList.forEach(({ index }) => {
                report(
                    node,
                    new RuleError(`${left}の対となる${right}が見つかりません。${left}${right}`, {
                        index
                    })
                );
            });
        },
        [Syntax.Str](node) {
            if (!isInParagraph) {
                return;
            }
            currentStrInParagraph.push(node);
        },
        [`${Syntax.Paragraph}:exit`](node) {
            const missingPairList = foundMissingPairNodes(currentStrInParagraph);
            // 探索おわり
            isInParagraph = false;
            // 全ての対が見つかったなら配列は空になる
            if (missingPairList.length === 0) {
                return;
            }
            missingPairList.forEach(({ index }) => {
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
