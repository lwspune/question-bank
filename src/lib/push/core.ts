/**
 * Browser push for the due-queue nudge — the pure core. PUSH_SPEC.md §5.
 *
 * The nudge is the same one the email sends (ENGAGEMENT_SPEC.md C2) and is
 * chosen by the same `selectDueNudges`; this module is only the push-specific
 * part: what a subscription the browser hands us must look like, what the
 * notification says, and what a delivery outcome means for the subscription.
 *
 * The WORDING was fixed against a mockup (2026-10-01): the email subject is cut
 * to "…are waiting" on a collapsed Android lock screen, so the title counts the
 * mistakes and names Fix instead; and a drill serves at most five questions at
 * about a minute each, so the time follows the count rather than always saying
 * five minutes. The icon and badge are the header's BookOpen mark, so the
 * sender is recognisable without reading.
 *
 * No I/O, and not `server-only`: the tsx sender imports it (the lib/email
 * precedent). Spec: tests/push-core.test.ts.
 */
import { clickUrl } from "@/lib/email/click";
import type { DueSummary } from "@/lib/email/dueNudge";

export const PUSH_KIND = "due_nudge" as const;
/** A phone that was off past this gets nothing, rather than a stale nudge at midnight. */
export const PUSH_TTL_SECONDS = 12 * 3600;
/** Consecutive non-gone failures before a subscription is dropped as a zombie. */
export const PUSH_MAX_FAILS = 5;
export const PUSH_ICON = "/icons/push-192.png";
export const PUSH_BADGE = "/icons/push-badge-96.png";

/** Chapters named in the body before "+K more". */
const MAX_CHAPTERS = 3;
/** A drill serves at most this many questions, at about a minute each. */
const DRILL_SIZE = 5;
/** The push services cap a payload at 4 KB; leave headroom for encryption overhead. */
const MAX_PAYLOAD_BYTES = 3500;
const MAX_ENDPOINT = 2048;
const MAX_USER_AGENT = 256;
const KEY_RE = /^[A-Za-z0-9_-]{16,256}={0,2}$/;

export type PushSubscriptionInput = {
  endpoint: string;
  keys: { p256dh: string; auth: string };
  userAgent?: string;
};

export type PushPayload = {
  title: string;
  body: string;
  url: string;
  tag: "due-nudge";
  icon: string;
  badge: string;
};

export type DeliveryOutcome = "sent" | "gone" | "failed";

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/** Validate a browser's PushSubscription.toJSON() (plus the userAgent we add). */
export function parseSubscription(
  body: unknown
): { ok: true; value: PushSubscriptionInput } | { ok: false; reason: string } {
  if (!isRecord(body)) return { ok: false, reason: "Expected a subscription object." };
  const { endpoint, keys, userAgent } = body;
  if (typeof endpoint !== "string" || endpoint.length > MAX_ENDPOINT || !endpoint.startsWith("https://")) {
    return { ok: false, reason: "The endpoint must be an https URL." };
  }
  try {
    if (!new URL(endpoint).hostname) return { ok: false, reason: "The endpoint must be an https URL." };
  } catch {
    return { ok: false, reason: "The endpoint must be an https URL." };
  }
  if (!isRecord(keys)) return { ok: false, reason: "The subscription keys are missing." };
  const { p256dh, auth } = keys;
  if (typeof p256dh !== "string" || !KEY_RE.test(p256dh) || typeof auth !== "string" || !KEY_RE.test(auth)) {
    return { ok: false, reason: "The subscription keys are malformed." };
  }
  const value: PushSubscriptionInput = { endpoint, keys: { p256dh, auth } };
  if (typeof userAgent === "string" && userAgent.length > 0) value.userAgent = userAgent.slice(0, MAX_USER_AGENT);
  return { ok: true, value };
}

export function pushTitle(total: number): string {
  return total === 1 ? "1 mistake is waiting in Fix" : `${total} mistakes are waiting in Fix`;
}

export function drillTimeLine(total: number): string {
  const minutes = Math.min(total, DRILL_SIZE);
  return minutes <= 1 ? "About a minute." : `About ${minutes} minutes.`;
}

export function buildDuePushPayload(input: { summary: DueSummary; clickToken: string }): PushPayload {
  const { summary, clickToken } = input;
  const named = summary.chapters.slice(0, MAX_CHAPTERS).map((c) => `${c.chapter} ${c.count}`);
  const leftOut = summary.chapters.length - named.length;
  const parts = leftOut > 0 ? [...named, `+${leftOut} more`] : named;
  return {
    title: pushTitle(summary.total),
    body: [...parts, drillTimeLine(summary.total)].join(" · "),
    url: clickUrl(clickToken, "/drill"),
    tag: "due-nudge",
    icon: PUSH_ICON,
    badge: PUSH_BADGE,
  };
}

/** JSON for the push service; throws rather than letting the service reject it. */
export function serializePayload(p: PushPayload): string {
  const s = JSON.stringify(p);
  if (new TextEncoder().encode(s).length >= MAX_PAYLOAD_BYTES) {
    throw new Error(`push payload is over ${MAX_PAYLOAD_BYTES} bytes`);
  }
  return s;
}

/** 2xx sent · 404/410 the browser dropped the subscription · anything else retry later. */
export function classifyDelivery(statusCode: number | null): DeliveryOutcome {
  if (statusCode === null) return "failed";
  if (statusCode >= 200 && statusCode < 300) return "sent";
  if (statusCode === 404 || statusCode === 410) return "gone";
  return "failed";
}

/** `failCount` is the count BEFORE this failure. */
export function shouldDropAfterFailure(failCount: number): boolean {
  return failCount + 1 >= PUSH_MAX_FAILS;
}

export { isIosNotStandalone, urlBase64ToUint8Array } from "./browser";
