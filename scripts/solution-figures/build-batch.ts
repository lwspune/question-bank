/**
 * Build a batch (data/<batch>.json) from a wave's triage drafts.
 *
 *   npx tsx scripts/solution-figures/build-batch.ts <wave> <batch> [slice ...]
 *
 * Reads out/<wave>/<slice>.draft.json for each slice named (all drafts in the
 * wave when none are), merges them with drafts.ts, and writes the batch plus
 * out/<wave>/<batch>.later.json: the computed / structure / no-book-figure
 * verdicts the next waves pick up. Refuses to write while drafts.ts or plan.ts
 * report an error. Then: run.ts <batch> (dry run), view every crop, --apply.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { draftsToBatch, type Draft } from "./drafts";
import { planBatch } from "./plan";

const [wave, name, ...slices] = process.argv.slice(2);
if (!wave || !name) throw new Error("usage: build-batch.ts <wave> <batch> [slice ...]");
const dir = join(__dirname, "out", wave);
const files = slices.length
  ? slices.map((s) => `${s}.draft.json`)
  : readdirSync(dir).filter((f) => f.endsWith(".draft.json")).sort();

const drafts = files.map((f) => JSON.parse(readFileSync(join(dir, f), "utf8")) as Draft[]);
const { batch, tally, later, errors } = draftsToBatch(drafts);
const planErrors = planBatch(batch).errors;

console.log(`${files.length} drafts: ${JSON.stringify(tally)}`);
console.log(`batch: ${batch.figures.length} figures over ${batch.figures.reduce((n, f) => n + f.ids.length, 0)} questions, ${batch.edits?.length ?? 0} edits; later: ${later.length}`);
for (const e of [...errors, ...planErrors]) console.log(`  !! ${e}`);
if (errors.length || planErrors.length) process.exit(1);

writeFileSync(join(__dirname, "data", `${name}.json`), JSON.stringify(batch, null, 2) + "\n");
writeFileSync(join(dir, `${name}.later.json`), JSON.stringify(later, null, 1) + "\n");
console.log(`wrote data/${name}.json and out/${wave}/${name}.later.json`);
