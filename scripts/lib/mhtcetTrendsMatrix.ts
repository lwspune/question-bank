/**
 * Pure core for the MHT-CET Maths chapter x shift matrix on
 * `/guide/mht-cet-maths/trends`.
 *
 * WHY THIS IS GENERATED AND THE NDA ONE IS NOT. `nda-maths/_data/trends.ts`
 * hand-authors a 19-column grid. MHT-CET is a multi-shift exam: 45 Maths
 * papers across 27 chapters is 1,215 cells, which is past the point where a
 * human transcription can be trusted or re-verified after the next ingest.
 * So the grid is derived from the bank by `scripts/mhtcet/trends-matrix.ts`
 * and this file holds the part of that derivation worth testing — everything
 * that is judgement rather than a `GROUP BY`.
 *
 * WHY A PER-SHIFT GRID IS THE HONEST GRAIN. The trends page has always warned
 * that raw counts do not compare across MHT-CET years, and it is right: 2023
 * ran 17 shifts, 2025 ran 14, so a chapter can carry more questions in one
 * than the other at identical weight. That objection is about the YEAR grain.
 * Per SHIFT it dissolves — every column here is one ~50-question paper, so two
 * cells anywhere in the grid are directly comparable. The year-rate table
 * (`buildYearRateMatrix`) exists for readers who want the summary, and it
 * divides by each year's own shift count for the same reason.
 *
 * THE LABELLING IS WHERE THE RISK IS. `questions.pyq_note` carries five
 * different shapes across the 45 papers (see the parser below), three papers
 * carry no date at all, and one paper's filename contradicts its note. A
 * mislabelled column is worse than a missing one because the reader cannot
 * tell, so the rules here are: parse every shape explicitly, never guess a
 * position for an undated paper, and report a contradiction rather than pick
 * a side. Spec: `tests/mhtcet-trends-matrix.test.ts`.
 */

/** A distinct paper as the bank stores it — one `source_file`. */
export type SourcePaper = {
  sourceFile: string;
  year: number;
  /** `questions.pyq_note`, e.g. "10th May Shift 1". Often messy, sometimes absent. */
  pyqNote: string | null;
};

/** What a `pyq_note` yields. Any field may be absent; none is ever guessed. */
export type ParsedNote = {
  day: number | null;
  month: string | null;
  shift: number | null;
};

/** One column of the matrix: a single sitting, placed and named. */
export type ShiftPaper = {
  /** Stable id — the `source_file`, which is what the counts key on. */
  id: string;
  year: number;
  /** 1-based index of this sitting WITHIN its year; the visible sub-header. */
  seq: number;
  /** Sub-header text. Two characters at most — the column is ~26px wide. */
  label: string;
  /** Tooltip. Names the real date, or says plainly that there is not one. */
  title: string;
  /** False when the bank records no day for this paper. */
  dated: boolean;
  /**
   * True when this paper's filename and note disagree about its shift number.
   * Surfaced so the page can mark the column rather than print a shift the
   * bank does not actually agree on. See `detectLabelConflicts`.
   */
  disputed: boolean;
  day: number | null;
  month: string | null;
  shift: number | null;
};

/** One chapter's count in one paper. Absent pair => that chapter scored zero. */
export type MatrixCell = {
  sourceFile: string;
  chapter: string;
  count: number;
};

/** A chapter's row across every column, aligned 1:1 to the ordered papers. */
export type MatrixRow = {
  chapter: string;
  total: number;
  counts: number[];
};

/** A paper whose filename and note disagree about which shift it is. */
export type LabelConflict = {
  sourceFile: string;
  pyqNote: string | null;
  fileShift: number;
  noteShift: number;
};

/** Month names as they appear in `pyq_note`, in calendar order. */
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const ROMAN_VALUES: Record<string, number> = {
  i: 1,
  v: 5,
  x: 10,
};

