/**
 * A student's progress through a plan's Top 10 PYQs (2026-11-24, owner): the
 * box on the plan's front page with the next chapter to work on.
 *
 * A chapter's ten are the ones its Top 10 page shows: its first ten slots in
 * plan order, a slot belonging to the chapter of its FIRST part
 * (lib/homework/topPyqs.ts topSlotKeys, lib/homework/query.ts loadChapterTop).
 * Chapters are the front page's own list (planChapters: book order, one per
 * address slug).
 *
 * Done and started use the homework day rules (lib/homework/progress.ts): a
 * written question is marked by Understood / Review later, an MCQ by any
 * reveal or pick, made anywhere on the site. A chapter is done when every one
 * of its slots is.
 *
 * Next chapter: the started-but-unfinished chapter touched last, else the
 * first chapter not done. (Not the half-done one in book order: a mark made
 * anywhere counts, so one /browse answer could otherwise pull the box away
 * from the chapter the student is working through.)
 *
 * Pure: no DB, no clock. Spec: tests/homework-top-progress.test.ts.
 */
import { planChapters } from "./chapters";
import { marksFor, summarizeDay, type ProgressEvent, type QuestionFormat } from "./progress";
import { TOP_PYQS } from "./topPyqs";

export type TopItem = {
  day: number;
  position: number;
  sub: number;
  questionId: string;
  format: QuestionFormat;
  /** The chapter the question is filed under; only a slot's first part decides. */
  chapter: { id: string; name: string; orderIndex: number | null } | null;
};

export type ChapterTopProgress = {
  slug: string;
  name: string;
  total: number;
  done: number;
  toReview: number;
  complete: boolean;
  /** Any part of its ten marked. */
  started: boolean;
};

export type TopNext = { slug: string; name: string; total: number; done: number; started: boolean };

export type TopProgress = {
  chapters: ChapterTopProgress[];
  totalChapters: number;
  doneChapters: number;
  /** Questions of the ten-per-chapter waiting in Fix your mistakes. */
  toReview: number;
  /** Null when every chapter is done. */
  next: TopNext | null;
  started: boolean;
};

type Part = { id: string; format: QuestionFormat };

export function topProgress(items: readonly TopItem[], events: readonly ProgressEvent[]): TopProgress {
  // Slots in plan order, each with its parts and the chapter of its first part.
  const slots = new Map<string, { day: number; position: number; chapterId: string | null; parts: (Part & { sub: number })[] }>();
  for (const it of items) {
    const key = `${it.day}:${it.position}`;
    const s = slots.get(key) ?? { day: it.day, position: it.position, chapterId: null, parts: [] };
    if (it.sub === 1) s.chapterId = it.chapter?.id ?? null;
    s.parts.push({ id: it.questionId, format: it.format, sub: it.sub });
    slots.set(key, s);
  }
  const ordered = [...slots.values()].sort((a, b) => a.day - b.day || a.position - b.position);

  const chapterList = planChapters(
    [...items]
      .sort((a, b) => a.day - b.day || a.position - b.position)
      .filter((it) => it.sub === 1 && it.chapter)
      .map((it) => it.chapter!)
  );

  const topOf = new Map<string, Part[][]>();
  for (const c of chapterList) topOf.set(c.id, []);
  for (const s of ordered) {
    const list = s.chapterId ? topOf.get(s.chapterId) : undefined;
    if (!list || list.length >= TOP_PYQS) continue;
    list.push([...s.parts].sort((a, b) => a.sub - b.sub).map(({ id, format }) => ({ id, format })));
  }

  const topItems = [...topOf.values()].flat(2);
  const { marks, due } = marksFor(
    topItems.map((p) => ({ day: 0, position: 0, questionId: p.id, format: p.format })),
    events
  );

  // When each question was last acted on (a No to V marks nothing).
  const lastAt = new Map<string, string>();
  for (const e of events) {
    if (e.kind === "v_not_understood") continue;
    const prev = lastAt.get(e.questionId);
    if (!prev || e.at > prev) lastAt.set(e.questionId, e.at);
  }

  const touched: { slug: string; at: string }[] = [];
  const chapters: ChapterTopProgress[] = chapterList.map((c) => {
    const top = topOf.get(c.id) ?? [];
    const sum = summarizeDay(top, marks, due);
    const markedParts = top.flat().filter((p) => marks[p.id]);
    const started = markedParts.length > 0;
    if (started && !sum.complete) {
      const at = markedParts.reduce((m, p) => {
        const t = lastAt.get(p.id) ?? "";
        return t > m ? t : m;
      }, "");
      touched.push({ slug: c.slug, at });
    }
    return { slug: c.slug, name: c.name, total: sum.total, done: sum.done, toReview: sum.toReview, complete: sum.complete, started };
  });

  const latest = touched.sort((a, b) => (a.at < b.at ? 1 : a.at > b.at ? -1 : 0))[0];
  const nextChapter = latest
    ? chapters.find((c) => c.slug === latest.slug)
    : chapters.find((c) => !c.complete);

  return {
    chapters,
    totalChapters: chapters.length,
    doneChapters: chapters.filter((c) => c.complete).length,
    toReview: chapters.reduce((n, c) => n + c.toReview, 0),
    next: nextChapter
      ? { slug: nextChapter.slug, name: nextChapter.name, total: nextChapter.total, done: nextChapter.done, started: nextChapter.started }
      : null,
    started: chapters.some((c) => c.started),
  };
}

// ── the box's words ──────────────────────────────────────────────────────────

/** "Next up: Probability", or "3 of 24 chapters done. Next up: Probability". Never opens with a zero. */
export function topProgressHeadline(p: TopProgress): string {
  if (!p.next) {
    return p.totalChapters === 1
      ? "You have done the Top 10 of this chapter."
      : `You have done the Top 10 of all ${p.totalChapters} chapters.`;
  }
  const next = `Next up: ${p.next.name}`;
  return p.doneChapters > 0 ? `${p.doneChapters} of ${p.totalChapters} chapters done. ${next}` : next;
}

/** The line under the headline, or null. */
export function topProgressDetail(p: TopProgress): string | null {
  if (!p.next) return "Next: the daily homework, five questions a day, the most asked first.";
  return p.next.done > 0 ? `You have marked ${p.next.done} of its ${p.next.total} questions.` : null;
}

/** The button's label. */
export function topProgressAction(p: TopProgress): string {
  if (!p.next) return "Go to Daily homework";
  return `${p.next.started ? "Continue" : "Start"}: ${p.next.name}`;
}
