// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/4.3.2";
var tester = new TextLintTester();
tester.run("4.3.2.大かっこ［］", rule, {
    valid: ["［ファイル］メニュー", "- [ ] TODO", "[link](http://example.com)"],
    invalid: [
        {
            // 半角かっこ Markdown的に意味を持つので片方ずつ
            text: "半角[かっこ",
            output: "半角［かっこ",
            errors: [
                {
                    message: "半角の大かっこ[]が使用されています。全角のかっこ［］を使用してください。",
                    column: 3
                }
            ]
        },
        {
            // 開きかっこが日本語に隣接していない位置（行頭や数字の後ろ）でも修正する
            // https://github.com/textlint-ja/textlint-rule-preset-JTF-style/issues/93
            text: "1. [ファイル]をクリック",
            output: "1. ［ファイル］をクリック",
            errors: [
                {
                    message: "半角の大かっこ[]が使用されています。全角のかっこ［］を使用してください。",
                    column: 4
                },
                {
                    message: "半角の大かっこ[]が使用されています。全角のかっこ［］を使用してください。",
                    column: 9
                }
            ]
        },
        {
            // 半角かっこ Markdown的に意味を持つので片方ずつ
            text: "半角]かっこ",
            output: "半角］かっこ",
            errors: [
                {
                    message: "半角の大かっこ[]が使用されています。全角のかっこ［］を使用してください。",
                    column: 3
                }
            ]
        }
    ]
});
