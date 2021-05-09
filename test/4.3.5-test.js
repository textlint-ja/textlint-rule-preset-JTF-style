// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/4.3.5";
var tester = new TextLintTester();
tester.run('4.3.5.二重引用符""', rule, {
    valid: [
        '彼は"×××"を参照してくださいと言った。',
        '彼は"`×××`"を参照してくださいと言った。',
        '彼は"**×××**"を参照してくださいと言った。',
        `これは複数行の例

彼は"×××"を参照してくださいと言った。
        `,
        '- 彼は"×××"を参照してくださいと言った。',
        'いわゆる"スマート"な都市',
        '彼は"xxx" "`a=1;`"を参照してくださいと言った。',
        '彼は"xxx" "`a="x;`"を参照してくださいと言った。コード内の不一定は"無視"されます。'
    ],
    invalid: [
        {
            text: '"対となる二重引用符がない文章です。',
            errors: [
                {
                    message: '"の対となる"が見つかりません。""',
                    column: 1
                }
            ]
        },
        {
            text: `"パラグラフをまたぐような

文章"は認められない。`,
            errors: [
                {
                    message: '"の対となる"が見つかりません。""',
                    column: 1
                },
                {
                    message: '"の対となる"が見つかりません。""',
                    column: 3
                }
            ]
        },
        {
            // ListItem -> Paragraphなので
            text: '- "これはプラグイン',
            errors: [
                {
                    message: '"の対となる"が見つかりません。""',
                    column: 3
                }
            ]
        },
        {
            text: '彼は"xxx" "`a="x";`" "yyy を参照してくださいと言った。',
            errors: [
                {
                    message: '"の対となる"が見つかりません。""',
                    column: 20
                }
            ]
        }
    ]
});
