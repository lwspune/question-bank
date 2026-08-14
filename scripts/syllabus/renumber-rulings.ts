/**
 * Re-point authored bank-spine rulings after a spine re-ingest renumbered them.
 *
 *   1. BEFORE the ingest:
 *      npx tsx scripts/syllabus/renumber-rulings.ts --subject=chemistry --snapshot
 *   2. run ingest-bank-spine.ts --apply
 *   3. AFTER the ingest (dry run, then --apply):
 *      npx tsx scripts/syllabus/renumber-rulings.ts --subject=chemistry \
 *        --files=chem-jee-rulings,chem-cet-rulings,chem-nda-rulings
 *
 * Why a snapshot is required rather than deriving the mapping afterwards: the
 * ruling files record only (section_no, subtopic), and section_no is positional.
 * Once the ingest has run, the chapter each old ref belonged to is gone — and the
 * chapter is exactly what disambiguates the six Chemistry subtopic names that
 * live in two chapters each. Step 1 captures it while it still exists.
 *
 * Every mapping decision, and every refusal, is in scripts/lib/renumberRulings.ts.
 * This file is I/O only.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { splitPyqCount } from "../../src/lib/syllabus/summary";
import { renumberRulings, type SpineRow } from "../lib/renumberRulings";
import { requireSubjectArg } from "./subject-arg";

const DATA_DIR = join(process.cwd(), "scripts", "syllabus", "data");

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

function snapshotPath(subject: string): string {
  return join(DATA_DIR, `.spine-snapshot-${subject.toLowerCase()}.json`);
}

function flag(name: string): string | undefined {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit?.slice(name.length + 3);
}

/** Every bank-spine row of a subject, keyed by source. */
async function readSpine(db: SupabaseClient, subject: string): Promise<Record<string, SpineRow[]>> {
  const out: Record<string, SpineRow[]> = {};
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("syllabus_concepts")
      .select("source,section_no,chapter_name,concept")
      .eq("subject", subject)
      .like("source", "%bank taxonomy")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    const rows = (data ?? []) as unknown as {
      source: string;
      section_no: string;
      chapter_name: string;
      concept: string;
    }[];
    for (const r of rows) {
      (out[r.source] ??= []).push({
        sectionNo: r.section_no,
        chapter: r.chapter_name,
        // The PYQ count rides in the name and CHANGES on every re-ingest, so it
        // can play no part in identity — strip it the way the page does.
        subtopic: splitPyqCount(r.concept).name,
      });
    }
    if (rows.length < 1000) break;
  }
  return out;
}

type Ruling = { section_no: string; subtopic: string; [k: string]: unknown };
type RulingFile = { exam: string; subject: string; source: string; rulings: Ruling[] };

async function main() {
  const cfg = requireSubjectArg(process.argv);
  const apply = process.argv.includes("--apply");
  loadEnv();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("service-role env required");
  const db = createClient(url, key, { auth: { persistSession: false } });

  const spine = await readSpine(db, cfg.subject);
  const path = snapshotPath(cfg.subject);

  if (process.argv.includes("--snapshot")) {
    writeFileSync(path, JSON.stringify(spine, null, 2));
    const total = Object.values(spine).reduce((n, r) => n + r.length, 0);
    console.log(`Snapshot written: ${path}`);
    for (const [source, rows] of Object.entries(spine)) {
      console.log(`  ${source.padEnd(28)} ${String(rows.length).padStart(4)} rows`);
    }
    console.log(`  ${"total".padEnd(28)} ${String(total).padStart(4)} rows`);
    return;
  }

  if (!existsSync(path)) {
    throw new Error(`no snapshot at ${path} — run with --snapshot BEFORE the ingest`);
  }
  const before = JSON.parse(readFileSync(path, "utf8")) as Record<string, SpineRow[]>;

  const names = (flag("files") ?? "").split(",").filter(Boolean);
  if (names.length === 0) throw new Error("usage: --files=a,b,c");

  // Resolve EVERY file before writing ANY of them. The three files are one
  // logical unit — the refs were assigned across all three at once — so applying
  // the two that resolved would leave the spine half-renumbered.
  const planned: { file: string; body: RulingFile; text: string; changed: number }[] = [];

  for (const name of names) {
    const filePath = join(DATA_DIR, `${name}.json`);
    if (!existsSync(filePath)) throw new Error(`missing rulings file: ${filePath}`);
    const body = JSON.parse(readFileSync(filePath, "utf8")) as RulingFile;
    if (body.subject !== cfg.subject) {
      throw new Error(`${name}: declares subject "${body.subject}", expected "${cfg.subject}"`);
    }

    const oldRows = before[body.source];
    const newRows = spine[body.source];
    if (!oldRows) throw new Error(`${name}: snapshot has no rows for source "${body.source}"`);
    if (!newRows) throw new Error(`${name}: live spine has no rows for source "${body.source}"`);

    const res = renumberRulings(
      oldRows,
      newRows,
      body.rulings.map((r) => ({ sectionNo: r.section_no, subtopic: r.subtopic })),
    );
    if (!res.ok) {
      console.error(`\n${name}: REFUSING — ${res.problems.length} problem(s)`);
      for (const p of res.problems.slice(0, 20)) console.error(`  ${p}`);
      if (res.problems.length > 20) console.error(`  … ${res.problems.length - 20} more`);
      process.exit(1);
    }

    let changed = 0;
    for (const r of body.rulings) {
      const next = res.mapping.get(r.section_no)!;
      if (next !== r.section_no) changed += 1;
      r.section_no = next;
    }
    planned.push({
      file: filePath,
      body,
      text: `${JSON.stringify(body, null, 2)}\n`,
      changed,
    });
    console.log(
      `${name.padEnd(22)} ${String(body.rulings.length).padStart(4)} rulings, ` +
        `${String(changed).padStart(4)} re-pointed ` +
        `(${body.rulings[0].section_no} … ${body.rulings[body.rulings.length - 1].section_no})`,
    );
  }

  if (!apply) {
    console.log("\nDRY RUN — nothing written. Re-run with --apply.");
    return;
  }
  for (const p of planned) writeFileSync(p.file, p.text);
  console.log(`\nWrote ${planned.length} file(s). Re-commit each with commit-bank-rulings.ts.`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
