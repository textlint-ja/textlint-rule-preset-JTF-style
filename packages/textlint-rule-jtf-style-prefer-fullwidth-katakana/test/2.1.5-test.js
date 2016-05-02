// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/2.1.5";
var tester = new TextLintTester();
tester.run("2.1.5.カタカナ", rule, {
    valid: [
        "カタカナ",
        "2.1.5.カタカナ",
        "㌕は大丈夫。",
        "_ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ_"// Strではない
    ],
    invalid: [
        {
            text: "アジヤ",
            errors: [
                {
                    message: "アジヤ => アジア"
                }
            ]
        },
        {
            text: `

ｱｼﾞｱ

`,
            output:`

アジア

`,
            errors: [
                {
                    message: "カタカナは「全角」で表記します。"
                }
            ]
        },
        {
            text: "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ",
            output: "ヲァィゥェォャュョッーアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン゛゜",
            errors: [
                {
                    message: "カタカナは「全角」で表記します。",
                    line: 1,
                    column: 1
                }
            ]
        },
        {
            text: "ｵﾔﾂは300円まで",
            output: "オヤツは300円まで",
            errors: [
                {
                    message: "カタカナは「全角」で表記します。",
                    line: 1,
                    column: 1
                }
            ]
        }

    ]
});
