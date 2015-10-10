// LICENSE : MIT
"use strict";
import assert from "assert"
import index from "../src/index";
describe("index-test", function () {
    context("rules", function () {
        it("should have default rulesConfig", function () {
            Object.keys(index.rules).forEach(ruleName => {
                assert(index.rulesConfig[ruleName] !== undefined);
            });
        });
        it("should not ref same function", function () {
            Object.keys(index.rules).forEach(ruleName => {
                let rule = index.rules[ruleName];
                Object.keys(index.rules).forEach(otherRuleName => {
                    if (otherRuleName !== ruleName) {
                        assert(rule !== index.rules[otherRuleName]);
                    }
                });
            });
        });
    });
});