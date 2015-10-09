// LICENSE : MIT
"use strict";
require("../src/");
// test prh rule
import TextLintTester from "textlint-tester";
var tester = new TextLintTester();
// 実際のテストはymlファイル自体に書かれている
// それを実行するために使うだけのテストファイル
tester.run("2.2.3.一部の助数詞の表記", require("../src/2.2.3"), {
    valid: [
        "これは正常なテキストです"
    ]
});
tester.run("2.2.1.ひらがなと漢字の使い分け", require("../src/2.2.1"), {
    valid: [
        "これは正常なテキストです"
    ]
});