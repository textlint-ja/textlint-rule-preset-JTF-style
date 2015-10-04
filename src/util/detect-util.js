// LICENSE : MIT
"use strict";
export function isJapanese(text) {
    return /[亜-熙ぁ-んァ-ヶ]/.test(text)
}