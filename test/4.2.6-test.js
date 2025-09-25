// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/4.2.6";
var tester = new TextLintTester();
tester.run("4.2.6.ハイフン(-)", rule, {
    valid: [
        "千代田区一番町 1-1-1",
        "03-5555-xxxxx",
        "電話番号は090-1234-5678です",
        "Allen Wirfs-Brock(アレン・ワーフスブラック)",
        "サイン関数は-1から1の範囲の値をとる"
    ],
    invalid: [
        {
            text: "渋谷-東京",
            errors: [
                {
                    message:
                        "原則として和文ではハイフン(-)を使用しません。\n例外は、住所や電話番号の区切りに使う場合です。",
                    column: 3
                }
            ]
        },
        {
            text: "A市-B市",
            errors: [
                {
                    message:
                        "原則として和文ではハイフン(-)を使用しません。\n例外は、住所や電話番号の区切りに使う場合です。",
                    column: 3
                }
            ]
        }
    ]
});
