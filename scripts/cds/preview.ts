/**
 * Render a review HTML for a CDS paper from its data/*.json (no DB needed),
 * grouped by section/set with directions shown once, underlines rendered, and
 * the LLM-derived correct option highlighted. Open it to spot-check answers
 * before flipping PUBLIC.
 *
 *   npx tsx scripts/cds/preview.ts <paperId>   # writes out/<paperId>.preview.html
 */
import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildRecords, normalizeQuestions, type Section, type Underlines } from "./lib";
import { OUT, requirePaper, dataPath } from "./config";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const render = (s: string) =>
  esc(s).replace(/\\\(\\underline\{\\text\{(.+?)\}\}\\\)/g, "<u>$1</u>").replace(/\n/g, "<br>");

function main() {
  const paper = requirePaper(process.argv[2]);
  const sections: Section[] = JSON.parse(readFileSync(dataPath(paper.id, "sections"), "utf8"));
  const questions = normalizeQuestions(JSON.parse(readFileSync(dataPath(paper.id, "questions"), "utf8")));
  const ulPath = dataPath(paper.id, "underlines");
  const underlines: Underlines = existsSync(ulPath) ? JSON.parse(readFileSync(ulPath, "utf8")) : {};
  const qByNum = new Map(questions.map((q) => [q.number, q]));
  const { rows } = buildRecords(sections, questions, underlines);
  const rowByNum = new Map(rows.map((r) => [Number(r.questionNumber), r]));

  const blocks: string[] = [];
  for (const sec of sections) {
    const first = rowByNum.get(sec.qFrom);
    blocks.push(`<h2 style="margin-top:28px">${sec.setLabel} · ${esc(sec.type)} (Q${sec.qFrom}–${sec.qTo})</h2>` +
      `<div style="background:#eef;padding:8px 11px;border-radius:6px;font-size:12px;color:#334">${render(first?.context || "")}</div>`);
    for (let n = sec.qFrom; n <= sec.qTo; n++) {
      const r = rowByNum.get(n); const q = qByNum.get(n);
      if (!r || !q) continue;
      const optText: Record<string, string> = { A: r.optionA, B: r.optionB, C: r.optionC, D: r.optionD };
      const opts = (["A", "B", "C", "D"] as const).map((L) => {
        const txt = optText[L];
        const ok = q.answer.toUpperCase() === L;
        const st = ok ? "background:#dafbe1;border-color:#1a7f37;font-weight:600" : "background:#fff";
        return `<div style="border:1px solid #ddd;${st};padding:4px 9px;border-radius:5px;margin:2px 0">(${L}) ${render(txt)}${ok ? " &#10003;" : ""}</div>`;
      }).join("");
      const c = q.confidence.toUpperCase() === "HIGH" ? "#1a7f37" : "#9a6700";
      blocks.push(`<div style="border:1px solid #d0d7de;border-radius:8px;padding:12px;margin:10px 0">` +
        `<div style="font-size:12px;color:#57606a">Q${n} · ${esc(r.chapter)} › ${esc(r.subtopic || "")} · ${q.difficulty} · <b style="color:${c}">ans ${q.answer} · ${q.confidence}</b></div>` +
        `<div style="margin:5px 0;font-size:15px">${render(r.question)}</div>${opts}` +
        `<div style="font-size:12px;color:#57606a;font-style:italic;margin-top:4px">${esc(q.reasoning || "")}</div></div>`);
    }
  }
  const med = questions.filter((q) => q.confidence.toUpperCase() !== "HIGH").map((q) => q.number);
  const head = `<html><head><meta charset=utf-8></head><body style="font-family:system-ui,Segoe UI,sans-serif;max-width:900px;margin:20px auto;padding:0 16px">` +
    `<h1>${esc(paper.pyqNote)} · review</h1><p>${questions.length} Q · PRIVATE · directions once per section · LLM-derived answers. ` +
    `<b style="color:#9a6700">${med.length} need a key cross-check</b>: ${med.map((n) => "Q" + n).join(", ")}.</p>`;
  const out = join(OUT, `${paper.id}.preview.html`);
  writeFileSync(out, head + blocks.join("") + "</body></html>", "utf8");
  console.log(`wrote ${out} · ${questions.length} Q · ${med.length} flagged`);
}

main();
