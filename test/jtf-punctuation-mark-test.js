// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/jtf-punctuation-mark";
var tester = new TextLintTester();
tester.run("jtf-punctuation-mark 1.2.1", rule, {
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
tester.run("jtf-punctuation-mark 1.2.2", rule, {
    valid: [
        "The Ministry of Economy, Trade and Industry"
    ],
    invalid: [
        // text, expected errors
        {
            text: "785，105",
            errors: [
                {message: "全角のピリオドとカンマは使用しません。"}
            ]
        },
        {
            text: "785．105",
            errors: [
                {message: "全角のピリオドとカンマは使用しません。"}
            ]
        }
    ]
});