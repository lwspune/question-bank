/**
 * Pure helpers for /school-exams: which exams a child in a given class can sit,
 * grouped the way the page shows them. No I/O; the catalogue is catalog.ts.
 */
import { getExamBySlug } from "@/lib/exam/examContext";
import { examHomeHref } from "@/lib/exam/examHome";
import { SCHOOL_EXAMS, type SchoolExam, type SchoolExamKind } from "./catalog";

/** The classes a parent can pick: Class 1 to Class 10 (owner, 2026-11-27). */
export const SCHOOL_CLASSES: readonly number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const KIND_ORDER: readonly SchoolExamKind[] = ["admission", "scholarship", "competition"];

export const KIND_TITLES: Record<SchoolExamKind, string> = {
  admission: "Admission tests",
  scholarship: "Scholarships",
  competition: "Competitions and olympiads",
};

export function classHref(n: number): string {
  return `/school-exams/class-${n}`;
}

/** "class-5" -> 5. Anything else (class-05, class-11, Class-5) -> null. */
export function parseClassSlug(slug: string): number | null {
  const m = /^class-([1-9]|10)$/.exec(slug);
  return m ? Number(m[1]) : null;
}

/** The exams a child in class `n` can sit now, all-India first, catalogue order kept. */
export function examsForClass(n: number, exams: readonly SchoolExam[] = SCHOOL_EXAMS): SchoolExam[] {
  const fits = exams.filter((e) => e.sitInClasses.includes(n));
  return [...fits.filter((e) => e.region === "india"), ...fits.filter((e) => e.region !== "india")];
}

export type KindGroup = { kind: SchoolExamKind; title: string; exams: SchoolExam[] };

/** Admission, then scholarships, then competitions; empty groups left out. */
export function groupByKind(exams: readonly SchoolExam[]): KindGroup[] {
  return KIND_ORDER.flatMap((kind) => {
    const inKind = exams.filter((e) => e.kind === kind);
    const ordered = [...inKind.filter((e) => e.region === "india"), ...inKind.filter((e) => e.region !== "india")];
    return ordered.length ? [{ kind, title: KIND_TITLES[kind], exams: ordered }] : [];
  });
}

/** "AISSEE, Class 6 entry (Sainik Schools)" -> "AISSEE"; each name once, in order. */
export function shortNames(exams: readonly SchoolExam[]): string[] {
  const names = exams.map((e) => e.name.split(" (")[0].split(",")[0].trim());
  return [...new Set(names)];
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2027-01-17" -> "17 January 2027" (a calendar date, so no time zone is involved). */
export function dateInWords(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/**
 * The exam calendar's next date for an exam we carry, as a card line, or null
 * when there is none or the card's own text already gives that date.
 */
export function nextTestLine(exam: SchoolExam, sitting: { date: string } | null): string | null {
  if (!sitting) return null;
  const words = dateInWords(sitting.date);
  return exam.when.includes(words) ? null : `Next test: ${words}`;
}

/** Our page for an exam we carry, or null when we carry none of its questions publicly. */
export function ourExamLink(exam: SchoolExam): string | null {
  if (!exam.registrySlug) return null;
  const entry = getExamBySlug(exam.registrySlug);
  if (!entry || entry.noPublicContent) return null;
  return examHomeHref(entry.slug);
}
