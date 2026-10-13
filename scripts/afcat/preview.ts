// Render a chapter's committed rows as one review page: typeset maths, the
// correct option highlighted, the authored solution, and a badge on every row
// an override touched or extraction flagged. Built from the same rows commit.ts
// writes (buildChapter + the committed shuffle plan), so it shows what ships.
//
//   npx tsx scripts/afcat/preview.ts <chapterId>   # writes out/<chapter>.preview.html
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { ShufflePlan } from "../worksheets/lib";
import { requireChapter, DATA, OUT, fileIndexOf } from "./config";
import { buildChapter, loadOverrides, readJson } from "./build";
import { loadChapter, qid } from "./read";

const chapter = requireChapter(process.argv[2]);
const shuffles = readJson<ShufflePlan>(join(DATA, `${chapter.id}.shuffles.json`), {});
const overrides = loadOverrides(chapter);
const flagsById = new Map<string, string[]>();
for (const { fileIndex, records } of loadChapter(chapter)) for (const r of records) if (r.flags) flagsById.set(qid(fileIndex, r.n), r.flags);

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const cards: string[] = [];
let n = 0;
for (const f of buildChapter(chapter, { shuffles })) {
  cards.push(`<h2>${esc(f.file.label)} <small>(file ${String(fileIndexOf(chapter, f.file)).padStart(2, "0")}, group ${f.file.group}, ${f.rows.length} rows)</small></h2>`);
  for (const r of f.rows) {
    n++;
    const id = r.questionNumber!;
    const ov = overrides[id];
    const badges = [
      ov ? `<span class="b ov" title="${esc(ov.reason)}">override: ${esc(ov.reason)}</span>` : "",
      shuffles[id] ? `<span class="b sh">options reordered for balance</span>` : "",
      ...(flagsById.get(id) ?? []).map((fl) => `<span class="b fl">source: ${esc(fl)}</span>`),
    ].join("");
    const opts = r.options
      .map((o) => `<li class="${o.isCorrect ? "ok" : ""}"><b>${o.label}</b> ${esc(o.text)}</li>`)
      .join("");
    cards.push(`<div class="q"><div class="meta">${n}. <code>${id}</code> · ${esc(r.subtopicName ?? "")} · ${r.difficulty}</div>${badges}
<p class="stem">${esc(r.text)}</p><ol>${opts}</ol><div class="sol"><b>Solution.</b> ${esc(r.solution ?? "")}</div></div>`);
  }
}

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>AFCAT review: ${esc(chapter.chapterName)}</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css">
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js"></script>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/contrib/auto-render.min.js"
 onload="renderMathInElement(document.body,{delimiters:[{left:'\\\\(',right:'\\\\)',display:false},{left:'\\\\[',right:'\\\\]',display:true}]})"></script>
<style>body{font:16px/1.5 system-ui,sans-serif;max-width:860px;margin:0 auto;padding:16px;background:#F5F7FB;color:#0F1D4A}
.q{background:#fff;border:1px solid #d8deea;border-radius:8px;padding:12px 16px;margin:12px 0}.meta{font-size:13px;color:#4a5578}
.stem{font-family:Georgia,serif}ol{list-style:none;padding:0}li{padding:4px 8px;border-radius:4px;font-family:Georgia,serif}
li.ok{background:#dcfce7;outline:1px solid #16a34a}.sol{font-size:14px;background:#f1f5ff;padding:8px;border-radius:4px}
.b{display:inline-block;font-size:12px;border-radius:4px;padding:1px 6px;margin:4px 4px 0 0}.ov{background:#fef3c7}.sh{background:#e0e7ff}.fl{background:#fee2e2}</style>
</head><body><h1>AFCAT: ${esc(chapter.chapterName)} (${n} questions, PRIVATE)</h1>
<p>Green = the key that ships. Badges: amber = adjudicated override, blue = options reordered to balance the key letters, red = what extraction found in the SOURCE key (context only).</p>
${cards.join("\n")}</body></html>`;

mkdirSync(OUT, { recursive: true });
const dest = join(OUT, `${chapter.id}.preview.html`);
writeFileSync(dest, html);
console.log(`${dest}  (${n} questions)`);
