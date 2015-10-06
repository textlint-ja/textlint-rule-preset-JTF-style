// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/4.2.1";
var tester = new TextLintTester();
tester.run("4.2.1.感嘆符(!)", rule, {
    valid: [
        "【原文】Just plug it in, and coffee is ready in three minutes!",
        "【訳文】プラグを差し込めば、3 分でコーヒーができます。",
        "警告！",
        "驚きの速さ！　これが新製品のキャッチコピーでした。"// 文末感嘆符+全角スペース
    ],
    invalid: [
        {
            text: "半角感嘆符!",
            errors: [
                {message: "感嘆符(！)を使用する場合は「全角」で表記します。"}
            ]
        },
        {
            text: "驚きの速さ！ これが新製品のキャッチコピーでした。半角　",
            errors: [
                {message: "文末に感嘆符を使用し、後に別の文が続く場合は、直後に全角スペースを挿入します。"}
            ]
        }
    ]
});
