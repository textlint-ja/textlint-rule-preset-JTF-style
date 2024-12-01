// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/3.3";
var tester = new TextLintTester();
tester.run("3.3.かっこ類と隣接する文字の間のスペースの有無", rule, {
    valid: [
        "「良い」",
        "テスト［文章］です",
        "これは (test) です",
        `
実装をみてもらうと分かりますが、JavaScriptの\`prototype\`の仕組みをそのまま利用しています。
そのため、特別な実装は必要なく
「拡張する時は\`calculator.prototype\`の代わりに\`calculator.fn\`を拡張してください」
というルールがあるだけとも言えます。
`,
        {
            text: "Page(s)",
            options: {
                requireOutsideHalfParentheses: true
            }
        }
    ],
    invalid: [
        {
            text: "「 ダメ」",
            output: "「ダメ」",
            errors: [{ message: "かっこの外側、内側ともにスペースを入れません。" }]
        },
        {
            text: "これは 「ダメ」です",
            output: "これは「ダメ」です",
            errors: [
                {
                    message: "かっこの外側、内側ともにスペースを入れません。",
                    line: 1,
                    column: 4
                }
            ]
        },
        {
            text: "これは （ダメ） です",
            output: "これは（ダメ）です",
            errors: [
                {
                    message: "かっこの外側、内側ともにスペースを入れません。",
                    line: 1,
                    column: 4
                },
                {
                    message: "かっこの外側、内側ともにスペースを入れません。",
                    line: 1,
                    column: 9
                }
            ]
        },
        {
            text: "これはダメ (test) です",
            output: "これはダメ(test)です",
            options: {
                allowOutsideHalfParentheses: false
            },
            errors: [
                {
                    message: "かっこの外側、内側ともにスペースを入れません。",
                    line: 1,
                    column: 6
                },
                {
                    message: "かっこの外側、内側ともにスペースを入れません。",
                    line: 1,
                    column: 13
                }
            ]
        },
        {
            text: "これはダメ(test)です",
            output: "これはダメ (test) です",
            options: {
                requireOutsideHalfParentheses: true
            },
            errors: [
                {
                    message: "半角かっこの外側に半角スペースが必要です。",
                    line: 1,
                    column: 6
                },
                {
                    message: "半角かっこの外側に半角スペースが必要です。",
                    line: 1,
                    column: 11
                }
            ]
        },
        {
            text: `TEST

- TODO

これは 「ダメ」です
`,
            output: `TEST

- TODO

これは「ダメ」です
`,
            errors: [
                {
                    message: "かっこの外側、内側ともにスペースを入れません。",
                    line: 5,
                    column: 4
                }
            ]
        }
    ]
});
