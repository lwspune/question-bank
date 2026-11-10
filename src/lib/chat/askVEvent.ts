/**
 * "Ask V about this question" (2026-10-19): a question card tells V's window,
 * which lives in the root layout, to open with that question attached. A
 * window event rather than shared state: the cards and the window are in
 * different trees, and the window must not load until it is used.
 *
 * Since 2026-10-20 the question may be a practice question written into the
 * notes (lib/chat/notesItem.ts): no bank id, so it travels as the concept and
 * its position, and the server reads it from the notes page it is on.
 */
import { notesPageOf, parseNotesItemRef, type NotesItemRef } from "./notesItem";

export const ASK_V_EVENT = "v:ask";

export type AskVDetail =
  | {
      questionId: string;
      /** The option the student picked on the card, if they answered it. */
      chose: string | null;
      /** The number they entered on a numeric question (a mock review). 0 is an answer. */
      entered?: number | null;
      /** They skipped it in a test (a mock review): V must not ask what they picked. */
      skipped?: boolean;
      /** A follow-up card's "Show me where I went wrong": the question V explained before (V_LEARNING_LOOP.md step 2). */
      after?: string;
      notes?: undefined;
    }
  | { notes: NotesItemRef; chose: null; questionId?: undefined };

export function isAskVDetail(d: unknown): d is AskVDetail {
  if (!d || typeof d !== "object") return false;
  const { questionId, notes } = d as { questionId?: unknown; notes?: unknown };
  return typeof questionId === "string" || (!!notes && typeof notes === "object");
}

/** The `question` field of a /api/chat/typed request for this tap. */
export function questionForRequest(
  d: AskVDetail
): { id: string; chose: string | null; entered?: number; skipped?: true; after?: string } | { notes: NotesItemRef } {
  if (d.notes) return { notes: d.notes };
  return {
    id: d.questionId,
    chose: d.chose,
    ...(typeof d.entered === "number" ? { entered: d.entered } : {}),
    ...(d.skipped ? { skipped: true as const } : {}),
    ...(d.after ? { after: d.after } : {}),
  };
}

/**
 * What the window sends for an Ask V tap. A pick wins over a skip; the
 * message is the student's own line in the chat, so it says what they did.
 */
export function askVMessage(chose: string | null, how: { entered?: number | null; skipped?: boolean } = {}): string {
  if (chose) return `I picked (${chose}). Explain this question.`;
  if (typeof how.entered === "number") return `I entered ${how.entered}. Explain this question.`;
  if (how.skipped) return "I skipped this one. Explain this question.";
  return "Explain this question.";
}

const ASK_V_MESSAGE_RE =
  /^(?:I picked \(([A-E])\)\. |I entered (-?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\. |(I skipped this one)\. )?Explain this question\.$/;

/** A message the window sent for an Ask V tap (askVMessage), not one the student typed. */
export function isAskVMessage(text: string): boolean {
  return ASK_V_MESSAGE_RE.test(text);
}

/** The option an Ask V message says the student picked. */
export function chosenIn(text: string): string | null {
  return ASK_V_MESSAGE_RE.exec(text)?.[1] ?? null;
}

/** The number an Ask V message says the student entered, and whether it says they skipped. */
export function answerIn(text: string): { entered: number | null; skipped: boolean } {
  const m = ASK_V_MESSAGE_RE.exec(text);
  return { entered: m?.[2] !== undefined ? Number(m[2]) : null, skipped: m?.[3] !== undefined };
}

/**
 * The question card above an Ask V message (owner, 2026-10-23): which question
 * it was about. A bank question by id; a notes practice question by its
 * position on the notes page it was tapped on. The card reads the question,
 * WITHOUT its answer, from /api/chat/question (cardQuery).
 */
export type AskedCard = { questionId: string; chose: string | null } | { notes: NotesItemRef; page: string };

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const PICK_RE = /^[A-E]$/;

export function askedCardOf(d: AskVDetail, page: string | null): AskedCard | null {
  if (d.notes) return page && notesPageOf(page) ? { notes: d.notes, page } : null;
  return { questionId: d.questionId, chose: d.chose };
}

/** A card kept on the device (localStorage) is checked before it is used. */
export function parseAskedCard(raw: unknown): AskedCard | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as { questionId?: unknown; chose?: unknown; notes?: unknown; page?: unknown };
  if (typeof o.questionId === "string") {
    if (!UUID_RE.test(o.questionId)) return null;
    if (o.chose !== null && !(typeof o.chose === "string" && PICK_RE.test(o.chose))) return null;
    return { questionId: o.questionId, chose: o.chose };
  }
  const notes = parseNotesItemRef(o.notes);
  if (!notes || typeof o.page !== "string" || !notesPageOf(o.page)) return null;
  return { notes, page: o.page };
}

function sameCard(a: AskedCard, b: AskedCard): boolean {
  if ("questionId" in a) return "questionId" in b && a.questionId === b.questionId;
  if ("questionId" in b) return false;
  const ia = a.notes.item === "practice" ? a.notes.index : -1;
  const ib = b.notes.item === "practice" ? b.notes.index : -1;
  return a.page === b.page && a.notes.concept === b.notes.concept && a.notes.item === b.notes.item && ia === ib;
}

/**
 * The index of the latest tap in `turns` that sent the same message about the
 * same question and got an explanation back, or -1 (2026-11-07). A repeat tap
 * then reopens that explanation instead of asking again: 104 of 440 taps were
 * the same student re-tapping the same question within a minute. A different
 * message (a pick, a number entered) is a new ask, since V's answer turns on it.
 */
export function explainedTap(
  turns: readonly ({ role: "user"; text: string; asked?: unknown } | { role: "assistant"; text?: string; explained?: boolean })[],
  card: AskedCard | null,
  text: string
): number {
  if (!card) return -1;
  for (let i = turns.length - 2; i >= 0; i--) {
    const t = turns[i];
    const next = turns[i + 1];
    if (t.role !== "user" || t.text !== text || next.role !== "assistant" || next.explained !== true) continue;
    const asked = parseAskedCard(t.asked);
    if (asked && sameCard(asked, card)) return i;
  }
  return -1;
}

/** The query string /api/chat/question reads the card's question from. */
export function cardQuery(c: AskedCard): string {
  if ("questionId" in c) return `id=${c.questionId}`;
  const index = c.notes.item === "practice" ? `&index=${c.notes.index}` : "";
  return `page=${encodeURIComponent(c.page)}&concept=${c.notes.concept}&item=${c.notes.item}${index}`;
}

/**
 * What a mock review card tells V about the student's answer: the pick, the
 * number entered, or that they skipped it. Null is tested explicitly, since a
 * numeric answer of 0 is an answer.
 */
export function askedFromReview(item: {
  format: "mcq" | "numeric" | "msq";
  selectedLabel: string | null;
  numericResponse: number | null;
  selectedLabels?: readonly string[];
}): { chose: string | null; entered: number | null; skipped: boolean } {
  // A tick set has no one letter to name; V's message carries one (askVMessage).
  if (item.format === "msq") {
    return { chose: null, entered: null, skipped: (item.selectedLabels ?? []).length === 0 };
  }
  if (item.format === "numeric") {
    return { chose: null, entered: item.numericResponse, skipped: item.numericResponse === null };
  }
  return { chose: item.selectedLabel, entered: null, skipped: item.selectedLabel === null };
}

export function askVAbout(detail: AskVDetail): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<AskVDetail>(ASK_V_EVENT, { detail }));
}
