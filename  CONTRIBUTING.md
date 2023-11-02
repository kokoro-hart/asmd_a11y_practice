# CONTRIBUTING.md

## Change public domain
サイトマップの自動生成に各所で本番ドメインを指定する必要があります。
デフォルトの本番ドメインは`https://wd-flat.com/`ですのでgrepして変更が必要な箇所をすべて書き換えてください。

- `astro.config.mjs`の`defineConfig`内の`site`
- `.env.example`の`PUBLIC_ORIGIN`
- `robots.txt`の`Sitemap`

## meta.ymlフォルダについて

`meta.yml`はプロジェクト全体で共有したい値を扱います。
- ベースのmeta情報
- public domain
など



## Styles
案件の性質に合わせてglobal css（FLOCSS）とCSS Modulesを使い分けてください。

global css
```html
<button class="c-button"></button>

// run build ↓↓↓↓↓↓↓↓

<button class="c-button"></button>
```
CSS Modules
```astro
<button class={style.button}></button>

// run build ↓↓↓↓↓↓↓↓

<button class="_button_1ob87_63"></button>
```

## Pre Commit
pre-commitで各種リンターやフォーマッターを実行しています。
Commitが中断された場合は、エラーを解消した上で再度Commitお願いします。

- [commitlint](https://commitlint.js.org/)
- [markuplint](https://markuplint.dev/ja/)
- [Stylelint](https://stylelint.io/)
- [ESLint](https://eslint.org/)
