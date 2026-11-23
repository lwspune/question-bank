/**
 * V's chapter lesson as DATA (2026-11-21, the owner's mockup B "V starts from
 * your mistakes"). The first build of chapter_overview sent V text alone, so V
 * wrote the chapter map as a plain numbered list, linked the notes as a raw
 * path, and ended "Shall we move on to part 2?" with nothing to tap. Now the
 * tool hands the window this object, and the window draws the map card (each
 * part with the student's mistakes in it), a question to try and the lesson's
 * buttons: Go on, Explain more simply, Open the notes.
 *
 * Two kinds (2026-11-22, owner: "give Learn priority wherever it's available"):
 *  - "notes": the parts are the notes chapter's parts (or, with no notes, the
 *    chapter's topics); the question to try is a past-paper question.
 *  - "learn": the parts are Learn's lessons with the student's Learn progress,
 *    each opening its lesson; the question to try is a Learn check question
 *    (lib/chat/learnLesson.ts). The buttons say "lesson".
 *
 * ORDER: Go on walks `order`, which starts at the part taught. For notes it is
 * the parts holding mistakes first, most first (a tie to the earlier part),
 * then the rest in book order; for Learn, on from the start, skipping lessons
 * done. Either way it never loops back to a part already taught and needs no
 * memory of which parts were.
 *
 * Pure and client-safe. Spec: tests/chat-lesson.test.ts.
 */

/** A Learn lesson's state for this student: done, right answers so far, or not started. */
export type LessonProgress = "done" | "new" | { right: number; of: number };

export type LessonPart = {
  /** 1-based, in teaching order. */
  n: number;
  title: string;
  /** The part's page (notes part or Learn lesson); null with neither. */
  href: string | null;
  /** The student's waiting mistakes in this part (the Fix list's). */
  missed: number;
  /** A Learn lesson's progress; null or absent off Learn, or signed out. */
  progress?: LessonProgress | null;
};

/** A Learn lesson's check question, picked when the card loads (/api/learn/item). */
export type LearnTry = { chapter: string; concept: string };

export type VLesson = {
  kind: "notes" | "learn";
  exam: string;
  chapter: string;
  /** The chapter's notes; for a Learn lesson, the exam's notes beside it (CET, JEE), or null. */
  notesHref: string | null;
  questionsHref: string;
  parts: LessonPart[];
  /** The part this reply teaches. */
  current: number;
  /** Go on's order (see ORDER above). */
  order: number[];
  /** Go on's part; null when the lesson has gone through every part. */
  next: number | null;
  /** The map card shows on a chapter's first reply, not on each part after it. */
  showMap: boolean;
  /** All waiting mistakes in the chapter, including any in a topic no part covers. */
  missed: number;
  /** A past-paper question to try under the reply; null when there is none (or signed out). */
  tryQuestionId: string | null;
  /** The question to try is the student's own waiting mistake (2026-11-23): the card says so. */
  tryOwn: boolean;
  /** A Learn lesson's check question to try instead; null off Learn. */
  tryLearn: LearnTry | null;
};

export function lessonOrder(parts: readonly LessonPart[]): number[] {
  const withMisses = parts.filter((p) => p.missed > 0).sort((a, b) => b.missed - a.missed || a.n - b.n);
  const rest = parts.filter((p) => p.missed <= 0);
  return [...withMisses, ...rest].map((p) => p.n);
}

/** The part after `current` in an order; null at its end or when it is not in it. */
export function nextInOrder(order: readonly number[], current: number): number | null {
  const at = order.indexOf(current);
  return at < 0 ? null : (order[at + 1] ?? null);
}

export function nextPart(parts: readonly LessonPart[], current: number): number | null {
  return nextInOrder(lessonOrder(parts), current);
}

const partOf = (l: VLesson, n: number | null) => (n === null ? undefined : l.parts.find((p) => p.n === n));
const word = (l: VLesson) => (l.kind === "learn" ? "lesson" : "part");

/** The Go on button's message: a part by number, so V calls chapter_overview with it. */
export function goOnMessage(l: VLesson): string | null {
  const p = partOf(l, l.next);
  return p ? `Teach me ${word(l)} ${p.n} of ${l.chapter} for ${l.exam}: ${p.title}.` : null;
}

/**
 * The Go on button's label: it names the part, because the order can skip one
 * (part 1, then part 3 where the next mistakes are) and "Go on" alone reads as
 * "part 2" (owner, reviewing the sheet, 2026-11-21).
 */
export function goOnLabel(l: VLesson): { text: string; aria: string } | null {
  const p = partOf(l, l.next);
  return p ? { text: `Go on: ${word(l)} ${p.n}`, aria: `Go on to ${word(l)} ${p.n}, ${p.title}` } : null;
}

export function simplerMessage(l: VLesson): string {
  const p = partOf(l, l.current);
  return p ? `Explain ${word(l)} ${p.n} of ${l.chapter}, ${p.title}, more simply.` : `Explain ${l.chapter} more simply.`;
}

