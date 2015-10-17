// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/4.2.9";
var tester = new TextLintTester();
tester.run("4.2.9.ダッシュ(-)", rule, {
    valid: [
        "this ― is not problem"
    ],
    invalid: [
        {
            text: "和文\u2012",// u2012
            errors: [
                {
                    message: "原則として和文ではダッシュ(―)を使用しません。",
                    column: 3
                }
            ]
        },
        {
            text: "和文\u2013",
            errors: [
                {
                    message: "原則として和文ではダッシュ(―)を使用しません。",
                    column: 3
                }
            ]
        },
        {
            text: "和文\u2014",
            errors: [
                {
                    message: "原則として和文ではダッシュ(―)を使用しません。",
                    column: 3
                }
            ]
        },
        {
            text: "和文\u2015",
            errors: [
                {
                    message: "原則として和文ではダッシュ(―)を使用しません。",
                    column: 3
                }
            ]
        }

    ]
});
