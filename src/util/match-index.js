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

    for (var cursor = subs.index, l = subs.length, i = 1; i < l; i++) {
        let index = cursor;

        if (i + 1 !== l && subs[i] !== subs[i + 1]) {
            const nextIndex = text.indexOf(subs[i + 1], cursor);
            while (true) {
                var currentIndex = text.indexOf(subs[i], index);
                if (currentIndex !== -1 && currentIndex <= nextIndex) {
                    index = currentIndex + 1;
                } else {
                    break;
                }
            }
            index--;
        } else {
            index = text.indexOf(subs[i], cursor);
        }
        cursor = index + subs[i].length;

        res.push({
            text: subs[i],
            index
        });
    }
    return res;
}
