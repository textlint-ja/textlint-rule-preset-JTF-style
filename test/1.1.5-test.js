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
                    message: '図表のキャプションを敬体(ですます調)に統一して下さい。\n図表のキャプション内で敬体、常体を混在させないことが重要です。\n"である"が常体(である調)です。',
                    line: 1,
                    column: 80
                }
            ]
        },
        {
            text: "![これは図です](http://example.com/img) と ![これは図である](http://example.com/img)  と ![これは図である](http://example.com/img).",
            errors: [
                {
                    message: '図表のキャプションを常体(である調)に統一して下さい。\n図表のキャプション内で敬体、常体を混在させないことが重要です。\n"です"が敬体(ですます調)です。',
                    line: 1,
                    column: 7 // imgのposition
                }
            ]
        },
        // 同数ならであるを注意
        {
            text: "![これは図です](http://example.com/img) と ![これは図である](http://example.com/img).",
            errors: [
                {
                    message: '図表のキャプションを敬体(ですます調)に統一して下さい。\n図表のキャプション内で敬体、常体を混在させないことが重要です。\n"である"が常体(である調)です。',
                    line: 1,
                    column: 43
                }
            ]
        }
    ]
});