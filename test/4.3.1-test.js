// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/4.3.1.js";
var tester = new TextLintTester();
tester.run("4.3.1.丸かっこ()", rule, {
    valid: [
        "クォーク（物質の素粒子）",
        "（物質の素粒子）",
        "（npm 2.x以上をインストールしている必要があります）",
        "Homebrew（ https://brew.sh/index_ja ） （そしてXcode）",
        "インストール方法（macOS/Linux）"
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
            // 半角かっこ
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
            text: "Homebrew( https://brew.sh/index_ja ) (そしてXcode)",
            output: "Homebrew（ https://brew.sh/index_ja ） （そしてXcode）",
            errors: [
                {
                    message: "半角のかっこ()が使用されています。全角のかっこ（）を使用してください。",
                    column: 9
                },
                {
                    message: "半角のかっこ()が使用されています。全角のかっこ（）を使用してください。",
                    column: 36
                },
                {
                    message: "半角のかっこ()が使用されています。全角のかっこ（）を使用してください。",
                    column: 38
                },
                {
                    message: "半角のかっこ()が使用されています。全角のかっこ（）を使用してください。",
                    column: 47
                }
            ]
        },
        {
            // 半角かっこ
            text: "インストール方法(macOS/Linux)",
            output: "インストール方法（macOS/Linux）",
            errors: [
                {
                    message: "半角のかっこ()が使用されています。全角のかっこ（）を使用してください。",
                    column: 9
                },
                {
                    message: "半角のかっこ()が使用されています。全角のかっこ（）を使用してください。",
                    column: 21
                }
            ]
        },
        {
            // 半角かっこ
            text: "例)test",
            output: "例）test",
            errors: [
                {
                    message: "半角のかっこ()が使用されています。全角のかっこ（）を使用してください。",
                    column: 2
                }
            ]
        }
    ]
});
