/**
 * Step 2 of the IPMAT pipeline: cached HTML -> frozen, committed JSON, gated.
 *
 *   npx tsx scripts/ipmat/extract.ts                   # all, writes data/raw/
 *   npx tsx scripts/ipmat/extract.ts -- --dry          # report only
 *   npx tsx scripts/ipmat/extract.ts -- --exam=jipmat
 *
 * Writes one file per paper to scripts/ipmat/data/raw/ (committed) so every
 * later step reads a frozen snapshot rather than the live site. Keys are sorted
 * on the way out so a refetch produces a reviewable diff instead of a reshuffle.
 *
 * THE CENSUS IS READ OFF DISK, NOT OFF THE GRID. The first version iterated
 * PAPER_GRID to decide what to extract, which made the grid unfalsifiable — the
 * census could only contain papers the grid already listed, so an extra paper
 * was unreportable and `comparePaperGrid`'s `unexpected` branch never ran.
 * Deleting 2026 from the grid and re-running printed "GATE: PASS" while quietly
 * skipping three real papers. Now every *.html in out/html is extracted and the
 * grid is compared against what was actually found.
 *
 * FOUR GATES, and the run exits 1 if any trips:
 *
 *   1. UNRESOLVED REFERENCES. The source hoists long repeated strings (RC
 *      passages, DI tables) into separate flight rows and leaves a "$3c"
 *      reference behind. A leftover reference means a passage is missing while
 *      the field still looks populated — the failure this pipeline exists to
 *      prevent. See flight.ts.
 *   2. NUMBERING GAPS. Each section must number 1..N with no holes and no
 *      duplicates. All 48 papers did on 2026-09-22.
 *   3. THE PAPER GRID. Every paper must yield exactly the count recorded in
 *      config.ts, no grid paper may be absent, and no unrecorded paper may
 *      appear.
 *   4. SUSPICIOUSLY SHORT CONTEXT. A passage field of a few characters is the
 *      signature of gate 1 having been bypassed some new way.
 *
 * Gate 3 catches the source changing; gates 1, 2 and 4 catch OUR parser
 * breaking. A count check alone would pass a run that lost every passage, which
 * is exactly how this went unnoticed the first time.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  PAPER_GRID,
  comparePaperGrid,
  describeMismatch,
  expectedTotal,
  parsePaperFileName,
  paperFileName,
  type IpmatExamSlug,
  type PaperCount,
} from "./config";
import {
  flightBlob,
  parseFlightRows,
  extractQuestionList,
  resolveFlightRefs,
  findNumberingGaps,
  isFlightRef,
  type FlightRecord,
} from "./flight";

const HTML_DIR = join(__dirname, "out", "html");
const RAW_DIR = join(__dirname, "data", "raw");
/** Below this, a "passage" is almost certainly an unresolved reference. */
const MIN_PLAUSIBLE_CONTEXT = 40;

function arg(name: string): string | undefined {
  const hit = process.argv.slice(2).find((a) => a.startsWith(`--${name}=`));
  return hit?.split("=").slice(1).join("=");
}

/** Stable key order, so a refetch diffs as content changes not as churn. */
function stableStringify(records: FlightRecord[]): string {
  const ordered = records.map((r) =>
    Object.fromEntries(Object.entries(r).sort(([a], [b]) => a.localeCompare(b)))
  );
  return JSON.stringify(ordered, null, 1) + "\n";
}

type PaperResult = {
  exam: IpmatExamSlug;
  year: number;
  section: string;
  count: number;
  records: FlightRecord[];
  problems: string[];
};

function extractPaper(exam: IpmatExamSlug, year: number, section: string): PaperResult {
  const path = join(HTML_DIR, paperFileName(exam, year, section));
  const html = readFileSync(path, "utf8");
  const blob = flightBlob(html);
  const problems: string[] = [];

  if (!blob) {
    problems.push("no flight payload on the page");
    return { exam, year, section, count: 0, records: [], problems };
  }

  const list = extractQuestionList(blob);
  if (!list) {
    problems.push("no questionList in the flight payload");
    return { exam, year, section, count: 0, records: [], problems };
  }

  const rows = parseFlightRows(blob);
  const { resolved, unresolved } = resolveFlightRefs(list, rows);

  // Gate 1 — unresolved references.
  for (const u of unresolved) {
    problems.push(`Q${u.questionNumber} field "${u.field}" is an unresolved reference ${u.ref}`);
  }
  // Belt and braces: catch a reference in a field the resolver did not visit.
  for (const r of resolved) {
    for (const [field, value] of Object.entries(r)) {
      if (isFlightRef(value)) problems.push(`Q${r.questionNumber} field "${field}" still a reference`);
    }
  }

  // Gate 2 — numbering.
  const numbers = resolved
    .map((r) => r.questionNumber)
    .filter((n): n is number => typeof n === "number");
  if (numbers.length !== resolved.length) {
    problems.push(`${resolved.length - numbers.length} row(s) have no numeric questionNumber`);
  }
  const gaps = findNumberingGaps(numbers);
  if (gaps.length) problems.push(`numbering gaps: ${gaps.join(", ")}`);

  // Gate 4 — a passage too short to be a passage.
  for (const r of resolved) {
    const ctx = r.comprehension;
    if (typeof ctx === "string" && ctx.length > 0 && ctx.length < MIN_PLAUSIBLE_CONTEXT) {
      problems.push(`Q${r.questionNumber} context is only ${ctx.length} chars: ${JSON.stringify(ctx)}`);
    }
  }

  return { exam, year, section, count: resolved.length, records: resolved, problems };
}

