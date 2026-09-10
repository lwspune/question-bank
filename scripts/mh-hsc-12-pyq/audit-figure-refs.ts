/**
 * Standing probe: a stem that REFERS to a figure but carries none.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/audit-figure-refs.ts [sourceFileSubstring]
 *
 * Nothing else looks for this. `audit:text` checks text defects, `board:lint`
 * checks book structure, `commit.ts` counts figures but never asks whether a
 * question NEEDS one — so a stem saying "express the following circuit" with
 * image_url NULL is unanswerable and every gate passes it.
 *
 * CALIBRATED AGAINST THE KNOWN CASES, and that mattered: the first version of
 * this pattern detected only 1 of the 5 board-PYQ rows that genuinely carry a
 * figure, because it required the noun to follow the determiner immediately and
 * the real stems read "the following SWITCHING circuit". A probe that misses 80%
 * of true positives makes a clean run meaningless, so the rule now allows
 * intervening words and is asserted against those 5 by `--selftest`.
 *
 * TRIAGE, not a gate: "draw a labelled diagram" asks the STUDENT to draw one and
 * is not a dependency, so hits need reading.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const NOUN = "circuit|figure|fig\\.?|diagram|graph|structure|network|arrangement|set-?up|table";
const DET = "following|given|adjoining|above|below|shown|this";

/** A determiner and a figure-noun with up to three words between them. */
export const REFERS: RegExp[] = [
  new RegExp(`\\b(?:${DET})\\s+(?:\\w+\\s+){0,3}(?:${NOUN})\\b`, "i"),
  new RegExp(`\\b(?:${NOUN})\\s+(?:shown|given|below|above)\\b`, "i"),
  new RegExp(`\\bshown\\s+in\\s+(?:the\\s+)?(?:${NOUN})`, "i"),
  new RegExp(`\\bfrom\\s+the\\s+(?:${NOUN})\\b`, "i"),
  new RegExp(`\\b(?:figure|fig\\.)\\s*[\\d(]`, "i"),
  /\bas\s+shown\b/i,
];
/** Asks the STUDENT to produce the drawing — not a dependency on one. */
const STUDENT_DRAWS = /\b(?:draw|sketch|plot|construct)\b/i;

export const refersToFigure = (t: string) => REFERS.some((re) => re.test(t));

async function main() {
  const filter = process.argv.find((a) => !a.startsWith("-") && !a.endsWith(".ts") && !a.includes("node"));
  const selftest = process.argv.includes("--selftest");
  const c = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  type Row = { id: string; text: string; image_url: string | null; question_number: string; source_file: string };
  const rows: Row[] = [];
  for (let from = 0; ; from += 500) {
    let q = c.from("questions").select("id,text,image_url,question_number,source_file")
      .eq("exam_id", EXAM_ID).eq("question_kind", "pyq").range(from, from + 499);
    if (filter) q = q.like("source_file", `%${filter}%`);
    const { data, error } = await q;
    if (error) throw error;
    rows.push(...(data ?? []) as Row[]);
    if (!data || data.length < 500) break;
  }

  // SELF-TEST FIRST — a clean scan means nothing from a rule that cannot detect
  // the cases we already know are real.
  const known = rows.filter((r) => r.image_url);
  const caught = known.filter((r) => refersToFigure(r.text));
  console.log(`self-test: probe detects ${caught.length} of ${known.length} rows that DO carry a figure`);
  if (known.length && caught.length < known.length) {
    for (const r of known.filter((x) => !refersToFigure(x.text))) {
      console.log(`  MISSED ${r.question_number}: ${r.text.replace(/\s+/g, " ").slice(0, 100)}`);
    }
    console.log("  ^ widen the rule before trusting a clean scan.");
  }
  if (selftest) return;

  const flagged = rows.filter((r) => !r.image_url && refersToFigure(r.text));
  console.log(`\nscanned ${rows.length} board-PYQ rows | ${known.length} carry a figure`);
  console.log(`REFERS TO A FIGURE BUT CARRIES NONE: ${flagged.length}\n`);
  for (const r of flagged) {
    const subj = r.source_file.includes("Physics") ? "PHY" : r.source_file.includes("Chem") ? "CHM" : "MTH";
    console.log(`  ${subj} ${r.question_number}${STUDENT_DRAWS.test(r.text) ? "  [student draws]" : ""}`);
    console.log(`     ${r.text.replace(/\s+/g, " ").slice(0, 145)}`);
  }
  if (flagged.length) console.log("\nTRIAGE — 'draw a labelled diagram' is not a dependency. Read each.");
}

if (require.main === module) main().catch((e) => { console.error(e.message ?? e); process.exit(1); });
