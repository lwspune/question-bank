/**
 * Assert the LIVE answer key of every row `apply-key-fixes.ts` adjudicated.
 *
 *   npx tsx scripts/cds/verify-keys.ts
 *
 * The source JSON and the database are two different stores, and the path
 * between them (commit -> resync -> flip) has several steps that can each
 * half-apply. `apply-key-fixes.ts` proves the SOURCE is right; this proves the
 * BANK is. It reads the expected keys straight from KEY_FIXES so the two can
 * never drift — there is no second copy of the answers to maintain.
 *
 * Exits non-zero on any mismatch. Read-only.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, PAPERS } from "./config";
import { KEY_FIXES } from "./apply-key-fixes";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  let ok = 0;
  const bad: string[] = [];
  for (const f of KEY_FIXES) {
    const sourceFile = PAPERS[f.paper].sourceFile;
    const { data, error } = await db
      .from("questions")
      .select("id, visibility, options(label, text, is_correct)")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", sourceFile)
      .eq("question_number", String(f.number));
    if (error) throw new Error(`${f.paper} Q${f.number}: ${error.message}`);
    const rows = data ?? [];
    if (rows.length !== 1) {
      bad.push(`${f.paper} Q${f.number}: expected 1 live row, found ${rows.length}`);
      continue;
    }
    const row = rows[0] as unknown as {
      visibility: string;
      options: { label: string; text: string; is_correct: boolean }[];
    };
    const correct = row.options.filter((o) => o.is_correct);
    if (correct.length !== 1) {
      bad.push(`${f.paper} Q${f.number}: ${correct.length} options flagged correct`);
      continue;
    }
    if (correct[0].label !== f.to) {
      bad.push(`${f.paper} Q${f.number}: live key ${correct[0].label}, expected ${f.to}`);
      continue;
    }
    // The whole defect class was a correct answer sitting at the wrong letter,
    // so also assert the option set is now distinct — a surviving duplicate
    // would mean the key is "right" while still ambiguous to a student.
    const texts = row.options.map((o) => o.text.trim());
    if (new Set(texts).size !== texts.length) {
      bad.push(`${f.paper} Q${f.number}: options still contain a duplicate`);
      continue;
    }
    if (row.visibility !== "PUBLIC") {
      bad.push(`${f.paper} Q${f.number}: visibility is ${row.visibility}, expected PUBLIC`);
      continue;
    }
    ok += 1;
  }

  console.log(`verified ${ok}/${KEY_FIXES.length} adjudicated keys live, PUBLIC, and unambiguous`);
  if (bad.length) {
    console.log(`\n✗ ${bad.length} problem(s):`);
    bad.forEach((b) => console.log(`    ${b}`));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
