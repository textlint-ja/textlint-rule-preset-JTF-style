// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/2.2.1";

const tester = new TextLintTester();
tester.run("2.2.1.ひらがなと漢字の使い分け", rule, {
    valid: ["問題は以下のとおりです"],
    invalid: [
        {
            text: "問題は以下の通り",
            output: "問題は以下のとおり",
            errors: [
                {
                    message: `以下の通り => 以下のとおり`,
                    index: 3
                }
            ]
        }
    ]
});
