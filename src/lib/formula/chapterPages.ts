/**
 * Chapter-wise formula pages (2026-10-10): /formula/<exam>/<subject>/<chapter>.
 *
 * One page per /notes chapter with enough formulas to be worth indexing: every
 * formula box with its symbol legend, every reference table, and every trap
 * with its explanation, grouped by subtopic in teaching order. Built from the
 * notes registry ALONE, so the pages make no database read at build or at
 * request (two local builds have taken production down; these add no load).
 *
 * The URL tail is the chapter's /questions tail, made by the same slug rule
 * from the same names (the registry's names are the DB taxonomy names, which
 * notes:lint enforces), so the site has one address scheme per chapter.
 *
 * Kept OUT of lib/formula/index.ts on purpose: that module is imported by the
 * identity pages and the sitemap, and re-exporting this would pull the whole
 * notes registry into them.
 *
 * Spec: tests/formula-chapter-pages.test.ts.
 */
import { NOTES_CHAPTERS, type NotesChapterRegistration } from "@/lib/notes/chapters";
import { deriveSummary } from "@/lib/notes/deriveSummary";
import { legendSymbolText } from "@/lib/notes/printDoc";
import { EXAM_REGISTRY, getExamByName } from "@/lib/exam/examContext";
import { slugifyName } from "@/lib/questions/slugs";
import type { FormulaSpec, ReferenceTable } from "@/app/notes/_types";

/** A chapter page needs this many formula boxes... */
export const FORMULA_PAGE_MIN_FORMULAS = 5;
/** ...or at least one formula and this many reference tables. A page of tables alone is not a formula page. */
export const FORMULA_PAGE_MIN_TABLES = 2;

export type FormulaPageCounts = { formulas: number; tables: number; traps: number };

type ChapterInput = Pick<NotesChapterRegistration, "notes" | "slugs">;

/** What a chapter carries, counted the way the PDF sheet and the revision sheet count it (deriveSummary). */
export function formulaPageCounts(chapter: ChapterInput): FormulaPageCounts {
  let formulas = 0;
  let tables = 0;
  let traps = 0;
  for (const slug of chapter.slugs) {
    const s = deriveSummary(chapter.notes[slug]);
    formulas += s.formulas.length;
    tables += s.references.length;
    traps += s.traps.length;
  }
  return { formulas, tables, traps };
}

export function qualifiesForFormulaPage(c: FormulaPageCounts): boolean {
  return c.formulas >= FORMULA_PAGE_MIN_FORMULAS || (c.formulas >= 1 && c.tables >= FORMULA_PAGE_MIN_TABLES);
}

export type FormulaChapterPage = {
  /** URL segments, the /questions rule. */
  examSlug: string;
  subjectSlug: string;
  chapterSlug: string;
  /** DB names, as the notes registry carries them. */
  examName: string;
  subjectName: string;
  chapterName: string;
  /** The exam's short registry name ("JEE Mains"), for titles and headings. */
  examDisplay: string;
  /** The notes subject label ("NDA Maths"). */
  subjectDisplay: string;
  /** The notes registry keys, to reach the chapter's data and its PDF sheet. */
  subjectRoute: string;
  notesChapterSlug: string;
  notesHref: string;
  counts: FormulaPageCounts;
};

export function formulaChapterHref(p: Pick<FormulaChapterPage, "examSlug" | "subjectSlug" | "chapterSlug">): string {
  return `/formula/${p.examSlug}/${p.subjectSlug}/${p.chapterSlug}`;
}

function buildPages(chapters: readonly NotesChapterRegistration[]): FormulaChapterPage[] {
  const out: FormulaChapterPage[] = [];
  const seen = new Set<string>();
  for (const c of chapters) {
    const exam = getExamByName(c.examName);
    if (!exam) continue;
    const counts = formulaPageCounts(c);
    if (!qualifiesForFormulaPage(counts)) continue;
    const page: FormulaChapterPage = {
      examSlug: exam.slug,
      subjectSlug: slugifyName(c.subjectName),
      chapterSlug: slugifyName(c.chapter.chapterName),
      examName: c.examName,
      subjectName: c.subjectName,
      chapterName: c.chapter.chapterName,
      examDisplay: exam.displayName,
      subjectDisplay: c.subjectDisplay,
      subjectRoute: c.subjectRoute,
      notesChapterSlug: c.chapterSlug,
      notesHref: `/notes/${c.subjectRoute}/${c.chapterSlug}`,
      counts,
    };
    const href = formulaChapterHref(page);
    // First claimant wins, so a URL can never resolve two ways (the /questions rule).
    if (!page.chapterSlug || seen.has(href)) continue;
    seen.add(href);
    out.push(page);
  }
  return out;
}

let cached: FormulaChapterPage[] | null = null;

/** Every chapter formula page, in notes-registry order. */
export function listFormulaChapterPages(): FormulaChapterPage[] {
  if (!cached) cached = buildPages(NOTES_CHAPTERS);
  return cached;
}

export function findFormulaChapterPage(
  examSlug: string,
  subjectSlug: string,
  chapterSlug: string
): FormulaChapterPage | null {
  const [e, s, c] = [examSlug, subjectSlug, chapterSlug].map((x) => x.toLowerCase());
  return listFormulaChapterPages().find((p) => p.examSlug === e && p.subjectSlug === s && p.chapterSlug === c) ?? null;
}

