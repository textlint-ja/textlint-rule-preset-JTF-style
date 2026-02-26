// LICENSE : MIT
"use strict";
/*
3.3.4.二重かぎかっこ『』
文献、書籍、映画などのタイトルを示す場合や、かぎかっこの中にさらにかぎかっこを入れる場合に使用します。
 */
import { checkPair } from "./util/pair-checker";
module.exports = function (context) {
    return checkPair(context, {
        left: "『",
        right: "』"
    });
};
