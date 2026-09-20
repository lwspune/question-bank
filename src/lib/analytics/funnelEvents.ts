/**
 * Pure core for the ANON funnel telemetry sent to Vercel Web Analytics.
 *
 * THE AXIS, and why there are two instruments rather than one:
 *
 *   `user_activity` (migration 0052) records LEARNING, by a known student.
 *   This module records FUNNEL, by nobody in particular.
 *
 * They never overlap, so nothing is double-counted. `recordPractice` no-ops for
 * anonymous viewers on purpose — an anonymous visitor leaves no row anywhere,
 * which is the privacy posture as well as the cheap one. The cost of that choice
 * is that the three moments where a stranger is ASKED for something (sign in,
 * request a teacher account, hand over a mobile) only ever recorded the people
 * who said yes. Every conversion number the product has is a numerator with no
 * denominator. These six events are that denominator, and they are aggregate
 * counts that identify nobody.
 *
 * WHAT IS DELIBERATELY NOT HERE: anything a pageview already answers (a
 * /questions -> /browse hop, a /blog read — Vercel counts routes and referrers
 * for free), and anything signed-in and learning-shaped (user_activity owns it;
 * a second copy is free to drift). Every event below is an IN-PAGE interaction
 * with no URL change, which is exactly why pageviews cannot see it.
 *
 * READ EVERY COUNT AS A FLOOR. These are client-side pings: ad blockers, JS-off
 * and bots all suppress them. `quiz_gate_shown` minus `quiz_leads` rows is NOT
 * the abandonment rate — it is a floor on it. See the partial-instrumentation
 * finding that invalidated three earlier PMF conclusions.
 *
 * This module is pure (no env reads, no network, no React) so it is unit
 * testable; the client wrapper lives in trackFunnel.ts.
 */

/**
 * The closed set of funnel events. Adding one means adding an emitter too —
 * `tests/analytics-funnel-emitters.test.ts` asserts BOTH directions, because a
 * declared-but-unemitted name is a label that can never render (the defect
 * `get_pmf_snapshot` shipped with), and an emitted-but-undeclared name is a
 * silent spend that no reader knows to look for.
 *
 * Each `_shown`/`_hit` has a `_click`/`_submitted` partner on purpose: a count
 * of people who converted, without the count of people who were asked, is a
 * number with no scale.
 */
export const FUNNEL_EVENTS = [
  /** An anon viewer spent their free reveals and met the sign-in prompt. */
  "reveal_wall_hit",
  /** …and clicked Sign in from it. */
  "reveal_wall_signin_click",
  /** A non-staff visitor opened the download dialog and saw the teacher gate. */
  "teacher_gate_shown",
  /** …and clicked through to /request-access. */
  "teacher_gate_cta_click",
  /** An anon quiz taker reached the name+mobile gate. */
  "quiz_gate_shown",
  /** …and submitted it. */
  "quiz_gate_submitted",
] as const;

export type FunnelEvent = (typeof FUNNEL_EVENTS)[number];

/**
 * The Vercel Pro plan allows TWO custom properties per event (eight only with
 * the $10/month Web Analytics Plus add-on). This is a platform cap, not a
 * preference — a third property is dropped by Vercel, so we reject it here
 * where the loss is visible rather than letting it vanish in transit.
 */
export const MAX_FUNNEL_PROPS = 2;

/** Vercel rejects an event name, key or value longer than this. */
export const MAX_FUNNEL_VALUE_LEN = 255;

/** Vercel accepts these four value types; nested objects are not supported. */
export type FunnelPropValue = string | number | boolean | null;
export type FunnelProps = Record<string, FunnelPropValue>;

export type FunnelPayload = { name: FunnelEvent; props?: FunnelProps };

export type BuildFunnelResult =
  | { ok: true; value: FunnelPayload }
  | { ok: false; error: string };

const EVENT_SET: ReadonlySet<string> = new Set(FUNNEL_EVENTS);

export function isFunnelEvent(v: unknown): v is FunnelEvent {
  return typeof v === "string" && EVENT_SET.has(v);
}

