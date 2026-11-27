/**
 * The exam rooms state the browser shares between the bubble, the account
 * menu's Exam rooms entry and the Account card (migration 0290): unread count
 * and whether the button is hidden. Kept in sessionStorage and reused for 10
 * minutes (lib/rooms/poll badgeCacheFresh), so it costs one GET /api/rooms a
 * visit, not one per page or per component. Browser only.
 *
 * Circles not joined (owner, 2026-11-27): `waiting` is how many have today's
 * question, and `seenDay` the IST day the bubble was last opened, which clears
 * that alert until the next morning (lib/rooms/alert bubbleCount). The seen
 * day lives in localStorage, so closing the tab does not bring the alert back.
 */
import { useSyncExternalStore } from "react";

export type RoomsState = { unread: number; waiting: number; seenDay: string | null; hiddenUntil: string | null; at: number };

const KEY = "qb_rooms_badge";
const SEEN_KEY = "qb_circles_seen";
export const OPEN_ROOMS_EVENT = "qb:open-rooms";

let cached: RoomsState | null | undefined;
let seenDay: string | null | undefined;
const listeners = new Set<() => void>();

function readSeenDay(): string | null {
  if (seenDay !== undefined) return seenDay;
  try {
    seenDay = localStorage.getItem(SEEN_KEY);
  } catch {
    seenDay = null;
  }
  return seenDay;
}

export function readRoomsState(): RoomsState | null {
  if (cached !== undefined) return cached;
  try {
    const raw = sessionStorage.getItem(KEY);
    const v = raw ? (JSON.parse(raw) as Partial<RoomsState>) : null;
    cached =
      v && typeof v.at === "number"
        ? { unread: v.unread ?? 0, waiting: v.waiting ?? 0, seenDay: readSeenDay(), hiddenUntil: v.hiddenUntil ?? null, at: v.at }
        : null;
  } catch {
    cached = null;
  }
  return cached;
}

function notify(): void {
  listeners.forEach((l) => l());
}

export function saveRoomsState(patch: Partial<Omit<RoomsState, "at" | "seenDay">>): void {
  const before = readRoomsState();
  const prev = before ?? { unread: 0, waiting: 0, seenDay: readSeenDay(), hiddenUntil: null, at: 0 };
  const next = { ...prev, ...patch, at: Date.now() };
  // Same values: refresh the time only, notify nobody (a listener that saves
  // again would otherwise loop; tests/rooms-store.test.ts).
  const changed =
    !before || next.unread !== prev.unread || next.waiting !== prev.waiting || next.hiddenUntil !== prev.hiddenUntil;
  cached = changed ? next : { ...prev, at: next.at };
  try {
    sessionStorage.setItem(KEY, JSON.stringify(cached));
  } catch {
    // Private mode: the state lives for this page only.
  }
  if (changed) notify();
}

/** The bubble was opened on this IST day (YYYY-MM-DD): the waiting alert clears until tomorrow. */
export function markCirclesSeen(day: string): void {
  if (readSeenDay() === day) return;
  seenDay = day;
  try {
    localStorage.setItem(SEEN_KEY, day);
  } catch {
    // Private mode: cleared for this page only.
  }
  const prev = readRoomsState() ?? { unread: 0, waiting: 0, hiddenUntil: null, at: 0, seenDay: null };
  cached = { ...prev, seenDay: day };
  notify();
}

export function subscribeRoomsState(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useRoomsState(): RoomsState | null {
  return useSyncExternalStore(subscribeRoomsState, readRoomsState, () => null);
}

/** Open the rooms window from anywhere (the account menu), even while the button is hidden. */
export function openRoomsWindow(): void {
  window.dispatchEvent(new Event(OPEN_ROOMS_EVENT));
}
