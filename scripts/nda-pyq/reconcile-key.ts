/**
 * Diff an external answer key against the blind derivation pass.
 *
 *   npx tsx scripts/nda-pyq/reconcile-key.ts 2026-2
 *   npx tsx scripts/nda-pyq/reconcile-key.ts 2026-2 --only-disagree
 *
 * Reads data/<id>.answers.json (the blind pass) and data/<id>.sourcekey.json
 * (the external key, as [{ "number": 1, "answer": "C" }, ...]).
 *
 * IT NEVER APPLIES ANYTHING. Output is a work list for a human, and that is the
 * whole design rather than caution:
 *
 *   - On the sibling CDS Mathematics corpus, across the only two papers where a
 *     blind pass could be scored against a key, FIVE rows disagreed. FOUR were
 *     the KEY's error and ZERO were ours. A script that "applied the key" would
 *     have introduced four wrong answers into a corpus that was already right.
 *   - A prep-house key is not a published UPSC key. Measured on that same
 *     corpus it carries roughly 2 errors per 100.
 *
 * So a disagreement is a QUESTION — which of the two is wrong? — and only a
 * human re-deriving from the printed page can answer it. Record the outcome by
 * editing data/<id>.answers.json and adding the question number to its
 * `reconciled` array, which is what commit.ts reads.
 *
 * READING ORDER IS BY CONFIDENCE, HIGH FIRST, and that is deliberate. Measured
 * across UPSC papers in this repo, HIGH-confidence derivations ran 1,337/1,358
 * while essentially every error landed in MED — and the brief requires a MED row
 * to NAME its runner-up, which is repeatedly what the key turns out to say. So a
 * MED disagreement is usually ours and cheap to confirm; a HIGH disagreement is
 * where the key is most likely to be the defective one, and deserves the closest
 * reading. Sorting the cheap cases to the bottom is not an accident.
 */
import { existsSync, readFileSync } from "node:fs";
import { dataPath, requirePaper } from "./config";
import { diffAgainstKey, normalizeDerivations, sortForReview, type Derivation, type KeyEntry } from "./lib";
import { QUESTIONS_PER_PAPER } from "./config";

function main() {
  const paper = requirePaper(process.argv[2]);
  const onlyDisagree = process.argv.includes("--only-disagree");

  const aPath = dataPath(paper.id, "answers");
  const kPath = dataPath(paper.id, "sourcekey");
  if (!existsSync(aPath)) throw new Error(`missing ${aPath} — run the derivation pass first`);
  if (!existsSync(kPath)) {
    throw new Error(
      `missing ${kPath}.\n` +
        `  Write the external key there as: [{ "number": 1, "answer": "C" }, ...]\n` +
        `  It is NOT read by commit.ts — only by this script.`
    );
  }

  const answersFile = JSON.parse(readFileSync(aPath, "utf8")) as { derivations: Derivation[] };
  const derivations = normalizeDerivations(answersFile.derivations ?? []);
  const rawKey = JSON.parse(readFileSync(kPath, "utf8")) as KeyEntry[] | { entries: KeyEntry[] };
  const key: KeyEntry[] = Array.isArray(rawKey) ? rawKey : (rawKey.entries ?? []);

  const rows = sortForReview(diffAgainstKey(derivations, key, 1, QUESTIONS_PER_PAPER));

  const tally = new Map<string, number>();
  for (const r of rows) tally.set(r.verdict, (tally.get(r.verdict) ?? 0) + 1);
  const agree = tally.get("AGREE") ?? 0;
  const disagree = tally.get("DISAGREE") ?? 0;
  const scored = agree + disagree;

  console.log(`${paper.id}: ${derivations.length} derivations vs ${key.length} key entries`);
  console.log(`  ${[...tally.entries()].map(([k, v]) => `${k} ${v}`).join("  ·  ")}`);
  if (scored) {
    console.log(
      `  raw agreement with the key: ${agree}/${scored} (${((agree / scored) * 100).toFixed(1)}%)`
    );
    console.log(
      `  NOT an accuracy figure. It counts DISAGREEMENT with a key that is itself` +
        ` fallible;\n  every row below has to be adjudicated against the printed page before` +
        ` it means anything.`
    );
  }

  console.log(`\n--- WORK LIST (disagreements first, HIGH confidence at the top) ---`);
  for (const r of rows) {
    if (r.verdict === "AGREE" && onlyDisagree) continue;
    if (r.verdict === "AGREE") continue; // never worth printing 114 lines of "same"
    const conf = r.confidence ? ` [${r.confidence}]` : "";
    console.log(
      `\nQ${String(r.number).padStart(3)}  ${r.verdict}${conf}  derived=${r.derived ?? "NULL"}  key=${r.key ?? "-"}`
    );
    if (r.reasoning) console.log(`      ${r.reasoning.replace(/\n/g, "\n      ")}`);
  }
  if (!disagree) console.log(`\n(no disagreements)`);

  console.log(
    `\nNothing was written. To record an adjudication, edit ${aPath}:\n` +
      `  - change the derivation's \`answer\` if the KEY is right;\n` +
      `  - leave it if OUR derivation is right;\n` +
      `  - either way add the number to \`reconciled\` so commit.ts marks the row as hand-checked.`
  );
}

main();
