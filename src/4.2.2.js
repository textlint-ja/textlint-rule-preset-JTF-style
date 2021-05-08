// LICENSE : MIT
"use strict";
/*
4.2.2.疑問符(?)
和文の実務文章の場合、本文では疑問符を多用しません。
原文で疑問符が使われている場合も、和文ではできるだけ句点を使用します。
ただし、見出しや広告関連の文章、読み手の回答を求める質問文など、
疑問符の使用が適切と判断される場合には、疑問符を使用します。
使用する場合は「全角」で表記します。
文末に疑問符を使用し、後に別の 文が続く場合は、直後に全角スペースを挿入します。
文中に疑問符を使用する場合はスペースを挿入しません。
 */
import { isUserWrittenNode } from "./util/node-util";
import { matchCaptureGroupAll } from "match-index";
import regx from "regx";
import { japaneseRegExp } from "./util/regexp";
const rx = regx("g");
function reporter(context) {
    let { Syntax, RuleError, report, fixer, getSource } = context;
    return {
        [Syntax.Str](node) {
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            let text = getSource(node);
            // 和文で半角の?は利用しない
            const matchRegExp = rx`${japaneseRegExp}(\?)`;
            matchCaptureGroupAll(text, matchRegExp).forEach((match) => {
                const { index } = match;
                return report(
                    node,
                    new RuleError("疑問符(？)を使用する場合は「全角」で表記します。", {
                        index: index,
                        fix: fixer.replaceTextRange([index, index + 1], "？")
                    })
                );
            });
            // ？の後ろは全角スペースが推奨
            // 半角スペースである場合はエラーとする
            const matchAfter = /？( )[^\n]/;
            matchCaptureGroupAll(text, matchAfter).forEach((match) => {
                const { index } = match;
                return report(
                    node,
                    new RuleError("文末に疑問符を使用し、後に別の文が続く場合は、直後に全角スペースを挿入します。", {
                        index: index,
                        fix: fixer.replaceTextRange([index, index + 1], "　")
                    })
                );
            });
        }
    };
}
module.exports = {
    linter: reporter,
    fixer: reporter
};
