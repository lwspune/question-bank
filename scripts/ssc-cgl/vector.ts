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
 */
import type { Part } from "./lib";
import type { TcsImage, TcsRegion } from "./tcs";

export type VectorBox = { page: number; x0: number; y0: number; x1: number; y1: number };
export type VectorIcon = VectorBox & { w: number; h: number };
export type VectorGeometry = { frames: VectorBox[]; panels: VectorBox[]; icons: VectorIcon[]; images: TcsImage[] };
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
const isTick = (i: VectorIcon) => i.w >= 60 && i.h >= 60;
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
  if (!groups.length || groups.length % 100) throw new Error(`${groups.length} questions found (frames ending in a panel box), expected 100`);

  const all = groups.map((fs, i) => read(g, fs, (i % 100) + 1));
  // Several candidates' sheets of one paper in one file: keep the first, after checking the
  // copies agree (same key, question by question). Different papers in one file are refused.
  const first = all.slice(0, 100);
  for (let c = 1; c < all.length / 100; c++) {
    const copy = all.slice(c * 100, c * 100 + 100);
    if (copy.some((q, k) => q.key !== first[k].key)) throw new Error(`copies differ: sheet ${c + 1} of the file is not the same paper as sheet 1`);
  }
  return first;
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
