/**
 * Read-only checks on one ISC paper's files.
 *
 *   npx tsx scripts/cisce-pyq/validate.ts icse-10 2026 Physics
 *
 * Transcription: paperIssues (chapter/subtopic catalog, option counts, math
 * delimiters, literal \n, answer-shaped fields, OR groups) plus the marks total
 * against pattern.ts (every question transcribed, so an "attempt any four"
 * section is checked against all of its questions: transcribedMarks). Key (2025): one entry per row, no strays. Exits 1 on any
 * issue, so it can gate the dump.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { paperIssues, type CiscePaper } from "./lib";
import { patternFor, effectiveMarks, transcribedMarks } from "./pattern";
import { dataDir, parsePaperArgs } from "./exams";
import type { OfficialAnswer } from "./crosscheck";

function main() {
  const { exam, year, subject, stem } = parsePaperArgs(process.argv.slice(2), "validate.ts <exam> <year> <subject>");
  const data = dataDir(exam);
  const paper = JSON.parse(readFileSync(join(data, `${stem}.questions.json`), "utf8")) as CiscePaper;
  const issues = paperIssues(paper);
  if (paper.exam !== exam.examName) issues.push(`file says exam "${paper.exam}", expected "${exam.examName}"`);

  // Marks: an OR group counts once (its first alternative), and so does the
  // whole Maths Section B-or-C choice, which effectiveMarks already knows.
  const seen = new Set<string>();
  const bySection = new Map<string, number>();
  for (const r of paper.rows) {
    if (r.choice) {
      if (seen.has(r.choice)) continue;
      seen.add(r.choice);
    }
    bySection.set(r.section, (bySection.get(r.section) ?? 0) + r.marks);
  }
  const pattern = patternFor(exam.slug, subject, year);
  for (const s of pattern.sections) {
    const got = bySection.get(s.id) ?? 0;
    const want = transcribedMarks(s);
    if (got !== want) issues.push(`section ${s.id}: rows add to ${got} marks, the paper prints ${want}`);
  }

  const keyPath = join(data, `${stem}.key.json`);
  if (existsSync(keyPath)) {
    const key = (JSON.parse(readFileSync(keyPath, "utf8")) as { answers: OfficialAnswer[] }).answers;
    const refs = new Set(paper.rows.map((r) => r.ref));
    const keyed = new Set(key.map((k) => k.ref));
    for (const r of refs) if (!keyed.has(r)) issues.push(`${r}: no key entry`);
    for (const k of keyed) if (!refs.has(k)) issues.push(`key entry ${k} matches no row`);
    for (const r of paper.rows) {
      const k = key.find((x) => x.ref === r.ref);
      if (r.format === "mcq" && k && !k.labels.length) issues.push(`${r.ref}: MCQ key carries no letter`);
    }
  }

  const figs = paper.rows.filter((r) => r.figure);
  console.log(
    `${exam.slug} ${year} ${subject}: ${paper.rows.length} rows · ${paper.rows.filter((r) => r.format === "mcq").length} mcq · ` +
      `${figs.length} figures (${figs.filter((r) => r.figure!.required !== false).length} required) · ` +
      `marks ${[...bySection].map(([s, m]) => `${s}=${m}`).join(" ")} (paper total ${effectiveMarks(pattern)})`
  );
  if (issues.length) {
    console.log(`${issues.length} issue(s):\n  ${issues.join("\n  ")}`);
    process.exit(1);
  }
  console.log("clean.");
}

main();
