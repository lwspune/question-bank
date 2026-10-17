/**
 * The TCS response sheet: how SSC CGL 2022-2024 papers are hosted (AglaSem prints of the
 * candidate's own sheet, one file per exam day). Unlike the 2025 challenge module, the
 * question and options are TEXT, and the key is the colour of the option text: the correct
 * option is printed green, the others red (a tick or cross icon sits beside each).
 *
 * tcs_extract.py dumps the page's text spans and images; assembleTcs (pure, tested in
 * tests/ssc-cgl-tcs.test.ts) turns them into questions. Layout facts it relies on:
 * - a shift opens with a header whose "Exam Time" is followed by "9:00 AM - 10:00 AM";
 * - "Section : <name>" opens each part, and each part restarts at Q.1 (Tier I: four of 25;
 *   Tier II: five modules, 150 in all, config.ts LAYOUTS);
 * - a question is "Q.n", its stem, "Ans", then "1. .." to "4. .."; the right-hand panel
 *   carries "Question ID :" and the candidate's status, never content. Some sheets print
 *   scaled (gutter at x 104, panel at 359), so the gutter and panel are measured per page.
 */
import { LAYOUTS, type Section } from "./config";
import type { Part } from "./lib";

export type TcsSpan = { page: number; x0: number; y0: number; x1: number; y1: number; text: string; color: number; bold: boolean };
export type TcsImage = { page: number; name: string; x0: number; y0: number; x1: number; y1: number };
export type TcsGeometry = { spans: TcsSpan[]; images: TcsImage[] };

/** One printed region of a question on one page (for the masked reading sheet). */
/** raster: the page is one scanned picture, so masking must work on its pixels (tcs_sheets.py) */
export type TcsRegion = { page: number; y0: number; y1: number; raster?: boolean };

export type TcsQuestion = {
  /** index of the sheet (one candidate's response sheet) in the file, in print order */
  sheet: number;
  /** the sheet's Exam Date as YYYY-MM-DD, or null when it prints none */
  date: string | null;
  shift: number;
  part: Part;
  number: number;
  /** a "Comprehension:" passage printed before this question (the first of its set), else null */
  context: string | null;
  stem: string;
  options: string[];
  key: "A" | "B" | "C" | "D";
  stemImages: string[];
  optionImages: string[][];
  questionId: string | null;
  regions: TcsRegion[];
};

export const GREEN = 0x40c64b;
/**
 * The key colours by hue, not by value: each year prints its own shade (2024 0x40c64b /
 * 0xf61818, 2022 0x40c64a / 0xf61717, 2023 0x37ac3f / 0xe61616). Body text is near-black.
 */
const rgb = (c: number) => [(c >> 16) & 255, (c >> 8) & 255, c & 255];
const isGreen = (c: number) => {
  const [r, g, b] = rgb(c);
  return g >= 120 && g - r >= 60 && g - b >= 60;
};
const isRed = (c: number) => {
  const [r, g, b] = rgb(c);
  return r >= 180 && r - g >= 120 && r - b >= 120;
};
const GUTTER_X = 48; // where "Q.n" sits on a page that prints none
const PANEL_LABEL = /^(Question ID|Option \d ID|Status|Chosen Option)\s*:/;
const LABELS = ["A", "B", "C", "D"] as const;

const MAX_LINE = 40; // points: a text line, even a stacked fraction, is far shorter
const NOISE = /^(aglasem\.c?o?m?|For more Question Papers.*|Page \d+ of \d+|asem\.com|a)$/i;

function minutes(time: string): number {
  const m = /(\d{1,2}):(\d{2})\s*([AP]M)/i.exec(time);
  if (!m) throw new Error(`unreadable exam time "${time}"`);
  const h = (Number(m[1]) % 12) + (m[3].toUpperCase() === "PM" ? 12 : 0);
  return h * 60 + Number(m[2]);
}

/** A day's shifts are numbered by start time (the print order is not guaranteed). */
export function shiftOfTime(time: string, all: string[]): number {
  const starts = [...new Set(all.map(minutes))].sort((a, b) => a - b);
  return starts.indexOf(minutes(time)) + 1;
}

