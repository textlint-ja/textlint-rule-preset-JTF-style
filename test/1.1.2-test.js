// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/1.1.2";
var tester = new TextLintTester();
tester.run("1.1.2.見出し", rule, {
    valid: [
        "# 見出しである\n\n本文はですます調です。",
        "## 見出しです",
        "### モーニング娘。について"// 。が最後ではない
    ],
    invalid: [
        {
            text: "# 見出し。",
            errors: [
                {
                    message: "見出しの文末には、句点(。)を付けません。",
                    line: 1,
                    column: 5
                }
            ]
        },
        {
            text: "### 見出し。",
            errors: [
                {
                    message: "見出しの文末には、句点(。)を付けません。",
                    line: 1,
                    column: 7
                }
            ]
        }
    ]
});