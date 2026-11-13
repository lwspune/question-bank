/**
 * The challenge-module response sheet scanned to page pictures (SSC CHSL 2025 Tier I, hosted by
 * PW as Google Drive PDFs): every page is one picture, the text layer is a partial OCR, so the
 * questions are read from pixels. challenge_extract.py measures each page; assembleChallenge
 * (pure, tested in tests/ssc-cgl-challenge.test.ts) turns that into questions.
 *
 * What it relies on, each checked rather than assumed:
 * - every question opens with a blue "Click Here to Challenge Question No." marker (a filled bar
 *   on framed pages, light blue text on the frameless first page), in question order;
 * - a FRAMED question is a table: pale rules between its rows (a stem row, then options A-D),
 *   so its options are the last four rule-bounded rows before the next question's box (a table
 *   in the stem adds rules above them, never below);
 * - a FRAMELESS question has no rules: its options are its last four text lines;
 * - the key is the one option row whose left cell is green (correct, chosen) or yellow
 *   (correct, not chosen); red marks the candidate's wrong choice and is ignored;
 * - coloured cells before the first marker are the sheet's legend, not a key.
 * A question's crop runs from its marker to the next question's, page by page.
 */
import type { Section } from "./config";
import type { Label, Part } from "./lib";

export type ChallengeBand = { y0: number; y1: number };
export type ChallengeCell = ChallengeBand & { kind: "green" | "yellow" | "red" | "grey" };
export type ChallengePage = {
  page: number;
  height: number;
  /** "Click Here to Challenge Question No." markers, top to bottom */
  marks: ChallengeBand[];
  /** "Q.No: n" labels in the left column */
  labels: ChallengeBand[];
  /** coloured cells in the left column */
  cells: ChallengeCell[];
  /** y of each pale horizontal table rule */
  rules: number[];
  /** text lines in the option column (for frameless pages) */
  lines: ChallengeBand[];
  /** y of each row of PART buttons: PW's file is several captures, and each opens a new page with
   * the sheet's header (candidate box, instructions, PART buttons), never part of a question */
  breaks?: number[];
  /** a vector page (each capture's first page), rendered rather than scanned: it colours only the
   * candidate's choice, never a correct option left unchosen */
  vector?: boolean;
};
export type ChallengeRegion = { page: number; y0: number; y1: number };
export type ChallengeQuestion = {
  number: number;
  part: Part;
  /** null: on a vector page with no correct option marked (the candidate chose wrong or skipped) */
  key: Label | null;
  regions: ChallengeRegion[];
  optionRows: ChallengeRegion[];
};

const LABELS: Label[] = ["A", "B", "C", "D"];
/** A box's top border sits just above its marker: never one of the previous question's rules. */
const BORDER_GAP = 20;
/** Two rules closer than this are one boundary printed twice. */
const MIN_ROW = 15;

type Pos = { page: number; y: number };
const before = (a: Pos, b: Pos) => a.page < b.page || (a.page === b.page && a.y < b.y);

/**
 * `order`: the part each capture holds, in file order. PW stitched each shift from one capture per
 * part, usually A, B, C, D but not always (15 Nov 2025 S1 is A, D, C, B); config records it per file.
 */
