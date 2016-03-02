// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/4.1.1";
var tester = new TextLintTester();
tester.run("4.1.1.句点(。)", rule, {
    valid: [
        "A 氏は「5 月に新製品を発売します」と述べました。",
        "従業員は約 30,000 人です(関連企業を含みます)。"
    ],
    invalid: [
        {
            text: "A 氏は「5 月に新製品を発売します。」と述べました。",
            output: "A 氏は「5 月に新製品を発売します」と述べました。",
            errors: [
                {
                    message: "文中にかぎかっこが入る場合は、閉じかっこの前に句点を打ちません。",
                    column: 19
                }
            ]
        },
        {
            text: "従業員は約 30,000 人です(関連企業を含みます。)",
            output: "従業員は約 30,000 人です(関連企業を含みます)",
            errors: [
                {
                    message: "文中にかぎかっこが入る場合は、閉じかっこの前に句点を打ちません。",
                    line: 1,
                    column: 27
                }
            ]
        }
    ]
});
