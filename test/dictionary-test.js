// LICENSE : MIT
"use strict";
import assert from "assert";
import { applyDictionaryRule } from "../src/util/dictionary-checker";
import dict215 from "../src/dict/2.1.5";
import dict216 from "../src/dict/2.1.6";
import dict221 from "../src/dict/2.2.1";

const dictionaries = {
    "2.1.5": dict215,
    "2.1.6": dict216,
    "2.2.1": dict221
};

describe("dictionary", () => {
    Object.keys(dictionaries).forEach((name) => {
        describe(name, () => {
            dictionaries[name].forEach((rule) => {
                it(`${rule.pattern} => ${rule.expected}`, () => {
                    assert.ok(rule.pattern.global, "pattern should have g flag");
                    (rule.specs || []).forEach((spec) => {
                        assert.strictEqual(applyDictionaryRule(rule, spec.from), spec.to);
                    });
                });
            });
        });
    });
});
