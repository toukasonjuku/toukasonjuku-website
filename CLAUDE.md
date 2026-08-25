# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

**桃下村塾（とうかそんじゅく／TOUKA SONJUKU）公式サイト**。岡山大学を中心に2025年に発足したAI学生団体の公式Webサイト。
ビルド不要の素の **HTML / CSS / JavaScript** のみで構成され、フレームワーク（React等）・npm・バンドラは一切使わない。ファイルを編集して `git push` するだけで Render が自動デプロイする。

- **公開URL**: https://www.momoshita.jp
- **GitHub**: https://github.com/Toukasonjuku-AI/toukasonjuku-website
- **ホスティング**: Render（Static Site・無料プラン）
- **旧URL**: `toukasonjuku-website.onrender.com` → `index.html` 冒頭のスクリプトで新ドメインへ自動リダイレクト
- **プロジェクト管理（タスク・議事録）**: [Notion](https://app.notion.com/p/3c0edf84e39e81149387d451475ce129?v=3c0edf84e39e8140a5be000c083a2aa4) — **タスクの正はNotion**。非公開ページでWebFetch不可のため、内容が更新されたらユーザーに要点を貼ってもらい、`docs/tasks.md`（タスクのミラー）へ反映する。齟齬があればNotionを優先する

### 現状（2026-08時点）

1ページ構成（`index.html` / `style.css` / `script.js`）。SEO: Google Search Console登録済み・sitemap.xml送信済み・OGP/Twitter Card/JSON-LD記述済み。QRコード生成用Pythonスクリプト（`make_qr.py`）あり。

## 今後の方針：マルチページ化

**現在進行中の最重要タスク**: 1ページ構成 → マルチページ構成（`/` `/philosophy` `/activities` `/achievements` `/vision` ＋お知らせページ）への構造変更。デザインのトンマナは維持したまま、情報構造だけを変える。理想完成 **2026-09-18**、最終期限 **2026-09-28**。

詳細な構成・目的・スケジュールは [`docs/content-plan.md`](docs/content-plan.md)、作業スコープは [`docs/tasks.md`](docs/tasks.md) を参照。この方針が実装に反映され次第、CLAUDE.mdの「ファイル構成」「セクション構成」節も実態に合わせて更新すること。

## ローカル確認・デプロイ

```bash
py -m http.server 5173   # ローカルサーバー起動 → http://localhost:5173/
```

```bash
git add -A
git commit -m "変更内容のメモ"
git push                 # push後、Renderが自動検知して1〜2分で本番反映
```

`npm run build` 等のビルド工程は存在しない。lint/test/typecheckの仕組みもなし（静的サイトのため）。

## ファイル構成

```
.
├── index.html          ← ページ本体（文章・写真の指定・SEO/OGP/JSON-LDは全部ここ）
├── style.css           ← デザイン（色・文字サイズ・レイアウト）
├── script.js           ← ヘッダースクロール状態・ハンバーガーメニュー・スクロールreveal・スムーススクロール
├── images/              ← 写真・ロゴ・図解（実績4枚 ach-*.jpg、活動3枚 activity-*.jpg、理念図解 phil-*.png 等）
├── qr/                 ← サイトQRコード（qr-logo.png / qr-plain.png）
├── make_qr.py           ← QRコード再生成スクリプト（要 qrcode / pillow）
├── favicon.ico / favicon.png / favicon-96.png / apple-touch-icon.png / favicon.svg
├── robots.txt / sitemap.xml
├── README.md            ← 運用引き継ぎ用ドキュメント（編集手順・アカウント情報）
└── docs/                ← 開発ドキュメント一式（詳細は下記）
    ├── tasks.md          ← タスク管理（Notionのミラー・タスクの正はNotion）
    ├── content-plan.md   ← マルチページ化の計画書（URL構成・ページ別コンテンツ・スケジュール等）
    └── worklog.md        ← 作業ログ（コミットごとに先頭へ追記・運用必須）
```

### `index.html` のセクション構成（`id` はナビと同期）

`#top`（Hero）→ `#about`（理念）→ `#mission`（Mission/Vision）→ `#values`（バリュー）→ `#activities`（活動内容）→ `#achievements`（実績）→ `#future`（今後の展望）→ `#contact`（お問い合わせ）

セクション追加・削除時は、ヘッダーナビ（PC/モバイル両方）の `href="#..."` リンクも合わせて更新すること。

## 技術スタック・重要な注意

- 素のHTML/CSS/JS。フレームワーク・ビルドツール・パッケージ管理なし
- フォント: Noto Serif JP / Cormorant Garamond / Noto Sans JP（CSS変数 `--f-jp` / `--f-en` / `--f-sans`）
- **キャッシュ対策**: 画像を同名のまま差し替えるとブラウザキャッシュが残るため、`images/○○.jpg?v=2` のようにクエリを付与する。CSSも同様に `index.html` 側の `<link rel="stylesheet" href="style.css?v=YYYYMMDD">` の日付を更新する
- **SEO/OGP**: `index.html` の `<head>` にタイトル・description・OGP・Twitter Card・JSON-LD構造化データが集約されている。本文を大きく変更した際はここも揃えて更新する
- Google Search Console 登録済み（`sitemap.xml` 送信済み）

## デザイントークン（`style.css` の `:root`）

色・フォント・レイアウト基準値は2つの `:root` ブロックにまとめられている。**生のhexを個別要素に書かず、必ず変数経由で使う**。

| 変数 | 用途 |
|---|---|
| `--c-bg` / `--c-bg-soft` | 背景色 |
| `--c-ink` / `--c-ink-soft` / `--c-mute` | 本文・見出しの文字色 |
| `--c-peach` / `--c-peach-dk` / `--c-peach-lt` | 桃ピンクのアクセント色 |
| `--c-accent` | 強調色（濃い赤） |
| `--c-deep` | 見出しなどの濃い文字色 |
| `--c-line` | ボーダー・区切り線 |
| `--c-tech` / `--c-tech-mid` / `--c-tech-soft` / `--c-grid` / `--c-grid-strong` | 背景の方眼・回路グラフィック（紺〜銀）系 |
| `--max` / `--gutter` | コンテナ最大幅・左右余白 |
| `--ease` | 標準イージング |

## 運用ルール

- 未確定事項を勝手に仮決めして実装しない。仕様・文言・価格等に関する疑問は [Notion](https://app.notion.com/p/3c0edf84e39e81149387d451475ce129?v=3c0edf84e39e8140a5be000c083a2aa4) または `docs/tasks.md` / `docs/content-plan.md` を確認し、不明な場合はユーザーに確認する
- 運用アカウント（GitHub組織 `Toukasonjuku-AI`、Render、Google Search Console、独自ドメイン等）の詳細は [README.md](README.md) §6 を参照
- お問い合わせ窓口: Email `toukasonjuku.ai@gmail.com` / Instagram [@toukasonjuku_ai](https://instagram.com/toukasonjuku_ai)
- QRコードのURLを変更した場合は `make_qr.py` 内の `URL` を書き換えて再実行する

## タスク管理・進捗記録（必須）

複数人（AI/人）が並行作業することを想定し、以下を徹底する:

- **タスクの正はNotion**（上記リンク）。ローカルには `docs/tasks.md` にミラーしている。Notionの内容が更新されたら、その都度ユーザーに要点を貼ってもらい `docs/tasks.md` へ反映する。作業前に `docs/tasks.md` を読み、対応・スコープ外のズレがないか確認する
- マルチページ化の詳細な構成・目的・スケジュールは `docs/content-plan.md` が正。実装が進んだら随時更新する

## git運用ルール（必須・2026-08-26確定）

- **AIが編集を行った作業単位（意味のあるまとまりが完了するたび）ごとに、確認を挟まず自動で `docs/worklog.md` の先頭にエントリを追記し、`git add` + `git commit` を実行する。**worklog追記とコミットは同じコミットに含める。書式は `docs/worklog.md` 冒頭のテンプレート通り（タスクID併記・証跡=コミットSHAと確認内容・次にやること）
- **push は自動化しない。** リモートへの反映（`git push`）は、その都度ユーザーに確認してから行う
- **`main` へのマージ・push は特に慎重に。** Render は現状ビルドコマンドなしでリポジトリのルートをそのまま配信している。もし **Renderのビルド設定（Build Command=`node build.js` / Publish Directory=`dist`）へ切り替える前** に、作業ブランチを `main` にマージ・pushすると、`docs/`（Notionの計画情報を含む）・`CLAUDE.md`・`build.js`・`src/` 配下のページ断片が `www.momoshita.jp/docs/tasks.md` のようなURLでそのまま一般公開されてしまう。**`main`へのマージは、Renderのビルド設定切り替えとセットで、かつユーザーの明示的な合意のもとで行うこと**
- 現在の作業ブランチは `feature/multipage-restructure`。マルチページ化が完成し、Render設定の切り替えも整うまでは `main` にマージしない
