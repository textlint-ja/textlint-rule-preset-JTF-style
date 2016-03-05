// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/3.1.2";
var tester = new TextLintTester();
tester.run("3.1.2. 全角文字どうし", rule, {
    valid: [
        "これは正解",
        "This is 大丈夫",
        "This is a pen.",
        "ユーザー インターフェース"//カタカナは例外
    ],
    invalid: [
        {
            text: "これは ダメ",
            output: "これはダメ",
            errors: [
                {
                    message: "原則として、全角文字どうしの間にスペースを入れません。",
                    column: 4
                }
            ]
        },
        {
            text: "これは どういうこと？",
            output: "これはどういうこと？",
            errors: [
                {
                    message: "原則として、全角文字どうしの間にスペースを入れません。",
                    column: 4
                }
            ]
        }
    ]
});
