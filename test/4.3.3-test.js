// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/4.3.3";
var tester = new TextLintTester();
tester.run("4.3.3.かぎかっこ「」", rule, {
    valid: [
        "「×××」を参照してください。",
        "「これは`code`を含んだ文章」を参照してください。"
    ],
    invalid: [
        {
            text: "「対となるかっこがない文章",
            errors: [
                {
                    message: "対となるかぎかっこ「」が見つかりません。",
                    column: 0
                }
            ]
        }
    ]
});
