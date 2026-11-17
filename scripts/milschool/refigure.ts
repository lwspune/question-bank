/**
 * Replace a committed row's figure with its re-cropped file.
 *
 *   npx tsx scripts/milschool/refigure.ts <paper id> --q=73[,74] [--apply]
 *
 * commit.ts uploads a figure only when the row has none (image_url is set
 * once), so a figure fixed AFTER commit (a crop that lost its grey fill, a
 * tighter region) needs this: fix the band file, re-run merge + crop.py, LOOK
 * at the crop, then run this. It uploads the new file, points the row at it
 * and prints the old URL. The row's text, answer and hash are not touched.
 * Dry run by default.
 */
import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { uploadImage } from "../../src/lib/storage/images";
import { checkFigureFile, figureWatermarkIssue } from "../lib/figures/watermark";
import { ORG_ID, examIdOf, requirePaper } from "./config";
import { figurePath } from "./figures";
import { buildPaperRows } from "./rows";

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const args = process.argv.slice(2);
  const paper = requirePaper(args.find((a) => !a.startsWith("--")));
  const apply = args.includes("--apply");
  const qArg = args.find((a) => a.startsWith("--q="));
  if (!qArg) throw new Error("name the questions: --q=73[,74]");
  const nums = qArg.slice(4).split(",").map(Number);
  if (nums.some((n) => !Number.isInteger(n))) throw new Error(`bad --q list: ${qArg}`);

  const { qnOf } = buildPaperRows(paper);
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  for (const n of nums) {
    const path = figurePath(paper.id, n);
    if (!existsSync(path)) throw new Error(`Q${n}: ${path} not found (run crop.py)`);
    const wm = figureWatermarkIssue(`Q${n}`, await checkFigureFile(path));
    if (wm) throw new Error(wm);
    const { data, error } = await client
      .from("questions")
      .select("id, image_url")
      .eq("exam_id", examIdOf(paper))
      .eq("source_file", paper.sourceFile)
      .eq("question_number", qnOf(n));
    if (error) throw new Error(`Q${n}: lookup failed: ${error.message}`);
    if (!data || data.length !== 1) throw new Error(`Q${n}: expected one row, found ${data?.length ?? 0}`);
    const row = data[0];
    console.log(`Q${n} (${qnOf(n)}): row ${row.id}\n   old image_url: ${row.image_url ?? "(none)"}`);
    if (!apply) continue;
    const url = await uploadImage(client, ORG_ID, readFileSync(path), "image/png");
    const { error: uErr } = await client.from("questions").update({ image_url: url }).eq("id", row.id);
    if (uErr) throw new Error(`Q${n}: image_url update failed: ${uErr.message}`);
    console.log(`   new image_url: ${url}`);
  }
  if (!apply) console.log("\n[dry-run] pass --apply to upload and repoint.");
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
