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
const flat = (array) => {
    return [].concat.apply([], array);
};
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
    const findAllSymbolLocations = (symbol, text) => {
        let index = 0;
        const symbolLocations = [];
        while (index < text.length) {
            index = text.indexOf(symbol, index);
            if (index < 0) break;
            symbolLocations.push({
                index,
                symbol
            });
            index += 1;
        }
        return symbolLocations;
    };
    const foundMissingPairNodes = (currentStrInParagraph) => {
        const matchParentheses = flat(
            currentStrInParagraph.map((node) => {
                let text = getSource(node);
                const leftSymbolLocations = findAllSymbolLocations(left, text);
                const rightSymbolLocations = left !== right ? findAllSymbolLocations(right, text) : [];
                const allSymbolLocations = [...leftSymbolLocations, ...rightSymbolLocations].sort(
                    (a, b) => a.index - b.index
                );
                return allSymbolLocations.map((loc) => ({ ...loc, node }));
            })
        );
        if (left === right) {
            const isCompletedParentheses = matchParentheses.length % 2 == 0;
            if (isCompletedParentheses) {
                return [];
            } else {
                return [matchParentheses[matchParentheses.length - 1]];
            }
        } else {
            const lastUnmatchParences = [];
            while (matchParentheses.length > 0) {
                const item = matchParentheses.shift();
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
