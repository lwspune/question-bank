/**
 * A maths line (algebra steps) is drawn at a size estimated from its text, but
 * only the browser knows KaTeX's real width, so once a line is laid out it is
 * measured and, if wider than its box, shrunk to fit (owner review, 2026-10-29:
 * an estimate cut "h = -0.001" to "h = -0.00"). Used by the player and by the
 * review sheet, so the sheet shows what students see.
 * Spec: tests/visuals-fit-math.test.ts.
 */

/** The size a line drawn at `base` px needs so `scrollW` fits in `clientW`. */
export function fittedSize(base: number, clientW: number, scrollW: number): number {
  if (clientW <= 0 || scrollW <= clientW) return base;
  return Math.max(9, Math.floor(base * (clientW / scrollW) * 0.97 * 10) / 10);
}

/**
 * Shrinks every maths line under `root` that overflows its box. The player calls
 * it on every animation frame, so a line is measured again only when its text,
 * starting size or box width has changed since it was last fitted. `force`
 * re-measures every line: once KaTeX's fonts have loaded, since a line measured
 * in the fallback font looks narrower than it is.
 */
export function fitMathLines(root: ParentNode, force = false): void {
  root.querySelectorAll<HTMLElement>("[data-viz-math]").forEach((el) => {
    const seen = `${el.textContent?.length ?? 0}|${el.dataset.vizMath}|${el.clientWidth}`;
    if (!force && el.dataset.vizFitted === seen) return;
    fitMathLine(el);
    el.dataset.vizFitted = seen;
  });
}

/**
 * Fits one line: KaTeX's width does not scale exactly with the font size, so
 * one shrink can leave it a pixel over; it shrinks again, at most three times.
 * Self-contained apart from fittedSize, so the review sheet can embed both.
 */
export function fitMathLine(el: HTMLElement): boolean {
  let size = Number(el.dataset.vizMath);
  el.style.fontSize = `${size}px`;
  for (let i = 0; i < 3 && el.scrollWidth > el.clientWidth && size > 9; i++) {
    size = fittedSize(size, el.clientWidth, el.scrollWidth);
    el.style.fontSize = `${size}px`;
  }
  return el.scrollWidth <= el.clientWidth + 1;
}