/**
 * Per page: the right-hand panel's lines, and the Q/Ans gutter. The panel is its LINES (a
 * label, and its value to the right on the same line), not everything right of some x: a
 * stem line's tail can print there as its own span (11 Sep 2024 Q48, after a superscript).
 */
function pageEdges(spans: TcsSpan[]) {
  const labels = new Map<number, TcsSpan[]>();
  const gutter = new Map<number, number>();
  const low = (m: Map<number, number>, p: number, x: number) => m.set(p, Math.min(m.get(p) ?? Infinity, x));
  for (const s of spans) {
    const t = s.text.trim();
    if (PANEL_LABEL.test(t)) labels.set(s.page, [...(labels.get(s.page) ?? []), s]);
    if (s.bold && /^(Q\.\d+|Ans)$/.test(t)) low(gutter, s.page, s.x0);
  }
  return {
    isPanel: (s: TcsSpan) => (labels.get(s.page) ?? []).some((l) => Math.abs(l.y0 - s.y0) <= 3 && s.x0 >= l.x0 - 1),
    // The tick and cross icons sit just right of the gutter, before the option text.
    // Under 22 pt wide: the CGL 2019 Tier II print draws them 20.4 pt (under 20 they were filed
    // as option pictures and showed the key).
    isIcon: (im: TcsImage) => im.x1 - im.x0 < 22 && im.y1 - im.y0 < 16 && im.x0 < (gutter.get(im.page) ?? GUTTER_X) + 42,
  };
}

/** Wrapped lines run on; a line that starts an item (1., I., (a), Statement ...) keeps its break. */
function joinLines(lines: string[]): string {
  let out = "";
  for (const l of lines.map((x) => x.trim()).filter(Boolean)) {
    if (!out) out = l;
    else if (/^(\(?[0-9ivxIVX]{1,4}[.)]|\(?[a-dA-D][.)]\s|Statements?|Conclusions?|Assumptions?|Arguments?)/.test(l)) out += "\n" + l;
    else out += " " + l;
  }
  return out;
}

type Event = { page: number; y: number; x: number; span?: TcsSpan; image?: TcsImage };

/** A Section label printed apart from its name (the name a hair higher, so it would sort first) becomes one span. */
function joinSectionLabels(spans: TcsSpan[]): TcsSpan[] {
  const used = new Set<TcsSpan>();
  const out: TcsSpan[] = [];
  for (const s of spans) {
    // "Section :" (2024) or "Section" then ":" (1 Dec 2022); trim() also strips the no-break space
    if (!/^Section\s*:?$/.test(s.text.trim())) continue;
    const rest = spans
      .filter((o) => o !== s && o.page === s.page && Math.abs(o.y0 - s.y0) <= 3 && o.x0 >= s.x1 - 1 && !used.has(o))
      .sort((a, b) => a.x0 - b.x0);
    rest.forEach((o) => used.add(o));
    used.add(s);
    const name = rest.map((o) => o.text.trim()).filter((t) => t && t !== ":").join(" ");
    out.push({ ...s, text: "Section : " + name, x1: Math.max(s.x1, ...rest.map((o) => o.x1)) });
  }
  return [...spans.filter((s) => !used.has(s)), ...out];
}

/**
 * A stem image wide enough to squeeze the left column breaks "Q.14" and "Ans" over several
 * lines: one character per line (26 Sep 2024), or uneven pieces ("Q." / "4" / "A" / "ns",
 * 19 Sep; "Q.2" / "1" / "Ans", 12 Sep). Rejoin a run of short bold pieces down the gutter
 * into the two labels, each at the height of its first piece.
 */
