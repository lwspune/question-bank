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
import type { NotesItemRef } from "./notesItem";

export const ASK_V_EVENT = "v:ask";

export type AskVDetail =
  | {
      questionId: string;
      /** The option the student picked on the card, if they answered it. */
      chose: string | null;
      notes?: undefined;
    }
  | { notes: NotesItemRef; chose: null; questionId?: undefined };

export function isAskVDetail(d: unknown): d is AskVDetail {
  if (!d || typeof d !== "object") return false;
  const { questionId, notes } = d as { questionId?: unknown; notes?: unknown };
  return typeof questionId === "string" || (!!notes && typeof notes === "object");
}

/** The `question` field of a /api/chat/typed request for this tap. */
export function questionForRequest(d: AskVDetail): { id: string; chose: string | null } | { notes: NotesItemRef } {
  return d.notes ? { notes: d.notes } : { id: d.questionId, chose: d.chose };
}

/** What the window sends for an Ask V tap. */
export function askVMessage(chose: string | null): string {
  return chose ? `I picked (${chose}). Explain this question.` : "Explain this question.";
}

export function askVAbout(detail: AskVDetail): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<AskVDetail>(ASK_V_EVENT, { detail }));
}
