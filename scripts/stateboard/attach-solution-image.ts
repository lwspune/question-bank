/**
 * Upload a per-question SOLUTION diagram (a pre-rendered PNG) and set
 * questions.solution_image_url (migration 0042). Unlike attach-images.ts (which
 * CROPS a figure off the source PDF), a solution diagram is AUTHORED — a small
 * coordinate-geometry sketch drawn to accompany the model answer — so this takes
 * ready PNG files, not bboxes.
 *
 *   npx tsx scripts/stateboard/attach-solution-image.ts <chapterId>          # dry-run: validate manifest + files
 *   npx tsx scripts/stateboard/attach-solution-image.ts <chapterId> --apply  # upload + set solution_image_url
 *
 * Manifest: data/<id>.solution-images.json = [{ ref, png }] where `ref` is the
 * question_number of a committed row and `png` is a path (absolute, or relative
 * to the repo root) to the rendered PNG. The row must already be committed
 * (looked up by exam + source_file + question_number). Idempotent: skips a row
 * whose solution_image_url is already set unless --force (leaves the old object
 * orphaned — sweep with scripts/sweep-orphan-images.ts).
 */
import { readFileSync, existsSync } from "node:fs";
import { join, isAbsolute } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { uploadImage } from "../../src/lib/storage/images";
import { ORG_ID, EXAM_ID, DATA, requireChapter } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type SolImage = { ref: string; png: string };

function resolvePng(p: string): string {
  return isAbsolute(p) ? p : join(process.cwd(), p);
}

async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const force = process.argv.includes("--force");
  const ch = requireChapter(id);
  loadEnv();

  const manifestPath = join(DATA, `${id}.solution-images.json`);
  if (!existsSync(manifestPath)) throw new Error(`no manifest at ${manifestPath}`);
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as SolImage[];
  if (!Array.isArray(manifest) || manifest.length === 0) throw new Error("manifest is empty");

  // Validate every PNG exists + refs are unique before touching the DB.
  const seen = new Set<string>();
  for (const m of manifest) {
    if (!m.ref || !m.png) throw new Error(`manifest row missing ref/png: ${JSON.stringify(m)}`);
    if (seen.has(m.ref)) throw new Error(`duplicate ref "${m.ref}"`);
    seen.add(m.ref);
    const p = resolvePng(m.png);
    if (!existsSync(p)) throw new Error(`"${m.ref}": PNG not found at ${p}`);
  }
  console.log(`${ch.chapterName}: ${manifest.length} solution diagram(s), all PNGs present.`);

  if (!apply) {
    console.log("\n[dry-run] eyeball the PNGs (correctness/legibility), then pass --apply to upload + set solution_image_url.");
    return;
  }

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  let attached = 0, missing = 0, skipped = 0;
  for (const m of manifest) {
    const { data: q, error } = await client
      .from("questions")
      .select("id, solution_image_url")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", ch.sourceFile)
      .eq("question_number", m.ref)
      .maybeSingle();
    if (error) throw new Error(`"${m.ref}" lookup: ${error.message}`);
    if (!q) { console.log(`  "${m.ref}": NO committed row — skipping`); missing++; continue; }
    if (q.solution_image_url && !force) { console.log(`  "${m.ref}": solution_image_url already set — skipping (use --force)`); skipped++; continue; }
    const path = await uploadImage(client, ORG_ID, readFileSync(resolvePng(m.png)), "image/png");
    const { error: uErr } = await client.from("questions").update({ solution_image_url: path }).eq("id", q.id);
    if (uErr) throw new Error(`"${m.ref}" set solution_image_url: ${uErr.message}`);
    console.log(`  "${m.ref}": attached ${path}`);
    attached++;
  }
  console.log(`\ndone. attached ${attached}, skipped ${skipped}, missing-row ${missing}.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
