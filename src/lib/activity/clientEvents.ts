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
import { AFTER_CHECKOUT_ONLY, isDeclineReason, type DeclineReason } from "@/lib/billing/declineReasons";
import { CHAPTER_FIX_FROM } from "@/lib/drill/from";
import { START_NEXT_FROM } from "@/lib/me/startNext";
import type { ActivityEvent } from "./events";
import { boardChapterPath, isReadingSurface, isSurface, learnLessonPath, readingViewFor, viewDedupeKey } from "./views";

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

/** The chapter line's page tags (lib/drill/from CHAPTER_FIX_FROM). */
const CHAPTER_FIX_FROM_SET: ReadonlySet<string> = new Set<string>(Object.values(CHAPTER_FIX_FROM));
/** Start next's pages (lib/me/startNext START_NEXT_FROM). */
const START_NEXT_FROM_SET: ReadonlySet<string> = new Set<string>(START_NEXT_FROM);
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/** Where a paywall met the student. Five are the 0134 limits (2026-10-05):
 *  chapter tests, the drill, daily answers, saves, the projected score.
 *  "store" is the ebook store, where only book orders are recorded. */
export const PAYWALL_GATES = [
  "mock_limit",
  "teacher",
  "pricing",
  "chapter_test",
  "drill",
  "reveals",
  "saves",
  "projection",
  "store",
  /** V's hourly limit (0226, 2026-11-07): Premium offered in the chat window. */
  "v_hourly",
] as const;
export type PaywallGate = (typeof PAYWALL_GATES)[number];

/** checkout_opened is a PASS order; a book order is book_checkout_opened
 *  (2026-10-28), so the pass funnel's counts never include a book. "declined"
 *  is the student's one-tap reason for not buying (2026-11-05,
 *  lib/billing/declineReasons). */
export const PAYWALL_STEPS = [
  "shown",
  "checkout_opened",
  "book_checkout_opened",
  "checkout_dismissed",
  "verify_failed",
  "declined",
] as const;
export type PaywallStep = (typeof PAYWALL_STEPS)[number];

/**
 * Which download box met the student (2026-10-14). The "teacher" gate is one
 * gate on several boxes, so without this the offer's pages could not be told
 * apart (the free paper's `set_key` was the only clue).
 */
export const DOWNLOAD_BOXES = ["browse", "mock", "board_paper", "homework", "top_pyqs", "formula", "revision"] as const;
export type DownloadBox = (typeof DOWNLOAD_BOXES)[number];
const BOX_SET: ReadonlySet<string> = new Set(DOWNLOAD_BOXES);

/** The box an order request names, or undefined for anything unknown. */
export function checkoutBox(v: unknown): DownloadBox | undefined {
  return typeof v === "string" && BOX_SET.has(v) ? (v as DownloadBox) : undefined;
}

/** Steps a client may report. The others are written by the billing routes. */
const CLIENT_STEPS: ReadonlySet<string> = new Set<PaywallStep>(["shown", "checkout_dismissed", "declined"]);
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
  return v === "teacher" || v === "reveals" || v === "v_hourly" ? v : "pricing";
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

/**
 * A student's reason for not buying (2026-11-05). One answer per student per
 * offer (gate, and box when named) per IST day: the first tap stands.
 */
export function paywallDeclinedEvent(
  gate: PaywallGate,
  reason: DeclineReason,
  afterCheckout: boolean,
  dedupe: { userId: string; now: Date },
  planId?: string,
  box?: DownloadBox,
  onClose = false
): ActivityEvent {
  const metadata: Record<string, unknown> = box
    ? { step: "declined", gate, box, reason, afterCheckout }
    : { step: "declined", gate, reason, afterCheckout };
  // Asked in the toast after the offer closed (2026-11-06); absent = in the box.
  if (onClose) metadata.onClose = true;
  const event: ActivityEvent = {
    kind: "paywall_event",
    metadata,
    dedupeKey: `paywall:declined:${gate}:${box ? `${box}:` : ""}${dedupe.userId}:${istDayKey(dedupe.now)}`,
  };
  if (planId) {
    event.refId = planId;
    event.refKind = "plan";
  }
  return event;
}

