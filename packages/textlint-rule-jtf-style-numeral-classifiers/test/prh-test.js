// LICENSE : MIT
"use strict";
require("../src/");
// test prh rule
import TextLintTester from "textlint-tester";
var tester = new TextLintTester();
tester.run("2.2.3.一部の助数詞の表記", require("../src/2.2.3"), {
    valid: [
        "これは正常なテキストです"
    ]
});