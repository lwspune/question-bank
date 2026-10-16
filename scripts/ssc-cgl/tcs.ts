/**
 * The TCS response sheet: how SSC CGL 2022-2024 papers are hosted (AglaSem prints of the
 * candidate's own sheet, one file per exam day). Unlike the 2025 challenge module, the
 * question and options are TEXT, and the key is the colour of the option text: the correct
 * option is printed green, the others red (a tick or cross icon sits beside each).
 *
 * tcs_extract.py dumps the page's text spans and images; assembleTcs (pure, tested in
 * tests/ssc-cgl-tcs.test.ts) turns them into questions. Layout facts it relies on:
 * - a shift opens with a header whose "Exam Time" is followed by "9:00 AM - 10:00 AM";
 * - "Section : <name>" opens each of the four parts, and each part restarts at Q.1;
 * - a question is "Q.n", its stem, "Ans", then "1. .." to "4. .."; the right-hand panel
 *   (x beyond PANEL_X) carries "Question ID :" and the candidate's status, never content.
 */
import type { Part } from "./lib";

export type TcsSpan = { page: number; x0: number; y0: number; x1: number; y1: number; text: string; color: number; bold: boolean };
export type TcsImage = { page: number; name: string; x0: number; y0: number; x1: number; y1: number };
export type TcsGeometry = { spans: TcsSpan[]; images: TcsImage[] };

/** One printed region of a question on one page (for the masked reading sheet). */
export type TcsRegion = { page: number; y0: number; y1: number };

export type TcsQuestion = {
  shift: number;
  part: Part;
  number: number;
  stem: string;
  options: string[];
  key: "A" | "B" | "C" | "D";
  stemImages: string[];
  optionImages: string[][];
  questionId: string | null;
  regions: TcsRegion[];
};

export const GREEN = 0x40c64b;
const PANEL_X = 380; // the right-hand "Question ID / Status" panel starts beyond this
const QUESTIONS_PER_SHIFT = 100;
const LABELS = ["A", "B", "C", "D"] as const;

const SECTION_PART: [RegExp, Part][] = [
  [/Reasoning/i, "A"],
  [/General Awareness/i, "B"],
  [/Quantitative/i, "C"],
  [/English/i, "D"],
];

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

const isIcon = (im: TcsImage) => im.x1 - im.x0 < 20 && im.y1 - im.y0 < 16 && im.x0 < 90;

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

export function assembleTcs(g: TcsGeometry): TcsQuestion[] {
  const events: Event[] = [
    ...g.spans.filter((s) => !NOISE.test(s.text.trim())).map((s) => ({ page: s.page, y: s.y0, x: s.x0, span: s })),
    ...g.images.filter((im) => !isIcon(im)).map((im) => ({ page: im.page, y: im.y0, x: im.x0, image: im })),
  ].sort((a, b) => a.page - b.page || a.y - b.y || a.x - b.x);

  // Pass 1: the day's exam times, so a shift can be numbered by its start.
  const times: string[] = [];
  events.forEach((e, i) => {
    if (e.span?.text.trim() === "Exam Time") {
      const t = events.slice(i + 1).find((x) => x.span && /\d:\d\d\s*[AP]M/i.test(x.span.text));
      if (t?.span) times.push(t.span.text.trim());
    }
  });

  type Open = TcsQuestion & { stage: "stem" | "options" | "done"; stemLines: string[]; optLines: string[][]; optColor: number[] };
  const open: Open[] = [];
  let shift = 0;
  let part: Part | null = null;
  let cur: Open | null = null;
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
      shift = shiftOfTime(t!.span!.text.trim(), times);
      part = null;
      cur = null;
      continue;
    }
    const sec = s && /^Section\s*:\s*(.+)$/.exec(text.replace(/\u00a0/g, " "));
    if (sec) {
      const hit = SECTION_PART.find(([re]) => re.test(sec[1]));
      if (!hit) throw new Error(`unknown section "${sec[1]}" on page ${s.page}`);
      part = hit[1];
      cur = null;
      continue;
    }
    const q = s && /^Q\.(\d+)$/.exec(text);
    if (q && s.bold) {
      if (!shift) throw new Error(`Q${q[1]} on page ${s.page} comes before any Exam Time header`);
      if (!part) throw new Error(`shift ${shift} Q${q[1]} comes before any Section heading`);
      const local = Number(q[1]);
      cur = {
        shift,
        part,
        number: "ABCD".indexOf(part) * 25 + local,
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
      };
      open.push(cur);
      region(cur, s.page, s.y0, s.y1);
      continue;
    }
    if (!cur || cur.stage === "done") continue;
    if (s && s.x0 >= PANEL_X) {
      if (/^Question ID/.test(text)) {
        const id = events.slice(i + 1, i + 4).find((x) => x.span && /^\d{6,}$/.test(x.span.text.trim()));
        cur.questionId = id?.span?.text.trim() ?? null;
        cur.stage = "done";
      }
      continue;
    }
    const bottom = s ? s.y1 : e.image!.y1;
    region(cur, e.page, e.y, bottom);
    if (s && text === "Ans" && cur.stage === "stem") {
      cur.stage = "options";
      continue;
    }
    if (cur.stage === "stem") {
      if (s) cur.stemLines.push(s.text);
      else cur.stemImages.push(e.image!.name);
      continue;
    }
    // options
    const opt = s && /^([1-4])\.\s*(.*)$/.exec(text);
    if (opt && Number(opt[1]) === cur.optLines.length + 1) {
      cur.optLines.push(opt[2] ? [opt[2]] : []);
      cur.optColor.push(s.color);
    } else if (s && cur.optLines.length) {
      cur.optLines[cur.optLines.length - 1].push(s.text);
    } else if (e.image) {
      // A picture option sits level with its "n." label: the last option begun at or above it.
      const idx = Math.max(0, cur.optLines.length - 1);
      cur.optionImages[idx].push(e.image.name);
    }
  }

  const out: TcsQuestion[] = [];
  for (const q of open) {
    const where = `shift ${q.shift} Q${q.number}`;
    if (q.optLines.length !== 4) throw new Error(`${where}: expected 4 options, found ${q.optLines.length}`);
    const keyed = q.optColor.flatMap((c, i) => (c === GREEN ? [i] : []));
    if (keyed.length !== 1) throw new Error(`${where}: expected exactly one key (green option), found ${keyed.length}`);
    out.push({
      shift: q.shift,
      part: q.part,
      number: q.number,
      stem: joinLines(q.stemLines),
      options: q.optLines.map((l) => joinLines(l)),
      key: LABELS[keyed[0]],
      stemImages: q.stemImages,
      optionImages: q.optionImages,
      questionId: q.questionId,
      regions: q.regions,
    });
  }

  for (const s of [...new Set(out.map((q) => q.shift))]) {
    const nums = out.filter((q) => q.shift === s).map((q) => q.number);
    const want = Array.from({ length: QUESTIONS_PER_SHIFT }, (_, i) => i + 1);
    const have = new Set(nums);
    const missing = want.filter((n) => !have.has(n));
    const dup = [...new Set(nums.filter((n, i) => nums.indexOf(n) !== i))];
    if (missing.length || dup.length) {
      throw new Error(`shift ${s}: expected questions 1..${QUESTIONS_PER_SHIFT}: ${[missing.length ? `missing ${missing.join(",")}` : "", dup.length ? `duplicate ${dup.join(",")}` : ""].filter(Boolean).join("; ")}`);
    }
  }
  return out.sort((a, b) => a.shift - b.shift || a.number - b.number);
}
