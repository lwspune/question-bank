/**
 * The free-mock limit as the admin page edits it (public.paywall_settings,
 * migration 0120). Pure: decides the next row from the current one.
 *
 * counts_from is the date the limit started counting and moves ONLY when the
 * limit is switched on. Resetting it on every save would hand every student a
 * fresh set of free mocks each time the number is edited.
 */

export type PaywallSettings = {
  /** null = the limit is off. */
  freeMockLimit: number | null;
  /** ISO; set when the limit was switched on, null while off. */
  countsFrom: string | null;
};

export type PaywallSettingsInput = { enabled: boolean; limit: number };

export function nextPaywallSettings(
  current: PaywallSettings,
  input: PaywallSettingsInput,
  nowIso: string
): { ok: true; next: PaywallSettings } | { ok: false; message: string } {
  if (!input.enabled) return { ok: true, next: { freeMockLimit: null, countsFrom: null } };
  if (!Number.isInteger(input.limit) || input.limit < 0) {
    return { ok: false, message: "Free mocks must be a whole number, zero or more." };
  }
  const wasOn = current.freeMockLimit !== null && current.countsFrom !== null;
  return {
    ok: true,
    next: { freeMockLimit: input.limit, countsFrom: wasOn ? current.countsFrom : nowIso },
  };
}
