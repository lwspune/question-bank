/**
 * Check, review and attach a batch of ANIMATED solutions (lib/visuals).
 *
 *   npm run visuals:run -- <batch>             # check every visual + write the review sheet; writes NOTHING
 *   npm run visuals:run -- <batch> --apply     # also set questions.solution_visual
 *   ... --replace                              # swap a visual that is already set
 *
 * <batch> names data/<batch>.json (lib/visuals/batch.ts says what a batch is).
 * LOOK AT THE SHEET before --apply: it draws every step's last frame beside the
 * step's text and the key. The self-check proves the numbers; only the eye can
 * tell a label sitting on a ray or a picture that teaches the wrong thing.
 *
 * The only column ever written is solution_visual: a solution's text and its
 * still figure are never touched (owner, 2026-10-25). Every visual is checked
 * before the first write, so one problem stops the run with nothing written.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import SceneSvg from "../../src/components/visuals/SceneSvg";
import { fitMathLine, fittedSize } from "../../src/lib/visuals/fitMath";
import { planVisualBatch, type BatchRow, type VisualBatch } from "../../src/lib/visuals/batch";
import { getScene } from "../../src/lib/visuals/registry";
import { checkVisual, parseSolutionVisual, stepTexts } from "../../src/lib/visuals/visual";

type Row = {
  id: string;
  question_number: string | null;
  visibility: string;
  text: string;
  solution: string | null;
  solution_visual?: unknown;
  question_format: BatchRow["question_format"];
  numeric_answer: number | string | null;
  exams: { name: string } | null;
  chapters: { name: string } | null;
  options: { label: string; text: string; is_correct: boolean }[] | null;
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// The light theme's scene colours (globals.css .viz), so the sheet matches the site.
// KaTeX's own stylesheet, inlined with its fonts resolved to the installed package,
// so an algebra-steps maths line looks on the sheet as it does on the site.
const KATEX_DIR = join(process.cwd(), "node_modules", "katex", "dist");
const KATEX_CSS = (() => {
  try {
    return readFileSync(join(KATEX_DIR, "katex.min.css"), "utf8").replace(/url\((fonts\/[^)]+)\)/g, (_, f: string) => `url(${pathToFileURL(join(KATEX_DIR, f)).href})`);
  } catch {
    return "";
  }
})();
// The player's fit for maths lines (lib/visuals/fitMath), run on the sheet so it
// shows what students see; a line still too wide at the smallest size is
// outlined in red and counted in the heading, for the reviewer. It waits for
// KaTeX's fonts: measured in the fallback font a line looks narrower than it is.
const FIT_SCRIPT = `<script>const fittedSize=${fittedSize.toString()};const fitMathLine=${fitMathLine.toString()};document.fonts.ready.then(function(){var over=0;document.querySelectorAll("[data-viz-math]").forEach(function(el){if(!fitMathLine(el)){over++;el.style.outline="2px solid #b91c1c";el.setAttribute("data-viz-over","1")}});document.querySelector("h1").insertAdjacentHTML("beforeend",over?' <span class="bad">('+over+" maths lines still too wide)</span>":' <small>(maths lines fitted)</small>')})</script>`;
const SHEET_VARS =`.viz{--viz-fg:#0f1d4a;--viz-muted:#55657f;--viz-line:#dfe6f1;--viz-brand:#1d4ed8;--viz-brand-text:#1d4ed8;--viz-card:#fff;--viz-bg:#f5f7fb;--viz-soft:#e8f0ff;--viz-amber:#b45309;--viz-good:#047857;--viz-good-soft:#e3f4ec;--viz-bad:#b91c1c;--viz-glass:#dcebfb}.viz .viz-mark-1{color:#1d4ed8;font-weight:700}.viz .viz-mark-2{color:#b45309;font-weight:700}.viz .viz-mark-3{color:#047857;font-weight:700}`;

async function fetchRows(client: SupabaseClient, ids: string[]): Promise<{ rows: Map<string, Row>; hasColumn: boolean }> {
  const base = "id, question_number, visibility, text, solution, question_format, numeric_answer, exams(name), chapters(name), options(label, text, is_correct)";
  const rows = new Map<string, Row>();
  let hasColumn = true;
  for (let i = 0; i < ids.length; i += 150) {
    const chunk = ids.slice(i, i + 150);
    const read = async (cols: string) => (await client.from("questions").select(cols).in("id", chunk)) as { data: unknown[] | null; error: { message: string } | null };
    let res = await read(`${base}, solution_visual`);
    if (res.error && /solution_visual/.test(res.error.message)) {
      // Migration 0184 not applied here yet: a dry run can still check everything else.
      hasColumn = false;
      res = await read(base);
    }
    if (res.error) throw new Error(`lookup: ${res.error.message}`);
    for (const r of res.data as unknown as Row[]) rows.set(r.id, r);
  }
  return { rows, hasColumn };
}

function sheet(name: string, batch: VisualBatch, rows: Map<string, Row>, problems: string[]): string {
  const sections = batch.visuals.map((entry) => {
    const r = rows.get(entry.id);
    const parsed = parseSolutionVisual(entry.visual);
    if (!r || !parsed.ok) return `<section class="bad"><h2>${esc(entry.id)}</h2><p>${esc(r ? (parsed.ok ? "" : parsed.error) : "no such question")}</p></section>`;
    const v = parsed.visual;
    const scene = getScene(v.scene)!;
    const box = scene.viewBox(v.params);
    const texts = stepTexts(v, r.solution) ?? v.steps.map(() => "(steps do not fit the stored solution)");
    const key = r.question_format === "numeric" ? `numeric answer ${r.numeric_answer}` : (r.options ?? []).filter((o) => o.is_correct).map((o) => `${o.label}: ${o.text}`).join(" | ");
    const check = checkVisual(v);
    const frames = v.steps.map((s, k) => {
      const played = v.steps.slice(0, k + 1).flatMap((x) => x.beats);
      const svg = renderToStaticMarkup(
        createElement(SceneSvg, { shapes: scene.frame(v.params, { played, t: 1, slider: scene.slider?.(v.params).initial }), w: box.w, h: box.h, label: `step ${k + 1}` }),
      );
      return `<figure><div class="viz">${svg}</div><figcaption><b>Step ${k + 1}</b> (${s.beats.join(", ")})<br>${esc(texts[k])}</figcaption></figure>`;
    });
    return `<section><h2>${esc(`${r.exams?.name ?? "?"} · ${r.chapters?.name ?? "?"} · Q${r.question_number ?? "?"}`)} <small>${esc(r.id)}${r.visibility !== "PUBLIC" ? " · " + r.visibility : ""}</small></h2>
<p class="stem">${esc(r.text.replace(/\s+/g, " ").slice(0, 400))}</p>
<p><b>Key:</b> ${esc(key)} &nbsp; <b>Visual's answer:</b> ${esc(v.answer.label)} &nbsp; <b>Check:</b> <span class="${check.ok ? "ok" : "bad"}">${esc(scene.checkText(v.params, check.value))}</span></p>
<div class="frames">${frames.join("")}</div></section>`;
  });
  return `<!doctype html><meta charset="utf-8"><title>${esc(name)}</title><style>${KATEX_CSS}</style><style>${SHEET_VARS}body{font:14px system-ui;margin:24px;max-width:1400px;color:#0f1d4a}section{border-top:1px solid #ccc;padding:14px 0}h2{font-size:16px}small{color:#666;font-weight:400}.stem{font-family:Georgia,serif}.frames{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px}figure{margin:0}figcaption{font-size:12.5px;color:#333;margin-top:6px}.ok{color:#047857}.bad{color:#b91c1c}</style>
<h1>${esc(name)}: ${batch.visuals.length} visuals, ${(batch.decided ?? []).length} decided without one</h1>${problems.length ? `<ul class="bad">${problems.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` : ""}${sections.join("")}${FIT_SCRIPT}`;
}

async function main() {
  const name = process.argv[2];
  const apply = process.argv.includes("--apply");
  const replace = process.argv.includes("--replace");
  if (!name || name.startsWith("--")) throw new Error("usage: visuals:run -- <batch> [--apply] [--replace]");
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

  const batch = JSON.parse(readFileSync(join(__dirname, "data", `${name}.json`), "utf8")) as VisualBatch;
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const ids = [...batch.visuals.map((v) => v.id), ...(batch.decided ?? []).map((d) => d.id)];
  const { rows, hasColumn } = await fetchRows(client, ids);

  const batchRows = new Map<string, BatchRow>(
    [...rows.values()].map((r) => [
      r.id,
      {
        id: r.id,
        solution: r.solution,
        solution_visual: r.solution_visual ?? null,
        question_format: r.question_format,
        numeric_answer: r.numeric_answer === null ? null : Number(r.numeric_answer),
        correct: (r.options ?? []).filter((o) => o.is_correct).map((o) => o.label),
      },
    ]),
  );
  const plan = planVisualBatch(batch, batchRows, { replace });

  const outdir = join(process.cwd(), "generated-papers", "visuals");
  mkdirSync(outdir, { recursive: true });
  const review = join(outdir, `${name}.html`);
  writeFileSync(review, sheet(name, batch, rows, plan.problems));

  console.log(`${name}: ${batch.visuals.length} visuals (${plan.write.length} to write, ${plan.already.length} already set), ${(batch.decided ?? []).length} decided without one`);
  console.log(`review: ${review}`);
  if (!hasColumn) console.log("note: migration 0184 is not applied to this database yet; current visuals were read as none.");
  if (plan.problems.length) {
    for (const p of plan.problems) console.log(`  !! ${p}`);
    process.exit(1);
  }
  if (!apply) {
    console.log("[dry run] look at the review sheet, then re-run with --apply.");
    return;
  }
  if (!hasColumn) throw new Error("apply migration 0184 before --apply");

  for (const w of plan.write) {
    let q = client.from("questions").update({ solution_visual: w.visual }).eq("id", w.id);
    if (!replace) q = q.is("solution_visual", null);
    const { error } = await q;
    if (error) throw new Error(`${w.id}: ${error.message}`);
    console.log(`  set ${w.id}`);
  }
  console.log(`applied: ${plan.write.length} written.`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
