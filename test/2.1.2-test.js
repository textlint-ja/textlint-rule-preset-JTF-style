// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/2.1.2";
var tester = new TextLintTester();
tester.run("2.1.2.漢字", rule, {
    valid: [
        "今日は日本語の勉強をします。",
        "度々問題が起きる。"
    ],
    invalid: [
        {
            text: "文章を推敲する",
            errors: [
                {
                    message: "「敲」は「常用漢字表」外の漢字です。",
                    line: 1,
                    column: 5
                }
            ]
        },
        {
            text: "私は聡明でありたい",
            errors: [
                {
                    message: "「聡」は「常用漢字表」外の漢字です。",
                    line: 1,
                    column: 3
                }
            ]
        }

    ]
});
