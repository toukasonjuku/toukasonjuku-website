# 詳細ページ7枚の実装プロンプト（索引）

作成: 2026-09-29 ／ 2026-09-30にOrigin・MVVを独立ページへ分離して7枚に改訂

各ページ1枚ずつ、独立したプロンプトに分けてある。**新しいセッションに貼るときは、下の該当ファイル1枚だけでよい**（共通ルールは各ファイルに入っている）。

| 順番 | ページ | プロンプト | Notionタスク | 状況 |
|---|---|---|---|---|
| 1 | `/philosophy/` 理念 | [detail-page-1-philosophy.md](detail-page-1-philosophy.md) | 理念ページ(/philosophy)作成 | 実装済み・レビュー待ち |
| 2 | `/origin/` 成り立ち | [detail-page-2-origin.md](detail-page-2-origin.md) | 成り立ちページ(/origin)作成 | 実装済み・レビュー待ち |
| 3 | `/mvv/` MVV | [detail-page-3-mvv.md](detail-page-3-mvv.md) | MVVページ(/mvv)作成 | 実装済み・レビュー待ち |
| 4 | `/activities/` 活動内容 | [detail-page-4-activities.md](detail-page-4-activities.md) | 活動内容ページ(/activities)作成 | 下書きあり（未レビュー） |
| 5 | `/achievements/` 実績 | [detail-page-5-achievements.md](detail-page-5-achievements.md) | 実績ページ(/achievements)作成 | 下書きあり（未レビュー） |
| 6 | `/future/` 展望 | [detail-page-6-future.md](detail-page-6-future.md) | 展望ページ(/future)作成 | 未着手 |
| 7 | `/news/` お知らせ | [detail-page-7-news.md](detail-page-7-news.md) | お知らせページ新設 | 下書きあり（未レビュー） |

## 進め方
上から順に1ページずつ。**1ページ作るごとに報告し、りんのレビューを受けてから次に進む**（`AGENTS.md` のワークフロー）。

7ページ共通の部品（ページ先頭の見出し帯 `.page-hero`、パンくず、アンカーの位置ずれ対策、詳細ページでヘッダーを最初から白背景にする指定）は1枚目で作成済み。**2枚目以降はそれを使い回すだけで、CSSは追加しない。**

## 前提（2026-09-30 時点）
- **詳細ページは7枚**。ヘッダー・フッターのメニュー項目（Philosophy / Origin / MVV / Activities / Achievements / Future / News）と1対1で対応する
- **1ページには1つのテーマだけを書く。**（2026-09-30にりんの指示で変更。それまでは Origin と MVV を `/philosophy/` の中のセクション `#origin` / `#mvv` にする方針だった）
- **Mission・Vision・Value は「MVV」で1ページ**。メニュー項目が「MVV」1つのため、バリューを別ページには分けない
- **お知らせは一覧ページだけ**作る。記事を自動で並べる仕組み（`build.js` の拡張）は、実際の記事が出てきてから別タスクで
- **トップページの本文は今回は変えない**（全ページそろってから短くする）
- **各ページの先頭は、文字だけの見出し帯**（写真は敷かない）
- **記載内容は今のサイトの文章をそのまま使う**。まずはミニマムでよい
