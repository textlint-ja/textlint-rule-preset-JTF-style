// LICENSE : MIT
"use strict";
const flagsGetter = require('regexp.prototype.flags');
const assert = require("assert");
/**
 * @typedef {Object} MatchCaptureGroup
 * @property {string} text - text is matched texts
 * @property {number} index - index is start of match
 */
export function matchCaptureGroupAll(text, regExp) {
    const source = regExp.source;
    assert(source.indexOf("(") >= 0, "RegExp should contain capture group at least one");
    const all = matchAll(text, regExp);
    const captureGroups = [];
    all.forEach(match => {
        match.captureGroups.forEach(captureGroup => {
            captureGroups.push(captureGroup);
        });
    });
    return captureGroups;
}
/**
 *
 * @param {string} text
 * @param {RegExp} regExp
 * @returns {Array}
 * @see reference https://github.com/tc39/String.prototype.matchAll
 */
export function matchAll(text, regExp) {
    const matches = [];
    let flags = regExp.flags || flagsGetter(regExp);
    if (flags.indexOf('g') === -1) {
        flags = 'g' + flags;
    }
    const rx = new RegExp(regExp.source, flags);
    text.replace(rx, function () {
        var matchAll = Array.prototype.slice.call(arguments, 0, -2);
        var match = {};
        match.all = matchAll;

        match.input = arguments[arguments.length - 1];
        match.index = arguments[arguments.length - 2];
        const groups = matchAll.slice(1);

        const captureGroups = [];
        for (let cursor = match.index, l = groups.length, i = 0; i < l; i++) {
            let index = cursor;

            if (i + 1 !== l && groups[i] !== groups[i + 1]) {
                const nextIndex = text.indexOf(groups[i + 1], cursor);
                while (true) {
                    const currentIndex = text.indexOf(groups[i], index);
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
        }
        match.captureGroups = captureGroups;
        matches.push(match);
        /*
            index,
            input
            all
            captureGroups = [{
                text,
                index
            }]
         */
    });
    return matches;
}
