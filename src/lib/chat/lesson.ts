/**
 * V's chapter lesson as DATA (2026-11-21, the owner's mockup B "V starts from
 * your mistakes"). The first build of chapter_overview sent V text alone, so V
 * wrote the chapter map as a plain numbered list, linked the notes as a raw
 * path, and ended "Shall we move on to part 2?" with nothing to tap. Now the
 * tool hands the window this object, and the window draws the map card (each
 * part with the student's mistakes in it), a question to try and the lesson's
 * buttons: Go on, Explain more simply, Open the notes.
 *
 * ORDER: parts holding mistakes first, most first (a tie to the earlier part),
 * then the rest in book order. The start is the first of that order and Go on
 * walks it, so it never loops back to a part already taught and needs no
 * memory of which parts were.
 *
 * Pure and client-safe. Spec: tests/chat-lesson.test.ts.
 */

export type LessonPart = {
  /** 1-based, in the notes' teaching order (or the chapter's topic order with no notes). */
  n: number;
  title: string;
  /** The part's notes page; null with no notes. */
  href: string | null;
  /** The student's waiting mistakes in this part (the Fix list's). */
  missed: number;
};

export type VLesson = {
  exam: string;
  chapter: string;
  notesHref: string | null;
  questionsHref: string;
  parts: LessonPart[];
  /** The part this reply teaches. */
  current: number;
  /** Go on's part; null when the lesson has gone through every part. */
  next: number | null;
  /** The map card shows on a chapter's first reply, not on each part after it. */
  showMap: boolean;
  /** All waiting mistakes in the chapter, including any in a topic no part covers. */
  missed: number;
  /** A question to try under the reply; null when there is none (or signed out). */
  tryQuestionId: string | null;
};

export function lessonOrder(parts: readonly LessonPart[]): number[] {
  const withMisses = parts.filter((p) => p.missed > 0).sort((a, b) => b.missed - a.missed || a.n - b.n);
  const rest = parts.filter((p) => p.missed <= 0);
  return [...withMisses, ...rest].map((p) => p.n);
}

export function nextPart(parts: readonly LessonPart[], current: number): number | null {
  const order = lessonOrder(parts);
  const at = order.indexOf(current);
  return at < 0 ? null : (order[at + 1] ?? null);
}

const partOf = (l: VLesson, n: number | null) => (n === null ? undefined : l.parts.find((p) => p.n === n));

/** The Go on button's message: a part by number, so V calls chapter_overview with it. */
export function goOnMessage(l: VLesson): string | null {
  const p = partOf(l, l.next);
  return p ? `Teach me part ${p.n} of ${l.chapter} for ${l.exam}: ${p.title}.` : null;
}

export function simplerMessage(l: VLesson): string {
  const p = partOf(l, l.current);
  return p ? `Explain part ${p.n} of ${l.chapter}, ${p.title}, more simply.` : `Explain ${l.chapter} more simply.`;
}

/** The current part's notes page, else the chapter's; null with no notes. */
export function lessonNotesHref(l: VLesson): string | null {
  return partOf(l, l.current)?.href ?? l.notesHref;
}

/** Names for the lesson's pages, so a link in V's reply shows a name, never its path. */
export function lessonLinkLabels(l: VLesson): Record<string, string> {
  const out: Record<string, string> = {};
  if (l.notesHref) out[l.notesHref] = `${l.chapter} notes`;
  out[l.questionsHref] = `${l.chapter} questions`;
  for (const p of l.parts) if (p.href) out[p.href] = p.title;
  return out;
}

/** The lesson under a follow-up reply (Explain more simply, or a Go on V answered without the tool). */
export function carriedLesson(l: VLesson, current: number = l.current): VLesson {
  return { ...l, current, next: nextPart(l.parts, current), showMap: false, tryQuestionId: null };
}

const SITE_PATH = /^\/[a-z0-9][a-z0-9\-/]*$/i;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_PARTS = 60;
const MAX_TEXT = 200;

const sitePath = (v: unknown): string | null => (typeof v === "string" && SITE_PATH.test(v) ? v : null);
const text = (v: unknown): string | null => (typeof v === "string" && v.trim() && v.length <= MAX_TEXT ? v : null);
const count = (v: unknown): number | null => (typeof v === "number" && Number.isInteger(v) && v >= 0 ? v : null);

/** A lesson from the route's response or the device's copy; null when it is not one. */
export function parseLesson(raw: unknown): VLesson | null {
  const o = (raw ?? null) as Partial<Record<keyof VLesson, unknown>> | null;
  if (!o || typeof o !== "object" || !Array.isArray(o.parts)) return null;
  const exam = text(o.exam);
  const chapter = text(o.chapter);
  const questionsHref = sitePath(o.questionsHref);
  const current = count(o.current);
  const missed = count(o.missed);
  if (!exam || !chapter || !questionsHref || current === null || missed === null || typeof o.showMap !== "boolean") return null;
  if (o.parts.length === 0 || o.parts.length > MAX_PARTS) return null;
  const parts: LessonPart[] = [];
  for (const raw of o.parts as unknown[]) {
    const p = (raw ?? {}) as Partial<Record<keyof LessonPart, unknown>>;
    const n = count(p.n);
    const title = text(p.title);
    const partMissed = count(p.missed);
    if (n === null || !title || partMissed === null) return null;
    parts.push({ n, title, href: sitePath(p.href), missed: partMissed });
  }
  if (!parts.some((p) => p.n === current)) return null;
  const next = o.next === null ? null : count(o.next);
  if (next !== null && !parts.some((p) => p.n === next)) return null;
  const tryQuestionId = typeof o.tryQuestionId === "string" && UUID_RE.test(o.tryQuestionId) ? o.tryQuestionId : null;
  return { exam, chapter, notesHref: sitePath(o.notesHref), questionsHref, parts, current, next, showMap: o.showMap, missed, tryQuestionId };
}
