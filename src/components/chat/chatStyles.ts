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

/**
 * The window: full screen on a phone, a full-height panel at the right from
 * `sm` up (owner, 2026-11-21). Shared with the frame V's launcher draws while
 * the window loads (PAGE_WEIGHT_SPEC.md item 2), so the two never differ.
 */
export const V_WINDOW =
  "fixed inset-0 flex h-[100dvh] w-full flex-col overflow-hidden bg-background sm:fixed sm:inset-auto sm:bottom-[max(1rem,env(safe-area-inset-bottom))] sm:right-4 sm:top-4 sm:h-auto sm:w-[30rem] sm:max-w-[calc(100vw-2rem)] sm:rounded-2xl sm:border sm:border-border sm:shadow-[0_28px_64px_-24px_rgb(15_29_74/0.55)] motion-safe:sm:animate-in motion-safe:sm:fade-in motion-safe:sm:slide-in-from-bottom-4 motion-safe:sm:duration-200";

/** The window's header band. */
export const V_WINDOW_HEADER =
  "hero-brand flex shrink-0 items-center justify-between px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:pt-3";
