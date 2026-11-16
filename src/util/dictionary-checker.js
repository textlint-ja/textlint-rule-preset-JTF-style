// LICENSE : MIT
"use strict";
/**
 * 辞書(src/dict/*.js)を使って Str ノードをチェックする
 *
 * 以前は textlint-rule-prh を使っていたが、辞書をチェックするだけならprhのエンジン全体は必要ない。
 * 結果を変えないように、prh 5.4.4 と textlint-rule-prh 6.x の次の挙動をそのまま実装している。
 *
 * - テキストを空行(\n{2,})で段落に分け、段落ごとに全ルールを適用する
 * - `prh:disable` と `prh:disable:パターン` のプラグマ
 * - `regexpMustEmpty: $N` は N番目のグループが空でない場合を無視する
 * - マッチした文字列が expected と同じなら無視する
 * - 重なった検出の除外(同じ位置なら長い方、違う位置なら先にある方)
 * - expected の $N はマッチしたグループで置き換える
 * - Link、BlockQuote、Emphasis の中の Str はチェックしない(textlint-rule-prh のデフォルト)
 */
import { RuleHelper } from "textlint-rule-helper";

const EXPECTED_GROUP = /\$([0-9]{1,2})/g;
const PRAGMA = /^(?:.*?)prh:disable(?::([^\n\s]*))?/gm;
const PARAGRAPH = /([^]*?)\n{2,}/g;

const tailIndexOf = (diff) => diff.index + diff.matches[0].length;

const replaceGroups = (expected, matches) => {
    return expected.replace(EXPECTED_GROUP, (all, group) => {
        const index = parseInt(group, 10);
        if (index === 0 || matches.length - 1 < index) {
            return all;
        }
        return matches[index] || "";
    });
};

/**
 * @param {{expected: string, pattern: RegExp, regexpMustEmpty?: string, prh?: string}[]} dictionary
 */
const compileDictionary = (dictionary) => {
    return dictionary.map((rule) => {
        let mustEmptyIndex = null;
        if (rule.regexpMustEmpty) {
            const match = /^\$([0-9]+)$/.exec(rule.regexpMustEmpty);
            if (match == null) {
                throw new Error(rule.expected + " target failed. please use $1 format.");
            }
            mustEmptyIndex = parseInt(match[1], 10);
        }
        return {
            expected: rule.expected,
            pattern: rule.pattern,
            mustEmptyIndex,
            note: rule.prh || null
        };
    });
};

const collectRuleDiffs = (rule, content, diffs) => {
    const pattern = rule.pattern;
    pattern.lastIndex = 0;
    let matches;
    while ((matches = pattern.exec(content))) {
        if (rule.mustEmptyIndex !== null && matches[rule.mustEmptyIndex]) {
            continue;
        }
        if (rule.expected === matches[0]) {
            continue;
        }
        diffs.push({ index: matches.index, matches, rule });
    }
};

const isCollide = (diff, range) => {
    const tailIndex = tailIndexOf(diff);
    if (range.index < diff.index && diff.index < range.tailIndex) {
        return true;
    }
    if (diff.index < range.index && range.index < tailIndex) {
        return true;
    }
    return false;
};

/**
 * prh の Paragraph#makeDiffs と同じ
 */
const makeParagraphDiffs = (rules, paragraphIndex, content, diffs) => {
    let ignoreAll = false;
    let pragmaRanges = null;
    let ignorePatterns = null;
    if (content.indexOf("prh:disable") !== -1) {
        pragmaRanges = [];
        ignorePatterns = [];
        PRAGMA.lastIndex = 0;
        let matches;
        while ((matches = PRAGMA.exec(content))) {
            if (!matches[1]) {
                ignoreAll = true;
                continue;
            }
            pragmaRanges.push({ index: matches.index, tailIndex: matches.index + matches[0].length });
            ignorePatterns.push(new RegExp("(" + matches[1] + ")", "g"));
        }
    }
    if (ignoreAll) {
        return;
    }
    const paragraphDiffs = [];
    for (const rule of rules) {
        collectRuleDiffs(rule, content, paragraphDiffs);
    }
    for (const diff of paragraphDiffs) {
        if (pragmaRanges !== null) {
            if (!pragmaRanges.every((range) => !isCollide(diff, range))) {
                continue;
            }
            if (ignorePatterns.some((ignorePattern) => diff.matches[0].match(ignorePattern))) {
                continue;
            }
        }
        diff.index += paragraphIndex;
        diffs.push(diff);
    }
};

