/**
 * Give a "draw a diagram" board question the NCERT book's own figure as its
 * SOLUTION image (questions.solution_image_url), the rule the Biology textbook
 * lane follows (owner, 2026-10-07: board PYQs get the same).
 *
 *   npx tsx scripts/cbse-12-pyq/attach-draw-figures.ts             # work list + manifest status
 *   python  scripts/cbse-12-pyq/crop_draw_figures.py               # crops the manifest's figures
 *   npx tsx scripts/cbse-12-pyq/attach-draw-figures.ts --check     # dry run of the attach
 *   npx tsx scripts/cbse-12-pyq/attach-draw-figures.ts --apply     # upload + set solution_image_url
 *
 * THE WORK LIST is every transcribed row carrying `_drawFigure` (the agent's
 * note of what the student draws). THE MANIFEST, data/draw-figures.json, is
 * authored by hand after reading the book: [{ ref, fig, book, page, bbox,
 * note }], `ref` any one transcribed row of the question ("2023-57-1-1:Q29da"), `book` a PDF basename under the NCERT Class 12 Biology folder,
 * `page` 0-based, `bbox` page FRACTIONS [x0, y0, x1, y1]. A composite of two
 * figures is two manifest entries' worth of thinking but ONE stacked crop:
 * never side by side (phones scale it down to unreadable labels).
 *
 * THE JOIN KEY IS content_hash, as in attach-images.ts and for the same reason:
 * a question reprinted across sets commits once, under whichever paper's
 * source_file won, so the hash (computed with the REAL hash functions) is what
 * names the row. A multi-hit is a refusal, never a pick.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash, subjectiveContentHash } from "../../src/lib/upload/hash";
import { DATA, OUT, ORG_ID, EXAM_ID_CBSE_12 } from "./config";

const BUCKET = "question-images";
const MAX_BYTES = 1_000_000;

type Q = { ref: string; questionNumber: string; format: "mcq" | "subjective"; stem: string; context?: string; options?: { text: string }[]; answer?: string; _drawFigure?: string };
// `none` records a DECISION that the book has no figure fit to be this answer
// (e.g. NCERT draws the pollen grain only up to the 2-celled stage, so it cannot
// answer "draw a THREE-celled male gametophyte"). Such a row keeps its text
// description and is neither cropped nor counted as missing.
// `ms` instead of `book`: where NCERT has no fitting figure, the CBSE marking
// scheme's own drawing of the expected answer (a path under the PYQ source
// folder; crop_draw_figures.py reads it the same way).
type Entry = { ref: string; fig?: string; book?: string; ms?: string; page?: number; bbox?: number[]; mask?: number[][]; note?: string; none?: string };

const refHash = new Map<string, string>(); // "2023-57-1-1:Q29da" -> content_hash
function workList(): Map<string, { refs: string[]; note: string }> {
  const out = new Map<string, { refs: string[]; note: string }>();
  for (const f of readdirSync(DATA).filter((f) => /^\d{4}-57-\d-\d\.questions\.json$/.test(f))) {
    const paper = f.replace(".questions.json", "");
    const qs = (JSON.parse(readFileSync(join(DATA, f), "utf8")).questions ?? []) as Q[];
    for (const q of qs) {
      if (!q._drawFigure) continue;
      const hash = q.format === "subjective"
        ? subjectiveContentHash(q.stem, q.context ?? null)
        : contentHash(q.stem, (q.options ?? []).map((o) => o.text), q.answer ?? "");
      const g = out.get(hash) ?? { refs: [], note: q._drawFigure };
      g.refs.push(`${paper}:${q.ref}`);
      refHash.set(`${paper}:${q.ref}`, hash);
      out.set(hash, g);
    }
  }
  return out;
}

async function main() {
  const apply = process.argv.includes("--apply");
  const check = apply || process.argv.includes("--check");
  const force = process.argv.includes("--force");
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

  const work = workList();
  const manifestPath = join(DATA, "draw-figures.json");
  const manifest: Entry[] = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : [];
  const hashOf = (e: Entry) => refHash.get(e.ref) ?? "";
  const byHash = new Map(manifest.map((e) => [hashOf(e), e]));

  const missing = [...work].filter(([h]) => !byHash.has(h));
  const stale = manifest.filter((e) => !work.has(hashOf(e)));
  console.log(`work list: ${work.size} distinct draw-a-diagram question(s); manifest: ${manifest.length} entry(s)`);
  for (const [h, g] of work) {
    const e = byHash.get(h);
    const what = !e ? "-> NO FIGURE CHOSEN" : e.none ? `-> none (${e.none})` : `-> ${e.fig} (${e.book ?? e.ms} p${e.page})`;
    console.log(`  ${h.slice(0, 8)} ${what}  ${g.refs.join(", ")}`);
    if (!e) console.log(`      draws: ${g.note}`);
  }
  if (stale.length) console.log(`\n${stale.length} manifest entry(s) match no transcribed row: ${stale.map((e) => e.ref).join(", ")}`);
  if (!check) return;

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const plan: { e: Entry; bytes: Buffer; id: string; qn: string; key: string }[] = [];
  const problems: string[] = [];
  if (missing.length) problems.push(`${missing.length} work-list row(s) have no manifest entry`);
  if (stale.length) problems.push(`${stale.length} manifest entry(s) are stale`);
  for (const e of manifest) {
    const hash = hashOf(e);
    if (!work.has(hash) || e.none) continue;
    const file = join(OUT, "draw-figures", `${e.ref.replace(":", "_")}.png`);
    if (!existsSync(file)) { problems.push(`${e.ref}: crop not on disk — run crop_draw_figures.py`); continue; }
    const bytes = readFileSync(file);
    if (bytes.length > MAX_BYTES) { problems.push(`${e.ref}: ${bytes.length} bytes, over the cap`); continue; }
    const { data, error } = await client.from("questions")
      .select("id, question_number, solution_image_url")
      .eq("org_id", ORG_ID).eq("exam_id", EXAM_ID_CBSE_12).eq("content_hash", hash);
    if (error) throw new Error(error.message);
    if (!data?.length) { problems.push(`${e.ref}: no committed row`); continue; }
    if (data.length > 1) { problems.push(`${e.ref}: ${data.length} rows share this hash — refusing`); continue; }
    if (data[0].solution_image_url && !force) continue; // already attached
    plan.push({ e, bytes, id: data[0].id, qn: data[0].question_number, key: `cbse-12-pyq/sol-${hash.slice(0, 12)}.png` });
  }
  console.log(`\nattachable now: ${plan.length}`);
  for (const p of plan) console.log(`  ${p.e.ref}  ${String(p.bytes.length).padStart(7)} B  Q${p.qn}  ${p.e.fig}`);
  if (problems.length) { console.log(`\n${problems.length} problem(s):`); for (const p of problems) console.log(`  ${p}`); }
  if (!apply) { console.log(`\n[dry run] pass --apply to upload and set solution_image_url.`); return; }
  if (problems.length) throw new Error("refusing to attach — resolve the problems above first.");

  for (const p of plan) {
    const { error: upErr } = await client.storage.from(BUCKET).upload(p.key, p.bytes, { contentType: "image/png", upsert: true });
    if (upErr) throw new Error(`${p.e.ref}: upload failed — ${upErr.message}`);
    const { data: pub } = client.storage.from(BUCKET).getPublicUrl(p.key);
    const { error } = await client.from("questions").update({ solution_image_url: pub.publicUrl }).eq("id", p.id);
    if (error) throw new Error(`${p.e.ref}: ${error.message}`);
  }
  console.log(`\ndone. ${plan.length} solution figure(s) attached.`);
}

main().catch((e) => { console.error(e.message ?? e); process.exit(1); });
