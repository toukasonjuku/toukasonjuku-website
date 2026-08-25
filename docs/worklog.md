# 作業ログ

コミット（`c`/`cp`）のたびに、**このファイルの先頭**に新しいエントリを追記する。worklog追記とコミットは同じコミットに含めること（追記漏れのままpushしない）。

## テンプレート

```
### YYYY-MM-DD 作業概要（関連タスク: docs/tasks.md の該当項目）
- 内容: 何をしたか
- コミット: `<git short SHA>`
- 確認: 動作確認・検証した内容（自動テストが無いプロジェクトのため、ローカルサーバーでの目視確認が基本）
- 次にやること: あれば
```

---

### 2026-08-26 git運用ルールを確定し、本番反映時の注意点をtasks.mdに追記（関連タスク: docs/tasks.md「本番反映」）
- 内容: AIによる編集は作業単位ごとにローカルコミットまで自動化することをCLAUDE.mdに明記（push・mainへのマージはユーザー確認必須のまま）。あわせて、Renderのビルド設定（`dist`配信）へ切り替える前に`main`へマージするとdocs/等が一般公開されてしまうリスクをCLAUDE.mdとdocs/tasks.mdの両方に明記
- コミット: 本コミット
- 確認: ドキュメントの追記のみのため動作確認は不要
- 次にやること: 残り5ページの実装、Render設定切り替えとmainマージ（ユーザー合意の上で）

### 2026-08-26 CLAUDE.md/docsの復元とマルチページ化ビルドスクリプト基盤を構築（関連タスク: docs/tasks.md「基盤づくり」）
- 内容: 環境になかった`CLAUDE.md`と`docs/`（tasks.md/content-plan.md/worklog.md）を復元。加えて`src/partials/`（head.html/header.html/footer.html）を現行`index.html`から切り出し、npm依存ゼロの`build.js`とテスト用`package.json`を新設。トップページのみ`src/pages/index.html`に移してビルドを実行し、`dist/`を生成
- コミット: 本コミット
- 確認: `node build.js`が正常終了し`dist/`に想定通りのファイル一式が生成されることを確認。`python3 -m http.server`でdist/を配信し、`index.html`/`style.css`/`script.js`/画像/faviconが200で返ることを確認。さらに元の`index.html`とdist/index.htmlをPythonスクリプトで正規化diffし、意図した変更（`images/`→`/images/`、header/footer内のnavアンカーに`/`プレフィックス付与）以外に差分がないことを確認。ルート直下の本番用`index.html`/`style.css`/`script.js`は未変更のため本番デプロイへの影響なし
- 次にやること: `docs/content-authoring.md`と`AGENTS.md`の新設、残り5ページ（philosophy/activities/achievements/vision/news）の`src/pages/`への追加、`images/`のページ別サブフォルダ再編
