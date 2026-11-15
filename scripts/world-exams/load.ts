/**
 * npm run world-exams:load -- --file=<path to JSON> [--target=test] [--apply] [--prune]
 *
 * Writes the world-exams master list (migration 0260) that /dashboard/world-exams
 * shows. The database is the source of truth; the JSON file is only how rows get
 * there, and it must live OUTSIDE the repo (the repo is public and the list
 * carries rights analysis and revenue estimates). The script refuses a file
 * inside the repo.
 *
 * File shape: { "exams": [<world_exams row>...], "notes": [<world_exam_notes row>...] }
 * in the table's own column names; checked by parseLoadFile (src/lib/worldExams/model.ts),
 * the same rules the page applies when it reads.
 *
 * DRY RUN by default: prints what it would add, change and (with --prune) remove.
 * --apply upserts every row. --prune also deletes rows that are in the table but
 * not in the file; without it nothing is ever deleted. --target=test writes to the
 * test project (.env.test.local) instead of production.
 */
import { config } from "dotenv";
import { readFileSync } from "node:fs";
import { resolve, relative, isAbsolute } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { parseLoadFile } from "../../src/lib/worldExams/model";

const args = process.argv.slice(2);
const flag = (name: string) => args.find((a) => a.startsWith(`--${name}=`))?.split("=").slice(1).join("=");
const has = (name: string) => args.includes(`--${name}`);

const file = flag("file");
const target = flag("target") ?? "prod";
const apply = has("apply");
const prune = has("prune");

if (!file || !["prod", "test"].includes(target)) {
  console.error("usage: npm run world-exams:load -- --file=<json outside the repo> [--target=test] [--apply] [--prune]");
  process.exit(1);
}

const abs = resolve(file);
const rel = relative(process.cwd(), abs);
if (!rel.startsWith("..") && !isAbsolute(rel)) {
  console.error(`refusing ${abs}: the file is inside the repo, which is public. Keep it outside (e.g. the session scratchpad).`);
  process.exit(1);
}

config({ path: target === "test" ? ".env.test.local" : ".env.local", override: true });
const url = target === "test" ? process.env.TEST_SUPABASE_URL : process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = target === "test" ? process.env.TEST_SUPABASE_SERVICE_ROLE_KEY : process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error(`missing Supabase URL or service-role key for ${target}`);
  process.exit(1);
}

async function main() {
  // Strip a byte-order mark: PowerShell's Set-Content writes one.
  const { exams, notes } = parseLoadFile(JSON.parse(readFileSync(abs, "utf8").replace(/^﻿/, "")));
  const db = createClient(url!, key!, { auth: { persistSession: false } });

  const [haveExams, haveNotes] = await Promise.all([
    db.from("world_exams").select("id"),
    db.from("world_exam_notes").select("id"),
  ]);
  if (haveExams.error) throw new Error(`read world_exams: ${haveExams.error.message}`);
  if (haveNotes.error) throw new Error(`read world_exam_notes: ${haveNotes.error.message}`);
  const examIds = new Set((haveExams.data ?? []).map((r) => r.id as string));
  const noteIds = new Set((haveNotes.data ?? []).map((r) => r.id as string));

  const goneExams = [...examIds].filter((id) => !exams.some((e) => e.id === id));
  const goneNotes = [...noteIds].filter((id) => !notes.some((n) => n.id === id));

  console.log(`target: ${target}`);
  console.log(`exams: ${exams.length} in file (${exams.filter((e) => !examIds.has(e.id)).length} new), ${goneExams.length} in table but not in file`);
  console.log(`notes: ${notes.length} in file (${notes.filter((n) => !noteIds.has(n.id)).length} new), ${goneNotes.length} in table but not in file`);
  if (goneExams.length || goneNotes.length) {
    console.log(`not in file: ${[...goneExams, ...goneNotes].join(", ")}${prune ? " (will be deleted)" : " (kept; --prune deletes them)"}`);
  }

  if (!apply) {
    console.log("dry run: nothing written. Add --apply to save.");
    return;
  }

  // One transaction in the database (load_world_exams, migration 0260): ranks
  // cleared and re-set, every row upserted, and with --prune the missing rows
  // deleted. A failure anywhere leaves the old list as it was.
  const { data, error } = await db.rpc("load_world_exams", { p_exams: exams, p_notes: notes, p_prune: prune });
  if (error) throw new Error(`load_world_exams: ${error.message}`);
  const r = data as { exams: number; notes: number; deleted: number };
  console.log(`saved ${r.exams} exams and ${r.notes} notes to ${target}${prune ? `; deleted ${r.deleted}` : ""}.`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
