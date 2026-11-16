// LICENSE : MIT
"use strict";
/*
2.2.3. 一部の助数詞の表記
助数詞にともなう「ヵ」、「か」、「カ」、「ヶ」、「ケ」、「箇」、「個」の表記は、原則として、ひらがなの「か」を使います。
 */
import prh from "textlint-rule-prh";
import path from "path";
import fs from "fs";

const report = function (context) {
    const { Syntax, getSource } = context;
    const dictRule = prh.fixer(context, {
        ruleContents: [fs.readFileSync(path.join(__dirname, "..", "dict", "2.2.3.yml"), "utf-8")]
    });
    const originalStrRule = dictRule[Syntax.Str];
    // 辞書のパターン /(\d+)ヶ([所月国年])/ は「ヶ」を必ず含むので、「ヶ」がないStrは辞書のチェックを省く
    dictRule[Syntax.Str] = function (node) {
        if (getSource(node).indexOf("ヶ") === -1) {
            return;
        }
        return originalStrRule(node);
    };
    return dictRule;
};
module.exports = {
    linter: report,
    fixer: report
};
