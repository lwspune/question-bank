"use client";

import { addToBatch, PRACTICE_BATCH_MAX } from "@/lib/questions/practiceBatch";

/**
 * Client-side queue for the answer-reveal practice signal.
 *
 * MODULE-LEVEL ON PURPOSE: every QuestionCard on /browse mounts its own copy of
 * useRevealMeter, so per-hook state would give each question its own batch and
 * defeat the batching entirely. One queue per page session is the point — a
 * student revealing 40 answers sends one request, not 40.
 *
 * `sent` suppresses repeats within the session. The activity spine treats a
 * genuine repeat as real history (re-bookmarking is a real act), but revealing
 * the SAME answer three times while scrolling is one act of practice, not three.
 *
 * Flushing: debounced, plus an unconditional flush when the page is hidden —
 * which is how most sessions actually end. `sendBeacon` is used on the hide path
 * because a normal fetch is cancelled during unload; it is also why the payload
 * is a Blob with an explicit JSON type rather than a bare string.
 */

const ENDPOINT = "/api/activity/practice";
const FLUSH_DEBOUNCE_MS = 5000;

let queue: string[] = [];
const sent = new Set<string>();
let timer: ReturnType<typeof setTimeout> | null = null;
let listening = false;

function payload(ids: readonly string[]): Blob {
  return new Blob([JSON.stringify({ questionIds: ids })], { type: "application/json" });
}

/** Send whatever is queued. `useBeacon` for the page-hide path. */
function flush(useBeacon: boolean): void {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  if (queue.length === 0) return;
  const ids = queue;
  queue = [];

  try {
    if (useBeacon && typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, payload(ids));
      return;
    }
    void fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionIds: ids }),
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
 * Record that a bank answer was revealed. No-op for anonymous viewers — they are
 * deliberately not tracked (see the 0105 migration header).
 */
export function recordPractice(questionId: string, signedIn: boolean): void {
  if (!signedIn || !questionId) return;
  if (sent.has(questionId)) return;
  sent.add(questionId);

  ensureListeners();
  queue = addToBatch(queue, questionId);

  // A full queue goes now rather than waiting out the debounce — otherwise the
  // oldest ids would start falling off the end of the batch unsent.
  if (queue.length >= PRACTICE_BATCH_MAX) {
    flush(false);
    return;
  }
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => flush(false), FLUSH_DEBOUNCE_MS);
}

/** Test/diagnostic hook — not used by the app. */
export function __practiceQueueSize(): number {
  return queue.length;
}
