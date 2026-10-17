/**
 * The V window's message styles (2026-10-18), shared by the chat and the
 * practice-test builder so the two modes look the same. The gradients and
 * the typing dots live in globals.css (`.v-gradient`, `.v-typing-dot`);
 * the header is the site's `.hero-brand` band.
 */

/** A student's message: hugs its text, tail at the bottom right. */
export const USER_BUBBLE =
  "v-gradient ml-auto w-fit max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md px-3.5 py-2 text-sm text-white";

/** V's reply: a white card on the tinted window, tail at the bottom left. */
export const V_BUBBLE =
  "whitespace-pre-wrap break-words rounded-2xl rounded-bl-md border border-border/70 bg-card px-3.5 py-2 text-sm text-card-foreground shadow-sm";

/** Fades a new message in; nothing moves for reduced motion. */
export const MESSAGE_IN = "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:duration-300";
