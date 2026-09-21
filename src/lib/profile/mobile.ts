/**
 * Pure mobile-number helpers for STUDENT ACCOUNTS — normalisation/validation and
 * the "gate the reward" decision used at the mock result page.
 *
 * This is the CANONICAL home for `normalizeMobile` / `isValidIndianMobile`
 * (relocated from src/lib/quiz/leads.ts, which now re-exports them for
 * back-compat). Both the public quiz-lead funnel (anonymous, mobile = identity)
 * and the account-mobile capture (signed-in, mobile stored on student_profiles)
 * share this one normalizer so a number is stored the same way everywhere and
 * an account can later be correlated to a quiz lead by mobile.
 *
 * No I/O — unit-tested in tests/profile-mobile.test.ts.
 */

/**
 * Normalise an Indian mobile to canonical `91XXXXXXXXXX` (12 digits), or null if
 * it isn't a plausible Indian mobile. Accepts spaces/dashes, a `+91`/`91`/`0`
 * prefix, and requires the 10-digit subscriber number to start 6-9.
 */
export function normalizeMobile(raw: string | null | undefined): string | null {
  const digits = String(raw ?? "").replace(/\D/g, "");
  let ten: string | null = null;
  if (digits.length === 10) ten = digits;
  else if (digits.length === 11 && digits.startsWith("0")) ten = digits.slice(1);
  else if (digits.length === 12 && digits.startsWith("91")) ten = digits.slice(2);
  if (!ten || !/^[6-9]\d{9}$/.test(ten)) return null;
  return `91${ten}`;
}

export function isValidIndianMobile(raw: string | null | undefined): boolean {
  return normalizeMobile(raw) !== null;
}

/** The row shape the gate cares about — just whether a mobile is on file. */
export type ProfileMobile = { mobile: string | null } | null | undefined;

/**
 * Gate decision: does this student still need to give a mobile before we reveal
 * a reward (the mock result)? True when there's no profile or no mobile yet.
 * Once a mobile is stored we never ask again — retakes reveal immediately.
 */
export function needsMobile(profile: ProfileMobile): boolean {
  return !profile?.mobile;
}

export type MobileSubmission = { mobile: string; consent: boolean };

export type MobileValidation =
  | { ok: true; mobile: string }
  | { ok: false; field: "mobile" | "consent"; message: string };

/**
 * Validate a mobile-capture submission. Field order (mobile → consent) so the
 * first surfaced error maps to the topmost field. On success returns the
 * CANONICAL `91XXXXXXXXXX` form ready to persist. Consent must be affirmatively
 * true (DPDP), mirroring the public-quiz funnel.
 */
export function validateMobileSubmission(input: MobileSubmission): MobileValidation {
  const mobile = normalizeMobile(input.mobile);
  if (!mobile) {
    return { ok: false, field: "mobile", message: "Enter a valid 10-digit mobile number." };
  }
  if (input.consent !== true) {
    return { ok: false, field: "consent", message: "Please accept the consent to continue." };
  }
  return { ok: true, mobile };
}

/**
 * A `wa.me` deep link for a stored mobile, or null when the number isn't one
 * WhatsApp will accept.
 *
 * `wa.me` rather than `web.whatsapp.com/send?phone=`: the latter is desktop-only
 * and dead-ends on a phone, while wa.me redirects to WhatsApp Web on desktop and
 * opens the app on mobile — same destination, one link. Matches the recipient-less
 * share link in src/lib/mocks/share.ts.
 *
 * Returns null rather than linking a malformed number: wa.me answers one with a
 * "phone number shared via url is invalid" page, which is worse than plain text.
 * Every stored number today is already canonical `91XXXXXXXXXX` (201 of 201 across
 * quiz_leads / student_profiles / teacher_access_requests / contact_messages,
 * checked 2026-09-21) — this guards the next write path, not the current rows.
 */
export function whatsappHref(mobile: string | null | undefined): string | null {
  const normalized = normalizeMobile(mobile);
  return normalized ? `https://wa.me/${normalized}` : null;
}
