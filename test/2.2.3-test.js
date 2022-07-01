// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/2.2.3";

const tester = new TextLintTester();
tester.run("2.2.3. 一部の助数詞の表記", rule, {
    valid: ["3か月未満"],
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
        }
    ]
});
