// LICENSE : MIT
"use strict";
require("../src/");
// test prh rule
import TextLintTester from "textlint-tester";
var tester = new TextLintTester();
tester.run("2.1.6.カタカナの長音", require("../src/2.1.6"), {
    valid: [
        "これは正常なテキストです"
    ]
});