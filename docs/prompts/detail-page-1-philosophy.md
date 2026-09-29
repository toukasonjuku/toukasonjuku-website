# 実装プロンプト1/5: `/philosophy/` 理念

作成: 2026-09-29 ／ 全体の索引: [`detail-pages-implementation.md`](detail-pages-implementation.md)

このファイルは**理念ページ1枚分**の実装プロンプト。これだけを新しいセッションに貼れば作業できる。

2026-09-29にりんと決めた前提（5ページ共通）:

- **詳細ページは5枚**（`/philosophy/` `/activities/` `/achievements/` `/future/` `/news/`）。Origin と MVV は独立ページにせず `/philosophy/` の中のセクション（`#origin` / `#mvv`）にする。ヘッダー・フッター・トップページのリンクは今のままで正しい
- **記載内容は今のサイトの文章をそのまま使う**。まずはミニマムでよい。肉付けはこれから。新しい文章を創作しない
- **トップページの本文は今回は変えない**（詳細ページと同じ文章が並ぶが、5ページそろってから短くする）
- **各ページの先頭は、文字だけの見出し帯**（写真は敷かない）

---

`src/pages/philosophy/index.html` を新規作成し、`/philosophy/` で開ける理念ページを作ってください。

## 最初に読むもの
1. `AGENTS.md` — 自律範囲・承認が必要な操作・git運用・Notion運用のルール
2. `docs/content-authoring.md` — ページ執筆の手順と `<!--meta-->` の書式（**必読**）
3. `docs/content-plan.md` — 特に「ページ別コンテンツ構成」と「5. トップページ構成」
4. `src/pages/index.html` — **文章の出典はここ**
5. `src/style.css` — 使えるクラスとデザイントークンの確認
6. 元のHTML: `git show cbcbc2d^:src/pages/index.html`（MVVに統合する前のトップページ。Mission/Visionの全文と5つのバリューのカードがある）

着手したら、Notionの「理念ページ(/philosophy)作成」タスクのステータスを `進行中` にし、`docs/tasks.md` にも反映する。

## 共通の作り

### ファイルの置き場所
`src/pages/philosophy/index.html`。`build.js` がそのまま `dist/philosophy/index.html` を出力し、`/philosophy/` で開ける。`src/partials/`（ヘッダー・フッター・head）は**触らない**。

### 先頭の `<!--meta-->` ブロック（必須）
```html
<!--meta
title: 桃下村塾（とうかそんじゅく）｜ 理念
description: このページ固有の説明文。120字前後。他のページと同じ文言にしない
canonical: https://www.momoshita.jp/philosophy/
ogTitle: SNSシェア時のタイトル
ogDescription: SNSシェア時の説明文
-->
```
`canonical` は末尾スラッシュ付き。`title` は「桃下村塾（とうかそんじゅく）｜ ページ名」で統一する。

### ページ先頭の見出し帯（**このページで新規に作る共通部品**）
5ページで使い回す部品なので、ここで形とCSSを作る。

```html
<section class="page-hero has-grid">
  <div class="deco deco-graph" aria-hidden="true"></div>
  <div class="container">
    <nav class="breadcrumb" aria-label="現在地">
      <a href="/">ホーム</a>
      <span class="bc-sep" aria-hidden="true">›</span>
      <span aria-current="page">理念</span>
    </nav>
    <h1 class="page-title">
      <span class="en">Philosophy</span>
      <span class="jp">桃下村塾の理念</span>
    </h1>
    <p class="page-lead">（そのページを一文で表す。トップページの既存の文から取る）</p>
  </div>
</section>
```

CSSの条件:
- `.page-title .en` / `.jp` は、トップの `.section-title` と同じ字面・同じ大きさの感覚にそろえる（`--f-en` の大見出し＋日本語の小見出し）。ただし**丸い矢印ボタン（`.title-link` の `::after`）は付けない**。詳細ページ自身の見出しなので、リンクではない
- ヘッダーが固定されているので、上の余白は `padding:clamp(140px, 16vw, 200px) 0 clamp(48px, 6vw, 72px)` 程度にして、見出しがヘッダーに隠れないようにする
- `.breadcrumb` は小さめ（13〜14px、`--f-jp`、`--c-mute`）。リンクは `--c-peach-dk` でホバー
- 色は必ずCSS変数経由。生のhexを書かない

### アンカーの位置ずれ対策（**このページで1度だけ追加する**）
`/philosophy/#origin` や `/philosophy/#mvv` で開いたとき、固定ヘッダーに見出しが隠れないよう、`section[id]{scroll-margin-top:110px}` 相当を `style.css` に追加する。

