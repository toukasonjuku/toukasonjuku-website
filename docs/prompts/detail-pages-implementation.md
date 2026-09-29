# 実装プロンプト: 詳細ページ5枚（/philosophy/ /activities/ /achievements/ /future/ /news/）

作成: 2026-09-29 ／ 対応タスク: Notion「理念ページ(/philosophy)作成」「活動内容ページ(/activities)作成」「実績ページ(/achievements)作成」「展望ページ(/future)作成」「お知らせページ新設」

2026-09-29にりんと決めた前提:

- **5ページ構成**。Origin と MVV は独立ページにせず `/philosophy/` の中のセクション（`#origin` / `#mvv`）にする。ヘッダー・フッター・トップページのリンクは今のままで正しい
- **お知らせは一覧ページだけ**作る。記事を自動で並べる仕組み（`build.js` の拡張）は、実際の記事が出てきてから別タスクで作る
- **トップページの本文は今回は変えない**（詳細ページと同じ文章が並ぶが、ページがそろってから短くする）
- **各ページの先頭は、文字だけの見出し帯**（写真は敷かない）
- **記載内容は今のサイトの文章をそのまま使う**。まずはミニマムでよい。肉付けはこれから

以下をそのままClaude Codeに貼り付けて使う。

---

トップページ（`src/pages/index.html`）から各セクションの詳細ページ5枚を作ってください。**1ページ作るごとに報告し、りんのレビューを受けてから次のページに進みます**（全ページ一括で作らない）。

## 最初に読むもの
1. `AGENTS.md` — 自律範囲・承認が必要な操作・git運用・Notion運用のルール
2. `docs/content-authoring.md` — ページ執筆の手順と `<!--meta-->` の書式（**必読**）
3. `docs/content-plan.md` — 特に「ページ別コンテンツ構成」と「5. トップページ構成」
4. `src/pages/index.html` — **文章の出典はここ**。新しい文章を創作しない
5. `src/style.css` — 使えるクラスとデザイントークンの確認

## 作る順番（1ページずつ）
1. `/philosophy/` → 2. `/activities/` → 3. `/achievements/` → 4. `/future/` → 5. `/news/`

各ページで次のサイクルを回す: 実装 → `node build.js` → ローカルで表示確認 → `docs/worklog.md` 追記＋ローカルコミット → チャットで報告 → レビュー → 次のページ。

Notionのステータスは、そのページに着手したとき `進行中`、レビューで承認されたら `完了` に更新する（`docs/tasks.md` にも同時に反映）。

## 全ページ共通の作り

### ファイルの置き場所
`src/pages/<page>/index.html`（例: `src/pages/philosophy/index.html`）。`build.js` がそのまま `dist/philosophy/index.html` を出力し、`/philosophy/` で開ける。`src/partials/`（ヘッダー・フッター・head）は**触らない**。

### 先頭の `<!--meta-->` ブロック（必須）
```html
<!--meta
title: 桃下村塾（とうかそんじゅく）｜ 理念
description: ページ固有の説明文。120字前後。全ページ同じ文言にしない
canonical: https://www.momoshita.jp/philosophy/
ogTitle: SNSシェア時のタイトル
ogDescription: SNSシェア時の説明文
-->
```
`canonical` は末尾スラッシュ付き。`title` は「桃下村塾（とうかそんじゅく）｜ ページ名」で統一する。

### ページ先頭の見出し帯（新規コンポーネント・全ページ共通）
`/philosophy/` を作るときに、この形とCSSを1度だけ作り、他の4ページは同じ形を使い回す。

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

### 見出し・本文のルール
- ページ内の大見出しは `<h1>`（見出し帯）1つだけ。以降のセクションは `<h2 class="section-title">`（英語＋日本語）、その中の小見出しは `<h3>`
- トップページと同じ `section` / `container` / `reveal` / `deco-graph` の組み立てを使う。既存クラス（`.phil-block` `.ach-grid` `.ach-card` `.value-card` `.mv-grid` など）を再利用し、**新しいCSSは必要最小限**にする
- `.ach-card` / `.value-card` はリンクではないので `is-link` を付けない（ホバーで浮き上がらせない）
- 画像は今のまま `/images/○○.jpg` の絶対パスで参照する。`images/` のページ別サブフォルダ再編は**今回やらない**（別タスク）

