/**
 * The Visuals gallery's rules (owner, 2026-11-23): every notes visual by exam,
 * subject and chapter, opened full screen with the concept beside it and 3 of
 * its questions to practise. Pure; shared by the page, the weak-chapters route
 * and the header. Spec: tests/gallery.test.ts.
 */

/** The tile's badge, and the tab it sits under. */
export type GalleryBadge = "try" | "3d" | "picture";
export type GalleryKindFilter = "all" | GalleryBadge;

export type GalleryVisual = {
  slug: string;
  examSlug: string;
  examName: string;
  subjectName: string;
  subjectRoute: string;
  subjectDisplay: string;
  chapterSlug: string;
  chapterName: string;
  subtopicSlug: string;
  subtopicTitle: string;
  conceptSlug: string;
  conceptName: string;
  /** The concept's intuition: one short paragraph, may hold \( \) maths. */
  line: string;
  /** The notes' featured question, never one of the 3 to practise. */
  pyqExampleId?: string;
  badge: GalleryBadge;
  /** Runs in the browser (a slider, a drag): the viewer loads its working version. */
  interactive: boolean;
};

export type GalleryChapter = { chapterSlug: string; chapterName: string; count: number };

/** One subject in the dropdowns. */
export type GallerySubject = {
  examSlug: string;
  examName: string;
  subjectName: string;
  subjectRoute: string;
  subjectDisplay: string;
  count: number;
};

/** The tabs, in order, with their labels. */
export const GALLERY_KINDS: readonly { kind: GalleryKindFilter; label: string }[] = [
  { kind: "all", label: "All" },
  { kind: "try", label: "Try it" },
  { kind: "3d", label: "3D" },
  { kind: "picture", label: "Pictures" },
];

export const BADGE_LABEL: Record<GalleryBadge, string> = { try: "Try it", "3d": "3D", picture: "Picture" };

/** A subject's chapters in the order their visuals come, with how many each has. */
export function chaptersOf(visuals: readonly GalleryVisual[]): GalleryChapter[] {
  const by = new Map<string, GalleryChapter>();
  for (const v of visuals) {
    const c = by.get(v.chapterSlug);
    if (c) c.count++;
    else by.set(v.chapterSlug, { chapterSlug: v.chapterSlug, chapterName: v.chapterName, count: 1 });
  }
  return [...by.values()];
}

export function filterVisuals<T extends GalleryVisual>(
  visuals: readonly T[],
  f: { chapter: string | null; kind: GalleryKindFilter }
): T[] {
  return visuals.filter((v) => (!f.chapter || v.chapterSlug === f.chapter) && (f.kind === "all" || v.badge === f.kind));
}

/**
 * "Your weak chapters first": chapters with mistakes waiting on the Fix list
 * come first, most first; the rest keep book order (a stable sort, so equal
 * counts keep it too).
 */
export function orderChaptersByWeak(chapters: readonly GalleryChapter[], weak: ReadonlyMap<string, number>): GalleryChapter[] {
  const w = (c: GalleryChapter) => weak.get(c.chapterName) ?? 0;
  return chapters
    .map((c, i) => ({ c, i }))
    .sort((a, b) => w(b.c) - w(a.c) || a.i - b.i)
    .map((x) => x.c);
}

/** Waiting mistakes per chapter name, for one exam and subject (the Fix list's pool). */
export function weakChapterCounts(
  due: readonly { chapter: string; exam?: string; subject?: string }[],
  examName: string,
  subjectName: string
): Map<string, number> {
  const out = new Map<string, number>();
  for (const d of due) {
    if (d.exam !== examName || d.subject !== subjectName) continue;
    out.set(d.chapter, (out.get(d.chapter) ?? 0) + 1);
  }
  return out;
}

/** How many questions a visual offers to practise (owner, 2026-11-23: "3qs"). */
export const PRACTICE_COUNT = 3;

/** Up to 3 of the concept's tagged questions, leaving out the notes' featured one. */
export function practiceIds(tagged: readonly string[], pyqExampleId: string | undefined): string[] {
  return tagged.filter((id) => id !== pyqExampleId).slice(0, PRACTICE_COUNT);
}

/** The concept on its notes page. */
export function notesHrefOf(v: Pick<GalleryVisual, "subjectRoute" | "chapterSlug" | "subtopicSlug" | "conceptSlug">): string {
  return `/notes/${v.subjectRoute}/${v.chapterSlug}/${v.subtopicSlug}#${v.conceptSlug}`;
}

/** One visual's own link, to share. */
export function visualHrefOf(v: Pick<GalleryVisual, "subjectRoute" | "slug">): string {
  return `/visuals/${v.subjectRoute}?v=${encodeURIComponent(v.slug)}`;
}

/** The header's Visuals link: the exam's first subject with visuals, else the list of all. */
export function galleryHrefFor(examSlug: string | null, nav: Readonly<Record<string, string>>): string {
  const route = examSlug ? nav[examSlug] : undefined;
  return route ? `/visuals/${route}` : "/visuals";
}

/**
 * A tile's picture: the diagram's first <svg> (with any svg inside it), not its
 * box, captions, worked lines or controls, which shrink the picture and spill
 * big text into a small square (seen on the first capture, 2026-11-23). The
 * viewer shows the whole diagram. No svg, or one that never closes: the whole
 * markup.
 */
export function tileMarkupOf(markup: string): string {
  const start = markup.indexOf("<svg");
  if (start < 0) return markup;
  const tag = /<svg\b[^>]*?(\/?)>|<\/svg>/g;
  tag.lastIndex = start;
  let depth = 0;
  for (let m = tag.exec(markup); m; m = tag.exec(markup)) {
    if (m[0] === "</svg>") depth--;
    else if (m[1] !== "/") depth++;
    else if (depth === 0) return markup.slice(start, tag.lastIndex);
    if (depth === 0) return markup.slice(start, tag.lastIndex);
  }
  return markup;
}
