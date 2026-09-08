# マルチページ化 計画書

出典: [Notion](https://app.notion.com/p/3c0edf84e39e81149387d451475ce129?v=3c0edf84e39e8140a5be000c083a2aa4)（非公開・WebFetch不可のため、ユーザーが貼った内容をこのファイルへ反映している）
最終反映日: 2026-08-26

## 現状

- 公開済み。1ページ構成（`index.html` / `style.css` / `script.js`）、フレームワークなしの素のHTML/CSS/JS
- ホスティング: Render（Static Site・無料プラン）、GitHub pushで自動デプロイ
- ドメイン: 独自ドメイン www.momoshita.jp（Render接続済み）
- SEO: Google Search Console登録済み、sitemap.xml登録済み、OGP/Twitter Card/JSON-LD記述済み
- 補助: QRコード生成用Pythonスクリプト（`make_qr.py`）あり

## 方針

- デザイン（トンマナ・配色・フォント等）はそのまま維持し、**1ページ構成 → マルチページ構成へ構造変更**
- 参考サイト: https://www.chimyaku.com/

### URL構成

| パス | 内容 |
|---|---|
| `/` | トップ |
| `/philosophy` | 理念 |
| `/activities` | 活動内容 |
| `/achievements` | 実績 |
| `/vision` | 展望 |
| （新設）お知らせページ | 随時更新できるお知らせ一覧 |
| Contact | 全ページ共通フッター（`#contact`）。トップページ末尾にもセクションとして残す |

## ページ別コンテンツ構成

- **トップページ**: ビジュアルベース＋各ページのダイジェスト（写真＋一言＋詳しく見るリンク）
- **理念ページ**: 成り立ち／Mission・Vision／5つのバリュー（現行の3セクションを統合）
- **活動内容ページ**: 定例会／ももした道場ビジネス／ももした道場テック／遊びイベント／各役職紹介
- **実績ページ**: 協生農法／サークルコラボ／小寺先生ワークショップ／IT企業交流会
- **展望ページ**: OCS／高校出張／スポンサーお願い
- **コンタクト**: 全ページ共通フッター＋トップページ末尾にもセクション

## 目的・効果

- **SEO**: ページ単位のキーワード最適化（「岡山 学生団体 AI」等）
- **情報量拡張**: 各ページで写真・実績詳細を増やしても重くならない
- **回遊性**: トップの要約→詳細ページの導線を明確化
- **初回表示の高速化**: トップページの読み込み量削減

## ターゲット・体制・スケジュール

- **ターゲット**: 大学生・高校生・岡山県内企業など
- **体制**: 基本的に一人（外交・りん）で運用
- **スケジュール**: 理想 **2026-09-18** 完成、最終期限 **2026-09-28**

## 参考リンク

- 現サイト: https://www.momoshita.jp/
- GitHub: https://github.com/Toukasonjuku-AI/toukasonjuku-website

---

## アーキテクチャ決定（2026-08-26）

マルチページ化にあたり、以下の技術的な構成方針を決定した。判断材料として [chimyaku.com](https://www.chimyaku.com/)（トップのアンカーセクション＋詳細独立ページというハイブリッド構成）と、参考ディレクトリ `/Users/moriokarin/kensetsudx-platform`（CLAUDE.md/AGENTS.md併記、docsのトピック別分割などAI開発向けの型）を調査した。

### 1. ヘッダー・フッター・`<head>`共通部分の管理方法 → **軽量ビルドスクリプト方式**

現行 `index.html` はヘッダー約40行・フッター約28行・`<head>`のSEO/OGP/JSON-LD約80行を含み、これをそのまま6ページに複製すると変更のたびに全ファイル手動同期が必要になり、AIによる編集ミス（一部だけ直して同期漏れ）のリスクが高い。

- npm依存ゼロ・Node標準機能のみの `build.js` を新設し、`src/partials/`（head/header/footer）と `src/pages/`（各ページの本文）を結合して `dist/` に静的HTMLを生成する
- 11ty等の本格的な静的サイトジェネレータは、このサイト規模・非エンジニア引き継ぎ前提に対して過剰と判断し不採用
- 完全buildless（コピペで複製）も、AI主体の開発では同期漏れリスクが高いため不採用
- Render側の設定変更: Build Command = `node build.js`、Publish Directory = `dist`（実装完了後、pushする前に必ずユーザーに確認してから変更する）

### 2. URLスタイル → **フォルダ + `index.html`（クリーンURL）。デプロイ後に動作確認**

`/philosophy/` のようなクリーンURLを採用する。Render公式ドキュメントでは「フォルダ配下の`index.html`がクリーンURLで自動的に返るか」は明記されていなかったが、一般的な静的ホスティングの標準動作である可能性が高いと判断。フォルダ+index.html構成にしておけば、自動で動けばそのまま、動かなくてもRender Dashboardでリライトルールを追加するだけで対応できる。

- 実装後、デプロイして実際に1URL（例: `/philosophy/`）でブラウザ動作確認する
- 動かない場合はRender Dashboardでパスごとにリライトルールを追加する

### 3. `images/`フォルダの構成 → **ページ別サブフォルダに再編**

現状はフラットな一覧＋接頭辞命名（`ach-*.jpg`, `activity-*.jpg`, `phil-*.png` 等）。マルチページ化後は `images/shared/` `images/top/` `images/philosophy/` `images/activities/` `images/achievements/` `images/vision/` `images/news/` のようにページ別サブフォルダへ再編する。AIがどのページの画像かを迷わず配置・参照できるようにするため。

### 4. 更新頻度によるページ設計方針（2026-09-08決定）

このサイトはデータベース・CMSを持たない完全静的サイトである。「更新のしやすさ」はページ構造ではなく、**運用の頻度で情報の置き場所を使い分ける**方針とする。

| ページ | 更新頻度 | 役割 |
|---|---|---|
| `/activities`（活動内容） | 月1くらい | 団体の活動を示す「まとめページ」（ダイジェスト） |
| `/achievements`（実績） | 月1くらい | 団体の実績を示す「まとめページ」（ダイジェスト） |
| `/news`（お知らせ） | 随時 | 個別の出来事を都度追記する「速報」 |

頻繁に発生するネタ（イベント開催報告、コラボの告知など）は基本的に `/news` へ流し込み、`/activities` と `/achievements` はそれを定期的に取捨選択して反映する「ダイジェスト側」という役割分担にする。

**`/news` の設計：個別記事ページ＋自動生成の一覧**。一覧のみ（1ファイルへの追記形式）ではなく、記事ごとに1ファイルを作り、一覧ページは `build.js` が自動生成する方式を採用する。理由は、マルチページ化の目的である「ページ単位のSEOキーワード最適化」に直結するため（個別記事なら「瀬戸高校 出前授業」のような固有名詞で検索にヒットしうる、SNS共有時のOGPも記事ごとに出せる）。

想定ディレクトリ構成（イメージ）:

```
src/
  content/news/
    2026-09-08-seto-koko.html      ← 新しい記事＝新しいファイル1つ
    2026-08-20-collab-event.html
  partials/news-article.html        ← 記事ページ共通の型
  pages/news.html                   ← 一覧ページの型（中身は自動生成）
build.js                            ← content/news配下を読み、
                                        ①個別ページをdist/news/配下に出力
                                        ②一覧ページに自動で並べる
```

個別記事のURL形（`/news/<slug>/` にするか `/news/<ファイル名>.html` にするか等）は未確定。`build.js` 実装時に決める。実装（`build.js` の拡張・`news-article.html` テンプレート作成）は別フェーズで着手する。着手時は `docs/tasks.md` のスコープを更新すること。

### 決定を反映した想定ディレクトリ構成

```
.
├── CLAUDE.md
├── AGENTS.md                    ← 新設予定：AI向け運用ガイド（CLAUDE.mdから@AGENTS.mdで参照）
├── README.md
├── build.js                     ← 新設予定：npm依存ゼロのビルドスクリプト
├── package.json                 ← 新設予定：devDependenciesゼロ、"scripts": { "build": "node build.js" } のみ
├── docs/
│   ├── tasks.md
│   ├── content-plan.md（本ファイル）
│   ├── worklog.md
│   └── content-authoring.md     ← 新設予定：ページ追加・編集ルール集
├── src/
│   ├── partials/
│   │   ├── head.html
│   │   ├── header.html
│   │   ├── footer.html
│   │   └── news-article.html    ← お知らせ記事ページ共通の型（4節参照）
│   ├── content/
│   │   └── news/                ← お知らせ記事1件＝1ファイル（4節参照）
│   ├── pages/
│   │   ├── index.html
│   │   ├── philosophy/index.html
│   │   ├── activities/index.html
│   │   ├── achievements/index.html
│   │   ├── vision/index.html
│   │   └── news.html            ← 一覧ページの型（中身はbuild.jsが自動生成）
│   ├── style.css
│   └── script.js
├── images/
│   ├── shared/ / top/ / philosophy/ / activities/ / achievements/ / vision/ / news/
├── qr/
├── make_qr.py
├── robots.txt
├── sitemap.xml
└── dist/                         ← ビルド生成物（.gitignore対象／Renderのpublish directoryに指定）
```

実装（partials切り出し・build.js作成・images再編）は別フェーズで着手する。着手時は `docs/tasks.md` のスコープを更新すること。

---

Notion側の内容が更新された場合は、その都度ユーザーに貼ってもらい、このファイルへ反映すること。齟齬が生じた場合はNotionを正とする。
