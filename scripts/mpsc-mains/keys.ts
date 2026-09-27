/**
 * Parse every paper's key tokens into its Set-A answer key.
 *
 *   npx tsx scripts/mpsc-mains/keys.ts            # report every paper
 *   npx tsx scripts/mpsc-mains/keys.ts --write    # also write data/<id>.key.json
 *
 * Reads data/<id>.keytokens.json (extract.py keys, or hand-transcribed for an
 * image-only key). Refuses to write a key that does not cover exactly 1..N — a
 * shifted or partial key is worse than none. A key that parses is still NOT
 * trusted: merge.ts measures it against the transcriber's own answers, because
 * this file's keys do not always sit next to their booklet (see config.ts).
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { parseKeyLines } from "../mpsc/lib";
import { BOOKLET_SET_INDEX, PAPERS, dataPath } from "./config";
import type { KeyLetter } from "./lib";

function main() {
  const write = process.argv.includes("--write");
  let bad = 0;
  for (const p of PAPERS) {
    if (!p.keyPages) {
      console.log(`${p.id}: no key on file${p.derived ? " (answers derived)" : ""}`);
      continue;
    }
    const f = dataPath(p.id, "keytokens");
    if (!existsSync(f)) {
      console.log(`${p.id}: no keytokens file`);
      bad++;
      continue;
    }
    const { lines } = JSON.parse(readFileSync(f, "utf8")) as { lines: string[][] };
    const { rows, errors, ignored } = parseKeyLines(lines);
    const missing: number[] = [];
    for (let q = 1; q <= p.questions; q++) if (!rows.has(q)) missing.push(q);
    const extra = [...rows.keys()].filter((q) => q > p.questions);
    const key: Record<number, KeyLetter> = {};
    for (const [q, sets] of rows) if (q <= p.questions) key[q] = sets[BOOKLET_SET_INDEX];
    const cancelled = Object.entries(key)
      .filter(([, v]) => v === "#")
      .map(([q]) => Number(q));
    const ok = errors.length === 0 && missing.length === 0 && extra.length === 0;
    console.log(
      `${p.id}: ${rows.size} rows · cancelled [${cancelled.join(",")}]` +
        (ignored.length ? ` · set aside ${JSON.stringify(ignored)}` : "") +
        (ok ? " · OK" : ` · errors ${JSON.stringify(errors)} missing [${missing.join(",")}] extra [${extra.join(",")}]`)
    );
    if (!ok) {
      bad++;
      continue;
    }
    if (write) writeFileSync(dataPath(p.id, "key"), JSON.stringify({ paper: p.id, set: "A", key, cancelled }, null, 1));
  }
  if (bad) process.exitCode = 1;
}

main();
