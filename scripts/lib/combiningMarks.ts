/**
 * Combining marks (the Combining Diacritical Marks block, 0x0300-0x036F) that
 * the notes serif does NOT ship. Its Google Fonts latin subset carries only
 * three of them (0x0304 macron, 0x0308 diaeresis, 0x0329 vertical line below,
 * checked 2026-10-05), so x-bar draws correctly; any other mark is borrowed
 * from another font and lands off its letter ("k" + 0x0302 drew its hat beside
 * the k). notes:latex fails on any hit.
 * Spec: tests/combining-marks.test.ts.
 *
 * Compared by code point, not with a regex escape, so the range can't be
 * mangled into literal characters by an editor.
 */
const FIRST = 0x0300;
const LAST = 0x036f;
/** In the serif's latin subset, so they attach properly. */
const SHIPPED = new Set([0x0304, 0x0308, 0x0329]);

export type CombiningHit = { mark: string; after: string };

export function findCombiningMarks(s: string): CombiningHit[] {
  const hits: CombiningHit[] = [];
  const chars = Array.from(s);
  chars.forEach((ch, i) => {
    const cp = ch.codePointAt(0) ?? 0;
    if (cp >= FIRST && cp <= LAST && !SHIPPED.has(cp)) {
      hits.push({
        mark: "U+" + cp.toString(16).toUpperCase().padStart(4, "0"),
        after: chars[i - 1] ?? "",
      });
    }
  });
  return hits;
}
