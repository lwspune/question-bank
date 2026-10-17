/**
 * The CGL 2025 Tier II sheet: the TCS response sheet scanned to one picture per page, with no
 * text layer at all, so not even the "Q.n" labels can be read. raster_extract.py measures each
 * page's pixels; assembleRaster (pure, tested in tests/ssc-cgl-raster.test.ts) turns that into
 * questions. What it relies on, all checked rather than assumed:
 * - every question has four option rows, each with a tick (green, the key) or a cross (red) in
 *   the icon column, so the icons in page order fall into runs of four, one tick each, and the
 *   paper's total is the layout's question count times four;
 * - each question's options sit on one page, and its panel (Question ID .. Chosen Option: the
 *   candidate's own answer, never shown to a transcriber) follows them before the next
 *   question's options begin;
 * - the modules print in layout order, so the n-th run of four is question n.
 * A question's crop runs from the end of the previous question's panel to the top of its own,
 * so a passage or a module heading printed above a question travels with it.
 */
import type { Section } from "./config";
import type { Label, Part } from "./lib";

export type RasterIcon = { kind: "tick" | "cross"; y0: number; y1: number; x0: number; x1: number; n: number };
export type RasterPanel = { y0: number; y1: number; lines: number };
export type RasterPage = { page: number; width: number; height: number; icons: RasterIcon[]; panels: RasterPanel[] };
export type RasterGeometry = { pages: RasterPage[] };
export type RasterRegion = { page: number; y0: number; y1: number };
export type RasterQuestion = {
  number: number;
  part: Part;
  key: Label;
  /** the crop, page by page */
  regions: RasterRegion[];
  /** each option row's icon band, A-D, for masking */
  optionRows: RasterRegion[];
  /** its panel (never shown: the crop stops above it, and the sheet paints out the box's edges) */
  panel: RasterRegion;
};

const LABELS: Label[] = ["A", "B", "C", "D"];
/** The panel prints seven lines (Question ID, four Option IDs, Status, Chosen Option); a stem tail is one to three. */
const PANEL_LINES = 5;
/** AglaSem's footer ("aglasem.com ... Page n of 86") runs below this many pixels from the page bottom. */
const FOOTER = 60;

type At = { page: number; y: number };
const before = (a: At, b: At) => a.page < b.page || (a.page === b.page && a.y < b.y);

export function assembleRaster(g: RasterGeometry, layout: Section[]): RasterQuestion[] {
  const total = layout.reduce((n, s) => n + s.count, 0);
  const icons = g.pages.flatMap((p) => [...p.icons].sort((a, b) => a.y0 - b.y0).map((i) => ({ ...i, page: p.page })));
  if (icons.length !== total * 4) throw new Error(`${icons.length} icons, expected ${total * 4} (${total} questions x 4)`);
  const panels = g.pages.flatMap((p) => p.panels.filter((b) => b.lines >= PANEL_LINES).map((b) => ({ ...b, page: p.page })));
  const pageOf = new Map(g.pages.map((p) => [p.page, p]));
  const bottom = (page: number) => pageOf.get(page)!.height - FOOTER;

  const groups = Array.from({ length: total }, (_, i) => icons.slice(i * 4, i * 4 + 4));
  const out: RasterQuestion[] = [];
  let start: At = { page: g.pages[0].page, y: 0 };
  let sec = 0;
  let inSec = 0;
  groups.forEach((rows, i) => {
    const n = i + 1;
    const pages = [...new Set(rows.map((r) => r.page))];
    if (pages.length > 1) throw new Error(`Q${n}: its options run over pages ${pages.join("-")}`);
    const ticks = rows.flatMap((r, k) => (r.kind === "tick" ? [k] : []));
    if (ticks.length !== 1) throw new Error(`Q${n}: expected exactly one tick, found ${ticks.length}`);

    const last: At = { page: pages[0], y: rows[3].y1 };
    const next = groups[i + 1]?.[0];
    const panel = panels.find((p) => before(last, { page: p.page, y: p.y0 }));
    if (!panel || (next && !before({ page: panel.page, y: panel.y1 }, { page: next.page, y: next.y0 })))
      throw new Error(`Q${n}: no panel after its options (page ${pages[0]})`);

    const regions: RasterRegion[] = [];
    for (let p = start.page; p <= panel.page; p++) {
      if (!pageOf.has(p)) continue;
      const y0 = p === start.page ? start.y : 0;
      const y1 = p === panel.page ? panel.y0 - 1 : bottom(p);
      if (y1 > y0) regions.push({ page: p, y0, y1 });
    }

    while (inSec >= layout[sec].count) {
      sec++;
      inSec = 0;
    }
    inSec++;
    out.push({
      number: n,
      part: layout[sec].part,
      key: LABELS[ticks[0]],
      regions,
      optionRows: rows.map((r) => ({ page: r.page, y0: r.y0, y1: r.y1 })),
      panel: { page: panel.page, y0: panel.y0, y1: panel.y1 },
    });
    start = { page: panel.page, y: panel.y1 + 1 };
  });
  return out;
}