/** The formula page for a notes chapter, or null when the chapter is below the floor. */
export function formulaPageForNotesChapter(subjectRoute: string, chapterSlug: string): FormulaChapterPage | null {
  return (
    listFormulaChapterPages().find((p) => p.subjectRoute === subjectRoute && p.notesChapterSlug === chapterSlug) ?? null
  );
}

/** The other formula pages of the same exam and subject, A to Z: the page's internal links. */
export function formulaPageSiblings(page: FormulaChapterPage): FormulaChapterPage[] {
  return listFormulaChapterPages()
    .filter((p) => p !== page && p.examSlug === page.examSlug && p.subjectSlug === page.subjectSlug)
    .sort((a, b) => a.chapterName.localeCompare(b.chapterName));
}

function countPhrase(n: number, one: string, many: string): string | null {
  return n === 0 ? null : `${n} ${n === 1 ? one : many}`;
}

/** The page's first sentence and its meta description: every number is one the page shows. */
export function formulaPageLead(
  p: Pick<FormulaChapterPage, "counts" | "examDisplay" | "subjectName" | "chapterName">
): string {
  const parts = [
    countPhrase(p.counts.formulas, "formula", "formulas"),
    countPhrase(p.counts.tables, "reference table", "reference tables"),
    countPhrase(p.counts.traps, "common trap", "common traps"),
  ].filter((x): x is string => x !== null);
  const list = parts.length > 1 ? `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}` : parts[0];
  return `${list} for ${p.examDisplay} ${p.subjectName} ${p.chapterName}, grouped by subtopic.`;
}

export type FormulaPageSection = {
  subtopicSlug: string;
  title: string;
  notesHref: string;
  formulas: { conceptSlug: string; conceptName: string; formula: FormulaSpec }[];
  tables: { conceptSlug: string; conceptName: string; table: ReferenceTable }[];
  traps: { title: string; body: string }[];
};

/**
 * One section per subtopic, in teaching order, skipping a subtopic with
 * nothing to show. Legend symbols go through `legendSymbolText`, the rule the
 * printable handout uses, so bare maths ("f_1") renders as maths here.
 */
export function buildFormulaPageSections(chapter: NotesChapterRegistration): FormulaPageSection[] {
  const base = `/notes/${chapter.subjectRoute}/${chapter.chapterSlug}`;
  const sections: FormulaPageSection[] = [];
  for (const slug of chapter.chapter.subtopicOrder) {
    const note = chapter.notes[slug];
    if (!note) continue;
    const section: FormulaPageSection = {
      subtopicSlug: slug,
      title: note.title,
      notesHref: `${base}/${slug}`,
      formulas: [],
      tables: [],
      traps: [],
    };
    for (const c of note.concepts) {
      if (c.kind === "formula" && c.formula) {
        const f = c.formula;
        section.formulas.push({
          conceptSlug: c.slug,
          conceptName: c.name,
          formula: f.symbols ? { ...f, symbols: f.symbols.map((s) => ({ ...s, symbol: legendSymbolText(s.symbol) })) } : f,
        });
      }
      if (c.kind === "reference") section.tables.push({ conceptSlug: c.slug, conceptName: c.name, table: c.table });
      for (const t of c.traps ?? []) section.traps.push({ title: t.title, body: t.body });
    }
    if (section.formulas.length + section.tables.length + section.traps.length > 0) sections.push(section);
  }
  return sections;
}

export type FormulaIndexGroup = {
  examSlug: string;
  examDisplay: string;
  subjects: { subjectSlug: string; subjectName: string; pages: FormulaChapterPage[] }[];
};

/** The /formula index: exams in registry order, subjects in first-seen order, chapters A to Z. */
export function groupFormulaPagesForIndex(pages: readonly FormulaChapterPage[]): FormulaIndexGroup[] {
  const groups: FormulaIndexGroup[] = [];
  for (const exam of EXAM_REGISTRY) {
    const mine = pages.filter((p) => p.examSlug === exam.slug);
    if (mine.length === 0) continue;
    const subjects: FormulaIndexGroup["subjects"] = [];
    for (const p of mine) {
      let s = subjects.find((x) => x.subjectSlug === p.subjectSlug);
      if (!s) {
        s = { subjectSlug: p.subjectSlug, subjectName: p.subjectName, pages: [] };
        subjects.push(s);
      }
      s.pages.push(p);
    }
    for (const s of subjects) s.pages.sort((a, b) => a.chapterName.localeCompare(b.chapterName));
    groups.push({ examSlug: exam.slug, examDisplay: exam.displayName, subjects });
  }
  return groups;
}

/** The exams with formula pages, registry order: the /formula/<exam> hubs. */
export function formulaExamSlugs(): string[] {
  return groupFormulaPagesForIndex(listFormulaChapterPages()).map((g) => g.examSlug);
}

/** One exam's hub content, or null for a slug that is not an exam with formula pages. */
export function formulaExamGroup(examSlug: string): FormulaIndexGroup | null {
  const slug = examSlug.toLowerCase();
  return groupFormulaPagesForIndex(listFormulaChapterPages()).find((g) => g.examSlug === slug) ?? null;
}
