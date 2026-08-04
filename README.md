# 桃下村塾 ／ TOUKA SONJUKU 公式サイト

岡山から、社会を変革する人材を育てる学生団体「桃下村塾」の公式Webサイト一式です。

- **公開URL**: https://www.momoshita.jp
- **GitHub**: https://github.com/Toukasonjuku-AI/toukasonjuku-website
- **ホスティング**: Render（Static Site・無料プラン）

---

## 1. これは何か

HTML / CSS / JavaScript だけで作られた1ページ構成のサイトです。
React などのフレームワークやビルド作業（npm など）は**一切不要**。ファイルを編集して GitHub に push するだけで、Render が自動で本番サイトを更新します。

---

## 2. ファイル構成

```
.
├── index.html          ← ページ本体（文章・写真の指定は全部ここ）
├── style.css           ← デザイン（色・文字サイズ・レイアウト）
├── script.js           ← メニュー開閉、スクロール時の動きなど
├── images/             ← サイトで使う写真・ロゴ・図解
├── qr/                 ← サイトのQRコード（qr-logo.png / qr-plain.png）
├── make_qr.py          ← QRコードを再生成するスクリプト
├── favicon.png 他      ← ブラウザのタブに出る桃アイコン
├── robots.txt          ← 検索エンジン向けの案内
├── sitemap.xml         ← 検索エンジン向けのページ一覧
└── README.md           ← このファイル
```

### ページの構成（index.html の中の順番）

1. Hero（トップの大きい写真とキャッチコピー）
2. Philosophy（理念）＋ 図解2枚
3. Origin（成り立ち）
4. Mission / Vision
5. Values（5つのバリュー）
6. Activities（活動内容）
7. Achievements（実績5件）
8. Future（今後の展望）
9. Contact（Email / Instagram）

---

## 3. ローカルで確認する方法

このフォルダを開いた状態で、ターミナル（コマンドプロンプト）で以下を実行します。

```bash
py -m http.server 5173
```

その後ブラウザで `http://localhost:5173/` を開くと、編集中のサイトが見られます。
※ `index.html` をダブルクリックで直接開いてもだいたい見られますが、簡易サーバー経由のほうが本番に近い表示になります。

---

## 4. 変更を本番サイトに反映する方法

```bash
git add -A
git commit -m "変更内容のメモ"
git push
```

push すると Render が自動で検知し、**1〜2分で https://www.momoshita.jp に反映**されます。特別なデプロイ作業は不要です。

---

## 5. よくある編集作業

### 文章を変えたい
`index.html` の該当箇所を書き換えるだけです。

### 写真を差し替えたい
1. 新しい写真を `images/` フォルダに入れる
2. `index.html` の `<img src="images/○○.jpg">` の部分を新しいファイル名に変更

**注意**: 同じファイル名のまま中身だけ差し替えると、ブラウザが古い写真をキャッシュして表示し続けることがあります。その場合は `index.html` 側で `images/○○.jpg?v=2` のように末尾に `?v=2`（数字は変えるたびに増やす）を付けると、確実に新しい写真が表示されます。

### 色やデザインを変えたい
`style.css` の冒頭にある `:root { }` の中で、サイト全体の色をまとめて管理しています。

| 変数名 | 用途 |
|---|---|
| `--c-peach` / `--c-peach-dk` | 桃ピンクのアクセント色 |
| `--c-deep` | 見出しなどの濃い文字色 |
| `--c-tech` / `--c-tech-mid` | 背景の方眼・回路グラフィックの紺色 |

CSSを編集したときは、`index.html` の `<link rel="stylesheet" href="style.css?v=20260717">` の数字（日付）を更新すると、閲覧者に確実に新しいデザインが反映されます。

---

## 6. 運用まわりのアカウント情報

| サービス | 用途 | アカウント |
|---|---|---|
| GitHub | ソースコード管理 | Toukasonjuku-AI（団体アカウント） |
| Render | サイトの公開・自動デプロイ | 同上のGitHubアカウントで連携 |
| Google Search Console | 検索結果の管理・順位確認 | 登録済み（sitemap送信済み） |
| 独自ドメイン | www.momoshita.jp | 取得済み・Renderに接続済み |

### SEOについて
`index.html` の `<head>` 内に、検索結果に出るタイトル・説明文、SNSでシェアしたときのサムネイル設定（OGP）、構造化データ（JSON-LD）が入っています。文章を大きく変えたときは、ここも合わせて更新すると検索結果の表示も揃います。

---

## 7. QRコードについて

`qr/` フォルダに、サイトへアクセスできるQRコードが2種類入っています。

- `qr-logo.png` … 中央に桃ロゴ入り（チラシ・ポスター向け）
- `qr-plain.png` … シンプルな黒のみ（小さく印刷する場合向け）

どちらもスキャン動作確認済みです。印刷するときは**2cm四方以上**を目安にしてください。
URLが変わった場合は `make_qr.py` の中の `URL` を書き換えて実行すれば作り直せます（`pip install qrcode pillow` が必要）。

---

## 8. お問い合わせ

- Email: toukasonjuku.ai@gmail.com
- Instagram: [@toukasonjuku_ai](https://instagram.com/toukasonjuku_ai)
