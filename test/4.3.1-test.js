// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/4.3.1.js";
var tester = new TextLintTester();
tester.run("4.3.1.丸かっこ()", rule, {
    valid: [
        "クォーク（物質の素粒子）"
    ],
    invalid: [
        {
            text: "クォーク(物質の素粒子)",// 半角かっこ
            errors: [
                {
                    message: "半角のかっこ()が使用されています。",
                    column: 4
                }
            ]
        }
    ]
});
