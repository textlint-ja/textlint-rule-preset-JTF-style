// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/4.3.1.js";
var tester = new TextLintTester();
tester.run("4.3.1.丸かっこ()", rule, {
    valid: ["クォーク（物質の素粒子）"],
    invalid: [
        {
            // 半角かっこ
            text: "クォーク(物質の素粒子)",
            output: "クォーク（物質の素粒子）",
            errors: [
                {
                    message: "半角のかっこ()が使用されています。全角のかっこ（）を使用してください。",
                    column: 5
                },
                {
                    message: "半角のかっこ()が使用されています。全角のかっこ（）を使用してください。",
                    column: 12
                }
            ]
        },
        {
            // 半角かっこ
            text: "例)test",
            output: "例）test",
            errors: [
                {
                    message: "半角のかっこ()が使用されています。全角のかっこ（）を使用してください。",
                    column: 2
                }
            ]
        }
    ]
});
