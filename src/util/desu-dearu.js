// LICENSE : MIT
"use strict";

// This RegExp are based of https://github.com/recruit-tech/redpen/blob/master/redpen-core/src/main/java/cc/redpen/validator/sentence/JapaneseStyleValidator.java
const DEARU_PATTERN = /のだが|ないかと|してきた|であるから/g;
const DEARU_END_PATTERN = /(?:だ|である|った|ではない｜ないか|しろ|しなさい|いただきたい|いただく|ならない|あろう|られる)(?:[。]?)$/;

const DESUMASU_PATTERN = /でしたが|でしたので|ですので|ですが/g;
const DESUMASU_END_PATTERN = /(?:です|ます|ました|ません|ですね|でしょうか|ください|ませ)(?:[。]?)$/;
function countMatchContent(text, reg) {
    let count = 0;
    let matches = text.match(reg) || [];
    count += matches.length;
    return {count, matches};
}
function countMatchContentEnd(text, reg) {
    let count = 0;
    let lines = text.split(/\r\n|\r|\n|\u2028|\u2029/g);
    let matches = [];
    lines.forEach(line => {
        let match = line.match(reg) || [];
        matches = matches.concat(match);
        count += matches.length;
    });
    return {count, matches};
}
function detect(text) {
    let matchDearu = countMatchContent(text, DEARU_PATTERN);
    let matchDearuEnd = countMatchContentEnd(text, DEARU_END_PATTERN);
    let matchDesumasu = countMatchContent(text, DESUMASU_PATTERN);
    let matchDesumasuEnd = countMatchContentEnd(text, DESUMASU_END_PATTERN);
    return {
        dearu: {
            matches: matchDearu.matches.concat(matchDearuEnd.matches),
            count: matchDearu.count + matchDearuEnd.count
        },
        desu: {
            matches: matchDesumasu.matches.concat(matchDesumasu.matches),
            count: matchDesumasu.count + matchDesumasuEnd.count
        }
    }
}