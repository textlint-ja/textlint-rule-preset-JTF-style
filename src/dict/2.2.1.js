// LICENSE : MIT
"use strict";

// textlint-rule-prh の辞書(dict/2.2.1.yml)を変換したもの
// pattern は prh と同じく g, m, u フラグ付きの正規表現
export default [
    { expected: "あらかじめ", pattern: /予め/gmu },
    { expected: "いずれ", pattern: /何れ/gmu },
    { expected: "いつ", pattern: /何時/gmu },
    { expected: "およそ", pattern: /凡そ/gmu },
    { expected: "おもむろに", pattern: /徐に/gmu },
    { expected: "かえって", pattern: /却って/gmu },
    { expected: "かつ", pattern: /且つ/gmu },
    { expected: "かもしれない", pattern: /かも知れない/gmu },
    { expected: "ください", pattern: /下さい/gmu, specs: [{ from: "提出して下さい。", to: "提出してください。" }] },
    { expected: "これほど", pattern: /これ程/gmu },
    {
        expected: "ご$1",
        pattern: /御(覧|意見)/gmu,
        specs: [
            { from: "御覧ください", to: "ご覧ください" },
            { from: "御意見", to: "ご意見" }
        ]
    },
    { expected: "子ども", pattern: /(?:子供|こども)/gmu },
    // 接続詞 または 文頭であることを考慮する
    {
        expected: "$1さらに",
        pattern: /(?:([\s。、\nぁ-んァ-ヶ])更に)/gmu,
        specs: [
            { from: "Aは加速した、更に加速した。", to: "Aは加速した、さらに加速した。" },
            { from: "加速すると更に加速した", to: "加速するとさらに加速した" },
            { from: "変更に加えて", to: "変更に加えて" }
        ]
    },
    { expected: "さらに", pattern: /^更に/gmu, specs: [{ from: "更に加速した。", to: "さらに加速した。" }] },
    { expected: "しかし", pattern: /然し/gmu },
    { expected: "しばらく", pattern: /暫く/gmu },
    { expected: "すなわち", pattern: /即ち/gmu },
    { expected: "すべき", pattern: /可き/gmu },
    { expected: "せっかく", pattern: /折角/gmu },
    { expected: "たびたび", pattern: /度々/gmu },
    { expected: "ただし", pattern: /但し/gmu },
    // 誤爆を避けるのが難しい
    //  - expected: たち
    //    patterns: 達
    { expected: "できる", pattern: /出来る/gmu },
    { expected: "どこ", pattern: /何処/gmu },
    { expected: "ないし", pattern: /乃至/gmu },
    // なお => 尚
    { expected: "なおさら", pattern: /尚さら/gmu },
    {
        expected: "なかなか",
        pattern: /中々/gmu,
        specs: [{ from: "中々できないことだ。", to: "なかなかできないことだ。" }]
    },
    // 程 -> ほど
    { expected: "これほど", pattern: /これ程/gmu },
    { expected: "または", pattern: /又は/gmu },
    { expected: "むしろ", pattern: /寧ろ/gmu },
    { expected: "めったに", pattern: /滅多に/gmu },
    { expected: "もはや", pattern: /最早/gmu },
    { expected: "もしくは", pattern: /若しくは/gmu },
    { expected: "もって", pattern: /(?:以て|以って)/gmu },
    {
        expected: "のように",
        pattern: /の様に/gmu,
        specs: [
            { from: "一様に", to: "一様に" },
            { from: "〜の様に", to: "〜のように" }
        ]
    },
    { expected: "よほど", pattern: /余程/gmu },
    // 漢字で書く
    { expected: "一切", pattern: /いっさい/gmu },
    { expected: "必ず", pattern: /かならず/gmu },
    { expected: "大いに", pattern: /おおいに/gmu },
    { expected: "強いて", pattern: /しいて/gmu },
    { expected: "$1中", pattern: /(世界|日)じゅう/gmu },
    { expected: "時々", pattern: /ときどき/gmu },
    { expected: "何しろ", pattern: /なにしろ/gmu, specs: [{ from: "なにしろ困っている", to: "何しろ困っている" }] },
    { expected: "何も", pattern: /なにも/gmu, specs: [{ from: "なにも知らない", to: "何も知らない" }] },
    { expected: "何らかの", pattern: /なんらかの/gmu, specs: [{ from: "なんらかの策。", to: "何らかの策。" }] },
    { expected: "何とも", pattern: /なんとも/gmu },
    // 漢字を使い分ける
    // 「個」が表外音
    { expected: "箇所", pattern: /個所/gmu },
    // 「個」が表外音
    { expected: "箇条書き", pattern: /個条書き/gmu },
    // 動詞では「付属する」が一般的
    { expected: "付属する", pattern: /附属する/gmu },
    // 「摩」は「こする」、「磨」は「磨く（みがく）」の意味
    { expected: "摩耗", pattern: /磨耗/gmu },
    { expected: "摩滅", pattern: /磨滅/gmu },
    // 品詞・意味で使い分ける
    { expected: "および", pattern: /及び/gmu },
    { expected: "が及ぶ", pattern: /がおよぶ/gmu, specs: [{ from: "（例）影響がおよぶ。", to: "（例）影響が及ぶ。" }] },
    //  メンテナンスが難しいの無効
    //  - expected: $1いたします
    //    patterns: ([^引招送誘拉一合極雅筆風])致します
    //    specs:
    //      - from: （例）お願い致します。
    //        to:   （例）お願いいたします。
    { expected: "致す", pattern: /いたす/gmu, specs: [{ from: "（例）思いをいたす。", to: "（例）思いを致す。" }] },
    // （接続詞の場合）ひらがなを使う
    { expected: "したがって", pattern: /(に)?従って/gmu, regexpMustEmpty: "$1" },
    // （動詞の場合）漢字を使う
    { expected: "に従って", pattern: /にしたがって/gmu },
    { expected: "従う", pattern: /したがう/gmu },
    {
        expected: "$1だす",
        pattern: /(うり|売り|送り|さし|差し|造り|創り|とり|取り|はき|よび|呼び|よみ|読み|動き|笑い)出す/gmu,
        specs: [
            { from: "（例）動き出す。", to: "（例）動きだす。" },
            { from: "（例）笑い出す。", to: "（例）笑いだす。" },
            { from: "探しだす", to: "探しだす" }
        ]
    },
    {
        expected: "$1出す",
        pattern: /(探し|見つけ|見い)だす/gmu,
        specs: [
            { from: "探しだす", to: "探し出す" },
            { from: "見つけだす", to: "見つけ出す" }
        ]
    },
    // （動詞の場合）漢字を使う
    {
        expected: "$1付く",
        pattern: /(気が|利子が)つく/gmu,
        specs: [
            { from: "気がつく。", to: "気が付く。" },
            { from: "利子がつく。", to: "利子が付く。" }
        ]
    },
    // （接尾語の場合）ひらがなを使う
    { expected: "活気づく", pattern: /活気付く/gmu, specs: [{ from: "活気付く", to: "活気づく" }] },
    { expected: "凍りつく", pattern: /凍り付く/gmu, specs: [{ from: "凍り付く", to: "凍りつく" }] },
    {
        expected: "$1つき",
        pattern: /(手|目|腰)付き/gmu,
        specs: [
            { from: "目付き。", to: "目つき。" },
            { from: "手付き。", to: "手つき。" }
        ]
    },
    {
        expected: "$1とおり",
        pattern: /(思った|以下の)通り/gmu,
        specs: [
            { from: "（例）思った通り。", to: "（例）思ったとおり。" },
            { from: "以下の通りです。", to: "以下のとおりです。" }
        ]
    },
    // （数詞に付く場合）
    { expected: "$1通り", pattern: /(\d)とおり/gmu, specs: [{ from: "(例)2とおりの方法", to: "(例)2通りの方法" }] },
    // (補助動詞の場合)ひらがなを使う
    { expected: "てほしい", pattern: /て欲しい/gmu, specs: [{ from: "考えて欲しい", to: "考えてほしい" }] },
    { expected: "が欲しい", pattern: /がほしい/gmu, specs: [{ from: "この本がほしい", to: "この本が欲しい" }] }
];
