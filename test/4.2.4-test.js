// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/4.2.4";
var tester = new TextLintTester();
tester.run("4.2.4.中黒(・)", rule, {
    valid: ["小・中学校", "パーソナル・コンピューター"],
    invalid: [
        {
            text: "小･中学校",
            errors: [
                {
                    message: "カタカナ複合語を区切る場合または同格の語句を並列する場合には全角の中黒（・）を使用します。",
                    column: 2
                }
            ]
        }
    ]
});