### ページの最後に置く導線
各ページの末尾に、次に見てほしいページへのリンクを2つ程度と、お問い合わせへのリンクを置く。トップの `.more-link` を使い回す。リンク先は `/philosophy/` `/activities/` `/achievements/` `/future/` `/news/` `/#contact` のいずれか。

### アンカーの位置ずれ対策
`/philosophy/#origin` や `/philosophy/#mvv` で開いたとき、固定ヘッダーに見出しが隠れないよう、`section[id]{scroll-margin-top:110px}` 相当を `style.css` に追加する。

### 事実の扱い
`src/pages/index.html` と `docs/content-plan.md` に書かれていない事実（数字・固有名詞・日程・金額・人名）は**書かない**。必要な場所には `[要確認: 何を確認したいか]` と本文に明記し、報告時に一覧で挙げる。

## ページごとの中身

### 1. `/philosophy/` 理念
トップの `#about` `#origin` `#mvv` の内容を**全文**移す（トップは今回そのまま）。

| セクション | 中身 |
|---|---|
| 見出し帯 | Philosophy ／ 桃下村塾の理念。リードは「桃下村塾は、岡山から社会を変革する人材を輩出することを目指す、実践型の学びの場である。」 |
| 01 理念 | トップ `#about` の本文4段落＋ミーティング写真（`/images/meeting.jpg`）＋図解2枚のブロック（`phil-tree.png` / `phil-jinzai.png`、小見出し「めざすのは、社会に価値を生み出す人材」「リーダーではなく、『自分』を育てる」） |
| 02 Origin（`id="origin"`） | トップ `#origin` の引用文＋本文3段落をそのまま |
| 03 MVV（`id="mvv"`） | **トップの要約版ではなく、元の全文を置く**。Mission・Visionは `.mv-grid` / `.mv-block` / `.mv-headline` の元の見出しと本文、バリューは `.values-grid` / `.value-card` の5枚（01〜05、サブコピーと説明文つき）。**元のHTMLは `git show cbcbc2d^:src/pages/index.html` で丸ごと取り出せる**（MVVに統合する前のトップページ）。CSSは今も `style.css` に残っているので、HTMLを貼り直すだけで元の見た目になる |
| 末尾 | 活動内容・実績へのリンク＋お問い合わせ |

### 2. `/activities/` 活動内容
| セクション | 中身 |
|---|---|
| 見出し帯 | Activities ／ 活動内容 |
| 本文 | トップの3つ（ももした道場／定例会／イベント・コラボレーション）を、写真と文章を交互に並べる形（**元のHTMLは `git show 4613ac4:src/pages/index.html` にある**＝カード化する前のトップページ。`.activity-rows` / `.activity-row` / `.activity-gallery` のCSSは今も `style.css` に残っている）で詳しく見せる |
| 写真 | `activity-01.jpg` `activity-02.jpg` `ach-external.jpg` に加え、トップから外した `activity-03.jpg` `code.jpg` を `.activity-gallery` で使う |
| 今後追加する項目 | `docs/content-plan.md` に「定例会／ももした道場ビジネス／ももした道場テック／遊びイベント／各役職紹介」とあるが、本文がまだない。**勝手に書かず**、ページ末尾に `[要確認: ももした道場ビジネス／テック、遊びイベント、各役職紹介の内容]` と1行入れる |
| 末尾 | 実績・展望へのリンク＋お問い合わせ |

### 3. `/achievements/` 実績
| セクション | 中身 |
|---|---|
| 見出し帯 | Achievements ／ これまでの実績 |
| 本文 | トップの5件（協生PJ／Tech Study Lab／サークルコラボ／高校生への授業／外部イベント）を `.ach-grid` / `.ach-card` でそのまま。文章もトップと同じ |
| 今後追加する項目 | `content-plan.md` の「協生農法／小寺先生ワークショップ／IT企業交流会」は本文がないため `[要確認: 各実績の詳細（実施時期・人数・内容）]` と1行入れる |
| 末尾 | 活動内容・お知らせへのリンク＋お問い合わせ |

