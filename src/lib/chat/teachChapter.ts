/**
 * The typed request behind every "Teach me" button (2026-11-21, owner-approved
 * mockup): /me's "Your weak spots", the mock result's "Where your next marks
 * are" and V's own "Teach me a chapter". Each opens V with this message, which V
 * answers with chapter_overview, starting from the student's waiting mistakes.
 *
 * WHY A TYPED MESSAGE, not a card of its own: the student sees what was asked
 * for in their own words, can follow it up, and V's answer is the one a typed
 * "teach me vectors" gets, so there is one path to keep right, not two.
 *
 * Pure. Spec: tests/teach-chapter-message.test.ts.
 */

/** Where a "Teach me" button sits, for its seen/tapped events (surface teach_chapter). */
/** lesson_* (2026-11-21): the lesson's own buttons under V's reply (Go on, Explain more simply, Open the notes). */
export const TEACH_CHAPTER_FROM = ["me_weak", "mock_result", "v_button", "v_pick", "lesson_go_on", "lesson_simpler", "lesson_notes", "lesson_learn", "learn_try_answer", "learn_try_skip"] as const;
export type TeachChapterFrom = (typeof TEACH_CHAPTER_FROM)[number];

/** V's own button with no chapter to offer (signed out, or nothing waiting): V asks which. */
export const TEACH_ANY_CHAPTER = "Teach me a chapter.";

/** V's window refuses a typed request longer than this (lib/chat/askVEvent ASK_V_TEXT_MAX). */
const MAX = 300;
const MAX_NAME = 80;

const clip = (s: string, n: number) => {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t;
};

/** "Mathematics · MHT-CET" (lib/drill placeOf) to "MHT-CET"; null when the place names no exam. */
export function examOfPlace(place: string | null | undefined): string | null {
  if (!place) return null;
  const at = place.indexOf(" · ");
  if (at < 0) return null;
  const exam = place.slice(at + 3).trim();
  return exam || null;
}

export function teachChapterMessage(opts: {
  chapter: string;
  /** The exam by name; wins over `place`. */
  exam?: string | null;
  /** The drill's "Subject · Exam" place, when the exam is not given outright. */
  place?: string | null;
  /** A topic to begin with: the mock result's topic where marks were lost. */
  startWith?: string | null;
}): string {
  const chapter = clip(opts.chapter, MAX_NAME);
  const exam = opts.exam?.trim() || examOfPlace(opts.place);
  const head = `Teach me ${chapter}${exam ? ` for ${clip(exam, MAX_NAME)}` : ""}`;
  const msg = opts.startWith?.trim()
    ? `${head}, starting with ${clip(opts.startWith, MAX_NAME)}, where I lost marks.`
    : `${head}. Start from what I got wrong.`;
  return msg.length > MAX ? `${msg.slice(0, MAX - 1)}…` : msg;
}
