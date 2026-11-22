/**
 * V's chapter lesson from Learn's lessons (2026-11-22, owner: "give Learn priority
 * wherever it's available; Learn was designed for this"). Where Learn teaches the
 * chapter (lib/learn/vLinks.ts), the map is Learn's lessons with the student's own
 * Learn progress, each row opens that lesson, and the question to try is a Learn
 * check question (no daily limit, checked signed out, counted towards mastery).
 *
 * WHERE IT STARTS: our mistakes are filed by bank topic, which is usually broader
 * than a Learn lesson, so a mistake names a group of lessons, never one. The start
 * is the first lesson not yet done among the lessons of the topic holding most
 * mistakes (a tie to the earlier lesson); the count sits on that row alone, since
 * spreading it over every lesson of the topic would claim mistakes in each. With no
 * mistakes to go by, the first lesson not yet done.
 *
 * GO ON walks on from the start to the end, then wraps to the lessons before it,
 * skipping lessons already done, so it never sends the student back over ground.
 *
 * Pure. Spec: tests/chat-learn-lesson.test.ts.
 */
import type { ChapterMiss } from "./chapterOverview";
import type { LessonPart, LessonProgress } from "./lesson";
import type { Outline } from "@/lib/learn/lessonState";
import { lessonHref } from "@/lib/learn/links";
import { lessonTopics, type LearnChapterLink } from "@/lib/learn/vLinks";

export type LearnLessonRow = {
  /** Learn's own chapter slug (the lesson page's), which can differ from the course chapter's. */
  chapter: string;
  slug: string;
  title: string;
  /** Learn's one-line summary (its maths in $...$), for V to teach from. */
  oneLiner: string;
  /** The board topics its mistakes are filed under; [] off the boards. */
  topics: string[];
  /** The student's state; null untouched or signed out. */
  state: "learning" | "mastered" | null;
  /** Questions whose latest answer is right (learn_concept_state.streak). */
  right: number;
};

export type LearnChapter = {
  course: string;
  /** The course chapter's slug (the Learn chapter page's). */
  courseChapter: string;
  title: string;
  lessons: LearnLessonRow[];
  signedIn: boolean;
  /** Right answers that master a lesson (learn_mastery_needed). */
  needed: number;
};

/** A course chapter's published lessons in teaching order, with the student's progress (`chapter/slug` keys). */
export function learnRows(
  outline: Outline,
  link: LearnChapterLink,
  progress: ReadonlyMap<string, { state: "learning" | "mastered"; streak: number }>
): LearnLessonRow[] {
  const ch = outline.chapters.find((c) => c.slug === link.chapter);
  if (!ch) return [];
  const parts = link.parts ? ch.parts.filter((_, i) => link.parts!.includes(i + 1)) : ch.parts;
  return parts.flatMap((part) =>
    part.concepts.flatMap((code) => {
      const c = outline.pools[part.chapter]?.concepts.find((x) => x.code === code);
      if (!c || !c.published) return [];
      const own = progress.get(`${part.chapter}/${c.slug}`);
      return [
        {
          chapter: part.chapter,
          slug: c.slug,
          title: c.title,
          oneLiner: c.one_liner,
          topics: lessonTopics(link.course, link.chapter, c.slug),
          state: own?.state ?? null,
          right: own?.streak ?? 0,
        },
      ];
    })
  );
}

export type LearnPlan = {
  parts: LessonPart[];
  /** The lesson this reply teaches (1-based). */
  current: number;
  /** Go on's order, starting at `current`. */
  order: number[];
  asked: boolean;
  /** The mistake to work as V's example; null when there is none to use. */
  exampleMiss: ChapterMiss | null;
  /** The example sits in the current lesson's topic. */
  exampleInLesson: boolean;
};

const norm = (s: string) => s.replace(/\s+/g, " ").trim().toLowerCase();
const latest = (ms: readonly ChapterMiss[]) => (ms.length ? ms.reduce((a, b) => (b.lastWrongAt > a.lastWrongAt ? b : a)) : null);

function progressOf(r: LearnLessonRow, lc: LearnChapter): LessonProgress | null {
  if (!lc.signedIn) return null;
  if (r.state === "mastered") return "done";
  if (r.state === "learning") return { right: Math.min(r.right, lc.needed), of: lc.needed };
  return "new";
}

export function planLearn(lc: LearnChapter, misses: readonly ChapterMiss[] | null, askedPart: number | null): LearnPlan {
  const rows = lc.lessons;
  const done = (i: number) => rows[i].state === "mastered";
  const inLesson = (i: number) => (misses ?? []).filter((m) => rows[i].topics.some((t) => norm(t) === norm(m.subtopic)));
  const counts = rows.map((_, i) => inLesson(i).length);

  const asked = askedPart !== null && askedPart >= 1 && askedPart <= rows.length;
  let start: number;
  if (asked) {
    start = askedPart! - 1;
  } else {
    const most = Math.max(0, ...counts);
    // The lessons of the busiest topic: every lesson with that count shares its topics.
    const group = most > 0 ? rows.map((_, i) => i).filter((i) => counts[i] === most) : rows.map((_, i) => i);
    start = group.find((i) => !done(i)) ?? group[0] ?? 0;
  }

  const rotation = [...rows.keys()].slice(start).concat([...rows.keys()].slice(0, start));
  // Every lesson done: walk them all again (review); otherwise skip the done ones.
  const allDone = rows.every((_, i) => done(i));
  const order = (allDone ? rotation : rotation.filter((i) => i === start || !done(i))).map((i) => i + 1);

  const parts: LessonPart[] = rows.map((r, i) => ({
    n: i + 1,
    title: r.title,
    href: lessonHref(r.chapter, r.slug, { course: lc.course }),
    missed: i === start ? counts[i] : 0,
    progress: progressOf(r, lc),
  }));

  const own = latest(inLesson(start));
  return {
    parts,
    current: start + 1,
    order,
    asked,
    exampleMiss: own ?? (asked ? null : latest(misses ?? [])),
    exampleInLesson: own !== null,
  };
}
