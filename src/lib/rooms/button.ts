/**
 * Hiding the rooms button for focused study (owner, 2026-11-25; mockup H1-H4).
 * Saved on the account, student_profiles.rooms_button_hidden_until (migration
 * 0290): null = shown, a time = hidden until then, "infinity" = until the
 * student turns it back on. The rooms stay open from the account menu. Pure.
 * Spec: tests/rooms-identity.test.ts.
 */
export const HIDE_FOREVER = "infinity";
export const HIDE_HOURS = 2;

export type HideMode = "show" | "2h" | "off";

export function hideUntilFor(mode: HideMode, nowMs: number): string | null {
  if (mode === "show") return null;
  if (mode === "off") return HIDE_FOREVER;
  return new Date(nowMs + HIDE_HOURS * 3600_000).toISOString();
}

function forever(until: string): boolean {
  return until.toLowerCase() === HIDE_FOREVER;
}

export function buttonHidden(until: string | null, nowMs: number): boolean {
  if (!until) return false;
  if (forever(until)) return true;
  const t = Date.parse(until);
  return Number.isFinite(t) && t > nowMs;
}

/** Milliseconds until a timed hide ends; null when shown or hidden for good. */
export function msUntilShown(until: string | null, nowMs: number): number | null {
  if (!until || forever(until)) return null;
  const t = Date.parse(until);
  return Number.isFinite(t) && t > nowMs ? t - nowMs : null;
}

const TIME = new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });

export function hiddenLabel(until: string): string {
  return forever(until) ? "Button hidden" : `Button hidden until ${TIME.format(new Date(until))}`;
}

/** The Account card's line under "Hide for 2 hours". */
export function backAtLabel(until: string): string {
  return `Back at ${TIME.format(new Date(until))}`;
}

/** The toast after hiding: what happened and where the rooms went. */
export function hiddenToast(until: string): string {
  const when = forever(until) ? "" : ` until ${TIME.format(new Date(until))}`;
  return `Rooms button hidden${when}. Exam rooms are in your account menu.`;
}
