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
import { existsSync, readFileSync, writeFileSync } from "node:fs";
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

/** One reader's transcription of the printed key table. */
export type KeyRead = {
  readerId: string;
  answers: Record<string, string>;
};

export type KeyDisagreement = {
  q: number;
  reads: { readerId: string; value: string }[];
};

export type Reconciliation = {
  /** Only the cells EVERY reader read, agreeing, with a legal letter. */
  answers: Map<number, string>;
  disagreements: KeyDisagreement[];
  /** Questions at least one reader did not record at all. */
  missing: number[];
  invalid: { q: number; readerId: string; value: string }[];
};

/**
 * Reconcile N independent vision reads of a printed answer-key table.
 *
 * WHY THIS EXISTS. The 2020 keys are born-digital .docx and `parseKeyPairs`
 * reads them deterministically. A PUBLISHED UPSC key arrives as a SCAN with zero
 * text layer, so reading it is a vision transcription of 100 table cells, and
 * that has an error rate the .docx path simply does not.
 *
 * The defect is specific and nasty: a single misread cell manufactures a FALSE
 * DISAGREEMENT between the key and the derived answer, and a human then spends
 * real effort adjudicating a dispute that never existed. Worse, on a paper where
 * the key is treated as near-ground-truth, a misread could overturn a CORRECT
 * derivation.
 *
 * So this emits a cell only where every reader agrees, and REFUSES the rest by
 * leaving them out — the caller decides what to do about a hole. It never votes:
 * two-against-one is not a majority on a table anyone can go and re-read, and a
 * tie-break rule would quietly convert "we are unsure" into "we are sure".
 *
 * Pure, and exercised by tests/cds-maths-parse-key.test.ts.
 */
export function reconcileKeyReads(reads: KeyRead[]): Reconciliation {
  if (reads.length < 2) {
    throw new Error(
      `reconcileKeyReads needs at least two independent reads, got ${reads.length}. ` +
        `A single vision read of a scanned table has an unmeasured error rate, and ` +
        `the whole point of this path is that nothing downstream can detect a misread cell.`
    );
  }

  const answers = new Map<number, string>();
  const disagreements: KeyDisagreement[] = [];
  const missing: number[] = [];
  const invalid: { q: number; readerId: string; value: string }[] = [];

  for (let q = 1; q <= QUESTIONS_PER_PAPER; q++) {
    const seen: { readerId: string; value: string }[] = [];
    let hole = false;
    let bad = false;

    for (const r of reads) {
      const raw = r.answers[String(q)];
      if (raw === undefined || raw === null || String(raw).trim() === "") {
        hole = true;
        continue;
      }
      // Case and padding are transcription noise, not disagreement — normalise
      // BEFORE comparing so "a" and "A" never open a dispute a human must read.
      const value = String(raw).trim().toUpperCase();
      if (!/^[A-D]$/.test(value)) {
        invalid.push({ q, readerId: r.readerId, value: String(raw) });
        bad = true;
        continue;
      }
      seen.push({ readerId: r.readerId, value });
    }

    if (hole) missing.push(q);
    if (hole || bad) continue;

    const distinct = new Set(seen.map((s) => s.value));
    if (distinct.size === 1) answers.set(q, seen[0].value);
    else disagreements.push({ q, reads: seen });
  }

  return { answers, disagreements, missing, invalid };
}

/**
 * Read the key from a born-digital .docx via pandoc. The 2020 pair only.
 */
function fromDocx(keyPath: string): { pairs: Map<number, string>; provenance: string } {
  const res = spawnSync("pandoc", ["-t", "plain", keyPath], { encoding: "utf8" });
  if (res.status !== 0) throw new Error(`pandoc failed on ${keyPath}:\n${res.stderr}`);
  return {
    pairs: parseKeyPairs(res.stdout),
    provenance:
      "Prep-house answer key, not a published UPSC key. Evidence for scoring the blind " +
      "passes; never a substitute for them.",
  };
}

/**
 * Read the key from a SCANNED PDF, by reconciling two or more independent vision
 * reads written by key-reader agents (see KEY_READ_BRIEF.md).
 *
 * This path does no OCR of its own on purpose. The reads are the evidence; this
 * function's whole job is to refuse anything the readers did not agree on.
 */
