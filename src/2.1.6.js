// LICENSE : MIT
"use strict";
/*
2.1.6.カタカナの長音
カタカナ語の末尾の長音は原則として省略しません。
カタカナ語の長音表記のルールについては、『外来語（カタカナ）表記ガイドライン第3版』（テクニカルコミュニケーター協会、2015年）に従います。
 */
import fs from "fs";
import path from "path";
import prh from "textlint-rule-prh";

const report = function (context) {
    // 辞書ベースのカタカナ末尾の長音のチェックを行う
    return prh.fixer(context, {
        ruleContents: [fs.readFileSync(path.join(__dirname, "..", "dict", "2.1.6.yml"), "utf-8")]
    });
};
module.exports = {
    linter: report,
    fixer: report
};
