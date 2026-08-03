/**
 * Seed the syllabus concept map (migration 0065).
 *
 *   npx tsx scripts/syllabus/seed.ts                      # dry-run, writes nothing
 *   npx tsx scripts/syllabus/seed.ts --apply              # write
 *   npx tsx scripts/syllabus/seed.ts --subject=physics    # another subject
 *
 * Reads the State Board seed files named by the subject registry (Chemistry
 * unless --subject says otherwise) — the Maharashtra State Board Std XI/XII
 * books' own numbered section headings, extracted from the chapter PDFs.
 *
 * Idempotent: upserts on (source, class, subject, section_no), so a re-run is a
 * no-op and a corrected concept title overwrites in place. It deliberately does
 * NOT touch syllabus_concept_exams — applicability is a reviewed judgement, and
 * re-seeding the spine must never silently reset it.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { findDuplicateKeys, validateConceptRow, type ConceptRow } from "./lib";
import { requireSubjectArg } from "./subject-arg";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

function load(file: string): ConceptRow[] {
  const path = join(process.cwd(), "scripts", "syllabus", "data", file);
  if (!existsSync(path)) throw new Error(`missing seed file: ${path}`);
  const rows = JSON.parse(readFileSync(path, "utf8")) as ConceptRow[];
  if (!Array.isArray(rows) || rows.length === 0) throw new Error(`empty seed file: ${file}`);
  return rows;
}

async function main() {
  const apply = process.argv.includes("--apply");
  const cfg = requireSubjectArg(process.argv);
  loadEnv();

  console.log(`subject: ${cfg.label}`);
  const rows: ConceptRow[] = [];
  for (const file of cfg.seedFiles) {
    const loaded = load(file);
    console.log(`  ${file}: ${loaded.length} concepts`);
    rows.push(...loaded);
  }

  const errors = rows.flatMap((row, i) => validateConceptRow(row, i));
  if (errors.length) {
    console.error(`\nREFUSING TO WRITE — ${errors.length} invalid row(s):`);
    for (const e of errors.slice(0, 20)) console.error("  " + e);
    process.exit(1);
  }

  const dupes = findDuplicateKeys(rows);
  if (dupes.length) {
    console.error(`\nREFUSING TO WRITE — duplicate keys would upsert onto each other:`);
    for (const d of dupes.slice(0, 20)) console.error("  " + d);
    process.exit(1);
  }

  // The `subject` written is the FILE's, not the flag's, and the upsert key
  // includes it — so a file mislabelled "Chemistry" seeded under --subject=physics
  // would silently overwrite the Chemistry spine. Refuse rather than reconcile:
  // the file is the source of record, and rewriting its subject here would hide
  // an authoring mistake instead of surfacing it.
  const wrong = [...new Set(rows.map((r) => r.subject))].filter((s) => s !== cfg.subject);
  if (wrong.length) {
    console.error(
      `\nREFUSING TO WRITE — seed files declare subject ${wrong
        .map((s) => `"${s}"`)
        .join(", ")} but --subject resolves to "${cfg.subject}".`,
    );
    process.exit(1);
  }

  const byClass = new Map<number, number>();
  for (const r of rows) byClass.set(r.class, (byClass.get(r.class) ?? 0) + 1);
  console.log(`\nTotal ${rows.length} concepts:`);
  for (const [cls, n] of [...byClass].sort()) console.log(`  Std ${cls}: ${n}`);

  if (!apply) {
    console.log("\nDRY RUN — nothing written. Re-run with --apply to seed.");
    return;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY required");
  const db = createClient(url, key, { auth: { persistSession: false } });

  // Chunked: one 864-row upsert is well within PostgREST limits, but chunking
  // keeps the failure blast radius small and the progress legible.
  const CHUNK = 200;
  let written = 0;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const chunk = rows.slice(i, i + CHUNK);
    const { error } = await db
      .from("syllabus_concepts")
      .upsert(chunk, { onConflict: "source,class,subject,section_no" });
    if (error) throw new Error(`upsert failed at row ${i}: ${error.message}`);
    written += chunk.length;
    console.log(`  upserted ${written}/${rows.length}`);
  }

  const { count, error: countError } = await db
    .from("syllabus_concepts")
    .select("id", { count: "exact", head: true });
  if (countError) throw new Error(countError.message);
  console.log(`\nDone. syllabus_concepts now holds ${count} rows.`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
