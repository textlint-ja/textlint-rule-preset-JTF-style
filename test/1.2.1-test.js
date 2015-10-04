// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/1.2.1";
var tester = new TextLintTester();
tester.run("1.2.1.句点(。)と読点(、)", rule, {
    valid: [
        "これは、見本となる例です。",
        "[これは,見本となる例です.](http://example.com)"// ignore link
    ],
    invalid: [
        // text, expected errors
        {
            text: "これは,見本となる例です.",
            errors: [
                {message: "句読点には全角の「、」と「。」を使います。和文の句読点としてピリオド(.)とカンマ(,)を使用しません。"}
            ]
        }
    ]
});