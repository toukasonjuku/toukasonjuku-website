# 詳細ページ5枚の実装プロンプト（索引）

作成: 2026-09-29 ／ 2026-09-29に5枚へ分割

各ページ1枚ずつ、独立したプロンプトに分けてある。**新しいセッションに貼るときは、下の該当ファイル1枚だけでよい**（共通ルールは各ファイルに入っている）。

| 順番 | ページ | プロンプト | Notionタスク |
|---|---|---|---|
| 1 | `/philosophy/` 理念（Origin・MVVを含む） | [detail-page-1-philosophy.md](detail-page-1-philosophy.md) | 理念ページ(/philosophy)作成 |
| 2 | `/activities/` 活動内容 | [detail-page-2-activities.md](detail-page-2-activities.md) | 活動内容ページ(/activities)作成 |
| 3 | `/achievements/` 実績 | [detail-page-3-achievements.md](detail-page-3-achievements.md) | 実績ページ(/achievements)作成 |
| 4 | `/future/` 展望 | [detail-page-4-future.md](detail-page-4-future.md) | 展望ページ(/future)作成 |
| 5 | `/news/` お知らせ | [detail-page-5-news.md](detail-page-5-news.md) | お知らせページ新設 |

## 進め方
上から順に1ページずつ。**1ページ作るごとに報告し、りんのレビューを受けてから次に進む**（`AGENTS.md` のワークフロー）。

1枚目（理念）だけは、5ページ共通の部品（ページ先頭の見出し帯 `.page-hero`、アンカーの位置ずれ対策）も作るので、**必ず最初に実施する**。2枚目以降はその部品を使い回す。

## 2026-09-29にりんと決めた前提
- **詳細ページは5枚**。Origin と MVV は独立ページにせず `/philosophy/` の中のセクション（`#origin` / `#mvv`）にする
- **お知らせは一覧ページだけ**作る。記事を自動で並べる仕組み（`build.js` の拡張）は、実際の記事が出てきてから別タスクで
- **トップページの本文は今回は変えない**（5ページそろってから短くする）
- **各ページの先頭は、文字だけの見出し帯**（写真は敷かない）
- **記載内容は今のサイトの文章をそのまま使う**。まずはミニマムでよい
