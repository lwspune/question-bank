/**
 * SSC often printed a whole question as ONE picture: the sentence, the figure, and sometimes the
 * question line again under it. The bank stores that sentence as text, so a student read it twice.
 * stemTrimBox finds the sentence lines at the top and bottom of a stem picture and returns the box
 * that keeps the figure alone, or null when there is nothing to cut.
 *
 * A picture is read as horizontal BANDS of ink (rows with ink, small gaps merged). A band is a
 * SENTENCE LINE when it is line-height, its glyphs sit close (no gap wider than twice the line's
 * height, which is what separates "Figure 1   Figure 2" captions from words) and it starts at the
 * left edge. A chart's title is centred, so it stops the cut: it belongs to the chart. A run is
 * cut only if one of its lines spans half the picture (a real sentence, not a stray label), and
 * never when nothing but text would remain.
 */
export type Gray = { width: number; height: number; data: Uint8Array };
export type TrimBox = {
  top: number;
  bottom: number;
  left: number;
  right: number;
  removedTop: number;
  removedBottom: number;
  /** White rows between the cut lines and what is kept (null where nothing was cut). */
  gapTop: number | null;
  gapBottom: number | null;
};

const INK = 150; // darker than a scan's faint watermark and a chart's pale fills
const MARK = 200; // a pale mark (a chart's grey label), for the box round what is kept
const NEAR = 40; // ...but only within this distance of the dark ink
const FRINGE = 3; // a cut line's anti-aliased edge, kept out of that box
const ROW_GAP = 2; // rows of white inside one band (an i's dot, an accent)
const LINE_MIN = 5;
const LINE_MAX = 45;
const LEFT = 0.12; // a sentence starts within this share of the width
const WIDE = 0.5; // ...and one line of the run spans at least this share
const PAD = 6;
const COVER = 0.4; // words are mostly ink across the line; spaced labels (S1   S2   S3) are mostly white
const BOTTOM_GAP = 10; // a question line under a figure has clear space above it; axis labels hug the axis
const SAME_TYPE = 0.6; // a line of the sentence is at least this share of its tallest line
const HUG = 3; // a fragment this close to a cut line (a fraction's 1, a subscript) belongs to it

type Band = { y0: number; y1: number; x0: number; x1: number; clusters: number; maxGap: number; cover: number };

function bands(g: Gray): Band[] {
  const { width: w, height: h, data } = g;
  const rowInk = (y: number) => {
    for (let x = 0; x < w; x++) if (data[y * w + x] < INK) return true;
    return false;
  };
  const spans: [number, number][] = [];
  let y = 0;
  while (y < h) {
    if (!rowInk(y)) { y++; continue; }
    const y0 = y;
    let last = y;
    while (y < h && (rowInk(y) || y - last <= ROW_GAP)) {
      if (rowInk(y)) last = y;
      y++;
    }
    spans.push([y0, last + 1]);
    y = last + 1;
  }
  return spans.map(([y0, y1]) => {
    const col = new Array<boolean>(w).fill(false);
    for (let yy = y0; yy < y1; yy++) for (let x = 0; x < w; x++) if (data[yy * w + x] < INK) col[x] = true;
    let x0 = -1, x1 = -1, clusters = 0, maxGap = 0, gap = 0, inked = 0;
    for (let x = 0; x < w; x++) {
      if (col[x]) {
        inked++;
        if (x0 < 0) x0 = x;
        else if (gap > maxGap) maxGap = gap;
        if (x === 0 || !col[x - 1]) clusters++;
        x1 = x + 1;
        gap = 0;
      } else if (x0 >= 0) gap++;
    }
    return { y0, y1, x0, x1, clusters, maxGap, cover: x1 > x0 ? inked / (x1 - x0) : 0 };
  });
}

const isText = (b: Band) => {
  const h = b.y1 - b.y0;
  return h >= LINE_MIN && h <= LINE_MAX && b.clusters >= 2 && b.maxGap <= 2 * h && b.cover >= COVER;
};

/** A reviewed limit for one picture: cut at most this many lines (stem-trim-keep.json). */
export type TrimLimits = { maxTop?: number; maxBottom?: number };

