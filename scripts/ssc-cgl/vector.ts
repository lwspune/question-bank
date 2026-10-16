/**
 * The 2022 vector print of SSC's response sheet (5-13 Dec 2022): the same TCS sheet as
 * tcs.ts reads, printed with every glyph outlined, so there is NO text layer. What is left
 * to read is geometry, which tcs_extract.py records:
 * - frames: each question sits in a wide grey-stroked frame, one per page it covers;
 * - panels: the right-hand box (Question ID / Status / Chosen Option) inside a question's
 *   LAST frame, so a question is the run of frames up to and including one holding a panel;
 * - icons: the tick or cross beside each option, drawn as a small picture. The tick is an
 *   84x84 (or 84x83) image and the cross 31x21, so the picture's size IS the key.
 * Numbering is by order (the print's own "Q.n" labels are glyphs), 25 to a part, A-D.
 * The date and shift come from the file (config), since the header is glyphs too.
 *
 * The 2023 scans (17-24 Jul, 14 Jul from 2:30) are the same print with two differences: the
 * tick is a 23x23 picture, and each sheet's FIRST page is one raster picture with an OCR text
 * layer. That page has no frames, panels or icon pictures, so its questions are found by
 * their OCR "Q.n" labels and keyed by `marks`, the green tick and red crosses tcs_extract.py
 * reads off its pixels.
 */
import type { Part } from "./lib";
import type { TcsImage, TcsRegion } from "./tcs";

export type VectorBox = { page: number; x0: number; y0: number; x1: number; y1: number };
export type VectorIcon = VectorBox & { w: number; h: number };
export type VectorMark = VectorBox & { kind: "tick" | "cross" };
export type VectorSpan = VectorBox & { text: string };
export type VectorGeometry = {
  frames: VectorBox[];
  panels: VectorBox[];
  icons: VectorIcon[];
  images: TcsImage[];
  /** raster pages only: the tick and crosses read off the pixels */
  marks?: VectorMark[];
  spans?: VectorSpan[];
};
export type VectorQuestion = {
  number: number;
  part: Part;
  key: "A" | "B" | "C" | "D";
  regions: TcsRegion[];
  stemImages: string[];
  optionImages: string[][];
};

const LABELS = ["A", "B", "C", "D"] as const;
const PARTS: Part[] = ["A", "B", "C", "D"];
// 2022 draws the tick 84x84 (or 84x83), 2023 23x23: square either way, unlike the 31x21 cross.
const isTick = (i: VectorIcon) => (i.w >= 60 && i.h >= 60) || (i.w >= 20 && i.w <= 26 && Math.abs(i.w - i.h) <= 2);
const isCross = (i: VectorIcon) => i.w >= 25 && i.w <= 40 && i.h >= 15 && i.h <= 25 && i.w > i.h;
const order = (a: VectorBox, b: VectorBox) => a.page - b.page || a.y0 - b.y0;
const inside = (b: VectorBox, f: VectorBox) => b.page === f.page && b.y0 >= f.y0 - 1 && b.y1 <= f.y1 + 1;

export function assembleVector(g: VectorGeometry): VectorQuestion[] {
  const frames = [...g.frames].sort(order);
  const groups: VectorBox[][] = [];
  let cur: VectorBox[] = [];
  for (const f of frames) {
    cur.push(f);
    if (g.panels.some((p) => inside(p, f))) {
      groups.push(cur);
      cur = [];
    }
  }
  // Raster-page questions and vector questions, in print order, then numbered.
  const items: { page: number; y: number; make: (n: number) => VectorQuestion }[] = [
    ...rasterQuestions(g),
    ...groups.map((fs) => ({ page: fs[0].page, y: fs[0].y0, make: (n: number) => read(g, fs, n) })),
  ].sort((a, b) => a.page - b.page || a.y - b.y);
  if (!items.length || items.length % 100) throw new Error(`${items.length} questions found (frames ending in a panel box), expected 100`);

  const all = items.map((it, i) => it.make((i % 100) + 1));
  // Several candidates' sheets of one paper in one file: keep the first, after checking the
  // copies agree (same key, question by question). Different papers in one file are refused.
  const first = all.slice(0, 100);
  for (let c = 1; c < all.length / 100; c++) {
    const copy = all.slice(c * 100, c * 100 + 100);
    if (copy.some((q, k) => q.key !== first[k].key)) throw new Error(`copies differ: sheet ${c + 1} of the file is not the same paper as sheet 1`);
  }
  return first;
}

