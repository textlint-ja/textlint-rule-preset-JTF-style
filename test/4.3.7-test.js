// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/4.3.7";
var tester = new TextLintTester();
tester.run('4.3.7.山かっこ<>', rule, {
    valid: [
        '彼は<×××>を参照してくださいと言った。',
        '彼は<`×××`>を参照してくださいと言った。',
        '- 彼は<×××>を参照してくださいと言った。'
    ],
    invalid: [
        {
            text: '<対となるがない中かっこがない文章です。',
            errors: [
                {
                    message: '<の対となる>が見つかりません。<>',
                    column: 1
                }
            ]
        },
        {
            text: `<パラグラフをまたぐような

文章>は認められない。`,
            errors: [
                {
                    message: '<の対となる>が見つかりません。<>',
                    column: 1
                }
            ]
        },
        {
            // ListItem -> Paragraphなので
            text: '- <これはプラグイン',
            errors: [
                {
                    message: '<の対となる>が見つかりません。<>',
                    column: 3
                }
            ]
        }

    ]
});
