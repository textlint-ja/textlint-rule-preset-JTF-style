// LICENSE : MIT
"use strict";
import { RuleHelper } from "textlint-rule-helper";

/**
 * ユーザーが書いたと推測されるNodeかどうかを判定する
 * ユーザーが管理できないテキストは対象外としたいため。
 * @param node
 * @param context
 * @returns {boolean}
 */
export function isUserWrittenNode(node, context) {
    let helper = new RuleHelper(context);
    let Syntax = context.Syntax;
    // Strがユーザーに書かれたと断定できるNodeかを判定する
    // LinkやStrongなどはユーザーが書いていない可能性があるStrなので除外する
    if (node.type === Syntax.Str) {
        return helper.isPlainStrNode(node);
    }
    // ブロック要素の互換性のため古い除外ルールも残す
    return !helper.isChildNode(node, [Syntax.Link, Syntax.Image, Syntax.BlockQuote, Syntax.Emphasis]);
}
