// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/3.2";
var tester = new TextLintTester();
tester.run("3.2.カタカナ語間のスペースの有無", rule, {
    valid: [
        "カタカナ・カタカナ",
        "カタカナ カタカナ",
        "カタカナ、カタカナ",// 例外としてしょうがない気がする
        "あいう　えお",
        "インターフェース ブラウザ"
    ],
    invalid: [
        {
            text: "カタカナ　カタカナ",
            errors: [
                {
                    message: "カタカナ語間は中黒（・）または半角スペースを用いてカタカナ語を区切ります",
                    column: 5
                }
            ]
        }
    ]
});
