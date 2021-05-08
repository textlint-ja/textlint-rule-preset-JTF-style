// LICENSE : MIT
"use strict";
/*
4.3.3.かぎかっこ「」
引用、参照先、入力する文字を示す場合、語句を強調する場合に使用します。

パラグラフをまたぐかぎかっこが存在しないことを検証する
 */
import { checkPair } from "./util/pair-checker";
module.exports = function (context) {
    return checkPair(context, {
        left: "「",
        right: "」"
    });
};
