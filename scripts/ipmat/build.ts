/**
 * Step 3 of the IPMAT pipeline: data/raw -> data/build, normalised and gated.
 *
 *   npx tsx scripts/ipmat/build.ts              # write data/build/*.json
 *   npx tsx scripts/ipmat/build.ts -- --dry     # report only
 *   npx tsx scripts/ipmat/build.ts -- --exam=jipmat
 *
 * Applies `normalise.ts` to every long-form field, infers the question format,
 * lifts figures and provenance out as structured data, and refuses to emit a
 * corpus that would fail the repo's own write-boundary guards.
 *
 * THE GATES ARE THE REPO'S OWN HELPERS, NOT COPIES. `literalNewlineFields` is
 * the guard `commitStaged` will actually apply at insert time, and
 * `parseTableBlocks` / `parseLatex` are what the site and the Word export will
 * actually render with. Re-implementing any of them here would let the probe
 * and the real thing disagree — which is how a table shipped as raw pipes for a
 * year (see the 2026-07-27 entry in CLAUDE.md).
 *
 * WHAT IT REFUSES TO PASS:
 *   1. A literal backslash-n surviving in text/context/solution.
 *   2. Any allowlisted HTML tag left in the output.
 *   3. A stray `$` the renderer would print as prose.
 *   4. A pipe run that looks like a table but has no separator row.
 *   5. A row whose stem became EMPTY — the signature of over-eager stripping.
 *   6. An MCQ that is not exactly-one-correct, or a typed answer that is not a
 *      plain number.
 *
 * Rows the source itself marks as rebuilt from student recall (15 JIPMAT 2026
 * rows) are carried through with `reconstructed: true` and EXCLUDED from the
 * committable set — they are not verifiable past-year questions.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { literalNewlineFields } from "../../src/lib/upload/textGuard";
import {
  parsePaperFileName,
  exclusionFor,
  isCoveredBy,
  EXCLUSIONS,
  type IpmatExamSlug,
} from "./config";
import {
  normaliseText,
  hasStrayDollar,
  hasUnseparatedPipeTable,
  figuresInsideTable,
  type FigureRef,
  type NormaliseWarning,
} from "./normalise";
import type { FlightRecord } from "./flight";

const RAW_DIR = join(__dirname, "data", "raw");
const BUILD_DIR = join(__dirname, "data", "build");
const OPTION_KEYS = ["option1", "option2", "option3", "option4"] as const;

export type BuiltOption = {
  label: "A" | "B" | "C" | "D";
  text: string;
  isCorrect: boolean;
  /** Set when the whole option was a picture (7 JIPMAT LR rows). */
  imageUrl: string | null;
};

export type BuiltQuestion = {
  sourceId: string;
  exam: IpmatExamSlug;
  year: number;
  section: string;
  questionNumber: number;
  /** Their taxonomy, kept as a HINT for Phase 2 authoring — never shipped. */
  sourceTopic: string | null;
  sourceSubTopic: string | null;
  sourceDifficulty: string | null;
  format: "mcq" | "numeric";
  text: string;
  context: string | null;
  options: BuiltOption[];
  numericAnswer: string | null;
  /** True when the source cancelled the question (9 rows). */
  dropped: boolean;
  figures: FigureRef[];
  reconstructed: boolean;
  disclaimers: string[];
  warnings: NormaliseWarning[];
  problems: string[];
};

function arg(name: string): string | undefined {
  return process.argv.slice(2).find((a) => a.startsWith(`--${name}=`))?.split("=").slice(1).join("=");
}

const LEFTOVER_HTML =
  /<\/?(?:p|br|hr|u|strong|b|em|i|span|a|sup|sub|ol|ul|li|table|thead|tbody|tfoot|tr|td|th|div|style|img|font)\b[^>]*>/i;