### 見出し・本文のルール
- ページ内の大見出しは `<h1>`（見出し帯）1つだけ。以降のセクションは `<h2 class="section-title">`（英語＋日本語）、その中の小見出しは `<h3>`
- トップページと同じ `section` / `container` / `reveal` / `deco-graph` の組み立てを使う。既存クラス（`.phil-block` `.ach-grid` `.ach-card` `.value-card` `.mv-grid` など）を再利用し、**新しいCSSは必要最小限**にする
- `.ach-card` / `.value-card` はリンクではないので `is-link` を付けない（ホバーで浮き上がらせない）
- 画像は今のまま `/images/○○.jpg` の絶対パスで参照する。`images/` のページ別サブフォルダ再編は**今回やらない**（別タスク）

### 事実の扱い
`src/pages/index.html` と `docs/content-plan.md` に書かれていない事実（数字・固有名詞・日程・金額・人名）は**書かない**。必要な場所には `[要確認: 何を確認したいか]` と本文に明記し、報告時に一覧で挙げる。

## このページの中身
トップの `#about` `#origin` `#mvv` の内容を**全文**移す（トップは今回そのまま残す）。

| セクション | 中身 |
|---|---|
| 見出し帯 | Philosophy ／ 桃下村塾の理念。リードは「桃下村塾は、岡山から社会を変革する人材を輩出することを目指す、実践型の学びの場である。」 |
| 01 理念 | トップ `#about` の本文4段落＋ミーティング写真（`/images/meeting.jpg`）＋図解2枚のブロック（`phil-tree.png` / `phil-jinzai.png`、小見出し「めざすのは、社会に価値を生み出す人材」「リーダーではなく、『自分』を育てる」） |
| 02 Origin（`id="origin"`） | トップ `#origin` の引用文＋本文3段落をそのまま |
| 03 MVV（`id="mvv"`） | **トップの要約版ではなく、元の全文を置く**。Mission・Visionは `.mv-grid` / `.mv-block` / `.mv-headline` の元の見出しと本文、バリューは `.values-grid` / `.value-card` の5枚（01〜05、サブコピーと説明文つき）。元のHTMLは `git show cbcbc2d^:src/pages/index.html` で丸ごと取り出せる。CSSは今も `style.css` に残っているので、HTMLを貼り直すだけで元の見た目になる |
| 末尾 | 活動内容（`/activities/`）・実績（`/achievements/`）へのリンクと、お問い合わせ（`/#contact`）へのリンク。トップの `.more-link` を使い回す |

## このページでやらないこと
- `sitemap.xml` の更新（詳細ページのURLはRenderのビルド設定を切り替えるまで本番で404になるため、フェーズ3のSEO仕上げでまとめて行う）
- `images/` のページ別サブフォルダ再編
- トップページの本文を短くすること
- カード一覧を自動で横に流すアニメーション（デザイン改良フェーズ）
- 他の詳細ページを一緒に作ること（1ページずつレビューを受ける）
- `git push` / `main` へのマージ / Render設定変更（すべて承認必須）

## 確認項目
1. `node build.js` が成功し、`dist/philosophy/index.html` ができる
2. ローカルで表示確認する。サーバーはユーザーに起動してもらう（`python3 -m http.server 5173 -d dist`。バックグラウンドで動かすとメモリ不足で止められる）。ヘッドレスChromeで確認する場合は、**終わったらChromeのプロセスを必ず終了する**
3. 幅1920px・1280px・390pxで、横スクロールが出ないこと、文字が小さすぎないこと
4. ヘッダーのメニューで「Philosophy」の項目に桃色の下線が出ること（`.is-current`）
5. トップページの「Philosophy」の見出しリンクと「詳しく見る →」から、このページに実際に飛べること（404が1つ減る）
6. `/philosophy/#origin` `/philosophy/#mvv` で開いたとき、見出しがヘッダーに隠れないこと
7. ブラウザのコンソールにエラーが出ていないこと
8. CSSを変更したら `src/partials/head.html` の `style.css?v=YYYYMMDD` を当日の日付に更新する

## 終わったら
1. `docs/worklog.md` の先頭にエントリを追記（書式はファイル冒頭のテンプレート通り。確認した内容も書く）
2. ローカルコミット（pushはしない）
3. Notionの「理念ページ(/philosophy)作成」タスクと `docs/tasks.md` のステータスを更新（レビュー承認前は `完了` にしない）
4. チャットで報告する: 作ったURLとファイルパス／本文の要約／`[要確認]` の一覧／判断に迷った点
5. りんのレビューを待ってから、次のページ（`/activities/` 活動内容 = `detail-page-2-activities.md`）に進む
