/**
 * Merge a worksheet's recovered figure questions into the main transcription
 * files so commit.ts picks them up. Run AFTER the figure agent has written
 * data/<id>.figure-{questions,overrides}.json and BEFORE re-running commit.ts.
 *
 *   npx tsx scripts/foundation/merge-figures.ts <worksheetId>          # dry-run
 *   npx tsx scripts/foundation/merge-figures.ts <worksheetId> --apply  # write
 *
 * - data/<id>.figure-questions.json (array of {number,...}) is merged into
 *   data/<id>.questions.json, deduped by `number` (figure wins) and re-sorted.
 * - data/<id>.figure-overrides.json ({number: {answer,reason}}) is merged into
 *   data/<id>.overrides.json (figure wins).
 * Idempotent: re-running after a merge is a no-op (same numbers, same content).
 * Does NOT touch data/<id>.figures.json (the bbox manifest attach-images reads).
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { DATA, requireWorksheet } from "./config";

type Q = { number: number; [k: string]: unknown };
type Overrides = Record<string, { answer: string; reason: string }>;

function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  requireWorksheet(id); // validate id

  const qPath = join(DATA, `${id}.questions.json`);
  const figQPath = join(DATA, `${id}.figure-questions.json`);
  const oPath = join(DATA, `${id}.overrides.json`);
  const figOPath = join(DATA, `${id}.figure-overrides.json`);

  if (!existsSync(figQPath)) throw new Error(`no figure-questions at ${figQPath}`);

  const main: Q[] = JSON.parse(readFileSync(qPath, "utf8"));
  const figQ: Q[] = JSON.parse(readFileSync(figQPath, "utf8"));
  const byNum = new Map<number, Q>(main.map((q) => [q.number, q]));
  let added = 0,
    replaced = 0;
  for (const q of figQ) {
    if (byNum.has(q.number)) replaced++;
    else added++;
    byNum.set(q.number, q);
  }
  const mergedQ = [...byNum.values()].sort((a, b) => a.number - b.number);

  const mainO: Overrides = existsSync(oPath) ? JSON.parse(readFileSync(oPath, "utf8")) : {};
  let oAdded = 0,
    oReplaced = 0;
  if (existsSync(figOPath)) {
    const figO: Overrides = JSON.parse(readFileSync(figOPath, "utf8"));
    for (const [num, o] of Object.entries(figO)) {
      if (num in mainO) oReplaced++;
      else oAdded++;
      mainO[num] = o;
    }
  }

  console.log(
    `${id}: questions +${added} (replaced ${replaced}) -> ${mergedQ.length}; overrides +${oAdded} (replaced ${oReplaced})`
  );

  if (!apply) {
    console.log("[dry-run] pass --apply to write the merged files.");
    return;
  }
  writeFileSync(qPath, JSON.stringify(mergedQ, null, 2) + "\n", "utf8");
  writeFileSync(oPath, JSON.stringify(mainO, null, 2) + "\n", "utf8");
  console.log(`wrote ${qPath}\nwrote ${oPath}`);
}

main();