/** The order route's record of a book order created on Razorpay, for /dashboard/sales (0199). */
export function bookCheckoutEvent(ebookSlug: string): ActivityEvent {
  return {
    kind: "paywall_event",
    refId: ebookSlug,
    refKind: "ebook",
    metadata: { step: "book_checkout_opened", gate: "store" },
  };
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
    } else if (raw.surface === "learn_start") {
      // A lesson begun names its lesson (2026-10-28); no other page will do.
      const lesson = typeof raw.path === "string" ? learnLessonPath(raw.path) : null;
      if (!lesson) return { ok: false, error: "Invalid lesson address." };
      path = lesson;
    } else if (raw.surface === "board_revision") {
      // A revision sheet opened names its /board chapter (2026-11-03).
      const chapterPath = typeof raw.path === "string" ? boardChapterPath(raw.path) : null;
      if (!chapterPath) return { ok: false, error: "Invalid chapter address." };
      path = chapterPath;
    } else if (raw.surface === "exam_twin") {
      // An exam twin opened names its page: a /board chapter or a homework page (2026-11-06).
      const address = typeof raw.path === "string" ? raw.path : "";
      const view = readingViewFor(address);
      const twinPath = boardChapterPath(address) ?? (view?.surface === "homework" ? view.path : null);
      if (!twinPath) return { ok: false, error: "Invalid page address." };
      path = twinPath;
    } else if (raw.path !== undefined) {
      return { ok: false, error: "No page address on this surface." };
    }
    // The chapter line seen (2026-11-07) names its chapter and its page's
    // drill tag, and is counted once per chapter per day, the same grain as
    // the experiment's baseline (chapter-days). Nothing else carries either.
    if (raw.surface === "chapter_fix") {
      if (typeof raw.chapterId !== "string" || !UUID_RE.test(raw.chapterId)) {
        return { ok: false, error: "Invalid chapter id." };
      }
      if (typeof raw.from !== "string" || !CHAPTER_FIX_FROM_SET.has(raw.from)) {
        return { ok: false, error: "Unknown page." };
      }
      return {
        ok: true,
        value: {
          kind: "surface_viewed",
          metadata: { surface: "chapter_fix", chapterId: raw.chapterId, from: raw.from },
          dedupeKey: `view:chapter_fix:${raw.chapterId}:${userId}:${istDayKey(now)}`,
        },
      };
    }
    // Start next seen (once per page per day) and a chapter's Start tapped
    // (once per chapter per day), each naming its page (2026-11-09).
    if (raw.surface === "start_next" || raw.surface === "start_next_tap") {
      if (typeof raw.from !== "string" || !START_NEXT_FROM_SET.has(raw.from)) {
        return { ok: false, error: "Unknown page." };
      }
      if (raw.surface === "start_next") {
        if (raw.chapterId !== undefined) return { ok: false, error: "No chapter id on this surface." };
        return {
          ok: true,
          value: {
            kind: "surface_viewed",
            metadata: { surface: "start_next", from: raw.from },
            dedupeKey: `view:start_next:${raw.from}:${userId}:${istDayKey(now)}`,
          },
        };
      }
      if (typeof raw.chapterId !== "string" || !UUID_RE.test(raw.chapterId)) {
        return { ok: false, error: "Invalid chapter id." };
      }
      return {
        ok: true,
        value: {
          kind: "surface_viewed",
          metadata: { surface: "start_next_tap", chapterId: raw.chapterId, from: raw.from },
          dedupeKey: `view:start_next_tap:${raw.chapterId}:${userId}:${istDayKey(now)}`,
        },
      };
    }
    if (raw.chapterId !== undefined || raw.from !== undefined) {
      return { ok: false, error: "No chapter id on this surface." };
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
    if (raw.step === "declined") {
      if (!isDeclineReason(raw.reason)) return { ok: false, error: "Unknown reason." };
      if (raw.afterCheckout !== undefined && typeof raw.afterCheckout !== "boolean") {
        return { ok: false, error: "Invalid afterCheckout." };
      }
      const afterCheckout = raw.afterCheckout === true;
      if (AFTER_CHECKOUT_ONLY.has(raw.reason) && !afterCheckout) {
        return { ok: false, error: "That reason needs a checkout first." };
      }
      if (raw.onClose !== undefined && typeof raw.onClose !== "boolean") {
        return { ok: false, error: "Invalid onClose." };
      }
      return {
        ok: true,
        value: paywallDeclinedEvent(
          raw.gate as PaywallGate,
          raw.reason,
          afterCheckout,
          { userId, now },
          planId,
          box,
          raw.onClose === true
        ),
      };
    }
    if (raw.reason !== undefined || raw.afterCheckout !== undefined || raw.onClose !== undefined) {
      return { ok: false, error: "A reason belongs to a declined offer only." };
    }
    return {
      ok: true,
      value: paywallEvent(raw.step as PaywallStep, raw.gate as PaywallGate, planId, { userId, now }, box),
    };
  }

  return { ok: false, error: "That kind cannot be written by a client." };
}
