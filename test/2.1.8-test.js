// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/2.1.8";
var tester = new TextLintTester();
tester.run("2.1.8.算用数字", rule, {
    valid: [
        "1,000円",
        "100 + 100 = 200",
        "_２００_円" // Strではない
    ],
    invalid: [
        {
            text: "２００円はダメ",
            output: "200円はダメ",
            errors: [
                {
                    message: "算用数字は「半角」で表記します。",
                    line: 1,
                    column: 1
                }
            ]
        },
        {
            text: "おやつは３００円まで",
            output: "おやつは300円まで",
            errors: [
                {
                    message: "算用数字は「半角」で表記します。",
                    line: 1,
                    column: 5
                }
            ]
        }
    ]
});
