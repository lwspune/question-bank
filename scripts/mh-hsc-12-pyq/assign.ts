/**
 * Fold a reviewed subtopic assignment into out/<id>.draft.json and write the
 * committed source of truth data/<id>.questions.json.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/assign.ts <chapterId>
 *
 * The assignment itself lives in data/<id>.subtopics.json — one line per ref,
 * authored by reading the stem against the chapter's EXISTING axis (the
 * practice rows already filed there), never guessed from the compilation's own
 * coarser A./B./C. section letters.
 *
 * Refuses on: an unknown ref, a missing ref, or a subtopic not in config. All
 * three mean the draft and the assignment have drifted apart, and a partial
 * write would leave rows silently unfiled.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { OUT, DATA, requireChapter, questionsJsonPath } from "./config";
import type { Draft } from "./extract";

function main() {
  const id = process.argv[2];
  const ch = requireChapter(id);

  const draft = JSON.parse(readFileSync(join(OUT, `${id}.draft.json`), "utf8")) as Draft[];
  const mapPath = join(DATA, `${id}.subtopics.json`);
  if (!existsSync(mapPath)) throw new Error(`No reviewed assignment at ${mapPath}`);
  const map = JSON.parse(readFileSync(mapPath, "utf8")) as Record<string, string>;

  const byRef = new Map(draft.map((d) => [d.ref, d]));
  const problems: string[] = [];

  for (const [ref, st] of Object.entries(map)) {
    if (ref.startsWith("_")) continue;
    const row = byRef.get(ref);
    if (!row) {
      problems.push(`assignment names ${ref}, absent from the draft`);
      continue;
    }
    // A RELOCATED row is checked against the chapter it is moving TO. It sits in
    // this file only because the compilation mis-filed it, which is the very
    // thing chapterOverride records.
    const target = row.chapterOverride ? requireChapter(row.chapterOverride) : ch;
    if (!target.subtopics.includes(st)) {
      problems.push(`${ref}: "${st}" is not a subtopic of ${target.chapterName}`);
    }
  }
  for (const d of draft) if (!map[d.ref]) problems.push(`${d.ref}: unassigned`);
  if (problems.length) throw new Error(`REFUSING:\n  ${problems.join("\n  ")}`);

  const rows = draft.map((d) => ({ ...d, subtopic: map[d.ref] }));
  writeFileSync(questionsJsonPath(id), JSON.stringify(rows, null, 2) + "\n");

  const tally = new Map<string, number>();
  for (const r of rows) tally.set(r.subtopic, (tally.get(r.subtopic) ?? 0) + 1);
  console.log(`${ch.chapterName}: ${rows.length} rows assigned`);
  for (const st of ch.subtopics) console.log(`  ${String(tally.get(st) ?? 0).padStart(3)}  ${st}`);
  console.log(`\n-> ${questionsJsonPath(id)}`);
}

main();
