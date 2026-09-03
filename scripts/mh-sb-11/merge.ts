/**
 * Merge the per-section transcription fragments (data/<id>.<sec>.json, written
 * by the vision agents) into the single data/<id>.questions.json that commit.ts
 * reads. Sections don't overlap; refs are section-prefixed, so this is an
 * ordered concatenation with a duplicate-ref guard.
 *
 *   npx tsx scripts/mh-sb-11/merge.ts <chapterId> [sec1 sec2 ...]
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
    // this pipeline writes into data/ must be excluded by name. It is not enough to
    // drop `.solutions.json`: the dumps and audit files are also `<id>.*.json` and
    // are shaped just enough like a fragment to be merged. Observed for real —
    // `.blind.mcq-verify.json` was ingested as "10 questions" and only a coincidental
    // duplicate ref in `.errata.json` stopped 10 garbage rows entering the source of
    // truth. Anything that is regenerated rather than authored belongs on this list.
    // ⚠ This list GOES STALE BY CONSTRUCTION and has already done so once: the
    // Physics lane added `.book-answers.json`, `.solved-fixes.json` and
    // `.fig.json` after it was written, all three created by the PUBLISH path
    // — i.e. after the ingesting agent hands over — so a later re-merge of a
    // finished chapter would have swallowed them. Flagged by an ingest agent
    // 2026-09-03. Keep adding names, but the durable guard is the shape check
    // below, which needs no maintenance.
    const SCRATCH =
      /\.(solutions|errata|topaper|mcq-blind|mcq-verify|review|xcheck|diagram-specs|solution-images|book-answers|solved-fixes|fig)\.json$/;
    files = readdirSync(DATA)
      .filter((f) => f.startsWith(`${id}.`) && f.endsWith(".json") && f !== outName && !SCRATCH.test(f))
      .sort();
  }

  const all: SBQuestion[] = [];
  const seen = new Set<string>();
  for (const f of files) {
    const frag: SBQuestion[] = JSON.parse(readFileSync(join(DATA, f), "utf8"));
    // Fail-CLOSED shape guard, beside the name list above. The denylist can only
    // exclude artifacts someone remembered to name; this refuses anything that
    // is not shaped like a transcription fragment, so a NEW artifact type is
    // rejected on sight rather than ingested as questions. A real transcription
    // row always carries a string ref, bucket and stem.
    if (!Array.isArray(frag)) throw new Error(`${f} is not an array — refusing to merge it as questions`);
    const bad = frag.findIndex(
      (q: any) =>
        !q || typeof q.ref !== "string" || typeof q.bucket !== "string" || typeof q.stem !== "string"
    );
    if (bad !== -1) {
      throw new Error(
        `${f} row ${bad} is not a question fragment (needs string ref/bucket/stem) — refusing.\n` +
          `  If this is a generated artifact, add its suffix to SCRATCH above; if it is a real\n` +
          `  fragment, fix the row. Never widen this guard to let it through.`
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
