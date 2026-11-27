/**
 * How often an open room asks for new messages, and how long the bubble
 * reuses its unread count (migration 0289). No live connection in phase 1:
 * a room checks only while it is open and the tab visible, every 6 seconds
 * while messages flow and every 20 once it has been quiet for a minute, so a
 * quiet room open in a background corner costs 3 requests a minute. Pure.
 * Spec: tests/rooms-view.test.ts.
 */
const ACTIVE_MS = 6000;
const QUIET_MS = 20_000;
const QUIET_AFTER_MS = 60_000;
const BADGE_TTL_MS = 10 * 60_000;

/** `idleMs`: time since the last new message arrived (or the room opened). */
export function nextPollDelay(idleMs: number): number {
  return idleMs >= QUIET_AFTER_MS ? QUIET_MS : ACTIVE_MS;
}

export function badgeCacheFresh(savedAt: number | null, now: number): boolean {
  return savedAt != null && now - savedAt < BADGE_TTL_MS;
}

/** How close to the bottom still counts as "reading the latest" (px). */
const NEAR_END_PX = 80;

/**
 * Whether the chat is at (or near) its newest message. While it is, the
 * window keeps it pinned there as messages, question cards and pictures grow
 * it; once the student scrolls up to read, it stays where they put it.
 */
export function isNearEnd(el: { scrollHeight: number; scrollTop: number; clientHeight: number }): boolean {
  return el.scrollHeight - el.scrollTop - el.clientHeight < NEAR_END_PX;
}
