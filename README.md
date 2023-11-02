# 「朝までマークアップ☀️」　登壇用デモサイト

https://cssnite.doorkeeper.jp/events/163736

![asmd_logo](./public/logo-asmd-markup.png)

## セッション内容
### 実践！ライブコーディングでアクセシビリティ改善
![session_slide](./public/asmd_cover_tobita.png)


## 環境

Node.js v18.14.0

バージョン管理にnvm(Node Version Manager)を利用している環境では、`nvm use`コマンドの実行で指定のバージョンに切り替わります。

```
nvm use
```

下記メッセージが表示された場合は、`nvm install 18.14.0`でインストールしてください。

```
Found '/パス省略/.nvmrc' with version <18.14.0>
N/A: version "18.14.0 -> N/A" is not yet installed.

You need to run "nvm install 18.14.0" to install it before using it.
```

## インストール

```
npm ci
```

このコマンドは、`node_modules`ディレクトリを自動で削除し、パッケージのバージョンが環境によって差のないように安全にインストールを行います。`npm install`ではなくこちらのコマンドを使用してください。

## コマンド

### 開発

```
npm run dev
```

### ビルド

```
npm run build
```

### プレビュー

```
npm run preview
```
ローカルでビルド環境のプレビューを行います。
