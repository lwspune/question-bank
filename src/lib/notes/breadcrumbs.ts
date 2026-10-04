/**
 * The breadcrumb trail for a notes chapter or topic page: Notes › subject ›
 * chapter (› topic). The last item is the current page and carries no link.
 * Spec: tests/notes-breadcrumbs.test.ts.
 */
export type Crumb = { href?: string; label: string };

type ChapterRef = {
  subjectRoute: string;
  subjectDisplay: string;
  chapterSlug: string;
  chapter: { chapterName: string };
};

export function notesBreadcrumbs(c: ChapterRef, topicTitle?: string): Crumb[] {
  const chapterHref = `/notes/${c.subjectRoute}/${c.chapterSlug}`;
  const trail: Crumb[] = [
    { href: "/notes", label: "Notes" },
    { href: `/notes/${c.subjectRoute}`, label: c.subjectDisplay },
  ];
  if (topicTitle === undefined) return [...trail, { label: c.chapter.chapterName }];
  return [...trail, { href: chapterHref, label: c.chapter.chapterName }, { label: topicTitle }];
}
