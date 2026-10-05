# 実装プロンプト1/7: `/philosophy/` 理念

作成: 2026-09-29 ／ 2026-09-30にOrigin・MVVを分離して改訂 ／ 全体の索引: [`detail-pages-implementation.md`](detail-pages-implementation.md)

**このページは実装済み**（2026-09-30時点）。文章の肉付け・修正をするときは、このファイルの前提を守ること。

このファイルは**理念ページ1枚分**の実装プロンプト。これだけを新しいセッションに貼れば作業できる。

りんと決めた前提（全ページ共通）:

- **詳細ページは7枚**（`/philosophy/` `/origin/` `/mvv/` `/activities/` `/achievements/` `/future/` `/news/`）。ヘッダー・フッターのメニュー項目と1対1で対応する。**1ページには1つのテーマだけを書く**（2026-09-30にりんの指示で、Origin と MVV を `/philosophy/` のセクションから独立ページへ変更）
- **記載内容は今のサイトの文章をそのまま使う**。まずはミニマムでよい。肉付けはこれから。新しい文章を創作しない
- **トップページの本文は今回は変えない**（詳細ページと同じ文章が並ぶが、全ページそろってから短くする）
- **各ページの先頭は、文字だけの見出し帯**（写真は敷かない）

---

`src/pages/philosophy/index.html`。`/philosophy/` で開ける理念ページ。

## 最初に読むもの
1. `AGENTS.md` — 自律範囲・承認が必要な操作・git運用・Notion運用のルール
2. `docs/content-authoring.md` — ページ執筆の手順と `<!--meta-->` の書式（**必読**）
3. `docs/content-plan.md` — 特に「ページ別コンテンツ構成」と「5. トップページ構成」
4. `src/pages/index.html` — **文章の出典はここ**（`#about` セクション）
5. `src/style.css` — 使えるクラスとデザイントークンの確認

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

### ページ先頭の見出し帯（**このページで作った7ページ共通の部品**）
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
  </div>
</section>
```
CSSは `src/style.css` の「PAGE HERO」節に実装済み（`.page-hero` / `.breadcrumb` / `.page-title` / `.page-lead`、`section[id]{scroll-margin-top:110px}`、詳細ページでヘッダーを最初から白背景にする `body:has(.page-hero)` の一式）。**他のページはこれを使い回すだけで、CSSは追加しない**。

### 見出し・本文のルール
- ページ内の大見出しは `<h1>`（見出し帯）1つだけ。**見出し帯の直後の本文にはセクション見出しを置かない**（同じページ名が2回並ぶため）。ページ内に別テーマの区切りが要るときだけ `<h2 class="section-title">`（英語＋日本語）を使い、その中の小見出しは `<h3>`
- トップページと同じ `section` / `container` / `reveal` / `deco-graph` の組み立てを使う。既存クラス（`.about-grid` `.phil-block` など）を再利用し、**新しいCSSは必要最小限**にする
- `.value-card` などリンクでないカードには `is-link` を付けない（ホバーで浮き上がらせない）
- 画像は今のまま `/images/○○.jpg` の絶対パスで参照する。`images/` のページ別サブフォルダ再編は**今回やらない**（別タスク）

### 事実の扱い
`src/pages/index.html` と `docs/content-plan.md` に書かれていない事実（数字・固有名詞・日程・金額・人名）は**書かない**。必要な場所には `[要確認: 何を確認したいか]` と本文に明記し、報告時に一覧で挙げる。

## このページの中身

**理念だけを書く。成り立ち（Origin）と MVV は別ページなので、ここには入れない。**

| セクション | 中身 |
|---|---|
| 見出し帯 | Philosophy ／ 桃下村塾の理念。**`.page-lead` は置かない**（2026-10-05 りんのレビュー。リードの一文は本文の先頭に置くため） |
| 本文 | トップ `#about` の本文を**現状のHPと同じ形のまま**。先頭の `.lead`「桃下村塾は、岡山から社会を変革する人材を輩出することを目指す、<em>実践型の学びの場</em>である。」＋続く3段落＋ミーティング写真（`/images/meeting.jpg`） |
| 図解2枚 | `.phil-blocks` / `.phil-block`。`phil-tree.png`（小見出し「めざすのは、社会に価値を生み出す人材」）と `phil-jinzai.png?v=2`（小見出し「リーダーではなく、『自分』を育てる」） |
| 末尾 | 成り立ち（`/origin/`）・MVV（`/mvv/`）・お問い合わせ（`/#contact`）へのリンク。`.more-link-wrap.page-links` ＋ `.more-link` を使う |

## このページでやらないこと
- Origin・MVV・バリューの内容を書くこと（`detail-page-2-origin.md` / `detail-page-3-mvv.md` の担当）
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
5. トップページの「Philosophy」の見出しリンクと「詳しく見る →」から、このページに実際に飛べること
6. 最上部（スクロール前）でも、ヘッダーのロゴとメニューの文字が読めること
7. ブラウザのコンソールにエラーが出ていないこと
8. CSSを変更したら `src/partials/head.html` の `style.css?v=YYYYMMDD` を当日の日付に更新する

## 終わったら
1. `docs/worklog.md` の先頭にエントリを追記（書式はファイル冒頭のテンプレート通り。確認した内容も書く）
2. ローカルコミット（pushはしない）
3. Notionの「理念ページ(/philosophy)作成」タスクと `docs/tasks.md` のステータスを更新（レビュー承認前は `完了` にしない）
4. チャットで報告する: 作ったURLとファイルパス／本文の要約／`[要確認]` の一覧／判断に迷った点
5. りんのレビューを待ってから、次のページ（`/origin/` 成り立ち = `detail-page-2-origin.md`）に進む