function buildRow(raw: FlightRecord, exam: IpmatExamSlug, year: number, section: string): BuiltQuestion {
  const problems: string[] = [];
  const warnings: NormaliseWarning[] = [];
  const figures: FigureRef[] = [];
  const disclaimers: string[] = [];
  let reconstructed = false;

  const run = (value: unknown): string | null => {
    if (typeof value !== "string" || value.trim() === "") return null;
    const out = normaliseText(value);
    figures.push(...out.figures);
    disclaimers.push(...out.disclaimers);
    warnings.push(...out.warnings);
    if (out.reconstructed) reconstructed = true;
    return out.text === "" ? null : out.text;
  };

  // Checked on the RAW field: by the time normalisation has run the <img> is
  // already gone and the cell is indistinguishable from a legitimately empty one.
  for (const [field, value] of [["text", raw.question], ["context", raw.comprehension]] as [string, unknown][]) {
    if (typeof value === "string" && figuresInsideTable(value)) {
      problems.push(`${field} has a figure inside a table cell — the figure IS the answer set`);
    }
  }

  const text = run(raw.question) ?? "";
  const context = run(raw.comprehension);

  // Format is inferred from whether options EXIST, never from their `type`
  // field: that field is present on only ~30% of rows.
  const rawOptions = OPTION_KEYS.map((k) => raw[k]).filter(
    (v): v is string => typeof v === "string" && v.trim() !== ""
  );
  const keyRaw = String(raw.correctAnswer ?? "").trim();
  const dropped = keyRaw.toLowerCase() === "drop";

  let format: "mcq" | "numeric";
  const options: BuiltOption[] = [];
  let numericAnswer: string | null = null;

  if (rawOptions.length >= 2) {
    format = "mcq";
    const keyIndex = /^[1-6]$/.test(keyRaw) ? Number(keyRaw) : null;
    if (keyIndex === null && !dropped) problems.push(`MCQ key is not an option index: ${JSON.stringify(keyRaw)}`);
    if (keyIndex !== null && keyIndex > rawOptions.length) {
      problems.push(`MCQ key ${keyIndex} exceeds ${rawOptions.length} options`);
    }
    rawOptions.forEach((optRaw, i) => {
      const out = normaliseText(optRaw);
      figures.push(...out.figures);
      warnings.push(...out.warnings);
      // An option that was ONLY a picture keeps the picture and empty text;
      // options.image_url exists for exactly this (migration 0007).
      const imageUrl = out.text.trim() === "" ? out.figures[0]?.src ?? null : null;
      options.push({
        label: (["A", "B", "C", "D"] as const)[i],
        text: out.text,
        isCorrect: keyIndex === i + 1,
        imageUrl,
      });
    });
    const correct = options.filter((o) => o.isCorrect).length;
    if (correct !== 1 && !dropped) problems.push(`${correct} options marked correct, expected exactly 1`);
  } else {
    format = "numeric";
    if (!dropped) {
      if (!/^-?[0-9]+(?:\.[0-9]+)?$/.test(keyRaw)) {
        problems.push(`typed answer is not a plain number: ${JSON.stringify(keyRaw)}`);
      } else {
        numericAnswer = keyRaw;
      }
    }
  }

  // ---- the repo's own write-boundary guards
  const bad = literalNewlineFields({ text, context });
  if (bad.length) problems.push(`literal backslash-n survives in: ${bad.join(", ")}`);

  for (const [field, value] of [
    ["text", text],
    ["context", context ?? ""],
    ...options.map((o, i) => [`option${i + 1}`, o.text] as [string, string]),
  ] as [string, string][]) {
    if (!value) continue;
    if (LEFTOVER_HTML.test(value)) problems.push(`HTML survives in ${field}`);
    if (hasStrayDollar(value)) problems.push(`stray $ in ${field}`);
  }
  for (const [field, value] of [["text", text], ["context", context ?? ""]] as [string, string][]) {
    if (value && hasUnseparatedPipeTable(value)) problems.push(`${field} has a pipe run with no separator row`);
  }
  if (text.trim() === "") problems.push("stem is EMPTY after normalisation");

  return {
    sourceId: String(raw._id ?? ""),
    exam,
    year,
    section,
    questionNumber: Number(raw.questionNumber),
    sourceTopic: typeof raw.topic === "string" ? raw.topic : null,
    sourceSubTopic: typeof raw.subTopic === "string" ? raw.subTopic : null,
    sourceDifficulty: typeof raw.difficulty === "string" ? raw.difficulty : null,
    format,
    text,
    context,
    options,
    numericAnswer,
    dropped,
    figures,
    reconstructed,
    disclaimers,
    warnings,
    problems,
  };
}

