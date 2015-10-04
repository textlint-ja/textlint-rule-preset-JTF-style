// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/1.2.2.ピリオド(.)とカンマ(,)";
var tester = new TextLintTester();
tester.run("1.2.2.ピリオド(.)とカンマ(,)", rule, {
    valid: [
        "The Ministry of Economy, Trade and Industry"
    ],
    invalid: [
        // text, expected errors
        {
            text: "785，105",
            errors: [
                {message: "全角のピリオドとカンマは使用しません。"}
            ]
        },
        {
            text: "785．105",
            errors: [
                {message: "全角のピリオドとカンマは使用しません。"}
            ]
        }
    ]
});