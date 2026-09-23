/**
 * Crop each figure-question's diagram from the chapter PDF, upload it, and set
 * questions.image_url. The State Board switching-circuit figures are VECTOR-drawn
 * (not extractable raster objects), so we crop a bbox region off the rendered
 * page. Mirrors scripts/foundation/attach-images.ts but takes FRACTIONAL bboxes
 * (0-1 of the page, display-independent — the NEET pattern) so a vision agent can
 * give them off the rendered PNGs.
 *
 *   npx tsx scripts/mh-sb-9/attach-images.ts <chapterId>          # dry-run: crop to out/ for eyeballing
 *   npx tsx scripts/mh-sb-9/attach-images.ts <chapterId> --apply  # upload + set image_url
 *
 * Manifest: merged from data/<id>.*fig.json entries carrying `page` (0-based) +
 * `bbox` ([x0,y0,x1,y1] fractional). The question rows must already be committed
 * (looked up by exam + source_file + question_number). Idempotent: skips a row
 * whose image_url is already set.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { uploadImage } from "../../src/lib/storage/images";
import { cropFigures } from "../lib/figures/crop";
import { ORG_ID, EXAM_ID, OUT, DATA, requireChapter } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

import type { FigSpec } from "../lib/figures/crop";

/** Read every data/<id>.*fig.json fragment and collect {ref: {page, bbox}}.
 *  An entry may instead carry `file` — a path to a pre-made image, used when the
 *  figure a question reads CANNOT be expressed as one bbox on one page. That is
 *  not hypothetical: Precipitation's Q2/Q3 read a set of three labelled figures
 *  where (A) is on printed p48 and (B),(C) overleaf on p49, so a single crop can
 *  never show what the question asks about. Those get one stitched composite. */
function loadManifest(id: string): { crops: Record<string, FigSpec>; files: Record<string, string> } {
  const names = readdirSync(DATA).filter((f) => f.startsWith(`${id}.`) && f.endsWith("fig.json"));
  const crops: Record<string, FigSpec> = {};
  const files: Record<string, string> = {};
  for (const f of names) {
    const frag = JSON.parse(readFileSync(join(DATA, f), "utf8")) as Array<{
      ref: string; page?: number; bbox?: [number, number, number, number]; file?: string;
    }>;
    for (const q of frag) {
      if (crops[q.ref] || files[q.ref]) throw new Error(`duplicate figure ref "${q.ref}" (in ${f})`);
      if (q.file) { files[q.ref] = join(DATA, q.file); continue; }
      if (q.page === undefined || !q.bbox) continue;
      crops[q.ref] = { page: q.page, bbox: q.bbox };
    }
  }
  return { crops, files };
}

async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const force = process.argv.includes("--force"); // re-upload even if image_url already set (leaves the old object orphaned — sweep later)
  const ch = requireChapter(id);
  loadEnv();

  const { crops: figs, files: premade } = loadManifest(id);
  const refs = [...Object.keys(figs), ...Object.keys(premade)];
  if (refs.length === 0) throw new Error(`no figure specs found in data/${id}.*fig.json`);
  console.log(`${ch.chapterName}: ${refs.length} figure(s) (${Object.keys(figs).length} cropped, ${Object.keys(premade).length} pre-made).`);

  const cropped = Object.keys(figs).length ? cropFigures(ch.pdf, figs, join(OUT, `${id}-figs`)) : {};
  const crops: Record<string, string> = { ...cropped, ...premade };
  console.log(`${Object.keys(crops).length} image(s) ready in ${join(OUT, `${id}-figs`)} / data/`);

  if (!apply) {
    console.log("\n[dry-run] eyeball the cropped PNGs (leak/completeness), then pass --apply to upload + set image_url.");
    return;
  }

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  let attached = 0, missing = 0;
  for (const [ref, pngPath] of Object.entries(crops)) {
    const { data: q, error } = await client
      .from("questions")
      .select("id, image_url")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", ch.sourceFile)
      .eq("question_number", ref)
      .maybeSingle();
    if (error) throw new Error(`"${ref}" lookup: ${error.message}`);
    if (!q) { console.log(`  "${ref}": NO committed row — commit the question first; skipping`); missing++; continue; }
    if (q.image_url && !force) { console.log(`  "${ref}": image_url already set — skipping (use --force to overwrite)`); continue; }
    const mime = pngPath.endsWith(".jpg") ? "image/jpeg" : "image/png";
    const path = await uploadImage(client, ORG_ID, readFileSync(pngPath), mime);
    const { error: uErr } = await client.from("questions").update({ image_url: path }).eq("id", q.id);
    if (uErr) throw new Error(`"${ref}" set image_url: ${uErr.message}`);
    console.log(`  "${ref}": attached ${path}`);
    attached++;
  }
  console.log(`\ndone. attached ${attached}, missing-row ${missing}.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
