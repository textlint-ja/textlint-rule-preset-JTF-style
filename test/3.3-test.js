// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/3.3";
var tester = new TextLintTester();
tester.run("3.3.かっこ類と隣接する文字の間のスペースの有無", rule, {
    valid: [
        "「良い」",
        "テスト［文章］です"
    ],
    invalid: [
        {
            text: "「 ダメ」",
            errors: [
                {message: "かっこの外側、内側ともにスペースを入れません。"}
            ]
        },
        {
            text: "これは 「ダメ」です",
            errors: [
                {message: "かっこの外側、内側ともにスペースを入れません。"}
            ]
        }
    ]
});
