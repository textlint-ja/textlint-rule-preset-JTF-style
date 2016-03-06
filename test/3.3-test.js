// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/3.3";
var tester = new TextLintTester();
tester.run("3.3.かっこ類と隣接する文字の間のスペースの有無", rule, {
    valid: [
        "「良い」",
        "テスト［文章］です",
        `
実装をみてもらうと分かりますが、JavaScriptの\`prototype\`の仕組みをそのまま利用しています。
そのため、特別な実装は必要なく
「拡張する時は\`calculator.prototype\`の代わりに\`calculator.fn\`を拡張してください」
というルールがあるだけとも言えます。
`
    ],
    invalid: [
        {
            text: "「 ダメ」",
            output: "「ダメ」",
            errors: [
                {message: "かっこの外側、内側ともにスペースを入れません。"}
            ]
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
        }
    ]
});
