# 実装プロンプト3/7: `/mvv/` MVV

作成: 2026-09-30 ／ 全体の索引: [`detail-pages-implementation.md`](detail-pages-implementation.md)

**このページは実装済み**（2026-09-30時点）。文章の肉付け・修正をするときは、このファイルの前提を守ること。

このファイルは**MVVページ1枚分**の実装プロンプト。これだけを新しいセッションに貼れば作業できる。

りんと決めた前提（全ページ共通）:

- **詳細ページは7枚**（`/philosophy/` `/origin/` `/mvv/` `/activities/` `/achievements/` `/future/` `/news/`）。ヘッダー・フッターのメニュー項目と1対1で対応する。**1ページには1つのテーマだけを書く**（2026-09-30にりんの指示で、Origin と MVV を `/philosophy/` のセクションから独立ページへ変更）
- **Mission・Vision・Value は「MVV」で1ページ**。メニュー項目が「MVV」1つのため、バリューを別ページには分けない
- **記載内容は今のサイトの文章をそのまま使う**。まずはミニマムでよい。肉付けはこれから。新しい文章を創作しない
- **トップページの本文は今回は変えない**（詳細ページと同じ文章が並ぶが、全ページそろってから短くする）
- **各ページの先頭は、文字だけの見出し帯**（写真は敷かない）

---

`src/pages/mvv/index.html`。`/mvv/` で開けるMVVページ。

## 最初に読むもの
1. `AGENTS.md` — 自律範囲・承認が必要な操作・git運用・Notion運用のルール
2. `docs/content-authoring.md` — ページ執筆の手順と `<!--meta-->` の書式（**必読**）
3. `src/pages/index.html` — トップの `#mvv`（要約版）
4. **元のHTML: `git show cbcbc2d^:src/pages/index.html`** — トップに統合する前の Mission/Vision 全文と、5つのバリューのカード。**文章の出典はここ**
5. `src/pages/philosophy/index.html` — 見出し帯と末尾の導線の作り（**この形をそのまま真似る**）
6. `src/style.css` — 使えるクラスとデザイントークンの確認

着手したら、Notionの「MVVページ(/mvv)作成」タスクのステータスを `進行中` にし、`docs/tasks.md` にも反映する。

## 共通の作り

### ファイルの置き場所
`src/pages/mvv/index.html`。`build.js` がそのまま `dist/mvv/index.html` を出力し、`/mvv/` で開ける。`src/partials/`（ヘッダー・フッター・head）は**触らない**。

### 先頭の `<!--meta-->` ブロック（必須）
```html
<!--meta
title: 桃下村塾（とうかそんじゅく）｜ MVV
description: このページ固有の説明文。120字前後。他のページと同じ文言にしない
canonical: https://www.momoshita.jp/mvv/
ogTitle: SNSシェア時のタイトル
ogDescription: SNSシェア時の説明文
-->
```
`canonical` は末尾スラッシュ付き。`title` は「桃下村塾（とうかそんじゅく）｜ ページ名」で統一する。

### ページ先頭の見出し帯（`/philosophy/` で作った共通部品を使う）
`src/pages/philosophy/index.html` の先頭にある `.page-hero` をそのまま真似る。パンくずの現在地（`aria-current="page"` の文字）と `.page-title` の英語・日本語だけを、このページのものに差し替える。**`.page-lead`（見出し帯のリード文）は置かない**（2026-10-05 りんの指示で全ページそろえた。言いたい一文は本文の先頭に置く）。**CSSは既にあるので追加しない**（必要になったら、なぜ必要かを報告してから）。

### 見出し・本文のルール
- ページ内の大見出しは `<h1>`（見出し帯）1つだけ。**見出し帯の直後の Mission/Vision にはセクション見出しを置かない**（同じページ名が2回並ぶため）。バリューの区切りだけ `<h2 class="section-title">`（Values ／ 5つのバリュー）を置く
- 既存クラス（`.mission-vision` `.mv-grid` `.mv-block` `.mv-label` `.mv-headline` `.mv-divider` / `.values-grid` `.value-card` `.value-no` `.value-sub`）を再利用する。**HTMLを貼り直すだけで元の見た目になる**ので、新しいCSSは要らない
- `.value-card` はリンクではないので `is-link` を付けない（ホバーで浮き上がらせない）
- Mission/Vision のセクションは濃い背景（`.mission-vision`）。**この上に `.section-title` を置くと文字が見えなくなる**ので、見出しを置くなら文字色の上書きが要る。原則どおり見出しは置かない

