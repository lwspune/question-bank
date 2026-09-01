/**
 * Merge the per-section transcription fragments (data/<id>.<sec>.json, written
 * by the vision agents) into the single data/<id>.questions.json that commit.ts
 * reads. Sections don't overlap; refs are section-prefixed, so this is an
 * ordered concatenation with a duplicate-ref guard.
 *
 *   npx tsx scripts/stateboard/merge.ts <chapterId> [sec1 sec2 ...]
 *
 * With explicit section names, merges only those (in the given order);
 * otherwise globs every data/<id>.*.json that isn't the merged output itself.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { DATA, questionsJsonPath, requireChapter } from "./config";
import type { SBQuestion } from "./lib";

/** Known non-question artifacts, by name. First line of defence only — the shape
 *  guard below is what actually keeps a NEW artifact type out. */
const SCRATCH_SUFFIXES = [
  ".solutions.json", // {id, ref, solution} — applied by apply-solutions.ts
  ".mcq-blind.json", // dump-mcq.ts output (key withheld)
  ".mcq-verify.json", // blind re-derivation verdicts
  ".book-answers.json", // the book's inline [Ans: …] key (Physics numericals)
  ".review.json", // dump-review.ts output (step-6 cross-check input)
  ".topaper.json",
  ".xcheck.json",
  ".errata.json",
  ".anchors.json",
  ".solution-images.json",
  ".sections.json",
  // A figure manifest for questions that are ALREADY committed — {ref,page,bbox}
  // only, no stem. It must still end in "fig.json" for attach-images.ts to glob
  // it, hence the doubled suffix. Distinct from `<sec>fig.json` fragments (e.g.
  // logic-12.miscfig.json), which ARE question fragments and must keep merging.
  ".imgfig.json",
];

function isScratch(f: string): boolean {
  return SCRATCH_SUFFIXES.some((s) => f.endsWith(s)) || f.includes(".diagram-specs");
}

/** A question fragment is a non-empty array whose every element carries the three
 *  fields buildRecords cannot work without. Deliberately structural, not a name. */
function isQuestionFragment(v: unknown): v is SBQuestion[] {
  return (
    Array.isArray(v) &&
    v.length > 0 &&
    v.every(
      (q) =>
        !!q &&
        typeof q === "object" &&
        typeof (q as SBQuestion).ref === "string" &&
        typeof (q as SBQuestion).bucket === "string" &&
        typeof (q as SBQuestion).stem === "string"
    )
  );
}

function main() {
  const id = process.argv[2];
  requireChapter(id);
  const explicit = process.argv.slice(3);

  const outName = `${id}.questions.json`;
  let files: string[];
  if (explicit.length) {
    files = explicit.map((s) => `${id}.${s}.json`);
  } else {
    files = readdirSync(DATA)
      .filter((f) => f.startsWith(`${id}.`) && f.endsWith(".json") && f !== outName && !isScratch(f))
      .sort();
  }

  const all: SBQuestion[] = [];
  const seen = new Set<string>();
  for (const f of files) {
    const frag: unknown = JSON.parse(readFileSync(join(DATA, f), "utf8"));
    if (!isQuestionFragment(frag)) {
      // Fail CLOSED. The name list below goes stale by construction — this dir
      // also holds mcq-blind / mcq-verify / review / topaper / xcheck / errata /
      // diagram-specs / anchors / book-answers artifacts, and every new pipeline
      // step invents another. A glob that admits an unrecognised file ingests it
      // as QUESTIONS: on mh-sb-11 that only failed to reach the DB because of a
      // coincidental duplicate ref, and the NCERT pipeline nearly committed a
      // chapter's diagram specs as its question set. So the shape decides.
      throw new Error(
        `${f}: not a question fragment (expected an array of objects with string ref/bucket/stem). ` +
          `If this is a pipeline artifact, it needs a name isScratch() recognises; ` +
          `if it is a real fragment, name the sections explicitly: merge.ts ${id} <sec> …`
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
