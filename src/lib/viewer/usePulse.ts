"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import {
  isPulseFresh,
  parsePulseEntry,
  PULSE_STORAGE_KEY,
  type Pulse,
  type PulseEntry,
} from "@/lib/pulse/cache";

/**
 * The signed-in student's "pulse" — due drill count, this week's sittings,
 * the exam countdown and Answered · Right · Fixed —
 * resolved in the BROWSER and shared by every component that shows it.
 *
 * Same shape as useViewerSession, for the same reason: the header is on
 * ISR-cached pages that carry no identity, so anything per-user is fetched
 * from the client, and a second caller on the page must not mean a second
 * request. One in-flight promise per page load; a sessionStorage entry good
 * for PULSE_TTL_MS across page loads.
 *
 * INVALIDATION IS EXPLICIT. The number changes at two moments — a drill answer
 * is recorded, a mock is graded — and both call `invalidatePulse()`, which
 * drops the cache, refetches, and pushes the fresh value to every mounted
 * subscriber. So the avatar badge counts down while the student drills,
 * without polling.
 *
 * Only ever called with `enabled` true for a signed-in viewer; anon pays
 * nothing.
 */

let inFlight: Promise<Pulse | null> | null = null;
let current: Pulse | null = null;
const listeners = new Set<(p: Pulse | null) => void>();

function readCache(nowMs: number): Pulse | null {
  try {
    const entry = parsePulseEntry(sessionStorage.getItem(PULSE_STORAGE_KEY));
    // Every field the entry carries. This returned only due + week until
    // 2026-10-04, so the exam countdown vanished on every cached read.
    if (entry && isPulseFresh(entry, nowMs)) {
      return {
        due: entry.due,
        week: entry.week,
        exam: entry.exam,
        totals: entry.totals,
        weak: entry.weak,
        chapterDue: entry.chapterDue,
      };
    }
  } catch {
    /* private mode / blocked storage — fall through to a fetch */
  }
  return null;
}

function writeCache(p: Pulse, nowMs: number): void {
  try {
    const entry: PulseEntry = { at: nowMs, ...p };
    sessionStorage.setItem(PULSE_STORAGE_KEY, JSON.stringify(entry));
  } catch {
    /* ignore */
  }
}

function publish(p: Pulse | null): void {
  current = p;
  for (const l of listeners) l(p);
}

export function fetchPulse(): Promise<Pulse | null> {
  if (inFlight) return inFlight;
  inFlight = (async () => {
    const nowMs = Date.now();
    const cached = readCache(nowMs);
    if (cached) {
      publish(cached);
      return cached;
    }
    try {
      const res = await fetch("/api/me/pulse", { cache: "no-store" });
      if (!res.ok) return null;
      const data = (await res.json()) as Pulse;
      writeCache(data, nowMs);
      publish(data);
      return data;
    } catch {
      return null;
    }
  })();
  return inFlight;
}

/**
 * Load a pulse the SERVER built into the shared copy (2026-11-08): /me builds
 * it alongside its other reads and hands it to its cards, so the header badge
 * and every other subscriber use it rather than asking /api/me/pulse again.
 * It is the newest value there is, so it replaces whatever was held. Live
 * updates are untouched: `invalidatePulse()` still drops it and refetches.
 */
export function seedPulse(p: Pulse): void {
  inFlight = Promise.resolve(p);
  writeCache(p, Date.now());
  publish(p);
}

/** Drop the cache and refetch; every mounted subscriber gets the new value. */
export function invalidatePulse(): void {
  inFlight = null;
  try {
    sessionStorage.removeItem(PULSE_STORAGE_KEY);
  } catch {
    /* ignore */
  }
  void fetchPulse();
}

/** Test-only escape hatch. */
export function resetPulseCache(): void {
  inFlight = null;
  current = null;
}

/**
 * `initial` is a pulse the server built for this page (/me): the component
 * shows it from its first render, so the numbers are in the page's HTML, and
 * it is seeded into the shared copy before any component's effect asks for
 * one (layout effects run before every passive effect on the page).
 */
export function usePulse(enabled: boolean, initial?: Pulse | null): Pulse | null {
  const [pulse, setPulse] = useState<Pulse | null>(initial ?? current);

  useIsomorphicLayoutEffect(() => {
    if (enabled && initial) seedPulse(initial);
  }, [enabled, initial]);

  useEffect(() => {
    if (!enabled) return;
    listeners.add(setPulse);
    void fetchPulse().then((p) => {
      if (p) setPulse(p);
    });
    return () => {
      listeners.delete(setPulse);
    };
  }, [enabled]);

  return enabled ? pulse : null;
}

/** useLayoutEffect in the browser; on the server (which runs neither) the
 *  plain effect, so React does not warn about a layout effect there. */
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
