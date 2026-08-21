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
 * Phrases that point at a PRINTED figure on the page rather than describing a
 * curve in words. Deliberately narrow on ONE axis: "the graph of y = sin x" is a
 * function, not a figure, and matching it would bury the real hits.
 *
 * But narrow is not the same as short, and the first version was BOTH. It was
 * written from the referencing rows and so learned only their phrasing; running
 * it against rows that DO carry a figure exposed three forms it could not see —
 * "as shown below", "The following graph is a combination of", "The following
 * graph represents". Any of those on a row with no image is exactly the
 * unanswerable case this probe exists to find, and it would have reported clean.
 *
 * The lesson is the one this pipeline keeps re-learning: a probe validated only
 * against the cases it already flags cannot show you what it misses. Check it
 * against the population it calls CLEAN.
 */
const FIGURE_REF = new RegExp(
  [
    // "in the given figure", "from the adjoining diagram", "see the figure below"
    String.raw`\b(?:in|from|given|shown|see|below|above)\s+(?:the\s+)?(?:adjoining\s+|following\s+|given\s+)?(?:figure|fig\.?|diagram)\b`,
    // "the following/adjoining/given figure|graph|diagram"
    String.raw`\bthe\s+(?:adjoining|following|given|above)\s+(?:figure|fig\.?|diagram|graph)\b`,
    // "figure below", "graph above", "diagram shown"
    String.raw`\b(?:figure|fig\.?|diagram|graph)\s+(?:below|above|shown)\b`,
    // "as shown below", "as shown above", "as shown here" — no noun at all
    String.raw`\bas\s+shown\s+(?:below|above|here|in)\b`,
  ].join("|"),
  "i",
);

export function referencesFigure(text: string | null, context: string | null): boolean {
  return FIGURE_REF.test(`${text ?? ""}\n${context ?? ""}`);
}

type Row = {
  question_number: string; source_file: string; text: string | null;
  context: string | null; image_url: string | null; solution_image_url: string | null;
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
      .select("question_number, source_file, text, context, image_url, solution_image_url")
      .eq("org_id", ORG_ID).eq("exam_id", EXAM_ID_CBSE_12).eq("question_kind", "pyq")
      .order("source_file").order("question_number").range(from, from + 499);
    if (error) throw new Error(error.message);
    rows.push(...(data as never as Row[]));
    if (!data || data.length < 500) break;
  }

  if (!rows.length) { console.log("\n⚠  NOTHING SCANNED — not a clean result."); process.exit(1); }

  const missing: string[] = [];
  const orphan: string[] = [];
  let withImage = 0;
  for (const r of rows) {
    const has = !!r.image_url;
    if (has) withImage++;
    const refs = referencesFigure(r.text, r.context);
    const ref = `${r.source_file.replace(/^cbse-12-pyq-/, "")} Q${r.question_number}`;
    if (refs && !has) missing.push(`${ref}: ${(r.text ?? "").replace(/\s+/g, " ").slice(0, 110)}`);
    if (!refs && has) orphan.push(ref);
  }

  console.log(`scanned ${rows.length} pyq row(s) | ${withImage} carry an image`);
  console.log(`\nREFERENCES-NO-IMAGE (unanswerable if real): ${missing.length}`);
  for (const m of missing) console.log(`  ${m}`);
  console.log(`\nIMAGE-NO-REFERENCE (check the attach was not mis-keyed): ${orphan.length}`);
  for (const o of orphan) console.log(`  ${o}`);
  if (!missing.length && !orphan.length) console.log(`\nclean.`);
}

if (require.main === module) main().catch((e) => { console.error(e.message ?? e); process.exit(1); });
