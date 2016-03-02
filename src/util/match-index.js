// LICENSE : MIT
"use strict";

var flagsGetter = require('regexp.prototype.flags');
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
    var matches = [];
    const captureGroupsAll = [];
    var flags = regExp.flags || flagsGetter(regExp);
    if (flags.indexOf('g') === -1) {
        flags = 'g' + flags;
    }
    var rx = new RegExp(regExp.source, flags);
    text.replace(rx, function () {
        var matchAll = Array.prototype.slice.call(arguments, 0, -2);
        var match = {};
        match.all = matchAll;

        match.input = arguments[arguments.length - 1];
        match.index = arguments[arguments.length - 2];
        const groups = matchAll.slice(1);

        const captureGroups = [];
        for (var cursor = match.index, l = groups.length, i = 0; i < l; i++) {
            var index = cursor;

            if (i + 1 !== l && groups[i] !== groups[i + 1]) {
                var nextIndex = text.indexOf(groups[i + 1], cursor);
                while (true) {
                    var currentIndex = text.indexOf(groups[i], index);
                    if (currentIndex !== -1 && currentIndex <= nextIndex) {
                        index = currentIndex + 1;
                    } else {
                        break;
                    }
                }
                index--;
            } else {
                index = text.indexOf(groups[i], cursor);
            }
            cursor = index + groups[i].length;
            const captureGroup = {
                text: groups[i],
                index
            };
            captureGroups.push(captureGroup);
            // _? resutl
            captureGroupsAll.push(captureGroup)
        }
        match.captureGroups = captureGroups;
        matches.push(match);
        // example: ['test1', 'e', 'st1', '1'] with properties `index` and `input`
    });
    return captureGroupsAll;
}
