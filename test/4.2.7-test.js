// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/4.2.7";
var tester = new TextLintTester();
tester.run("4.2.7.コロン(：)", rule, {
    valid: [
        "日時：3月16日午後 1 時",
        "例：〜",
        "1: これはペンです"// [^和文]: のパターン
    ],
    invalid: [
        {
            text: "例:〜",
            errors: [
                {
                    message: "コロン(：)を使用する場合は「全角」で表記します。",
                    column: 1
                }
            ]
        }
    ]
});
