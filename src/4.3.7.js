// LICENSE : MIT
"use strict";
/*
4.3.7.山かっこ<>
原則として和文では使用しません。
原文で山かっこが使用されており、原文どおりに使用する必要がある場合のみ使用します。
 */
import { checkPair } from "./util/pair-checker";
module.exports = function (context) {
    return checkPair(context, {
        left: "<",
        right: ">"
    });
};
