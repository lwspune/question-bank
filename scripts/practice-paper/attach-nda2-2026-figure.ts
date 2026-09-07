/**
 * Attach the one figure the NDA2_2026 ingest needs — Mock 2 Q109's ogive.
 *
 *   npx tsx scripts/practice-paper/attach-nda2-2026-figure.ts [--apply] [--force]
 *
 * Q109 asks "The curve given below represent a/an" with options pie diagram /
 * bar diagram / ogive / histogram. Its stem is UNANSWERABLE without the plot,
 * and the transcription deliberately did NOT describe the y-axis in the stem,
 * because that axis is labelled "Cumulative frequency" — which IS the answer.
 * So the figure is not decoration here; without it the question cannot be sat.
 *
 * The image is rendered from the source page region rather than extracted as the
 * embedded raster, because the rotated axis label sits outside the image's own
 * rect and a raw extract would lose it.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { uploadImage } from "../../src/lib/storage/images";
import { ORG_ID, EXAM_ID } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const SOURCE_FILE = "NDA2_2026_Maths_Practice_Mock_2.pdf";
const QUESTION_NUMBER = "109";
/** Rendered by the ingest at 6x from MATHS MOCK TEST-2.pdf p7, clip
 *  Rect(335.9, 168.4, 520.5, 320.0) — the figure rect plus a margin that keeps
 *  the rotated "Cumulative frequency" label and both axes' tick labels. */
const FIGURE = process.env.NDA2_FIGURE_PATH;

async function main() {
  const apply = process.argv.includes("--apply");
  const force = process.argv.includes("--force");
  if (!FIGURE) throw new Error("set NDA2_FIGURE_PATH to the rendered PNG");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("missing supabase env");
  const db = createClient(url, key, { auth: { persistSession: false } });

  const { data: rows, error } = await db
    .from("questions")
    .select("id, question_number, image_url, visibility, text")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", SOURCE_FILE)
    .eq("question_number", QUESTION_NUMBER);
  if (error) throw new Error(error.message);
  if (!rows || rows.length !== 1) {
    throw new Error(`expected exactly 1 row for ${SOURCE_FILE} Q${QUESTION_NUMBER}, found ${rows?.length ?? 0}`);
  }
  const row = rows[0];
  console.log(`Q${row.question_number}  ${row.id}  visibility=${row.visibility}`);
  console.log(`  stem: ${String(row.text).slice(0, 70)}`);
  if (row.image_url && !force) {
    console.log(`  already has image_url=${row.image_url} — pass --force to replace`);
    return;
  }
  const buf = readFileSync(FIGURE);
  console.log(`  figure: ${FIGURE} (${(buf.length / 1024).toFixed(1)} kB)`);
  if (!apply) { console.log("\n[dry-run] pass --apply to upload + set image_url."); return; }

  const path = await uploadImage(db, ORG_ID, buf, "image/png");
  const { error: uErr } = await db.from("questions").update({ image_url: path }).eq("id", row.id);
  if (uErr) throw new Error(`update image_url: ${uErr.message}`);
  console.log(`  uploaded -> ${path}`);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