/**
 * Read a shift token into a number, or return null if it is not one.
 *
 * Handles arabic ("1"), roman ("II", "ii") and the pipe-corrupted roman the
 * 2025 PCM file stores ("||"). The pipe case is not defensive padding: a
 * roman "I" degrading into "|" is a known outcome of this project's text
 * pipelines, and that row's only shift signal is those two characters.
 *
 * Returns null rather than falling back to 1, because a fabricated shift
 * number would print in the tooltip as though it were measured.
 */
export function shiftTokenToNumber(token: string): number | null {
  const tok = token.trim();
  if (!tok) return null;

  if (/^\d+$/.test(tok)) {
    const n = Number(tok);
    return n > 0 ? n : null;
  }

  // A run of pipes is a mangled roman numeral: "||" was "II".
  if (/^\|+$/.test(tok)) return tok.length;

  if (/^[ivx]+$/i.test(tok)) return romanToNumber(tok.toLowerCase());

  return null;
}

function romanToNumber(roman: string): number | null {
  let total = 0;
  for (let i = 0; i < roman.length; i += 1) {
    const value = ROMAN_VALUES[roman[i]];
    if (value === undefined) return null;
    const next = ROMAN_VALUES[roman[i + 1]];
    total += next !== undefined && next > value ? -value : value;
  }
  return total > 0 ? total : null;
}

/**
 * Pull day / month / shift out of a `pyq_note`.
 *
 * The five shapes present in the bank, all pinned by test:
 *   "10th May Shift 1"   ordinal day, arabic shift        (2023, 2024)
 *   "19 April Shift I"   bare day, ROMAN shift            (2025)
 *   "3rd May 2nd Shift"  shift stated BEFORE the keyword  (one 2023 paper)
 *   "May Shift 1"        month, no day                    (2021)
 *   "Shift ||"           roman corrupted to pipes         (2025 PCM)
 */
export function parseShiftNote(note: string | null): ParsedNote {
  const empty: ParsedNote = { day: null, month: null, shift: null };
  if (!note) return empty;

  const text = note.trim();
  if (!text) return empty;

  const month =
    MONTHS.find((m) => new RegExp(`\\b${m}\\b`, "i").test(text)) ?? null;

  // Shift first, so its ordinal ("2nd Shift") cannot be mistaken for a day.
  // Both orders occur, and "Shift" is the anchor in each.
  const shiftAfter = text.match(/\bshift\s*([0-9]+|[ivx]+|\|+)/i);
  const shiftBefore = text.match(/\b([0-9]+|[ivx]+)\s*(?:st|nd|rd|th)?\s+shift\b/i);
  const shiftToken = shiftAfter?.[1] ?? shiftBefore?.[1] ?? "";
  const shift = shiftToken ? shiftTokenToNumber(shiftToken) : null;

  // The day is a 1-2 digit number outside the shift phrase. Capping at two
  // digits is what keeps a year ("10th May 2023 Shift 1") out of the day slot.
  const withoutShift = text
    .replace(/\bshift\s*([0-9]+|[ivx]+|\|+)/gi, " ")
    .replace(/\b([0-9]+|[ivx]+)\s*(?:st|nd|rd|th)?\s+shift\b/gi, " ");
  const dayMatch = withoutShift.match(/\b(\d{1,2})(?:st|nd|rd|th)?\b/i);
  const day = dayMatch ? Number(dayMatch[1]) : null;

  return {
    day: day !== null && day >= 1 && day <= 31 ? day : null,
    month,
    shift,
  };
}

/** The shift a FILENAME claims (`_Shift2`, `_S1`), or null if it claims none. */
function shiftFromFileName(sourceFile: string): number | null {
  const m = sourceFile.match(/_(?:shift|s)[\s_]*(\d+)/i);
  return m ? Number(m[1]) : null;
}

/**
 * Name a column for its tooltip.
 *
 * An undated paper SAYS it is undated. The sub-header shows only a sequence
 * number, so the tooltip is the reader's only way to tell a real date from a
 * missing one — and three of the 45 papers have no date.
 */