function main() {
  const dry = process.argv.includes("--dry");
  const only = arg("exam") as IpmatExamSlug | undefined;

  if (!existsSync(RAW_DIR)) {
    console.error(`no frozen corpus at ${RAW_DIR}\nrun: npx tsx scripts/ipmat/extract.ts`);
    process.exit(1);
  }

  const built: BuiltQuestion[] = [];
  const byPaper = new Map<string, BuiltQuestion[]>();

  for (const file of readdirSync(RAW_DIR).filter((f) => f.endsWith(".json"))) {
    const key = parsePaperFileName(file.replace(/\.json$/, ".html"));
    if (!key) {
      console.error(`unrecognised file in data/raw: ${file}`);
      process.exit(1);
    }
    if (only && key.exam !== only) continue;
    const rows = JSON.parse(readFileSync(join(RAW_DIR, file), "utf8")) as FlightRecord[];
    const out = rows.map((r) => buildRow(r, key.exam, key.year, key.section));
    byPaper.set(`${key.exam}-${key.year}-${key.section}`, out);
    built.push(...out);
  }

  // ---------------------------------------------------------------- report
  console.log(`normalised ${built.length} rows from ${RAW_DIR}\n`);

  const problems = built.filter((b) => b.problems.length);
  const warned = built.filter((b) => b.warnings.length);
  const recon = built.filter((b) => b.reconstructed);
  const droppedRows = built.filter((b) => b.dropped);
  const withFigures = built.filter((b) => b.figures.length);
  const picOptions = built.filter((b) => b.options.some((o) => o.imageUrl));

  console.log("FORMAT");
  console.log(`  mcq      ${built.filter((b) => b.format === "mcq").length}`);
  console.log(`  numeric  ${built.filter((b) => b.format === "numeric").length}`);

  console.log("\nPROVENANCE + SPECIAL CASES");
  console.log(`  rows the source cancelled (dropped)        ${droppedRows.length}`);
  console.log(`  rows rebuilt from student recall           ${recon.length}   <-- NOT committable`);
  console.log(`  rows carrying a figure                     ${withFigures.length}`);
  console.log(`  rows whose options are pictures            ${picOptions.length}`);
  console.log(`  distinct figure URLs                       ${new Set(built.flatMap((b) => b.figures.map((f) => f.src))).size}`);

  if (recon.length) {
    console.log("\n  reconstructed rows:");
    for (const r of recon) console.log(`    ${r.exam} ${r.year} ${r.section} Q${r.questionNumber}`);
  }

  console.log("\nWARNINGS (need a human, do not block)");
  const warnKinds = new Map<string, number>();
  for (const b of warned) for (const w of b.warnings) warnKinds.set(w.kind, (warnKinds.get(w.kind) ?? 0) + 1);
  if (warnKinds.size === 0) console.log("  (none)");
  for (const [k, n] of warnKinds) console.log(`  ${k}  ${n}`);
  for (const b of warned.slice(0, 10)) {
    console.log(`    ${b.exam} ${b.year} ${b.section} Q${b.questionNumber}: ${b.warnings[0].detail}`);
  }

  console.log("\nPROBLEMS (block the gate)");
  const probKinds = new Map<string, number>();
  for (const b of problems) {
    for (const p of b.problems) {
      const kind = p.replace(/:.*$/, "").replace(/\d+/g, "N");
      probKinds.set(kind, (probKinds.get(kind) ?? 0) + 1);
    }
  }
  if (probKinds.size === 0) console.log("  (none)");
  for (const [k, n] of [...probKinds].sort((a, b) => b[1] - a[1])) console.log(`  ${k}  ${n}`);
  for (const b of problems.slice(0, 25)) {
    console.log(`    ${b.exam} ${b.year} ${b.section} Q${b.questionNumber}: ${b.problems.join(" | ")}`);
  }
  if (problems.length > 25) console.log(`    ...and ${problems.length - 25} more rows`);

  // An exclusion accounts ONLY for the problem kinds it names, so a new,
  // different problem on an already-excluded row still fails the gate.
  const uncovered = built.filter((b) => {
    if (!b.problems.length) return false;
    const ex = exclusionFor(b);
    return ex ? b.problems.some((p) => !isCoveredBy(ex, p)) : true;
  });
  const staleExclusions = EXCLUSIONS.filter(
    (e) =>
      !built.some(
        (b) =>
          b.exam === e.exam &&
          b.year === e.year &&
          b.section === e.section &&
          b.questionNumber === e.questionNumber &&
          b.problems.length > 0
      )
  );

  console.log(`\nDECLARED EXCLUSIONS: ${EXCLUSIONS.length}`);
  for (const e of EXCLUSIONS) {
    console.log(`  ${e.exam} ${e.year} ${e.section} Q${e.questionNumber} — ${e.reason.slice(0, 92)}...`);
  }
  if (staleExclusions.length) {
    console.log(
      `\nSTALE EXCLUSIONS (${staleExclusions.length}) — the row no longer has that problem, so delete the entry:`
    );
    for (const e of staleExclusions) console.log(`  ${e.exam} ${e.year} ${e.section} Q${e.questionNumber}`);
  }

  const excludedCount = built.filter((b) => b.problems.length && exclusionFor(b)).length;
  const committable = built.filter(
    (b) => !b.problems.length && !b.reconstructed && !b.dropped
  );
  console.log(
    `\nCOMMITTABLE (clean, not reconstructed, not dropped, not excluded): ${committable.length} / ${built.length}`
  );
  console.log(
    `  held back: ${built.filter((b) => b.reconstructed).length} reconstructed + ` +
      `${built.filter((b) => b.dropped).length} cancelled by the exam + ${excludedCount} excluded`
  );

  if (!dry) {
    mkdirSync(BUILD_DIR, { recursive: true });
    for (const [paper, rows] of byPaper) {
      writeFileSync(join(BUILD_DIR, `${paper}.json`), JSON.stringify(rows, null, 1) + "\n", "utf8");
    }
    console.log(`\nwrote ${byPaper.size} files to ${BUILD_DIR}`);
  } else {
    console.log("\n--dry: nothing written");
  }

  if (uncovered.length || staleExclusions.length) {
    if (uncovered.length) {
      console.log(`\nUNDECLARED PROBLEM ROWS: ${uncovered.length}`);
      for (const b of uncovered.slice(0, 20)) {
        console.log(`  ${b.exam} ${b.year} ${b.section} Q${b.questionNumber}: ${b.problems.join(" | ")}`);
      }
    }
    console.log("\nGATE: FAIL");
    process.exit(1);
  }
  console.log("\nGATE: PASS — every remaining problem is a declared, reasoned exclusion");
}

main();
