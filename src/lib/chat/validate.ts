/**
 * Pure validation for the "V" FAQ chatbot's POST /api/chat body. Mirrors
 * src/lib/contact/validate.ts in shape so the two never drift on style.
 */
export type ChatMessageInput = { message?: string };
export type ChatMessageValidation =
  | { ok: true; value: string }
  | { ok: false; message: string };

// A question, not an essay — also caps the tokens (and cost) of every call to V.
export const CHAT_MESSAGE_MAX = 500;

export function validateChatMessage(input: ChatMessageInput): ChatMessageValidation {
  const message = String(input.message ?? "").trim();
  if (!message) {
    return { ok: false, message: "Ask V a question first." };
  }
  if (message.length > CHAT_MESSAGE_MAX) {
    return {
      ok: false,
      message: `Keep it under ${CHAT_MESSAGE_MAX} characters.`,
    };
  }
  return { ok: true, value: message };
}
