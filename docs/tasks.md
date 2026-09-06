# タスク管理(Notionのミラー)

**タスクの正は [Notion「桃下村塾」データベース内プロジェクトページ](https://app.notion.com/p/3c0edf84e39e81149387d451475ce129)**。
2026-08-26以降、Notion MCP（`mcp__claude_ai_Notion__*`）が接続済みで、AIが直接読み書きする。このファイルはClaude Codeが参照しやすいようにNotionの内容をローカルへミラーしたもの。**齟齬があればNotionを優先する。**

最終反映日: 2026-09-06（Notionの実際のタスク一覧をMCP経由で再確認・GitHub PATローテーション完了を反映）

---

## 進行中: マルチページ化移行

1ページ構成 → 5ページ＋お知らせページ構成への移行。詳細な構成・目的・スケジュールは [`content-plan.md`](content-plan.md) を参照。

- 理想完成: **2026-09-18**
- 最終期限: **2026-09-28**
- 体制: 基本的に一人（外交・りん）で運用
- 開発インターフェース: 2026-08-26以降、cmux経由のCLIベースClaude Codeに移行

### アーキテクチャ決定（2026-08-26・詳細は content-plan.md 参照）

- [x] ヘッダー/フッター/`<head>`共通部分の管理方式 → 軽量ビルドスクリプト（npm依存ゼロ）に決定
- [x] URLスタイル → フォルダ+`index.html`（クリーンURL）に決定。デプロイ後に動作確認が必要
- [x] `images/`構成 → ページ別サブフォルダへ再編することに決定

### Notionタスク一覧（データベース「桃下村塾」内、プロジェクトページの子アイテム）

| タスク（Notion） | ステータス | 備考 |
|---|---|---|
| 共通コンポーネント設計(グローバルナビ・フッター) | 進行中 | `src/partials/`(head/header/footer)+`build.js`で実装済み。ヘッダーナビの新URL対応は未着手 |
| トップページ(index)再構成 | 未着手 | `src/pages/index.html`へ移行済みだが中身は現行構成のまま。ダイジェスト形式への再構成は未着手 |
| 理念ページ(/philosophy)作成 | 未着手 | |
| 活動内容ページ(/activities)作成 | 未着手 | |
| 実績ページ(/achievements)作成 | 未着手 | |
| 展望ページ(/vision)作成 | 未着手 | |
| Contactセクション(共通フッター)実装 | 未着手 | `footer.html`切り出し済み、内容は現行のまま |
| お知らせページ新設 | 未着手 | |
| 画像・写真素材の整理(各ページ用) | 未着手 | ページ別サブフォルダへの再編方針は決定済み（`content-plan.md`参照） |
| sitemap.xml / SEO設定のマルチページ対応 | 未着手 | |
| Render上での動作確認・デプロイ | 未着手 | ★`main`マージ前に必ずBuild Command/Publish Directory切替が必要（下記参照） |
| 公開前最終チェック | 未着手 | |
| GitHub PAT（個人アクセストークン）のローテーション | 完了 | 2026-08-26追加、2026-09-06完了確認。Notion本文のトークン記載は削除済み、パスワードマネージャー管理に移行済み |

> ステータスの更新・新規タスクの追加は `AGENTS.md` の「ネクストアクション運用」に従う（提案→承認→Notion記録→実行のサイクル）。

### 基盤づくり（実装済み）

- [x] `src/partials/`（head.html / header.html / footer.html）を現行 `index.html` から切り出す（2026-08-26）
- [x] `build.js`（partials結合＋静的アセットコピーの最小ロジック）を作成（2026-08-26・npm依存ゼロ）
- [x] `package.json` 作成（devDependenciesゼロ、`scripts.build`のみ）（2026-08-26）
- [x] トップページ1枚を `src/pages/index.html` に移し、`node build.js` でローカル動作確認（2026-08-26・元の`index.html`と空白差異を除き完全一致することを自動diffで確認済み。ルート直下の本番用`index.html`/`style.css`/`script.js`は未変更で本番デプロイに影響なし）
- [x] `docs/content-authoring.md`（ページ追加・編集ルール）を新設（2026-08-26）
- [x] `AGENTS.md` を新設し `CLAUDE.md` から参照（2026-08-26・AIの自律範囲/承認ルール/git運用ルール/タスク管理方針・ネクストアクション運用を集約）
- [x] `main`へのpushを技術的にブロックするhookを設定（2026-08-26・`.claude/settings.json`。※セッション再起動後の実発火は未検証）

### 本番反映（要事前確認・本番影響あり）

- [ ] Render Dashboardの Build Command / Publish Directory 変更（`node build.js` / `dist`）
- [ ] **上記の切り替え前に `feature/multipage-restructure` を `main` にマージ・pushしない。**現状Renderはビルドコマンドなしでリポジトリのルートをそのまま配信しているため、切り替え前にマージすると `docs/`（Notion計画情報含む）・`CLAUDE.md`・`AGENTS.md`・`build.js`・`src/`配下が一般公開URLでそのまま閲覧可能になってしまう
- [ ] `main` へのマージ・push（Render設定切り替えとセットで、ユーザーの明示的な合意のもとで実施）
- [ ] デプロイ後、クリーンURLが自動で機能するか実機確認。動かなければリライトルール追加

---

## 完了済み（参考）

- サイト公開・独自ドメイン接続（www.momoshita.jp）
- SEO基盤: Google Search Console登録、sitemap.xml送信、OGP/Twitter Card/JSON-LD記述
- QRコード生成スクリプト（`make_qr.py`）整備
