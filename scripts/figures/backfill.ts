/**
 * Attach a missing figure to every row of one source file that names one — the
 * generic repair behind `npm run audit:figures`.
 *
 *   npx tsx scripts/figures/backfill.ts <source_file>            # derive + crop + contact sheet
 *   npx tsx scripts/figures/backfill.ts <source_file> --apply    # upload + set image_url
 *   npx tsx scripts/figures/backfill.ts --all-missing            # which source files have work
 *
 * PIPELINE-AGNOSTIC. It takes a `questions.source_file`, resolves the PDF and
 * page range from the owning pipeline's own config (`scripts/lib/figures/
 * sources.ts`), derives the figure catalogue from the page (`derive.py`), joins
 * each row to a figure by THE NUMBER ITS OWN STEM PRINTS, and crops.
 *
 * It exists because the first version of this repair was written inside
 * `scripts/mh-ssc-10-text/` and worked on exactly one book. The remaining
 * genuine gaps are spread over NCERT Class 10/11/12, the Balbharati Class 11/12
 * books and CBSE board papers — 26 source files — and copying a script per
 * pipeline is how the DETECTOR ended up existing twice with two different
 * calibrations (see [[probe-scoped-to-whoever-looked]]).
 *
 * THE SAFETY PROPERTIES ARE THE SAME AS THE ORIGINAL, and they are the point:
 *   • The join is on the printed figure number, never on reading order. A stem
 *     that says "the adjoining figure" with no number is left UNRESOLVED.
 *   • A box that still contains body text is refused by `derive.py`, not shipped.
 *   • NOTHING IS ATTACHED until a human has seen it on a contact sheet and
 *     recorded the ref in `data/figures-review/<source_file>.json`. `--apply`
 *     silently skips anything not signed off.
 * Geometry finding a box is not the box being right: on one chapter the
 * derivation was confident about all 40 boxes and one was the wrong picture.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { readdirSync } from "node:fs";

import { referencesFigure } from "../lib/figureRefs";
import { resolveSource } from "../lib/figures/sources";
import { cropFigures, type FigSpec } from "../lib/figures/crop";
import { uploadImage } from "../../src/lib/storage/images";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const ROOT = join(__dirname, "..", "lib", "figures");
const OUT = join(ROOT, "out");
const REVIEW = join(ROOT, "figures-review");
const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f";

/** "In figure 3.37", "In fig 3.27", "(see Fig. 12.12)". */
const STEM_FIG = /\bfig(?:ure)?s?\.?\s*(\d+\.\d+)/gi;

/** The question ids a human read and called a genuine MISS.
 *
 *  `--only-miss` restricts the run to these. It matters because the probe's
 *  measured precision is 26%: without it three quarters of the work goes into
 *  rows that need no figure at all, and each one still costs a crop and a slot
 *  on the review sheet. The triage verdicts under `triage/` are the committed
 *  record of which rows are real. */
function triagedMisses(): Set<string> {
  const dir = join(ROOT, "triage");
  const ids = new Set<string>();
  if (!existsSync(dir)) return ids;
  for (const f of readdirSync(dir).filter((x) => x.endsWith(".json"))) {
    const d = JSON.parse(readFileSync(join(dir, f), "utf8")) as { rows?: { id?: string; verdict?: string }[] };
    for (const r of d.rows ?? []) if (r.verdict === "MISS" && r.id) ids.add(r.id);
  }
  return ids;
}

type CatEntry = { fig: string; page: number; bbox: [number, number, number, number] | null };
type Row = { id: string; question_number: string | null; text: string | null; context: string | null };

function client(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY required");
  return createClient(url, key, { auth: { persistSession: false } });
}

async function rowsNeedingFigures(c: SupabaseClient, examId: string, sourceFile: string): Promise<Row[]> {
  const out: Row[] = [];
  for (let from = 0; ; from += 500) {
    const { data, error } = await c
      .from("questions")
      .select("id,question_number,text,context")
      .eq("exam_id", examId)
      .eq("source_file", sourceFile)
      .is("image_url", null)
      .order("id")
      .range(from, from + 499);
    if (error) throw new Error(error.message);
    out.push(...((data ?? []) as Row[]));
    if (!data || data.length < 500) break;
  }
  return out.filter((r) => referencesFigure(r.text, r.context));
}

