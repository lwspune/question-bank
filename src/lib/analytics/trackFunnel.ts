"use client";

import { track } from "@vercel/analytics";
import {
  buildFunnelEvent,
  isFunnelAnalyticsEnabled,
  type FunnelEvent,
  type FunnelProps,
} from "./funnelEvents";

/**
 * Client-side sender for the anon funnel events. Thin on purpose — every rule
 * worth testing lives in the pure core next door.
 *
 * BEST EFFORT, like `logActivity`: a lost analytics ping must never surface to
 * a student, and must never break the interaction it is observing. Everything
 * here either sends or silently gives up.
 *
 * The kill switch is read ONCE at module scope rather than per call: Next
 * inlines NEXT_PUBLIC_* at build time, so this is a constant, not a lookup.
 *
 * MEASURED, because the obvious assumption is false: turning the flag off does
 * NOT strip the event names from the client bundle. A build with it `off` still
 * ships all six literals — the bundler cannot prove these calls are dead across
 * the module boundary. Nothing is SENT (this returns before `track`), but do not
 * read "the string is absent from the bundle" as the test of whether the switch
 * works; the test is `analytics-track-funnel.test.ts`, which asserts on the call.
 */
const ENABLED = isFunnelAnalyticsEnabled(process.env.NEXT_PUBLIC_FUNNEL_ANALYTICS);

export function trackFunnel(name: FunnelEvent, props?: FunnelProps): void {
  if (!ENABLED) return;

  const built = buildFunnelEvent(name, props);
  if (!built.ok) {
    // Surface a rejected event in development only. A silently dropped event is
    // the "skipped step leaves no error" failure — you would be left staring at
    // an empty Events panel with nothing to explain it.
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[funnel] ${built.error}`);
    }
    return;
  }

  try {
    track(built.value.name, built.value.props);
  } catch {
    /* ad blocker, offline, hostile environment — a lost count is not an error */
  }
}

/**
 * Fire an event at most once per page session.
 *
 * MODULE-LEVEL, for the same reason practiceBeacon's queue is: a dialog can be
 * reopened and a blocked card re-clicked, and each mounts its own component
 * copy, so per-component state would defeat the dedupe entirely.
 *
 * This is a signal decision before it is a cost one. "How many visitors met the
 * teacher gate" is the question with a denominator in it; "how many times did
 * someone reopen the dialog" is not, and letting the second masquerade as the
 * first would inflate exactly the number we built this to trust.
 */
const fired = new Set<string>();

export function trackFunnelOnce(name: FunnelEvent, dedupeKey: string, props?: FunnelProps): void {
  const key = `${name}:${dedupeKey}`;
  if (fired.has(key)) return;
  fired.add(key);
  trackFunnel(name, props);
}

/** Whether funnel telemetry is compiled in. Exported for the emitter drift gate. */
export const FUNNEL_ANALYTICS_ENABLED = ENABLED;
