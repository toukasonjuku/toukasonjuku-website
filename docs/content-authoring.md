# ページ執筆ルール・チェックリスト

マルチページ化で新しいページを追加するときの手順書。AIエージェントが1人で判断できるよう、迷いやすい点をここに集約している。全体の運用方針（自律範囲・承認が必要な操作）は [`AGENTS.md`](../AGENTS.md) を参照。

## 1ページ追加するときの手順

1. `docs/content-plan.md` の「ページ別コンテンツ構成」で、対象ページに何を書くべきか確認する
2. `src/pages/<page-name>/index.html` を新規作成する（トップページ以外は必ずフォルダ+`index.html`。理由は `docs/content-plan.md` の「URLスタイル」節を参照）
3. 先頭に `<!--meta ... -->` ブロックを書く（下記フォーマット参照）
4. 本文を執筆する。既存ページ（トップページ = `src/pages/index.html`）と文体・トーンを揃える
5. 画像・CSS・JSの参照は必ず `/images/...` `/style.css` のような**絶対パス**で書く（相対パスは禁止。フォルダの深さが変わっても壊れないようにするため）
6. `node build.js` を実行し、`dist/<page-name>/index.html` が生成されることを確認
7. ローカルサーバー（`python3 -m http.server 5173 --directory dist` 等）で見た目・リンク切れがないか確認
8. `docs/worklog.md` に追記し、ローカルコミットする
9. チャットで要点を報告する（`[要確認]` があれば必ず列挙する）

## metaブロックのフォーマット

```html
<!--meta
title: 桃下村塾（とうかそんじゅく）｜ ページ名
description: 検索結果に出る説明文。120字前後を目安に。
canonical: https://www.momoshita.jp/<page-path>/
ogTitle: SNSシェア時のタイトル（省略時はtitleを流用）
ogDescription: SNSシェア時の説明文（省略時はdescriptionを流用）
-->
```

- `title` / `description` / `canonical` は必須。`ogTitle` / `ogDescription` は省略可（省略時は自動でtitle/descriptionが使われる）
- `description` はページごとに固有の内容にする（SEO上、全ページ同じ文言にしない）
- `canonical` は末尾スラッシュ付きで統一する（例: `https://www.momoshita.jp/philosophy/`）

## 執筆時の必須ルール

- **事実関係（数字・固有名詞・日程・金額等）は `docs/content-plan.md` またはNotionに書かれている情報のみを使う。** 書かれていない・曖昧な部分を独自に埋めない。代わりに本文中に `[要確認: 何を確認したいか]` と明記し、レビュー時にまとめて確認する
- 既存トップページの文体（「〜である」調、体言止めの見出し等）を踏襲する
- 画像は `images/<page-name>/` 配下に配置する（`images/`のページ別サブフォルダ構成については `docs/content-plan.md` のアーキテクチャ決定を参照。再編がまだの場合は `docs/tasks.md` を確認する）
- ヘッダー・フッター・`<head>`共通部分（`src/partials/`）は、ページ本文の執筆では触らない。ナビ項目の追加・変更が必要な場合は別タスクとして扱う

## 1ページ完成ごとのレビュー運用

全ページを一括で下書きせず、**1ページ作成するごとに要点を報告し、軽いレビューを受けてから次のページに進む**（`AGENTS.md`のワークフロー参照）。報告時は以下を含める。

- 作成したページのURL・ファイルパス
- 本文の要約（何を書いたか）
- `[要確認]` の一覧（あれば）
- スクリーンショット等が有効な場合は状況に応じて共有する
