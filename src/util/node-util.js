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
    return !helper.isChildNode(node, [Syntax.Link, Syntax.Image, Syntax.BlockQuote, Syntax.Emphasis]);
}
