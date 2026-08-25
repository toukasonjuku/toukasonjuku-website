# タスク管理(Notionのミラー)

**タスクの正は [Notion](https://app.notion.com/p/3c0edf84e39e81149387d451475ce129?v=3c0edf84e39e8140a5be000c083a2aa4)**。
このファイルはClaude Codeが参照しやすいようにNotionの内容をローカルへミラーしたもの。Notion側が非公開でWebFetch不可のため、内容が更新されたらユーザーに貼ってもらい、その都度このファイルを更新する。**齟齬があればNotionを優先する。**

最終反映日: 2026-08-26

---

## 進行中: マルチページ化移行

1ページ構成 → 5ページ＋お知らせページ構成への移行。詳細な構成・目的・スケジュールは [`content-plan.md`](content-plan.md) を参照。

- 理想完成: **2026-09-18**
- 最終期限: **2026-09-28**
- 体制: 基本的に一人（外交・りん）で運用

### アーキテクチャ決定（2026-08-26・詳細は content-plan.md 参照）

- [x] ヘッダー/フッター/`<head>`共通部分の管理方式 → 軽量ビルドスクリプト（npm依存ゼロ）に決定
- [x] URLスタイル → フォルダ+`index.html`（クリーンURL）に決定。デプロイ後に動作確認が必要
- [x] `images/`構成 → ページ別サブフォルダへ再編することに決定

### スコープ（着手前の作業洗い出し）

**基盤づくり**
- [x] `src/partials/`（head.html / header.html / footer.html）を現行 `index.html` から切り出す（2026-08-26）
- [x] `build.js`（partials結合＋静的アセットコピーの最小ロジック）を作成（2026-08-26・npm依存ゼロ）
- [x] `package.json` 作成（devDependenciesゼロ、`scripts.build`のみ）（2026-08-26）
- [x] トップページ1枚を `src/pages/index.html` に移し、`node build.js` でローカル動作確認（2026-08-26・元の`index.html`と空白差異を除き完全一致することを自動diffで確認済み。ルート直下の本番用`index.html`/`style.css`/`script.js`は未変更で本番デプロイに影響なし）
- [ ] `docs/content-authoring.md`（ページ追加・編集ルール）を新設
- [ ] `AGENTS.md` を新設し `CLAUDE.md` から参照

**コンテンツ実装**
- [ ] お知らせページの新設（随時更新できる構造）
- [ ] 全ページ共通フッターへのContact集約（`#contact`）
- [ ] トップページ: 各ページへのダイジェスト（写真＋一言＋詳しく見るリンク）への再構成
- [ ] 理念ページ: 成り立ち／Mission・Vision／5つのバリューの統合
- [ ] 活動内容ページ: 定例会／ももした道場ビジネス／ももした道場テック／遊びイベント／各役職紹介
- [ ] 実績ページ: 協生農法／サークルコラボ／小寺先生ワークショップ／IT企業交流会
- [ ] 展望ページ: OCS／高校出張／スポンサーお願い
- [ ] `images/` のページ別サブフォルダへの再編
- [ ] ページ単位のSEO再設定（title/description/OGP/JSON-LD、`sitemap.xml`更新）
- [ ] ヘッダーナビ（PC/モバイル）の新URL対応

**本番反映（要事前確認・本番影響あり）**
- [ ] Render Dashboardの Build Command / Publish Directory 変更（`node build.js` / `dist`）
- [ ] **上記の切り替え前に `feature/multipage-restructure` を `main` にマージ・pushしない。**現状Renderはビルドコマンドなしでリポジトリのルートをそのまま配信しているため、切り替え前にマージすると `docs/`（Notion計画情報含む）・`CLAUDE.md`・`build.js`・`src/`配下が一般公開URLでそのまま閲覧可能になってしまう
- [ ] `main` へのマージ・push（Render設定切り替えとセットで、ユーザーの明示的な合意のもとで実施）
- [ ] デプロイ後、クリーンURLが自動で機能するか実機確認。動かなければリライトルール追加
- [ ] `index.html` 単一ファイル構成に関する運用ドキュメント更新（CLAUDE.md / README.md）

> このリストはNotionの計画書＋今回のアーキテクチャ検討を元にした作業スコープの洗い出しであり、Notion上の正式なタスクIDやステータスとは紐付いていない。実装着手時にNotionの最新状況を確認し、必要なら本ファイルを更新すること。

---

## 完了済み（参考）

- サイト公開・独自ドメイン接続（www.momoshita.jp）
- SEO基盤: Google Search Console登録、sitemap.xml送信、OGP/Twitter Card/JSON-LD記述
- QRコード生成スクリプト（`make_qr.py`）整備
