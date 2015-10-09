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
            text: "\\[ファイル]メニュー",// 半角かっこ Markdown的に意味を持つのでエスケープ
            errors: [
                {
                    message: "半角の大かっこ[]が使用されています。",
                    column: 0
                }
            ]
        }
    ]
});
