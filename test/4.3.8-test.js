// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/4.3.8";
var tester = new TextLintTester();
tester.run("4.3.8.一重引用符''", rule, {
    valid: [
        "彼は'×××'を参照してくださいと言った。",
        "- 彼は'×××'を参照してくださいと言った。"
    ],
    invalid: [
        {
            text: "'対となるがない中かっこがない文章です。",
            errors: [
                {
                    message: "'の対となる'が見つかりません。''",
                    column: 0
                }
            ]
        },
        {
            text: `'パラグラフをまたぐような

文章'は認められない。`,
            errors: [
                {
                    message: "'の対となる'が見つかりません。''",
                    column: 0
                },
                // FIXME: why duplicated?
                {
                    message: "'の対となる'が見つかりません。''",
                    column: 0
                },
                {
                    message: "'の対となる'が見つかりません。''",
                    column: 2
                }
            ]
        },
        {
            // ListItem -> Paragraphなので
            text: "- 'これはプラグイン",
            errors: [
                {
                    message: "'の対となる'が見つかりません。''",
                    column: 2
                }
            ]
        }
    ]
});
