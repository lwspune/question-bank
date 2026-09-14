/**
 * Diff the blind derivation against an external answer key. APPLIES NOTHING.
 *
 *   npx tsx scripts/nda-gat/reconcile-key.ts 2026-2
 *
 * Reads `data/<id>.sourcekey.json` + `data/<id>.answers.json` and prints a work
 * list for a human. It never picks a winner, and that is the whole design: on
 * the sibling CDS Mathematics corpus, of five rows where a blind pass disagreed
 * with a prep-house key, FOUR were the KEY's error and ZERO were ours — so a
 * script that "applied the key" would have introduced four wrong answers into a
 * corpus that was already right.
 *
 * ## The agreement rate is also the EXAM-IDENTITY test
 *
 * This key's own heading reads "CDS II 2026 — GAT (SET-A)", which is a publisher
 * error (CDS has no GAT and no 150-question paper), but reasoning about a title
 * is not proof. The rate below settles it empirically: a key for the WRONG paper
 * scores near chance (~25%), a key for the right one scores near 90%. Printed
 * first, before any row-level verdict, because every verdict is meaningless if
 * this number is low.
 *
 * ## THE ADJUDICATION AXIS IS DERIVABLE-vs-RECALL, *NOT* PART A vs PART B
 *
 * On NDA Mathematics 2026-II all three key disagreements resolved AGAINST the
 * key, because a maths answer is derivable from the printed page.
 *
 * A recall fact is not. "Which committee recommended constitutional recognition
 * for local bodies" has no derivation, and a single blind pass measures ~94% on
 * recall in this repo — so there the key is the stronger source.
 *
 * The tempting proxy is the section boundary, and it is TOO BLUNT. Part B holds
 * ~40 Physics/Chemistry/Biology items that are as derivable as anything in Part
 * A. Deferring to the key on one of those defers on a question the page settles:
 * on the 2026-2 adjudication, Q93 (complex permanent tissue), Q104 (NCERT
 * slash-and-burn) and Q118 (landlocked states bordering MP — the key's option
 * lists two coastal states) were all Part B rows where the derivation won, and
 * Q118's key is self-refuting against the stem's own qualifier.
 *
 * The rule to apply:
 *
 *   DERIVABLE — Part A, plus any Part B item settled by science, a textbook
 *               statement, or the stem's own words. Re-derive from the page and
 *               let the derivation win where it is decisive.
 *   RECALL    — history, polity, current affairs, defence exercises, and
 *               anything turning on an external fact this pass does not hold.
 *               Defer to the KEY unless it is SELF-REFUTING (contradicts the
 *               stem's own data, or contradicts another of its own answers).
 *
 * The Part A/B split is still PRINTED below, because it is a useful summary
 * statistic and the cheapest first cut — but classify each disagreeing row by
 * what actually settles it, never by which side of Q50 it falls on.
 *
 * Output is ordered so the rows that can actually change an outcome come first.
 */
import { existsSync, readFileSync } from "node:fs";
import { dataPath, requirePaper } from "./config";
import { diffAgainstKey, sortForReview, type KeyEntry } from "../nda-pyq/lib";
import { PART_A_LAST, type Derivation } from "./lib";

function main() {
  const paper = requirePaper(process.argv[2]);
  const kPath = dataPath(paper.id, "sourcekey");
  const aPath = dataPath(paper.id, "answers");
  if (!existsSync(kPath)) throw new Error(`missing ${kPath}`);
  if (!existsSync(aPath)) throw new Error(`missing ${aPath} — derive first`);

  const key = JSON.parse(readFileSync(kPath, "utf8")) as {
    series: string;
    source: string;
    official?: boolean;
    entries: KeyEntry[];
  };
  const answers = JSON.parse(readFileSync(aPath, "utf8")) as { derivations: Derivation[] };

  // Refuse a key whose series does not match the booklet we ingested. Reading
  // the wrong series does not FAIL — it produces 150 confident wrong entries.
  if (key.series.toUpperCase() !== paper.base.series.toUpperCase()) {
    throw new Error(
      `key is series ${key.series} but the ingested booklet is series ${paper.base.series} — ` +
        `the four series hold the same questions in a DIFFERENT ORDER, so this key does not apply.`
    );
  }
  if (key.entries.length !== answers.derivations.length) {
    console.log(
      `! key has ${key.entries.length} entries against ${answers.derivations.length} derivations`
    );
  }

  const rows = diffAgainstKey(answers.derivations, key.entries, 1, 150);
  const agree = rows.filter((r) => r.verdict === "AGREE").length;
  const disagree = rows.filter((r) => r.verdict === "DISAGREE");
  const scored = agree + disagree.length;

  console.log(`${paper.id} vs ${key.source}${key.official ? "" : "  (third-party, NOT official)"}`);
  console.log(`\nAGREEMENT: ${agree}/${scored} = ${((agree / scored) * 100).toFixed(1)}%`);
  console.log(
    `  A key for the WRONG paper scores near chance (~25%). This is the exam-identity test;\n` +
      `  every row-level verdict below is meaningless if this number is low.`
  );

  const inA = (n: number) => n <= PART_A_LAST;
  const aAgree = rows.filter((r) => r.verdict === "AGREE" && inA(r.number)).length;
  const aDis = disagree.filter((r) => inA(r.number)).length;
  const bAgree = agree - aAgree;
  const bDis = disagree.length - aDis;
  console.log(
    `  Part A (English, derivable): ${aAgree}/${aAgree + aDis}` +
      `   Part B (GK, recall): ${bAgree}/${bAgree + bDis}`
  );

  // Agreement BY CONFIDENCE is the calibration measurement — it is what tells a
  // later reader whether the confidence flag is a usable review router. On UPSC
  // papers here the HIGH band ran 1,337/1,358 while essentially every error
  // landed in MED.
  console.log(`\nCALIBRATION — agreement by the deriver's own confidence:`);
  for (const band of ["HIGH", "MED", "LOW"]) {
    const inBand = rows.filter(
      (r) => (r.confidence ?? "").toUpperCase() === band && r.verdict !== "NO_KEY_ENTRY"
    );
    const ok = inBand.filter((r) => r.verdict === "AGREE").length;
    if (!inBand.length) continue;
    console.log(
      `  ${band.padEnd(5)} ${String(ok).padStart(3)}/${String(inBand.length).padEnd(3)} ` +
        `${((ok / inBand.length) * 100).toFixed(1)}%`
    );
  }

  if (!disagree.length) {
    console.log(`\nNo disagreements.`);
    return;
  }

  console.log(`\nDISAGREEMENTS (${disagree.length}) — ADJUDICATE EACH AGAINST THE PRINTED PAGE.`);
  console.log(
    `Ordered HIGH-confidence first: a HIGH disagreement is where the KEY is likeliest to be\n` +
      `the defective one. Part B rows default to the KEY unless it is self-refuting.\n`
  );
  for (const r of sortForReview(disagree)) {
    const part = inA(r.number) ? "PART A — derivable, re-derive from the page" : "PART B — recall, key wins unless self-refuting";
    console.log(`  Q${String(r.number).padEnd(4)} ours=${r.derived}  key=${r.key}  [${r.confidence}]`);
    console.log(`    ${part}`);
    if (r.reasoning) console.log(`    ours: ${r.reasoning.replace(/\s+/g, " ").slice(0, 400)}`);
    console.log("");
  }

  console.log(
    `This script APPLIES NOTHING. Adjudicate, then record each decision explicitly.`
  );
}

if (require.main === module) main();
