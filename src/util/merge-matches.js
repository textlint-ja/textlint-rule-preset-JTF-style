// LICENSE : MIT
"use strict";
/**
 * merge MatchCaptureGroup
 * @param {...MatchCaptureGroup} aMatches
 * @returns {Array}
 */
export default function mergeMatches(...aMatches) {
    const results = [];
    aMatches.forEach(matches => {
        matches.forEach(targetMatch => {
            const alreadyHave = results.some(match => {
                const {text, index} = match;
                return targetMatch.index === index && targetMatch.text === text;
            });
            if (!alreadyHave) {
                results.push(targetMatch);
            }
        });
    });
    return results;
}
