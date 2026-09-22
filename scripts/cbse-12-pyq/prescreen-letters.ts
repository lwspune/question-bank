/**
 * Does any MCQ solution CONCLUDE a letter other than the one CBSE keyed —
 * checked BEFORE the solution is written to the bank?
 *
 *   npx tsx scripts/cbse-12-pyq/prescreen-letters.ts <paperId>
 *
 * WHY THIS RUNS BEFORE `apply-solutions`. `audit-keys` asks the same question,
 * but only of rows already in the bank, so its answer arrives after the row is
 * committed and the fix becomes a patch instead of an edit at source. This
 * reads the authored `<paperId>.topaper.json` and the keys straight from the
 * bank, so the disagreement surfaces while the prose is still a draft.
 *
 * It shares the REAL `concludedLetter` with `scripts/practice/audit-keys.ts`,
 * which is the point: a screen that re-implemented the rule could pass a
 * solution the gate then fails, and the whole value of an early check is that
 * it cannot disagree with the late one.
 *
 * THE DEFECT CLASS IT EXISTS FOR has now appeared four times in this pipeline,
 * every time as prose that names an option letter AFTER concluding:
 *   • ending on a bare letter — "... (A) and (C)."
 *   • naming a distractor late — "the trap is option (B) ..."
 *   • article-as-option — "the answer is a clean rational expression"
 *   • naming the numerically-matching letter on a VOIDED row
 * None is a physics error; all read as a wrong answer to `concludedLetter`, and
 * the last one is the worst, because a voided row has no key to contradict it.
 *
 * A CBSE-VOIDED row (no option keyed) expects `null`. A solution that concludes
 * ANY letter there is reported, since the row's whole point is that no option
 * is correct.
 *
 * TRIAGE, NOT A GATE — it exits 0 and reports. A disagreement is usually the
 * prose, but it can be the key: on `2026-55-4-1` Q1 the solution was right and
 * CBSE was not. Read the row before editing either.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { concludedLetter } from "../practice/audit-keys";
import { ORG_ID, EXAM_ID_CBSE_12 } from "./config";

type Row = { ref: string; format?: string; questionNumber?: string; solution?: string | null };

async function main() {
  const paperId = process.argv[2];
  if (!paperId) {
    console.error("usage: prescreen-letters.ts <paperId>   e.g. 2023-55-1-2");
    process.exit(1);
  }

  const path = join(__dirname, "data", `${paperId}.topaper.json`);
  if (!existsSync(path)) {
    console.error(`no authored file at ${path} — run dump-solutions.ts first.`);
    process.exit(1);
  }
  const rows: Row[] = JSON.parse(readFileSync(path, "utf8")).rows ?? [];

  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data, error } = await client.from("questions")
    .select("question_number, options(label, is_correct)")
    .eq("org_id", ORG_ID).eq("exam_id", EXAM_ID_CBSE_12).eq("question_kind", "pyq")
    .eq("source_file", `cbse-12-pyq-${paperId}`);
  if (error) throw new Error(error.message);

  // The bank is the source of the key — never the authored file, which is the
  // thing under test.
  const keyOf = new Map<string, string | null>();
  for (const q of (data ?? []) as never as { question_number: string; options: { label: string; is_correct: boolean }[] }[]) {
    const correct = (q.options ?? []).filter((o) => o.is_correct).map((o) => o.label);
    keyOf.set(q.question_number, correct.length === 1 ? correct[0] : null);
  }

  const mcqs = rows.filter((r) => r.format === "mcq");
  if (!mcqs.length) { console.log(`${paperId}: no mcq rows to screen.`); return; }

  let flagged = 0, unsolved = 0;
  for (const r of mcqs) {
    if (!r.solution) { unsolved++; continue; }
    const key = keyOf.get(r.questionNumber ?? "") ?? null;
    const got = concludedLetter(r.solution);
    if (got === key) continue;
    flagged++;
    const want = key === null ? "(voided / not exactly one keyed)" : key;
    console.log(`  !! ${r.ref}: solution concludes ${got ?? "(none)"} | bank keys ${want}`);
  }

  console.log(`\n${paperId}: screened ${mcqs.length} mcq row(s)${unsolved ? `, ${unsolved} not yet authored` : ""}`);
  console.log(flagged ? `${flagged} disagreement(s) — read the row before editing.` : "clean.");
}

if (require.main === module) main().catch((e) => { console.error(e.message ?? e); process.exit(1); });