const Q_LABEL = /^Q\.\s?\d+/;
const FOOTER = /aglasem\.com|^Page \d+ of/;

/**
 * A raster page's questions: each OCR "Q.n" label opens one, running to the next label or to
 * the page footer; its key is the one tick among the four marks inside it.
 */
function rasterQuestions(g: VectorGeometry): { page: number; y: number; make: (n: number) => VectorQuestion }[] {
  const marks = g.marks ?? [];
  const spans = g.spans ?? [];
  return [...new Set(marks.map((m) => m.page))].flatMap((page) => {
    const labels = spans.filter((s) => s.page === page && Q_LABEL.test(s.text.trim())).sort((a, b) => a.y0 - b.y0);
    if (!labels.length) throw new Error(`raster page ${page}: marks but no "Q.n" label`);
    const footer = Math.min(...spans.filter((s) => s.page === page && s.y0 > 600 && FOOTER.test(s.text.trim())).map((s) => s.y0));
    return labels.map((l, k) => {
      const y0 = l.y0 - 4;
      const y1 = k + 1 < labels.length ? labels[k + 1].y0 - 4 : Number.isFinite(footer) ? footer - 4 : Math.max(...marks.filter((m) => m.page === page).map((m) => m.y1)) + 80;
      const mine = marks.filter((m) => m.page === page && m.y0 >= y0 && m.y1 <= y1).sort((a, b) => a.y0 - b.y0);
      const ticks = mine.map((m, i) => (m.kind === "tick" ? i : -1)).filter((i) => i >= 0);
      const name = l.text.trim().match(Q_LABEL)![0];
      if (mine.length !== 4 || ticks.length !== 1) throw new Error(`raster ${name}: ${mine.length} marks, ${ticks.length} ticks`);
      return {
        page,
        y: y0,
        make: (number: number): VectorQuestion => ({
          number,
          part: PARTS[Math.floor((number - 1) / 25)],
          key: LABELS[ticks[0]],
          regions: [{ page, y0, y1, raster: true }],
          stemImages: [],
          optionImages: [[], [], [], []],
        }),
      };
    });
  });
}

function read(g: VectorGeometry, fs: VectorBox[], number: number): VectorQuestion {
  {
    const i = number - 1;
    // Icons stand in a column just inside the frame's left edge (x 34-40 in a frame at 9).
    const icons = g.icons
      .filter((ic) => (isTick(ic) || isCross(ic)) && fs.some((f) => inside(ic, f) && ic.x0 < f.x0 + 40))
      .sort(order);
    const ticks = icons.map((ic, k) => (isTick(ic) ? k : -1)).filter((k) => k >= 0);
    if (icons.length !== 4 || ticks.length !== 1) throw new Error(`Q${number}: ${icons.length} icons, ${ticks.length} ticks`);
    const mids = icons.map((ic) => ({ page: ic.page, y: (ic.y0 + ic.y1) / 2 }));
    const stemImages: string[] = [];
    const optionImages: string[][] = [[], [], [], []];
    for (const im of g.images.filter((x) => fs.some((f) => inside(x, f))).sort(order)) {
      // A picture whose middle is level with an option's icon belongs to that option.
      const mid = (im.y0 + im.y1) / 2;
      const k = mids.findIndex((m) => m.page === im.page && Math.abs(m.y - mid) < 8);
      if (k >= 0) optionImages[k].push(im.name);
      else stemImages.push(im.name);
    }
    return {
      number,
      part: PARTS[Math.floor(i / 25)],
      key: LABELS[ticks[0]],
      regions: fs.map((f) => ({ page: f.page, y0: f.y0, y1: f.y1 })),
      stemImages,
      optionImages,
    };
  }
}
