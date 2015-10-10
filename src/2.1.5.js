// LICENSE : MIT
"use strict";
/*
2.1.5.カタカナ
カタカナは「全角」で表記します。
半角カタカナは特殊な用途を除いて、原則として使いません。

Halfwidth Katakana variants（半角片仮名）
\uFF65-\uFF9F とする
http://www.asahi-net.or.jp/~ax2s-kmtn/ref/unicode/uff00.html
 */
import {isUserWrittenNode} from "./util/node-util";
import prh from "textlint-rule-prh";
import path from "path";
export default function (context) {
    let {Syntax, RuleError, report, getSource} = context;
    // 辞書ベースのカタカタ表記のチェックを行う
    let dictRule = prh(context, {
        rulePaths: [path.join(__dirname, "..", "dict", "2.1.5.yml")]
    });
    let originalStrRule = dictRule[Syntax.Str];
    // 半角カタカナの使用をチェックする
    dictRule[Syntax.Str] = function (node) {
        originalStrRule(node);
        if (!isUserWrittenNode(node, context)) {
            return;
        }
        let text = getSource(node);
        let matchReg = /[\uFF65-\uFF9F]/;
        let index = text.search(matchReg);
        if (index !== -1) {
            report(node, new RuleError("カタカナは「全角」で表記します。", index));
        }
    };
    return dictRule;
}