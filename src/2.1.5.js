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
import { isUserWrittenNode } from "./util/node-util";
import prh from "textlint-rule-prh";
import path from "path";
import fs from "fs";
import { matchCaptureGroupAll } from "match-index";
import moji from "moji";
/**
 * 半角カタカナを全角カタカナに変換
 *
 * @param {String} str 変換したい文字列
 */
function toZenkaku(string) {
    return moji(string).convert("HK", "ZK").toString();
}

function reporter(context) {
    let { Syntax, RuleError, fixer, report, getSource } = context;
    // 辞書ベースのカタカタ表記のチェックを行う
    let dictRule = prh.fixer(context, {
        ruleContents: [fs.readFileSync(path.join(__dirname, "..", "dict", "2.1.5.yml"), "utf-8")]
    });
    let originalStrRule = dictRule[Syntax.Str];
    // 半角カタカナの使用をチェックする
    dictRule[Syntax.Str] = function (node) {
        originalStrRule(node);
        if (!isUserWrittenNode(node, context)) {
            return;
        }
        const text = getSource(node);
        const matches = matchCaptureGroupAll(text, /([\uFF65-\uFF9F]+)/g);
        matches.forEach((match) => {
            const { index, text } = match;
            report(
                node,
                new RuleError("カタカナは「全角」で表記します。", {
                    index: index,
                    fix: fixer.replaceTextRange([index, index + text.length], toZenkaku(text))
                })
            );
        });
    };
    return dictRule;
}
module.exports = {
    linter: reporter,
    fixer: reporter
};
