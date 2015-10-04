// LICENSE : MIT
"use strict";
import {RuleHelper} from "textlint-rule-helper";
export function isUserWrittenNode(node, context) {
    let helper = new RuleHelper(context);
    let Syntax = context.Syntax;
    return !helper.isChildNode(node, [Syntax.Link, Syntax.Image, Syntax.BlockQuote, Syntax.Emphasis]);

}