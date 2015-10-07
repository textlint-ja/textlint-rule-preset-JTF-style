// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/3.1.1";
var tester = new TextLintTester();
tester.run("3.1.1. 全角文字と半角文字の間", rule, {
    valid: [
        "JTF標準",
        "This is a pen.",
        "1. `./*.*`にマッチするファイルを取得 = Readable Stream",
        `[CONTRIBUTING.md](./CONTRIBUTING.md)に、書籍で扱うべきプラグインアーキテクチャのProposalの書き方や
Pull Request、コミットのやりかたなどが書かれています。`
    ],
    invalid: [
        {
            text: "JTF 標準",
            errors: [
                {
                    message: "原則として、全角文字と半角文字の間にスペースを入れません。",
                    column: 3
                }
            ]
        },
        {
            text: "これは Unicode",
            errors: [
                {message: "原則として、全角文字と半角文字の間にスペースを入れません。"}
            ]
        },
        {
            text: "これは Unicode",
            errors: [
                {message: "原則として、全角文字と半角文字の間にスペースを入れません。"}
            ]
        }
    ]
});
