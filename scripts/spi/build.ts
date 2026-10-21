/**
 * Check an SPI transcript and, when the whole paper is clean, write the rows commit.ts reads.
 *
 *   npx tsx scripts/spi/build.ts <paperId>                                  # transcripts/<paperId>.txt -> out/<paperId>/rows.json
 *   npx tsx scripts/spi/build.ts <paperId> --file=<draft> --from=1 --to=75  # check one slice; writes nothing
 *
 * A slice check (an agent's draft) never writes rows: only the committed transcript, whole,
 * with every figure cropped and zero problems, becomes rows.json. Every row also runs through
 * the Excel upload's own validator here, so a shape the normal ingest would refuse is caught
 * before commit. Rows take SSC CGL's CommitRow shape (flawed + figure files), so its
 * parseCommitRows hashes and stores them.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { validateRow } from "../../src/lib/upload/validate";
import { parseTranscript } from "../ssc-cgl/lib";
import type { CommitRow } from "../ssc-cgl/rows";
import { FIGURES, OUT, TRANSCRIPTS, requirePaper } from "./config";
import { checkPaper, figurePaths, toRawRows } from "./lib";

const args = process.argv.slice(2);
const flag = (name: string) => args.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const paper = requirePaper(args.find((a) => !a.startsWith("--")));
const file = flag("file");
const from = flag("from") ? Number(flag("from")) : undefined;
const to = flag("to") ? Number(flag("to")) : undefined;
const range = from !== undefined && to !== undefined ? { from, to } : undefined;
const whole = !file && !range;

const qs = parseTranscript(readFileSync(file ?? join(TRANSCRIPTS, `${paper.id}.txt`), "utf8"));
const check = checkPaper(qs, paper, range);
const byNumber = new Map(qs.map((q) => [q.number, q]));
const rows: CommitRow[] = toRawRows(qs, paper).map((r) => {
  const q = byNumber.get(r.sourceRow)!;
  return { ...r, flawed: q.flawed, figures: figurePaths(q, join(FIGURES, paper.id)) };
});
for (const r of rows) {
  const { flawed: _f, figures, ...raw } = r;
  const v = validateRow(raw);
  if (v.errors.length) check.problems.push(`Q${r.questionNumber}: upload validator: ${v.errors.join("; ")}`);
  if (whole) {
    for (const f of [figures.stem, ...(figures.options ?? [])]) {
      if (f && !existsSync(f)) check.problems.push(`Q${r.questionNumber}: figure not cropped yet: ${f}`);
    }
  }
}

console.log(`${paper.id}: ${qs.length} blocks${range ? ` (slice ${range.from}-${range.to})` : ""}`);
console.log(`figure blocks: ${check.figures.map((n) => `Q${n}`).join(", ") || "none"}`);
console.log(`flawed blocks: ${check.flawed.map((n) => `Q${n}`).join(", ") || "none"}`);
for (const p of check.problems) console.log(`  - ${p}`);
console.log(`problems: ${check.problems.length}`);

if (whole && check.problems.length === 0) {
  mkdirSync(join(OUT, paper.id), { recursive: true });
  const out = join(OUT, paper.id, "rows.json");
  writeFileSync(out, JSON.stringify(rows, null, 2) + "\n");
  console.log(`wrote ${rows.length} rows to ${out}`);
}
if (check.problems.length) process.exitCode = 1;
