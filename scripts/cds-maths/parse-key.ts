/**
 * Parse the EXTERNAL answer key for a CDS Elementary Mathematics sitting into
 * `data/<paperId>.sourcekey.json`.
 *
 *   npx tsx scripts/cds-maths/parse-key.ts 2020-1
 *   npx tsx scripts/cds-maths/parse-key.ts 2020-2 --apply
 *
 * ONLY 2020-I and 2020-II have one. No booklet in this corpus prints a key, and
 * these two .docx files are the only external anchor that exists anywhere on
 * disk. They are what make the pilot measurable.
 *
 * WHAT THIS KEY IS, AND IS NOT. It is a PREP-HOUSE key, not a published UPSC
 * key. On the JEE corpus a prep-house key was wrong often enough to need its own
 * triage lane, and one whole shift's key was displaced by +2 — so this file is
 * EVIDENCE, never ground truth.
 *
 * Consequently it is deliberately NOT wired into commit.ts. The committed answer
 * is the DERIVED one; this key is read only by score.ts, AFTER both blind passes
 * are written, to measure them. Feeding it in earlier would destroy the one
 * measurement the pilot exists to produce — a blind pass that has seen the key
 * is not blind, and its agreement with that key means nothing.
 *
 * The two files are laid out differently (2020-I is a two-column Question/Answer
 * table; 2020-II pairs 1-50 and 51-100 side by side in one four-column table), so
 * this parses PAIRS rather than rows and then asserts the result covers 1..100
 * exactly once. That assertion is the real check: a layout this loose would
 * otherwise silently yield a partial key.
 */
import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { QUESTIONS_PER_PAPER, dataPath, requirePaper } from "./config";

/**
 * Pull (number, letter) pairs out of the pandoc plain-text rendering.
 *
 * Anchored so a stray digit cannot pair with a stray letter: the number and the
 * letter must be adjacent, separated only by spaces and at most one table pipe.
 * Exported for the tests in tests/cds-maths-parse-key.test.ts.
 */
export function parseKeyPairs(text: string): Map<number, string> {
  const out = new Map<number, string>();
  const re = /\b(\d{1,3})\s*\|?\s+([A-D])\b(?![A-Za-z])/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const n = Number(m[1]);
    if (n < 1 || n > QUESTIONS_PER_PAPER) continue;
    // First reading wins. A key table repeated in a header/footer would
    // otherwise let a later, partial copy overwrite a complete one.
    if (!out.has(n)) out.set(n, m[2]);
  }
  return out;
}

function main() {
  const paper = requirePaper(process.argv[2]);
  const apply = process.argv.includes("--apply");

  if (!paper.answerKey) {
    throw new Error(
      `${paper.id} has no external answer key. Only 2020-1 and 2020-2 do — every other ` +
        `booklet in this corpus ends at Q100 with no key printed anywhere.`
    );
  }

  const res = spawnSync("pandoc", ["-t", "plain", paper.answerKey], { encoding: "utf8" });
  if (res.status !== 0) throw new Error(`pandoc failed on ${paper.answerKey}:\n${res.stderr}`);

  const pairs = parseKeyPairs(res.stdout);

  const missing: number[] = [];
  for (let n = 1; n <= QUESTIONS_PER_PAPER; n++) if (!pairs.has(n)) missing.push(n);

  const dist = new Map<string, number>();
  for (const v of pairs.values()) dist.set(v, (dist.get(v) ?? 0) + 1);

  console.log(`${paper.id}: parsed ${pairs.size} of ${QUESTIONS_PER_PAPER} answers`);
  console.log(`  source: ${paper.answerKey}`);
  console.log(
    `  letter distribution: ${["A", "B", "C", "D"].map((l) => `${l}=${dist.get(l) ?? 0}`).join("  ")}`
  );
  if (missing.length) console.log(`  MISSING: ${missing.join(", ")}`);

  // A key that is not exactly 1..100 is a parse failure, not a short key — the
  // docx tables visibly carry all 100 rows.
  if (missing.length) {
    throw new Error(
      `refusing to write a partial key (${pairs.size}/${QUESTIONS_PER_PAPER}). ` +
        `The .docx does carry all 100 rows, so this is a parsing failure — inspect ` +
        `the pandoc output before loosening the pattern.`
    );
  }

  if (!apply) {
    console.log(`\n[dry-run] pass --apply to write ${paper.id}.sourcekey.json. Nothing written.`);
    return;
  }

  const payload = {
    paper: paper.id,
    source: paper.answerKey,
    provenance:
      "Prep-house answer key, not a published UPSC key. Evidence for scoring the blind " +
      "passes; never a substitute for them.",
    answers: Object.fromEntries([...pairs.entries()].sort((a, b) => a[0] - b[0])),
  };
  writeFileSync(dataPath(paper.id, "sourcekey"), JSON.stringify(payload, null, 2) + "\n", "utf8");
  console.log(`\nwrote ${dataPath(paper.id, "sourcekey")}`);
}

if (require.main === module) main();
