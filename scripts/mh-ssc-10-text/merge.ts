/**
 * Merge the per-section transcription fragments (data/<id>.<sec>.json, written
 * by the vision agents) into the single data/<id>.questions.json that commit.ts
 * reads. Sections don't overlap; refs are section-prefixed, so this is an
 * ordered concatenation with a duplicate-ref guard.
 *
 *   npx tsx scripts/mh-sb-9/merge.ts <chapterId> [sec1 sec2 ...]
 *
 * With explicit section names, merges only those (in the given order);
 * otherwise globs every data/<id>.*.json that isn't the merged output itself.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { DATA, questionsJsonPath, requireChapter } from "./config";
import type { SBQuestion } from "./lib";

/**
 * Suffixes of files that live in data/ alongside the transcription fragments but
 * are NOT question fragments. An allow-by-exclusion glob over a directory that
 * also holds generated dumps fails OPEN — it ingests whatever it doesn't
 * recognise — so every artifact type this pipeline writes must be listed here.
 *
 * This is not hypothetical. The identical glob in scripts/mh-sb-11 ingested a
 * `blind.mcq-verify.json` as "10 questions", and only a coincidental duplicate
 * ref stopped 10 garbage rows entering the source of truth. Before this list the
 * bare glob here would have swallowed .fig.json, .mcq-blind.json, .mcq-verify.json
 * and .all.topaper.json; the shipped chapters escaped only because they were
 * merged with explicit section names, which bypasses the glob entirely.
 *
 * ADD TO THIS LIST when you add a new artifact type.
 */
const NON_QUESTION_ARTIFACTS = [
  ".solutions.json", // {id,ref,solution} — applied by apply-solutions.ts
  ".fig.json", // figure bbox manifest — read by attach-images.ts
  ".mcq-blind.json", // blind re-derivation scratch
  ".mcq-verify.json", // blind-vs-committed comparison
  ".topaper.json", // paper-builder export (also covers .all.topaper.json)
  ".crosscheck.json", // step-6 answer-key cross-check findings
  ".errata.json", // book-defect register — read by errata.ts
  ".answers.json", // transcribed printed answer key
  // The per-chapter /board outline, read by sectionsFor() in sections.ts. Added
  // when the twelve Mathematics chapters landed: those need multi-block outlines
  // and a dozen agents editing one shared module is a merge conflict at best, so
  // the outline moved to a data file — which the bare auto-glob then tried to
  // ingest as questions. It fails closed (the rows have no `ref`, so the duplicate
  // guard throws) rather than corrupting anything, but the glob is unusable for a
  // Maths chapter until this line exists.
  ".sections.json",
  // Verification artifacts an agent commits as evidence beside its data.
  ".verify.json",
  ".stemcheck.json",
  ".figtext.json", // figure labels the PDF text layer cannot see — read by audit-grounding
];

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
      .filter(
        (f) =>
          f.startsWith(`${id}.`) &&
          f.endsWith(".json") &&
          f !== outName &&
          !NON_QUESTION_ARTIFACTS.some((suffix) => f.endsWith(suffix))
      )
      .sort();
  }

  const all: SBQuestion[] = [];
  const seen = new Set<string>();
  for (const f of files) {
    const frag: SBQuestion[] = JSON.parse(readFileSync(join(DATA, f), "utf8"));
    // FAIL-CLOSED SHAPE GUARD, and it is here because the name list above cannot be
    // trusted on its own: a denylist fails OPEN and grows stale by construction.
    // Agents legitimately commit evidence beside their data, and this run alone
    // produced `.solution-images.json`, `.solutions-by-ref.json` and
    // `.mcq-blind-derivation.json` — none of which ends in a suffix the list knows,
    // and all of which the bare glob would have merged as questions.
    //
    // A question fragment always carries a string `ref`, `bucket` and `stem`. If the
    // first row does not, this is not a question file, and refusing BY NAME is far
    // better than silently ingesting whatever it holds. (Same guard `scripts/ncert`
    // added after its own near-miss.)
    if (!Array.isArray(frag)) {
      throw new Error(`${f} is not an array of questions — exclude it or pass fragments explicitly`);
    }
    const head = frag[0] as Partial<SBQuestion> | undefined;
    if (head && !(typeof head.ref === "string" && typeof head.bucket === "string" && typeof head.stem === "string")) {
      throw new Error(
        `${f} does not look like a question fragment (a row needs string ref/bucket/stem). ` +
          `If it is an artifact, add its suffix to NON_QUESTION_ARTIFACTS; if it is questions, ` +
          `pass the fragment names explicitly.`,
      );
    }
    for (const q of frag) {
      if (seen.has(q.ref)) throw new Error(`duplicate ref "${q.ref}" (in ${f})`);
      seen.add(q.ref);
      all.push(q);
    }
    console.log(`  ${f.padEnd(28)} ${frag.length} questions`);
  }

  // Never let a merge that found nothing clobber a good source of truth. Once a
  // chapter is transcribed its fragments are folded into <id>.questions.json, so
  // a bare re-run legitimately globs zero fragments — and without this guard that
  // writes `[]` over the committed file.
  if (all.length === 0) {
    throw new Error(
      `merge found 0 questions for "${id}" — refusing to overwrite ${outName}. ` +
        `Either the fragments are missing, or this chapter is already merged ` +
        `(pass explicit section names to re-merge deliberately).`
    );
  }

  writeFileSync(questionsJsonPath(id), JSON.stringify(all, null, 2), "utf8");
  console.log(`\nmerged ${all.length} questions from ${files.length} fragment(s) → ${outName}`);
}

main();