const EMAIL_RE = /[^\s@]+@[^\s@]+\.[^\s@]{2,}/;

/**
 * Separators a phone number is commonly written with. Stripped before the digit
 * -run test so "+91 98765 43210" and "98765-43210" are both caught.
 */
const PHONE_SEPARATORS = /[\s()+.-]/g;

/** Ten or more consecutive digits — an Indian mobile is exactly ten. */
const LONG_DIGIT_RUN = /\d{10,}/;

/**
 * Reject anything shaped like a person. `quiz_gate_submitted` fires on the one
 * form in the product that captures a name and a mobile number, so this guard
 * is load-bearing rather than decorative: it is what keeps an aggregate counter
 * from quietly becoming a DPDP problem.
 *
 * KNOWN, DELIBERATE FALSE POSITIVE: a value that is genuinely ten-plus
 * consecutive digits (a millisecond timestamp, a raw uuid whose hex happens to
 * run long) is rejected too. That direction is the safe one — a dropped event
 * costs a count, a leaked one costs a person — and nothing here passes either.
 */
function looksPersonal(value: FunnelPropValue): boolean {
  if (typeof value !== "string") return false;
  if (EMAIL_RE.test(value)) return true;
  return LONG_DIGIT_RUN.test(value.replace(PHONE_SEPARATORS, ""));
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function isPropValue(v: unknown): v is FunnelPropValue {
  return v === null || typeof v === "string" || typeof v === "number" || typeof v === "boolean";
}

/**
 * Validate an event before it is sent. Returns a result rather than throwing —
 * telemetry must never take down the interaction it is observing.
 */
export function buildFunnelEvent(name: unknown, props?: unknown): BuildFunnelResult {
  if (!isFunnelEvent(name)) return { ok: false, error: `Unknown funnel event: ${String(name)}` };

  if (props === undefined) return { ok: true, value: { name } };
  if (!isPlainObject(props)) return { ok: false, error: "Properties must be a plain object." };

  const keys = Object.keys(props);
  if (keys.length === 0) return { ok: true, value: { name } };
  if (keys.length > MAX_FUNNEL_PROPS)
    return {
      ok: false,
      error: `Too many properties (${keys.length}); the Pro plan allows ${MAX_FUNNEL_PROPS}.`,
    };

  const out: FunnelProps = {};
  for (const key of keys) {
    if (key.length === 0 || key.length > MAX_FUNNEL_VALUE_LEN)
      return { ok: false, error: `Property key out of range: ${key.slice(0, 32)}` };

    const value = props[key];
    if (!isPropValue(value))
      return { ok: false, error: `Property "${key}" must be a string, number, boolean or null.` };
    if (typeof value === "string" && value.length > MAX_FUNNEL_VALUE_LEN)
      return { ok: false, error: `Property "${key}" exceeds ${MAX_FUNNEL_VALUE_LEN} characters.` };
    if (looksPersonal(value))
      return { ok: false, error: `Property "${key}" looks like personal data; refusing to send it.` };

    out[key] = value;
  }
  return { ok: true, value: { name, props: out } };
}

/**
 * The granular kill switch, read from `NEXT_PUBLIC_FUNNEL_ANALYTICS`.
 *
 * DEFAULT IS ON, and that direction is deliberate. A missing or mistyped
 * variable on a fresh environment would, under a default-off rule, silently
 * kill the feature and leave nothing to find — the "skipped step leaves no
 * error" failure. Under default-on the worst case is a few rupees of events.
 * So only an EXPLICIT opt-out disables.
 *
 * Note this is a BUILD-TIME switch: Next inlines NEXT_PUBLIC_* into the client
 * bundle, so changing it needs a redeploy. The instant switch is the Vercel
 * dashboard's own Web Analytics toggle, which kills pageviews too.
 */
const OPT_OUT = new Set(["off", "0", "false", "no"]);

export function isFunnelAnalyticsEnabled(raw: string | undefined): boolean {
  if (typeof raw !== "string") return true;
  const v = raw.trim().toLowerCase();
  if (v.length === 0) return true;
  return !OPT_OUT.has(v);
}
