/**
 * KaTeX-rendered HTML review of a committed Foundation worksheet (the stored
 * rows) — for human review before flipping PUBLIC. Marks the correct option,
 * shows any solution, and badges the DERIVED answer + REVIEW reason per
 * overrides.json. Mirrors scripts/practice/preview.ts.
 *
 *   npx tsx scripts/foundation/preview.ts <worksheetId>   # writes out/<id>.preview.html
 */
import { readFileSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { ORG_ID, EXAM_ID, requireWorksheet, OUT, DATA } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function main() {
  const id = process.argv[2];
  const ws = requireWorksheet(id);
  loadEnv();

  const overridesPath = join(DATA, `${id}.overrides.json`);
  const overrides: Record<string, { answer: string; reason: string }> = existsSync(overridesPath)
    ? JSON.parse(readFileSync(overridesPath, "utf8")) : {};

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data: qs, error } = await client
    .from("questions")
    .select("id, question_number, difficulty, text, solution, image_url, subtopic:subtopic_id(name), options(label, text, is_correct, image_url)")
    .eq("org_id", ORG_ID).eq("exam_id", EXAM_ID).eq("source_file", ws.sourceFile);
  if (error) throw new Error(error.message);
  const rows = (qs ?? []).sort((a: any, b: any) => Number(a.question_number) - Number(b.question_number));

  const cards = rows.map((q: any) => {
    const ov = overrides[String(q.question_number)];
    const review = ov && /REVIEW/i.test(ov.reason);
    const opts = (q.options ?? [])
      .sort((a: any, b: any) => a.label.localeCompare(b.label))
      .map((o: any) => `<div class="opt ${o.is_correct ? "correct" : ""}"><b>${o.label}.</b> ${esc(o.text)}${o.image_url ? " 🖼" : ""}${o.is_correct ? " ✓" : ""}</div>`)
      .join("");
    return `<div class="card">
      <div class="hd"><span class="qn">Q${q.question_number}</span>
        <span class="tag">${esc(q.subtopic?.name ?? "?")}</span>
        <span class="tag diff-${q.difficulty}">${q.difficulty}</span>
        ${ov ? `<span class="tag ${review ? "rv" : "ov"}">${review ? "REVIEW" : "DERIVED"} → ${ov.answer}</span>` : ""}
        ${q.image_url ? `<span class="tag img">has figure</span>` : ""}
      </div>
      <div class="stem">${esc(q.text)}</div>
      ${q.image_url ? `<div class="figref">[figure attached: ${esc(q.image_url)}]</div>` : ""}
      <div class="opts">${opts}</div>
      ${ov ? `<div class="ovnote">${esc(ov.reason)}</div>` : ""}
      ${q.solution ? `<details class="sol"><summary>Solution</summary><div>${esc(q.solution)}</div></details>` : ``}
    </div>`;
  }).join("\n");

  const html = `<!doctype html><html><head><meta charset="utf-8">
<title>${ws.chapterName} — Foundation review</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css">
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js"></script>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/contrib/auto-render.min.js"
 onload="renderMathInElement(document.body,{delimiters:[{left:'\\\\(',right:'\\\\)',display:false},{left:'\\\\[',right:'\\\\]',display:true}]})"></script>
<style>
 body{font-family:Georgia,serif;max-width:900px;margin:24px auto;padding:0 16px;color:#1a1a1a}
 h1{font-family:system-ui;font-size:20px}.meta{font-family:system-ui;font-size:13px;color:#555;margin-bottom:20px}
 .card{border:1px solid #ddd;border-radius:8px;padding:14px 16px;margin:14px 0}
 .hd{font-family:system-ui;font-size:12px;margin-bottom:8px;display:flex;gap:8px;align-items:center;flex-wrap:wrap}
 .qn{font-weight:700;font-size:14px}.tag{background:#eef;border-radius:4px;padding:2px 7px;color:#334}
 .diff-EASY{background:#e7f6e7}.diff-MODERATE{background:#fff4e0}.diff-HARD{background:#fdebeb}
 .ov{background:#e0ecff;color:#036}.rv{background:#ffe0e0;color:#a00;font-weight:700}.img{background:#f0e0ff;color:#629}
 .stem{margin:6px 0 10px}.figref{font-family:system-ui;font-size:12px;color:#629;margin:4px 0}
 .opt{padding:3px 8px;margin:2px 0;border-radius:4px}.opt.correct{background:#e7f6e7;font-weight:600}
 .ovnote{font-family:system-ui;font-size:12px;color:#555;background:#fafafa;border-left:3px solid #88a;padding:6px 10px;margin:8px 0}
 details.sol{margin-top:8px;font-size:14px}details.sol summary{cursor:pointer;font-family:system-ui;font-size:12px;color:#36c}
 details.sol>div{margin-top:6px;padding:8px 10px;background:#fafafa;border-radius:6px}
</style></head><body>
<h1>${ws.chapterName} — Foundation Course practice (review)</h1>
<div class="meta">${rows.length} questions · all PRIVATE · question_kind=practice · source: ${ws.sourceFile}<br>
Green = stored correct option. Blue "DERIVED" = answer derived (no printed key). Red "REVIEW" = lower-confidence — verify before flipping PUBLIC.</div>
${cards}
</body></html>`;

  mkdirSync(OUT, { recursive: true });
  const outPath = join(OUT, `${id}.preview.html`);
  writeFileSync(outPath, html);
  console.log(`wrote ${outPath} (${rows.length} questions)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
