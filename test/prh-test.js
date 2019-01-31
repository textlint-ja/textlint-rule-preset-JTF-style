// LICENSE : MIT
"use strict";
require("../src/");
// test prh rule
import TextLintTester from "textlint-tester";
var tester = new TextLintTester();
// 実際のテストはymlファイル自体に書かれている
// それを実行するために使うだけのテストファイル
tester.run("2.1.5.カタカナ", require("../src/2.1.5"), {
    valid: ["これは正常なテキストです"]
});

tester.run("2.1.6.カタカナの長音", require("../src/2.1.6"), {
    valid: ["これは正常なテキストです"]
});
tester.run("2.2.3.一部の助数詞の表記", require("../src/2.2.3"), {
    valid: ["これは正常なテキストです"]
});
tester.run("2.2.1.ひらがなと漢字の使い分け", require("../src/2.2.1"), {
    valid: [
        "これは正常なテキストです",
        "名前付きスロットはコンテンツ フラグメントに対応する `slot` 属性を持つ任意の要素に一致します。",
        "Array の値の変更に対しては"
    ]
});
