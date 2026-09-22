/**
 * Upload the IPMAT figures and attach them — Phase 4, step 2.
 *
 *   python scripts/ipmat/fetch_figures.py               # first: download + convert
 *   npx tsx scripts/ipmat/attach-figures.ts             # dry run
 *   npx tsx scripts/ipmat/attach-figures.ts -- --apply
 *
 * Reads `out/figures/manifest.json` and writes the storage PATH (not a URL)
 * into `questions.image_url` / `options.image_url`, matching how every other
 * ingestion pass in this repo does it.
 *
 * A MULTI-FIGURE STEM gets its composite, not its first panel. A question row
 * carries a single `image_url`, so attaching only the first of three dice views
 * ships a question that cannot be answered from what is on screen — the exact
 * failure `scripts/jee/compose_figures.py` was written to remove.
 *
 * A PICTURE-OPTION row has an empty option text and its image on the option.
 * Those seven rows are the reason `options.image_url` exists (migration 0007),
 * and until this pass runs they are genuinely unanswerable — which is safe only
 * because everything is PRIVATE and out of `EXAM_REGISTRY`.
 *
 * Idempotent in both directions: a slot whose `image_url` is already set is
 * skipped, and nothing is uploaded for it, so a re-run costs nothing and cannot
 * orphan a blob.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { uploadImage } from "../../src/lib/storage/images";
import { sourceFileFor, type IpmatExamSlug } from "./config";

const FIG_DIR = join(__dirname, "out", "figures");
const MANIFEST = join(FIG_DIR, "manifest.json");
const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f"; // LWS Pune

type Manifest = {
  figures: Record<string, { key: string; file: string; bytes: number; sourceFormat: string }>;
  composites: Record<string, { file: string; bytes: number; panels: number }>;
  rows: Record<
    string,
    {
      exam: IpmatExamSlug;
      year: number;
      section: string;
      questionNumber: number;
      stem: string[];
      options: Record<string, string>;
    }
  >;
};

function loadEnv() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

/** Upload one local PNG, returning its storage path. */
async function put(client: SupabaseClient, file: string): Promise<string> {
  const path = join(FIG_DIR, file);
  if (!existsSync(path)) throw new Error(`missing local figure: ${path}`);
  return uploadImage(client, ORG_ID, readFileSync(path), "image/png");
}

async function main() {
  const apply = process.argv.includes("--apply");
  loadEnv();

  if (!existsSync(MANIFEST)) {
    console.error(`no manifest at ${MANIFEST}\nrun: python scripts/ipmat/fetch_figures.py`);
    process.exit(1);
  }
  const manifest = JSON.parse(readFileSync(MANIFEST, "utf8")) as Manifest;
  const rows = Object.entries(manifest.rows);
  console.log(`${apply ? "ATTACHING" : "DRY RUN"}: ${rows.length} rows carrying a figure\n`);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env.local");
    process.exit(1);
  }
  const client = createClient(url, key, { auth: { persistSession: false } });

  let stemSet = 0;
  let optSet = 0;
  let stemSkipped = 0;
  let optSkipped = 0;
  const problems: string[] = [];

  for (const [rowId, info] of rows) {
    const sourceFile = sourceFileFor(info.exam, info.year, info.section);
    const label = `${info.exam} ${info.year} ${info.section} Q${info.questionNumber}`;

    const { data: q, error } = await client
      .from("questions")
      .select("id, image_url, options(id, label, image_url)")
      .eq("source_file", sourceFile)
      .eq("question_number", String(info.questionNumber))
      .limit(1)
      .maybeSingle();
    if (error) {
      problems.push(`${label}: lookup failed: ${error.message}`);
      continue;
    }
    if (!q) {
      // A row in the manifest with no DB row means the commit and the figure
      // pass disagree about what is committable — report, never skip quietly.
      problems.push(`${label}: no question row for ${sourceFile} Q${info.questionNumber}`);
      continue;
    }

    // ---- the stem figure: composite when there are several panels
    const composite = manifest.composites[rowId];
    const stemFile = composite
      ? composite.file
      : info.stem.length === 1
        ? manifest.figures[info.stem[0]]?.file
        : undefined;

    if (info.stem.length > 0 && !stemFile) {
      problems.push(`${label}: ${info.stem.length} stem figure(s) but no file to attach`);
    } else if (stemFile) {
      if (q.image_url) {
        stemSkipped++;
      } else if (!apply) {
        stemSet++;
        console.log(`  ${label}  stem <- ${stemFile}${composite ? ` (${composite.panels} panels)` : ""}`);
      } else {
        const path = await put(client, stemFile);
        const { error: uErr } = await client.from("questions").update({ image_url: path }).eq("id", q.id);
        if (uErr) problems.push(`${label}: stem image_url: ${uErr.message}`);
        else {
          stemSet++;
          console.log(`  ${label}  stem <- ${stemFile}${composite ? ` (${composite.panels} panels)` : ""}`);
        }
      }
    }

    // ---- picture options
    const dbOptions = (q.options ?? []) as { id: string; label: string; image_url: string | null }[];
    for (const [optLabel, optUrl] of Object.entries(info.options)) {
      const file = manifest.figures[optUrl]?.file;
      if (!file) {
        problems.push(`${label} opt ${optLabel}: no local file for ${optUrl}`);
        continue;
      }
      const opt = dbOptions.find((o) => o.label === optLabel);
      if (!opt) {
        problems.push(`${label} opt ${optLabel}: no such option row`);
        continue;
      }
      if (opt.image_url) {
        optSkipped++;
        continue;
      }
      if (!apply) {
        optSet++;
        console.log(`  ${label}  opt ${optLabel} <- ${file}`);
        continue;
      }
      const path = await put(client, file);
      const { error: oErr } = await client.from("options").update({ image_url: path }).eq("id", opt.id);
      if (oErr) problems.push(`${label} opt ${optLabel}: ${oErr.message}`);
      else {
        optSet++;
        console.log(`  ${label}  opt ${optLabel} <- ${file}`);
      }
    }
  }

  console.log("");
  console.log(`stem figures ${apply ? "attached" : "to attach"}: ${stemSet}  (already set: ${stemSkipped})`);
  console.log(`option images ${apply ? "attached" : "to attach"}: ${optSet}  (already set: ${optSkipped})`);
  if (problems.length) {
    console.log(`\nPROBLEMS (${problems.length}):`);
    for (const p of problems) console.log("  " + p);
  }
  if (!apply) console.log("\n[dry run] nothing uploaded. Pass --apply.");
  if (problems.length) process.exit(1);
}

void main();
