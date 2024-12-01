// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/4.3.1.js";
var tester = new TextLintTester();
tester.run("4.3.1.丸かっこ()", rule, {
    valid: [
        "クォーク（物質の素粒子）",
        "（物質の素粒子）クォーク",
        "（物質の素粒子）",
        "（npm 2.x以上をインストールしている必要があります）",
        "（必要バージョン： 2.x）",
        // 英語のみの半角括弧は許可
        // https://github.com/textlint-ja/textlint-rule-preset-JTF-style/issues/79
        "これは (English text in half-width parens) です。",
        "これは(English text in half-width parens)です。"
    ],
    invalid: [
        {
            // 半角かっこ
            text: "クォーク(物質の素粒子)",
            output: "クォーク（物質の素粒子）",
            errors: [
                {
                    message: "半角のかっこ()が使用されています。全角のかっこ（）を使用してください。",
                    column: 5
                },
                {
                    message: "半角のかっこ()が使用されています。全角のかっこ（）を使用してください。",
                    column: 12
                }
            ]
        },
        {
            // 半角かっこ
            text: "(物質の素粒子)クォーク",
            output: "（物質の素粒子）クォーク",
            errors: [
                {
                    message: "半角のかっこ()が使用されています。全角のかっこ（）を使用してください。",
                    column: 1
                },
                {
                    message: "半角のかっこ()が使用されています。全角のかっこ（）を使用してください。",
                    column: 8
                }
            ]
        },
        {
            // 半角かっこ
            text: "(物質の素粒子)",
            output: "（物質の素粒子）",
            errors: [
                {
                    message: "半角のかっこ()が使用されています。全角のかっこ（）を使用してください。",
                    column: 1
                },
                {
                    message: "半角のかっこ()が使用されています。全角のかっこ（）を使用してください。",
                    column: 8
                }
            ]
        },
        {
            //  半角かっこ
            text: "(npm 2.x以上をインストールしている必要があります)",
            output: "（npm 2.x以上をインストールしている必要があります）",
            errors: [
                {
                    message: "半角のかっこ()が使用されています。全角のかっこ（）を使用してください。",
                    column: 1
                },
                {
                    message: "半角のかっこ()が使用されています。全角のかっこ（）を使用してください。",
                    column: 29
                }
            ]
        },
        {
            // 半角かっこ
            text: "(必要バージョン： 2.x)",
            output: "（必要バージョン： 2.x）",
            errors: [
                {
                    message: "半角のかっこ()が使用されています。全角のかっこ（）を使用してください。",
                    column: 1
                },
                {
                    message: "半角のかっこ()が使用されています。全角のかっこ（）を使用してください。",
                    column: 14
                }
            ]
        },
        {
            // 半角かっこ
            text: "例)テスト",
            output: "例）テスト",
            errors: [
                {
                    message: "半角のかっこ()が使用されています。全角のかっこ（）を使用してください。",
                    column: 2
                }
            ]
        }
    ]
});
