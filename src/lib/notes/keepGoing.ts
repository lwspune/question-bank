/**
 * Where a reader goes when a /notes page ends.
 *
 * Until 2026-09-28 a topic page ended with the practice sign-in box, a /browse
 * drill button and — on 58% of topics — a hand-written "Related notes" list.
 * There was no "next topic": the chapter menu sits behind a button at the TOP
 * of the page on a phone, so finishing a topic meant scrolling all the way
 * back. 279 of the 602 related links were hand-written next/previous links,
 * and 10 pointed at pages that do not exist.
 *
 * Everything here is derived from the registry — `subtopicOrder` for topics,
 * NOTES_CHAPTERS order within a subject for chapters, the exam registry's
 * `hasMocks` for the mock card — so every chapter gets it with no per-page
 * work. Pure; spec tests/notes-keep-going.test.ts.
 */
import { NOTES_CHAPTERS, type NotesChapterRegistration } from "@/lib/notes/chapters";
import { getExamByName } from "@/lib/exam/examContext";
import { inBookOrder } from "@/lib/notes/bookOrder";

export type NavLink = { href: string; label: string; kicker: string };

const chapterBase = (c: NotesChapterRegistration) => `/notes/${c.subjectRoute}/${c.chapterSlug}`;

/** Topics in teaching order, skipping any slug without a note. */
function topicOrder(c: NotesChapterRegistration): string[] {
  return c.chapter.subtopicOrder.filter((s) => c.notes[s]);
}

function topicLink(c: NotesChapterRegistration, slug: string, kicker: string): NavLink {
  return { href: `${chapterBase(c)}/${slug}`, label: c.notes[slug].title, kicker };
}

/**
 * Next and previous for a topic page. The last topic of a chapter points at
 * the next chapter of the same subject; the last topic of the subject's last
 * chapter points back at the subject's notes, so there is always a way on.
 */
export function topicNav(
  c: NotesChapterRegistration,
  slug: string,
  all: readonly NotesChapterRegistration[] = NOTES_CHAPTERS
): { next: NavLink | null; prev: NavLink | null } {
  const order = topicOrder(c);
  const i = order.indexOf(slug);
  const prev = i > 0 ? topicLink(c, order[i - 1], "Previous topic") : null;
  if (i >= 0 && i < order.length - 1) return { next: topicLink(c, order[i + 1], "Next topic"), prev };

  // Book order where the subject has one (bookOrder.ts), so "Next chapter"
  // matches the subject page.
  const subject = inBookOrder(all.filter((x) => x.subjectRoute === c.subjectRoute));
  const nextChapter = subject[subject.indexOf(c) + 1];
  const next = nextChapter
    ? { href: chapterBase(nextChapter), label: nextChapter.chapter.chapterName, kicker: "Next chapter" }
    : { href: `/notes/${c.subjectRoute}`, label: `All ${c.subjectDisplay} notes`, kicker: "Chapter done" };
  return { next, prev };
}

/** The chapter page's way in: its first topic. */
export function chapterStart(c: NotesChapterRegistration): NavLink {
  return topicLink(c, topicOrder(c)[0], "Start with topic 1");
}

/**
 * The "test yourself on a real paper" card — only for an exam with published
 * mocks. Deliberately quotes no free-mock number: public copy must quote the
 * live limit or nothing, and a cached page cannot know it.
 */
export function mockCta(examName: string): { href: string; examDisplay: string } | null {
  const exam = getExamByName(examName);
  if (!exam?.hasMocks) return null;
  return { href: `/mock/exam/${exam.slug}`, examDisplay: exam.displayName };
}

/** Related links minus those already shown as next/previous (anchors ignored). */
export function extraRelated<T extends { href: string }>(
  related: readonly T[] | undefined,
  nav: { next: NavLink | null; prev: NavLink | null }
): T[] {
  const shown = new Set([nav.next?.href, nav.prev?.href].filter(Boolean));
  return (related ?? []).filter((r) => !shown.has(r.href.split("#")[0]));
}

// The slide-up bar's rule lives in ./testBar — the bar is a CLIENT island, and
// importing it from here would ship the whole notes registry to the browser.
export { shouldShowTestBar, TEST_BAR_SCROLL, TEST_BAR_GAP_MS } from "@/lib/notes/testBar";