/** Which source files still have flagged rows, so the operator knows what to run. */
async function listWork(c: SupabaseClient) {
  const counts = new Map<string, number>();
  for (let from = 0; ; from += 1000) {
    const { data, error } = await c
      .from("questions")
      .select("source_file,text,context")
      .is("image_url", null)
      .order("id")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    for (const r of (data ?? []) as { source_file: string | null; text: string | null; context: string | null }[]) {
      if (referencesFigure(r.text, r.context)) counts.set(r.source_file ?? "?", (counts.get(r.source_file ?? "?") ?? 0) + 1);
    }
    if (!data || data.length < 1000) break;
  }
  const rows = [...counts.entries()].sort((a, z) => z[1] - a[1]);
  console.log(`${rows.length} source file(s) with flagged rows\n`);
  for (const [sf, n] of rows) {
    const src = resolveSource(sf);
    console.log(`  ${String(n).padStart(3)}  ${sf}${src ? "" : "   [no source resolvable — cannot backfill]"}`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const c = client();
  if (args.includes("--all-missing")) return listWork(c);

  const sourceFile = args.find((a) => !a.startsWith("--"));
  if (!sourceFile) throw new Error("usage: backfill.ts <source_file> [--apply] | --all-missing");
  const apply = args.includes("--apply");
  const onlyMiss = args.includes("--only-miss");
  const misses = onlyMiss ? triagedMisses() : null;

  const src = resolveSource(sourceFile);
  if (!src) throw new Error(`no PDF resolvable for "${sourceFile}" — add its pipeline to scripts/lib/figures/sources.ts`);
  if (!existsSync(src.pdf)) throw new Error(`PDF not on disk: ${src.pdf}`);
  mkdirSync(OUT, { recursive: true });

  // 1. Catalogue the page's figures.
  const catPath = join(OUT, `${sourceFile}.figures.json`);
  const res = spawnSync(
    "python",
    [join(ROOT, "derive.py"), src.pdf, String(src.page0), String(src.page1), catPath],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
  );
  if (res.status !== 0) throw new Error(`derive failed: ${res.stderr || res.stdout}`);
  console.log(res.stdout.trimEnd());
  const cat = JSON.parse(readFileSync(catPath, "utf8")) as CatEntry[];

  // HAND-ANCHORED BOXES WIN OVER DERIVED ONES.
  //
  // Two things need this and neither is a defect in the derivation. A figure the
  // geometry REFUSES (no clean rectangle exists on that layout) has no other way
  // to be attached at all. And a box that is right but untidy — Fig. 10.5's
  // caught the line "(iii) Coinitial" along its top edge, which is the wrong
  // sub-question's label for the two sibling rows that share the figure — is
  // faster to trim by hand than to chase with another rule.
  //
  // It is a committed FILE rather than an edit to the generated catalogue
  // because the catalogue is rebuilt on every run: a fix written there survives
  // exactly until the next invocation, which is the kind of repair that looks
  // done and silently isn't.
  const overridePath = join(ROOT, "overrides.json");
  const overrides: Record<string, Record<string, { page: number; bbox: [number, number, number, number]; why?: string }>> =
    existsSync(overridePath) ? JSON.parse(readFileSync(overridePath, "utf8")) : {};
  const mine = overrides[sourceFile] ?? {};
  let applied = 0;
  for (const [fig, o] of Object.entries(mine)) {
    const hit = cat.find((e) => e.fig === fig);
    if (hit) { hit.page = o.page; hit.bbox = o.bbox; } else cat.push({ fig, page: o.page, bbox: o.bbox });
    applied++;
  }
  if (applied) console.log(`applied ${applied} hand-anchored box(es) from overrides.json`);

  const byFig = new Map<string, CatEntry[]>();
  for (const e of cat) byFig.set(e.fig, [...(byFig.get(e.fig) ?? []), e]);

  // 2. Join each flagged row to a figure by the number its stem prints.
  let rows = await rowsNeedingFigures(c, src.examId, sourceFile);
  if (misses) {
    const before = rows.length;
    rows = rows.filter((r) => misses.has(r.id));
    console.log(`\n--only-miss: ${rows.length} of ${before} flagged rows were triaged as genuine`);
  }
  const mapped: Array<{ ref: string; id: string; fig: string; page: number; bbox: number[] }> = [];
  const unresolved: string[] = [];
  for (const r of rows) {
    const body = `${r.text ?? ""}\n${r.context ?? ""}`;
    const nums = [...new Set([...body.matchAll(STEM_FIG)].map((m) => m[1]))];
    const ref = r.question_number ?? r.id;
    if (nums.length !== 1) {
      unresolved.push(`${ref} — ${nums.length === 0 ? "names a figure but prints no number" : `reads ${nums.length} figures (${nums.join(", ")})`}`);
      continue;
    }
    const hits = byFig.get(nums[0]);
    if (!hits?.length) { unresolved.push(`${ref} — Fig. ${nums[0]} not in the catalogue`); continue; }
    if (hits.length > 1) { unresolved.push(`${ref} — Fig. ${nums[0]} printed on pages ${hits.map((h) => h.page).join(", ")}`); continue; }
    if (!hits[0].bbox) { unresolved.push(`${ref} — Fig. ${nums[0]} has no derivable box`); continue; }
    mapped.push({ ref, id: r.id, fig: nums[0], page: hits[0].page, bbox: hits[0].bbox });
  }
  console.log(`\n${rows.length} flagged row(s) | MAPPED ${mapped.length} | UNRESOLVED ${unresolved.length}`);
  for (const u of unresolved) console.log(`  ${u}`);
  if (!mapped.length) return;

  // 3. Crop, and render the sheet that the review is made from.
  const figs: Record<string, FigSpec> = {};
  for (const m of mapped) figs[m.ref] = { page: m.page, bbox: m.bbox as [number, number, number, number] };
  writeFileSync(join(OUT, `${sourceFile}.candidates.json`), JSON.stringify(mapped, null, 2) + "\n", "utf8");
  const crops = cropFigures(src.pdf, figs, join(OUT, `${sourceFile}-figs`));

  mkdirSync(REVIEW, { recursive: true });
  const reviewPath = join(REVIEW, `${sourceFile}.json`);
  const review: { verified: string[]; rejected?: Record<string, string> } = existsSync(reviewPath)
    ? JSON.parse(readFileSync(reviewPath, "utf8"))
    : { verified: [] };
  const ok = new Set(review.verified);

  if (!apply) {
    console.log(`\ncrops in ${join(OUT, `${sourceFile}-figs`)}`);
    console.log(`REVIEW: python scripts/lib/figures/contact_sheet.py "${src.pdf}" ${sourceFile} 12 --dir=scripts/lib/figures`);
    console.log(`then list the refs you accept in ${reviewPath} and re-run with --apply.`);
    console.log(`signed off so far: ${mapped.filter((m) => ok.has(m.ref)).length}/${mapped.length}`);
    return;
  }

  // 4. Attach — only what a person has signed off.
  let attached = 0, held = 0;
  for (const m of mapped) {
    if (!ok.has(m.ref)) { held++; continue; }
    const path = crops[m.ref];
    if (!path) { console.log(`  ${m.ref}: no crop produced — skipping`); continue; }
    const mime = path.endsWith(".jpg") ? "image/jpeg" : "image/png";
    const stored = await uploadImage(c, ORG_ID, readFileSync(path), mime);
    const { error } = await c.from("questions").update({ image_url: stored }).eq("id", m.id);
    if (error) throw new Error(`${m.ref}: ${error.message}`);
    console.log(`  ${m.ref}: attached (Fig. ${m.fig})`);
    attached++;
  }
  console.log(`\ndone. attached ${attached}, held-for-review ${held}.`);
}

main().catch((e) => { console.error(e?.message ?? e); process.exit(1); });
