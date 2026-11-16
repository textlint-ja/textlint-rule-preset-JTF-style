// LICENSE : MIT
"use strict";
/*
2.2.3. 一部の助数詞の表記
助数詞にともなう「ヵ」、「か」、「カ」、「ヶ」、「ケ」、「箇」、「個」の表記は、原則として、ひらがなの「か」を使います。
 */
import { RuleHelper } from "textlint-rule-helper";

// 以前は textlint-rule-prh と dict/2.2.3.yml でチェックしていた。
// 辞書のルールは1つだけなので、同じパターンとメッセージで直接チェックする。
const pattern = /(\d+)ヶ([所月国年])/g;

const report = function (context) {
    const { Syntax, RuleError, fixer, getSource } = context;
    const helper = new RuleHelper(context);
    return {
        [Syntax.Str](node) {
            const text = getSource(node);
            // パターンは「ヶ」を必ず含む
            if (text.indexOf("ヶ") === -1) {
                return;
            }
            // textlint-rule-prh のデフォルトと同じく、Link、BlockQuote、Emphasis の中は無視する
            if (helper.isChildNode(node, [Syntax.Link, Syntax.BlockQuote, Syntax.Emphasis])) {
                return;
            }
            for (const match of text.matchAll(pattern)) {
                const actual = match[0];
                const expected = `${match[1]}か${match[2]}`;
                const index = match.index;
                context.report(
                    node,
                    new RuleError(`${actual} => ${expected}`, {
                        index,
                        fix: fixer.replaceTextRange([index, index + actual.length], expected)
                    })
                );
            }
        }
    };
};
module.exports = {
    linter: report,
    fixer: report
};
