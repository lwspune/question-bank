/**
 * Read-only probe: figures in the bank that may carry a printed watermark.
 *
 *   npm run audit:watermark -- isc-12-pyq        # source_file substring (required)
 *   npm run audit:watermark -- icse-10 --all     # also list the clean ones
 *
 * Downloads each matching question's image_url and scores it with the same
 * rule the ingestion gate uses (scripts/lib/figures/watermark.ts). A hit is a
 * question, never a verdict: graph paper and light-blue fills score too, so
 * LOOK at every hit. The filter is required so a run never pulls the whole
 * bank's images by accident. Triage, exits 0.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";
import { WATERMARK_THRESHOLD, watermarkFraction } from "./lib/figures/watermark";

async function main() {
  const filter = process.argv.slice(2).find((a) => !a.startsWith("--"));
  const all = process.argv.includes("--all");
  if (!filter) throw new Error("usage: audit-watermark.ts <source_file substring> [--all]");
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const rows: { source_file: string; question_number: string; visibility: string; image_url: string }[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await client
      .from("questions")
      .select("source_file, question_number, visibility, image_url")
      .ilike("source_file", `%${filter}%`)
      .not("image_url", "is", null)
      .order("id")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    rows.push(...((data ?? []) as typeof rows));
    if (!data || data.length < 1000) break;
  }

  let flagged = 0;
  for (const r of rows) {
    const res = await fetch(r.image_url);
    if (!res.ok) {
      console.log(`  UNREADABLE  ${r.source_file} ${r.question_number}  HTTP ${res.status}`);
      continue;
    }
    const { data, info } = await sharp(Buffer.from(await res.arrayBuffer()))
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const f = watermarkFraction(new Uint8Array(data.buffer, data.byteOffset, data.length), info.channels);
    const hit = f >= WATERMARK_THRESHOLD;
    if (hit) flagged++;
    if (hit || all) {
      console.log(`  ${hit ? "LOOK" : "ok  "}  ${(f * 100).toFixed(2).padStart(5)}%  [${r.visibility}] ${r.source_file} ${r.question_number}`);
    }
  }
  console.log(`\naudit:watermark "${filter}": ${rows.length} figure(s), ${flagged} to look at (threshold ${WATERMARK_THRESHOLD * 100}%).`);
  console.log("A hit is a question, not a verdict: graph paper and light-blue fills score too.");
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
