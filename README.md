# textlint-rule-preset-JTF-style [![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/) [![Actions Status: test](https://github.com/textlint-ja/textlint-rule-preset-JTF-style/workflows/test/badge.svg)](https://github.com/textlint-ja/textlint-rule-preset-JTF-style/actions?query=workflow%3A"test")

[JTF日本語標準スタイルガイド（翻訳用）](https://www.jtf.jp/tips/styleguide "JTF日本語標準スタイルガイド（翻訳用）") for [textlint](https://github.com/textlint/textlint "textlint").

[2016年2月22日改訂第2.2版](https://github.com/textlint-ja/textlint-rule-preset-JTF-style/blob/master/jtf_style_guide2.2.pdf)を元にしています。

## Installation

    npm install textlint-rule-preset-jtf-style

## Usage

基本的に[textlint](https://github.com/textlint/textlint "textlint")の使い方と同じです。

- [textlintで日本語の文章をチェックする | Web Scratch](http://efcl.info/2015/09/10/introduce-textlint/ "textlintで日本語の文章をチェックする | Web Scratch")

### 最も手軽な方法（グローバル）

npmでグローバルにインストールし、`--preset`で利用するのが一番お手軽です。

    npm install -g textlint textlint-rule-preset-jtf-style
    textlint --preset textlint-rule-preset-jtf-style README.md
    # README.mdをLintした結果が出力されます

グローバルにインストールするよりは、次のようにプロジェクト毎のディレクトリにインストールする方法を推奨します。

### `.textlintrc`を使う方法（推奨）

現在のディレクトリにtextlintとtextlint-rule-preset-jtf-styleをインストールする方法です。
(グローバルにインストールしなくていいので環境がキレイに作れます）

```
npm init # package.jsonがないなら
npm install -D textlint textlint-rule-preset-jtf-style
```

textlintの設定ファイルとなっている`.textlintrc`に次のように`jtf-style`と指定します（`textlint-rule-`を取り除いたプリセット名）。

```json5
{
    "rules": {
        "preset-jtf-style": true
    }
}
```

実行するには、`$ textlint <対象ファイル>` を行うだけで、自動的に同じディレクトリにある`.textlintrc`の設定を読み込んでくれます。

```
node_modules/.bin/textlint /path/to/target.md
```

npm run-script経由で実行すれば、`node_modules/.bin/`は省略出来ます。

- [npm で依存もタスクも一元化する - Qiita](http://qiita.com/Jxck_/items/efaff21b977ddc782971#%E3%82%BF%E3%82%B9%E3%82%AF%E3%81%AE%E5%AE%9F%E8%A1%8C "npm で依存もタスクも一元化する - Qiita")

## 自動修正

ルールの設定して`textlint`コマンドでチェックするとたくさんのエラーが表示されると思います。

```
textlint /path/to/target.md
```

`textlint-rule-preset-JTF-style`の一部ルールは`textlint`の`--fix`にも対応しています。
`--fix`を使うことで機械的に判断して修正できる部分は自動修正します。

```sh
textlint --fix /path/to/target.md
```

実際にファイルを書き換えるので、必ずファイルをコピーしておくなどしてファイルを戻せるようにしてから実行してください。

### サンプル

[example/](example/) に実行できるサンプルプロジェクトがあります。

## ルール一覧

それぞれのルールの詳細は以下を読んでください。

- [JTF日本語標準スタイルガイド（翻訳用）（PDFファイル）](https://www.jtf.jp/pdf/jtf_style_guide.pdf)

`textlint-rule-preset-jtf-style`で対応するルールと実装状況は以下のとおりです。

辞書ベースと書かれているものは、独自の辞書をベースとしているため精度が曖昧となっています。

<table>
<tr>
    <th>対応ルール</th>
    <th>ページ（v2.1）</th>
    <th>小項目</th>
    <th>JTF標準ルール</th>
    <th>中項目</th>
    <th>大項目</th>
</tr>
<tr>
    <td><a href="src/1.1.1.js">1.1.1.js</a></td>
    <td>10</td>
    <td>本文</td>
    <td>目的に応じて敬体、常体のどちらかに統一する。</td>
    <td>文体</td>
    <td>基本文型</td>
</tr>
<tr>
    <td><a href="src/1.1.2.js">1.1.2.js</a></td>
    <td>10</td>
    <td>見出し</td>
    <td>常体または体言止め。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="src/1.1.3.js">1.1.3.js</a></td>
    <td>10</td>
    <td>箇条書き</td>
    <td>「本文」の文体に合わせる。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td>不可</td>
    <td>11</td>
    <td>図表内テキスト</td>
    <td>「本文」の文体に合わせる。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="src/1.1.5.js">1.1.5.js</a></td>
    <td>11</td>
    <td>図表のキャプション</td>
    <td>「本文」の文体に合わせる。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="src/1.2.1.js">1.2.1.js</a></td>
    <td>11</td>
    <td>句点（。）と読点（、）</td>
    <td>全角の「、」と「。」を使う。</td>
    <td>句読点の使用</td>
    <td></td>
</tr>
<tr>
    <td><a href="src/1.2.2.js">1.2.2.js</a></td>
    <td>11</td>
    <td>ピリオド（.）とカンマ（,）</td>
    <td>和文の句読点として使用しない。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td>未実装</td>
    <td>11</td>
    <td>ひらがな</td>
    <td>全角。昭和61年7月1日内閣告示第1号の「現代仮名遣い」に準じる。</td>
    <td>用字、用語</td>
    <td>文字の表記</td>
</tr>
<tr>
    <td><a href="src/2.1.2.js">2.1.2.js</a> (辞書ベース)</td>
    <td>11</td>
    <td>漢字</td>
    <td>常用漢字表にゆるやかに準じる。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td>未実装</td>
    <td>12</td>
    <td>漢字の送りがな</td>
    <td>昭和48年6月18日内閣告示第2号「送り仮名の付け方」に準じる。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td>未実装</td>
    <td>13</td>
    <td>複合語の送りがな</td>
    <td>昭和48年6月18日内閣告示第2号「送り仮名の付け方」に準じる。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="src/2.1.5.js">2.1.5.js</a> (辞書ベース/デフォルト無効)</td>
    <td>14</td>
    <td>カタカナ</td>
    <td>全角。半角カタカナは特殊用途を除いて使わない。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="src/2.1.6.js">2.1.6.js</a> (辞書ベース/デフォルト無効)</td>
    <td>14</td>
    <td>カタカナの長音</td>
    <td>原則として省略しない。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td>不可</td>
    <td>15</td>
    <td>カタカナ複合語</td>
    <td>中黒または半角スペースで区切る。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="src/2.1.8.js">2.1.8.js</a></td>
    <td>16</td>
    <td>算用数字</td>
    <td>半角。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="src/2.1.9.js">2.1.9.js</a></td>
    <td>16</td>
    <td>アルファベット</td>
    <td>半角。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="src/2.1.10.js">2.1.10.js</a></td>
    <td>16</td>
    <td>算用数字（位取りの表記）</td>
    <td>桁区切りには「カンマ」、小数点には「ピリオド」を使う。ただし桁区切りの「カンマ」は省略する場合がある。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="src/2.2.1.js">2.2.1.js</a> (辞書ベース/デフォルト無効)</td>
    <td>17</td>
    <td>ひらがなと漢字の使い分け</td>
    <td>参考文献に従う。</td>
    <td>文字の表記と使い分け</td>
    <td></td>
</tr>
<tr>
    <td><a href="src/2.2.2.js">2.2.2.js</a></td>
    <td>19</td>
    <td>算用数字と漢数字の使い分け</td>
    <td>数えられるものは算用数字。慣用句は漢数字。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="src/2.2.3.js">2.2.3.js</a></td>
    <td>20</td>
    <td>一部の助数詞の表記</td>
    <td>「〜か月」、「〜か所」</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="src/3.1.1.js">3.1.1.js</a></td>
    <td>20</td>
    <td>全角と半角の間</td>
    <td>スペースなし</td>
    <td>単一文字間のスペースの有無</td>
    <td>文字間のスペース</td>
</tr>
<tr>
    <td><a href="src/3.1.2.js">3.1.2.js</a></td>
    <td>20</td>
    <td>全角どうし</td>
    <td>スペースなし</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td>不可</td>
    <td>20</td>
    <td>半角どうし</td>
    <td>和文中に欧文を引用するなど、和文に欧文が含まれる場合は欧文中の半角スペースを維持する。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="src/3.2.js">3.2.js</a></td>
    <td>20</td>
    <td>カタカナ語間のスペースの有無</td>
    <td>中黒または半角スペースを入れる。</td>
    <td>カタカナ語間のスペースの有無</td>
    <td></td>
</tr>
<tr>
    <td><a href="src/3.3.js">3.3.js</a></td>
    <td>20</td>
    <td>かっこ類と隣接する文字の間のスペース</td>
    <td>スペースなし</td>
    <td>かっこ類と隣接する文字の間のスペースの有無</td>
    <td></td>
</tr>
<tr>
    <td><a href="src/4.1.1.js">4.1.1.js</a></td>
    <td>21</td>
    <td>句点（。）</td>
    <td>全角</td>
    <td>句読点</td>
    <td>記号の表記と用途</td>
</tr>
<tr>
    <td>不可(1.2.2参照)</td>
    <td>21</td>
    <td>読点（、）</td>
    <td>全角</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="src/4.1.3.js">4.1.3.js</a> (1.2.2参照)</td>
    <td>21</td>
    <td>ピリオド（.）、カンマ（,）</td>
    <td>半角</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="src/4.2.1.js">4.2.1.js</a></td>
    <td>21</td>
    <td>感嘆符（！）</td>
    <td>全角。和文では多用しない。</td>
    <td>記号</td>
    <td></td>
</tr>
<tr>
    <td><a href="src/4.2.2.js">4.2.2.js</a></td>
    <td>22</td>
    <td>疑問符（？）</td>
    <td>全角。和文では多用しない。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td>チェック項目なし</td>
    <td>22</td>
    <td>スラッシュ（/）</td>
    <td>全角または半角</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="src/4.2.4.js">4.2.4.js</a></td>
    <td>22</td>
    <td>中黒（・）</td>
    <td>全角</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="src/4.2.5.js">4.2.5.js</a></td>
    <td>22</td>
    <td>波線（〜または～）</td>
    <td>全角</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="src/4.2.6.js">4.2.6.js</a></td>
    <td>22</td>
    <td>ハイフン（-）</td>
    <td>原則として和文では使用しない。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="src/4.2.7.js">4.2.7.js</a></td>
    <td>23</td>
    <td>コロン（：）</td>
    <td>全角。和文では多用しない。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="src/4.2.8.js">4.2.8.js</a></td>
    <td>23</td>
    <td>セミコロン（；）</td>
    <td>原則として和文では使用しない。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="src/4.2.9.js">4.2.9.js</a></td>
    <td>23</td>
    <td>ダッシュ（－）</td>
    <td>原則として和文では使用しない。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="src/4.3.1.js">4.3.1.js</a></td>
    <td>23</td>
    <td>丸かっこ（）</td>
    <td>全角</td>
    <td>かっこ</td>
    <td></td>
</tr>
<tr>
    <td><a href="src/4.3.2.js">4.3.2.js</a></td>
    <td>23</td>
    <td>大かっこ［］</td>
    <td>全角</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="src/4.3.3.js">4.3.3.js</a></td>
    <td>23</td>
    <td>かぎかっこ「」</td>
    <td>全角</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="src/4.3.4.js">4.3.4.js</a></td>
    <td>23</td>
    <td>二重かぎかっこ『』</td>
    <td>全角</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="src/4.3.5.js">4.3.5.js</a> (対の有無)</td>
    <td>23</td>
    <td>二重引用符\" \"</td>
    <td>半角。和文では多用しない。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="src/4.3.6.js">4.3.6.js</a> (対の有無)</td>
    <td>24</td>
    <td>中かっこ{}</td>
    <td>原則として和文では使用しない。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="src/4.3.7.js">4.3.7.js</a> (対の有無)</td>
    <td>24</td>
    <td>山かっこ＜＞</td>
    <td>原則として和文では使用しない。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td><a href="src/4.3.8.js">4.3.8.js</a> (対の有無)</td>
    <td>24</td>
    <td>一重引用符' '</td>
    <td>原則として和文では使用しない。</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td>不可</td>
    <td>24</td>
    <td>JIS規格Z8202「量及び単位」、Z8203「国際単位系(SI)及びその使い方」に従う。</td>
    <td></td>
    <td>単位系</td>
    <td>単位の表記</td>
</tr>
<tr>
    <td></td>
    <td>24</td>
    <td>主に、英字による表記とカタカナによる表記がある。</td>
    <td></td>
    <td>単位記号の表記</td>
    <td></td>
</tr>
<tr>
    <td></td>
    <td>24</td>
    <td>時間、時刻</td>
    <td>時間、時、分、秒、ミリ秒</td>
    <td>個別の単位</td>
    <td></td>
</tr>
<tr>
    <td></td>
    <td>24</td>
    <td>長さ</td>
    <td>mm、km、ミリメートル、センチメートル</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td></td>
    <td>24</td>
    <td>質量</td>
    <td>g、kg、t、グラム、キログラム、トン</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td></td>
    <td>24</td>
    <td>面積、体積</td>
    <td>㎡、平方メートル、立法メートル</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td></td>
    <td>24</td>
    <td>電気</td>
    <td>A、W、V、アンペア、ワット、ボルト</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td></td>
    <td>25</td>
    <td>温度</td>
    <td>℃</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td></td>
    <td>25</td>
    <td>周波数</td>
    <td>Hz、ヘルツ</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td></td>
    <td>25</td>
    <td>速度</td>
    <td>m/s、キロメートル毎時、分速～km</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td></td>
    <td>25</td>
    <td>伝送速度</td>
    <td>bps、Kbps、バイト/秒</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td></td>
    <td>25</td>
    <td>割合</td>
    <td>％、パーセント</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td></td>
    <td>25</td>
    <td>角度</td>
    <td>90°、90度</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td></td>
    <td>25</td>
    <td>記憶容量</td>
    <td>ビット、バイト、Kb、KB、Mb、MB</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td></td>
    <td>25</td>
    <td>通貨</td>
    <td>円、米ドル、ユーロ、＄、USD</td>
    <td></td>
    <td></td>
</tr>
<tr>
    <td></td>
    <td>25</td>
    <td>その他</td>
    <td></td>
    <td></td>
    <td></td>
</tr>
</table>

## FAQ

Q. このルールはスタイルガイドと合ってないのでは？

A. [Issue](https://github.com/textlint-ja/textlint-rule-preset-jtf-style/issues/new)に詳細を書いてみるといいと思います。

Issueには以下の項目が書かれていると問題を解決しやすくなります。

- 試した文章（もしくはファイル）
- 期待する結果
    - 例： このルール（1.2.3)でエラーとなるはず
- 実際の結果
    - 例： 実際にはエラーとならなかった

また、[JTF日本語標準スタイルガイド（翻訳用）](https://www.jtf.jp/pdf/jtf_style_guide.pdf)に記載されてる全てのルールが実装済みではないため、
Pull Requestも歓迎しています。

-----

Q. 特定のルールを使いたくない

A. `.textlintrc` にルール毎の設定を追加することが出来ます。

- [textlintで日本語の文章をチェックする | Web Scratch](http://efcl.info/2015/09/10/introduce-textlint/ "textlintで日本語の文章をチェックする | Web Scratch")

`1.2.2.ピリオド(.)とカンマ(,)`のルールを無効化したい場合は、`.textlintrc`に次のように`false`値を設定することで無効化出来ます。
デフォルトでは`textlint-rule-preset-jtf-style`に含まれるルールが全て有効化されています。

```json5
{
    "rules": {
        "preset-jtf-style": {
            "1.2.2.ピリオド(.)とカンマ(,)": false
        }
    }
}
```

それぞれの指定できる`rules`のキー名は[index.js](src/index.js)を参照してください。

`jtf-style/<key名>` となります。

Q. 辞書ベースのルールの質がよくない

A. 正規表現の辞書ベースのルールが幾つかあります。

その他のtextlintルールと衝突が発生しやすい辞書ベースのルールとなっています。
そのため、辞書を改善していくかルール自体を無効化するアプローチを取る必要あります。

デフォルトでは次の辞書ベースのルールは無効化されています。

- [2.1.2.漢字](./src/2.1.2.js)
- [2.1.5.カタカナ](./src/2.1.5.js)
- [2.1.6.カタカナの長音](./src/2.1.6.js)
- [2.2.1.ひらがなと漢字の使い分け](./src/2.2.1.js)

これらのルールを有効化したい場合は、`.textlintrc`で明示的に有効化する必要があります。

```json5
{
    "rules": {
        "preset-jtf-style": {
            "2.1.2.漢字": true,
            "2.1.5.カタカナ": true,
            "2.1.6.カタカナの長音": true,
            "2.2.1.ひらがなと漢字の使い分け": true
        }
    }
}
```


## Migration: `textlint-plugin-jtf-style` to `textlint-rule-preset-jtf-style` 

`textlint-plugin-jtf-style` から `textlint-rule-preset-jtf-style` へ移行したい場合の移行手順です。

次のようにモジュールを切り替えます。

```sh
npm uninstall -D textlint-plugin-jtf-style
npm install -D textlint-rule-preset-jtf-style
```

その後、`.textlintrc`にかかれている設定を

```json5
{
    "plugins": [
        "jtf-style"
    ],
    "rules": {
        "jtf-style/2.1.2.漢字": true,
        "jtf-style/2.1.5.カタカナ": true,
        "jtf-style/2.1.6.カタカナの長音": true,
        "jtf-style/2.2.1.ひらがなと漢字の使い分け": true
    }
}
```

以下のように書き換えれば完了です。

```json5
{
    "rules": {
        "preset-jtf-style": {
            "2.1.2.漢字": true,
            "2.1.5.カタカナ": true,
            "2.1.6.カタカナの長音": true,
            "2.2.1.ひらがなと漢字の使い分け": true
        }
    }
}
```


## Contributing

まだ未実装なルールがありますのでPull Request歓迎。
実装済みのルールでもその項目を全て満たせてないケースがあるかもしれません。

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

    by Japan Translation Federation (CC BY-SA) www.jtf.jp
    本著作物は「JTF日本語標準スタイルガイド2.0」(JTF, CC BY-SA)を改変して作成したものです。

- [JTFスタイルガイドとCCライセンスの素敵な関係 | JTFジャーナルWeb](http://journal.jtf.jp/update/id=306 "JTFスタイルガイドとCCライセンスの素敵な関係 | JTFジャーナルWeb")

その他のコードはMITライセンスです。
