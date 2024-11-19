// LICENSE : MIT
"use strict";
const path = require("path");
const fs = require("fs");
const glob = require("glob");
// result
const RESULT = {
    input: [],
    output: []
};
function processFile(filePath) {
    const contents = fs.readFileSync(filePath, "utf-8");
    const lines = contents.split(/\n/);
    const inputRegExp = /^\s+text:\s*?"(.*?)"/;
    const outputRegExp = /^\s+output:\s*?"(.*?)"/;
    const optionsRegExp = /^\s+options:\s*?\{/;
    lines.forEach(function (line, index) {
        const nextLine = lines[index + 1];
        const nextNextLine = lines[index + 2];
        if (inputRegExp.test(line) && outputRegExp.test(nextLine) && !optionsRegExp.test(nextNextLine)) {
            const inputMatch = line.match(inputRegExp)[1];
            // \\n => \n
            RESULT.input.push(inputMatch.replace(/\\n/g, "\n"));
        } else if (outputRegExp.test(line) && !optionsRegExp.test(nextLine)) {
            const outputMatch = line.match(outputRegExp)[1];
            RESULT.output.push(outputMatch.replace(/\\n/g, "\n"));
        }
    });
}

const testDir = path.join(__dirname, "..", "test");
const filePathList = glob.sync(testDir + "/*-test.js");
filePathList.forEach(processFile);

fs.writeFileSync(path.join(testDir, "fixtures/input.md"), RESULT.input.join("\n\n"), "utf-8");
fs.writeFileSync(path.join(testDir, "fixtures/output.md"), RESULT.output.join("\n\n"), "utf-8");