function titleFor(p: SourcePaper, parsed: ParsedNote, disputed: boolean): string {
  const shiftPart = parsed.shift !== null ? `Shift ${parsed.shift}` : null;

  const parts: string[] = [];
  if (parsed.day !== null && parsed.month !== null) {
    parts.push(`${parsed.day} ${parsed.month} ${p.year}`);
    if (shiftPart) parts.push(shiftPart);
  } else {
    parts.push(String(p.year));
    if (shiftPart) parts.push(shiftPart);
    parts.push("date not recorded");
  }

  // Without this, the two 3 May 2023 papers both read "Shift 2" and the
  // reader sees a duplicate rather than a known defect in the source labels.
  if (disputed) parts.push("shift label disputed");

  return parts.join(" · ");
}

/**
 * Order the papers into columns: year ascending, then date, then shift.
 *
 * UNDATED PAPERS SORT LAST WITHIN THEIR YEAR and are never slotted at a
 * plausible-looking position — the column order is a claim, and for those
 * three papers we have nothing to back it with. Ties break on `source_file`
 * so a regenerated data file diffs cleanly.
 */
export function orderPapers(papers: SourcePaper[]): ShiftPaper[] {
  const disputed = new Set(
    detectLabelConflicts(papers).map((c) => c.sourceFile)
  );
  const parsed = papers.map((p) => ({ paper: p, note: parseShiftNote(p.pyqNote) }));

  parsed.sort((a, b) => {
    if (a.paper.year !== b.paper.year) return a.paper.year - b.paper.year;

    // Dated before undated. A paper with a month but no day is still undated:
    // it cannot be placed against its neighbours.
    const aDated = a.note.day !== null;
    const bDated = b.note.day !== null;
    if (aDated !== bDated) return aDated ? -1 : 1;

    if (aDated && bDated) {
      const aMonth = a.note.month ? MONTHS.indexOf(a.note.month as never) : 99;
      const bMonth = b.note.month ? MONTHS.indexOf(b.note.month as never) : 99;
      if (aMonth !== bMonth) return aMonth - bMonth;
      if (a.note.day !== b.note.day) return (a.note.day ?? 0) - (b.note.day ?? 0);
    }

    const aShift = a.note.shift ?? 99;
    const bShift = b.note.shift ?? 99;
    if (aShift !== bShift) return aShift - bShift;

    return a.paper.sourceFile.localeCompare(b.paper.sourceFile);
  });

  const seqByYear = new Map<number, number>();
  return parsed.map(({ paper, note }) => {
    const seq = (seqByYear.get(paper.year) ?? 0) + 1;
    seqByYear.set(paper.year, seq);
    return {
      id: paper.sourceFile,
      year: paper.year,
      seq,
      label: String(seq),
      title: titleFor(paper, note, disputed.has(paper.sourceFile)),
      dated: note.day !== null,
      disputed: disputed.has(paper.sourceFile),
      day: note.day,
      month: note.month,
      shift: note.shift,
    };
  });
}

/**
 * Find papers whose filename and note disagree about the shift number.
 *
 * `MHT_CET_3rdMay2023_S1_QB.xlsx` is noted "3rd May 2nd Shift" while a
 * separate `MHT_CET_3rdMay2023_Shift2_QuestionBank.xlsx` also exists, so one
 * of the two labels is wrong and the bank does not say which. Both papers are
 * genuine and distinct, so both keep their column — only the LABEL is in
 * doubt. The generator prints these; it does not resolve them. Picking a side
 * silently would put a number in a tooltip that nothing supports.
 */
export function detectLabelConflicts(papers: SourcePaper[]): LabelConflict[] {
  const conflicts: LabelConflict[] = [];
  for (const p of papers) {
    const fileShift = shiftFromFileName(p.sourceFile);
    const noteShift = parseShiftNote(p.pyqNote).shift;
    if (fileShift === null || noteShift === null) continue;
    if (fileShift !== noteShift) {
      conflicts.push({
        sourceFile: p.sourceFile,
        pyqNote: p.pyqNote,
        fileShift,
        noteShift,
      });
    }
  }
  return conflicts;
}

/**
 * Heaviest chapter first; ties on name so the generated file is stable.
 *
 * Shared by both tables on purpose — they sit on the same page, and a reader
 * tracking one chapter down both must not have to re-find it.
 */
