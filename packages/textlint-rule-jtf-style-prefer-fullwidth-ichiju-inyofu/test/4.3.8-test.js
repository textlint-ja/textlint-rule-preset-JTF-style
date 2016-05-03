// LICENSE : MIT
"use strict";
import TextLintTester from "textlint-tester";
import rule from "../src/4.3.8";
var tester = new TextLintTester();
tester.run("4.3.8.一重引用符''", rule, {
    valid: [
        "彼は'×××'を参照してくださいと言った。",
        "- 彼は'×××'を参照してくださいと言った。",
        "Animal's bug.",
        `[ES5, ES6, ES2016, ES.Next: What's going on with JavaScript versioning?](http://benmccormick.org/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning/ "ES5, ES6, ES2016, ES.Next: What's going on with JavaScript versioning?")`
    ],
    invalid: []
});
