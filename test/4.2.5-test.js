// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/4.2.5";
var tester = new TextLintTester();
tester.run("4.2.5.波線(~)", rule, {
    valid: [
        "18〜22 歳まで",
        "これ〜から"
    ],
    invalid: [
        {
            text: "18~22歳まで",
            errors: [
                {
                    message: "数値の範囲を示す場合には全角の〜を使用します。",
                    column: 4
                }
            ]
        }
    ]
});
