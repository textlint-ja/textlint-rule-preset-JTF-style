// LICENSE : MIT
"use strict";
import assert from "assert";
import preset from "../src/index";
import { TextLintCore } from "textlint";
import path from "path";
import fs from "fs";

describe("fixer-test", function () {
    it("should convert expected", function () {
        const expected = fs.readFileSync(path.join(__dirname, "/fixtures/output.md"), "utf-8");
        const textlint = new TextLintCore();
        // all true
        textlint.setupRules(preset.rules);
        return textlint.fixFile(path.join(__dirname, "/fixtures/input.md")).then((result) => {
            assert.equal(result.remainingMessages.length, 0);
            const inputs = result.output.split("\n");
            const outputs = expected.split("\n");
            for (var i = 0; i < inputs.length; i++) {
                const input = inputs[i];
                const output = outputs[i];
                assert.strictEqual(
                    input,
                    output,
                    `mismatch at line ${i}

at ${path.join(__dirname, "/fixtures/input.md")}:${i}
at ${path.join(__dirname, "/fixtures/output.md")}:${i}
`
                );
            }
        });
    });
});