### 事実の扱い
`src/pages/index.html` と `docs/content-plan.md` に書かれていない事実（数字・固有名詞・日程・金額・人名）は**書かない**。必要な場所には `[要確認: 何を確認したいか]` と本文に明記し、報告時に一覧で挙げる。

## このページの中身

**Mission・Vision・Value だけを書く。理念と成り立ちは別ページなので、ここには入れない。**

| セクション | 中身 |
|---|---|
| 見出し帯 | MVV ／ 桃下村塾が大切にすること。**`.page-lead` は置かない** |
| Mission / Vision | 濃い背景の `.mission-vision` ＋ `.mv-grid`。**トップの要約版ではなく、統合前の全文**（`git show cbcbc2d^:src/pages/index.html`）。Mission「岡山から、社会を変革する人材を育てる。」、Vision「学生がAIとビジネスを武器に、地域と社会に新しい価値を生み出し続ける未来をつくる。」＋それぞれの本文 |
| Values | `<h2 class="section-title">` で Values ／ 5つのバリュー。`.values-grid` に `.value-card` を5枚（01〜05、サブコピーと説明文つき）。回路基板の装飾（`.deco-circuit-full`）と側面ラベル（`.deco-binary`）も元のまま使う |
| 末尾 | 理念（`/philosophy/`）・成り立ち（`/origin/`）・お問い合わせ（`/#contact`）へのリンク。`.more-link-wrap.page-links` ＋ `.more-link` を使う |

## このページでやらないこと
- 理念・成り立ちの内容を書くこと（`detail-page-1-philosophy.md` / `detail-page-2-origin.md` の担当）
- バリューを別ページに分けること（メニューが「MVV」1項目のため）
- `sitemap.xml` の更新（フェーズ3のSEO仕上げでまとめて行う）
- `images/` のページ別サブフォルダ再編
- トップページの本文を短くすること
- カード一覧を自動で横に流すアニメーション（デザイン改良フェーズ）
- 他の詳細ページを一緒に作ること（1ページずつレビューを受ける）
- `git push` / `main` へのマージ / Render設定変更（すべて承認必須）

## 確認項目
1. `node build.js` が成功し、`dist/mvv/index.html` ができる
2. ローカルで表示確認する。サーバーはユーザーに起動してもらう（`python3 -m http.server 5173 -d dist`。バックグラウンドで動かすとメモリ不足で止められる）。ヘッドレスChromeで確認する場合は、**終わったらChromeのプロセスを必ず終了する**
3. 幅1920px・1280px・390pxで、横スクロールが出ないこと、文字が小さすぎないこと
4. ヘッダーのメニューで「MVV」の項目に桃色の下線が出ること（`.is-current`）
5. トップページの「MVV」の見出しリンクと「詳しく見る →」から、このページに実際に飛べること
6. バリューのカードが5枚とも表示され、スマホ幅（760px以下）では横スワイプになること
7. 濃い背景の Mission/Vision で、文字が読めること（白／`--c-peach`）
8. ブラウザのコンソールにエラーが出ていないこと
9. CSSを変更したら `src/partials/head.html` の `style.css?v=YYYYMMDD` を当日の日付に更新する

## 終わったら
1. `docs/worklog.md` の先頭にエントリを追記（書式はファイル冒頭のテンプレート通り。確認した内容も書く）
2. ローカルコミット（pushはしない）
3. Notionの「MVVページ(/mvv)作成」タスクと `docs/tasks.md` のステータスを更新（レビュー承認前は `完了` にしない）
4. チャットで報告する: 作ったURLとファイルパス／本文の要約／`[要確認]` の一覧／判断に迷った点
5. りんのレビューを待ってから、次のページ（`/activities/` 活動内容 = `detail-page-4-activities.md`）に進む