function fromVisionReads(
  paperId: string,
  keyPath: string
): { pairs: Map<number, string>; provenance: string } {
  const reads: KeyRead[] = [];
  const headers: string[] = [];
  for (let n = 1; n <= 9; n++) {
    const f = dataPath(paperId, `keyread${n}`);
    if (!existsSync(f)) continue;
    const raw = JSON.parse(readFileSync(f, "utf8"));
    reads.push({ readerId: raw.readerId ?? `keyread${n}`, answers: raw.answers ?? {} });
    const h = raw.report?.headerRead ?? {};
    headers.push(
      `    ${raw.readerId ?? `keyread${n}`}: series=${raw.series ?? "?"} ` +
        `total=${h.totalQuestions ?? "?"} dropped=${h.questionsDropped ?? "?"} scored=${h.questionsScored ?? "?"}`
    );
    const low = raw.report?.lowConfidenceCells ?? [];
    if (low.length) {
      console.log(`  ${raw.readerId ?? `keyread${n}`} flagged ${low.length} low-confidence cell(s):`);
      for (const c of low) console.log(`    Q${c.q} read "${c.read}" — ${c.why ?? ""}`);
    }
  }

  if (reads.length < 2) {
    throw new Error(
      `${paperId}: found ${reads.length} key read(s) in data/. This key is a SCAN, so it ` +
        `needs at least two INDEPENDENT vision reads — run the key-reader agents against ` +
        `scripts/cds-maths/KEY_READ_BRIEF.md and write ${paperId}.keyread1.json / .keyread2.json.`
    );
  }

  console.log(`  reconciling ${reads.length} independent vision reads:`);
  for (const h of headers) console.log(h);

  const rec = reconcileKeyReads(reads);

  if (rec.invalid.length) {
    for (const i of rec.invalid) console.log(`  INVALID: Q${i.q} ${i.readerId} read "${i.value}"`);
  }
  if (rec.disagreements.length) {
    console.log(`\n  READERS DISAGREE on ${rec.disagreements.length} cell(s):`);
    for (const d of rec.disagreements) {
      console.log(`    Q${d.q}: ${d.reads.map((r) => `${r.readerId}=${r.value}`).join("  ")}`);
    }
    throw new Error(
      `refusing to write a key with ${rec.disagreements.length} unreconciled cell(s). ` +
        `Crop those cells from the key PDF at high zoom, settle them by eye, and correct ` +
        `the reader file that is wrong. Do NOT majority-vote: on a table anyone can go and ` +
        `re-read, a tie-break rule converts "we are unsure" into "we are sure".`
    );
  }

  return {
    pairs: rec.answers,
    provenance:
      "OFFICIAL UPSC provisional answer key, read by two independent vision passes that " +
      "agreed on all 100 cells. Provisional: UPSC invites representations and issues a " +
      "final key later, so this is strong evidence and still not infallible.",
  };
}

function main() {
  const paper = requirePaper(process.argv[2]);
  const apply = process.argv.includes("--apply");

  if (!paper.answerKey) {
    throw new Error(
      `${paper.id} has no external answer key. Only 2020-1, 2020-2 and 2026-2 do — every ` +
        `other booklet in this corpus ends at Q100 with no key printed anywhere.`
    );
  }

  console.log(`${paper.id}: reading key`);
  console.log(`  source: ${paper.answerKey}`);

  // Dispatch on the ARTIFACT, not on the paper id: a born-digital .docx parses
  // deterministically, a scan does not and must go through independent reads.
  const isScan = /\.pdf$/i.test(paper.answerKey);
  const { pairs, provenance } = isScan
    ? fromVisionReads(paper.id, paper.answerKey)
    : fromDocx(paper.answerKey);

  const missing: number[] = [];
  for (let n = 1; n <= QUESTIONS_PER_PAPER; n++) if (!pairs.has(n)) missing.push(n);

  const dist = new Map<string, number>();
  for (const v of pairs.values()) dist.set(v, (dist.get(v) ?? 0) + 1);

  console.log(`\n  parsed ${pairs.size} of ${QUESTIONS_PER_PAPER} answers`);
  console.log(
    `  letter distribution: ${["A", "B", "C", "D"].map((l) => `${l}=${dist.get(l) ?? 0}`).join("  ")}`
  );
  if (missing.length) console.log(`  MISSING: ${missing.join(", ")}`);

  // A key that is not exactly 1..100 is a parse/read failure, not a short key —
  // every key in this corpus visibly carries all 100 rows.
  if (missing.length) {
    throw new Error(
      `refusing to write a partial key (${pairs.size}/${QUESTIONS_PER_PAPER}). ` +
        `The source does carry all 100 rows, so this is a read failure — inspect it ` +
        `before loosening anything.`
    );
  }

  if (!apply) {
    console.log(`\n[dry-run] pass --apply to write ${paper.id}.sourcekey.json. Nothing written.`);
    return;
  }

  const payload = {
    paper: paper.id,
    source: paper.answerKey,
    provenance,
    answers: Object.fromEntries([...pairs.entries()].sort((a, b) => a[0] - b[0])),
  };
  writeFileSync(dataPath(paper.id, "sourcekey"), JSON.stringify(payload, null, 2) + "\n", "utf8");
  console.log(`\nwrote ${dataPath(paper.id, "sourcekey")}`);
}

if (require.main === module) main();
