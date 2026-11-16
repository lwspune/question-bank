/** Where an article lives (migration 0263). Pure. */
import type { ArticleKind } from "./kinds";

/** An exam's pattern, syllabus and marks page. */
export function syllabusHref(examSlug: string): string {
  return `/exams/${examSlug}/syllabus`;
}

/** The public path of a database article: /blog/<slug>, or the exam's syllabus page for an evergreen one. */
export function articlePath(a: { kind: ArticleKind; slug: string; examSlug: string | null }): string {
  return a.kind === "evergreen" && a.examSlug ? syllabusHref(a.examSlug) : `/blog/${a.slug}`;
}
