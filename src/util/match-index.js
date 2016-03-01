// LICENSE : MIT
"use strict";
/**
 * @typedef {Object} MatchIndexResult
 * @property {string} text - text is matched texts
 * @property {number} index - index is start of match
 */
/**
 *
 * @param {string} text
 * @param {RegExp} regExp
 * @returns {MatchIndexResult[]}
 */
export default function matchIndex(text, regExp) {
    const res = [];
    const subs = text.match(regExp);
    if (!subs) {
        return res;
    }
    // matches only
    // if has .input , then slice matches only
    const matches = subs.input ? subs.slice(1) : subs;
    for (var cursor = matches.index, l = matches.length, i = 0; i < l; i++) {
        let index = cursor;

        if (i + 1 !== l && matches[i] !== matches[i + 1]) {
            const nextIndex = text.indexOf(matches[i + 1], cursor);
            while (true) {
                var currentIndex = text.indexOf(matches[i], index);
                if (currentIndex !== -1 && currentIndex <= nextIndex) {
                    index = currentIndex + 1;
                } else {
                    break;
                }
            }
            index--;
        } else {
            index = text.indexOf(matches[i], cursor);
        }
        cursor = index + matches[i].length;

        res.push({
            text: matches[i],
            index
        });
    }
    return res;
}
