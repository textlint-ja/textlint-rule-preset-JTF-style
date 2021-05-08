// LICENSE : MIT
"use strict";
/*
2.1.2.漢字
漢字は「全角」で表記します。漢字の使用は、平成 22 年 11 月 30 日内閣告示第 2 号の「常用漢字表」に原則として準じます。
ただし、「常用漢字表」にない漢字であっても実務翻訳で慣用的に用いられる語には漢字を使います。
 */
import { isUserWrittenNode } from "./util/node-util";
import { isJoyo } from "sorted-joyo-kanji";
import { kanjiRegExp } from "./util/regexp";
// http://qiita.com/YusukeHirao/items/2f0fb8d5bbb981101be0
function stringToArray(value) {
    return value.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
}

module.exports = function (context) {
    let { Syntax, RuleError, report, getSource } = context;
    return {
        [Syntax.Str](node) {
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            const text = getSource(node);
            const strArray = stringToArray(text);
            for (let index = 0; index < strArray.length; index++) {
                const item = strArray[index];
                if (kanjiRegExp.test(item) && !isJoyo(item)) {
                    report(
                        node,
                        new RuleError("「" + item + "」は「常用漢字表」外の漢字です。", {
                            index
                        })
                    );
                }
            }
        }
    };
};
