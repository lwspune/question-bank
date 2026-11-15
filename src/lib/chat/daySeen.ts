/**
 * When V shows its "Your day" card (lib/chat/dayCard.ts) and the dot on its
 * button (2026-11-15). The day a card was last shown is a per-device
 * convenience kept in localStorage: a second device shows the card once more,
 * which is harmless, and a browser that blocks storage shows neither the card
 * nor the dot, so V stays as it was. Pure and browser-safe (no imports).
 * Spec: tests/chat-day-seen.test.ts.
 */
export const DAY_SEEN_KEY = "qb:v-day-seen:v1";

const IST_OFFSET_MS = 5.5 * 3_600_000;

/** YYYY-MM-DD in India time. */
export function istTodayKey(now: Date): string {
  return new Date(now.getTime() + IST_OFFSET_MS).toISOString().slice(0, 10);
}

/**
 * `seenDay`: the stored day, null when nothing is stored yet, undefined when
 * storage could not be read.
 */
export function dayCardDue(p: {
  signedIn: boolean;
  enabled: boolean;
  hasSomething: boolean;
  unread: number;
  seenDay: string | null | undefined;
  now: Date;
}): boolean {
  if (!p.signedIn || !p.enabled || !p.hasSomething || p.unread > 0) return false;
  if (p.seenDay === undefined) return false;
  return p.seenDay !== istTodayKey(p.now);
}

/** The stored day, null when none, undefined when storage is blocked. */
export function readSeenDay(): string | null | undefined {
  try {
    return localStorage.getItem(DAY_SEEN_KEY);
  } catch {
    return undefined;
  }
}

export function writeSeenDay(now: Date): void {
  try {
    localStorage.setItem(DAY_SEEN_KEY, istTodayKey(now));
  } catch {
    // Blocked: the card may show again on this device, which is harmless.
  }
}
