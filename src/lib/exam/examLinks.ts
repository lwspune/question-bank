/**
 * Per-exam destinations for /me and the nav shortcuts (EXAM_TIER_SPEC.md §4.2,
 * §4.5). Pure and client-safe: the notes-bearing slugs and the exam-id map are
 * passed in, so nothing here imports the NOTES_CHAPTERS editorial module (which
 * would land in every page's client bundle via HeaderBar).
 *
 * The rule: a shortcut lands on an exam's own page only when that page has
 * something on it. `/notes/<slug>` for an exam without notes is an honest
 * "coming soon" — and a dead end, which is why the Notes tab stayed generic.
 */
import {
  getExamBySlug,
  resolveBankHref,
  type ExamSlug,
} from "@/lib/exam/examContext";
import type { ExamIdMap } from "@/lib/exam/examNav";

/** `/mock/exam/<slug>` when the exam has mocks, else the `/mock` index. */
export function mockCatalogueHref(slug: ExamSlug | null): string {
  return getExamBySlug(slug)?.hasMocks ? `/mock/exam/${slug}` : "/mock";
}

/** `/notes/<slug>` when the exam has shipped notes, else the `/notes` index. */
export function notesHubHref(
  slug: ExamSlug | null,
  notesSlugs: ReadonlySet<ExamSlug>
): string {
  return slug && notesSlugs.has(slug) ? `/notes/${slug}` : "/notes";
}

/** The mock catalogue of the first target that has mocks, else `/mock`. */
export function firstMockHref(targets: readonly ExamSlug[]): string {
  return mockCatalogueHref(targets.find((s) => getExamBySlug(s)?.hasMocks) ?? null);
}

/** The notes hub of the first target that has notes, else `/notes`. */
export function firstNotesHref(
  targets: readonly ExamSlug[],
  notesSlugs: ReadonlySet<ExamSlug>
): string {
  return notesHubHref(targets.find((s) => notesSlugs.has(s)) ?? null, notesSlugs);
}

export type ExamLink = { slug: ExamSlug; label: string; href: string };

/**
 * One link per target, in stored order — the "Your exams" row on /me. An exam
 * with mocks goes to its mock catalogue; any other goes to its bank.
 */
export function yourExamLinks(targets: readonly ExamSlug[], examIds: ExamIdMap): ExamLink[] {
  const links: ExamLink[] = [];
  for (const slug of targets) {
    const exam = getExamBySlug(slug);
    if (!exam) continue;
    links.push({
      slug,
      label: exam.displayName,
      href: exam.hasMocks ? mockCatalogueHref(slug) : resolveBankHref(examIds[slug] ?? null),
    });
  }
  return links;
}
