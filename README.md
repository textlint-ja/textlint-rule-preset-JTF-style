# textlint-plugin-JTF-style [![Build Status](https://travis-ci.org/azu/textlint-plugin-JTF-style.svg?branch=master)](https://travis-ci.org/azu/textlint-plugin-JTF-style)

[JTF日本語標準スタイルガイド（翻訳用）](https://www.jtf.jp/jp/style_guide/styleguide_top.html "JTF日本語標準スタイルガイド（翻訳用）") for [textlint](https://github.com/azu/textlint "textlint").

## Installation

- [ ] Describe the installation process

## Feature

- [ ] 対応ルールに可とか不可とかあるのでまだ何も手を出してないやつです。
- [ ] 作成後にそのルールへのパスを書いてます。

<table>
 <tr>
  <th>大項目</th>
  <th>中項目</th>
  <th>小項目</th>
  <th>JTF標準ルール</th>
  <th>スタイルガイドのページ（v2.1）</th>
  <th>対応ルール</th>
 </tr>
 <tr>
  <td rowspan="7">基本文型</td>
  <td rowspan="5">文体</td>
  <td>本文</td>
  <td>目的に応じて敬体、常体のどちらかに統一する。</td>
  <td>10</td>
  <td>不可</td>
 </tr>
 <tr>
  <td>見出し</td>
  <td>常体または体言止め。</td>
  <td>10</td>
  <td>不可</td>
 </tr>
 <tr>
  <td>箇条書き</td>
  <td>「本文」の文体に合わせる。</td>
  <td>10</td>
  <td>不可</td>
 </tr>
 <tr>
  <td>図表内テキスト</td>
  <td>「本文」の文体に合わせる。</td>
  <td>11</td>
  <td>不可</td>
 </tr>
 <tr>
  <td>図表のキャプション</td>
  <td>「本文」の文体に合わせる。</td>
  <td>11</td>
  <td>不可</td>
 </tr>
 <tr>
  <td rowspan="2">句読点の使用</td>
  <td>句点（。）と読点（、）</td>
  <td>全角の「、」と「。」を使う。</td>
  <td>11</td>
  <td>src/jtf-punctuation-mark.js</td>
 </tr>
 <tr>
  <td>ピリオド（.）とカンマ（,）</td>
  <td>和文の句読点として使用しない。</td>
  <td>11</td>
  <td>src/jtf-punctuation-mark.js</td>
 </tr>
 <tr>
  <td rowspan="13">文字の表記</td>
  <td rowspan="10">用字、用語</td>
  <td>ひらがな</td>
  <td>全角。昭和61年7月1日内閣告示第1号の「現代仮名遣い」に準じる。</td>
  <td>11</td>
  <td>可※</td>
 </tr>
 <tr>
  <td>漢字</td>
  <td>常用漢字表にゆるやかに準じる。</td>
  <td>11</td>
  <td>可</td>
 </tr>
 <tr>
  <td>漢字の送りがな</td>
  <td>昭和48年6月18日内閣告示第2号「送り仮名の付け方」に準じる。</td>
  <td>12</td>
  <td>可※</td>
 </tr>
 <tr>
  <td>複合語の送りがな</td>
  <td>昭和48年6月18日内閣告示第2号「送り仮名の付け方」に準じる。</td>
  <td>13</td>
  <td>可※</td>
 </tr>
 <tr>
  <td>カタカナ</td>
  <td>全角。半角カタカナは特殊用途を除いて使わない。</td>
  <td>14</td>
  <td>可</td>
 </tr>
 <tr>
  <td>カタカナの長音</td>
  <td>原則として省略しない。</td>
  <td>14</td>
  <td>可※</td>
 </tr>
 <tr>
  <td>カタカナ複合語</td>
  <td>中黒または半角スペースで区切る。</td>
  <td>15</td>
  <td>不可</td>
 </tr>
 <tr>
  <td>算用数字</td>
  <td>半角。</td>
  <td>16</td>
  <td>可</td>
 </tr>
 <tr>
  <td>アルファベット</td>
  <td>半角。</td>
  <td>16</td>
  <td>可</td>
 </tr>
 <tr>
  <td>算用数字（位取りの表記）</td>
  <td>桁区切りには「カンマ」、小数点には「ピリオド」を使う。ただし桁区切りの「カンマ」は省略する場合がある。</td>
  <td>16</td>
  <td>不可</td>
 </tr>
 <tr>
  <td rowspan="3">文字の表記と使い分け</td>
  <td>ひらがなと漢字の使い分け</td>
  <td>参考文献に従う。</td>
  <td>17</td>
  <td>可※</td>
 </tr>
 <tr>
  <td>算用数字と漢数字の使い分け</td>
  <td>数えられるものは算用数字。慣用句は漢数字。</td>
  <td>19</td>
  <td>src/2.2.2.算用数字と漢数字の使い分け.js</td>
 </tr>
 <tr>
  <td>一部の助数詞の表記</td>
  <td>「&#x301C;か月」、「&#x301C;か所」</td>
  <td>20</td>
  <td>src/2.2.3.一部の助数詞の表記.js</td>
 </tr>
 <tr>
  <td rowspan="5">文字間のスペース</td>
  <td rowspan="3">単一文字間のスペースの有無</td>
  <td>全角と半角の間</td>
  <td>スペースなし</td>
  <td>20</td>
  <td>src/3.1.1.全角文字と半角文字の間.js</td>
 </tr>
 <tr>
  <td>全角どうし</td>
  <td>スペースなし</td>
  <td>20</td>
  <td>src/3.1.2.全角文字どうし.js</td>
 </tr>
 <tr>
  <td>半角どうし</td>
  <td>和文中に欧文を引用するなど、和文に欧文が含まれる場合は欧文中の半角スペースを維持する。</td>
  <td>20</td>
  <td>No</td>
 </tr>
 <tr>
  <td>カタカナ語間のスペースの有無</td>
  <td>カタカナ複合語</td>
  <td>中黒または半角スペースを入れる。</td>
  <td>20</td>
  <td>No</td>
 </tr>
 <tr>
  <td>かっこ類と隣接する文字の間のスペースの有無</td>
  <td>かっこ類と隣接する文字の間のスペース</td>
  <td>スペースなし</td>
  <td>20</td>
  <td>src/3.3.かっこ類と隣接する文字の間のスペースの有無.js</td>
 </tr>
 <tr>
  <td rowspan="20">記号の表記と用途</td>
  <td rowspan="3">句読点</td>
  <td>句点（。）</td>
  <td>全角</td>
  <td>21</td>
  <td>src/4.1.1.句点(。).js</td>
 </tr>
 <tr>
  <td>読点（、）</td>
  <td>全角</td>
  <td>21</td>
  <td>なし(1.2.2参照)</td>
 </tr>
 <tr>
  <td>ピリオド（.）、カンマ（,）</td>
  <td>半角</td>
  <td>21</td>
  <td>なし(1.2.2参照)</td>
 </tr>
 <tr>
  <td rowspan="9">記号</td>
  <td>感嘆符（！）</td>
  <td>全角。和文では多用しない。</td>
  <td>21</td>
  <td>可(</td>
 </tr>
 <tr>
  <td>疑問符（？）</td>
  <td>全角。和文では多用しない。</td>
  <td>22</td>
  <td>可</td>
 </tr>
 <tr>
  <td>スラッシュ（/）</td>
  <td>全角または半角</td>
  <td>22</td>
  <td>（全角・半角どちらでもよいためチェックしない）</td>
 </tr>
 <tr>
  <td>中黒（・）</td>
  <td>全角</td>
  <td>22</td>
  <td>可</td>
 </tr>
 <tr>
  <td>波線（&#x301C;または&#xFF5E;）</td>
  <td>全角</td>
  <td>22</td>
  <td>可</td>
 </tr>
 <tr>
  <td>ハイフン（-）</td>
  <td>原則として和文では使用しない。</td>
  <td>22</td>
  <td>オプションで可</td>
 </tr>
 <tr>
  <td>コロン（：）</td>
  <td>全角。和文では多用しない。</td>
  <td>23</td>
  <td>オプションで可</td>
 </tr>
 <tr>
  <td>セミコロン（；）</td>
  <td>原則として和文では使用しない。</td>
  <td>23</td>
  <td>オプションで可</td>
 </tr>
 <tr>
  <td>ダッシュ（－）</td>
  <td>原則として和文では使用しない。</td>
  <td>23</td>
  <td>オプションで可</td>
 </tr>
 <tr>
  <td rowspan="8">かっこ</td>
  <td>丸かっこ（）</td>
  <td>全角</td>
  <td>23</td>
  <td>可</td>
 </tr>
 <tr>
  <td>大かっこ［］</td>
  <td>全角</td>
  <td>23</td>
  <td>可</td>
 </tr>
 <tr>
  <td>かぎかっこ「」</td>
  <td>全角</td>
  <td>23</td>
  <td>可</td>
 </tr>
 <tr>
  <td>二重かぎかっこ『』</td>
  <td>全角</td>
  <td>23</td>
  <td>（半角がないためチェックしない）</td>
 </tr>
 <tr>
  <td>二重引用符&quot; &quot;</td>
  <td>半角。和文では多用しない。</td>
  <td>23</td>
  <td>可</td>
 </tr>
 <tr>
  <td>中かっこ{}</td>
  <td>原則として和文では使用しない。</td>
  <td>24</td>
  <td>オプションで可</td>
 </tr>
 <tr>
  <td>山かっこ＜＞</td>
  <td>原則として和文では使用しない。</td>
  <td>24</td>
  <td>オプションで可</td>
 </tr>
 <tr>
  <td>一重引用符' '</td>
  <td>原則として和文では使用しない。</td>
  <td>24</td>
  <td>オプションで可</td>
 </tr>
 <tr>
  <td rowspan="16">単位の表記</td>
  <td>単位系</td>
  <td colspan="2">JIS規格Z8202「量及び単位」、Z8203「国際単位系(SI)及びその使い方」に従う。</td>
  <td>24</td>
  <td rowspan="16">不可</td>
 </tr>
 <tr>
  <td>単位記号の表記</td>
  <td colspan="2">主に、英字による表記とカタカナによる表記がある。</td>
  <td>24</td>
 </tr>
 <tr>
  <td rowspan="14">個別の単位</td>
  <td>時間、時刻</td>
  <td>時間、時、分、秒、ミリ秒</td>
  <td>24</td>
 </tr>
 <tr>
  <td>長さ</td>
  <td>mm、km、ミリメートル、センチメートル</td>
  <td>24</td>
 </tr>
 <tr>
  <td>質量</td>
  <td>g、kg、t、グラム、キログラム、トン</td>
  <td>24</td>
 </tr>
 <tr>
  <td>面積、体積</td>
  <td>㎡、平方メートル、立法メートル</td>
  <td>24</td>
 </tr>
 <tr>
  <td>電気</td>
  <td>A、W、V、アンペア、ワット、ボルト</td>
  <td>24</td>
 </tr>
 <tr>
  <td>温度</td>
  <td>℃</td>
  <td>25</td>
 </tr>
 <tr>
  <td>周波数</td>
  <td>Hz、ヘルツ</td>
  <td>25</td>
 </tr>
 <tr>
  <td>速度</td>
  <td>m/s、キロメートル毎時、分速&#65374;km</td>
  <td>25</td>
 </tr>
 <tr>
  <td>伝送速度</td>
  <td>bps、Kbps、バイト/秒</td>
  <td>25</td>
 </tr>
 <tr>
  <td>割合</td>
  <td>％、パーセント</td>
  <td>25</td>
 </tr>
 <tr>
  <td>角度</td>
  <td>90°、90度</td>
  <td>25</td>
 </tr>
 <tr>
  <td>記憶容量</td>
  <td>ビット、バイト、Kb、KB、Mb、MB</td>
  <td>25</td>
 </tr>
 <tr>
  <td>通貨</td>
  <td>円、米ドル、ユーロ、＄、USD</td>
  <td>25</td>
 </tr>
 <tr>
  <td>その他</td>
  <td></td>
  <td>25</td>
 </tr>
</table>


## Usage

- [ ] Write usage instructions

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT