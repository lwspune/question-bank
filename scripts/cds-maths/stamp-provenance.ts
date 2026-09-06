/**
 * Stamp derived-answer provenance onto a committed paper's rows.
 *
 *   npx tsx scripts/cds-maths/stamp-provenance.ts <paperId>
 *   npx tsx scripts/cds-maths/stamp-provenance.ts <paperId> --apply
 *
 * Sets `derived_model` + `derived_at`, and appends a disclosure clause to
 * `pyq_note`. Idempotent: a row already carrying `derived_model` is skipped, and
 * the note clause is appended only once.
 *
 * WHY THIS EXISTS, AND WHY IT RUNS BEFORE PUBLISHING. No CDS booklet prints an
 * answer key, so every answer here is derived. A published derived answer that
 * does not announce itself reads as an official key — and on the sibling CDS
 * General Knowledge corpus that was caught at the publish gate, one step too
 * late. The rule earned there: for a key-less corpus, provenance belongs to
 * COMMIT, not to publish. `flip-public.ts` therefore REFUSES to publish a row
 * with no `derived_model`, which makes this step impossible to forget rather
 * than merely documented.
 *
 * THE DISCLOSURE GOES IN TWO PLACES, DELIBERATELY, AND IN NEITHER OF THEM TWICE:
 *
 *  - `derived_model` / `derived_at` are STRUCTURED and are what a query can find.
 *    They are what the publish gate keys on, not a prose match, so re-wording the
 *    note can never silently disarm the gate.
 *  - `pyq_note` carries a short human-readable clause. This corpus is EXAM PAPERS,
 *    where "the official answer key" is a real artifact a student expects to
 *    exist, so saying plainly that none is published is worth the space. (That
 *    premise is why this differs from the State Board textbook pipelines, which
 *    deliberately keep the disclosure out of `pyq_note` — a textbook reader is
 *    not looking for an examiner's key.)
 *
 * The clause carries NO BRACKETS OF ITS OWN. The /browse card wraps the note in
 * its own `[...]`, so a self-bracketed clause renders a stray `]]` — a live
 * defect on the 2,280 CDS General Knowledge rows, reproduced there because the
 * note was verified by reading the stored string instead of a rendered card.
 *
 * The per-question solution ALSO carries a fuller bracket, written at assembly
 * time. That is not duplication: the note is seen beside the question, the
 * solution bracket at the moment the answer is revealed, which is when a reader
 * would otherwise mistake it for an official key.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAM_ID, requirePaper } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

/** Matches the bank convention for a dual-blind derived corpus (CDS General Knowledge). */
export const DERIVED_MODEL = "claude-opus-5 (two independent blind passes)";

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
