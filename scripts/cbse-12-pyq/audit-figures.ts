/**
 * Does every question that TALKS about a figure actually carry one?
 *
 *   npx tsx scripts/cbse-12-pyq/audit-figures.ts
 *
 * WHY NO EXISTING GATE CATCHES THIS. `validate.ts` checks the transcription
 * files, `board:lint` checks section structure, `audit-keys` checks option
 * integrity and `audit-omml` checks Word export. None of them reads a stem and
 * asks whether the thing it points at exists. A row whose stem says "In the
 * figure below, ..." with `image_url` null is UNANSWERABLE, renders as a
 * complete question, and is invisible to every count.
 *
 * It reports BOTH directions, because both are real:
 *   • REFERENCES-NO-IMAGE — the unanswerable case. The serious one.
 *   • IMAGE-NO-REFERENCE  — a figure attached to a row whose stem never mentions
 *     one. Usually harmless (the figure may be genuinely illustrative), but it
 *     is also exactly what a mis-keyed attach looks like, so it is worth an eye.
 *
 * TRIAGE, NOT A GATE. Some stems legitimately describe a figure in words ("the
 * shaded region bounded by y = x^2") without one existing, and a phrase like
 * "the graph of f" is not a figure reference. So a hit is a question to answer,
 * never a verdict — the same posture as `audit:text`.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { ORG_ID, EXAM_ID_CBSE_12 } from "./config";

/**
 * THE RULE NOW LIVES IN scripts/lib/figureRefs.ts, shared with the bank-wide
 * `npm run audit:figures`. It was duplicated here and in scripts/mh-hsc-12-pyq/
 * audit-figure-refs.ts, and the two copies had learned different lessons: this
 * one knew `shows`, `network` and the plurals revert; that one knew the bare
 * `Fig. N` form and that a determiner needs a gap before its noun ("the
 * following SWITCHING circuit"). Neither knew what the other knew, and neither
 * ran outside its own pipeline.
 *
 * Every measurement and every reverted widening that shaped this regex is
 * recorded in that file's comments, pinned by tests/figure-refs.test.ts. This
 * script stays as the CBSE-scoped view; the rule is no longer its own.
 */
export { referencesFigure, optionsDeferToFigure } from "../lib/figureRefs";
import { referencesFigure, optionsDeferToFigure } from "../lib/figureRefs";

type Row = {
  question_number: string; source_file: string; text: string | null;
  context: string | null; image_url: string | null; solution_image_url: string | null;
  options: { text: string | null }[] | null;
};

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const rows: Row[] = [];
  for (let from = 0; ; from += 500) {
    const { data, error } = await client.from("questions")
      .select("question_number, source_file, text, context, image_url, solution_image_url, options(text)")
      .eq("org_id", ORG_ID).eq("exam_id", EXAM_ID_CBSE_12).eq("question_kind", "pyq")
      .order("source_file").order("question_number").range(from, from + 499);
    if (error) throw new Error(error.message);
    rows.push(...(data as never as Row[]));
    if (!data || data.length < 500) break;
  }

  if (!rows.length) { console.log("\n⚠  NOTHING SCANNED — not a clean result."); process.exit(1); }

  const missing: string[] = [];
  const orphan: string[] = [];
  const drawnOptions: string[] = [];
  let withImage = 0;
  for (const r of rows) {
    const has = !!r.image_url;
    if (has) withImage++;
    const refs = referencesFigure(r.text, r.context);
    const ref = `${r.source_file.replace(/^cbse-12-pyq-/, "")} Q${r.question_number}`;
    if (refs && !has) missing.push(`${ref}: ${(r.text ?? "").replace(/\s+/g, " ").slice(0, 110)}`);
    if (!refs && has) orphan.push(ref);
    if (optionsDeferToFigure(r.options) && !has) drawnOptions.push(ref);
  }

  console.log(`scanned ${rows.length} pyq row(s) | ${withImage} carry an image`);
  console.log(`\nREFERENCES-NO-IMAGE (unanswerable if real): ${missing.length}`);
  for (const m of missing) console.log(`  ${m}`);
  console.log(`\nIMAGE-NO-REFERENCE (check the attach was not mis-keyed): ${orphan.length}`);
  for (const o of orphan) console.log(`  ${o}`);
  console.log(`\nDRAWN-OPTIONS-NO-IMAGE (the options ARE the figure): ${drawnOptions.length}`);
  for (const d of drawnOptions) console.log(`  ${d}`);
  if (!missing.length && !orphan.length && !drawnOptions.length) console.log(`\nclean.`);
}

if (require.main === module) main().catch((e) => { console.error(e.message ?? e); process.exit(1); });
