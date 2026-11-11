/**
 * "Back to your question" (owner, 2026-11-11): the return half of a trip from a
 * bank question to its notes. "Teach me the idea" (the stuck offer) and the
 * card's notes chip open the notes in the same tab, and nothing there led back:
 * the browser's Back rebuilt the card unanswered, and the installed app on an
 * iPhone has no Back at all.
 *
 * On the tap the card saves a trip in sessionStorage (never the URL: the notes
 * pages are indexed, and a query on them would only add duplicates): the page
 * it was on, the answer it showed, and the notes chapter it opened. The notes
 * pages of that chapter show a pill back; on the bank page the card that was
 * left finds the trip, shows its answer again and is scrolled to. The browser's
 * own Back restores it the same way. The reverse trip is lib/browse/returnTo.
 *
 * Pure helpers only; the storage and DOM live in components/reveal/backToQuestionStore.
 */

export const BACK_TO_QUESTION_KEY = "qb:backToQuestion:v1";

/** A trip older than this is forgotten: a later visit to the page is a new visit. */
export const BACK_TO_QUESTION_MAX_AGE_MS = 2 * 60 * 60 * 1000;

export type BackSource = "offer" | "chip";

/** What the card showed when the student left it. */
export type CardAnswer = {
  /** The option picked (single-answer questions). */
  picked: string | null;
  /** Ticked options and whether they were checked (multiple-select). */
  ticks: string[];
  checked: boolean;
  showSolution: boolean;
};

export type BackTrip = {
  questionId: string;
  /** The bank page left: path and query, no anchor. */
  from: string;
  /** The notes chapter the link opened, "/notes/<subject>/<chapter>". */
  notesChapter: string;
  source: BackSource;
  answer: CardAnswer;
  /** From the stuck offer: its subtopic and the easier question to try on return. */
  subtopic: string | null;
  easierId: string | null;
  /** Set when the pill was tapped, so a return by the browser's Back is told apart. */
  viaPill: boolean;
  at: number;
};

export function questionAnchorId(questionId: string): string {
  return `q-${questionId}`;
}

export function backHref(trip: BackTrip): string {
  return `${trip.from}#${questionAnchorId(trip.questionId)}`;
}

const NOTES_CHAPTER_RE = /^\/notes\/[^/#?\s]+\/[^/#?\s]+/;

/** "/notes/<subject>/<chapter>" from a notes link, or null if it is not one. */
export function notesChapterOf(href: string): string | null {
  const m = NOTES_CHAPTER_RE.exec(href);
  return m ? m[0] : null;
}

/** A root-relative page on this site, with nothing that could send it elsewhere. */
function isSafeFrom(path: string): boolean {
  return (
    path.startsWith("/") &&
    !path.startsWith("//") &&
    !path.includes("://") &&
    !path.includes("\\") &&
    !path.includes("#")
  );
}

export function pillShowsOn(trip: BackTrip, pathname: string): boolean {
  return pathname === trip.notesChapter || pathname.startsWith(`${trip.notesChapter}/`);
}

export function returnsTo(
  trip: BackTrip,
  questionId: string,
  at: { pathname: string; search: string }
): boolean {
  return trip.questionId === questionId && trip.from === at.pathname + at.search;
}

const isStr = (v: unknown): v is string => typeof v === "string";
const isStrOrNull = (v: unknown): v is string | null => v === null || typeof v === "string";

function isAnswer(v: unknown): v is CardAnswer {
  if (typeof v !== "object" || v === null) return false;
  const a = v as Record<string, unknown>;
  return (
    isStrOrNull(a.picked) &&
    Array.isArray(a.ticks) &&
    a.ticks.every(isStr) &&
    typeof a.checked === "boolean" &&
    typeof a.showSolution === "boolean"
  );
}

/** The saved trip, or null when absent, malformed, unsafe or too old. */
export function parseBackTrip(raw: string | null, now: number): BackTrip | null {
  if (!raw) return null;
  let v: unknown;
  try {
    v = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof v !== "object" || v === null) return null;
  const t = v as Record<string, unknown>;
  if (
    !isStr(t.questionId) ||
    !isStr(t.from) ||
    !isSafeFrom(t.from) ||
    !isStr(t.notesChapter) ||
    notesChapterOf(t.notesChapter) !== t.notesChapter ||
    (t.source !== "offer" && t.source !== "chip") ||
    !isAnswer(t.answer) ||
    !isStrOrNull(t.subtopic) ||
    !isStrOrNull(t.easierId) ||
    typeof t.viaPill !== "boolean" ||
    typeof t.at !== "number"
  ) {
    return null;
  }
  if (now - t.at > BACK_TO_QUESTION_MAX_AGE_MS) return null;
  return {
    questionId: t.questionId,
    from: t.from,
    notesChapter: t.notesChapter,
    source: t.source,
    answer: t.answer,
    subtopic: t.subtopic,
    easierId: t.easierId,
    viaPill: t.viaPill,
    at: t.at,
  };
}
