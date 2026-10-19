/**
 * What a page is about, for V (2026-10-19). V was told the path only, so on
 * the HSC 12 Solid State page "the pe pyqs ... 2022 to 2026" was searched as
 * Physical Education: the path named the chapter and V could not read it.
 *
 * A chapter page (/questions or /board, exam/subject/chapter) gives its
 * chapter from the search list; any other page under one exam gives the exam.
 * Pure. Spec: tests/chat-page-context.test.ts.
 */
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { GUIDE_CATALOG } from "@/lib/guide/guideCatalog";
import type { ChapterSearchRow } from "./chapterSearch";

export type VPageContext = { examName: string; subjectName?: string; chapterName?: string };

// Pages whose first segment after the prefix is an exam slug.
const EXAM_PREFIXES = new Set(["questions", "board", "exams", "notes", "guide", "formula", "question-papers"]);
// Pages whose exam/subject/chapter path is a chapter of the search list.
const CHAPTER_PREFIXES = new Set(["questions", "board"]);

function examDisplayName(slug: string): string | null {
  return EXAM_REGISTRY.find((e) => e.slug === slug)?.displayName ?? null;
}

/** A subject guide (/guide/mht-cet-physics) belongs to the exam whose hub lists it. */
function guideExamSlug(segment: string): string | null {
  const href = `/guide/${segment}`;
  for (const [slug, cards] of Object.entries(GUIDE_CATALOG)) {
    if (cards?.some((c) => c.href === href)) return slug;
  }
  return null;
}

export function pageContext(path: string | null, rows: readonly ChapterSearchRow[]): VPageContext | null {
  if (!path) return null;
  const [prefix, first, subject, chapter] = path.split("?")[0].split("/").filter(Boolean);
  if (!prefix || !first || !EXAM_PREFIXES.has(prefix)) return null;

  const examSlug = examDisplayName(first) ? first : prefix === "guide" ? guideExamSlug(first) : null;
  const examName = examSlug ? examDisplayName(examSlug) : null;
  if (!examSlug || !examName) return null;

  if (CHAPTER_PREFIXES.has(prefix) && subject && chapter) {
    const row = rows.find((r) => r.examSlug === examSlug && r.subjectSlug === subject && r.chapterSlug === chapter);
    if (row) return { examName, subjectName: row.subjectName, chapterName: row.chapterName };
  }
  return { examName };
}
