/**
 * Merge a paper's transcription batches and check them.
 *
 *   npx tsx scripts/mpsc-mains/merge.ts aso-2017            # report only
 *   npx tsx scripts/mpsc-mains/merge.ts aso-2017 --write    # also write data/<id>.merged.json
 *   npx tsx scripts/mpsc-mains/merge.ts aso-2017 --show     # list every key disagreement with both options
 *
 * Reads data/<id>.t*.json (batches, any order) + data/<id>.key.json.
 *
 * Reports coverage 1..N, duplicates, `questionIssues`, the literal "\n" guard
 * commitStaged would refuse at write time, and KEY FIT — the official key
 * against the transcriber's own answers. This file's keys do not always sit
 * next to their booklet (config.ts), so a key is trusted only when it agrees:
 * `--write` refuses a fit under FIT_FLOOR. A disagreement is read, never
 * auto-resolved — the official FINAL key stands unless the page shows it was
 * filed against the wrong booklet.
 *
 * For a paper with no official key (`derived: true`), `--write` also writes
 * data/<id>.key.json from the transcriber's answers, and refuses a gap.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { DATA_DIR, dataPath, expectedNumbers, requirePaper } from "./config";
import { derivedKey, keyFit, questionIssues, resolveContextRefs, type KeyLetter, type MainsQuestion } from "./lib";

/**
 * Below this, the key is presumed to belong to another booklet. A key filed
 * against the wrong booklet agrees ~25% (chance over four options); a right
 * key agrees ~85-95%, lower on Marathi grammar where points are disputable
 * (ASO 2017's first 22: 86%). 0.7 separates the two with room on both sides.
 */
export const FIT_FLOOR = 0.7;

export function loadBatches(id: string): MainsQuestion[] {
  const files = readdirSync(DATA_DIR)
    .filter((f) => f.startsWith(`${id}.t`) && /\.t\d+\.json$/.test(f))
    .sort();
  return files.flatMap((f) => JSON.parse(readFileSync(join(DATA_DIR, f), "utf8")) as MainsQuestion[]);
}

function main() {
  const args = process.argv.slice(2);
  const paper = requirePaper(args.find((a) => !a.startsWith("--")));
  const resolved = resolveContextRefs(loadBatches(paper.id).sort((a, b) => a.n - b.n));
  const qs = resolved.questions;

  const seen = new Map<number, number>();
  for (const q of qs) seen.set(q.n, (seen.get(q.n) ?? 0) + 1);
  const dupes = [...seen].filter(([, c]) => c > 1).map(([n]) => n);
  const expected = expectedNumbers(paper);
  const missing = expected.filter((n) => !seen.has(n));
  const unexpected = qs.map((q) => q.n).filter((n) => !expected.includes(n));

  const issues = [
    ...resolved.errors,
    ...qs.flatMap(questionIssues),
    ...unexpected.map((n) => `Q${n}: not expected (missing from the scan, or out of range)`),
  ];
  for (const i of issues) console.log(`  ${i}`);
  let literal = 0;
  for (const q of qs) {
    const texts = [q.stem, q.context ?? "", ...q.options];
    if (q.translation) texts.push(q.translation.stem, q.translation.context ?? "", ...q.translation.options);
    for (const s of texts) if (/\\n(?![a-z])/.test(s)) literal++;
  }

  const bySubject = new Map<string, number>();
  for (const q of qs) bySubject.set(q.subject, (bySubject.get(q.subject) ?? 0) + 1);

  let fitLine = "no key";
  let fitOk = true;
  const keyFile = dataPath(paper.id, "key");
  if (!paper.derived && existsSync(keyFile)) {
    const key: Record<number, KeyLetter> = JSON.parse(readFileSync(keyFile, "utf8")).key;
    const fit = keyFit(qs, key);
    const rate = fit.compared ? fit.agree / fit.compared : 0;
    fitOk = rate >= FIT_FLOOR;
    fitLine = `key fit ${fit.agree}/${fit.compared} (${(rate * 100).toFixed(1)}%) disagree [${fit.disagreements.join(",")}]`;
    if (args.includes("--show")) {
      for (const n of fit.disagreements) {
        const q = qs.find((x) => x.n === n)!;
        const k = key[n] as string;
        console.log(
          `Q${n} key ${k} "${q.options["ABCD".indexOf(k)]}" · mine ${q.mine} "${q.options["ABCD".indexOf(q.mine!)]}"\n    ${q.stem.split("\n")[0].slice(0, 110)}`
        );
      }
    }
  }
  const unanswered = qs.filter((q) => !q.mine).map((q) => q.n);

  console.log(
    `\n${paper.id}: ${qs.length}/${expected.length} transcribed${paper.missingQuestions ? ` (scan lacks ${paper.missingQuestions.length})` : ""} · missing ${missing.length ? `[${missing.join(",")}]` : "none"}` +
      ` · dupes ${dupes.length ? `[${dupes.join(",")}]` : "none"} · issues ${issues.length} · literal \\n ${literal}` +
      ` · ${[...bySubject].map(([s, c]) => `${s} ${c}`).join(", ")}` +
      ` · figures ${qs.filter((q) => q.figure).length} · unanswered ${unanswered.length}\n  ${fitLine}`
  );

  if (!args.includes("--write")) return;
  if (missing.length || dupes.length || issues.length || literal) {
    throw new Error("refusing to write: incomplete, duplicated or invalid");
  }
  if (!fitOk) throw new Error(`refusing to write: key fit under ${FIT_FLOOR * 100}% — is this key for another booklet?`);
  if (paper.derived) {
    const { key, missing: gaps } = derivedKey(qs);
    if (gaps.length) throw new Error(`derived paper has unanswered questions: ${gaps.join(",")}`);
    writeFileSync(keyFile, JSON.stringify({ paper: paper.id, set: "A", derived: true, key, cancelled: [] }, null, 1));
    console.log(`wrote DERIVED key ${keyFile}`);
  }
  writeFileSync(dataPath(paper.id, "merged"), JSON.stringify({ paper: paper.id, questions: qs }, null, 1));
  console.log(`wrote ${dataPath(paper.id, "merged")}`);
}

if (/merge\.ts$/.test(process.argv[1] ?? "")) main();