/**
 * prh の ChangeSet#_prepare と同じ
 * 2つ目の filter は1つ目の filter の結果を参照する(prh と同じ)
 */
const prepareDiffs = (diffs) => {
    diffs.sort((a, b) => {
        if (a.index !== b.index) {
            return a.index - b.index;
        }
        return tailIndexOf(a) - tailIndexOf(b);
    });
    const longestAtSameIndex = diffs.filter((diff, idx) => {
        const next = diffs[idx + 1];
        if (!next) {
            return true;
        }
        return !(diff.index === next.index && tailIndexOf(diff) < tailIndexOf(next));
    });
    return longestAtSameIndex.filter((diff, idx) => {
        const prev = longestAtSameIndex[idx - 1];
        if (!prev) {
            return true;
        }
        return !(diff.index < tailIndexOf(prev));
    });
};

/**
 * prh の Engine#makeChangeSet と同じ
 */
const makeDiffs = (rules, content) => {
    const diffs = [];
    if (content.indexOf("\n\n") === -1) {
        makeParagraphDiffs(rules, 0, content, diffs);
    } else {
        PARAGRAPH.lastIndex = 0;
        let lastIndex = 0;
        while (true) {
            const matches = PARAGRAPH.exec(content);
            if (!matches) {
                makeParagraphDiffs(rules, lastIndex, content.substr(lastIndex), diffs);
                break;
            }
            makeParagraphDiffs(rules, matches.index, matches[1], diffs);
            lastIndex = PARAGRAPH.lastIndex;
        }
    }
    if (diffs.length === 0) {
        return diffs;
    }
    return prepareDiffs(diffs);
};

/**
 * 辞書でチェックする Str ハンドラーを作る
 * @param context
 * @param {{expected: string, pattern: RegExp, regexpMustEmpty?: string, prh?: string}[]} dictionary
 * @returns {function(node): void}
 */
export function createDictionaryChecker(context, dictionary) {
    const { Syntax, RuleError, report, fixer, getSource } = context;
    const helper = new RuleHelper(context);
    const rules = compileDictionary(dictionary);
    const ignoreNodeTypes = [Syntax.Link, Syntax.BlockQuote, Syntax.Emphasis];
    return (node) => {
        if (helper.isChildNode(node, ignoreNodeTypes)) {
            return;
        }
        const text = getSource(node);
        const diffs = makeDiffs(rules, text);
        // textlint-rule-prh の forEachChange と同じく、前の置換を反映した文字列から actual を取り出す
        let str = text;
        let delta = 0;
        for (const diff of diffs) {
            const matchLength = diff.matches[0].length;
            const expected = replaceGroups(diff.rule.expected, diff.matches);
            const matchStartIndex = diff.index;
            const matchEndIndex = matchStartIndex + matchLength;
            const actual = str.slice(diff.index + delta, diff.index + delta + matchLength);
            str = str.slice(0, diff.index + delta) + expected + str.slice(diff.index + delta + matchLength);
            delta += expected.length - matchLength;
            if (actual === expected) {
                continue;
            }
            const suffix = diff.rule.note !== null ? "\n" + diff.rule.note : "";
            report(
                node,
                new RuleError(actual + " => " + expected + suffix, {
                    index: matchStartIndex,
                    fix: fixer.replaceTextRange([matchStartIndex, matchEndIndex], expected)
                })
            );
        }
    };
}

/**
 * 辞書の1ルールをテキストに適用した結果を返す(辞書の specs のテスト用)
 * prh の Rule#check と同じ
 * @param {{expected: string, pattern: RegExp, regexpMustEmpty?: string}} rule
 * @param {string} text
 * @returns {string}
 */
export function applyDictionaryRule(rule, text) {
    const rules = compileDictionary([rule]);
    const diffs = [];
    collectRuleDiffs(rules[0], text, diffs);
    let str = text;
    let delta = 0;
    for (const diff of prepareDiffs(diffs)) {
        const matchLength = diff.matches[0].length;
        const expected = replaceGroups(diff.rule.expected, diff.matches);
        str = str.slice(0, diff.index + delta) + expected + str.slice(diff.index + delta + matchLength);
        delta += expected.length - matchLength;
    }
    return str;
}
