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
    const { Syntax, RuleError, report, getSource } = context;
    const helper = new RuleHelper(context);
    let isInParagraph = false;
    let currentStrInParagraph = [];
    /**
     * `Str` nodeの配列を受け取り、pairが見つからないnodeを返す
     * @param {Object} currentStrInParagraph
     * @returns {{node, index}[]}
     */
    const findAllSymbolLocations = (symbol, text, node) => {
        let index = 0;
        const symbolLocations = [];
        while (index < text.length) {
            index = text.indexOf(symbol, index);
            if (index < 0) break;
            symbolLocations.push({
                index,
                symbol,
                node
            });
            index += 1;
        }
        return symbolLocations;
    };
    const foundMissingPairNodes = (currentStrInParagraph) => {
        const matchParentheses = [];
        currentStrInParagraph.forEach((node) => {
            const text = getSource(node);
            const leftSymbolLocations = findAllSymbolLocations(left, text, node);
            const rightSymbolLocations = left !== right ? findAllSymbolLocations(right, text, node) : [];
            if (leftSymbolLocations.length === 0 && rightSymbolLocations.length === 0) {
                return;
            }
            const allSymbolLocations =
                rightSymbolLocations.length === 0
                    ? leftSymbolLocations
                    : leftSymbolLocations.concat(rightSymbolLocations).sort((a, b) => a.index - b.index);
            allSymbolLocations.forEach((loc) => matchParentheses.push(loc));
        });
        if (left === right) {
            const isCompletedParentheses = matchParentheses.length % 2 == 0;
            if (isCompletedParentheses) {
                return [];
            } else {
                return [matchParentheses[matchParentheses.length - 1]];
            }
        } else {
            const lastUnmatchParences = [];
            for (const item of matchParentheses) {
                if (item.symbol == left) {
                    lastUnmatchParences.push(item);
                } else {
                    // right
                    const last = lastUnmatchParences.pop();
                    if (last) {
                        if (last.symbol == right) {
                            lastUnmatchParences.push(last);
                            lastUnmatchParences.push(item);
                        }
                    } else {
                        lastUnmatchParences.push(item);
                    }
                }
            }
            return lastUnmatchParences;
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
            missingPairList.forEach(({ index, node, symbol }) => {
                let message =
                    symbol === left
                        ? `${left}の対となる${right}が見つかりません。${left}${right}`
                        : `${right}の対となる${left}が見つかりません。${left}${right}`;
                report(node, new RuleError(message, { index }));
            });
        }
    };
}
