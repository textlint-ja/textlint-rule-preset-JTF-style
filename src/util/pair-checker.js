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
        let matchParentheses = currentStrInParagraph
            .map((node) => {
                let text = getSource(node);
                let index = 0;
                let symbolLocations = [];
                while (index < text.length) {
                    index = text.indexOf(left, index);
                    if (index < 0) break;
                    symbolLocations.push({
                        index,
                        node,
                        type: "left"
                    });
                    index += 1;
                }
                if (left !== right) {
                    index = 0;
                    while (index < text.length) {
                        index = text.indexOf(right, index);
                        if (index < 0) break;
                        symbolLocations.push({
                            index,
                            node,
                            type: "right"
                        });
                        index += 1;
                    }
                    symbolLocations.sort((a, b) => a.index - b.index);
                }
                return symbolLocations;
            })
            .flat();

        if (left === right) {
            if (matchParentheses.length % 2 == 0) {
                return [];
            } else {
                return [matchParentheses[matchParentheses.length - 1]];
            }
        } else {
            let unmatchParences = [];
            while (matchParentheses) {
                let item = matchParentheses.shift();
                if (item === undefined) break;
                if (item.type == "left") {
                    unmatchParences.push(item);
                } else {
                    // right
                    let last = unmatchParences.pop();
                    if (last) {
                        if (last.type == "right") {
                            unmatchParences.push(last);
                            unmatchParences.push(item);
                        }
                    } else {
                        unmatchParences.push(item);
                    }
                }
            }
            return unmatchParences;
        }
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
            missingPairList.forEach(({ index, node, type }) => {
                let message =
                    type == "left"
                        ? `${left}の対となる${right}が見つかりません。${left}${right}`
                        : `${right}の対となる${left}が見つかりません。${left}${right}`;
                report(node, new RuleError(message, { index }));
            });
        }
    };
}
