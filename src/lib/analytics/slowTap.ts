/**
 * Pure core of the slow-tap measurement (2026-10-04; see DEAD_TAPS.md).
 *
 * Clarity records taps that change nothing but no timing, so it cannot say
 * whether a dead tap was a busy phone or our own work. The browser's Event
 * Timing API can: for each interaction it gives when the input arrived
 * (startTime), when our handler started and ended, and when the next frame
 * painted (startTime + duration). The client reporter (SlowTapReporter)
 * feeds entries over SLOW_TAP_MS through these helpers into one funnel event.
 *
 * Chrome and Edge only (Android is most of the audience); Safari has no Event
 * Timing, so iPhones report nothing. Read the counts as a floor.
 */

/** Google's "needs improvement" line for responsiveness. */
export const SLOW_TAP_MS = 200;

export type TapKind = "reveal" | "expand" | "nav" | "option" | "other";

/** What the reporter reads off the tapped element (its nearest button or link). */
export type TapTarget = {
  text: string;
  ariaLabel: string | null;
  inHeader: boolean;
  /** An MCQ option button (a button with aria-pressed inside a list item). */
  isOption: boolean;
};

const REVEAL_RE = /^(show|hide)\b.*\b(answer|solution|options)\b/i;
const EXPAND_RE = /^(expand|collapse) question/i;

export function classifyTap(t: TapTarget): TapKind {
  if (t.ariaLabel && EXPAND_RE.test(t.ariaLabel)) return "expand";
  if (REVEAL_RE.test(t.text.trim())) return "reveal";
  if (t.isOption) return "option";
  if (t.inHeader) return "nav";
  return "other";
}

export type TapTiming = {
  startTime: number;
  processingStart: number;
  processingEnd: number;
  duration: number;
};

export type TapPhase = "waiting" | "working" | "painting";

/** The largest of the three parts of the delay names it. */
export function tapPhase(t: TapTiming): TapPhase {
  const waiting = t.processingStart - t.startTime;
  const working = t.processingEnd - t.processingStart;
  const painting = t.startTime + t.duration - t.processingEnd;
  if (waiting >= working && waiting >= painting) return "waiting";
  if (working >= painting) return "working";
  return "painting";
}

export function durationBucket(ms: number): "200-500" | "500-1000" | "1000-2000" | "2000+" {
  if (ms < 500) return "200-500";
  if (ms < 1000) return "500-1000";
  if (ms < 2000) return "1000-2000";
  return "2000+";
}

/** The event's two props, or null for a tap that was fast enough. */
export function slowTapProps(kind: TapKind, t: TapTiming): { kind: TapKind; timing: string } | null {
  if (t.duration < SLOW_TAP_MS) return null;
  return { kind, timing: `${tapPhase(t)}:${durationBucket(t.duration)}` };
}
