/**
 * The breadcrumb trail for a notes chapter or topic page: Notes › exam ›
 * subject › chapter (› topic). The last item is the current page and carries
 * no link. The exam crumb (2026-10-07) leads back to /notes/<exam>, which lists
 * every chapter of every subject; an exam missing from the registry has no such
 * page, so its crumb is left out rather than linked to a 404.
 * Spec: tests/notes-breadcrumbs.test.ts.
 */
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import type { Crumb } from "@/components/nav/Breadcrumbs";

export type { Crumb };

type ChapterRef = {
  examName: string;
  subjectRoute: string;
  subjectDisplay: string;
  chapterSlug: string;
  chapter: { chapterName: string };
};

/** Notes › exam: the head every notes trail below the index shares. */
export function notesExamCrumbs(examName: string): Crumb[] {
  const exam = EXAM_REGISTRY.find((e) => e.examName === examName);
  const head: Crumb[] = [{ href: "/notes", label: "Notes" }];
  return exam ? [...head, { href: `/notes/${exam.slug}`, label: exam.displayName }] : head;
}

export function notesBreadcrumbs(c: ChapterRef, topicTitle?: string): Crumb[] {
  const chapterHref = `/notes/${c.subjectRoute}/${c.chapterSlug}`;
  const trail: Crumb[] = [
    ...notesExamCrumbs(c.examName),
    { href: `/notes/${c.subjectRoute}`, label: c.subjectDisplay },
  ];
  if (topicTitle === undefined) return [...trail, { label: c.chapter.chapterName }];
  return [...trail, { href: chapterHref, label: c.chapter.chapterName }, { label: topicTitle }];
}
