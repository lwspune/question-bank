/**
 * Attach a paper's question figures, so a stem that cites one is answerable.
 *
 *   npx tsx scripts/nda-mock/attach-images.ts m3          # dry-run
 *   npx tsx scripts/nda-mock/attach-images.ts m3 --apply  # upload + set image_url
 *   npx tsx scripts/nda-mock/attach-images.ts m3 --apply --force   # re-upload
 *
 * The figures are already standalone files: pandoc's --extract-media writes
 * them to out/<id>/q/media/ during extract, so unlike the board pipelines there
 * is nothing to crop out of a page — the mapping is the whole job, and it lives
 * in `Paper.figures` as questionNumber -> filename.
 *
 * `flip-public` REFUSES to publish a stem that cites a figure the row does not
 * carry, so this is what unblocks such a paper. Two rows needed it (m3 Q60 and
 * Q93), which is exactly the open item the README has carried since ingest.
 *
 * NOT every image in media/ is a figure. m3's media also holds a full-width
 * advertising banner for a THIRD-PARTY coaching institute, embedded in the
 * source manuscript. The mapping is explicit precisely so nothing decorative is
 * ever attached by a directory sweep.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { requirePaper, EXAM_ID, ORG_ID, OUT } from "./config";
import { uploadImage } from "../../src/lib/storage/images";

// Only the two types the storage helper accepts. A .gif or .emf figure is a
// hard error rather than a silent skip: the alternative is a stem that still
// cites a figure it does not carry, which is exactly what flip-public blocks on.
const MIME: Record<string, "image/png" | "image/jpeg"> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

async function main() {
  const paper = requirePaper(process.argv[2]);
  const apply = process.argv.includes("--apply");
  const force = process.argv.includes("--force");

  const figures = paper.figures ?? {};
  const entries = Object.entries(figures);
  if (!entries.length) {
    console.log(`${paper.id}: no figures declared in config (Paper.figures). Nothing to do.`);
    return;
  }

  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  console.log(`\n=== ${paper.label} — ${entries.length} figure(s) declared ===`);

  for (const [numStr, file] of entries) {
    const src = join(OUT, paper.id, "q", "media", file);
    if (!existsSync(src)) {
      throw new Error(`missing figure file: ${src} — re-run extract.ts ${paper.id} to repopulate media/`);
    }
    const { data, error } = await client
      .from("questions")
      .select("id,question_number,image_url,visibility")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", paper.sourceFile)
      .eq("question_number", numStr)
      .limit(2);
    if (error) throw new Error(error.message);
    if (!data?.length) throw new Error(`Q${numStr} not found in the bank for ${paper.sourceFile}`);
    if (data.length > 1) throw new Error(`Q${numStr} matches ${data.length} rows — refusing to guess`);

    const row = data[0];
    const bytes = readFileSync(src);
    const ext = file.slice(file.lastIndexOf(".")).toLowerCase();
    const mime = MIME[ext];
    if (!mime) throw new Error(`unsupported image type ${ext} for Q${numStr}`);

    if (row.image_url && !force) {
      console.log(`  Q${numStr}: already has image_url — skipping (pass --force to replace)`);
      continue;
    }
    console.log(`  Q${numStr}: ${file} (${(bytes.length / 1024).toFixed(0)} KB, ${mime}) [${row.visibility}]`);
    if (!apply) continue;

    const path = await uploadImage(client, ORG_ID, bytes, mime);
    const { error: upErr } = await client.from("questions").update({ image_url: path }).eq("id", row.id);
    if (upErr) throw new Error(upErr.message);
    console.log(`      -> ${path}`);
  }

  if (!apply) console.log("\n[dry-run] eyeball the files above, then pass --apply to upload + set image_url.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
