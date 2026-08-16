/**
 * Merge the per-section transcription fragments (data/<id>.<sec>.json, written
 * by the vision agents) into the single data/<id>.questions.json that commit.ts
 * reads. Sections don't overlap; refs are section-prefixed, so this is an
 * ordered concatenation with a duplicate-ref guard.
 *
 *   npx tsx scripts/ncert/merge.ts <chapterId> [sec1 sec2 ...]
 *
 * With explicit section names, merges only those (in the given order);
 * otherwise globs every data/<id>.*.json that isn't the merged output itself.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { DATA, questionsJsonPath, requireChapter } from "./config";
import type { SBQuestion } from "./lib";

function main() {
  const id = process.argv[2];
  requireChapter(id);
  const explicit = process.argv.slice(3);

  const outName = `${id}.questions.json`;
  let files: string[];
  if (explicit.length) {
    files = explicit.map((s) => `${id}.${s}.json`);
  } else {
    // Auto-discovery is an ALLOW-by-exclusion glob, so every non-fragment artifact
    // this pipeline writes into data/ must be excluded BY NAME. Dropping only
    // `.solutions.json` is not enough: `.tosolve.json`, `.review.json`,
    // `.mcq-verify.json` and `.crosscheck.json` are all `<id>.*.json` too, and each
    // is shaped just enough like a fragment to be merged in as questions. The same
    // hole in the mh-sb-11 pipeline ingested a `.mcq-verify.json` as "10 questions"
    // and was stopped only by a coincidental duplicate ref. Anything REGENERATED
    // rather than authored belongs on this list.
    const SCRATCH =
      /\.(solutions|tosolve|review|mcq-verify|mcq-blind|crosscheck|errata|solution-images)\.json$/;
    // `diagram-specs` needs its own test: its part-files are named
    // `<id>.diagram-specs.<group>.json`, so the suffix is in the MIDDLE and the
    // anchored pattern above can never match it.
    const SCRATCH_MID = /\.diagram-specs[.-]/;
    files = readdirSync(DATA)
      .filter(
        (f) =>
          f.startsWith(`${id}.`) &&
          f.endsWith(".json") &&
          f !== outName &&
          !SCRATCH.test(f) &&
          !SCRATCH_MID.test(f)
      )
      .sort();
  }

  const all: SBQuestion[] = [];
  const seen = new Set<string>();
  for (const f of files) {
    const frag: SBQuestion[] = JSON.parse(readFileSync(join(DATA, f), "utf8"));
    // SHAPE GUARD — the name filter above fails OPEN, and that is not theoretical:
    // adding the diagram pipeline introduced `<id>.diagram-specs.<group>.json` and
    // `<id>.solution-images.json`, and merge immediately tried to ingest the diagram
    // specs AS QUESTIONS. It was stopped only by a coincidental duplicate `ref` —
    // the same near-miss the mh-sb-11 pipeline had. Those files carry a `ref`, so
    // a ref-based check cannot tell them apart; what distinguishes a question
    // fragment is that every row has a `bucket` AND a `stem`. Check the SHAPE, so a
    // future artifact nobody remembered to exclude is rejected LOUDLY instead of
    // silently becoming questions.
    if (!Array.isArray(frag)) throw new Error(`${f}: not a JSON array — this is not a question fragment`);
    const notQuestions = frag.filter((q: any) => !q || typeof q.bucket !== "string" || typeof q.stem !== "string");
    if (notQuestions.length) {
      throw new Error(
        `${f}: ${notQuestions.length}/${frag.length} row(s) lack a string \`bucket\`+\`stem\`, so this is NOT a ` +
          `question fragment. If it is a generated/authored artifact (diagram specs, a solutions file, a dump), ` +
          `add its name to the SCRATCH exclusions in merge.ts; if it IS meant to be questions, fix the rows.`
      );
    }
    for (const q of frag) {
      if (seen.has(q.ref)) throw new Error(`duplicate ref "${q.ref}" (in ${f})`);
      seen.add(q.ref);
      all.push(q);
    }
    console.log(`  ${f.padEnd(28)} ${frag.length} questions`);
  }

  writeFileSync(questionsJsonPath(id), JSON.stringify(all, null, 2), "utf8");
  console.log(`\nmerged ${all.length} questions from ${files.length} fragment(s) → ${outName}`);
}

main();
