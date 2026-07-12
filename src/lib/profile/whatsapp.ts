/**
 * Pure WhatsApp opt-in helper (Phase 3). Capture-only — this decides WHETHER to
 * show the opt-in prompt; actual WhatsApp dispatch is a separate integration not
 * built here. No I/O; unit-tested in tests/profile-whatsapp.test.ts.
 */

/** The row shape the prompt gate cares about. */
export type WhatsappState = { whatsappPromptedAt: string | null } | null | undefined;

/**
 * Should we show the "get your report on WhatsApp" card? True until the student
 * has decided either way (opted in OR declined) — both stamp `whatsapp_prompted_at`,
 * so we ask exactly once, mirroring the onboarding + mobile gates.
 */
export function needsWhatsappPrompt(state: WhatsappState): boolean {
  return !state?.whatsappPromptedAt;
}
