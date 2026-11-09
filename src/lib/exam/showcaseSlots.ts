/**
 * Where each card of the homepage exam carousel sits (2026-11-09). Pure and
 * import-free, so the client component can load it without the registry or
 * the server loaders that lib/exam/examShowcase.ts uses. The server render and
 * the client move cards with the same two functions.
 * Spec: tests/exam-showcase.test.ts.
 */

/** A card further than this from the front is hidden. */
const VISIBLE_REACH = 2.6;
/**
 * Card `i`'s signed distance from position `pos` round a ring of `n` cards:
 * 0 is the front card, negative to its left. `pos` is fractional while a card
 * is being dragged. Always within half the ring, so the card that wraps round
 * comes in from behind, not across the front.
 */
export function wrapOffset(i: number, pos: number, n: number): number {
  const d = (((i - pos) % n) + n) % n;
  return d > n / 2 ? d - n : d;
}

export type SlotStyle = {
  /** Degrees about the vertical axis; side cards turn towards the middle. */
  rotateY: number;
  scale: number;
  /** Depth in px; side cards sit further back. */
  z: number;
  zIndex: number;
  /** 0 to 0.6: how much the card is dimmed. */
  shade: number;
  hidden: boolean;
};

/** How a card `d` places from the front is drawn. Symmetric either side. */
export function slotStyle(d: number): SlotStyle {
  const a = Math.abs(d);
  const round = (x: number) => Math.round(x * 1000) / 1000;
  return {
    rotateY: round(Math.max(-50, Math.min(50, -d * 24))) + 0,
    scale: round(1 - Math.min(a, 3) * 0.07),
    z: round(-a * 150) + 0,
    zIndex: 100 - Math.round(a * 10),
    shade: round(Math.min(0.6, a * 0.3)),
    hidden: a > VISIBLE_REACH,
  };
}
