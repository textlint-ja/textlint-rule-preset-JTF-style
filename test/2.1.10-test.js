// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/2.1.10";
var tester = new TextLintTester();
tester.run("2.1.10.算用数字の位取りの表記", rule, {
    valid: ["1,000円", "1.01", "0.01", "10,000", "12,345"],
    invalid: [
        {
            text: "0,01",
            output: "0.01",
            errors: [
                {
                    message: "小数点には「ピリオド」を使います。",
                    line: 1,
                    column: 2
                }
            ]
        },
        {
            text: "0,1",
            output: "0.1",
            errors: [
                {
                    message: "小数点には「ピリオド」を使います。",
                    line: 1,
                    column: 2
                }
            ]
        },
        {
            text: "これは10個あるうちの0,1分",
            output: "これは10個あるうちの0.1分",
            errors: [
                {
                    message: "小数点には「ピリオド」を使います。",
                    line: 1,
                    column: 13
                }
            ]
        }
    ]
});
