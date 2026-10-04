/**
 * Which one-time ask the mock result page offers (PUSH_SPEC.md §3). No I/O;
 * unit-tested in tests/push-ask.test.ts.
 *
 * The push ask comes first and the WhatsApp card waits for a later visit, so a
 * screen never carries two asks. The server knows only the stamps; whether
 * THIS browser can push is known after mount, so when both are due the push
 * card is given the WhatsApp card as its fallback and renders it itself if it
 * cannot ask. Without that, an iPhone — which can never answer the push ask,
 * so never stamps it — would never see the WhatsApp card again.
 */

export type PushState = { pushPromptedAt: string | null } | null | undefined;

/** True until the student has answered the push ask either way. */
export function needsPushPrompt(state: PushState): boolean {
  return !state?.pushPromptedAt;
}

export function resultPageAsk(state: {
  pushPromptedAt: string | null;
  whatsappPromptedAt: string | null;
}): { push: boolean; whatsapp: boolean } {
  return { push: !state.pushPromptedAt, whatsapp: !state.whatsappPromptedAt };
}
