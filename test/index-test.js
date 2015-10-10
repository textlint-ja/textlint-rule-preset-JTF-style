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
    });
});