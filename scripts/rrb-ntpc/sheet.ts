/**
 * Read an RRB NTPC response sheet with the SSC CGL TCS reader (scripts/ssc-cgl/tcs.ts), unchanged.
 *
 * The NTPC sheet is the same TCS print as SSC's 2022-2024 sheets (question text as text, the key
 * as the option text's colour, a tick or cross icon beside each option), with four differences,
 * each translated here so the reader sees what it knows:
 * - the header says "Test Date" / "Test Time" (SSC: "Exam Date" / "Exam Time");
 * - options are labelled "A." to "D." (SSC: "1." to "4."). Only a KEY-COLOURED label is renumbered:
 *   option text is always green or red, and a stem line such as "A. All birds can fly." never is;
 * - a stem's first line can print a hair above its "Q.n" label, so it would sort before the
 *   question opens and be lost (4 of 100 on 16 Mar S1): the label is lifted to its line's top;
 * - the host's text sits left of the page margin (Prepp's "www.prepp.in" on every page, a stray
 *   quote after the last question). With no candidate panel to close a question, it would run on
 *   into whichever question is open (16 of 100), so it is dropped.
 */
import { assembleTcs, type TcsGeometry, type TcsQuestion, type TcsSpan } from "../ssc-cgl/tcs";
import { LAYOUT, SLOTS } from "./config";

/** Text left of this x is the host's, never RRB's: the question gutter ("Q.n", "Ans") starts at ~25. */
const PAGE_MARGIN = 15;
const LETTER_LABEL = /^([A-D])\.(\s|$)/;

const rgb = (c: number) => [(c >> 16) & 255, (c >> 8) & 255, c & 255];
/** The key colours by hue, as tcs.ts reads them. */
function keyColoured(c: number): boolean {
  const [r, g, b] = rgb(c);
  return (g >= 120 && g - r >= 60 && g - b >= 60) || (r >= 180 && r - g >= 120 && r - b >= 120);
}

const isQLabel = (s: TcsSpan) => s.bold && /^Q\.\d+$/.test(s.text.trim());

export function normaliseNtpcGeometry(g: TcsGeometry): TcsGeometry {
  const kept = g.spans.filter((s) => s.x0 >= PAGE_MARGIN);
  const spans = kept.map((s) => {
    const t = s.text.trim();
    if (t === "Test Date") return { ...s, text: "Exam Date" };
    if (t === "Test Time") return { ...s, text: "Exam Time" };
    const m = LETTER_LABEL.exec(t);
    if (m && keyColoured(s.color)) return { ...s, text: `${"ABCD".indexOf(m[1]) + 1}.${t.slice(2)}` };
    if (isQLabel(s)) {
      const line = kept.filter((o) => o !== s && o.page === s.page && Math.abs(o.y0 - s.y0) <= 3 && o.x0 > s.x1);
      const top = Math.min(...line.map((o) => o.y0));
      if (top < s.y0) return { ...s, y0: top - 0.01 };
    }
    return s;
  });
  return { ...g, spans };
}

type Box = { page: number; x0: number; y0: number; x1: number; y1: number };
type Region = { page: number; y0: number; y1: number };

/**
 * Stretch each question's regions over its four option icons. A region ends at the bottom of the
 * last option's TEXT, but the keyed option's tick (16 pt) can hang below it (16 Mar S1 Q21, 1.7 pt).
 * tcs_sheets.py realigns only the option rows whose icon lies inside the region, and the keyed
 * option prints ~2 pt right of the others (its tick is narrower than a cross), so a tick left
 * outside kept that indent on the reading sheet: the key, in plain sight. An icon belongs to the
 * region its vertical middle falls in; a question with other than four is refused.
 */
export function coverIcons<Q extends { number: number; regions: Region[] }>(qs: Q[], icons: Box[]): Q[] {
  return qs.map((q) => {
    const regions = q.regions.map((r) => ({ ...r }));
    let n = 0;
    for (const im of icons) {
      const mid = (im.y0 + im.y1) / 2;
      const r = regions.find((x) => x.page === im.page && x.y0 <= mid && mid <= x.y1);
      if (!r) continue;
      r.y0 = Math.min(r.y0, im.y0);
      r.y1 = Math.max(r.y1, im.y1);
      n++;
    }
    if (n !== 4) throw new Error(`Q${q.number}: ${n} option icons in its regions, expected 4`);
    return { ...q, regions };
  });
}

/**
 * The tick and cross icons among what tcs_extract.py filed as icons: each ends just left of an
 * option label on its own line (as tcs_sheets.py's is_icon reads them). The extractor files any
 * small picture under 22 pt wide as an icon, and a small option picture right of its label can be
 * that narrow (16 Mar S2 Q50, 22 pt), which would count a fifth "icon" in the question.
 */
export function optionIcons<B extends Box>(icons: B[], labels: Box[]): B[] {
  return icons.filter((im) => {
    const mid = (im.y0 + im.y1) / 2;
    return labels.some((l) => l.page === im.page && Math.abs((l.y0 + l.y1) / 2 - mid) < 7 && im.x1 <= l.x0 + 1 && l.x0 - im.x1 < 25);
  });
}

/** One NTPC sheet's questions, numbered 1-100, keyed, under the date and slot it prints. */
export function assembleNtpc(g: TcsGeometry & { icons?: Box[] }): TcsQuestion[] {
  const norm = normaliseNtpcGeometry(g);
  const questions = assembleTcs(norm, { slots: SLOTS, layout: LAYOUT });
  // Option labels after renumbering: "1." to "4." in a key colour.
  const labels = norm.spans.filter((s) => /^[1-4]\.(\s|$)/.test(s.text.trim()) && keyColoured(s.color));
  return coverIcons(questions, optionIcons(g.icons ?? [], labels));
}
