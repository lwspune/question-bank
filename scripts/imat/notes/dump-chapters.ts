/**
 * Evidence for authoring IMAT notes: one Markdown file per chapter listing
 * every past question in it (all years 2011-2026), with its correct option.
 * Read-only: reads scripts/imat/data/<year>.questions.json, writes to
 * generated-papers/imat-notes/ (gitignored).
 *
 * The notes never quote these questions (2011-2022 are Cambridge's and can
 * never be published; 2023+ wait on the copyright opinion). They tell the
 * author WHAT is tested and HOW OFTEN, nothing more.
 *
 *   npx tsx scripts/imat/notes/dump-chapters.ts
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { keyModeFor, subjectOf, type ImatQuestion } from "../lib";

const DATA = join(__dirname, "..", "data");
const OUT = join(__dirname, "..", "..", "..", "generated-papers", "imat-notes");
const LETTERS = ["A", "B", "C", "D", "E"];

type Paper = { year: number; questions: (ImatQuestion & { answer?: string })[] };

function correctIndex(year: number, q: { answer?: string }): number {
  if (keyModeFor(year) === "printed-a") return 0;
  return LETTERS.indexOf(String(q.answer));
}

export function slugOf(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const byChapter = new Map<string, { subject: string; lines: string[]; years: number[] }>();
for (let year = 2011; year <= 2026; year++) {
  const paper = JSON.parse(readFileSync(join(DATA, `${year}.questions.json`), "utf8")) as Paper;
  for (const q of paper.questions) {
    const key = q.chapter;
    const entry = byChapter.get(key) ?? { subject: subjectOf(q), lines: [], years: [] };
    const ci = correctIndex(year, q);
    const opts = q.options
      .map((o, i) => `   ${i === ci ? "**[correct]**" : "-"} ${o}`)
      .join("\n");
    const ctx = q.context ? `   Context: ${q.context.replace(/\n/g, " ")}\n` : "";
    const fig = (q as { figure?: unknown }).figure ? "   (has a figure)\n" : "";
    entry.lines.push(`### ${year} Q${q.n}\n${ctx}${fig}   ${q.text.replace(/\n/g, " ")}\n${opts}\n`);
    entry.years.push(year);
    byChapter.set(key, entry);
  }
}

mkdirSync(OUT, { recursive: true });
const index: string[] = [];
for (const [chapter, e] of [...byChapter].sort((a, b) => a[1].subject.localeCompare(b[1].subject))) {
  const recent = e.years.filter((y) => y >= 2023).length;
  const file = `${slugOf(e.subject)}--${slugOf(chapter)}.md`;
  const head =
    `# ${chapter} (${e.subject})\n\n` +
    `${e.lines.length} past questions, ${recent} of them from the ministry papers 2023-2026 (the current format).\n` +
    `NEVER QUOTE OR CLOSELY PARAPHRASE THESE. They show what is tested and how often.\n\n`;
  writeFileSync(join(OUT, file), head + e.lines.join("\n"));
  index.push(`${e.subject} | ${chapter} | ${e.lines.length} | 2023+: ${recent} | ${file}`);
}
writeFileSync(join(OUT, "INDEX.txt"), index.join("\n") + "\n");
console.log(`${byChapter.size} chapters written to ${OUT}`);
