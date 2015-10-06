// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/4.1.3";
var tester = new TextLintTester();
tester.run("4.1.3. ピリオド(.)、カンマ(,)", rule, {
    valid: [
        "This is a pen.",
        "1. テスト", // 箇条書き
        "1,101"    // 小数点
    ],
    invalid: [
        {
            text: "和文の終わりがピリオド.",
            errors: [
                {message: "和文の句読点としてはピリオドを使用しません。"}
            ]
        }
    ]
});
