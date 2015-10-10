// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/1.1.5";
var tester = new TextLintTester();
tester.run("1.1.5.図表のキャプション", rule, {
    valid: [
        "![これは図です](http://example.com/img) と ![これは図です](http://example.com/img)",
        "![これは図である](http://example.com/img) と ![これは図である](http://example.com/img)"
    ],
    invalid: [
        {
            text: "![これは図です](http://example.com/img) と ![これは図です](http://example.com/img)  と ![これは図である](http://example.com/img).",
            errors: [
                {
                    message: "図表のキャプションをですます調(敬体)に統一して下さい。図表のキャプション内で敬体、常体を混在させないことが重要です",
                    line: 1,
                    column: 73
                }
            ]
        },
        {
            text: "![これは図です](http://example.com/img) と ![これは図である](http://example.com/img)  と ![これは図である](http://example.com/img).",
            errors: [
                {
                    message: "図表のキャプションをである調(常体)に統一して下さい。図表のキャプション内で敬体、常体を混在させないことが重要です",
                    line: 1,
                    column: 0 // imgのposition
                }
            ]
        },
        // 同数ならであるを注意
        {
            text: "![これは図です](http://example.com/img) と ![これは図である](http://example.com/img).",
            errors: [
                {
                    message: "図表のキャプションをですます調(敬体)に統一して下さい。図表のキャプション内で敬体、常体を混在させないことが重要です",
                    line: 1,
                    column: 36
                }
            ]
        }
    ]
});