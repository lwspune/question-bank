/**
 * The exam rooms state the browser shares between the bubble, the account
 * menu's Exam rooms entry and the Account card (migration 0290): unread count
 * and whether the button is hidden. Kept in sessionStorage and reused for 10
 * minutes (lib/rooms/poll badgeCacheFresh), so it costs one GET /api/rooms a
 * visit, not one per page or per component. Browser only.
 */
import { useSyncExternalStore } from "react";

export type RoomsState = { unread: number; hiddenUntil: string | null; at: number };

const KEY = "qb_rooms_badge";
export const OPEN_ROOMS_EVENT = "qb:open-rooms";

let cached: RoomsState | null | undefined;
const listeners = new Set<() => void>();

export function readRoomsState(): RoomsState | null {
  if (cached !== undefined) return cached;
  try {
    const raw = sessionStorage.getItem(KEY);
    const v = raw ? (JSON.parse(raw) as Partial<RoomsState>) : null;
    cached = v && typeof v.at === "number" ? { unread: v.unread ?? 0, hiddenUntil: v.hiddenUntil ?? null, at: v.at } : null;
  } catch {
    cached = null;
  }
  return cached;
}

export function saveRoomsState(patch: Partial<Omit<RoomsState, "at">>): void {
  const prev = readRoomsState() ?? { unread: 0, hiddenUntil: null, at: 0 };
  cached = { ...prev, ...patch, at: Date.now() };
  try {
    sessionStorage.setItem(KEY, JSON.stringify(cached));
  } catch {
    // Private mode: the state lives for this page only.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useRoomsState(): RoomsState | null {
  return useSyncExternalStore(subscribe, readRoomsState, () => null);
}

/** Open the rooms window from anywhere (the account menu), even while the button is hidden. */
export function openRoomsWindow(): void {
  window.dispatchEvent(new Event(OPEN_ROOMS_EVENT));
}
