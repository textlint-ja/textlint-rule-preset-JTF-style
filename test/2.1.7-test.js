// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/2.1.7";
var tester = new TextLintTester();
tester.run("2.1.7.カタカナ複合語", rule, {
    valid: [
        "カタカナ・カタカナ",
        "カタカナ カタカナ",
        "カタカナ、カタカナ", // 例外としてしょうがない気がする
        "あいう　えお",
        "インターフェース ブラウザ"
    ],
    invalid: [
        {
            text: "カタカナ　カタカナ",
            errors: [
                {
                    message: "カタカナ語間は中黒（・）または半角スペースを用いてカタカナ語を区切って表記します。",
                    column: 5
                }
            ]
        }
    ]
});