function joinStackedLabels(spans: TcsSpan[]): TcsSpan[] {
  // Left half only; the joined run must then read exactly "Q.n" or "Q.nAns", which no run of
  // stem text does. (Not "x0 < gutter": a scaled sheet moves the gutter.)
  const isPiece = (s: TcsSpan) => s.bold && s.x0 < 200 && /^[Q.\dAns]{1,4}$/.test(s.text.trim());
  const pieces = spans.filter(isPiece).sort((a, b) => a.page - b.page || a.y0 - b.y0);
  const runs: TcsSpan[][] = []; // pieces ~9pt apart, 13.3 between "Q.11" and "Ans" (10 Sep 2024)
  for (const c of pieces) {
    const run = runs[runs.length - 1];
    const last = run?.[run.length - 1];
    if (last && last.page === c.page && c.y0 - last.y0 <= 16 && Math.abs(c.x0 - last.x0) <= 6) run.push(c);
    else runs.push([c]);
  }
  const used = new Set<TcsSpan>();
  const out: TcsSpan[] = [];
  for (const run of runs) {
    if (run.length < 2) continue;
    const texts = run.map((c) => c.text.trim());
    const m = /^(Q\.\d+)(Ans)?$/.exec(texts.join(""));
    if (!m) continue;
    // The Q label must end on a piece boundary, and the rest must spell "Ans".
    let k = 0;
    let acc = "";
    while (k < run.length && acc.length < m[1].length) acc += texts[k++];
    if (acc !== m[1]) continue;
    run.forEach((c) => used.add(c));
    out.push({ ...run[0], text: m[1], x1: run[0].x0 + 15 });
    if (m[2]) out.push({ ...run[k], text: "Ans", x1: run[k].x0 + 15 });
  }
  return [...spans.filter((s) => !used.has(s)), ...out];
}

export type TcsOptions = {
  /** The exam's fixed slots in shift order ("9:00 AM - 10:00 AM", ...). Without it a file's
   * shifts are numbered by start time among the times it prints, which is only right when
   * the file holds one whole day. */
  slots?: string[];
  /** The paper's sections in number order (default Tier I's). */
  layout?: Section[];
  /** A file that prints no Exam Date/Time header: it is one sheet of this date, Shift 1. */
  headerless?: { date: string };
};

/** "10/09/2024" (day first, as the sheets print it) -> "2024-09-10". */
function isoDate(t: string): string | null {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(t.trim());
  return m ? `${m[3]}-${m[2]}-${m[1]}` : null;
}

const TIME_RANGE = /^\d{1,2}:\d\d\s*[AP]M\s*-\s*\d{1,2}:\d\d\s*[AP]M$/i;
const DATE = /^\d{2}\/\d{2}\/\d{4}$/;
/** Loosely key-coloured: the tick and cross glyphs print in a duller green and red. */
function keyish(c: number): boolean {
  const [r, g, b] = rgb(c);
  return (r - g >= 80 && r - b >= 80) || (g - r >= 40 && g - b >= 40);
}

/**
 * The 18 Jul 2023 print: header values without their "Exam Date" / "Exam Time" labels, and
 * the tick and cross as coloured text glyphs ("X", ",Z") instead of pictures. Give the values
 * their labels back, and drop the glyphs (they carry the key).
 */
function normaliseHeaderAndGlyphs(spans: TcsSpan[]): TcsSpan[] {
  const labelled = spans.some((s) => s.text.trim() === "Exam Time");
  const out = spans.filter((s) => !(/^(X|,Z|[✓✔✗✘])$/.test(s.text.trim()) && keyish(s.color)));
  if (labelled) return out;
  // A time may print over two spans ("11 :45 AM -" / "12:45 PM"): join a line that starts
  // with one, and read it with the spaces around ":" closed up.
  const tidy = (t: string) => t.replace(/\s*:\s*/g, ":").replace(/\s+/g, " ").trim();
  const times: TcsSpan[] = [];
  for (const s of out.filter((x) => x.x0 < 250 && /^\d{1,2}\s*:\s*\d\d/.test(x.text.trim()))) {
    const line = out.filter((o) => o.page === s.page && Math.abs(o.y0 - s.y0) <= 3 && o.x0 >= s.x0).sort((a, b) => a.x0 - b.x0);
    const text = tidy(line.map((o) => o.text).join(" "));
    if (TIME_RANGE.test(text)) times.push({ ...s, text, x1: line[line.length - 1].x1 });
  }
  const extra: TcsSpan[] = [];
  for (const t of times) {
    extra.push({ ...t, text: "Exam Time", x0: t.x0 - 80, x1: t.x0 - 5, bold: false });
    const d = out.find((s) => s.page === t.page && DATE.test(s.text.trim()) && t.y0 - s.y0 > 0 && t.y0 - s.y0 < 40);
    if (d) extra.push({ ...d, text: "Exam Date", x0: d.x0 - 80, x1: d.x0 - 5, bold: false });
  }
  const parts = new Set(times.flatMap((t) => out.filter((o) => o.page === t.page && Math.abs(o.y0 - t.y0) <= 3 && o.x0 >= t.x0)));
  return [...out.filter((o) => !parts.has(o)), ...times, ...extra];
}

