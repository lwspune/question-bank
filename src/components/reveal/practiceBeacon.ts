"use client";

import {
  addToBatch,
  PRACTICE_BATCH_MAX,
  DEFAULT_PRACTICE_SURFACE,
  type PickLabel,
  type PracticeSurface,
} from "@/lib/questions/practiceBatch";

/**
 * Client-side queue for the answer-reveal practice signal.
 *
 * MODULE-LEVEL ON PURPOSE: every QuestionCard on /browse mounts its own copy of
 * useRevealMeter, so per-hook state would give each question its own batch and
 * defeat the batching entirely. One queue per page session is the point — a
 * student revealing 40 answers sends one request, not 40.
 *
 * ONE QUEUE PER SURFACE, because the surface is a property of the batch rather
 * than of an id: /browse and a /guide worked example can both reveal the same
 * question row, and merging them into one request would force a single label
 * onto reveals that belong to two different products.
 *
 * `sent` suppresses repeats within the session, keyed by SURFACE AND id — the
 * activity spine treats a genuine repeat as real history (re-bookmarking is a
 * real act), and revealing the same answer three times while scrolling is one
 * act of practice, not three; but revealing it in a guide and then again in the
 * bank is two, on two surfaces, and collapsing those would lose the attribution
 * this whole field exists to record.
 *
 * Flushing: debounced, plus an unconditional flush when the page is hidden —
 * which is how most sessions actually end. `sendBeacon` is used on the hide path
 * because a normal fetch is cancelled during unload; it is also why the payload
 * is a Blob with an explicit JSON type rather than a bare string.
 */

const ENDPOINT = "/api/activity/practice";
const FLUSH_DEBOUNCE_MS = 5000;

const queues = new Map<PracticeSurface, string[]>();
/** The option tapped, for reveals that came from a tap (bank verdicts,
 *  2026-10-02). Kept beside the id queue, not in it, so `addToBatch` and the
 *  server's id list stay exactly as they were. */
const picks = new Map<PracticeSurface, Map<string, PickLabel>>();
const sent = new Set<string>();
let timer: ReturnType<typeof setTimeout> | null = null;
let listening = false;

/** The request body. `picks` only names ids still in the batch: the parser
 *  rejects a pick with no reveal beside it. */
function body(ids: readonly string[], surface: PracticeSurface, tapped: ReadonlyMap<string, PickLabel>): string {
  const sentPicks: Record<string, PickLabel> = {};
  for (const id of ids) {
    const label = tapped.get(id);
    if (label) sentPicks[id] = label;
  }
  return JSON.stringify(
    Object.keys(sentPicks).length > 0 ? { questionIds: ids, surface, picks: sentPicks } : { questionIds: ids, surface }
  );
}

/** Send whatever is queued, one request per surface. `useBeacon` for page-hide. */
function flush(useBeacon: boolean): void {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  if (queues.size === 0) return;
  // Drain BEFORE sending: a send that throws must not leave the same ids queued
  // to be sent again on the next flush.
  const pending = [...queues.entries()];
  const pendingPicks = new Map(picks);
  queues.clear();
  picks.clear();
  for (const [surface, ids] of pending) {
    if (ids.length > 0) send(body(ids, surface, pendingPicks.get(surface) ?? new Map()), useBeacon);
  }
}

function send(json: string, useBeacon: boolean): void {
  try {
    if (useBeacon && typeof navigator !== "undefined" && navigator.sendBeacon) {
      // A Blob with an explicit JSON type: a bare string would go as text/plain.
      navigator.sendBeacon(ENDPOINT, new Blob([json], { type: "application/json" }));
      return;
    }
    void fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json,
      keepalive: true,
    }).catch(() => {
      /* a lost practice signal is not worth surfacing to a student */
    });
  } catch {
    /* storage/network hostile environment — drop silently */
  }
}

function ensureListeners(): void {
  if (listening || typeof document === "undefined") return;
  listening = true;
  // visibilitychange fires on tab switch AND on mobile app-switch, where
  // pagehide/beforeunload are unreliable. Both are registered deliberately.
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush(true);
  });
  window.addEventListener("pagehide", () => flush(true));
}

/**
 * Record that an answer was revealed, on the surface that revealed it. No-op for
 * anonymous viewers — they are deliberately not tracked (see the 0105 header).
 *
 * `surface` defaults to the bank so the two original callers (/browse, /board)
 * read exactly as before.
 *
 * `chose` is the option tapped, when the reveal came from a tap; the server
 * grades it. FIRST ACT ONLY, by construction: `sent` admits one reveal per
 * question per surface per page session, so a pick after "Show solution", or a
 * second pick after collapsing and re-opening the card, records no verdict —
 * neither is an attempt.
 */
export function recordPractice(
  questionId: string,
  signedIn: boolean,
  surface: PracticeSurface = DEFAULT_PRACTICE_SURFACE,
  chose?: PickLabel
): void {
  if (!signedIn || !questionId) return;
  const key = `${surface}:${questionId}`;
  if (sent.has(key)) return;
  sent.add(key);

  ensureListeners();
  const next = addToBatch(queues.get(surface) ?? [], questionId);
  queues.set(surface, next);
  if (chose) {
    const tapped = picks.get(surface) ?? new Map<string, PickLabel>();
    tapped.set(questionId, chose);
    picks.set(surface, tapped);
  }

  // A full queue goes now rather than waiting out the debounce — otherwise the
  // oldest ids would start falling off the end of the batch unsent. This flushes
  // every surface, not just the full one: sending a small sibling batch a few
  // seconds early costs nothing, and one timer is easier to reason about.
  if (next.length >= PRACTICE_BATCH_MAX) {
    flush(false);
    return;
  }
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => flush(false), FLUSH_DEBOUNCE_MS);
}

/** Test/diagnostic hook — not used by the app. Totals every surface's queue. */
export function __practiceQueueSize(): number {
  let n = 0;
  for (const ids of queues.values()) n += ids.length;
  return n;
}
