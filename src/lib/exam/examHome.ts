/**
 * /exams/<slug> — the per-exam home page, built from data.
 *
 * WHY. Only NDA had a home page (/nda, hand-authored). The other exams had a
 * guide hub, a notes hub, a mock catalogue and chapter landings, but no single
 * page that says "this is JEE Mains on PYQ Vault, here is what we hold" — the
 * page a student, a teacher or an AI search engine cites for "where can I
 * practise JEE Main PYQs". This builder shapes one from the registry entry,
 * the chapter-landing index and the catalogue count; the route renders it.
 * Pure — spec in tests/exam-home.test.ts.
 */
import { resolveBankHref, type ExamEntry } from "./examContext";
import { landingHref, type ChapterLanding } from "@/lib/questions/landing";

/** NDA keeps its richer hand-built home; every other exam lives under /exams. */
export function examHomeHref(slug: string): string {
  return slug === "nda" ? "/nda" : `/exams/${slug}`;
}

export type ExamHomeChapter = { name: string; href: string; questionCount: number };
export type ExamHomeSubject = {
  name: string;
  questionCount: number;
  chapters: ExamHomeChapter[];
};

export type ExamHomeModel = {
  slug: string;
  displayName: string;
  examName: string;
  practiceOnly: boolean;
  /** The count this page labels and its bank button lands on: past-year, or
   *  practice for a practice-only exam. NOT the every-kind total, which the
   *  description once called "past-year questions" (UX_REVIEW_TRIAGE.md A1). */
  totalQuestions: number;
  /** Chapters with a landing page (≥15 PUBLIC questions). */
  chapterCount: number;
  /** Rolled up from the chapter profiles; null for practice-only or unknown. */
  years: { min: number; max: number } | null;
  subjects: ExamHomeSubject[];
  links: {
    bank: string;
    guide: string | null;
    notes: string | null;
    mocks: string | null;
    board: string | null;
  };
};

export function buildExamHome(
  entry: ExamEntry,
  landings: readonly ChapterLanding[],
  opts: { examId: string | null; totalPublicQuestions: number; hasShippedNotes: boolean }
): ExamHomeModel {
  const mine = landings.filter((l) => l.examSlug === entry.slug);

  const bySubject = new Map<string, ExamHomeSubject>();
  for (const l of mine) {
    let s = bySubject.get(l.subjectName);
    if (!s) {
      s = { name: l.subjectName, questionCount: 0, chapters: [] };
      bySubject.set(l.subjectName, s);
    }
    s.questionCount += l.questionCount;
    s.chapters.push({ name: l.chapterName, href: landingHref(l), questionCount: l.questionCount });
  }
  const subjects = [...bySubject.values()];
  for (const s of subjects) {
    s.chapters.sort((a, b) => b.questionCount - a.questionCount || a.name.localeCompare(b.name));
  }

  let years: ExamHomeModel["years"] = null;
  if (!entry.practiceOnly) {
    for (const l of mine) {
      const p = l.profile;
      if (!p || p.minYear === null || p.maxYear === null) continue;
      years = years
        ? { min: Math.min(years.min, p.minYear), max: Math.max(years.max, p.maxYear) }
        : { min: p.minYear, max: p.maxYear };
    }
  }

  return {
    slug: entry.slug,
    displayName: entry.displayName,
    examName: entry.examName,
    practiceOnly: entry.practiceOnly === true,
    totalQuestions: opts.totalPublicQuestions,
    chapterCount: mine.length,
    years,
    subjects,
    links: {
      bank: resolveBankHref(opts.examId),
      guide: entry.guidesPath,
      notes: opts.hasShippedNotes ? entry.notesPath : null,
      mocks: entry.hasMocks ? `/mock/exam/${entry.slug}` : null,
      board: entry.boardExam ? `/board/${entry.slug}` : null,
    },
  };
}

/** The one-sentence description: what the page states first, and its <meta>. */
export function examHomeDescription(m: ExamHomeModel): string {
  const n = m.totalQuestions.toLocaleString("en-IN");
  const kind = m.practiceOnly ? "practice questions" : "past-year questions";
  const span = m.years ? ` from ${m.years.min} to ${m.years.max}` : "";
  const shape =
    m.subjects.length > 0 && m.chapterCount > 0
      ? ` across ${m.subjects.length} ${m.subjects.length === 1 ? "subject" : "subjects"} and ${m.chapterCount} ${m.chapterCount === 1 ? "chapter" : "chapters"}`
      : "";
  const extras: string[] = [];
  if (m.links.mocks) extras.push("timed mocks of real papers");
  if (m.links.notes) extras.push("chapter notes");
  if (m.links.board) extras.push("a textbook-solutions reader");
  const tail =
    extras.length === 0
      ? ""
      : extras.length === 1
        ? ` and ${extras[0]}`
        : `, ${extras.slice(0, -1).join(", ")}, and ${extras[extras.length - 1]}`;
  return `${m.displayName} on PYQ Vault: ${n} ${kind}${span}${shape}, with answers and worked solutions${tail}. Free to browse.`;
}