function main() {
  const dry = process.argv.includes("--dry");
  const only = arg("exam") as IpmatExamSlug | undefined;

  if (!existsSync(HTML_DIR)) {
    console.error(`no cached HTML at ${HTML_DIR}\nrun: npx tsx scripts/ipmat/fetch.ts`);
    process.exit(1);
  }

  // Census from DISK — this is what lets the grid be contradicted.
  const onDisk = readdirSync(HTML_DIR)
    .map((f) => ({ file: f, key: parsePaperFileName(f) }))
    .filter((x) => x.key !== null)
    .map((x) => x.key!)
    .filter((k) => !only || k.exam === only)
    .sort((a, b) => a.exam.localeCompare(b.exam) || a.year - b.year || a.section.localeCompare(b.section));

  const unparsed = readdirSync(HTML_DIR).filter(
    (f) => f.endsWith(".html") && parsePaperFileName(f) === null
  );

  const results = onDisk.map((k) => extractPaper(k.exam, k.year, k.section));

  // ---- per-paper report
  console.log(`extracted ${results.length} papers from ${HTML_DIR}\n`);
  console.log("exam            year  sec    n   status");
  let badPapers = 0;
  for (const r of results) {
    const status = r.problems.length === 0 ? "ok" : `${r.problems.length} PROBLEM(S)`;
    if (r.problems.length) badPapers++;
    console.log(
      `${r.exam.padEnd(15)} ${r.year}  ${r.section.padEnd(4)} ${String(r.count).padStart(3)}   ${status}`
    );
    for (const pr of r.problems.slice(0, 8)) console.log(`    - ${pr}`);
    if (r.problems.length > 8) console.log(`    - ...and ${r.problems.length - 8} more`);
  }

  // ---- gate 3, the grid, against the on-disk census
  const census: PaperCount[] = results.map((r) => ({
    exam: r.exam,
    year: r.year,
    section: r.section,
    count: r.count,
  }));
  const mismatches = only
    ? comparePaperGrid(census).filter((m) => m.exam === only)
    : comparePaperGrid(census);

  const total = results.reduce((n, r) => n + r.count, 0);
  console.log(`\ntotal questions: ${total} (grid expects ${expectedTotal(only)})`);
  console.log(`papers on disk: ${results.length} (grid lists ${PAPER_GRID.filter((p) => !only || p.exam === only).length})`);

  // ---- corpus shape, for the record
  const withContext = results.flatMap((r) => r.records).filter((r) => r.comprehension);
  const contexts = new Set(withContext.map((r) => String(r.comprehension)));
  console.log(`rows carrying a context/passage: ${withContext.length} over ${contexts.size} distinct texts`);
  const lengths = [...contexts].map((c) => c.length).sort((a, b) => a - b);
  if (lengths.length) {
    console.log(`context length: min ${lengths[0]}, median ${lengths[lengths.length >> 1]}, max ${lengths[lengths.length - 1]}`);
  }

  // ---- write
  if (!dry) {
    mkdirSync(RAW_DIR, { recursive: true });
    for (const r of results) {
      writeFileSync(
        join(RAW_DIR, `${r.exam}-${r.year}-${r.section}.json`),
        stableStringify(r.records),
        "utf8"
      );
    }
    const written = readdirSync(RAW_DIR).filter((f) => f.endsWith(".json")).length;
    console.log(`\nwrote ${results.length} files to ${RAW_DIR} (dir now holds ${written})`);
  } else {
    console.log("\n--dry: nothing written");
  }

  // ---- verdict
  console.log("");
  if (unparsed.length) {
    console.log(`UNRECOGNISED HTML FILES (${unparsed.length}) — not extracted:`);
    for (const f of unparsed) console.log("  " + f);
  }
  if (mismatches.length) {
    console.log(`GRID MISMATCHES (${mismatches.length}):`);
    for (const m of mismatches) console.log("  " + describeMismatch(m));
  }

  const failed = badPapers > 0 || mismatches.length > 0 || unparsed.length > 0;
  if (failed) {
    console.log("\nGATE: FAIL");
    process.exit(1);
  }
  console.log("GATE: PASS — every paper matches the grid, no gaps, no unresolved references");
}

main();
