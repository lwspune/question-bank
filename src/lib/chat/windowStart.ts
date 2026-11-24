/**
 * V's window loads when it is needed (PAGE_WEIGHT_SPEC.md item 2, 2026-11-24).
 *
 * The layout mounts V's small launcher; the window itself (ChatWidget) loads
 * on the first touch of the button, on an Ask V event, or at once when
 * something already waits for the visitor. A `VStart` is what the launcher
 * hands the window when it mounts: open it, answer an Ask V caught while it
 * loaded, or nothing (it loaded only to show what waits). `seq` tells two
 * starts apart, so the window acts on each once.
 */
import { ASK_V_EVENT, ASK_V_TEXT_EVENT, isAskVDetail, isAskVTextDetail, type AskVDetail } from "./askVEvent";

export type VStart =
  | { kind: "quiet"; seq: number }
  | { kind: "open"; seq: number }
  | { kind: "ask"; detail: AskVDetail; seq: number }
  | { kind: "askText"; message: string; seq: number };

/**
 * Must the window load with the page rather than on a tap? A signed-in
 * visitor's button can carry a badge the window's logic decides (the day
 * card, a gift, a late answer: their reads need the session), and an unread
 * reply or a test half built before sign-in must show without a tap.
 */
export function loadWindowAtOnce(s: { authCookie: boolean; storedUnread: number; pendingBuild: boolean }): boolean {
  return s.authCookie || s.storedUnread > 0 || s.pendingBuild;
}

/** An Ask V event caught before the window listens, as a start; null when the window would ignore it. */
export function startFromEvent(type: string, detail: unknown, seq: number): VStart | null {
  if (type === ASK_V_EVENT && isAskVDetail(detail)) return { kind: "ask", detail, seq };
  if (type === ASK_V_TEXT_EVENT && isAskVTextDetail(detail)) return { kind: "askText", message: detail.message, seq };
  return null;
}
