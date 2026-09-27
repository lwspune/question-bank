/**
 * The slide-up "test yourself" bar's display rule. Kept apart from
 * keepGoing.ts, which imports the whole notes registry: the bar is a client
 * island, and this file must stay free of that import. Spec:
 * tests/notes-keep-going.test.ts.
 */

/** Fraction of the page scrolled before the slide-up test bar may appear. */
export const TEST_BAR_SCROLL = 0.7;
/** At most one showing per device per day. */
export const TEST_BAR_GAP_MS = 24 * 60 * 60 * 1000;

/**
 * The slide-up bar replaces a pop-up: a modal over the content on a phone is
 * what Google demotes for visitors arriving from search, and these pages are
 * where search and AI traffic lands. It waits until the reader is most of the
 * way through, and shows at most once a day on a device.
 */
export function shouldShowTestBar(p: { scrollFraction: number; lastShownAt: number | null; now: number }): boolean {
  if (p.scrollFraction < TEST_BAR_SCROLL) return false;
  return p.lastShownAt === null || p.now - p.lastShownAt >= TEST_BAR_GAP_MS;
}
