// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/2.1.9";
var tester = new TextLintTester();
tester.run("2.1.9.アルファベット", rule, {
    valid: [
        "ABC",
        "これはABCの歌",
        "_ＡＢＣ_"// Strではない
    ],
    invalid: [
        {
            text: "ＡＢＣ",
            errors: [
                {
                    message: "アルファベットは「半角」で表記します。",
                    line: 1,
                    column: 1
                }
            ]
        },
        {
            text: "これはＡＢＣ全角",
            errors: [
                {
                    message: "アルファベットは「半角」で表記します。",
                    line: 1,
                    column: 4
                }
            ]
        }

    ]
});
