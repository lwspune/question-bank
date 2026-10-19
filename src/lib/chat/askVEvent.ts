/**
 * "Ask V about this question" (2026-10-19): a question card tells V's window,
 * which lives in the root layout, to open with that question attached. A
 * window event rather than shared state: the cards and the window are in
 * different trees, and the window must not load until it is used.
 */
export const ASK_V_EVENT = "v:ask";

export type AskVDetail = {
  questionId: string;
  /** The option the student picked on the card, if they answered it. */
  chose: string | null;
};

export function askVAbout(detail: AskVDetail): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<AskVDetail>(ASK_V_EVENT, { detail }));
}
