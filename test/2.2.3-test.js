// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/2.2.3";

const tester = new TextLintTester();
tester.run("2.2.3. 一部の助数詞の表記", rule, {
    valid: ["3か月未満", "[3ヶ月](https://example.com)", "> 3ヶ月未満", "*3ヶ月未満*", "数ヶ月"],
    invalid: [
        {
            text: "3ヶ月未満",
            output: "3か月未満",
            errors: [
                {
                    message: `3ヶ月 => 3か月`,
                    index: 0
                }
            ]
        },
        {
            text: "3ヶ月未満。",
            output: "3か月未満。",
            errors: [{ message: `3ヶ月 => 3か月`, index: 0 }]
        },
        {
            text: "10ヶ所",
            output: "10か所",
            errors: [{ message: `10ヶ所 => 10か所`, index: 0 }]
        },
        {
            text: "5ヶ年計画。",
            output: "5か年計画。",
            errors: [{ message: `5ヶ年 => 5か年`, index: 0 }]
        },
        {
            text: "3ヶ国と12ヶ月",
            output: "3か国と12か月",
            errors: [
                { message: `3ヶ国 => 3か国`, index: 0 },
                { message: `12ヶ月 => 12か月`, index: 4 }
            ]
        },
        {
            text: "# 3ヶ月",
            output: "# 3か月",
            errors: [{ message: `3ヶ月 => 3か月`, index: 2 }]
        }
    ]
});