/** "Q.11 Select the option ..." printed as one span (1 Dec 2022): split off the label. */
function splitFusedLabels(spans: TcsSpan[]): TcsSpan[] {
  return spans.flatMap((s) => {
    const m = s.bold ? /^(Q\.\d+)\s+(\S.*)$/.exec(s.text.trim()) : null;
    if (!m) return [s];
    return [
      { ...s, text: m[1], x1: s.x0 + 15 },
      { ...s, text: m[2], x0: s.x0 + 20 },
    ];
  });
}

export function assembleTcs(g: TcsGeometry, opts: TcsOptions = {}): TcsQuestion[] {
  const spans = joinStackedLabels(joinSectionLabels(splitFusedLabels(normaliseHeaderAndGlyphs(g.spans))));
  const edges = pageEdges(spans);
  const layout = opts.layout ?? LAYOUTS[1];
  const offset = new Map<Part, number>();
  let QUESTIONS_PER_SHIFT = 0;
  for (const sec of layout) {
    offset.set(sec.part, QUESTIONS_PER_SHIFT);
    QUESTIONS_PER_SHIFT += sec.count;
  }
  // The hosting site's watermark is one picture at one place on page after page (2022).
  const boxKey = (im: TcsImage) => [im.x0, im.y0, im.x1, im.y1].map(Math.round).join(",");
  const seen = new Map<string, number>();
  // Large pictures only: a small option picture can recur at one spot without being a watermark.
  for (const im of g.images.filter((x) => x.x1 - x.x0 > 100 && x.y1 - x.y0 > 100)) seen.set(boxKey(im), (seen.get(boxKey(im)) ?? 0) + 1);
  const watermark = new Set([...seen].filter(([, n]) => n >= 5).map(([k]) => k));
  const events: Event[] = [
    // A span taller than any line is a host's diagonal watermark ("www.exammix.com" over every
    // page of CGL 2021 Tier II): it is no question's text, and its box would stretch a region.
    ...spans
      .filter((s) => !NOISE.test(s.text.trim()) && s.y1 - s.y0 <= MAX_LINE)
      .map((s) => ({ page: s.page, y: s.y0, x: s.x0, span: s })),
    ...g.images.filter((im) => !edges.isIcon(im) && !watermark.has(boxKey(im))).map((im) => ({ page: im.page, y: im.y0, x: im.x0, image: im })),
  ].sort((a, b) => a.page - b.page || a.y - b.y || a.x - b.x);

  // Pass 1: the day's exam times, so a shift can be numbered by its start.
  const times: string[] = [];
  events.forEach((e, i) => {
    if (e.span?.text.trim() === "Exam Time") {
      const t = events.slice(i + 1).find((x) => x.span && /\d:\d\d\s*[AP]M/i.test(x.span.text));
      if (t?.span) times.push(t.span.text.trim());
    }
  });

  type Open = TcsQuestion & {
    stage: "stem" | "options" | "done";
    stemLines: string[];
    optLines: string[][];
    optColor: number[];
    /** vertical middle of each option's "n." label, and the pictures met after "Ans" */
    optMid: number[];
    optPics: TcsImage[];
    /** the stem's pictures with their boxes (a tall option-1 picture can start above its label) */
    stemPics: TcsImage[];
    /** the page of each option label */
    optPage: number[];
    /** the page of the last option label read */
    labelPage: number;
    /** option text read apart from its label: the option it followed (-1 = none yet) and its line */
    optText: { k: number; text: string; mid: number }[];
  };
  const open: Open[] = [];
  let shift = opts.headerless ? 1 : 0;
  let sheet = opts.headerless ? 0 : -1;
  let date: string | null = opts.headerless?.date ?? null;
  let part: Part | null = null;
  let cur: Open | null = null;
  // A "Comprehension:" passage, collected until the sub-question it is printed before.
  let passage: { lines: string[]; regions: TcsRegion[] } | null = null;
  const region = (q: Open, page: number, y0: number, y1: number) => {
    const r = q.regions.find((x) => x.page === page);
    if (r) {
      r.y0 = Math.min(r.y0, y0);
      r.y1 = Math.max(r.y1, y1);
    } else q.regions.push({ page, y0, y1 });
  };

  for (let i = 0; i < events.length; i++) {
    const e = events[i];
    const s = e.span;
    const text = s?.text.trim() ?? "";
    if (s && text === "Exam Time") {
      const t = events.slice(i + 1).find((x) => x.span && /\d:\d\d\s*[AP]M/i.test(x.span.text));
      const time = t!.span!.text.trim();
      if (opts.slots) {
        shift = opts.slots.indexOf(time) + 1;
        if (!shift) throw new Error(`exam time "${time}" on page ${s.page} is not one of the slots (${opts.slots.join(", ")})`);
      } else shift = shiftOfTime(time, times);
      sheet++;
      // The Exam Date row sits just above Exam Time on the same header.
      const d = events
        .slice(Math.max(0, i - 12), i)
        .reverse()
        .find((x) => x.span?.text.trim() === "Exam Date");
      const dv = d && events.find((x) => x.span && x.page === d.page && Math.abs(x.y - d.y) <= 3 && x.x > d.x && isoDate(x.span.text));
      date = dv ? isoDate(dv.span!.text) : null;
      part = null;
      cur = null;
      continue;
    }
    const sec = s && /^Section\s*:\s*(.*)$/.exec(text.replace(/\u00a0/g, " "));
    if (sec) {
      // The name may be its own span(s) on the same line ("Section :" then the name).
      let name = sec[1].trim();
      while (!name && i + 1 < events.length) {
        const nx = events[i + 1];
        if (!nx.span || nx.page !== s.page || Math.abs(nx.y - e.y) > 3) break;
        name = nx.span.text.replace(/\u00a0/g, " ").trim();
        i++;
      }
      const hit = layout.find((x) => x.match.test(name));
      if (!hit) throw new Error(`unknown section "${name}" on page ${s.page}`);
      part = hit.part;
      cur = null;
      continue;
    }
    // A sheet's title opens the next sheet. A print with no Question ID panel (CGL 2024 Tier II)
    // never closes its last question, which would otherwise run on into this header.
    if (s && /^Combined Graduate Level Examination/i.test(text)) {
      cur = null;
      passage = null;
      continue;
    }
    if (s && text === "Comprehension:") {
      passage = { lines: [], regions: [{ page: s.page, y0: s.y0, y1: s.y1 }] };
      cur = null;
      continue;
    }
    if (s && /^SubQuestion No\s*:/.test(text)) continue;
    const q = s && /^Q\.(\d+)$/.exec(text);
    if (q && s.bold) {
      if (!shift) throw new Error(`Q${q[1]} on page ${s.page} comes before any Exam Time header`);
      if (!part) throw new Error(`shift ${shift} Q${q[1]} comes before any Section heading`);
      const local = Number(q[1]);
      const count = layout.find((x) => x.part === part)!.count;
      if (local > count) throw new Error(`shift ${shift} Q${local} is past the ${count} questions of PART-${part} (page ${s.page})`);
      cur = {
        sheet,
        date,
        shift,
        part,
        number: offset.get(part)! + local,
        context: passage ? passage.lines.map((l) => l.trim()).filter(Boolean).join(" ") : null,
        stem: "",
        options: [],
        key: "A",
        stemImages: [],
        optionImages: [[], [], [], []],
        questionId: null,
        regions: [],
        stage: "stem",
        stemLines: [],
        optLines: [],
        optColor: [],
        optMid: [],
        optPics: [],
        stemPics: [],
        optPage: [],
        labelPage: 0,
        optText: [],
      };
      open.push(cur);
      for (const r of passage?.regions ?? []) region(cur, r.page, r.y0, r.y1);
      passage = null;
      region(cur, s.page, s.y0, s.y1);
      continue;
    }
    if (passage) {
      if (s && !edges.isPanel(s)) {
        passage.lines.push(s.text);
        passage.regions.push({ page: s.page, y0: s.y0, y1: s.y1 });
      }
      continue;
    }
    if (!cur || cur.stage === "done") continue;
    if (s && (edges.isPanel(s) || /^Chosen Option/.test(text))) {
      if (/^Question ID/.test(text)) {
        const fused = /Question ID\s*:\s*(\d{6,})/.exec(text); // "Question ID: 2643..." (2023)
        const id = events.slice(i + 1, i + 4).find((x) => x.span && /^\d{6,}$/.test(x.span.text.trim()));
        cur.questionId = fused?.[1] ?? id?.span?.text.trim() ?? null;
        cur.stage = "done";
      }
      continue;
    }
    // ...and the next sheet's logo prints above that title: a picture on a later page than all
    // four option labels is not this question's.
    if (e.image && cur.stage === "options" && cur.optLines.length === 4 && e.page > cur.labelPage) continue;
    const bottom = s ? s.y1 : e.image!.y1;
    region(cur, e.page, e.y, bottom);
    if (s && text === "Ans") {
      if (cur.stage === "stem") cur.stage = "options";
      continue;
    }
    // Option text is always green or red and stem text never is, so option 1 opens the
    // options even when a squeezed "Ans" label prints a fraction below it.
    if (s && cur.stage === "stem" && (isGreen(s.color) || isRed(s.color)) && /^1\.(\s|$)/.test(text)) cur.stage = "options";
    if (cur.stage === "stem") {
      if (s) cur.stemLines.push(s.text);
      else {
        cur.stemImages.push(e.image!.name);
        cur.stemPics.push(e.image!);
      }
      continue;
    }
    // options
    const opt = s && /^([1-4])\.\s*(.*)$/.exec(text);
    if (opt && Number(opt[1]) === cur.optLines.length + 1) {
      cur.optLines.push(opt[2] ? [opt[2]] : []);
      cur.optColor.push(s.color);
      cur.optMid.push((s.y0 + s.y1) / 2);
      cur.optPage.push(s.page);
      cur.labelPage = s.page;
    } else if (s) {
      // filed after the labels are all known (below): it may belong to the NEXT label's line
      cur.optText.push({ k: cur.optLines.length - 1, text: s.text, mid: (s.y0 + s.y1) / 2 });
    } else if (e.image) {
      cur.optPics.push(e.image); // filed once every label is known (below)
    }
  }

  if (!open.length) throw new Error("no questions found: not a TCS response sheet this reader knows");
  const out: TcsQuestion[] = [];
  for (const q of open) {
    const where = `shift ${q.shift}${q.date ? ` (${q.date})` : ""} Q${q.number} (page ${q.regions[0]?.page})`;
    if (q.optLines.length !== 4) throw new Error(`${where}: expected 4 options, found ${q.optLines.length}`);
    // Option text on a label's own LINE is that label's, even when it prints a hair above the
    // label and so sorts before it (18 Jan 2025 Q55: every option's text 1 pt high, so each fell
    // under the label before it and option 1 came out empty). Other text (a wrapped second line)
    // stays with the option it followed.
    for (const t of q.optText) {
      let k = t.k;
      q.optMid.forEach((m, j) => {
        if (Math.abs(m - t.mid) <= 4 && (k < 0 || Math.abs(m - t.mid) < Math.abs(q.optMid[k] - t.mid))) k = j;
      });
      if (k >= 0) q.optLines[k].push(t.text);
    }
    // A picture option is centred on its "n." label, so a tall one starts above it: file each
    // picture under the label nearest its middle, not the last label begun above it.
    // A picture option 1 taller than its line starts ABOVE its "1." label, so it was read while
    // the stem was still open (CGL 2022 Tier II Q6, a stacked fraction). A stem picture whose box
    // straddles option 1's label line is option 1's.
    for (const im of q.stemPics) {
      if (im.page === q.optPage[0] && im.y0 <= q.optMid[0] && q.optMid[0] <= im.y1) {
        q.stemImages = q.stemImages.filter((n) => n !== im.name);
        q.optPics.push(im);
      }
    }
    for (const im of q.optPics) {
      const mid = (im.y0 + im.y1) / 2;
      let best = 0;
      q.optMid.forEach((m, i) => {
        if (Math.abs(m - mid) < Math.abs(q.optMid[best] - mid)) best = i;
      });
      q.optionImages[best].push(im.name);
    }
    const keyed = q.optColor.flatMap((c, i) => (isGreen(c) ? [i] : []));
    if (keyed.length !== 1) throw new Error(`${where}: expected exactly one key (green option), found ${keyed.length}`);
    out.push({
      sheet: q.sheet,
      date: q.date,
      shift: q.shift,
      part: q.part,
      number: q.number,
      context: q.context,
      stem: joinLines(q.stemLines),
      options: q.optLines.map((l) => joinLines(l)),
      key: LABELS[keyed[0]],
      stemImages: q.stemImages,
      optionImages: q.optionImages,
      questionId: q.questionId,
      regions: q.regions,
    });
  }

  for (const sh of [...new Set(out.map((q) => q.sheet))]) {
    const of = out.filter((q) => q.sheet === sh);
    const s = `${of[0].shift}${of[0].date ? ` (${of[0].date})` : ""}`;
    const nums = of.map((q) => q.number);
    const want = Array.from({ length: QUESTIONS_PER_SHIFT }, (_, i) => i + 1);
    const have = new Set(nums);
    const missing = want.filter((n) => !have.has(n));
    const dup = [...new Set(nums.filter((n, i) => nums.indexOf(n) !== i))];
    if (missing.length || dup.length) {
      throw new Error(`shift ${s}: expected questions 1..${QUESTIONS_PER_SHIFT}: ${[missing.length ? `missing ${missing.join(",")}` : "", dup.length ? `duplicate ${dup.join(",")}` : ""].filter(Boolean).join("; ")}`);
    }
  }
  return out.sort((a, b) => a.sheet - b.sheet || a.number - b.number);
}

