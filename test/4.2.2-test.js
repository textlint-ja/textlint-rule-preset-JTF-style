// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/4.2.2";
var tester = new TextLintTester();
tester.run("4.2.2.疑問符(?)", rule, {
    valid: [
        "【原文】Does the reader understand the document?",
        "【訳文】読者は文書の内容を理解しているでしょうか。",
        "オプションを変更しますか？",
        "A 社の成功の秘密とは？ この本ではそれをご紹介します。",
        "どう操作したらよいのか？というユーザーの疑問に答えます。"
    ],
    invalid: [
        {
            text: "半角疑問符?",
            errors: [
                {message: "疑問符(？)を使用する場合は「全角」で表記します。"}
            ]
        }
    ]
});
