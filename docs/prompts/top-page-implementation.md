# 実装プロンプト: トップページ再構成

作成: 2026-09-17 ／ 対応タスク: Notion「トップページ(index)再構成」・`docs/tasks.md` 同名行

以下をそのままClaude Codeに貼り付けて使う。

---

トップページ（`src/pages/index.html`）を、りんの手書き案に従って再構成してください。

## 最初に読むもの
1. `AGENTS.md`（自律範囲・git運用・Notion運用ルール）
2. `docs/content-plan.md` の「5. トップページ構成（2026-09-17確定）」 ← **仕様の正はここ**
3. `docs/content-authoring.md`（執筆ルール）
4. 手書き案 `HP構成案_手書き/トップページ案_v1.pdf`（参考）

## 着手時・完了時の記録
- 着手時: Notionタスク「トップページ(index)再構成」（https://app.notion.com/p/3c2edf84e39e81bbaf89ea71fd8ae171）のステータスを `進行中` にし、`docs/tasks.md` にも反映
- 完了時: レビューで承認を受けてから `完了` に更新する（実装しただけでは完了にしない）

## 実装スコープ（この順で進め、各ステップ後に `node build.js` でビルドが通ることを確認）

### Step 1: セクション構成の組み替え（`src/pages/index.html`）
- 並び: Hero → 01 Philosophy(`#about`) → 02 Origin(`#origin`、id追加) → 03 MVV(`#mvv`) → 04 Activities → 05 Achievements → 06 Future → 07 News(`#news`、新設) → 08 Contact
- **MVV**: 現行の Mission/Vision セクション（`#mission`）と 03 Values（`#values`）を1セクションに統合。
  - 見出し: 英語 `MVV`、日本語は `[要確認: MVVの日本語見出し（仮: 桃下村塾が大切にすること）]`
  - Mission／Vision／Value の3カード横並び（スマホでは縦積み）
  - Mission・Visionカード: 既存の `mv-headline` の一文のみ（本文段落は載せない）
  - Valueカード: 「5つのバリュー」＋ 01〜05 のバリュー名のみ（既存 `value-card` の `h4`）
  - 背景は Philosophy/Origin と同じ方眼背景（`has-grid` + `deco-graph`）
  - 不要になった `.mission-vision` / `.values-grid` 系CSSはこのステップでは削除しない（理念ページで再利用予定）
- **Philosophy / Origin / Activities / Achievements**: 本文・既存写真・図解・Activitiesの写真ギャラリーは**すべてそのまま残す**（既存写真は引き続き使用する方針）
- **Future**: 数字欄 `.future-stats`（数百人／週2回／2025〜）を削除。`future-lead` と `future-text` は残す。背景は現行の `hero.jpg`＋オーバーレイをそのまま使う。番号 06
- **News（新設）**: 番号 07。英語 `News`／日本語 `お知らせ`。「日付＋タイトル」の一覧を3件＋「一覧を見る →」（`/news/`）。記事内容は事実を創作せず、`[要確認: お知らせ記事の日付とタイトル]` の仮の記事3件にする。デザインは既存トークン（`--c-line` の区切り線、`--f-en` の日付等）で控えめに。当面はHTMLに直接書く（`/news` システム完成後に自動化）
- **Contact**: 番号を 07→08 に変更、内容は現行のまま

### Step 2: 詳細ページへの導線
- 各セクションの見出し（`section-title` / `future-title`）をリンク化し、セクション末尾に「詳しく見る →」リンクを置く。カード単位のリンクは付けない
- リンク先: Philosophy→`/philosophy/`、Origin→`/philosophy/#origin`、MVV→`/philosophy/#mvv`、Activities→`/activities/`、Achievements→`/achievements/`、Future→`/future/`、News→`/news/`。Contactはリンクなし
- 詳細ページは未作成のため404になるが、それで良い（ユーザー承認済み）
- 見出しリンクの見た目は、普段は現行の見出しと変えず、ホバー時のみ変化させる程度にする

### Step 3: ヘッダー（`src/partials/header.html` / `src/script.js` / `src/style.css`）
- PC・スマホ両方のメニューを `Philosophy / Origin / MVV / Activities / Achievements / Future / News / Contact` にする。リンク先はStep 2と同じ、Contactは `/#contact`
- スマホメニューの日本語: 理念／成り立ち／MVV／活動内容／実績／今後の展望／お知らせ／お問い合わせ
- 8項目でPCヘッダーが窮屈にならないか確認し、はみ出す場合は文字間・余白の調整で対応（どうしても収まらない場合は報告して相談）
- スクロール挙動: ページ最上部では常に表示／下スクロールで隠す／上スクロールで表示（PC・スマホ共通）。既存の `.scrolled` の仕組みは残し、隠す用のクラスを追加する。スマホメニューを開いている間は隠さない
- 桃色の下線（`--c-peach` 系）: ホバー時と、現在ページに該当する項目のみ
- `src/script.js` のスムーススクロール処理が、`/philosophy/#origin` のような別ページへのリンクを邪魔しないことを確認

## やらないこと（後のデザイン改良フェーズ）
- 桃のモチーフ装飾、サントリー風の凝ったデザインやアニメーション、夕焼け背景
- 詳細ページ（`/philosophy/` 等）の作成、`/news` システムの実装、画像のサブフォルダ再編
- `git push`、`main` へのマージ、Render設定変更（すべて承認必須）

## 守ること
- 色・フォントは必ず `style.css` の `:root` のCSS変数経由（生のhex禁止）
- 手書き案・`content-plan.md` にない事実（数字・固有名詞・日程）は書かず `[要確認: ○○]` にする
- CSSを変更したら `src/partials/head.html` の `style.css?v=YYYYMMDD` を更新
- ヘッダーのアンカーを変えたので、`src/pages/index.html` 内の `href="#about"` 等の旧アンカー参照（Heroの Scroll リンク等）も確認・更新する

## 確認
- `node build.js` → `python3 -m http.server 5173 -d dist` → http://localhost:5173/ で表示確認
- PC幅とスマホ幅（約400px）の両方で、セクション順・MVVの3カード・News・ヘッダーの出し入れ・スマホメニューを確認
- ブラウザのコンソールにエラーが出ていないこと

## 完了後
1. `docs/worklog.md` の先頭に追記し、ローカルコミット（`AGENTS.md` のgit運用ルール通り。pushはしない）
2. 実装がCLAUDE.mdの「セクション構成」節と食い違ったら、同じコミットで更新
3. チャットで報告: 何を変えたか、`[要確認]` 箇所の一覧、判断に迷った点
4. りんのレビューを待つ
