/**
 * Pre-flight for the PRIVATE load — Phase 4, step 0. Read-only, writes nothing.
 *
 *   npx tsx scripts/ipmat/preflight.ts
 *
 * WHY THIS RUNS FIRST. `commitStaged` dedups on the DB's unique index over
 * (org_id, exam_id, content_hash) and UPSERTS, so two rows that hash the same
 * do not error — one silently replaces the other and the row count comes back
 * short with no explanation. And `contentHash(question, options, answer)`
 * DELIBERATELY EXCLUDES CONTEXT, so two questions sharing a stem and an option
 * set but sitting under different passages collide.
 *
 * That shape is real in this corpus: the Verbal Ability sets repeat one
 * directive stem across five or six rows ("One of the statements below contains
 * a word used incorrectly…"), and two Indore 2024 rows share a stem outright.
 * They survive only because their OPTIONS differ — which is a property of the
 * data, not of the hash, so it has to be measured rather than assumed.
 *
 * Also checks what the loader cannot recover from later:
 *   - a numeric answer that is not representable as a number, or that would
 *     lose a leading zero (a parajumble answer is an ORDER, not a quantity)
 *   - a subject name the map produces that does not exist in SECTION_SUBJECTS
 *   - an MCQ without exactly one correct option
 *   - text that would trip the write-boundary guard
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { contentHash, numericContentHash } from "../../src/lib/upload/hash";
import { ipmatContentHash } from "./hash";
import { literalNewlineFields } from "../../src/lib/upload/textGuard";
import { IPMAT_EXAMS } from "./config";
import { resolveTaxonomy } from "./taxonomy";
import type { BuiltQuestion } from "./build";

const BUILD_DIR = join(__dirname, "data", "build");

type Row = BuiltQuestion & { _hash: string };

function main() {
  const built: BuiltQuestion[] = [];
  for (const f of readdirSync(BUILD_DIR).filter((x) => x.endsWith(".json"))) {
    built.push(...(JSON.parse(readFileSync(join(BUILD_DIR, f), "utf8")) as BuiltQuestion[]));
  }
  const live = built.filter((r) => !r.reconstructed && !r.dropped && r.problems.length === 0);
  console.log(`pre-flight over ${live.length} committable rows (of ${built.length})\n`);

  const problems: string[] = [];

  // ---------------------------------------------------- content-hash collisions
  const rows: Row[] = live.map((r) => {
    const answer = r.options.find((o) => o.isCorrect)?.label ?? "";
    const _hash = ipmatContentHash({
      format: r.format,
      text: r.text,
      context: r.context,
      options: r.options.map((o) => o.text),
      answer,
    });
    return { ...r, _hash };
  });

  // The unique index is PER EXAM, so collisions only matter within one exam.
  const byExamHash = new Map<string, Row[]>();
  for (const r of rows) {
    const k = `${r.exam}|${r._hash}`;
    (byExamHash.get(k) ?? byExamHash.set(k, []).get(k)!).push(r);
  }
  const collisions = [...byExamHash.values()].filter((v) => v.length > 1);

  // Report what the SHARED, context-blind hash would have collided, so the
  // reason scripts/ipmat/hash.ts exists stays visible in every run.
  const sharedByExam = new Map<string, number>();
  for (const r of rows) {
    const answer = r.options.find((o) => o.isCorrect)?.label ?? "";
    const h =
      r.format === "numeric"
        ? numericContentHash(r.text, r.context)
        : contentHash(r.text, r.options.map((o) => o.text), answer);
    const k = `${r.exam}|${h}`;
    sharedByExam.set(k, (sharedByExam.get(k) ?? 0) + 1);
  }
  const sharedCollisions = [...sharedByExam.values()].filter((n) => n > 1).length;
  console.log(
    `  (the shared context-blind contentHash would collide ${sharedCollisions} group(s) — see scripts/ipmat/hash.ts)`
  );
  console.log("CONTENT-HASH COLLISIONS (within one exam — these silently DROP rows)");
  if (collisions.length === 0) {
    console.log("  none");
  } else {
    for (const group of collisions) {
      problems.push(`hash collision: ${group.map((r) => `${r.exam} ${r.year} ${r.section} Q${r.questionNumber}`).join(" == ")}`);
      console.log(`  x${group.length}  ${group.map((r) => `${r.year} ${r.section} Q${r.questionNumber}`).join("  ==  ")}`);
      console.log(`        stem: ${JSON.stringify(group[0].text.slice(0, 96))}`);
      console.log(`        ctx : ${group.map((r) => (r.context ? r.context.slice(0, 40) : "(none)")).join(" | ")}`);
    }
  }

  // Cross-exam duplicates are FINE (migration 0038 made the index per-exam) but
  // worth reporting, because it means the same question is genuinely reused.
  const byHash = new Map<string, Row[]>();
  for (const r of rows) (byHash.get(r._hash) ?? byHash.set(r._hash, []).get(r._hash)!).push(r);
  const crossExam = [...byHash.values()].filter(
    (v) => new Set(v.map((r) => r.exam)).size > 1
  );
  console.log(`\nCROSS-EXAM duplicates (allowed by design, per-exam index): ${crossExam.length}`);
  for (const g of crossExam.slice(0, 5)) {
    console.log(`  ${g.map((r) => `${r.exam} ${r.year} ${r.section} Q${r.questionNumber}`).join(" | ")}`);
  }

  // ------------------------------------------------------------ numeric answers
  console.log("\nNUMERIC ANSWERS");
  const numeric = rows.filter((r) => r.format === "numeric");
  const leadingZero = numeric.filter((r) => /^0[0-9]/.test(r.numericAnswer ?? ""));
  const notANumber = numeric.filter(
    (r) => r.numericAnswer === null || !Number.isFinite(Number(r.numericAnswer))
  );
  const lossy = numeric.filter(
    (r) => r.numericAnswer !== null && String(Number(r.numericAnswer)) !== r.numericAnswer.trim()
  );
  console.log(`  rows                       ${numeric.length}`);
  console.log(`  not representable as Number ${notANumber.length}`);
  console.log(`  LEADING ZERO (an ORDER, not a quantity — Number() would lose it) ${leadingZero.length}`);
  console.log(`  string changes via Number() ${lossy.length}`);
  for (const r of [...notANumber, ...leadingZero, ...lossy].slice(0, 10)) {
    console.log(`    ${r.exam} ${r.year} ${r.section} Q${r.questionNumber}: ${JSON.stringify(r.numericAnswer)}`);
  }
  if (notANumber.length) problems.push(`${notANumber.length} numeric answers are not numbers`);
  if (leadingZero.length) problems.push(`${leadingZero.length} numeric answers have a leading zero`);
  if (lossy.length) problems.push(`${lossy.length} numeric answers change when parsed as a Number`);

  // -------------------------------------------------------------- taxonomy join
  console.log("\nTAXONOMY");
  const unresolved = rows.filter(
    (r) => !resolveTaxonomy(r.exam, r.section, r.sourceTopic, r.sourceSubTopic)
  );
  console.log(`  rows that do not resolve   ${unresolved.length}`);
  if (unresolved.length) {
    problems.push(`${unresolved.length} rows do not resolve to a subject/chapter/subtopic`);
    for (const r of unresolved.slice(0, 5)) {
      console.log(`    ${r.exam} ${r.section} ${r.sourceTopic} > ${r.sourceSubTopic}`);
    }
  }
  const subjects = new Set<string>();
  for (const r of rows) {
    const t = resolveTaxonomy(r.exam, r.section, r.sourceTopic, r.sourceSubTopic);
    if (t) subjects.add(`${r.exam} :: ${t.subject}`);
  }
  console.log(`  subject rows to create     ${subjects.size}`);
  for (const s of [...subjects].sort()) console.log(`    ${s}`);

  // ------------------------------------------------------------- option sanity
  console.log("\nOPTIONS");
  const badMcq = rows.filter(
    (r) => r.format === "mcq" && r.options.filter((o) => o.isCorrect).length !== 1
  );
  const shortMcq = rows.filter((r) => r.format === "mcq" && r.options.length !== 4);
  console.log(`  MCQ without exactly one correct ${badMcq.length}`);
  console.log(`  MCQ without exactly 4 options   ${shortMcq.length}`);
  for (const r of shortMcq.slice(0, 8)) {
    console.log(`    ${r.exam} ${r.year} ${r.section} Q${r.questionNumber}: ${r.options.length} options`);
  }
  if (badMcq.length) problems.push(`${badMcq.length} MCQ rows lack exactly one correct option`);

  // ------------------------------------------------------- write-boundary guard
  console.log("\nWRITE-BOUNDARY GUARD (the one commitStaged will apply)");
  const guarded = rows.filter((r) => literalNewlineFields({ text: r.text, context: r.context }).length);
  console.log(`  rows a literal backslash-n would reject ${guarded.length}`);
  if (guarded.length) problems.push(`${guarded.length} rows would be rejected by the text guard`);

  // ------------------------------------------------------------------- per exam
  console.log("\nPER EXAM");
  for (const e of IPMAT_EXAMS) {
    const mine = rows.filter((r) => r.exam === e.slug);
    const papers = new Set(mine.map((r) => `${r.year}-${r.section}`));
    console.log(
      `  ${e.slug.padEnd(14)} ${String(mine.length).padStart(4)} rows  ${papers.size} papers  ` +
        `mcq ${mine.filter((r) => r.format === "mcq").length} / numeric ${mine.filter((r) => r.format === "numeric").length}`
    );
  }

  console.log("");
  if (problems.length) {
    console.log(`PRE-FLIGHT: FAIL (${problems.length})`);
    for (const p of problems) console.log(`  ${p}`);
    process.exit(1);
  }
  console.log("PRE-FLIGHT: PASS — safe to load");
}

main();
