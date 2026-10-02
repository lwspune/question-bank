/**
 * What the BROWSER may write to user_activity, through POST /api/activity/event.
 *
 * A closed list. A client may say "I saw this surface" or "the paywall was
 * shown / I closed the checkout" — never a graded act (mock_submitted,
 * answer_correct, drill_completed) and never a server fact (email_clicked,
 * checkout_opened, verify_failed), because those carry meaning only the server
 * can vouch for. Impressions are deduped per student per gate per IST day at
 * parse time, so a page that re-renders cannot count twice.
 */
import { istDayKey } from "@/lib/email/dueNudge";
import type { ActivityEvent } from "./events";
import { isSurface, viewDedupeKey } from "./views";

/**
 * Which kind of browser recorded a view. Only the handout sends it: in-app
 * browsers (WhatsApp, Instagram…) cannot save its PDF, so how many readers
 * open it there is what decides whether that path is worth more work.
 */
export const VIEW_BROWSERS = ["standard", "inapp"] as const;
const BROWSER_SET: ReadonlySet<string> = new Set(VIEW_BROWSERS);

export const PAYWALL_GATES = ["mock_limit", "teacher", "pricing"] as const;
export type PaywallGate = (typeof PAYWALL_GATES)[number];

export const PAYWALL_STEPS = ["shown", "checkout_opened", "checkout_dismissed", "verify_failed"] as const;
export type PaywallStep = (typeof PAYWALL_STEPS)[number];

/** Steps a client may report. The other two are written by the billing routes. */
const CLIENT_STEPS: ReadonlySet<string> = new Set<PaywallStep>(["shown", "checkout_dismissed"]);
const GATE_SET: ReadonlySet<string> = new Set(PAYWALL_GATES);
const MAX_PLAN_ID = 64;

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/**
 * Build a paywall_event. `shown` is an impression and is deduped per day when
 * the caller passes who/when; the other steps are real occurrences and repeat.
 */
export function paywallEvent(
  step: PaywallStep,
  gate: PaywallGate,
  planId?: string,
  dedupe?: { userId: string; now: Date }
): ActivityEvent {
  const event: ActivityEvent = { kind: "paywall_event", metadata: { step, gate } };
  if (planId) {
    event.refId = planId;
    event.refKind = "plan";
  }
  if (step === "shown" && dedupe) {
    event.dedupeKey = `paywall:shown:${gate}:${dedupe.userId}:${istDayKey(dedupe.now)}`;
  }
  return event;
}

export type ParseClientEventResult =
  | { ok: true; value: ActivityEvent }
  | { ok: false; error: string };

export function parseClientEvent(raw: unknown, userId: string, now: Date): ParseClientEventResult {
  if (!isPlainObject(raw)) return { ok: false, error: "Invalid event." };

  if (raw.kind === "surface_viewed") {
    if (!isSurface(raw.surface)) return { ok: false, error: "Unknown surface." };
    if (raw.browser !== undefined && (typeof raw.browser !== "string" || !BROWSER_SET.has(raw.browser))) {
      return { ok: false, error: "Unknown browser." };
    }
    return {
      ok: true,
      value: {
        kind: "surface_viewed",
        metadata: raw.browser ? { surface: raw.surface, browser: raw.browser } : { surface: raw.surface },
        dedupeKey: viewDedupeKey(userId, raw.surface, now),
      },
    };
  }

  if (raw.kind === "paywall_event") {
    if (typeof raw.step !== "string" || !CLIENT_STEPS.has(raw.step)) {
      return { ok: false, error: "Unknown paywall step." };
    }
    if (typeof raw.gate !== "string" || !GATE_SET.has(raw.gate)) {
      return { ok: false, error: "Unknown paywall gate." };
    }
    let planId: string | undefined;
    if (raw.planId !== undefined) {
      if (typeof raw.planId !== "string" || raw.planId.length === 0 || raw.planId.length > MAX_PLAN_ID) {
        return { ok: false, error: "Invalid planId." };
      }
      planId = raw.planId;
    }
    return {
      ok: true,
      value: paywallEvent(raw.step as PaywallStep, raw.gate as PaywallGate, planId, { userId, now }),
    };
  }

  return { ok: false, error: "That kind cannot be written by a client." };
}
