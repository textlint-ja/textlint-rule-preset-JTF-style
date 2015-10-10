// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/4.3.4";
var tester = new TextLintTester();
tester.run("4.3.4.二重かぎかっこ『』", rule, {
    valid: [
        "彼は『『×××』を参照してください』と言った。",
        `これは複数行の例

彼は『『×××』を参照してください』と言った。
        `,
        "- 彼は「『×××』を参照してください」と言った。",
        "『基礎日本語辞典』"
    ],
    invalid: [
        {
            text: "『対となるかっこがない文章です。",
            errors: [
                {
                    message: "『の対となる』が見つかりません。『』",
                    column: 0
                }
            ]
        },
        {
            text: `『パラグラフをまたぐような

文章』は認められない。
            `,
            errors: [
                {
                    message: "『の対となる』が見つかりません。『』",
                    column: 0
                }
            ]
        },
        {
            // ListItem -> Paragraphなので
            text: "- 『これはプラグイン",
            errors: [
                {
                    message: "『の対となる』が見つかりません。『』",
                    column: 2
                }
            ]
        }

    ]
});
