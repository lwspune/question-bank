/**
 * Push this chapter's cropped figures to Supabase Storage.
 *
 *   npx tsx scripts/ppt/motion-in-a-plane/upload-figures.ts        # dry run
 *   npx tsx scripts/ppt/motion-in-a-plane/upload-figures.ts --apply
 *
 * WHY STORAGE RATHER THAN GIT. One chapter is ~870 KB of PNGs, which is fine to
 * commit. Measured across the State Board PCM books there are ~743 figures in
 * Std XI alone (Physics 258 · Chemistry 266 · Maths 219) — about 37 MB, and
 * roughly 75 MB with Std XII. Git keeps every blob forever, so committing them
 * is a permanent clone-size cost that grows with every chapter. Storage is the
 * right home; the repo keeps only `figures.json`, the filename → path map.
 *
 * Paths are DETERMINISTIC (`<org>/decks/<chapter>/<file>`) with upsert, unlike
 * `uploadImage`, which mints a random UUID per call. A re-run must overwrite the
 * same object rather than orphan the old one and mint a new path — otherwise
 * every re-crop leaks a file and invalidates the committed map.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { BUCKET } from "../../../src/lib/storage/imageUrl";
import { MAX_SIZE_BYTES } from "../../../src/lib/storage/images";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f"; // LWS Pune
const CHAPTER = "motion-in-a-plane";
const FIG_DIR = join(__dirname, "figures");
const MAP_FILE = join(__dirname, "figures.json");

export type FigureMap = {
  chapter: string;
  /** local filename → storage path */
  files: Record<string, string>;
  /** local filename → sha256, so a re-run can skip what has not changed */
  hashes: Record<string, string>;
};

function client(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set");
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

function localFigures(): string[] {
  if (!existsSync(FIG_DIR)) {
    throw new Error(`no figures/ — run: python scripts/ppt/${CHAPTER}/extract_figures.py`);
  }
  return readdirSync(FIG_DIR)
    .filter((f) => /^fig.*\.(png|jpg)$/.test(f))
    .sort();
}

function sha(buf: Buffer): string {
  return createHash("sha256").update(buf).digest("hex").slice(0, 16);
}

async function main() {
  const apply = process.argv.includes("--apply");
  const files = localFigures();
  if (!files.length) throw new Error("figures/ holds no fig*.png|jpg");

  const previous: FigureMap | null = existsSync(MAP_FILE)
    ? (JSON.parse(readFileSync(MAP_FILE, "utf8")) as FigureMap)
    : null;

  const next: FigureMap = { chapter: CHAPTER, files: {}, hashes: {} };
  const supabase = apply ? client() : null;
  let uploaded = 0;
  let skipped = 0;
  let bytes = 0;

  for (const name of files) {
    const buf = readFileSync(join(FIG_DIR, name));
    // The cap is enforced by the storage layer, which THROWS. Catch it here
    // with a message that names the file and the fix, rather than at the API.
    if (buf.length > MAX_SIZE_BYTES) {
      throw new Error(
        `${name} is ${Math.round(buf.length / 1024)} KB, over the ${
          MAX_SIZE_BYTES / 1024
        } KB storage cap.\n` +
          `extract_figures.py should have stepped it down — check its budget ladder.`
      );
    }
    const path = `${ORG_ID}/decks/${CHAPTER}/${name}`;
    const digest = sha(buf);
    next.files[name] = path;
    next.hashes[name] = digest;
    bytes += buf.length;

    if (previous?.hashes[name] === digest && previous.files[name] === path) {
      skipped += 1;
      continue;
    }
    if (supabase) {
      const mime = name.endsWith(".jpg") ? "image/jpeg" : "image/png";
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(path, buf, { contentType: mime, upsert: true });
      if (error) throw new Error(`upload failed for ${name}: ${error.message}`);
    }
    uploaded += 1;
    console.log(`  ${apply ? "uploaded" : "would upload"}  ${name}`);
  }

  // Anything the map used to carry but the figures dir no longer has is stale:
  // report it rather than silently dropping it, since the object is still
  // sitting in Storage costing money and confusing the next reader.
  for (const old of Object.keys(previous?.files ?? {})) {
    if (!(old in next.files)) {
      console.warn(`  ORPHAN in Storage (no longer produced locally): ${previous!.files[old]}`);
    }
  }

  if (apply) {
    writeFileSync(MAP_FILE, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  }
  console.log(
    `\n${files.length} figures, ${Math.round(bytes / 1024)} KB — ` +
      `${uploaded} ${apply ? "uploaded" : "to upload"}, ${skipped} unchanged`
  );
  if (!apply) console.log("DRY RUN — nothing written. Re-run with --apply.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
