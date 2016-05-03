// LICENSE : MIT
"use strict";
/*
4.3.5.二重引用符""
引用や語句を強調する場合に使用します。和文では多用しません。
 */
import {checkPair} from "./util/pair-checker";
export default function (context) {
    return checkPair(context, {
        left: '"',
        right: '"'
    });
}