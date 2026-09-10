/**
 * Run the text-defect probes across every extracted draft, before any of it is
 * assigned, authored or committed.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/probe-drafts.ts            # all chapters
 *   npx tsx scripts/mh-hsc-12-pyq/probe-drafts.ts Physics    # one subject
 *
 * promote.ts and merge.ts already probe, but both run AFTER a chapter has been
 * read, assigned and answered. A stem defect found here costs a re-extract; the
 * same defect found there has already had authoring work built on top of it.
 *
 * Reports, never writes. Exits 1 if anything is flagged so it can gate a batch.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { OUT, CHAPTERS, type Chapter } from "./config";
import { probeRow } from "./textProbes";
import type { Draft } from "./extract";

function main() {
  const only = process.argv[2];
  const chapters = Object.values(CHAPTERS).filter(
    (c: Chapter) => !only || c.subjectName === only,
  );

  let rows = 0;
  let missing = 0;
  const defects: { ref: string; field: string; reason: string }[] = [];

  for (const ch of chapters) {
    const path = join(OUT, `${ch.id}.draft.json`);
    if (!existsSync(path)) {
      missing += 1;
      console.log(`  · no draft yet: ${ch.id}`);
      continue;
    }
    const drafts = JSON.parse(readFileSync(path, "utf8")) as Draft[];
    for (const d of drafts) {
      rows += 1;
      const fields: [string, string][] = [["stem", d.stem]];
      for (const o of d.options ?? []) fields.push([`option ${o.label}`, o.text]);
      defects.push(...probeRow(d.ref, fields));
    }
  }

  console.log(
    `\nprobed ${rows} draft rows across ${chapters.length - missing} chapter(s)` +
      (missing ? ` (${missing} not extracted yet)` : ""),
  );
  if (!defects.length) {
    console.log("no text defects.");
    return;
  }
  console.log(`\n${defects.length} defect(s):`);
  for (const d of defects) console.log(`  ${d.ref}  [${d.field}]  ${d.reason}`);
  process.exit(1);
}

main();
