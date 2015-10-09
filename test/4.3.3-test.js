// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/4.3.3";
var tester = new TextLintTester();
tester.run("4.3.3.かぎかっこ「」", rule, {
    valid: [
        "「×××」を参照してください。",
        "「これは`code`を含んだ文章」を参照してください。",
        `これは複数行の例

        「textlint」向けのルール
        `,
        "- [ ] 「かっこのあるリスト」"
    ],
    invalid: [
        {
            text: "「対となるかっこがない文章です。",
            errors: [
                {
                    message: "対となるかぎかっこ「」が見つかりません。",
                    column: 0
                }
            ]
        },
        {
            text: `「パラグラフをまたぐような

文章」は認められない。
            `,
            errors: [
                {
                    message: "対となるかぎかっこ「」が見つかりません。",
                    column: 0
                }
            ]
        },
        {
            // ListItem -> Paragraphなので
            text: "- 「これはプラグイン",
            errors: [
                {
                    message: "対となるかぎかっこ「」が見つかりません。",
                    column: 0
                }
            ]
        }

    ]
});
