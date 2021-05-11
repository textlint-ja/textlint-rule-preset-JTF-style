// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/4.3.4";
var tester = new TextLintTester();
tester.run("4.3.4.二重かぎかっこ『』", rule, {
    valid: [
        "彼は『『×××』を参照してください』と言った。",
        "彼は『『`×××`』を**参照**してください』と言った。",
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
                    column: 1
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
                    column: 1
                },
                {
                    message: "』の対となる『が見つかりません。『』",
                    column: 3
                }
            ]
        },
        {
            // ListItem -> Paragraphなので
            text: "- 『これはプラグイン",
            errors: [
                {
                    message: "『の対となる』が見つかりません。『』",
                    column: 3
                }
            ]
        },
        {
            text: "開くかっこがない文章です』",
            errors: [
                {
                    message: "』の対となる『が見つかりません。『』",
                    column: 13
                }
            ]
        },
        {
            text: "『多重で『閉じる』かっこが足りない文章です",
            errors: [
                {
                    message: "『の対となる』が見つかりません。『』",
                    column: 1
                }
            ]
        },
        {
            text: "多重で『開く』かっこが足りない文章です』",
            errors: [
                {
                    message: "』の対となる『が見つかりません。『』",
                    column: 20
                }
            ]
        },
        {
            text: "』開くかっこが『複数』足りない文章です』",
            errors: [
                {
                    message: "』の対となる『が見つかりません。『』",
                    column: 1
                },
                {
                    message: "』の対となる『が見つかりません。『』",
                    column: 20
                }
            ]
        }
    ]
});
