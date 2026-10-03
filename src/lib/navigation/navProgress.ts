/**
 * Which taps start the top-of-page loading bar.
 *
 * WHY: Clarity (2026-10-02) recorded "Sign in to start" tapped 8 times and
 * "Open chapter notes" 6 times before each page opened. Both destinations
 * answer in under 0.6 s, but on a phone the switch takes a second or two and
 * nothing on screen moved in that time, so people tapped again. The bar starts
 * on the tap itself; this decides which taps are a real page change.
 *
 * Pure: the component reads the click and the anchor, this reads only values.
 */
export type NavTap = {
  /** The anchor's resolved href (`anchor.href`, always absolute). */
  href: string;
  /** `location.href` at the moment of the tap. */
  current: string;
  /** The anchor's `target` attribute, or null. */
  target: string | null;
  /** The anchor carries a `download` attribute. */
  download: boolean;
  /** `MouseEvent.button`; 0 is the main button. */
  button: number;
  /** Ctrl, Meta, Shift or Alt held: the browser opens a new tab or window. */
  modifier: boolean;
};

export function shouldStartNavProgress(tap: NavTap): boolean {
  if (tap.button !== 0 || tap.modifier || tap.download) return false;
  if (tap.target && tap.target !== "_self") return false;

  let to: URL;
  let from: URL;
  try {
    to = new URL(tap.href);
    from = new URL(tap.current);
  } catch {
    return false;
  }
  if (to.protocol !== "http:" && to.protocol !== "https:") return false;
  if (to.origin !== from.origin) return false;
  // Files and redirects, not pages: the router never reports them finished.
  if (to.pathname.startsWith("/api/")) return false;
  // Same page (an in-page anchor included): nothing will load.
  return to.pathname !== from.pathname || to.search !== from.search;
}
