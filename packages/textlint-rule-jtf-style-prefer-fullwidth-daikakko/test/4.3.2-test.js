// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/4.3.2";
var tester = new TextLintTester();
tester.run("4.3.2.大かっこ［］", rule, {
    valid: [
        "［ファイル］メニュー",
        "- [ ] TODO",
        "[link](http://example.com)"
    ],
    invalid: [
        {
            // 半角かっこ Markdown的に意味を持つので片方ずつ
            text: "半角[かっこ",
            output: "半角［かっこ",
            errors: [
                {
                    message: "半角の大かっこ[]が使用されています。全角のかっこ［］を使用してください。",
                    column: 3
                }
            ]
        },
        {
            // 半角かっこ Markdown的に意味を持つので片方ずつ
            text: "半角]かっこ",
            output: "半角］かっこ",
            errors: [
                {
                    message: "半角の大かっこ[]が使用されています。全角のかっこ［］を使用してください。",
                    column: 3
                }
            ]
        }
    ]
});
