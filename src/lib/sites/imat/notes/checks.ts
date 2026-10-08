/**
 * The content contract for one IMAT notes chapter, as a pure function so the
 * test suite (tests/imat-notes.test.ts) and an author's pre-check
 * (scripts/imat/notes/check-chapter.ts) apply exactly the same rules.
 *
 * Returns a list of problems; an empty list means the chapter passes.
 */
import katex from "katex";
import type { ChapterNote, SubtopicNote } from "@/app/notes/_types";
import { enumeratedItems } from "@/lib/notes/introAudit";

export type ChapterUnderCheck = {
  chapterSlug: string;
  chapter: ChapterNote;
  notes: Record<string, SubtopicNote>;
  slugs: readonly string[];
};

export type BankCounts = { total: number; recent: number };

/** Every string in a value, with a path for the message. */
export function collectStrings(value: unknown, path: string, out: { path: string; s: string }[] = []) {
  if (typeof value === "string") out.push({ path, s: value });
  else if (Array.isArray(value)) value.forEach((v, i) => collectStrings(v, `${path}[${i}]`, out));
  else if (value && typeof value === "object")
    for (const [k, v] of Object.entries(value)) collectStrings(v, `${path}.${k}`, out);
  return out;
}

const PLAIN_BAD = /\\\(|\\\[|\\[a-zA-Z]|\*\*|(^|\n)\s*-\s/;
const ZONE = /\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g;
const DASH = /—| – | -- /;
const EMPTY_CELL = /^\s*(|-|—|–|n\/a)\s*$/i;
/** Count claims in an intro: "30 past questions", "9 questions", "12 PYQs". */
const CLAIM = /(\d{1,4})\s+(?:past[\s-]+(?:year[\s-]+|paper[\s-]+)?)?(?:PYQs?|questions)/gi;

function renderProblem(tex: string, display: boolean): string | null {
  try {
    katex.renderToString(tex, { throwOnError: true, displayMode: display, strict: "ignore" });
    return null;
  } catch (e) {
    return (e as Error).message.slice(0, 140);
  }
}

export function checkImatChapter(c: ChapterUnderCheck, bank: BankCounts | undefined): string[] {
  const problems: string[] = [];
  const at = c.chapterSlug;
  const { chapter, notes } = c;

  if (!bank) problems.push(`${at}: chapterName "${chapter.chapterName}" is not an IMAT chapter`);

  // Structure.
  const keys = Object.keys(notes).sort();
  if (JSON.stringify([...chapter.subtopicOrder].sort()) !== JSON.stringify(keys))
    problems.push(`${at}: subtopicOrder does not list exactly the pages in notes`);
  if (JSON.stringify([...c.slugs].sort()) !== JSON.stringify(keys))
    problems.push(`${at}: slugs do not match the notes keys`);
  for (const k of keys) if (!k.startsWith("imat-")) problems.push(`${at}: page slug ${k} must start "imat-"`);

  // Intro.
  if (chapter.intro.length <= 260) problems.push(`${at}: intro must be longer than 260 characters`);
  if (enumeratedItems(chapter.intro) >= 3) problems.push(`${at}: intro lists the pages`);
  if (bank) {
    const allowed = new Set([bank.total, bank.recent, 60, 80]);
    for (const m of chapter.intro.matchAll(CLAIM))
      if (!allowed.has(Number(m[1])))
        problems.push(`${at}: intro claims ${m[1]} questions (bank: ${bank.total} total, ${bank.recent} since 2023)`);
  }
  if (PLAIN_BAD.test(chapter.title)) problems.push(`${at}: chapter title has LaTeX or Markdown`);

  // Dashes anywhere.
  for (const { path, s } of collectStrings({ chapter, notes }, at))
    if (DASH.test(s)) problems.push(`${path}: em/en dash or " -- " in prose`);

  const letters: string[] = [];
  let traps = 0;
  const conceptSlugs = new Set<string>();

  for (const [slug, note] of Object.entries(notes)) {
    const where = `${at}/${slug}`;
    for (const [name, f] of [
      ["title", note.title],
      ["oneLineDefinition", note.oneLineDefinition],
      ["whyItMatters", note.whyItMatters],
    ] as const)
      if (PLAIN_BAD.test(f)) problems.push(`${where}.${name}: LaTeX or Markdown in a plain-text field`);
    if (note.concepts.length === 0) problems.push(`${where}: no concepts`);

    // KaTeX: every zone renders, delimiters balance, formula.latex renders.
    for (const { path, s } of collectStrings(note, where)) {
      if (path.endsWith(".latex")) {
        const err = renderProblem(s, true);
        if (err) problems.push(`${path}: ${err}`);
        continue;
      }
      for (const m of s.matchAll(ZONE)) {
        const err = renderProblem(m[1] ?? m[2], m[2] !== undefined);
        if (err) problems.push(`${path}: ${err}`);
      }
      if ((s.match(/\\\(/g) ?? []).length !== (s.match(/\\\)/g) ?? []).length)
        problems.push(`${path}: unbalanced \\( \\)`);
    }

    for (const k of note.concepts) {
      const cw = `${where}#${k.slug}`;
      if (!k.slug.startsWith("imat-")) problems.push(`${cw}: concept slug must start "imat-"`);
      if (conceptSlugs.has(k.slug)) problems.push(`${cw}: duplicate concept slug`);
      conceptSlugs.add(k.slug);
      if (PLAIN_BAD.test(k.name)) problems.push(`${cw}: LaTeX or Markdown in concept name`);
      if (k.kind === "formula" && k.formula && PLAIN_BAD.test(k.formula.label))
        problems.push(`${cw}: LaTeX or Markdown in formula label`);
      if (k.pyqExampleId) problems.push(`${cw}: pyqExampleId set (IMAT rows are private)`);

      if (k.kind === "reference") {
        const { columns, rows } = k.table;
        if (columns.length < 2 || columns.length > 5) problems.push(`${cw}: table needs 2-5 columns`);
        if (rows.length === 0) problems.push(`${cw}: table has no rows`);
        for (const r of rows) {
          if (r.pyqExampleId) problems.push(`${cw}: table row pyqExampleId set`);
          if (r.cells.length !== columns.length)
            problems.push(`${cw}: row "${r.cells[0]}" has ${r.cells.length} cells for ${columns.length} columns`);
          if (r.cells.some((cell) => EMPTY_CELL.test(cell))) problems.push(`${cw}: row "${r.cells[0]}" has an empty cell`);
        }
      }

      const sc = k.selfCheckExample;
      if (!sc) problems.push(`${cw}: no selfCheckExample`);
      else {
        if (sc.options?.length !== 5) problems.push(`${cw}: self-check needs exactly 5 options`);
        else if (new Set(sc.options).size !== 5) problems.push(`${cw}: self-check has duplicate options`);
        const m = /^\(([A-E])\)/.exec(sc.answer);
        if (!m) problems.push(`${cw}: self-check answer must start "(A)".."(E)"`);
        else letters.push(m[1]);
        if (sc.steps.length === 0) problems.push(`${cw}: self-check has no solution steps`);
      }
      if ((k.practiceSet?.length ?? 0) < 3) problems.push(`${cw}: needs at least 3 practice reps`);
      traps += k.traps?.length ?? 0;
    }
  }

  if (traps < 3) problems.push(`${at}: needs at least 3 traps across the chapter (has ${traps})`);
  if (letters.length >= 5 && new Set(letters).size < 3)
    problems.push(`${at}: self-check answers use only ${[...new Set(letters)].join(", ")}; spread them`);
  return problems;
}
