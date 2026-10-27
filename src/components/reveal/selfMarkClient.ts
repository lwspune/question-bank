/**
 * Browser side of "Understood / Review later" (2026-10-28): the POST, and the
 * one signed-out tap parked until the visitor signs in. Shared by the buttons
 * (SelfMarkButtons) and the layout island that saves a parked tap on return
 * (PendingSelfMarkSaver). Rules and storage format: lib/questions/selfMark.
 */
import {
  encodePendingSelfMark,
  parsePendingSelfMark,
  PENDING_SELF_MARK_KEY,
  type PendingSelfMark,
  type SelfMarkOutcome,
} from "@/lib/questions/selfMark";

export type PostResult =
  | { ok: true; outcome: SelfMarkOutcome }
  | { ok: false; signedOut: boolean; error: string };

export async function postSelfMark(p: PendingSelfMark): Promise<PostResult> {
  try {
    const res = await fetch("/api/activity/self-mark", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p),
    });
    const body = (await res.json().catch(() => ({}))) as { outcome?: SelfMarkOutcome; error?: string };
    if (res.ok && body.outcome) return { ok: true, outcome: body.outcome };
    return { ok: false, signedOut: res.status === 401, error: body.error ?? "Couldn't save that. Try again." };
  } catch {
    return { ok: false, signedOut: false, error: "Couldn't reach the server. Check your connection." };
  }
}

/** Storage can throw (private window, blocked site data); a parked tap is a
 *  convenience, never worth breaking the page over. */
export function parkSelfMark(p: PendingSelfMark): void {
  try {
    localStorage.setItem(PENDING_SELF_MARK_KEY, encodePendingSelfMark(p, Date.now()));
  } catch {
    /* ignore */
  }
}

/** The parked tap, if one is still fresh. Clears a stale or malformed one. */
export function readParkedSelfMark(): PendingSelfMark | null {
  try {
    const raw = localStorage.getItem(PENDING_SELF_MARK_KEY);
    if (raw === null) return null;
    const p = parsePendingSelfMark(raw, Date.now());
    if (!p) localStorage.removeItem(PENDING_SELF_MARK_KEY);
    return p;
  } catch {
    return null;
  }
}

export function clearParkedSelfMark(): void {
  try {
    localStorage.removeItem(PENDING_SELF_MARK_KEY);
  } catch {
    /* ignore */
  }
}
