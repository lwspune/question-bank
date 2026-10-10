/**
 * Attach the four graphs the LWS 11th "Motion in 1D" test needs (Q4, Q10, Q14, Q16).
 *
 *   npx tsx scripts/practice-paper/attach-lws11-motion-1d-figures.ts <figDir> [--apply] [--force]
 *
 * <figDir> holds fig_q4.png, fig_q10.png, fig_q14.png, fig_q16.png. Each is the
 * page's embedded JPEG drawn alone onto a blank page and rendered at 4x, so no
 * stem or option text from around the figure leaks into the crop (a clip of the
 * page region with any margin pulls those in).
 *
 * Q4, Q14 and Q16 cannot be answered without their figure: Q4's 40 deg is measured
 * from the VELOCITY axis (the whole trick), Q14's positions are read off the grid,
 * and Q16's path is only in the drawing. Q10's figure repeats angles its stem gives.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { uploadImage } from "../../src/lib/storage/images";
import { ORG_ID, EXAM_ID, PAPERS } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const SOURCE_FILE = PAPERS["lws11-motion-1d"].sourceFile;
const QUESTION_NUMBERS = ["4", "10", "14", "16"];

async function main() {
  const figDir = process.argv[2];
  const apply = process.argv.includes("--apply");
  const force = process.argv.includes("--force");
  if (!figDir || figDir.startsWith("--")) throw new Error("usage: <figDir> [--apply] [--force]");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("missing supabase env");
  const db = createClient(url, key, { auth: { persistSession: false } });

  const { data: rows, error } = await db
    .from("questions")
    .select("id, question_number, image_url, text")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", SOURCE_FILE)
    .in("question_number", QUESTION_NUMBERS);
  if (error) throw new Error(error.message);
  if (!rows || rows.length !== QUESTION_NUMBERS.length) {
    throw new Error(`expected ${QUESTION_NUMBERS.length} rows for ${SOURCE_FILE}, found ${rows?.length ?? 0}`);
  }

  for (const num of QUESTION_NUMBERS) {
    const row = rows.find((r) => r.question_number === num)!;
    const buf = readFileSync(join(figDir, `fig_q${num}.png`));
    console.log(`Q${num}  ${row.id}  figure ${(buf.length / 1024).toFixed(1)} kB  stem: ${String(row.text).slice(0, 50)}`);
    if (row.image_url && !force) {
      console.log(`  already has image_url — pass --force to replace`);
      continue;
    }
    if (!apply) continue;
    const path = await uploadImage(db, ORG_ID, buf, "image/png");
    const { error: uErr } = await db.from("questions").update({ image_url: path }).eq("id", row.id);
    if (uErr) throw new Error(`update image_url Q${num}: ${uErr.message}`);
    console.log(`  uploaded -> ${path}`);
  }
  if (!apply) console.log("\n[dry-run] pass --apply to upload + set image_url.");
}

main().catch((e) => { console.error(e.message); process.exit(1); });
