// LICENSE : MIT
"use strict";
export const japaneseRegExp = /(?:[々〇〻\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ])/;
// http://tama-san.com/kanji-regex/ ベース
// "々" は 記号であるため除外
// https://github.com/textlint-ja/textlint-rule-preset-jtf-style/issues/48
export const kanjiRegExp = /(?:[〇〻\u3400-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF])/;
export const hiraganaRegExp = /[ぁ-ん]/;
export const karakanaRegExp = /[ァ-ヶ]/;
// 半角カタカナ
export const hanKarakanaRegExp = /[\uFF65-\uFF9F]/;
