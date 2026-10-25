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
import { isReadingSurface, isSurface, readingViewFor, viewDedupeKey } from "./views";

/**
 * Which kind of browser recorded a view. Only the handout sends it: in-app
 * browsers (WhatsApp, Instagram…) cannot save its PDF, so how many readers
 * open it there is what decides whether that path is worth more work.
 */
export const VIEW_BROWSERS = ["standard", "inapp"] as const;
const BROWSER_SET: ReadonlySet<string> = new Set(VIEW_BROWSERS);

/**
 * The notes chapter a handout tap or open names, as "subjectRoute/chapterSlug"
 * (2026-10-16). A budget phone froze on the maths-heavy handouts and nothing
 * recorded which chapter failed: per chapter, taps minus opens now says.
 */
const CHAPTER_SURFACES: ReadonlySet<string> = new Set(["handout", "handout_request"]);
const CHAPTER_RE = /^[a-z0-9-]{1,60}\/[a-z0-9-]{1,100}$/;

/** Where a paywall met the student. The last five are the 0134 limits
 *  (2026-10-05): chapter tests, the drill, daily answers, saves, the
 *  projected score. */
export const PAYWALL_GATES = [
  "mock_limit",
  "teacher",
  "pricing",
  "chapter_test",
  "drill",
  "reveals",
  "saves",
  "projection",
] as const;
export type PaywallGate = (typeof PAYWALL_GATES)[number];

export const PAYWALL_STEPS = ["shown", "checkout_opened", "checkout_dismissed", "verify_failed"] as const;
export type PaywallStep = (typeof PAYWALL_STEPS)[number];

/**
 * Which download box met the student (2026-10-14). The "teacher" gate is one
 * gate on several boxes, so without this the offer's pages could not be told
 * apart (the free paper's `set_key` was the only clue).
 */
export const DOWNLOAD_BOXES = ["browse", "mock", "board_paper", "homework", "top_pyqs", "formula"] as const;
export type DownloadBox = (typeof DOWNLOAD_BOXES)[number];
const BOX_SET: ReadonlySet<string> = new Set(DOWNLOAD_BOXES);

/** The box an order request names, or undefined for anything unknown. */
export function checkoutBox(v: unknown): DownloadBox | undefined {
  return typeof v === "string" && BOX_SET.has(v) ? (v as DownloadBox) : undefined;
}

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
/**
 * The gate a checkout started from, as the client names it in the order
 * request. The download box ("teacher", the gate's name since 2026-07) and,
 * since 2026-10-25, the reveal wall ("reveals") buy outside /pricing; anything
 * else is "pricing", the old assumption.
 */
export function checkoutGate(v: unknown): PaywallGate {
  return v === "teacher" || v === "reveals" ? v : "pricing";
}

export function paywallEvent(
  step: PaywallStep,
  gate: PaywallGate,
  planId?: string,
  dedupe?: { userId: string; now: Date },
  box?: DownloadBox
): ActivityEvent {
  const event: ActivityEvent = { kind: "paywall_event", metadata: box ? { step, gate, box } : { step, gate } };
  if (planId) {
    event.refId = planId;
    event.refKind = "plan";
  }
  if (step === "shown" && dedupe) {
    // One impression per box per day when the box is named, so a student who
    // met the gate on /browse first is still counted on a past paper.
    event.dedupeKey = `paywall:shown:${gate}:${box ? `${box}:` : ""}${dedupe.userId}:${istDayKey(dedupe.now)}`;
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
    const chapter = raw.chapter;
    if (chapter !== undefined) {
      if (!CHAPTER_SURFACES.has(raw.surface)) return { ok: false, error: "No chapter on this surface." };
      if (typeof chapter !== "string" || !CHAPTER_RE.test(chapter)) return { ok: false, error: "Invalid chapter." };
    }
    // A reading page carries its address, checked against the surface it claims (2026-10-19).
    let path: string | undefined;
    if (isReadingSurface(raw.surface)) {
      const view = typeof raw.path === "string" ? readingViewFor(raw.path) : null;
      if (!view || view.surface !== raw.surface) return { ok: false, error: "Invalid page address." };
      path = view.path;
    } else if (raw.path !== undefined) {
      return { ok: false, error: "No page address on this surface." };
    }
    const metadata: Record<string, string> = { surface: raw.surface };
    if (raw.browser) metadata.browser = raw.browser;
    if (chapter) metadata.chapter = chapter;
    if (path) metadata.path = path;
    const dedupeKey = chapter
      ? `view:${raw.surface}:${chapter}:${userId}:${istDayKey(now)}`
      : path
        ? `view:${raw.surface}:${path}:${userId}:${istDayKey(now)}`
        : viewDedupeKey(userId, raw.surface, now);
    return { ok: true, value: { kind: "surface_viewed", metadata, dedupeKey } };
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
    const box = checkoutBox(raw.box);
    if (raw.box !== undefined && !box) return { ok: false, error: "Unknown download box." };
    return {
      ok: true,
      value: paywallEvent(raw.step as PaywallStep, raw.gate as PaywallGate, planId, { userId, now }, box),
    };
  }

  return { ok: false, error: "That kind cannot be written by a client." };
}
