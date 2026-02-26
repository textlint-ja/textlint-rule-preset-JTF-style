// LICENSE : MIT
"use strict";
/*
2.1.7.カタカナ複合語
中黒または半角スペースを用いてカタカナ語を区切って表記します。
 */
import { isUserWrittenNode } from "./util/node-util";
import { matchCaptureGroupAll } from "match-index";

module.exports = function (context) {
    let { Syntax, RuleError, report, getSource } = context;
    return {
        [Syntax.Str](node) {
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            const text = getSource(node);
            // カタカナ(カタカナ以外)カタカナ のパターンを取り出す
            matchCaptureGroupAll(text, /[ァ-ヶー]([^[ァ-ヶー])[ァ-ヶー]/).forEach((match) => {
                // カタカナの間を全角スペースでは区切らない
                const { text } = match;
                if (text === "　") {
                    report(
                        node,
                        new RuleError(
                            "カタカナ語間は中黒（・）または半角スペースを用いてカタカナ語を区切って表記します。",
                            {
                                index: match.index
                            }
                        )
                    );
                }
            });
        }
    };
};
