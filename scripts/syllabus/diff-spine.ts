/**
 * Diff a re-extracted spine data file against what is CURRENTLY in the database.
 *
 *   npx tsx scripts/syllabus/diff-spine.ts --subject=physics --source=NCERT
 *
 * Re-running an extractor after a bug fix changes an unknown number of rows, and
 * "the counts went up by 9" does not say WHICH 9 or whether something was also
 * lost. This prints added / removed / retitled per class before anything is
 * re-seeded, so a fix can be inspected rather than trusted.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { requireSubjectArg } from "./subject-arg";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type Row = { section_no: string; concept: string; class: number };

async function main() {
  const cfg = requireSubjectArg(process.argv);
  const srcArg = process.argv.find((a) => a.startsWith("--source="));
  const source = srcArg ? srcArg.slice("--source=".length) : "NCERT";
  const fileArg = process.argv.find((a) => a.startsWith("--files="));
  const files = fileArg
    ? fileArg.slice("--files=".length).split(",")
    : cfg.ncertSeedFiles;
  loadEnv();

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const { data, error } = await db
    .from("syllabus_concepts")
    .select("section_no,concept,class")
    .eq("subject", cfg.subject)
    .eq("source", source);
  if (error) throw new Error(error.message);

  const byClass = new Map<number, Map<string, string>>();
  for (const r of (data ?? []) as Row[]) {
    if (!byClass.has(r.class)) byClass.set(r.class, new Map());
    byClass.get(r.class)!.set(r.section_no, r.concept);
  }

  let totalAdded = 0, totalRemoved = 0, totalChanged = 0;
  for (const file of files) {
    const rows = JSON.parse(
      readFileSync(join(process.cwd(), "scripts", "syllabus", "data", file), "utf8"),
    ) as Row[];
    const cls = rows[0]?.class;
    const nw = new Map(rows.map((r) => [r.section_no, r.concept]));
    const old = byClass.get(cls) ?? new Map();

    const added = [...nw.keys()].filter((k) => !old.has(k));
    const removed = [...old.keys()].filter((k) => !nw.has(k));
    const changed = [...nw.keys()].filter((k) => old.has(k) && old.get(k) !== nw.get(k));
    totalAdded += added.length;
    totalRemoved += removed.length;
    totalChanged += changed.length;

    console.log(
      `\n--- Std ${cls} (${source}): DB ${old.size} -> file ${nw.size}` +
        `  | +${added.length} -${removed.length} ~${changed.length}`,
    );
    for (const k of added) console.log(`   + ${k.padStart(8)}  ${nw.get(k)!.slice(0, 60)}`);
    for (const k of removed) console.log(`   - ${k.padStart(8)}  ${old.get(k)!.slice(0, 60)}`);
    for (const k of changed) {
      console.log(`   ~ ${k.padStart(8)}  ${JSON.stringify(old.get(k)!.slice(0, 46))}`);
      console.log(`     ${" ".padStart(8)}  -> ${JSON.stringify(nw.get(k)!.slice(0, 46))}`);
    }
  }
  console.log(`\nTOTAL  +${totalAdded} added  -${totalRemoved} removed  ~${totalChanged} retitled`);
  if (totalRemoved) {
    console.log("REMOVED rows are the ones to scrutinise: a fix should not lose sections.");
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