### 4. `/future/` 展望
| セクション | 中身 |
|---|---|
| 見出し帯 | Future ／ 今後の展望 |
| 本文 | トップの `future-lead`（2026年、数百人規模のホールイベントを岡山で開催する。）と `future-text` をそのまま |
| 数字 | **トップから削除した数字3つをここに置く**（数百人／中期目標・ホールイベント、2回／週・ももした道場（月・水）、2025〜・設立から、これからへ）。`.future-stats` / `.stat` のCSSは `style.css` に残っている。背景が明るいページなので、文字色だけ読める色に調整する |
| 今後追加する項目 | `content-plan.md` の「OCS／高校出張／スポンサーお願い」は本文がないため `[要確認: OCS・高校出張・スポンサー募集の内容]` と1行入れる |
| 末尾 | 理念・お知らせへのリンク＋お問い合わせ |

### 5. `/news/` お知らせ
| セクション | 中身 |
|---|---|
| 見出し帯 | News ／ お知らせ |
| 本文 | 記事がまだないので、「準備中」の一文だけ（例: 「これから、イベントの開催報告やコラボの告知などを掲載していきます。」）。**架空の記事を作らない** |
| 作り | 記事が出てきたら手で追記できるよう、トップの `.news-list` / `.news-item` と同じ形をHTMLコメントで雛形として残しておく |
| トップとの整合 | トップの `#news` にある `[要確認]` の仮記事3件は今回も残す（記事が決まってから両方を同時に差し替える） |
| 末尾 | 活動内容・実績へのリンク＋お問い合わせ |

## やらないこと
- `sitemap.xml` の更新（詳細ページのURLはRenderのビルド設定を切り替えるまで本番で404になるため、フェーズ3のSEO仕上げでまとめて行う）
- `images/` のページ別サブフォルダ再編
- `/news` の記事システム（`build.js` の拡張）
- トップページの本文を短くすること
- カード一覧を自動で横に流すアニメーション（デザイン改良フェーズ）
- `git push` / `main` へのマージ / Render設定変更（すべて承認必須）

## 各ページの確認項目
1. `node build.js` が成功し、`dist/<page>/index.html` ができる
2. ローカルで表示確認する。サーバーはユーザーに起動してもらう（`python3 -m http.server 5173 -d dist`。バックグラウンド実行はメモリ不足で止められる）。ヘッドレスChromeで確認する場合は `/private/tmp/.../scratchpad` の手順を使い、**終わったらChromeのプロセスを必ず終了する**
3. 幅1920px・1280px・390pxで、横スクロールが出ないこと、文字が小さすぎないこと
4. ヘッダーのメニューで、今いるページの項目に桃色の下線が出ること（`.is-current`）
5. トップページの見出しリンク・「詳しく見る →」から、そのページに実際に飛べること（404が1つ減る）
6. `/philosophy/#origin` `/philosophy/#mvv` で開いたとき、見出しがヘッダーに隠れないこと
7. ブラウザのコンソールにエラーが出ていないこと
8. CSSを変更したら `src/partials/head.html` の `style.css?v=YYYYMMDD` を当日の日付に更新する

## 1ページ終わるごとに
1. `docs/worklog.md` の先頭にエントリを追記（書式はファイル冒頭のテンプレート通り。確認した内容も書く）
2. ローカルコミット（pushはしない）
3. Notionの該当タスクと `docs/tasks.md` のステータスを更新
4. チャットで報告する: 作ったURLとファイルパス／本文の要約／`[要確認]` の一覧／判断に迷った点
5. りんのレビューを待つ

## 5ページすべて終わったら
- `CLAUDE.md` の「ファイル構成」と、トップページのセクション構成の節を実態に合わせて更新する
- 次のフェーズ（フェーズ2: 画像整理 → フェーズ3: SEO仕上げ → フェーズ4: 本番反映）をりんに提案する
