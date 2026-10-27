/**
 * V's settings (migration 0158), edited at /dashboard/chat: whether typed
 * questions get an AI answer, how many messages one person may send an hour,
 * and how many AI answers the whole site may give a day. Past the daily cap,
 * or with the AI off, V gives the owner's fixed reply (lib/chat/typed.ts).
 *
 * Pure. Spec: tests/chat-settings.test.ts.
 */

export type ChatSettings = {
  aiEnabled: boolean;
  /** "Ask V about this question": V explains a question from its stored solution (migration 0168). */
  explainEnabled: boolean;
  /** V plans the week (chat_settings.plan_enabled, 0170). */
  planEnabled: boolean;
  /** V's "How's my progress" button and card (chat_settings.progress_enabled, 0191). No AI call, so not behind aiEnabled. */
  progressEnabled: boolean;
  /** Messages one person may type per hour (signed in: per account; signed out: per connection). */
  perPersonPerHour: number;
  /** AI answers per IST day for the whole site. */
  aiAnswersPerDay: number;
};

/** Mirrors the table's defaults: nothing that calls the AI changes until the owner switches it on. */
export const DEFAULT_CHAT_SETTINGS: ChatSettings = { aiEnabled: false, explainEnabled: false, planEnabled: false, progressEnabled: true, perPersonPerHour: 15, aiAnswersPerDay: 300 };

export const PER_HOUR_RANGE = { min: 1, max: 200 } as const;
export const PER_DAY_RANGE = { min: 0, max: 5000 } as const;

function wholeIn(v: unknown, range: { min: number; max: number }): v is number {
  return typeof v === "number" && Number.isInteger(v) && v >= range.min && v <= range.max;
}

export function parseChatSettingsInput(
  body: unknown
): { ok: true; settings: ChatSettings } | { ok: false; message: string } {
  const b = (body ?? {}) as Record<string, unknown>;
  if (typeof b.aiEnabled !== "boolean") return { ok: false, message: "Missing the AI switch" };
  if (typeof b.explainEnabled !== "boolean") return { ok: false, message: "Missing the explanations switch" };
  if (typeof b.planEnabled !== "boolean") return { ok: false, message: "Missing the week-plan switch" };
  if (typeof b.progressEnabled !== "boolean") return { ok: false, message: "Missing the progress-card switch" };
  if (!wholeIn(b.perPersonPerHour, PER_HOUR_RANGE)) {
    return { ok: false, message: `Messages per hour must be a whole number from ${PER_HOUR_RANGE.min} to ${PER_HOUR_RANGE.max}` };
  }
  if (!wholeIn(b.aiAnswersPerDay, PER_DAY_RANGE)) {
    return { ok: false, message: `AI answers per day must be a whole number from ${PER_DAY_RANGE.min} to ${PER_DAY_RANGE.max}` };
  }
  return {
    ok: true,
    settings: {
      aiEnabled: b.aiEnabled,
      explainEnabled: b.explainEnabled,
      planEnabled: b.planEnabled,
      progressEnabled: b.progressEnabled,
      perPersonPerHour: b.perPersonPerHour,
      aiAnswersPerDay: b.aiAnswersPerDay,
    },
  };
}

/** The rate-limit bucket for one person. A class on one Wi-Fi is many people once signed in. */
export function personBucket(who: { userId: string | null; ip: string }): string {
  return who.userId ? `chat-typed:user:${who.userId}` : `chat-typed:anon:${who.ip}`;
}

const IST_OFFSET_MS = 330 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

/** Midnight in India for the day containing `now`. */
export function istDayStart(now: Date): Date {
  const istMs = now.getTime() + IST_OFFSET_MS;
  return new Date(Math.floor(istMs / DAY_MS) * DAY_MS - IST_OFFSET_MS);
}
