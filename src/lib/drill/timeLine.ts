/**
 * How long a drill of `total` waiting mistakes takes, as V, Home and the push
 * nudge say it. One drill serves DRILL_SIZE at most, about a minute each.
 *
 * Its own module (2026-11-21) so browser code can use it: it lived in
 * lib/push/core, which imports lib/email/click and its `node:crypto`, and V's
 * window pulled that into the browser through lib/chat/checkIn.
 * Spec: tests/chat-client-no-node-imports.test.ts.
 */
import { DRILL_SIZE } from "./select";

export function drillTimeLine(total: number): string {
  const minutes = Math.min(total, DRILL_SIZE);
  return minutes <= 1 ? "About a minute." : `About ${minutes} minutes.`;
}
