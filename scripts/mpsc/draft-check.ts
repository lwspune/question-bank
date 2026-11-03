/**
 * The transcriber's check: merge.ts's coverage, parity, literal-"\n" and chapter-list
 * checks WITHOUT the key, so a blind transcriber can run it.
 *
 *   npx tsx scripts/mpsc/draft-check.ts fsp-2014
 *
 * merge.ts cannot be that check: with a boxes.json on disk it prints every
 * disagreement as "mark X, key Y", which hands the key to whoever runs it. This
 * script never opens data/<id>.key.json, so the transcriber's own answers in
 * boxes.json stay an independent read of the paper.
 */
import { existsSync, readFileSync } from "node:fs";
import { dataPath, expectedNumbers, requirePaper } from "./config";
import { loadBatches } from "./merge";
import { badDifficulties, offListChapters, parityIssues } from "./lib";

const paper = requirePaper(process.argv[2]);
const qs = loadBatches(paper.id).sort((a, b) => a.n - b.n);

const seen = new Map<number, number>();
for (const q of qs) seen.set(q.n, (seen.get(q.n) ?? 0) + 1);
const dupes = [...seen].filter(([, c]) => c > 1).map(([n]) => n);
const missing = expectedNumbers(paper).filter((n) => !seen.has(n));
const omitted = qs.filter((q) => paper.omitted?.[q.n]).map((q) => q.n);

let parity = 0;
let literal = 0;
for (const q of qs) {
  const issues = parityIssues(q);
  if (issues.length) {
    parity++;
    console.log(`Q${q.n}: ${issues.join(" · ")}`);
  }
  for (const lang of ["en", "mr"] as const) {
    const v = q[lang];
    if (!v) continue;
    for (const s of [v.stem, v.context ?? "", ...v.options]) if (/\\n(?![a-z])/.test(s)) literal++;
    if (v.options.length !== 4) console.log(`Q${q.n} ${lang}: ${v.options.length} options`);
  }
}
const offList = paper.chapters ? offListChapters(qs, paper.chapters) : [];
for (const o of offList) console.log(`off-list chapter — ${o}`);
const badDiff = badDifficulties(qs);
for (const d of badDiff) console.log(`bad difficulty — ${d} (EASY, MODERATE or HARD)`);

const boxesFile = dataPath(paper.id, "boxes");
const boxes: Record<string, string | null> = existsSync(boxesFile) ? JSON.parse(readFileSync(boxesFile, "utf8")) : {};
const noAnswer = qs.filter((q) => !boxes[q.n]).map((q) => q.n);

console.log(
  `\n${paper.id}: ${qs.length} transcribed · missing ${missing.length ? `[${missing.join(",")}]` : "none"}` +
    ` · dupes ${dupes.length ? `[${dupes.join(",")}]` : "none"} · omitted-but-present ${omitted.length ? `[${omitted.join(",")}]` : "none"}` +
    ` · parity flags ${parity} · literal \\n ${literal} · off-list ${offList.length} · bad difficulty ${badDiff.length}` +
    ` · no own answer ${noAnswer.length ? `[${noAnswer.join(",")}]` : "none"}` +
    ` · figures ${qs.filter((q) => q.figure).length} · print notes ${qs.filter((q) => q.printNote).length}`
);
