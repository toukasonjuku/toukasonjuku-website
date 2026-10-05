// 桃下村塾サイト ビルドスクリプト
//
// src/pages/**/index.html（本文のみ）に src/partials/head.html・header.html・footer.html を
// 差し込んで、完成した静的HTMLを dist/ に生成する。npm依存なし・Node標準機能のみで動く。
//
// 使い方: node build.js

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const SRC_PAGES = path.join(ROOT, "src", "pages");
const PARTIALS = path.join(ROOT, "src", "partials");
const DIST = path.join(ROOT, "dist");

// dist/ をクリーンな状態から作り直す
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

const headTemplate = fs.readFileSync(path.join(PARTIALS, "head.html"), "utf8");
const headerHtml = fs.readFileSync(path.join(PARTIALS, "header.html"), "utf8");
const footerHtml = fs.readFileSync(path.join(PARTIALS, "footer.html"), "utf8");

// src/pages/**/index.html を再帰的に列挙する
function findPages(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findPages(full));
    } else if (entry.isFile() && entry.name === "index.html") {
      results.push(full);
    }
  }
  return results;
}

// ページ先頭の <!--meta ... --> ブロックを key: value として読み取る
function parseMeta(raw) {
  const match = raw.match(/^<!--meta\r?\n([\s\S]*?)-->\r?\n?/);
  if (!match) {
    throw new Error("ページ先頭に <!--meta ... --> ブロックが見つかりません");
  }
  const meta = {};
  for (const line of match[1].split("\n")) {
    if (!line.trim()) continue;
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  const body = raw.slice(match[0].length);
  return { meta, body };
}

function fillTemplate(template, values) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (!(key in values)) {
      throw new Error(`テンプレート変数 {{${key}}} に対応する値がありません`);
    }
    return values[key];
  });
}

// --- ページのビルド ---
const pageFiles = findPages(SRC_PAGES);
if (pageFiles.length === 0) {
  throw new Error(`src/pages 配下に index.html が見つかりません: ${SRC_PAGES}`);
}

for (const pageFile of pageFiles) {
  const raw = fs.readFileSync(pageFile, "utf8");
  const { meta, body } = parseMeta(raw);

  const head = fillTemplate(headTemplate, {
    TITLE: meta.title || "",
    DESCRIPTION: meta.description || "",
    CANONICAL: meta.canonical || "",
    OG_TITLE: meta.ogTitle || meta.title || "",
    OG_DESCRIPTION: meta.ogDescription || meta.description || "",
  });

  const html = `<!DOCTYPE html>
<html lang="ja">
<head>
${head}
</head>
<body>

${headerHtml}
${body}
${footerHtml}
<script src="/script.js?v=20261005e"></script>
</body>
</html>
`;

  const relDir = path.relative(SRC_PAGES, path.dirname(pageFile));
  const outDir = path.join(DIST, relDir);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
  console.log(`build: ${path.join(relDir, "index.html").replace(/^\.\//, "") || "index.html"}`);
}

// --- 静的アセットのコピー ---
const staticCopies = [
  ["src/style.css", "style.css"],
  ["src/script.js", "script.js"],
  ["images", "images"],
  ["qr", "qr"],
  ["favicon.ico", "favicon.ico"],
  ["favicon.png", "favicon.png"],
  ["favicon-96.png", "favicon-96.png"],
  ["favicon.svg", "favicon.svg"],
  ["apple-touch-icon.png", "apple-touch-icon.png"],
  ["robots.txt", "robots.txt"],
  ["sitemap.xml", "sitemap.xml"],
];

for (const [from, to] of staticCopies) {
  const src = path.join(ROOT, from);
  const dest = path.join(DIST, to);
  if (!fs.existsSync(src)) {
    console.warn(`skip (見つかりません): ${from}`);
    continue;
  }
  fs.cpSync(src, dest, { recursive: true });
}

console.log(`\nビルド完了: ${pageFiles.length}ページ → dist/`);
