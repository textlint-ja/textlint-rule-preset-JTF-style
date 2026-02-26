// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/2.2.1";

const tester = new TextLintTester();
tester.run("2.2.1.ひらがなと漢字の使い分け", rule, {
    valid: ["問題は以下のとおりです", "ときどき確認する", "彼のために尽くす"],
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
        },
        {
            text: "到達する為に",
            output: "到達するために",
            errors: [
                {
                    message: "為に => ために",
                    index: 4
                }
            ]
        },
        {
            text: "彼の為に",
            output: "彼のために",
            errors: [
                {
                    message: "の為 => のため",
                    index: 1
                }
            ]
        }
    ]
});
