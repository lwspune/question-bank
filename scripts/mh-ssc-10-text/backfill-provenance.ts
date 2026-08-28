/**
 * Stamp derived-answer provenance on textbook rows that were committed before
 * `apply-solutions.ts` learned to stamp as it writes.
 *
 *   npx tsx scripts/mh-ssc-10-text/backfill-provenance.ts            # dry-run, all chapters
 *   npx tsx scripts/mh-ssc-10-text/backfill-provenance.ts <id>       # dry-run, one chapter
 *   npx tsx scripts/mh-ssc-10-text/backfill-provenance.ts --apply
 *
 * WHY THIS EXISTS. These Balbharati textbooks print almost no answer key — the two
 * Science volumes carry 24 printed answers across six chapters and the humanities
 * and Geography books carry none — so nearly every stored answer here was AUTHORED
 * rather than transcribed. A published derived answer that does not announce itself
 * reads to a teacher as an official key. That is not hypothetical: this project hit
 * it on the CDS General Knowledge corpus, where the missing provenance was caught at
 * the publish gate, one step too late.
 *
 * WHAT IT WRITES, and why each field.
 *   - `derived_model` / `derived_at` — the machine-readable signal, and the one the
 *     new gate in flip-public.ts checks. Same two columns the sibling key-less
 *     corpora use (mh-sb-9, mh-ssc-10, cds-gs).
 *   - a clause appended to `pyq_note` — the human-readable half. `pyq_note` today
 *     names only the book, which says nothing about where the ANSWER came from.
 *
 * WHAT IT DELIBERATELY SKIPS: a row whose solution came from the BOOK. In the two
 * Maths volumes a `solved_example` block carries the textbook's own printed working,
 * and stamping that as derived would be a false claim in the opposite direction.
 * Those rows are identified by `section_kind='solved_example'` and left alone.
 *
 * SAFETY. `derived_model`, `derived_at` and `pyq_note` are all OUTSIDE `content_hash`
 * (which is stem+options+answer, or stem+context for subjective), so this cannot
 * move a row's identity, orphan a paper reference or break dedup against a later
 * re-ingest. It is idempotent: a row that already carries the stamp is skipped, and
 * the note clause is appended only when absent.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { CHAPTERS, EXAM_ID, requireChapter } from "./config";

const DERIVED_MODEL = "claude-opus-5";

/** Appended to pyq_note. Kept short — it rides on every row. */
const NOTE_CLAUSE =
  "The answer is DERIVED: this textbook prints no answer key for this exercise, so the " +
  "model answer was authored from the chapter's own content and has not been checked " +
  "against an official key.";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const args = process.argv.slice(2);
  const apply = args.includes("--apply");
  const only = args.find((a) => !a.startsWith("--"));
  if (only) requireChapter(only);
  loadEnv();

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const sources = only
    ? [requireChapter(only).sourceFile]
    : Object.values(CHAPTERS).map((c) => c.sourceFile);

  const now = new Date().toISOString();
  let totalCandidates = 0;
  let totalWritten = 0;

  for (const sourceFile of sources) {
    const { data, error } = await client
      .from("questions")
      .select("id, question_number, pyq_note, section_kind, derived_model")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", sourceFile)
      .eq("question_kind", "practice")
      .not("solution", "is", null);
    if (error) throw new Error(`${sourceFile}: ${error.message}`);

    const rows = (data ?? []) as Array<{
      id: string; question_number: string; pyq_note: string | null;
      section_kind: string | null; derived_model: string | null;
    }>;
    // The book answered these; they are not ours to claim.
    const authored = rows.filter((r) => r.section_kind !== "solved_example");
    const needStamp = authored.filter((r) => !r.derived_model);
    const bookAnswered = rows.length - authored.length;

    if (!needStamp.length) {
      if (rows.length) {
        console.log(
          `  ok    ${sourceFile.replace("StateBoard_10_", "").padEnd(52)} ` +
            `${rows.length} answered, ${bookAnswered} book-answered, 0 to stamp`,
        );
      }
      continue;
    }
    totalCandidates += needStamp.length;
    console.log(
      `  STAMP ${sourceFile.replace("StateBoard_10_", "").padEnd(52)} ` +
        `${needStamp.length} of ${authored.length} authored row(s)` +
        (bookAnswered ? `  (+${bookAnswered} book-answered, skipped)` : ""),
    );
    if (!apply) continue;

    for (const r of needStamp) {
      const base = (r.pyq_note ?? "").trim();
      const note = base.includes(NOTE_CLAUSE) ? base : (base ? `${base} — ${NOTE_CLAUSE}` : NOTE_CLAUSE);
      const { error: uErr, count } = await client
        .from("questions")
        .update({ derived_model: DERIVED_MODEL, derived_at: now, pyq_note: note }, { count: "exact" })
        .eq("id", r.id);
      if (uErr) throw new Error(`update ${r.question_number}: ${uErr.message}`);
      if (count !== 1) throw new Error(`update ${r.question_number}: matched ${count} rows, expected 1`);
      totalWritten++;
    }
  }

  console.log(
    apply
      ? `\nstamped ${totalWritten} row(s).`
      : `\n[dry-run] ${totalCandidates} row(s) would be stamped. Pass --apply to write.`,
  );
}

main().catch((e) => { console.error(e); process.exit(1); });
