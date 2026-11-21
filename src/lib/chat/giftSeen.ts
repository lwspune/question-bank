/**
 * Whether V's gift (lib/chat/gift) is still waiting, kept in localStorage per
 * device, like the "Your day" card (lib/chat/daySeen). A second device shows
 * a gift once more, which is harmless; a browser that blocks storage shows no
 * gift at all, so V stays as it was. Nothing here grants anything: the trial
 * is granted only by its own Activate, the points discount only at checkout.
 *
 *   - Unopened, a gift waits GIFT_WAIT_DAYS from when V first showed it.
 *   - Opened, it is gone.
 *   - A points milestone may come back GIFT_AGAIN_DAYS after it was last
 *     shown or opened: points last 30 days, so by then it was earned again.
 *     The 7-day pass never comes back: there is one per account.
 *
 * Pure apart from the two storage wrappers. Spec: tests/chat-gift.test.ts.
 */
import { giftKey, type VGift } from "./gift";

export const GIFT_SEEN_KEY = "qb:v-gift:v1";
export const GIFT_WAIT_DAYS = 3;
/** FIX_POINTS_WINDOW_DAYS (lib/billing/fixPoints), not imported so this file stays free of billing code. */
export const GIFT_AGAIN_DAYS = 30;

const DAY_MS = 24 * 60 * 60 * 1000;

export type GiftMark = { shownAt?: number; openedAt?: number };
export type GiftMarks = Record<string, GiftMark>;

/** The mark that still counts: none once a points milestone is old enough to be earned again. */
function liveMark(g: VGift, marks: GiftMarks, nowMs: number): GiftMark | null {
  const m = marks[giftKey(g)];
  if (!m) return null;
  if (g.kind === "points") {
    const last = m.openedAt ?? m.shownAt;
    if (last === undefined || nowMs - last >= GIFT_AGAIN_DAYS * DAY_MS) return null;
  }
  return m;
}

/** `marks` undefined = storage could not be read: no gift, never a guess. */
export function giftDue(g: VGift | null, marks: GiftMarks | undefined, nowMs: number): boolean {
  if (!g || !marks) return false;
  const m = liveMark(g, marks, nowMs);
  if (!m) return true;
  if (m.openedAt !== undefined) return false;
  if (m.shownAt === undefined) return true;
  return nowMs - m.shownAt < GIFT_WAIT_DAYS * DAY_MS;
}

/** V showed the closed box. The first showing counts, so reopening V does not restart the wait. */
export function markGiftShown(marks: GiftMarks, g: VGift, nowMs: number): GiftMarks {
  const m = liveMark(g, marks, nowMs);
  if (m && m.shownAt !== undefined) return marks;
  return { ...marks, [giftKey(g)]: { ...(m ?? {}), shownAt: nowMs } };
}

export function markGiftOpened(marks: GiftMarks, g: VGift, nowMs: number): GiftMarks {
  const m = liveMark(g, marks, nowMs);
  return { ...marks, [giftKey(g)]: { shownAt: m?.shownAt ?? nowMs, openedAt: nowMs } };
}

const isTime = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v) && v >= 0;

/** What was stored; a junk copy is empty (a gift shows again) and a junk entry is dropped. */
export function parseGiftMarks(raw: string | null): GiftMarks {
  if (raw === null) return {};
  let v: unknown;
  try {
    v = JSON.parse(raw);
  } catch {
    return {};
  }
  if (!v || typeof v !== "object" || Array.isArray(v)) return {};
  const out: GiftMarks = {};
  for (const [key, m] of Object.entries(v as Record<string, unknown>)) {
    if (!m || typeof m !== "object") continue;
    const o = m as Record<string, unknown>;
    if ((o.shownAt !== undefined && !isTime(o.shownAt)) || (o.openedAt !== undefined && !isTime(o.openedAt))) continue;
    const mark: GiftMark = {};
    if (isTime(o.shownAt)) mark.shownAt = o.shownAt;
    if (isTime(o.openedAt)) mark.openedAt = o.openedAt;
    if (mark.shownAt === undefined && mark.openedAt === undefined) continue;
    out[key] = mark;
  }
  return out;
}

/** The stored marks, undefined when storage is blocked. */
export function readGiftMarks(): GiftMarks | undefined {
  try {
    return parseGiftMarks(localStorage.getItem(GIFT_SEEN_KEY));
  } catch {
    return undefined;
  }
}

export function writeGiftMarks(marks: GiftMarks): void {
  try {
    localStorage.setItem(GIFT_SEEN_KEY, JSON.stringify(marks));
  } catch {
    // Blocked: the gift may show again on this device, which is harmless.
  }
}
