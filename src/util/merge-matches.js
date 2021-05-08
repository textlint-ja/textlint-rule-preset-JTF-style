// LICENSE : MIT
"use strict";
module.exports = function mergeMatches(...aMatches) {
    const results = [];
    aMatches.forEach((matches) => {
        matches.forEach((targetMatch) => {
            const alreadyHave = results.some((match) => {
                const { text, index } = match;
                return targetMatch.index === index && targetMatch.text === text;
            });
            if (!alreadyHave) {
                results.push(targetMatch);
            }
        });
    });
    return results;
};
