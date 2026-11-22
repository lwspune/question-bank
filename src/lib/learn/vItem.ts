/**
 * V's "Your turn" card on a Learn lesson (2026-11-22) asks /api/learn/item for the
 * lesson's next check question. A signed-in student's answers are in the database;
 * a guest's live only in the card, so the card sends back what was answered here
 * ("id:1" right, "id:0" wrong, oldest first) and Learn's own picker (engine/nextItem)
 * chooses from those. Pure. Spec: tests/learn-v-item.test.ts.
 */
import type { AttemptLite } from "./engine/nextItem";

/** The most answers one card sends back: enough to step past every question of a lesson. */
export const SESSION_MAX = 12;

const PAIR = /^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}):([01])$/i;

export function parseSessionAttempts(raw: string | null): AttemptLite[] {
  if (!raw) return [];
  const out: AttemptLite[] = [];
  for (const part of raw.split(",")) {
    const m = PAIR.exec(part.trim());
    if (m) out.push({ itemId: m[1].toLowerCase(), correct: m[2] === "1" });
  }
  return out.slice(-SESSION_MAX);
}
