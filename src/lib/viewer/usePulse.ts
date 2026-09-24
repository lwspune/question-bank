"use client";

import { useEffect, useState } from "react";
import {
  isPulseFresh,
  parsePulseEntry,
  PULSE_STORAGE_KEY,
  type Pulse,
  type PulseEntry,
} from "@/lib/pulse/cache";

/**
 * The signed-in student's "pulse" — due drill count + this week's sittings —
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
    if (entry && isPulseFresh(entry, nowMs)) return { due: entry.due, week: entry.week };
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

export function usePulse(enabled: boolean): Pulse | null {
  const [pulse, setPulse] = useState<Pulse | null>(current);

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
