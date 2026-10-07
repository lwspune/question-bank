/**
 * The free limits as the admin page edits them (public.paywall_settings,
 * migrations 0120 + 0134). Pure: decides the next row from the current one,
 * one limit at a time.
 *
 * A counts_from date is the day a lifetime limit started counting and moves
 * ONLY when that limit is switched on. Resetting it on every save would hand
 * every student a fresh set of free mocks each time the number is edited. Mocks
 * and chapter tests keep SEPARATE dates, so switching one on never restarts the
 * other. The per-day limits and the save limit carry no date: a day resets
 * itself, and a save is counted as it stands.
 */

export type PaywallSettings = {
  /** null = the limit is off. */
  freeMockLimit: number | null;
  /** ISO; set when the limit was switched on, null while off. */
  countsFrom: string | null;
  freeChapterTestLimit: number | null;
  chapterTestsCountsFrom: string | null;
  /** Drill questions answered per IST day. */
  freeDrillPerDay: number | null;
  /** Answer reveals per IST day, signed in. */
  freeRevealsPerDay: number | null;
  freeSaveLimit: number | null;
  /** Days the projected score stays free after the student reveals it. */
  projectionTrialDays: number | null;
  /** Different whole past papers ANY account may download per IST day (0137). */
  mockPapersPerDay: number | null;
};

export const PAYWALL_LIMITS = ["mocks", "chapterTests", "drill", "reveals", "saves", "projection", "paperDownloads"] as const;
export type PaywallLimit = (typeof PAYWALL_LIMITS)[number];

const LIMIT_SET: ReadonlySet<string> = new Set(PAYWALL_LIMITS);
export function isPaywallLimit(v: unknown): v is PaywallLimit {
  return typeof v === "string" && LIMIT_SET.has(v);
}

/** `which` defaults to "mocks", the form's only limit before 0134. */
export type PaywallSettingsInput = { which?: PaywallLimit; enabled: boolean; limit: number };

export const EMPTY_PAYWALL_SETTINGS: PaywallSettings = {
  freeMockLimit: null,
  countsFrom: null,
  freeChapterTestLimit: null,
  chapterTestsCountsFrom: null,
  freeDrillPerDay: null,
  freeRevealsPerDay: null,
  freeSaveLimit: null,
  projectionTrialDays: null,
  mockPapersPerDay: null,
};

/** The number field and, for a lifetime count, its date field. */
const FIELDS: Record<PaywallLimit, { value: keyof PaywallSettings; since?: keyof PaywallSettings }> = {
  mocks: { value: "freeMockLimit", since: "countsFrom" },
  chapterTests: { value: "freeChapterTestLimit", since: "chapterTestsCountsFrom" },
  drill: { value: "freeDrillPerDay" },
  reveals: { value: "freeRevealsPerDay" },
  saves: { value: "freeSaveLimit" },
  projection: { value: "projectionTrialDays" },
  paperDownloads: { value: "mockPapersPerDay" },
};

export function nextPaywallSettings(
  current: PaywallSettings,
  input: PaywallSettingsInput,
  nowIso: string
): { ok: true; next: PaywallSettings } | { ok: false; message: string } {
  const { value, since } = FIELDS[input.which ?? "mocks"];
  if (!input.enabled) {
    return { ok: true, next: { ...current, [value]: null, ...(since ? { [since]: null } : {}) } };
  }
  if (!Number.isInteger(input.limit) || input.limit < 0) {
    return { ok: false, message: "The limit must be a whole number, zero or more." };
  }
  const next: PaywallSettings = { ...current, [value]: input.limit };
  if (since) {
    const wasOn = current[value] !== null && current[since] !== null;
    (next as Record<string, unknown>)[since] = wasOn ? current[since] : nowIso;
  }
  return { ok: true, next };
}
