/**
 * Exam circles for students who have not joined (owner, 2026-11-27). Most
 * students never noticed the circles bubble (4 of 341 active joined in the
 * first day and a half), and a student who had not joined saw no number on it
 * at all. So the morning question goes to the circle of every exam a student
 * has, the bubble counts 1 per such circle not joined that has today's
 * question, and opening the bubble clears that until the next morning. Pure.
 * Spec: tests/rooms-circle-alert.test.ts.
 */
import type { RoomList } from "./list";

/** Circles not joined (chosen or guessed exam) whose question is up today. */
export function waitingCount(list: Pick<RoomList, "others" | "guessed">): number {
  return [...list.others, ...list.guessed].filter((r) => r.today).length;
}

/**
 * The bubble's number: unread in joined circles, plus the waiting circles
 * until the bubble is opened on that IST day (`seenDay`, YYYY-MM-DD).
 */
export function bubbleCount(input: { unread: number; waiting: number; seenDay: string | null; today: string }): number {
  return input.unread + (input.seenDay === input.today ? 0 : input.waiting);
}

/**
 * Who may join a circle: a chosen exam's, or, while nothing is chosen, the
 * guessed exam's. Joining the guessed one makes it a chosen exam (`promote`).
 */
export function joinDecision(input: {
  targets: readonly string[];
  guess: string | null;
  slug: string;
}): { ok: true; promote: boolean } | { ok: false } {
  if (input.targets.includes(input.slug)) return { ok: true, promote: false };
  if (input.targets.length === 0 && input.guess === input.slug) return { ok: true, promote: true };
  return { ok: false };
}

/**
 * The circles the morning run posts to: every exam students have
 * (exam_room_audience, 0292) and every open circle, minus closed circles and
 * slugs the registry no longer knows. Sorted, once each.
 */
export function dailyRooms(input: {
  audience: readonly string[];
  openRooms: readonly string[];
  closed: readonly string[];
  nameOf: (slug: string) => string | null;
}): string[] {
  const closed = new Set(input.closed);
  const all = new Set([...input.audience, ...input.openRooms]);
  return [...all].filter((s) => !closed.has(s) && input.nameOf(s) != null).sort();
}
