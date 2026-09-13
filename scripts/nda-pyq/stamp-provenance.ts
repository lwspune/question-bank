/**
 * Stamp derived-answer provenance onto a committed paper's rows.
 *
 *   npx tsx scripts/nda-pyq/stamp-provenance.ts <paperId>
 *   npx tsx scripts/nda-pyq/stamp-provenance.ts <paperId> --apply
 *
 * Sets `derived_model` + `derived_at`. Idempotent: a row already carrying
 * `derived_model` is skipped.
 *
 * It writes NOTHING to `pyq_note` — `NOTE_CLAUSE` is empty, for the reasons on
 * that constant. The machinery for stripping older wordings is kept because
 * rows stamped with one may still exist in the sibling corpora this was ported
 * from; it is inert here, where no row has ever carried a clause.
 *
 * WHY THIS EXISTS, AND WHY IT RUNS BEFORE PUBLISHING. No UPSC question booklet
 * prints an answer key, so every answer here is derived. A published derived answer that
 * does not announce itself reads as an official key — and on the sibling CDS
 * General Knowledge corpus that was caught at the publish gate, one step too
 * late. The rule earned there: for a key-less corpus, provenance belongs to
 * COMMIT, not to publish. `flip-public.ts` therefore REFUSES to publish a row
 * with no `derived_model`, which makes this step impossible to forget rather
 * than merely documented.
 *
 * PROVENANCE IS STRUCTURED DATA, NOT PROSE. `derived_model` / `derived_at` are
 * what a query can find, and they are what the publish gate keys on — never a
 * prose match — so re-wording anything can never silently disarm the gate.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAM_ID, requirePaper } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

/**
 * ONE blind pass, THEN cross-checked against an independent answer key — and the
 * string says exactly that, because it is the one field a later reader trusts to
 * tell them how the answer was established.
 *
 * The sibling CDS pipelines stamp "(two independent blind passes)". Carrying that
 * wording across would assert an evidence standard this paper does not meet. What
 * it DOES meet is arguably stronger than a second blind pass on one point and
 * weaker on another, and both halves matter:
 *
 *  - STRONGER: the second opinion is a genuinely independent SOURCE (a coaching
 *    institute's own key, not another run of the same model), so it cannot share
 *    our failure modes. Two blind passes can be wrong the same way; this cannot
 *    be wrong in the same way for the same reason.
 *  - WEAKER: it is one derivation, not two, so a row where both we and the key
 *    are wrong has no third voice. 117 of 120 agreed; the 3 that did not were
 *    each adjudicated against the printed page and resolved AGAINST the key.
 *
 * There is no official UPSC key for this sitting and none is expected, so this is
 * the final evidence standard rather than an interim one.
 */
export const DERIVED_MODEL =
  "claude-opus-5 (blind derivation, cross-checked against an independent answer key)";

/**
 * NOTHING is appended to pyq_note any more.
 *
 * That line is the SOURCE line on the /browse card, and across the rest of this
 * bank it carries the sitting and nothing else -- "1 February 2023", "NDA 1",
 * "10th May Shift 1". This pipeline was appending "No official answer key is
 * published for this paper. Every answer here was derived independently by two
 * blind passes and ... adjudicated by hand against the printed page", which is
 * our process narrated to a student on the line they see BEFORE any answer.
 *
 * Provenance is STRUCTURED DATA: `derived_model`, `derived_at`, and a row per
 * review in `question_reviews`. Those are queryable, they are what the publish
 * gate keys on, and no learner ever reads them. A footnote on every card is not
 * provenance, it is noise -- no textbook or question bank ships one.
 */
export const NOTE_CLAUSE = "";

/**
 * Earlier wordings, stripped before the current clause is appended.
 *
 * Without this the stamper ACCUMULATES: its update is `note + " " + clause`
 * guarded only by "does the note already contain the CURRENT clause", so
 * changing the wording once would leave every row carrying both. Never delete
 * an entry here — a row stamped with an old clause may still be out there.
 */
const LEGACY_CLAUSES = [
  "No official answer key is published for this paper. Every answer here was derived " +
    "independently by two blind passes and, where either disagreed with an external key, " +
    "adjudicated by hand against the printed page.",
  "No official answer key is published for this paper.",
];

/** The pyq_note this run wants, given whatever the row currently holds. */
function wantedNote(current: string): string {
  let base = current;
  for (const legacy of [...LEGACY_CLAUSES, NOTE_CLAUSE].filter(Boolean)) {
    base = base.split(legacy).join("").replace(/\s{2,}/g, " ").trim();
  }
  return NOTE_CLAUSE ? (base ? `${base} ${NOTE_CLAUSE}` : NOTE_CLAUSE) : base;
}

async function main() {
  const paper = requirePaper(process.argv[2]);
  const apply = process.argv.includes("--apply");
  loadEnv();

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data: rows, error } = await client
    .from("questions")
    .select("id, question_number, derived_model, pyq_note")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile);
  if (error) throw new Error(`read failed: ${error.message}`);
  if (!rows?.length) throw new Error(`no rows for ${paper.sourceFile} — commit the paper first`);

  const needStamp = rows.filter((r) => !r.derived_model);
  // Compare against the EXACT note this run would write, not "does it contain
  // the clause". The current clause is a PREFIX of the legacy one, so an
  // includes() test reports a legacy row as already correct and the script
  // exits reporting nothing to do — which it did, leaving the old process
  // narration live on every row. Any wording change where the new text is a
  // substring of the old has this shape.
  const needNote = rows.filter((r) => (r.pyq_note ?? "") !== wantedNote(r.pyq_note ?? ""));

  console.log(`${paper.id}: ${rows.length} row(s)`);
  console.log(`  need derived_model : ${needStamp.length}`);
  console.log(`  need note clause   : ${needNote.length}`);
  console.log(`  model              : ${DERIVED_MODEL}`);

  if (!needStamp.length && !needNote.length) {
    console.log("\nalready stamped — nothing to do.");
    return;
  }
  if (!apply) {
    console.log("\n[dry-run] pass --apply to stamp. Nothing written.");
    return;
  }

  const now = new Date().toISOString();
  let stamped = 0;
  for (const r of rows) {
    const patch: Record<string, unknown> = {};
    if (!r.derived_model) {
      patch.derived_model = DERIVED_MODEL;
      patch.derived_at = now;
    }
    // One helper for both the guard and the patch, so they cannot disagree.
    const want = wantedNote(r.pyq_note ?? "");
    if ((r.pyq_note ?? "") !== want) patch.pyq_note = want;
    if (!Object.keys(patch).length) continue;
    const { error: uErr } = await client.from("questions").update(patch).eq("id", r.id);
    if (uErr) throw new Error(`Q${r.question_number} stamp failed: ${uErr.message}`);
    stamped += 1;
  }

  // Read back rather than trusting the writes — this is the gate's own input.
  const { data: after } = await client
    .from("questions")
    .select("id, derived_model, pyq_note")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile);
  const missing = (after ?? []).filter((r) => !r.derived_model).length;
  const noNote = (after ?? []).filter((r) => (r.pyq_note ?? "") !== wantedNote(r.pyq_note ?? "")).length;
  console.log(`\nstamped ${stamped} row(s).`);
  if (missing || noNote) throw new Error(`after apply: ${missing} without derived_model, ${noNote} without the note clause`);
  console.log(`verified: all ${after?.length} rows carry derived_model and the note clause.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
