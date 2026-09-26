/**
 * Load the items UPSC WITHDREW — keyless, with a cancelled note — so a mock can
 * print them as grace and a reader can see why they carry no answer.
 *
 *   npx tsx scripts/upsc/load-withdrawn.ts            # dry run
 *   npx tsx scripts/upsc/load-withdrawn.ts --apply
 *
 * The withdrawn items are the `X` entries of each official key
 * (`data/<id>.key.json`). commit.ts skipped them on purpose while the corpus was
 * PRIVATE; the transcriptions always held them.
 *
 * NOT 2021-p2 Q39. Its key is also `X`, but that is a stand-in for a DUAL key
 * ("C or D", see config.ts) — UPSC scored it, accepting either letter. It is not
 * a withdrawal, a cancelled note would be false, and grace would credit students
 * who chose A or B. It stays out of the bank, and that sitting's mock is held.
 *
 * Only this run's new rows are touched afterwards (set PRIVATE, like every other
 * row of this pipeline — the corpus flip is a separate, deliberate step).
 * Idempotent: a re-run dedups on content_hash and inserts nothing.
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { commitStaged } from "../../src/lib/upload/commit";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { validateRow } from "../../src/lib/upload/validate";
import { CREATED_BY, EXAM_ID, ORG_ID, PAPERS, PROVISIONAL_KEYS, dataPath, pyqNoteFor, withdrawnFor } from "./config";
import { buildWithdrawnRecords, type TQ } from "./lib";

function noteFor(id: string): string {
  const which = PROVISIONAL_KEYS.has(id) ? "provisional answer key" : "official answer key";
  return (
    `Withdrawn by UPSC — its ${which} drops this question and it was not scored. ` +
    `No option is correct. In PYQ Vault mocks it is awarded to every candidate.`
  );
}

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const apply = process.argv.includes("--apply");
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const runStartedAt = new Date().toISOString();
  let total = 0;

  for (const paper of Object.values(PAPERS)) {
    const nums = withdrawnFor(paper.id);
    if (!nums.length) continue;
    const questions: TQ[] = JSON.parse(readFileSync(dataPath(paper.id, "merged"), "utf8")).questions;
    const rows = buildWithdrawnRecords(questions, nums, noteFor(paper.id));
    const parsed = [];
    for (const r of rows) {
      r.question = normalizeNewlines(r.question);
      if (r.context) r.context = normalizeNewlines(r.context);
      const v = validateRow(r);
      if (v.errors.length) throw new Error(`${paper.id} Q${r.questionNumber}: ${v.errors.join("; ")}`);
      parsed.push(v.parsed!);
    }
    console.log(`${paper.id}  withdrawn ${nums.map((n) => `Q${n}`).join(", ")}`);
    total += parsed.length;
    if (!apply) continue;

    const result = await commitStaged(db, {
      orgId: ORG_ID,
      examId: EXAM_ID,
      filename: paper.sourceFile,
      createdBy: CREATED_BY,
      rows: parsed,
      pyqYear: paper.pyqYear,
      pyqNote: pyqNoteFor(paper),
    });
    const { count } = await db
      .from("questions")
      .update({ visibility: "PRIVATE" }, { count: "exact" })
      .eq("exam_id", EXAM_ID)
      .eq("source_file", paper.sourceFile)
      .gte("created_at", runStartedAt);
    console.log(`   inserted=${result.inserted} skipped=${result.skipped} failed=${result.failed} -> PRIVATE ${count ?? 0}`);
    for (const e of result.errors) console.log(`   err row ${e.sourceRow}: ${e.message}`);
  }
  console.log(`\n${total} withdrawn item(s)${apply ? " loaded" : " — dry run, pass --apply"}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