export function stemTrimBox(g: Gray, limits: TrimLimits = {}): TrimBox | null {
  const bs = bands(g);
  // The sentence's own margin: where the leftmost text line starts. A chart at the left edge
  // puts its title and axis labels near it but not ON it (17 Jul 2023 S1 Q67 lost its labels).
  const margin = Math.min(...bs.filter(isText).map((b) => b.x0), Infinity);
  const tol = Math.max(3, 0.015 * g.width);
  const sentence = (b: Band) => isText(b) && b.x0 <= LEFT * g.width && b.x0 <= margin + tol;
  const real = (run: Band[]) =>
    run.some((b) => b.x1 - b.x0 >= WIDE * g.width) && run.reduce((n, b) => n + b.clusters, 0) >= 8;

  // A sentence is set in one type size; chart lettering near the margin is smaller (27 Jul 2023
  // S1 Q61 lost its top axis number). A run ends at the first line under SAME_TYPE of its tallest.
  const tallest = (run: Band[]) => Math.max(...run.map((b) => b.y1 - b.y0));
  let top = 0;
  while (top < bs.length && sentence(bs[top])) top++;
  const topH = top ? tallest(bs.slice(0, top)) : 0;
  for (let i = 0; i < top; i++) if (bs[i].y1 - bs[i].y0 < SAME_TYPE * topH) { top = i; break; }
  if (top && !real(bs.slice(0, top))) top = 0;
  // A run that wraps onto a close line in the same type, off the margin, is a centred title
  // whose first line happens to start at the edge (12 Sep 2024 S2 Q73), not a question.
  if (top && top < bs.length) {
    const last = bs[top - 1], next = bs[top];
    const h = last.y1 - last.y0, hn = next.y1 - next.y0;
    const centred = next.x0 > LEFT * g.width && Math.abs(next.x0 + next.x1 - last.x0 - last.x1) / 2 <= 0.03 * g.width;
    if (isText(next) && centred && next.y0 - last.y1 <= 0.8 * h && hn >= 0.8 * h && hn <= 1.25 * h) top = 0;
  }
  let bottom = bs.length;
  while (bottom > top && sentence(bs[bottom - 1])) bottom--;
  const bottomH = bottom < bs.length ? tallest(bs.slice(bottom)) : 0;
  for (let i = bs.length - 1; i >= bottom; i--) if (bs[i].y1 - bs[i].y0 < SAME_TYPE * bottomH) { bottom = i + 1; break; }
  if (bottom < bs.length && !real(bs.slice(bottom))) bottom = bs.length;

  const small = (b: Band, line: Band) => b.y1 - b.y0 <= 0.6 * (line.y1 - line.y0) && b.x1 - b.x0 <= 0.2 * g.width;
  while (top && top < bottom - 1 && bs[top].y0 - bs[top - 1].y1 <= HUG && small(bs[top], bs[top - 1])) top++;
  while (bottom < bs.length && bottom - 1 > top && bs[bottom].y0 - bs[bottom - 1].y1 <= HUG && small(bs[bottom - 1], bs[bottom])) bottom--;
  if (bottom < bs.length && bs[bottom].y0 - bs[bottom - 1].y1 < BOTTOM_GAP) bottom = bs.length;
  if (limits.maxTop !== undefined) top = Math.min(top, limits.maxTop);
  if (limits.maxBottom !== undefined) bottom = Math.max(bottom, bs.length - limits.maxBottom);

  const kept = bs.slice(top, bottom);
  if (top === 0 && bottom === bs.length) return null;
  if (!kept.some((b) => !isText(b))) return null; // text alone would remain: keep the picture whole

  // The box takes in pale marks between the cuts as well: the cut is decided on dark ink, but a
  // chart's grey labels lie lighter than that (12 Sep 2024 S1 Q58 lost its "10%"). Only marks NEAR
  // the dark ink count: a faint stray at the page edge stretched 24 Jul 2023 S1 Q22 across the page.
  const first = kept[0], end = kept[kept.length - 1];
  const lo = top ? Math.min(bs[top - 1].y1 + FRINGE, first.y0) : 0;
  const hi = bottom < bs.length ? Math.max(bs[bottom].y0 - FRINGE, end.y1) : g.height;
  // Start from the dark ink kept, so the box never loses any of it.
  const dx0 = Math.min(...kept.map((b) => b.x0)), dx1 = Math.max(...kept.map((b) => b.x1));
  let mx0 = dx0, mx1 = dx1, my0 = first.y0, my1 = end.y1;
  for (let y = Math.max(lo, first.y0 - NEAR); y < Math.min(hi, end.y1 + NEAR); y++)
    for (let x = Math.max(0, dx0 - NEAR); x < Math.min(g.width, dx1 + NEAR); x++)
      if (g.data[y * g.width + x] < MARK) {
        if (x < mx0) mx0 = x;
        if (x >= mx1) mx1 = x + 1;
        if (y < my0) my0 = y;
        if (y >= my1) my1 = y + 1;
      }
  const yTop = Math.max(lo, my0 - PAD);
  const yBottom = Math.min(hi, my1 + PAD);
  const xLeft = Math.max(0, mx0 - PAD);
  const xRight = Math.min(g.width, mx1 + PAD);
  const gapTop = top ? kept[0].y0 - bs[top - 1].y1 : null;
  const gapBottom = bottom < bs.length ? bs[bottom].y0 - kept[kept.length - 1].y1 : null;
  return { top: yTop, bottom: yBottom, left: xLeft, right: xRight, removedTop: top, removedBottom: bs.length - bottom, gapTop, gapBottom };
}
