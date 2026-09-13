/**
 * Parse a Centurion-style multi-series answer key PDF into `<id>.sourcekey.json`.
 *
 *   npx tsx scripts/nda-pyq/parse-key.ts 2026-2 "C:/path/to/key.pdf" A
 *   npx tsx scripts/nda-pyq/parse-key.ts 2026-2 "C:/path/to/key.pdf" A --apply
 *
 * THE SERIES COLUMN IS THE WHOLE RISK. The key prints SET-A..SET-D side by side
 * and the four series are independently scrambled, so reading the wrong column
 * does not fail — it produces 120 confident, wrong entries and a mismatch list
 * that looks like a catastrophe in the transcription. Our booklet's series is
 * printed on its cover and recorded as `series` in config.ts; this script
 * REFUSES if the requested series is not the one the paper declares.
 *
 * The layout is three blocks of 40 across the page, so the token stream runs
 *   N.  a b c d   N+40.  a b c d   N+80.  a b c d
 * and the parser asserts that shape rather than assuming it: every row must
 * carry three question numbers in the expected arithmetic relation and twelve
 * A-D letters. A layout change fails loudly instead of shifting every answer.
 *
 * Output is a plain array so it can be hand-edited:
 *   [{ "number": 1, "answer": "A" }, ...]
 *
 * It is read ONLY by reconcile-key.ts. `commit.ts` never reads it — a pipeline
 * that quietly substituted a source key would destroy the blind pass's
 * independence, which is the one thing that makes a disagreement informative.
 */
import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { QUESTIONS_PER_PAPER, dataPath, requirePaper } from "./config";

const LETTER = /^[A-D]$/;

export type ParsedKey = { number: number; answer: string };

/**
 * Exported for tests. `seriesIndex` is 0 for SET-A .. 3 for SET-D.
 *
 * `blocks` is the number of side-by-side question blocks on the page (3 here,
 * covering 1-40 / 41-80 / 81-120). It is asserted, not assumed: the row's three
 * printed numbers must be n, n+perBlock, n+2*perBlock.
 */
export function parseKeyTokens(
  tokens: string[],
  seriesIndex: number,
  total: number,
  blocks: number
): { entries: ParsedKey[]; errors: string[] } {
  const errors: string[] = [];
  const entries: ParsedKey[] = [];
  const perBlock = total / blocks;

  // Find the first row start: a token like "1." followed by `blocks * 4` letters.
  let i = tokens.findIndex(
    (t, k) =>
      t === "1." &&
      tokens.slice(k + 1, k + 1 + blocks * 4 + (blocks - 1)).some((x) => LETTER.test(x))
  );
  if (i < 0) return { entries, errors: ["could not find the start of the table (no `1.` row)"] };

  for (let row = 1; row <= perBlock; row++) {
    for (let b = 0; b < blocks; b++) {
      const expected = row + b * perBlock;
      const numTok = tokens[i];
      if (numTok !== `${expected}.`) {
        errors.push(`row ${row} block ${b + 1}: expected "${expected}." but found "${numTok}"`);
        return { entries, errors };
      }
      const letters = tokens.slice(i + 1, i + 5);
      if (letters.length !== 4 || !letters.every((l) => LETTER.test(l))) {
        errors.push(
          `Q${expected}: expected four A-D letters, found ${JSON.stringify(letters)} — layout changed`
        );
        return { entries, errors };
      }
      entries.push({ number: expected, answer: letters[seriesIndex] });
      i += 5;
    }
  }

  entries.sort((a, b) => a.number - b.number);
  if (entries.length !== total) errors.push(`parsed ${entries.length} entries, expected ${total}`);
  return { entries, errors };
}

function main() {
  const paper = requirePaper(process.argv[2]);
  const pdf = process.argv[3];
  const series = (process.argv[4] ?? "").toUpperCase();
  const apply = process.argv.includes("--apply");

  if (!pdf) throw new Error("usage: parse-key.ts <paperId> <keyPdfPath> <SERIES> [--apply]");
  if (!/^[A-D]$/.test(series)) throw new Error(`series must be A, B, C or D — got "${series}"`);
  if (paper.series && paper.series !== series) {
    throw new Error(
      `${paper.id} is booklet series ${paper.series} (printed on its cover) but you asked for ${series}.\n` +
        `  The four series are independently scrambled — reading the wrong column yields 120 confident\n` +
        `  WRONG answers and a mismatch list that looks like a transcription catastrophe. Refusing.`
    );
  }

  const py = `
import fitz, sys, json
d = fitz.open(sys.argv[1])
print(json.dumps(" ".join(p.get_text() for p in d).split()))
`;
  const res = spawnSync("python", ["-c", py, pdf], { encoding: "utf8" });
  if (res.status !== 0) throw new Error(`pdf read failed: ${res.stderr}`);
  const tokens = JSON.parse(res.stdout) as string[];

  const seriesIndex = series.charCodeAt(0) - 65;
  const { entries, errors } = parseKeyTokens(tokens, seriesIndex, QUESTIONS_PER_PAPER, 3);

  console.log(`${paper.id}: series ${series} (column ${seriesIndex + 1} of 4)`);
  console.log(`parsed ${entries.length} entries`);
  const dist = new Map<string, number>();
  for (const e of entries) dist.set(e.answer, (dist.get(e.answer) ?? 0) + 1);
  console.log(
    `key answer distribution: ${["A", "B", "C", "D"].map((l) => `${l} ${dist.get(l) ?? 0}`).join("  ")}`
  );

  if (errors.length) {
    console.log(`\nERRORS (${errors.length}):`);
    for (const e of errors) console.log(`  ${e}`);
    throw new Error("refusing to write a key that did not parse cleanly.");
  }
  if (!apply) {
    console.log(`\n[dry-run] pass --apply to write ${paper.id}.sourcekey.json. Nothing written.`);
    return;
  }
  writeFileSync(dataPath(paper.id, "sourcekey"), JSON.stringify(entries, null, 2) + "\n", "utf8");
  console.log(`\nwrote ${dataPath(paper.id, "sourcekey")}`);
}

if (require.main === module) main();
