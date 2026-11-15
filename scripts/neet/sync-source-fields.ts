/**
 * Copy a grounding fix file's stems and solutions into the NEET source JSON, so a rebuild from
 * source cannot bring the old text back (scripts/grounding/apply-fix.ts writes the bank only).
 *
 *   npx tsx scripts/neet/sync-source-fields.ts <fix-name>           # dry run
 *   npx tsx scripts/neet/sync-source-fields.ts <fix-name> --apply   # write source files
 *
 * Reads scripts/grounding/data/<fix-name>.fixes.json ([{ id, text?, solution? }]). Each row's
 * entry is found by source_file + question_number (scripts/neet/data, scripts/pariksha/data) and
 * must be found exactly once; only "stem" and "solution" are touched, as text (patchEntryFields).
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { DATA as NEET_DATA, EXAM_ID, PAPERS } from "./config";
import { DATA as PARIKSHA_DATA, TESTS } from "../pariksha/config";
import { isQuestionFile, patchEntryFields, sourceKeyFor } from "./retaxLib";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

type Fix = { id: string; text?: string; solution?: string };

async function main() {
  const name = process.argv[2];
  const apply = process.argv.includes("--apply");
  if (!name || name.startsWith("--")) throw new Error("usage: sync-source-fields.ts <fix-name> [--apply]");
  const fixes: Fix[] = JSON.parse(readFileSync(join("scripts", "grounding", "data", `${name}.fixes.json`), "utf8"));

  const neetPapers = Object.fromEntries(Object.values(PAPERS).map((p) => [p.id, p.sourceFile]));
  const parikshaTests = Object.fromEntries(Object.values(TESTS).map((t) => [t.id, t.sourceFile]));
  const raw = new Map<string, string>();
  const dirty = new Set<string>();
  const errors: string[] = [];

  for (const f of fixes) {
    const fields: Record<string, string> = {};
    if (f.text !== undefined) fields.stem = f.text;
    if (f.solution !== undefined) fields.solution = f.solution;
    if (!Object.keys(fields).length) continue;
    const { data, error } = await db.from("questions").select("source_file, question_number, exam_id").eq("id", f.id).single();
    if (error || !data) {
      errors.push(`${f.id}: not found`);
      continue;
    }
    if (data.exam_id !== EXAM_ID) {
      errors.push(`${f.id}: not a NEET row`);
      continue;
    }
    const key = sourceKeyFor(data.source_file, neetPapers, parikshaTests);
    if (!key) {
      errors.push(`${f.id}: no JSON source known for ${data.source_file}`);
      continue;
    }
    const dir = key.lane === "neet" ? NEET_DATA : PARIKSHA_DATA;
    let matched = 0;
    const patched = new Map<string, string>();
    for (const n of readdirSync(dir).filter((x) => x.startsWith(key.prefix) && x.endsWith(".json"))) {
      const p = join(dir, n);
      if (!raw.has(p)) raw.set(p, readFileSync(p, "utf8"));
      if (!isQuestionFile(JSON.parse(raw.get(p)!))) continue;
      try {
        const r = patchEntryFields(raw.get(p)!, String(data.question_number), fields);
        matched += r.matched;
        if (r.matched) patched.set(p, r.text);
      } catch (e) {
        errors.push(`${f.id}: ${(e as Error).message}`);
      }
    }
    if (matched !== 1) {
      errors.push(`${f.id}: ${matched} source entries numbered ${data.question_number} under ${key.prefix}*`);
      continue;
    }
    for (const [p, text] of patched)
      if (text !== raw.get(p)) {
        raw.set(p, text);
        dirty.add(p);
      }
  }

  console.log(`fixes ${fixes.length} · source files to rewrite ${dirty.size} · errors ${errors.length}`);
  for (const e of errors) console.log(`  ERROR ${e}`);
  if (errors.length) process.exit(1);
  if (!apply) return console.log("dry run: nothing written (add --apply)");
  for (const p of dirty) writeFileSync(p, raw.get(p)!);
  console.log(`wrote ${dirty.size} source files`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
