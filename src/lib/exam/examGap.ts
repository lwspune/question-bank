/**
 * The notice a signed-in student sees on /notes, /guide or /board when NONE of
 * the exams they chose has anything on that page (2026-10-10).
 *
 * Clarity showed the dead end: an MPSC student tapped Board, Notes and Guide in
 * one-second hops, because those pages list other exams' material and say
 * nothing about theirs. This names their exam and points to what it does have.
 * Pure and client-safe; the page passes the exams it actually shows, so the
 * notice can never disagree with the cards below it.
 */
import { getExamBySlug, isExamSlug, type ExamSlug } from "@/lib/exam/examContext";
import { mockCatalogueHref } from "@/lib/exam/examLinks";

export type GapNotice = {
  slug: ExamSlug;
  displayName: string;
  links: { label: string; href: string }[];
};

/** Null when any chosen exam is on the page, or when no exam was chosen. */
export function examGapNotice(targets: readonly string[], covered: readonly ExamSlug[]): GapNotice | null {
  const known = targets.filter(isExamSlug);
  if (known.length === 0) return null;
  const onPage = new Set<string>(covered);
  if (known.some((s) => onPage.has(s))) return null;

  const slug = known[0];
  const exam = getExamBySlug(slug)!;
  const links: GapNotice["links"] = [];
  if (exam.hasMocks) links.push({ label: "Past papers and chapter tests", href: mockCatalogueHref(slug) });
  links.push({ label: `Everything for ${exam.displayName}`, href: `/exams/${slug}` });
  return { slug, displayName: exam.displayName, links };
}
