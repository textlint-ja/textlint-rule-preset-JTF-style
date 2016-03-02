// LICENSE : MIT
"use strict";
import assert from "power-assert";
import preset from "../src/index";
import {TextLintCore} from "textlint"
import * as fs from "fs";
describe("fixer-test", function () {
    it("should convert expected", function () {
        const expected = fs.readFileSync(__dirname + "/fixtures/expected.md", "utf-8");
        const textlint = new TextLintCore();
        textlint.setupRules(preset.rules, preset.rulesConfig);
        return textlint.fixFile(__dirname + "/fixtures/replace.md").then(result => {
            const output = result.output;
            assert.equal(output, expected);
        });
    });
});