/** The lesson's main link: the Learn lesson being taught, or the current notes part (else the chapter's notes). */
export function lessonOpenLink(l: VLesson): { href: string; label: string } | null {
  if (l.kind === "learn") {
    const href = partOf(l, l.current)?.href ?? null;
    return href ? { href, label: "Open the lesson" } : null;
  }
  const href = partOf(l, l.current)?.href ?? l.notesHref;
  return href ? { href, label: "Open the notes" } : null;
}

/** A Learn lesson's second link: the exam's own notes, where there are some. */
export function lessonNotesLink(l: VLesson): { href: string; label: string } | null {
  return l.kind === "learn" && l.notesHref ? { href: l.notesHref, label: "Open the notes" } : null;
}

/** Names for the lesson's pages, so a link in V's reply shows a name, never its path. */
export function lessonLinkLabels(l: VLesson): Record<string, string> {
  const out: Record<string, string> = {};
  if (l.notesHref) out[l.notesHref] = `${l.chapter} notes`;
  out[l.questionsHref] = `${l.chapter} questions`;
  for (const p of l.parts) if (p.href) out[p.href] = p.title;
  return out;
}

const DIFFICULTY_RANK: Record<string, number> = { EASY: 0, MODERATE: 1 };
/** Unlabelled after easy and moderate, before hard: a check after teaching starts easy. */
const rankOf = (d: string | null) => (d === null ? 2 : (DIFFICULTY_RANK[d] ?? (d === "HARD" ? 3 : 2)));

/**
 * The lesson's question to try: one of the part's questions, the easiest
 * first, at random within that group (2026-11-21: a random pick gave a hard
 * coin-toss sequence question straight after a basic dice lesson).
 */
export function pickLessonTry(
  candidates: readonly { id: string; difficulty: string | null }[],
  exclude: ReadonlySet<string>,
  random: () => number = Math.random
): string | null {
  const left = candidates.filter((c) => !exclude.has(c.id));
  if (left.length === 0) return null;
  const best = Math.min(...left.map((c) => rankOf(c.difficulty)));
  const group = left.filter((c) => rankOf(c.difficulty) === best);
  return group[Math.min(group.length - 1, Math.floor(random() * group.length))].id;
}

/** The lesson under a follow-up reply (Explain more simply, or a Go on V answered without the tool). */
export function carriedLesson(l: VLesson, current: number = l.current): VLesson {
  return { ...l, current, next: nextInOrder(l.order, current), showMap: false, tryQuestionId: null, tryOwn: false, tryLearn: null };
}

/** A site path, or a Learn lesson's with its `?course=`. */
const SITE_PATH = /^\/[a-z0-9][a-z0-9\-/]*(\?course=[a-z0-9-]+)?$/i;
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_PARTS = 60;
const MAX_TEXT = 200;
const MAX_NEEDED = 10;

const sitePath = (v: unknown): string | null => (typeof v === "string" && SITE_PATH.test(v) ? v : null);
const text = (v: unknown): string | null => (typeof v === "string" && v.trim() && v.length <= MAX_TEXT ? v : null);
const count = (v: unknown): number | null => (typeof v === "number" && Number.isInteger(v) && v >= 0 ? v : null);

function parseProgress(v: unknown): LessonProgress | null {
  if (v === "done" || v === "new") return v;
  const o = (v ?? null) as { right?: unknown; of?: unknown } | null;
  if (!o || typeof o !== "object") return null;
  const right = count(o.right);
  const of = count(o.of);
  return right !== null && of !== null && of >= 1 && of <= MAX_NEEDED && right <= of ? { right, of } : null;
}

function parseTryLearn(v: unknown): LearnTry | null {
  const o = (v ?? null) as { chapter?: unknown; concept?: unknown } | null;
  if (!o || typeof o !== "object") return null;
  return typeof o.chapter === "string" && SLUG.test(o.chapter) && typeof o.concept === "string" && SLUG.test(o.concept)
    ? { chapter: o.chapter, concept: o.concept }
    : null;
}

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
    parts.push({ n, title, href: sitePath(p.href), missed: partMissed, ...(p.progress !== undefined ? { progress: parseProgress(p.progress) } : {}) });
  }
  if (!parts.some((p) => p.n === current)) return null;
  const next = o.next === null ? null : count(o.next);
  if (next !== null && !parts.some((p) => p.n === next)) return null;
  const tryQuestionId = typeof o.tryQuestionId === "string" && UUID_RE.test(o.tryQuestionId) ? o.tryQuestionId : null;
  const kind = o.kind === "learn" ? "learn" : "notes";
  // An order of the lesson's own parts; a lesson saved before orders existed walks its mistakes.
  const own = Array.isArray(o.order) ? [...new Set((o.order as unknown[]).map(count).filter((n): n is number => n !== null && parts.some((p) => p.n === n)))] : [];
  const order = own.length > 0 ? own : lessonOrder(parts);
  return {
    kind,
    exam,
    chapter,
    notesHref: sitePath(o.notesHref),
    questionsHref,
    parts,
    current,
    order,
    next,
    showMap: o.showMap,
    missed,
    tryQuestionId,
    tryOwn: tryQuestionId !== null && o.tryOwn === true,
    tryLearn: kind === "learn" ? parseTryLearn(o.tryLearn) : null,
  };
}