export function assembleChallenge(pages: ChallengePage[], layout: Section[], order?: Part[]): ChallengeQuestion[] {
  const sorted = [...pages].sort((a, b) => a.page - b.page);
  // A capture opens on a fresh page: a blue mark above its PART buttons is the header's, no question.
  const marks: Pos[] = sorted.flatMap((p) =>
    p.marks.filter((m) => !(p.breaks ?? []).some((b) => m.y0 < b)).map((m) => ({ page: p.page, y: m.y0 }))
  );
  const want = layout.reduce((n, s) => n + s.count, 0);
  if (marks.length !== want) throw new Error(`${marks.length} questions, expected ${want}`);
  const heightOf = new Map(sorted.map((p) => [p.page, p.height]));
  const lastPage = sorted[sorted.length - 1].page;

  // Captures: the markers between one row of PART buttons and the next. One capture (no breaks)
  // holds the paper in print order; several must be one per part, each its part's whole count.
  const breaks: Pos[] = sorted.flatMap((p) => (p.breaks ?? []).map((y) => ({ page: p.page, y })));
  const captureOf = marks.map((m) => breaks.filter((b) => before(b, m)).length);
  const used = [...new Set(captureOf)].sort((a, b) => a - b);
  const numbering: { number: number; part: Part }[] = [];
  if (used.length === 1) {
    for (const sec of layout) for (let k = 0; k < sec.count; k++) numbering.push({ number: numbering.length + 1, part: sec.part });
  } else {
    const parts = order ?? layout.map((x) => x.part);
    if (used.length !== parts.length) throw new Error(`${used.length} captures, expected one per part (${parts.join(", ")})`);
    const offset = new Map<Part, number>();
    let n = 0;
    for (const sec of layout) {
      offset.set(sec.part, n);
      n += sec.count;
    }
    used.forEach((c, k) => {
      const part = parts[k];
      const sec = layout.find((x) => x.part === part);
      if (!sec) throw new Error(`capture ${k + 1}: PART-${part} is not in the layout`);
      const count = captureOf.filter((x) => x === c).length;
      if (count !== sec.count) throw new Error(`capture ${k + 1} (PART-${part}) holds ${count} questions, expected ${sec.count}`);
      for (let j = 0; j < count; j++) numbering.push({ number: offset.get(part)! + j + 1, part });
    });
  }
  return marks.map((start, i) => {
    const { number, part } = numbering[i];
    let next: Pos = marks[i + 1] ?? { page: lastPage + 1, y: 0 };
    // A new capture ends the question: everything on a later page before its PART buttons is the
    // capture's header. (A capture opens on a fresh page.)
    const brk = sorted
      .flatMap((p) => (p.breaks ?? []).map((y) => ({ page: p.page, y })))
      .find((b) => before(start, b) && before(b, next));
    if (brk) next = brk.page > start.page ? { page: brk.page, y: 0 } : brk;
    const inSpan = (pos: Pos) => !before(pos, start) && before(pos, next);

    // The rules of this question, excluding the next box's top border.
    const rules: Pos[] = sorted
      .flatMap((p) =>
        p.rules
          .map((y) => ({ page: p.page, y }))
          .filter((r) => inSpan(r) && !(r.page === next.page && next.y - r.y <= BORDER_GAP))
      )
      // a doubled line (two rules a few pixels apart) is one row boundary: rows are 35+ px tall
      .filter((r, k, all) => k === 0 || all[k - 1].page !== r.page || r.y - all[k - 1].y >= MIN_ROW);
    let rows: { from: Pos; to: Pos }[];
    if (rules.length >= 5) {
      const last = rules.slice(-5);
      rows = [0, 1, 2, 3].map((k) => ({ from: last[k], to: last[k + 1] }));
    } else {
      const lines = sorted.flatMap((p) => p.lines.map((l) => ({ page: p.page, y0: l.y0, y1: l.y1 }))).filter((l) => inSpan({ page: l.page, y: l.y0 }));
      if (lines.length < 4) throw new Error(`Q${number}: neither 5 rules nor 4 option lines (${rules.length} rules, ${lines.length} lines)`);
      rows = lines.slice(-4).map((l) => ({ from: { page: l.page, y: l.y0 }, to: { page: l.page, y: l.y1 } }));
    }

    // Key: the option row holding a green or yellow cell's centre (rows may cross a page).
    const keyCells = sorted.flatMap((p) =>
      p.cells
        .filter((c) => c.kind === "green" || c.kind === "yellow")
        .map((c) => ({ page: p.page, y: (c.y0 + c.y1) / 2 }))
        .filter((c) => inSpan(c))
    );
    const hits = keyCells.map((c) => rows.findIndex((r) => !before(c, r.from) && before(c, r.to) || nearLine(c, r)));
    // a key cell split by a page break prints on both pages: one row
    const found = [...new Set(hits.filter((h) => h >= 0))];
    const onVector = sorted.find((p) => p.page === start.page)?.vector === true;
    const unknown = found.length === 0 && onVector;
    if (found.length !== 1 && !unknown) throw new Error(`Q${number}: ${found.length} key cells in its option rows`);

    const regions: ChallengeRegion[] = [];
    for (let pg = start.page; pg <= Math.min(next.page, lastPage); pg++) {
      const h = heightOf.get(pg);
      if (h === undefined) continue;
      const y0 = pg === start.page ? start.y : 0;
      const y1 = pg === next.page ? next.y - 2 : h;
      if (y1 > y0 && (pg === start.page || hasContent(sorted.find((p) => p.page === pg)!, y0, y1))) regions.push({ page: pg, y0, y1 });
    }
    const optionRows: ChallengeRegion[] = rows.map((r) =>
      r.from.page === r.to.page
        ? { page: r.from.page, y0: r.from.y, y1: r.to.y }
        : { page: r.from.page, y0: r.from.y, y1: heightOf.get(r.from.page)! }
    );
    return { number, part, key: unknown ? null : LABELS[found[0]], regions, optionRows };
  });
}

/** A frameless option row is one text line: a key cell is a little taller than the line it marks. */
function nearLine(c: Pos, r: { from: Pos; to: Pos }): boolean {
  return c.page === r.from.page && r.from.page === r.to.page && r.to.y - r.from.y < 30 && c.y >= r.from.y - 8 && c.y <= r.to.y + 8;
}

function hasContent(p: ChallengePage, y0: number, y1: number): boolean {
  const inside = (y: number) => y >= y0 && y < y1;
  return p.rules.some(inside) || p.cells.some((c) => inside(c.y0)) || p.lines.some((l) => inside(l.y0)) || p.labels.some((l) => inside(l.y0));
}
