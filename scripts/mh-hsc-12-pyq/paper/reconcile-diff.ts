/**
 * Diff a RECONCILE paper's fresh transcription against the rows already in the
 * bank, so the 360 analysis rests on a measurement rather than an impression.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/paper/reconcile-diff.ts <paperId>
 *
 * READ-ONLY. It writes nothing and touches no row; `commit.ts --allow-reconcile`
 * is still the only thing that can change shipped content.
 *
 * WHY THIS EXISTS. `commit.ts` refuses a reconcile paper until a 360 analysis has
 * been signed off, and that analysis needs three numbers nobody had: how many
 * refs the two sides agree on, how many differ, and in what way. Without them
 * "reconcile the paper" is a proposal to edit shipped rows on the strength of a
 * feeling.
 *
 * WHAT A DIFFERENCE MEANS DEPENDS ON THE SOURCE, and the manifest records which:
 *  - On a BOARD PRINT the paper is the artifact the students sat, so a
 *    disagreement settles in the paper's favour.
 *  - On a `thirdParty` reproduction the paper is a SECOND TRANSCRIPTION of that
 *    artifact, so a disagreement is a flag for a human and never a verdict.
 * The report says which regime it is in rather than leaving the reader to
 * remember.
 *
 * Comparison is on NORMALISED text: collapsed whitespace, and the curly quotes,
 * dashes and non-breaking spaces that differ between two typesettings of one
 * sentence folded onto their plain equivalents. Those are rendering differences,
 * not content ones, and leaving them in would bury the real findings under
 * dozens of false ones.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { PAPERS, requirePaper, questionsJsonPath, EXAM_ID } from "./config";
import { grammarFor } from "./lib";
import type { PaperQuestion } from "../../mh-ssc-10/lib";

const envLocal = join(process.cwd(), ".env.local");
if (existsSync(envLocal)) require("dotenv").config({ path: envLocal, override: true });

/** Fold the differences that are typesetting rather than content. */
function norm(s: string): string {
  return (s ?? "")
    .replace(/[‘’ʼ]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[‐-―−]/g, "-")
    .replace(/ /g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * A SECOND, harsher normalisation used only to classify a difference, never to
 * decide what gets written.
 *
 * Two independent transcriptions of one printed sentence differ in ways that
 * carry no meaning: the number of underscores in a fill-in blank, one hyphen or
 * two, whether a space sits inside `\(50\Omega\)`, whether two quantities share
 * one math zone or have one each. Folding those away separates the differences
 * a human must adjudicate from the ones nobody needs to look at.
 *
 * It is deliberately NOT used for the comparison itself: a diff that silently
 * erased whitespace would also erase a genuine `10.1` against `1.01`.
 */
const COSMETIC = (s: string) =>
  norm(s)
    .replace(/_+/g, "_")            // fill-in blanks of any length
    .replace(/-+/g, "-")            // one hyphen or two
    .replace(/\\[,;:!]/g, "")       // LaTeX thin spaces
    .replace(/\\ /g, "")            // LaTeX explicit space
    .replace(/[\s{}]/g, "")         // all remaining whitespace and grouping braces
    .toLowerCase();

/** A crude similarity, enough to separate "same question, retyped" from
 *  "different question". Token overlap, not edit distance: a reordered clause
 *  should not read as a different stem. */
function similarity(a: string, b: string): number {
  const A = new Set(norm(a).toLowerCase().split(/\s+/).filter(Boolean));
  const B = new Set(norm(b).toLowerCase().split(/\s+/).filter(Boolean));
  if (!A.size || !B.size) return 0;
  const shared = [...A].filter((t) => B.has(t)).length;
  return shared / new Set([...A, ...B]).size;
}

async function main() {
  const id = process.argv[2];
  if (!id) {
    console.error(`usage: tsx scripts/mh-hsc-12-pyq/paper/reconcile-diff.ts <paperId>`);
    console.error(`reconcile papers: ${Object.values(PAPERS).filter((p) => p.bankStatus === "reconcile").map((p) => p.id).join(", ")}`);
    process.exit(1);
  }
  const paper = requirePaper(id);
  if (paper.bankStatus !== "reconcile") throw new Error(`${id} is not a reconcile paper`);

  const g = grammarFor(paper.subject);
  const qs = JSON.parse(readFileSync(questionsJsonPath(id), "utf8")) as PaperQuestion[];

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const { data: subj } = await db
    .from("subjects").select("id").eq("exam_id", EXAM_ID).eq("name", paper.subject).single();
  const { data: rows, error } = await db
    .from("questions")
    .select("id, question_number, text, visibility, chapter:chapters!chapter_id(name)")
    .eq("subject_id", subj!.id)
    .eq("question_kind", "pyq")
    .eq("pyq_year", paper.year)
    // MONTH IS REQUIRED, not decoration. Filtering on the year alone pulled 92
    // rows for a 46-row sitting once the June 2025 supplementary was committed,
    // because both sittings share pyq_year 2025. The comparison would then have
    // matched a February ref against a June question of the same number, which
    // is exactly the kind of wrong answer that looks plausible.
    .eq("pyq_month", paper.month)
    .order("question_number");
  if (error) throw new Error(error.message);

  const bank = new Map<string, { text: string; chapter: string; vis: string }[]>();
  for (const r of rows ?? []) {
    const ref = g.normaliseRef(String(r.question_number ?? ""));
    if (!ref) continue;
    const ch = Array.isArray(r.chapter) ? (r.chapter[0] as any)?.name : (r.chapter as any)?.name;
    bank.set(ref, [...(bank.get(ref) ?? []), { text: r.text, chapter: ch ?? "?", vis: r.visibility }]);
  }

  const same: string[] = [];
  const differs: { ref: string; sim: number; paper: string; bank: string; cosmetic: boolean }[] = [];
  const onlyPaper: string[] = [];

  for (const q of qs) {
    const ref = g.normaliseRef(q.ref)!;
    const hits = bank.get(ref);
    if (!hits?.length) {
      onlyPaper.push(ref);
      continue;
    }
    // A split pair maps to one parent, so compare against the best match.
    const best = hits
      .map((h) => ({ h, sim: similarity(q.stem, h.text) }))
      .sort((a, b) => b.sim - a.sim)[0];
    if (norm(best.h.text) === norm(q.stem)) same.push(ref);
    else
      differs.push({
        ref,
        sim: best.sim,
        paper: norm(q.stem),
        bank: norm(best.h.text),
        cosmetic: COSMETIC(best.h.text) === COSMETIC(q.stem),
      });
  }

  const paperRefs = new Set(qs.map((q) => g.normaliseRef(q.ref)!));
  const onlyBank = [...bank.keys()].filter((r) => !paperRefs.has(r));

  const regime = paper.thirdParty
    ? "THIRD PARTY: this PDF is a second transcription, not the artifact. A difference is a FLAG, never a verdict."
    : "BOARD PRINT: this PDF is the artifact the students sat. A difference settles in the PAPER's favour.";

  console.log(`\n${paper.id}  ${paper.month} ${paper.year}  (${paper.subject}, code ${paper.paperCode})`);
  console.log(`  ${regime}`);
  console.log(`  bank rows for this sitting: ${rows?.length ?? 0} · transcription rows: ${qs.length}`);
  const cosmetic = differs.filter((d) => d.cosmetic);
  const substantive = differs.filter((d) => !d.cosmetic);
  console.log(`\n  IDENTICAL after normalising : ${same.length}`);
  console.log(`  DIFFERENT, cosmetic only    : ${cosmetic.length}   (blank length, hyphens, math spacing)`);
  console.log(`  DIFFERENT, SUBSTANTIVE      : ${substantive.length}   <- the only ones needing adjudication`);
  console.log(`  on the PAPER, not the bank  : ${onlyPaper.length}${onlyPaper.length ? `  (${onlyPaper.join(", ")})` : ""}`);
  console.log(`  in the BANK, not the paper  : ${onlyBank.length}${onlyBank.length ? `  (${onlyBank.join(", ")})` : ""}`);

  if (substantive.length) {
    console.log(`\n  --- SUBSTANTIVE differences, closest match first ---`);
    for (const d of substantive.sort((a, b) => b.sim - a.sim)) {
      console.log(`\n  ${d.ref}   token overlap ${(d.sim * 100).toFixed(0)}%`);
      console.log(`    paper: ${d.paper.slice(0, 150)}`);
      console.log(`    bank : ${d.bank.slice(0, 150)}`);
    }
  }
  console.log("");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
