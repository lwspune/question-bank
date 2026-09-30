/**
 * Parse every paper's key tokens into the Set-A answer key.
 *
 *   npx tsx scripts/mpsc/keys.ts            # report every paper
 *   npx tsx scripts/mpsc/keys.ts --write    # also write data/<id>.key.json
 *   npx tsx scripts/mpsc/keys.ts ssp --write   # only papers whose id starts "ssp"
 *
 * Reads data/<id>.keytokens.json (printed lines) (extract.py keys, or hand-transcribed for the
 * image-only 2019-c key). Refuses to write a key that does not cover exactly
 * 1..N (80 for CSAT, else 100), or whose four sets do not hold the same letter counts (setBalanceIssues)
 * — a shifted, partial or misread key is worse than none.
 *
 * CSAT's decision-making questions print MARKS per option instead of a letter.
 * They are hand-transcribed, all four sets, into data/<id>.graded.json
 * ({"sets": {"A": {"76": [0, 1, 1.5, 2.5], ...}, "B": ...}}), balance-checked
 * across sets, keyed to Set A's best option, and written into key.json as
 * `graded` so the marks reach the solution.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { ALL_PAPERS, BOOKLET_SET_INDEX, dataPath, questionCount } from "./config";
import { gradedBalanceIssues, gradedKeyLetter, parseKeyLines, setBalanceIssues, type KeyLetter } from "./lib";

function main() {
  const write = process.argv.includes("--write");
  const only = process.argv.slice(2).find((a) => !a.startsWith("--"));
  let bad = 0;
  for (const p of ALL_PAPERS.filter((x) => !only || x.id.startsWith(only))) {
    const f = dataPath(p.id, "keytokens");
    if (!existsSync(f)) {
      console.log(`${p.id}: no keytokens file`);
      bad++;
      continue;
    }
    const { lines } = JSON.parse(readFileSync(f, "utf8")) as { lines: string[][] };
    const { rows, errors, ignored } = parseKeyLines(lines);
    // The sets are one paper reordered: an unbalanced key has a misread cell.
    errors.push(...setBalanceIssues(rows));
    const gradedFile = dataPath(p.id, "graded");
    let graded: Record<string, number[]> = {};
    if (existsSync(gradedFile)) {
      const sets: Record<string, Record<string, number[]>> = JSON.parse(readFileSync(gradedFile, "utf8")).sets;
      errors.push(...gradedBalanceIssues(sets));
      graded = sets.A;
      for (const [q, marks] of Object.entries(graded)) {
        if (rows.has(Number(q))) errors.push(`Q${q}: in both the letter key and the graded grid`);
        try {
          const letter = gradedKeyLetter(marks);
          rows.set(Number(q), [letter, letter, letter, letter]); // Set A is what is keyed; the grid's sets were balance-checked above
        } catch (e) {
          errors.push(`Q${q}: ${(e as Error).message}`);
        }
      }
    }
    const total = questionCount(p);
    const missing: number[] = [];
    for (let q = 1; q <= total; q++) if (!rows.has(q)) missing.push(q);
    const extra = [...rows.keys()].filter((q) => q > total);
    const key: Record<number, KeyLetter> = {};
    for (const [q, sets] of rows) if (q <= total) key[q] = sets[BOOKLET_SET_INDEX];
    const cancelled = Object.entries(key).filter(([, v]) => v === "#").map(([q]) => Number(q));
    const ok = errors.length === 0 && missing.length === 0 && extra.length === 0;
    console.log(
      `${p.id}: ${rows.size} rows · cancelled(set A) [${cancelled.join(",")}]` +
        (Object.keys(graded).length ? ` · graded [${Object.keys(graded).join(",")}]` : "") +
        (ignored.length ? ` · footer ${JSON.stringify(ignored)}` : "") +
        (ok ? " · OK" : ` · errors ${JSON.stringify(errors)} missing [${missing.join(",")}] extra [${extra.join(",")}]`)
    );
    if (!ok) {
      bad++;
      continue;
    }
    if (write) writeFileSync(dataPath(p.id, "key"), JSON.stringify({ paper: p.id, set: "A", key, cancelled, ...(Object.keys(graded).length ? { graded } : {}) }, null, 1));
  }
  if (bad) process.exitCode = 1;
}

main();
