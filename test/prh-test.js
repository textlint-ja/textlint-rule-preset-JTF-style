// LICENSE : MIT
"use strict";
// test prh rule
// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
var tester = new TextLintTester();
// 実際のテストはymlファイル自体に書かれている
// それを実行するために使うだけのテストファイル
tester.run("2.2.3.一部の助数詞の表記", require("../src/2.2.3.一部の助数詞の表記"), {
    valid: [
        "これは正常なテキストです"
    ]
});