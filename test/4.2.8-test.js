// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/4.2.8";
var tester = new TextLintTester();
tester.run("4.2.8.セミコロン(;)", rule, {
    valid: [
        "this; that is this.",
        "This; 和文",
        "1: これはペンです"// [^和文]: のパターン
    ],
    invalid: [
        {
            text: "和文;",
            errors: [
                {
                    message: "原則として和文ではセミコロン(;)を使用しません。",
                    column: 2
                }
            ]
        },
        {
            text: "和文;This is",
            errors: [
                {
                    message: "原則として和文ではセミコロン(;)を使用しません。",
                    column: 2
                }
            ]
        }
    ]
});
