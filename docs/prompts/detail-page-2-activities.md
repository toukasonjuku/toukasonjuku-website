# 実装プロンプト2/5: `/activities/` 活動内容

作成: 2026-09-29 ／ 全体の索引: [`detail-pages-implementation.md`](detail-pages-implementation.md)

このファイルは**活動内容ページ1枚分**の実装プロンプト。これだけを新しいセッションに貼れば作業できる。

2026-09-29にりんと決めた前提（5ページ共通）:

- **詳細ページは5枚**（`/philosophy/` `/activities/` `/achievements/` `/future/` `/news/`）。Origin と MVV は独立ページにせず `/philosophy/` の中のセクション（`#origin` / `#mvv`）にする。ヘッダー・フッター・トップページのリンクは今のままで正しい
- **記載内容は今のサイトの文章をそのまま使う**。まずはミニマムでよい。肉付けはこれから。新しい文章を創作しない
- **トップページの本文は今回は変えない**（詳細ページと同じ文章が並ぶが、5ページそろってから短くする）
- **各ページの先頭は、文字だけの見出し帯**（写真は敷かない）

---

`src/pages/activities/index.html` を新規作成し、`/activities/` で開ける活動内容ページを作ってください。

## 最初に読むもの
1. `AGENTS.md` — 自律範囲・承認が必要な操作・git運用・Notion運用のルール
2. `docs/content-authoring.md` — ページ執筆の手順と `<!--meta-->` の書式（**必読**）
3. `docs/content-plan.md` — 特に「ページ別コンテンツ構成」と「5. トップページ構成」
4. `src/pages/index.html` — **文章の出典はここ**
5. `src/style.css` — 使えるクラスとデザイントークンの確認
6. 元のHTML: `git show 4613ac4:src/pages/index.html`（カード化する前のトップページ。写真と文章を交互に並べる `.activity-rows` と `.activity-gallery` がある）

着手したら、Notionの「活動内容ページ(/activities)作成」タスクのステータスを `進行中` にし、`docs/tasks.md` にも反映する。

## 共通の作り

### ファイルの置き場所
`src/pages/activities/index.html`。`build.js` がそのまま `dist/activities/index.html` を出力し、`/activities/` で開ける。`src/partials/`（ヘッダー・フッター・head）は**触らない**。

### 先頭の `<!--meta-->` ブロック（必須）
```html
<!--meta
title: 桃下村塾（とうかそんじゅく）｜ 活動内容
description: このページ固有の説明文。120字前後。他のページと同じ文言にしない
canonical: https://www.momoshita.jp/activities/
ogTitle: SNSシェア時のタイトル
ogDescription: SNSシェア時の説明文
-->
```
`canonical` は末尾スラッシュ付き。`title` は「桃下村塾（とうかそんじゅく）｜ ページ名」で統一する。

### ページ先頭の見出し帯（`/philosophy/` で作った共通部品を使う）
`src/pages/philosophy/index.html` の先頭にある `.page-hero` をそのまま真似る。パンくずの現在地（`aria-current="page"` の文字）、`.page-title` の英語・日本語、`.page-lead` の一文だけを、このページのものに差し替える。**CSSは既にあるので追加しない**（必要になったら、なぜ必要かを報告してから）。

### 見出し・本文のルール
- ページ内の大見出しは `<h1>`（見出し帯）1つだけ。以降のセクションは `<h2 class="section-title">`（英語＋日本語）、その中の小見出しは `<h3>`
- トップページと同じ `section` / `container` / `reveal` / `deco-graph` の組み立てを使う。既存クラス（`.phil-block` `.ach-grid` `.ach-card` `.value-card` `.mv-grid` など）を再利用し、**新しいCSSは必要最小限**にする
- `.ach-card` / `.value-card` はリンクではないので `is-link` を付けない（ホバーで浮き上がらせない）
- 画像は今のまま `/images/○○.jpg` の絶対パスで参照する。`images/` のページ別サブフォルダ再編は**今回やらない**（別タスク）

### 事実の扱い
`src/pages/index.html` と `docs/content-plan.md` に書かれていない事実（数字・固有名詞・日程・金額・人名）は**書かない**。必要な場所には `[要確認: 何を確認したいか]` と本文に明記し、報告時に一覧で挙げる。

## このページの中身

| セクション | 中身 |
|---|---|
| 見出し帯 | Activities ／ 活動内容 |
| 本文 | トップの3つ（ももした道場／定例会／イベント・コラボレーション）を、写真と文章を交互に並べる形で詳しく見せる。**元のHTMLは `git show 4613ac4:src/pages/index.html` にある**。`.activity-rows` / `.activity-row` / `.activity-gallery` のCSSは今も `style.css` に残っている |
| 写真 | `activity-01.jpg` `activity-02.jpg` `ach-external.jpg` に加え、トップから外した `activity-03.jpg` `code.jpg` を `.activity-gallery` で使う |
| 今後追加する項目 | `docs/content-plan.md` に「定例会／ももした道場ビジネス／ももした道場テック／遊びイベント／各役職紹介」とあるが、本文がまだない。**勝手に書かず**、ページ末尾に `[要確認: ももした道場ビジネス／テック、遊びイベント、各役職紹介の内容]` と1行入れる |
| 末尾 | 実績（`/achievements/`）・展望（`/future/`）へのリンクと、お問い合わせ（`/#contact`）へのリンク。トップの `.more-link` を使い回す |

## このページでやらないこと
- `sitemap.xml` の更新（詳細ページのURLはRenderのビルド設定を切り替えるまで本番で404になるため、フェーズ3のSEO仕上げでまとめて行う）
- `images/` のページ別サブフォルダ再編
- トップページの本文を短くすること
- カード一覧を自動で横に流すアニメーション（デザイン改良フェーズ）
- 他の詳細ページを一緒に作ること（1ページずつレビューを受ける）
- `git push` / `main` へのマージ / Render設定変更（すべて承認必須）

## 確認項目
1. `node build.js` が成功し、`dist/activities/index.html` ができる
2. ローカルで表示確認する。サーバーはユーザーに起動してもらう（`python3 -m http.server 5173 -d dist`。バックグラウンドで動かすとメモリ不足で止められる）。ヘッドレスChromeで確認する場合は、**終わったらChromeのプロセスを必ず終了する**
3. 幅1920px・1280px・390pxで、横スクロールが出ないこと、文字が小さすぎないこと
4. ヘッダーのメニューで「Activities」の項目に桃色の下線が出ること（`.is-current`）
5. トップページの「Activities」の見出しリンクと「詳しく見る →」から、このページに実際に飛べること（404が1つ減る）
6. 写真5枚（`activity-01` `activity-02` `activity-03` `ach-external` `code`）がすべて表示されること
7. ブラウザのコンソールにエラーが出ていないこと
8. CSSを変更したら `src/partials/head.html` の `style.css?v=YYYYMMDD` を当日の日付に更新する

## 終わったら
1. `docs/worklog.md` の先頭にエントリを追記（書式はファイル冒頭のテンプレート通り。確認した内容も書く）
2. ローカルコミット（pushはしない）
3. Notionの「活動内容ページ(/activities)作成」タスクと `docs/tasks.md` のステータスを更新（レビュー承認前は `完了` にしない）
4. チャットで報告する: 作ったURLとファイルパス／本文の要約／`[要確認]` の一覧／判断に迷った点
5. りんのレビューを待ってから、次のページ（`/achievements/` 実績 = `detail-page-3-achievements.md`）に進む
