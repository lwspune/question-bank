/**
 * Render a paper's transcription JSON to a self-contained KaTeX HTML for human review.
 *
 *   npx tsx scripts/neet/preview.ts <paperId>   ->  out/<paperId>.preview.html
 *
 * Shows every question with its 4 options (correct one highlighted), answer, solution,
 * subject/chapter/subtopic, and figure/confidence badges. KaTeX auto-render via CDN
 * (this is a throwaway local review file under the gitignored out/ dir).
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { normalizeQuestions } from "./lib";
import { DATA, OUT, requirePaper } from "./config";

function esc(s: string): string {
  return (s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function main() {
  const paper = requirePaper(process.argv[2]);
  const raw: unknown[] = [];
  for (const f of readdirSync(DATA).filter((f) => f.startsWith(`${paper.id}.`) && f.endsWith(".json"))) {
    raw.push(...(JSON.parse(readFileSync(join(DATA, f), "utf8")) as unknown[]));
  }
  const qs = normalizeQuestions(raw).sort((a, b) => a.number - b.number);
  const letters = ["A", "B", "C", "D"];

  const cards = qs.map((q) => {
    const ansIdx = letters.indexOf(String(q.answer).toUpperCase());
    const opts = (q.options || []).map((o, i) =>
      `<div class="opt${i === ansIdx ? " correct" : ""}">(${letters[i]}) ${esc(o)}</div>`).join("");
    const badges = [
      `<span class="badge">${esc(q.subject)}</span>`,
      `<span class="badge">${esc(q.chapter)} › ${esc(q.subtopic)}</span>`,
      `<span class="badge">${esc(q.difficulty)}</span>`,
      q.confidence?.toUpperCase() !== "HIGH" ? `<span class="badge warn">conf: ${esc(q.confidence)}</span>` : "",
      q.hasFigure ? `<span class="badge fig">FIGURE</span>` : "",
    ].join(" ");
    return `<div class="q"><div class="head"><b>Q${q.number}</b> ${badges}</div>
      <div class="stem">${esc(q.stem)}</div>${opts}
      <div class="ans">Answer: (${letters[ansIdx] ?? q.answer})</div>
      <details><summary>Solution</summary><div class="sol">${esc(q.solution || "")}</div></details></div>`;
  }).join("\n");

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${paper.id} NEET preview</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css">
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js"></script>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/contrib/auto-render.min.js"
  onload="renderMathInElement(document.body,{delimiters:[{left:'\\\\(',right:'\\\\)',display:false},{left:'\\\\[',right:'\\\\]',display:true}]})"></script>
<style>body{font:15px/1.5 system-ui;max-width:900px;margin:20px auto;padding:0 16px;color:#111}
.q{border:1px solid #ddd;border-radius:8px;padding:12px 16px;margin:14px 0}
.head{margin-bottom:8px}.stem{margin:6px 0;white-space:pre-wrap}
.opt{padding:3px 8px;margin:2px 0;border-radius:4px}.opt.correct{background:#d6f5df;font-weight:600}
.ans{margin-top:6px;color:#137a3f;font-weight:600}
.badge{display:inline-block;font-size:11px;background:#eef;border-radius:4px;padding:1px 6px;margin-left:4px;color:#334}
.badge.warn{background:#fde9c8;color:#8a5a00}.badge.fig{background:#e5d9ff;color:#5b21b6}
.sol{white-space:pre-wrap;color:#333;background:#fafafa;padding:8px;border-radius:4px}
summary{cursor:pointer;color:#555;font-size:13px;margin-top:6px}
table{border-collapse:collapse}td,th{border:1px solid #bbb;padding:3px 8px}</style></head>
<body><h1>${esc(paper.pyqNote)} — ${qs.length} questions</h1>${cards}</body></html>`;

  const out = join(OUT, `${paper.id}.preview.html`);
  writeFileSync(out, html);
  console.log(`wrote ${out} (${qs.length} questions)`);
}

main();
