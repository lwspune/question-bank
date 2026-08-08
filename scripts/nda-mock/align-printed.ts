/**
 * Align a paper's MANUSCRIPT numbering against its typeset BOOKLET numbering.
 *
 *   npx tsx scripts/nda-mock/align-printed.ts m10
 *
 * The manuscript DOCX is what we extract from; the booklet PDF is what students
 * actually sat. They are supposed to agree, and mostly do — but Mock 10's
 * manuscript numbers two different questions "96", so from that point on the two
 * documents can disagree, and a question stored under the wrong number is worse
 * than one that is merely ugly.
 *
 * Matching is on PROSE WORDS only. The booklet's text layer shreds every formula
 * (a fraction becomes three separate lines), so math is unusable as a key, while
 * the English words around it survive intact. A stem with too few prose words to
 * be distinctive is reported as such rather than guessed at.
 *
 * Read-only: reports, changes nothing.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { requirePaper, DATA } from "./config";
import type { ExtractedQuestion } from "./extract";

/** Prose words: alphabetic runs of 4+ chars, lowercased, LaTeX commands dropped. */
export function proseWords(text: string): Set<string> {
  const noMath = text.replace(/\\[a-zA-Z]+/g, " ").replace(/[^A-Za-z ]/g, " ");
  return new Set(
    noMath
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length >= 4)
  );
}

/**
 * TRUE Jaccard — intersection over UNION.
 *
 * Dividing by the smaller set instead (the first attempt) scores 1.00 whenever
 * one stem's words are a subset of the other's, so a printed stem with three
 * prose words matched dozens of longer manuscript stems perfectly and the tool
 * reported 60 numbering errors in an already-committed paper. Union in the
 * denominator penalises the length mismatch, which is the whole signal here.
 */
export function overlap(a: Set<string>, b: Set<string>): number {
  if (!a.size || !b.size) return 0;
  let hit = 0;
  for (const w of a) if (b.has(w)) hit++;
  return hit / (a.size + b.size - hit);
}

/** Split a booklet's text layer into printed question segments. */
export function splitPrinted(full: string): { number: number; text: string }[] {
  const re = /(?:^|\n)\s*(\d{1,3})\s*[.)]\t/g;
  const found: { number: number; at: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(full)) !== null) found.push({ number: Number(m[1]), at: m.index });
  // The booklet opens with a 1..5 instructions list before question 1; keep the
  // LAST run so that boilerplate loses, mirroring splitQuestionBlocks.
  const out: { number: number; text: string }[] = [];
  for (let i = 0; i < found.length; i++) {
    const end = i + 1 < found.length ? found[i + 1].at : full.length;
    out.push({ number: found[i].number, text: full.slice(found[i].at, end) });
  }
  const seen = new Map<number, { number: number; text: string }>();
  for (const q of out) seen.set(q.number, q); // later wins
  return [...seen.values()].sort((a, b) => a.number - b.number);
}

function main() {
  const paper = requirePaper(process.argv[2]);
  if (!paper.printedPdf || !existsSync(paper.printedPdf)) {
    console.log(`${paper.id}: no printed booklet on disk — nothing to align against.`);
    return;
  }
  const full = execFileSync("python", ["-c", PY, paper.printedPdf], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  if (full.trim().length < 2000) {
    console.log(`${paper.id}: booklet has no usable text layer (scanned) — needs vision, skipping.`);
    return;
  }

  const printed = splitPrinted(full);
  const manuscript: ExtractedQuestion[] = JSON.parse(
    readFileSync(join(DATA, `${paper.id}.extract.json`), "utf8")
  );

  console.log(`\n=== ${paper.label} — manuscript vs printed booklet ===`);
  console.log(`manuscript questions: ${manuscript.length}   printed questions: ${printed.length}`);

  // A stem needs enough prose to be distinctive on BOTH sides. Six words is
  // where "Which of the following is correct?" boilerplate stops dominating.
  const MIN_WORDS = 6;
  // A claim of a shifted number is only made when the winner is decisively
  // better than the runner-up; a near-tie means the words cannot tell them apart.
  const MIN_SCORE = 0.6;
  const MIN_MARGIN = 0.15;

  const printedWords = printed
    .map((p) => ({ ...p, words: proseWords(p.text) }))
    .filter((p) => p.words.size >= MIN_WORDS);
  let shifted = 0;
  let thin = 0;
  let unmatched = 0;
  for (const q of manuscript) {
    const mine = proseWords(q.stem);
    if (mine.size < MIN_WORDS) {
      thin++;
      continue;
    }
    const scored = printedWords
      .map((p) => ({ n: p.number, s: overlap(mine, p.words) }))
      .sort((a, b) => b.s - a.s);
    const best = scored[0];
    const runnerUp = scored.find((x) => x.n !== best.n)?.s ?? 0;
    const label = Number(q.numberLabel ?? q.number);
    if (best.s < MIN_SCORE || best.s - runnerUp < MIN_MARGIN) {
      if (best.n !== label) unmatched++;
      continue;
    }
    if (best.n !== label) {
      shifted++;
      console.log(`  Q${q.number} -> printed ${best.n} (score ${best.s.toFixed(2)}, next ${runnerUp.toFixed(2)})`);
    }
  }
  console.log(
    `\nconfident numbering disagreements: ${shifted}` +
      `   (${thin} stem too formula-heavy, ${unmatched} no decisive match — both inconclusive, not clean)`
  );
  if (!shifted) console.log("no confident disagreement between manuscript and booklet numbering.");
}

const PY = `
import sys, fitz
d = fitz.open(sys.argv[1])
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
print("\\n".join(d[i].get_text() for i in range(d.page_count)))
`;

if (require.main === module) main();
