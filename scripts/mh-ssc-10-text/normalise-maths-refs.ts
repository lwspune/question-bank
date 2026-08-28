/**
 * Normalise Maths `question_number` refs onto the house style: `Ex 1.1 Q.3`, not
 * `Ex 1.1 Q3`.
 *
 *   npx tsx scripts/mh-ssc-10-text/normalise-maths-refs.ts          # dry-run
 *   npx tsx scripts/mh-ssc-10-text/normalise-maths-refs.ts --apply
 *
 * WHY. `MATHS_TRANSCRIPTION_BRIEF.md` §2 and the shipped `pythagoras-10` rows both
 * use `Q.` with a dot; `AGENT_BRIEF.md` was written later and said `Q` without one.
 * Twelve chapters were ingested in parallel against the two documents and split
 * almost exactly in half. Three agents flagged the contradiction independently.
 * The brief now defers to the older file; this fixes the rows already written.
 *
 * SAFE, and here is why each part is safe:
 *   - `question_number` is NOT part of `content_hash` (stem + options + answer, or
 *     stem + context for subjective), so no row's identity moves and nothing that
 *     references a row by id is affected.
 *   - `sections.json` routing keys on the BLOCK prefix (`"Ex 1.1 "`, `"PS1 "`),
 *     which is identical before and after — verified by re-running
 *     `backfill-sections.ts` afterwards.
 *   - The transform only ever inserts a dot after a `Q` that is immediately
 *     followed by a digit. It cannot touch a ref that already has one, so it is
 *     idempotent, and it cannot touch a `SolvedEx.` ref at all.
 *
 * It also rewrites the `ref` in the committed source JSONs, because a DB-only fix
 * is reverted by the next re-commit.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { CHAPTERS, DATA, EXAM_ID } from "./config";

/** `Ex 1.1 Q3` -> `Ex 1.1 Q.3`; `PS4 Q10(2)` -> `PS4 Q.10(2)`. Idempotent. */
export function houseRef(ref: string): string {
  return ref.replace(/\bQ(?=\d)/g, "Q.");
}

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const apply = process.argv.includes("--apply");
  loadEnv();

  // Self-test before touching anything: the transform must do what the comment says.
  const cases: Array<[string, string]> = [
    ["Ex 1.1 Q3", "Ex 1.1 Q.3"],
    ["Ex 1.1 Q.3", "Ex 1.1 Q.3"],           // idempotent
    ["PS4 Q10(2)", "PS4 Q.10(2)"],
    ["Similarity SolvedEx.2", "Similarity SolvedEx.2"], // untouched
    ["Ex 6.1 Q.6 (12)", "Ex 6.1 Q.6 (12)"],
  ];
  for (const [input, want] of cases) {
    const got = houseRef(input);
    if (got !== want) throw new Error(`self-test failed: "${input}" -> "${got}", expected "${want}"`);
  }

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const maths = Object.values(CHAPTERS).filter((c) => c.subjectName === "Algebra" || c.subjectName === "Geometry");
  let dbChanged = 0;
  let fileChanged = 0;

  for (const ch of maths) {
    const { data, error } = await client
      .from("questions")
      .select("id, question_number")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", ch.sourceFile)
      .eq("question_kind", "practice");
    if (error) throw new Error(`${ch.id}: ${error.message}`);
    const rows = (data ?? []) as Array<{ id: string; question_number: string }>;
    const todo = rows.filter((r) => houseRef(r.question_number) !== r.question_number);
    if (!todo.length) {
      if (rows.length) console.log(`  ok    ${ch.id.padEnd(32)} ${rows.length} rows already house style`);
      continue;
    }

    // A rename must not collide: refs are unique within a chapter and must stay so.
    const after = new Set(rows.map((r) => houseRef(r.question_number)));
    if (after.size !== rows.length) {
      throw new Error(`${ch.id}: normalising would collide — ${rows.length} refs collapse to ${after.size}`);
    }

    console.log(`  FIX   ${ch.id.padEnd(32)} ${todo.length} of ${rows.length} rows`);
    if (apply) {
      for (const r of todo) {
        const { error: uErr, count } = await client
          .from("questions")
          .update({ question_number: houseRef(r.question_number) }, { count: "exact" })
          .eq("id", r.id);
        if (uErr) throw new Error(`${ch.id} ${r.question_number}: ${uErr.message}`);
        if (count !== 1) throw new Error(`${ch.id} ${r.question_number}: matched ${count} rows`);
        dbChanged++;
      }
    } else {
      dbChanged += todo.length;
    }

    // Source of record: every JSON for this chapter carrying a `ref`.
    for (const f of readdirSync(DATA).filter((n) => n.startsWith(`${ch.id}.`) && n.endsWith(".json"))) {
      const path = join(DATA, f);
      const raw = readFileSync(path, "utf8");
      let parsed: any;
      try { parsed = JSON.parse(raw); } catch { continue; }
      if (!Array.isArray(parsed)) continue;              // sections.json is an array too — handled below
      let touched = false;
      for (const row of parsed) {
        if (row && typeof row.ref === "string") {
          const next = houseRef(row.ref);
          if (next !== row.ref) { row.ref = next; touched = true; }
        }
      }
      if (touched) {
        fileChanged++;
        console.log(`          ${apply ? "rewrote" : "would rewrite"} ${f}`);
        if (apply) writeFileSync(path, JSON.stringify(parsed, null, 2) + "\n", "utf8");
      }
    }
  }

  console.log(
    apply
      ? `\nnormalised ${dbChanged} row(s) and ${fileChanged} source file(s).`
      : `\n[dry-run] ${dbChanged} row(s) and ${fileChanged} source file(s) would change. Pass --apply.`,
  );
  console.log("After applying, re-run backfill-sections.ts for each changed chapter to");
  console.log("prove every ref still routes to its block.");
}

main().catch((e) => { console.error(e); process.exit(1); });
