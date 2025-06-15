# TextAlive App API params example

React、Typescript を使った作例で、発声中の文字を表示します。

## 違う楽曲で試すには

TextAlive App API で開発された Web アプリケーションは、（特定の楽曲向けに作り込んでいない限り）URL のクエリパラメタで `ta_song_url={楽曲のURL}` を指定すると異なる楽曲で演出を試せます。

- [愛されなくても君がいる by ピノキオピー feat. 初音ミク](https://textalivejp.github.io/textalive-app-params/?ta_song_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DygY2qObZv24)
- [ブレス・ユア・ブレス by 和田たけあき feat. 初音ミク](https://textalivejp.github.io/textalive-app-params/?ta_song_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Da-Nf3QUFkOU)
- [グリーンライツ・セレナーデ by Omoi feat. 初音ミク](https://textalivejp.github.io/textalive-app-params/?ta_song_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DXSLhsjepelI)

## 開発

[Node.js](https://nodejs.org/) をインストールしている環境で以下のコマンドを実行すると、開発用サーバが起動します。

### 環境変数の設定

TextAlive API を使用するためには、APIトークンが必要です。

1. [TextAlive for Developers](https://developer.textalive.jp/profile) でAPIトークンを取得
2. `.env` ファイル内の `VITE_TEXTALIVE_TOKEN` に取得したトークンを設定

### サーバの起動

```sh
npm install
npm run dev
```

## ビルド

```sh
npm run build
```

## TextAlive App API

![TextAlive](https://i.gyazo.com/thumb/1000/5301e6f642d255c5cfff98e049b6d1f3-png.png)

TextAlive App API は、音楽に合わせてタイミングよく歌詞が動く Web アプリケーション（リリックアプリ）を開発できる JavaScript 用のライブラリです。

TextAlive App API について詳しくは Web サイト [TextAlive for Developers](https://developer.textalive.jp/) をご覧ください。

---

## Credits

This project is based on [TextAlive App API params example](https://github.com/TextAliveJp/textalive-app-params) by Jun Kato.
