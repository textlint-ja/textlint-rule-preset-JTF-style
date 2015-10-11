# サンプル

## 使い方

`npm run-script textlint`が定義されているので次のようにすれば、この`README.md`ファイルをtextlint出来ます。

```
npm install
npm run textlint -- README.md
```

(npm 2.x以上をインストールしている必要があります)

- [run-script | npm Documentation](https://docs.npmjs.com/cli/run-script "run-script | npm Documentation")

### もっと手動に

```
npm install
./node_modules/.bin/textlint /path/to/target.md
```

## 設定ファイル

[.textlintrc](./.textlintrc)に設定ファイルが配置されています。

## サンプル文章。

この文章はサンプルである。