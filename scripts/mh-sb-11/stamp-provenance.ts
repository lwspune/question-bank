/**
 * Stamp DERIVED-ANSWER PROVENANCE on a chapter whose source book prints no
 * answer key (`Chapter.derivedAnswers`).
 *
 *   npx tsx scripts/mh-sb-11/stamp-provenance.ts <chapterId>          # dry-run
 *   npx tsx scripts/mh-sb-11/stamp-provenance.ts <chapterId> --apply  # write
 *
 * WHY. The Maths volumes carry an end-of-book ANSWERS section, so their answers
 * are checked against a printed key. **Neither Physics volume has one** — no
 * standalone `Answers` heading across all 644 pages of the two books. So every
 * MCQ key and every exercise answer here is DERIVED or AUTHORED by us.
 *
 * A published derived answer that does not announce itself reads to a student
 * as an official key. That defect was caught on CDS General Knowledge at the
 * PUBLISH gate — one step too late — and the rule earned there is that for a
 * key-less corpus provenance belongs to COMMIT, not to publish. `flip-public.ts`
 * therefore refuses to publish an unstamped authored row on such a chapter.
 *
 * SCOPE — the seam is exact and needs no bucket heuristic:
 *   - `solved` rows carry the BOOK's OWN printed worked solution. They are NOT
 *     ours and are deliberately left UNSTAMPED; claiming them would be the
 *     opposite error. They are identified by `section_kind='solved_example'`,
 *     which backfill-sections.ts has already written.
 *   - everything else (exercise MCQ + exercise subjective) is ours → stamped.
 *
 * WHAT THIS DOES NOT DO: it does not write a disclosure into `pyq_note`. An
 * earlier version of this script did, on the CDS General Knowledge pattern; that
 * was reversed the same day — see DERIVED_MODEL in config.ts for the full
 * reasoning. `pyq_note` carries the SOURCE only, and this script RESETS it to
 * `ch.note` so a row stamped under the old design is cleaned on the next run.
 *
 * The derived-answer fact lives in `derived_model` / `derived_at`, which is what
 * the flip-public gate keys on — a structured column rather than a prose match,
 * so it cannot break silently when wording changes.
 *
 * Idempotent BY CONSTRUCTION: both fields are SET, never appended to, and written
 * only when they differ, so a re-run is a no-op.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, requireChapter, DERIVED_MODEL } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}


async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const ch = requireChapter(id);
  loadEnv();

  if (!ch.derivedAnswers) {
    console.error(
      `${id}: chapter does not set derivedAnswers. This script is only for a source ` +
        `that prints NO answer key — stamping a key-checked chapter would overclaim.`
    );
    process.exit(1);
  }

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data: rows, error } = await db
    .from("questions")
    .select("id, question_number, section_kind, pyq_note, derived_model, solution")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", ch.sourceFile)
    .order("source_row");
  if (error) throw new Error(error.message);
  if (!rows?.length) throw new Error(`no rows for source_file "${ch.sourceFile}"`);

  // A row with no section_kind means backfill-sections.ts has not run; without it
  // the solved/authored seam cannot be drawn and we would stamp the book's own
  // worked solutions as ours. Refuse rather than guess.
  const unsectioned = rows.filter((r) => !r.section_kind);
  if (unsectioned.length) {
    throw new Error(
      `refusing: ${unsectioned.length} row(s) have no section_kind, so the ` +
        `book-solution vs authored-answer seam cannot be drawn. Run backfill-sections.ts first.`
    );
  }

  const authored = rows.filter((r) => r.section_kind !== "solved_example");
  const bookOwn = rows.length - authored.length;
  const needStamp = authored.filter((r) => !r.derived_model);
  // The note carries the SOURCE only — see DERIVED_MODEL in config.ts for why
  // the disclosure is structured data rather than prose. Rows stamped before
  // that decision carry an appended clause, so this RESETS rather than appends.
  const needNote = authored.filter((r) => r.pyq_note !== ch.note);

  console.log(`\n${ch.chapterName} (${ch.subjectName}) — derived-answer provenance`);
  console.log(`  rows                          ${rows.length}`);
  console.log(`  book's own solved examples    ${bookOwn}  (left unstamped, deliberately)`);
  console.log(`  authored/derived by us        ${authored.length}`);
  console.log(`  missing derived_model         ${needStamp.length}`);
  console.log(`  note needing reset to source  ${needNote.length}`);

  if (!apply) {
    console.log("\n[dry-run] pass --apply to write. Nothing updated.");
    return;
  }

  const now = new Date().toISOString();
  let stamped = 0;
  for (const r of authored) {
    const patch: Record<string, unknown> = {};
    if (!r.derived_model) {
      patch.derived_model = DERIVED_MODEL;
      patch.derived_at = now;
    }
    // SET the note to the chapter's source note, never append to it. Idempotent
    // by construction, and it also cleans a row stamped under the earlier
    // disclosure-in-the-note design.
    if (r.pyq_note !== ch.note) patch.pyq_note = ch.note;
    if (!Object.keys(patch).length) continue;
    const { error: uErr } = await db.from("questions").update(patch).eq("id", r.id);
    if (uErr) throw new Error(`${r.question_number}: ${uErr.message}`);
    stamped++;
  }
  console.log(`\nstamped ${stamped} row(s). ${authored.length - stamped} already carried provenance.`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