/**
 * File every sheet of every TCS file under its shift id, t<tier>-<Exam Date>-s<slot>. A shift
 * met twice (two candidates' sheets of one sitting) keeps the first copy when the two print
 * the same questions in the same order, and is refused when they do not.
 */
export function groupTcsShifts(
  tier: number,
  files: { dir: string; questions: TcsQuestion[] }[]
): Map<string, { dir: string; questions: TcsQuestion[] }> {
  const out = new Map<string, { dir: string; questions: TcsQuestion[] }>();
  for (const f of files) {
    for (const sheet of [...new Set(f.questions.map((q) => q.sheet))]) {
      const qs = f.questions.filter((q) => q.sheet === sheet);
      const { date, shift } = qs[0];
      if (!date) throw new Error(`${f.dir} sheet ${sheet + 1} prints no Exam Date`);
      const id = `t${tier}-${date}-s${shift}`;
      const seen = out.get(id);
      if (!seen) {
        out.set(id, { dir: f.dir, questions: qs });
        continue;
      }
      const ids = (x: TcsQuestion[]) => x.map((q) => q.questionId).join();
      if (ids(seen.questions) !== ids(qs)) throw new Error(`${id}: the copies in ${seen.dir} and ${f.dir} differ`);
    }
  }
  return new Map([...out].sort(([a], [b]) => a.localeCompare(b)));
}
