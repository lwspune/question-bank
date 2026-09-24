/**
 * Stamp DERIVED-ANSWER PROVENANCE on the Geography board-paper rows.
 *
 *   npx tsx scripts/mh-hsc-12-geo-pyq/stamp-provenance.ts <paperId> [--apply]
 *   npx tsx scripts/mh-hsc-12-geo-pyq/stamp-provenance.ts --all [--apply]
 *
 * WHY. A board QUESTION PAPER ships no answer key and no solutions — measured
 * across all 124 pages of the six PDFs, there is no ANSWERS section, no inline
 * key and not one worked example. So every MCQ key here was DERIVED by us and
 * every model answer AUTHORED by us, with no external check of any kind.
 *
 * A published derived answer that does not announce itself reads to a student as
 * an official board key. That defect was caught on CDS General Knowledge at the
 * PUBLISH gate — one step too late — and the rule earned there is that for a
 * key-less corpus provenance belongs to COMMIT, not to publish.
 *
 * SCOPE IS THE WHOLE PAPER, and this is the one place this lane is SIMPLER than
 * the textbook lane beside it. There, `section_kind='solved_example'` marks rows
 * carrying the BOOK's own printed worked solution, which are deliberately left
 * unstamped because claiming them would be the opposite error; the script
 * refuses to run until `section_kind` is backfilled, because without it the seam
 * cannot be drawn. Here there is no seam: a question paper prints no solutions,
 * so nothing on these rows belongs to anyone but us and every row is stamped.
 *
 * It does NOT write a disclosure into `pyq_note`. That column carries the
 * SITTING on this lane ("March 2026", plus any recurrence note), which is what
 * `publicPyqNote` publishes; the derived-answer fact lives in `derived_model` /
 * `derived_at`, a structured column that `flip-public.ts` keys on so the gate
 * cannot break silently when wording changes. See DERIVED_MODEL in config.ts.
 *
 * Idempotent BY CONSTRUCTION: both fields are SET, never appended, and written
 * only where they are absent, so a re-run is a no-op.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, DERIVED_MODEL, PAPERS, requirePaper } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const CHUNK = 200; // `.in()` puts the list in the URL — chunk the filter, not the result

/** Named so `Db` below picks up the CONCRETE client type. `ReturnType<typeof
 *  createClient>` resolves to the no-argument defaults, whose schema parameter is
 *  `never`, and every row property then fails to exist. */
function makeClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
}
type Db = ReturnType<typeof makeClient>;


async function stampPaper(db: Db, id: string, apply: boolean) {
  const paper = requirePaper(id);
  const { data: rows, error } = await db
    .from("questions")
    .select("id, question_number, derived_model, solution, question_format, options(is_correct)")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile)
    .order("source_row");
  if (error) throw new Error(error.message);
  if (!rows?.length) throw new Error(`no rows for source_file "${paper.sourceFile}"`);

  // Stamping a row that carries no answer would claim authorship of nothing.
  const unanswered = rows.filter((r) =>
    r.question_format === "subjective"
      ? !r.solution
      : !((r.options ?? []) as { is_correct: boolean }[]).some((o) => o.is_correct)
  );
  const needStamp = rows.filter((r) => !r.derived_model && !unanswered.includes(r));

  console.log(
    `\n=== ${id} (${paper.month} ${paper.year}) — ${rows.length} rows, ` +
      `${rows.length - needStamp.length - unanswered.length} already stamped, ${needStamp.length} to stamp` +
      (unanswered.length ? `, ${unanswered.length} unanswered (skipped)` : "")
  );
  if (unanswered.length) {
    console.log(`  unanswered: ${unanswered.map((r) => r.question_number).join(", ")}`);
  }
  if (!apply || !needStamp.length) return needStamp.length;

  const stampedAt = new Date().toISOString();
  for (let i = 0; i < needStamp.length; i += CHUNK) {
    const ids = needStamp.slice(i, i + CHUNK).map((r) => r.id as string);
    const { error: uErr } = await db
      .from("questions")
      .update({ derived_model: DERIVED_MODEL, derived_at: stampedAt })
      .in("id", ids);
    if (uErr) throw new Error(`stamp failed: ${uErr.message}`);
  }
  console.log(`  stamped ${needStamp.length} row(s) with derived_model='${DERIVED_MODEL}'.`);
  return needStamp.length;
}

async function main() {
  const arg = process.argv[2];
  const apply = process.argv.includes("--apply");
  if (!arg) throw new Error("usage: stamp-provenance.ts <paperId> | --all  [--apply]");
  const ids = arg === "--all" ? Object.keys(PAPERS) : [arg];
  const db = makeClient();
  let n = 0;
  for (const id of ids) n += await stampPaper(db, id, apply);
  console.log(apply ? `\ntotal stamped: ${n}` : `\n[dry-run] ${n} row(s) would be stamped. Pass --apply.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