function byTotalThenName(
  a: { chapter: string; total: number },
  b: { chapter: string; total: number }
): number {
  if (a.total !== b.total) return b.total - a.total;
  return a.chapter.localeCompare(b.chapter);
}

/**
 * Lay the per-(paper, chapter) counts out as a grid aligned to `papers`.
 *
 * A chapter absent from a paper is written as 0, not left undefined: it
 * genuinely scored zero there, and an empty cell would read as "not
 * measured" — the opposite claim. Throws on a cell naming an unknown paper
 * rather than dropping it, because a silent drop breaks the conservation
 * property that makes the table's "Paper total" footer meaningful.
 */
export function buildChapterMatrix(
  cells: MatrixCell[],
  papers: ShiftPaper[]
): MatrixRow[] {
  const columnOf = new Map(papers.map((p, i) => [p.id, i]));
  const rows = new Map<string, number[]>();

  for (const cell of cells) {
    const column = columnOf.get(cell.sourceFile);
    if (column === undefined) {
      throw new Error(
        `cell references a paper that is not a column: ${cell.sourceFile}`
      );
    }
    let counts = rows.get(cell.chapter);
    if (!counts) {
      counts = new Array<number>(papers.length).fill(0);
      rows.set(cell.chapter, counts);
    }
    counts[column] += cell.count;
  }

  return [...rows.entries()]
    .map(([chapter, counts]) => ({
      chapter,
      total: counts.reduce((a, b) => a + b, 0),
      counts,
    }))
    .sort(byTotalThenName);
}

/** A year column in the rate table, carrying the divisor it was computed with. */
export type YearColumn = { year: number; shifts: number };

/** A chapter's per-paper rate in each year. Always a number — never a dash. */
export type YearRateRow = {
  chapter: string;
  total: number;
  rates: number[];
};

/**
 * Summarise the grid as questions-per-paper by year.
 *
 * EACH YEAR DIVIDES BY ITS OWN SHIFT COUNT. Dividing by a bank-wide total
 * would understate every rate by the ratio of the year to the bank — the
 * precise error this page exists to warn readers about.
 *
 * A chapter that scored nothing in a year gets a real 0, not a null: the
 * page's headline finding is that Measures of Dispersion ran 1.0 a paper for
 * two years and then zero across all 14 shifts of 2025, and a dash there
 * would read as missing data instead of as the finding.
 */
export function buildYearRateMatrix(
  cells: MatrixCell[],
  papers: ShiftPaper[]
): { years: YearColumn[]; rows: YearRateRow[] } {
  const shiftsByYear = new Map<number, number>();
  for (const p of papers) {
    shiftsByYear.set(p.year, (shiftsByYear.get(p.year) ?? 0) + 1);
  }
  const years: YearColumn[] = [...shiftsByYear.entries()]
    .map(([year, shifts]) => ({ year, shifts }))
    .sort((a, b) => a.year - b.year);

  const yearOf = new Map(papers.map((p) => [p.id, p.year]));
  const columnOf = new Map(years.map((y, i) => [y.year, i]));

  const totals = new Map<string, number[]>();
  for (const cell of cells) {
    const year = yearOf.get(cell.sourceFile);
    if (year === undefined) {
      throw new Error(
        `cell references a paper that is not a column: ${cell.sourceFile}`
      );
    }
    let perYear = totals.get(cell.chapter);
    if (!perYear) {
      perYear = new Array<number>(years.length).fill(0);
      totals.set(cell.chapter, perYear);
    }
    perYear[columnOf.get(year)!] += cell.count;
  }

  const rows = [...totals.entries()]
    .map(([chapter, perYear]) => ({
      chapter,
      total: perYear.reduce((a, b) => a + b, 0),
      // 2 dp is the resolution the table prints; rounding here keeps the
      // generated file byte-stable rather than leaving float tails in it.
      rates: perYear.map((q, i) => round2(q / years[i].shifts)),
    }))
    .sort(byTotalThenName);

  return { years, rows };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
