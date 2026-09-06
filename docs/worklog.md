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

### 2026-09-06 GitHub PATローテーションタスクの完了確認・全タスクのNotion再照合（関連タスク: docs/tasks.md「GitHub PAT（個人アクセストークン）のローテーション」）
- 内容: ユーザーからNotionプロジェクトページの学習を依頼され、プロジェクト本体＋子タスク14件を全件notion-fetchで再確認。その過程でPAT対応状況をユーザーに問われ、プロジェクトページ本文を確認したところ平文トークン記載は既に削除され「トークン文字列はパスワードマネージャーで管理」に変更済みと判明。ユーザー承認のもと、Notion側タスクのステータスを「未着手」→「完了」に更新し完了確認コメントを追記、`docs/tasks.md`の該当行と最終反映日も更新。他13タスクはステータス変化なし（実装は基盤のみで5ページの本文は未着手のまま）
- コミット: 本コミット
- 確認: notion-fetchでプロジェクトページ本文・PATタスクページ双方を再取得し記載内容を目視確認。Notion側のupdate_properties/insert_contentはエラーなく成功
- 次にやること: 残り5ページ（理念/活動内容/実績/展望/お知らせ）の実装着手の優先順位をユーザーに確認

---

### 2026-09-06 Notion運用ルール（何を書くか）をAGENTS.mdに追記（関連タスク: なし・運用改善）
- 内容: 2つの異なるAIセッション（VSCode拡張版・cmux CLI版）が同じNotionプロジェクトページに、それぞれAGENTS.md/CLAUDE.mdの内容を丸ごと転記した大きな要約ブロックを追記していたことが発覚（結果、片方の「次のアクション」がもう片方の作業により既に解決済みという矛盾が発生）。再発防止のため、AGENTS.mdの「タスク管理」節に、Notionに書いてよい情報（概要・決定理由・タスクステータス・要フォローアップ項目）と書かない情報（実装詳細・ファイル一覧等、gitで管理されているものの転記）の切り分け、および「大きな要約を書く前にまずページ全体を読み既存記述を更新する」ルールを追記。Notion側には一切変更を加えていない（ユーザーの明示的な指示により今回は分析・ルール追加のみ）
- コミット: 本コミット
- 確認: ドキュメントの追記のみのため動作確認は不要
- 次にやること: ユーザーの意向次第でNotion側の重複ブロックの整理に着手

---

### 2026-08-26 CLIベース移行の引き継ぎをNotionに反映・タスク管理をNotion直接読み書きへ移行（関連タスク: 全般）
- 内容: 開発インターフェースをcmux経由のCLIベースClaude Codeへ移行するにあたり、Notion MCP経由で「桃下村塾」データベースの実際のタスク一覧（12件）を取得。(1) AGENTS.mdに「ネクストアクション運用（提案→承認→記録→実行のサイクル）」節を追加し、タスク管理節をNotion直接読み書き前提に更新、(2) CLAUDE.mdのGitHubリンクを実際のリモート（`toukasonjuku/toukasonjuku-website`、旧「Toukasonjuku-AI」表記は誤りだった）に修正しNotion記述も更新、(3) docs/tasks.mdをNotionの実際のタスク一覧に合わせて全面書き換え、(4) Notion側に「CLIベース移行 引き継ぎ資料」ページと「GitHub PATのローテーション」タスクを新規作成、既存タスク4件（共通コンポーネント設計/トップページ再構成/画像整理/Render動作確認）に進捗コメントを追記、プロジェクト本体ページにも引き継ぎセクションを追記
- コミット: 本コミット
- 確認: `git remote -v`で実際のリモートURLを確認。Notion側の全12タスク+新規作成2件+更新6ページの反映内容をnotion-fetchで再確認はしていないが、各update呼び出しはエラーなく成功
- 次にやること: GitHub PATのローテーション（りん対応待ち）、main pushブロックhookの動作確認（セッション再起動後）、残り5ページの実装

---

### 2026-08-26 AGENTS.mdの誤った人名記載を修正（関連タスク: なし・品質修正）
- 内容: AGENTS.mdに「人間（河合）」という実在しない名前を根拠なく記載していたのをユーザーに指摘され修正。「人間（プロジェクトオーナー）」のように役割名のみに変更し、特定の人名を推測・記載しないようにした
- コミット: 本コミット
- 確認: `grep -rn "河合"` でリポジトリ全体に該当箇所が残っていないことを確認
- 次にやること: 残り5ページの実装に着手

---

### 2026-08-26 AGENTS.md新設・content-authoring.md整備・main push技術ブロックhook追加（関連タスク: docs/tasks.md「基盤づくり」）
- 内容: 実装をほぼAIに任せ人間は方針決定・承認に集中する体制のため、(1) `AGENTS.md`新設（役割分担・自律範囲/承認必須操作・ページ追加ワークフロー・git運用ルール・タスク管理方針を集約、CLAUDE.mdから`@AGENTS.md`で読込）、(2) `CLAUDE.md`の重複ガバナンス記述をAGENTS.mdへ集約しファイル構成表を更新、(3) `docs/content-authoring.md`新設（ページ執筆手順・metaブロック書式・「事実不明点は`[要確認]`と明記」ルール・1ページごとレビューの運用）、(4) `.claude/hooks/block-main-push.sh`+`.claude/settings.json`のPreToolUse(Bash)フックで、mainブランチへの`git push`を技術的にもブロック（main以外のpushやpull/fetch/commit等は対象外）
- コミット: 本コミット
- 確認: フックスクリプトを単体でパイプテストし、`git push origin main`/`git push -u origin main`/`git push origin HEAD:main`/(mainブランチにcheckoutした状態での)`git push`・`git push origin`はブロック、`git push origin feature/multipage-restructure`・`git push origin main-backup`・`git pull`・`git commit`・(featureブランチでの)`git push`はブロックされないことを確認。`jq -e`でsettings.jsonの構文・スキーマ形状を検証済み。ただしこのセッション開始時に`.claude/`が存在しなかったため設定ウォッチャーが未検知で、実際にBashツール経由でフックが発火するかは本セッション内で確認できず（センチネルログで確認試行し不発火を確認）。ユーザーに`/hooks`実行またはセッション再起動を依頼済み
- 次にやること: ユーザーがセッション再起動/`/hooks`実行後、実際に`git push`でフックが発火するか再確認する。その後、残り5ページの実装に着手

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
