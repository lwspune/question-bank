/**
 * The pure core behind the MHT-CET Maths chapter x shift matrix.
 *
 * WHY THIS MATRIX NEEDED A PURE CORE AT ALL. The NDA equivalent
 * (`nda-maths/_data/trends.ts`) is 19 columns of hand-authored numbers. This
 * one is 45 columns x 27 chapters = 1,215 cells, so it is generated from the
 * bank instead — and the only part of that generation worth testing is the
 * part that decides WHICH COLUMN a paper is and WHAT IT IS CALLED. The counts
 * themselves are a `GROUP BY`; the labelling is where judgement lives, and
 * judgement is what rots.
 *
 * THE LABELLING IS GENUINELY MESSY, which is the reason these tests exist.
 * `questions.pyq_note` carries FIVE different shapes across the 45 papers:
 *
 *     "10th May Shift 1"   ordinal day + arabic shift      (2023, 2024)
 *     "19 April Shift I"   bare day + ROMAN shift          (2025)
 *     "3rd May 2nd Shift"  shift stated BEFORE the word    (one 2023 paper)
 *     "May Shift 1"        month, no day                   (2021)
 *     "Shift ||"           roman II corrupted to pipes     (2025 PCM file)
 *
 * A parser that handles four of those five silently mislabels a column, and a
 * mislabelled column in a trends table is worse than a missing one: the reader
 * has no way to tell. So every shape above is pinned here by example.
 *
 * TWO REFUSALS ARE PART OF THE CONTRACT, not gaps in it:
 *   1. An UNDATED paper is never given a guessed position. Three real papers
 *      carry no date at all; they sort last within their year and say so.
 *   2. A paper whose FILENAME and NOTE disagree about the shift number is
 *      REPORTED, never silently resolved. `MHT_CET_3rdMay2023_S1_QB.xlsx` is
 *      noted "3rd May 2nd Shift" while a separate `..._Shift2` file also
 *      exists, so one of the two labels is wrong and we cannot tell which.
 */
import { describe, it, expect } from "vitest";
import {
  parseShiftNote,
  shiftTokenToNumber,
  orderPapers,
  detectLabelConflicts,
  buildChapterMatrix,
  buildYearRateMatrix,
  type SourcePaper,
  type MatrixCell,
} from "../scripts/lib/mhtcetTrendsMatrix";

/** A paper as the bank hands it over: one distinct `source_file`. */
function paper(
  sourceFile: string,
  year: number,
  pyqNote: string | null
): SourcePaper {
  return { sourceFile, year, pyqNote };
}

describe("shiftTokenToNumber", () => {
  it.each([
    ["1", 1, "arabic"],
    ["2", 2, "arabic"],
    ["I", 1, "roman"],
    ["II", 2, "roman"],
    ["i", 1, "lowercase roman"],
    ["ii", 2, "lowercase roman"],
  ])("%s -> %i (%s)", (tok, want) => {
    expect(shiftTokenToNumber(tok)).toBe(want);
  });

  it("reads a run of pipes as the roman numeral it was mangled from", () => {
    // The 2025 PCM file literally stores "Shift ||". A pipe is what a roman
    // "I" degrades into through several of this project's text pipelines, so
    // two pipes is shift 2. Mapping it beats dropping the only shift signal
    // the row has.
    expect(shiftTokenToNumber("||")).toBe(2);
    expect(shiftTokenToNumber("|")).toBe(1);
  });

  it("returns null rather than guessing at a token it does not know", () => {
    // A silent fallback here would invent a shift number for a paper that
    // never stated one, and the table would print it as measured.
    expect(shiftTokenToNumber("")).toBeNull();
    expect(shiftTokenToNumber("first")).toBeNull();
    expect(shiftTokenToNumber("III")).toBe(3); // roman still works past II
    expect(shiftTokenToNumber("?")).toBeNull();
  });
});

describe("parseShiftNote", () => {
  it("reads the ordinal-day + arabic-shift shape (2023, 2024 — 29 papers)", () => {
    expect(parseShiftNote("10th May Shift 1")).toEqual({
      day: 10,
      month: "May",
      shift: 1,
    });
    expect(parseShiftNote("2nd May Shift 2")).toEqual({
      day: 2,
      month: "May",
      shift: 2,
    });
    expect(parseShiftNote("16th May Shift 2")).toEqual({
      day: 16,
      month: "May",
      shift: 2,
    });
  });

  it("reads the bare-day + ROMAN-shift shape (2025 — 13 papers)", () => {
    expect(parseShiftNote("19 April Shift I")).toEqual({
      day: 19,
      month: "April",
      shift: 1,
    });
    expect(parseShiftNote("26 April Shift II")).toEqual({
      day: 26,
      month: "April",
      shift: 2,
    });
  });

  it("reads the shift when it is stated BEFORE the word 'Shift'", () => {
    // "3rd May 2nd Shift" — the one paper that inverts the order. A parser
    // anchored only on /Shift\s+(\w+)/ reads this as shift-less and the
    // column loses its label.
    expect(parseShiftNote("3rd May 2nd Shift")).toEqual({
      day: 3,
      month: "May",
      shift: 2,
    });
  });

  it("reads a month with no day (2021)", () => {
    expect(parseShiftNote("May Shift 1")).toEqual({
      day: null,
      month: "May",
      shift: 1,
    });
  });

  it("reads a bare shift with neither day nor month (2022, and one 2023)", () => {
    expect(parseShiftNote("Shift 1")).toEqual({
      day: null,
      month: null,
      shift: 1,
    });
  });

  it("reads the pipe-corrupted shift (2025 PCM)", () => {
    expect(parseShiftNote("Shift ||")).toEqual({
      day: null,
      month: null,
      shift: 2,
    });
  });

  it("returns all-null for an absent note instead of throwing", () => {
    expect(parseShiftNote(null)).toEqual({ day: null, month: null, shift: null });
    expect(parseShiftNote("")).toEqual({ day: null, month: null, shift: null });
  });

  it("does not mistake the YEAR inside a note for a day-of-month", () => {
    // Some source files carry the year in the note. Here the real day comes
    // first, so first-match alone is enough.
    expect(parseShiftNote("10th May 2023 Shift 1")).toEqual({
      day: 10,
      month: "May",
      shift: 1,
    });
  });

  it("refuses a year as the day when the note carries NO day at all", () => {
    // With no "10th" to match first, "2023" is the only number the day pattern
    // sees, and a day of 2023 would sort that paper past every other column in
    // its year. Two independent guards stop it — the `\b(\d{1,2})\b` pattern
    // (a 4-digit run has no word boundary two characters in) and the 1..31
    // range check. Either alone is sufficient here, which is why the next test
    // exists: it isolates the one case only the range check can catch.
    //
    // No note in the bank is shaped like this today. The guard is pinned
    // because the parser will outlive the current 45 notes.
    expect(parseShiftNote("2023 Shift 1")).toEqual({
      day: null,
      month: null,
      shift: 1,
    });
    expect(parseShiftNote("May 2023 Shift 2")).toEqual({
      day: null,
      month: "May",
      shift: 2,
    });
  });

  it("refuses a two-digit number that is not a possible day", () => {
    // The case the 1..31 range check ALONE catches: "45" clears the digit
    // pattern and its word boundaries, so only the range check can reject it.
    // Without this test the range check is unpinned — deleting it leaves every
    // other test green, which is how a redundant-looking guard gets removed.
    expect(parseShiftNote("45 May Shift 1").day).toBeNull();
    expect(parseShiftNote("99 April Shift II").day).toBeNull();
    // 31 is a real day and must survive.
    expect(parseShiftNote("31 May Shift 1").day).toBe(31);
  });
});

describe("orderPapers", () => {
  it("orders a year by date, then by shift within a day", () => {
    const papers = orderPapers([
      paper("b.xlsx", 2023, "10th May Shift 2"),
      paper("a.xlsx", 2023, "2nd May Shift 1"),
      paper("c.xlsx", 2023, "10th May Shift 1"),
      paper("d.xlsx", 2023, "2nd May Shift 2"),
    ]);
    expect(papers.map((p) => p.id)).toEqual([
      "a.xlsx", // 2 May S1
      "d.xlsx", // 2 May S2
      "c.xlsx", // 10 May S1
      "b.xlsx", // 10 May S2
    ]);
  });

  it("orders across months, not by day number alone", () => {
    const papers = orderPapers([
      paper("may.xlsx", 2025, "2nd May Shift 1"),
      paper("apr.xlsx", 2025, "19 April Shift I"),
    ]);
    expect(papers.map((p) => p.id)).toEqual(["apr.xlsx", "may.xlsx"]);
  });

  it("puts UNDATED papers last within their year, never at a guessed date", () => {
    // Three real papers have no date: MHT_CET_2022_Analysis,
    // MHT_CET_2023_Analysis and MHT_CET_2025_PCM. Slotting them at a plausible
    // position would make the column order a claim we cannot support.
    //
    // THE FIXTURE IS ADVERSARIAL ON PURPOSE. The undated paper is named so it
    // sorts FIRST on the filename tiebreak, and carries the LOWEST shift
    // number, so every fallback key in the comparator would place it at the
    // front. Only the dated-before-undated rule can push it to the back.
    // An earlier version of this test used "analysis.xlsx" against "2nd.xlsx"
    // and "16th.xlsx" — which sorts last on filename anyway, so the test went
    // on passing with the rule deleted. It was asserting the right order for
    // the wrong reason.
    const papers = orderPapers([
      paper("aaa-undated.xlsx", 2023, "Shift 1"),
      paper("zzz-16th.xlsx", 2023, "16th May Shift 2"),
      paper("zzz-2nd.xlsx", 2023, "2nd May Shift 2"),
    ]);
    expect(papers.map((p) => p.id)).toEqual([
      "zzz-2nd.xlsx",
      "zzz-16th.xlsx",
      "aaa-undated.xlsx",
    ]);
    expect(papers.map((p) => p.dated)).toEqual([true, true, false]);
  });

  it("places an undated paper last even when it alone carries a month", () => {
    // A month without a day is still undated: "May Shift 1" cannot be ordered
    // against "2nd May Shift 1" without inventing a day for it. This is the
    // 2021 note's exact shape, and the rule must not soften to "has a month".
    const papers = orderPapers([
      paper("aaa-month-only.xlsx", 2023, "May Shift 1"),
      paper("zzz-dated.xlsx", 2023, "2nd May Shift 2"),
    ]);
    expect(papers.map((p) => p.id)).toEqual([
      "zzz-dated.xlsx",
      "aaa-month-only.xlsx",
    ]);
  });

  it("orders years ascending and numbers each year's shifts from 1", () => {
    const papers = orderPapers([
      paper("y25.docx", 2025, "19 April Shift I"),
      paper("y23a.xlsx", 2023, "2nd May Shift 1"),
      paper("y23b.xlsx", 2023, "2nd May Shift 2"),
    ]);
    expect(papers.map((p) => p.year)).toEqual([2023, 2023, 2025]);
    // `seq` is the visible sub-header label: which sitting of THAT year.
    expect(papers.map((p) => p.seq)).toEqual([1, 2, 1]);
    expect(papers.map((p) => p.label)).toEqual(["1", "2", "1"]);
  });

  it("gives a dated paper a tooltip naming the real date and shift", () => {
    const [p] = orderPapers([paper("x.xlsx", 2023, "2nd May Shift 1")]);
    expect(p.title).toBe("2 May 2023 · Shift 1");
  });

  it("gives an undated paper a tooltip that SAYS it is undated", () => {
    // The reader must be able to tell a real date from a missing one by
    // hovering, because the sub-header shows only a sequence number.
    const [p] = orderPapers([paper("analysis.xlsx", 2023, "Shift 1")]);
    expect(p.title).toBe("2023 · Shift 1 · date not recorded");
  });

  it("names a paper with no shift either, rather than printing a bare year", () => {
    const [p] = orderPapers([paper("mystery.xlsx", 2023, null)]);
    expect(p.title).toBe("2023 · date not recorded");
  });

  it("marks a paper whose filename and note disagree, in the tooltip and on the row", () => {
    // Without this, the two real 3 May 2023 papers both render the tooltip
    // "3 May 2023 · Shift 2" — because the S1 file is noted "2nd Shift". The
    // reader then sees what looks like a duplicated column instead of a known
    // defect in the source labels, and has no way to tell the two apart.
    const papers = orderPapers([
      paper("MHT_CET_3rdMay2023_S1_QB.xlsx", 2023, "3rd May 2nd Shift"),
      paper("MHT_CET_3rdMay2023_Shift2_QuestionBank.xlsx", 2023, "3rd May Shift 2"),
    ]);
    const suspect = papers.find((p) => p.id.includes("S1_QB"))!;
    const clean = papers.find((p) => p.id.includes("Shift2_Question"))!;

    expect(suspect.disputed).toBe(true);
    expect(suspect.title).toBe("3 May 2023 · Shift 2 · shift label disputed");
    expect(clean.disputed).toBe(false);
    expect(clean.title).toBe("3 May 2023 · Shift 2");
    // The two tooltips must differ — that is the whole point.
    expect(suspect.title).not.toBe(clean.title);
  });

  it("leaves an undisputed paper's tooltip clean", () => {
    const [p] = orderPapers([
      paper("MHT_CET_10thMay2023_Shift1.xlsx", 2023, "10th May Shift 1"),
    ]);
    expect(p.disputed).toBe(false);
    expect(p.title).toBe("10 May 2023 · Shift 1");
  });

  it("is deterministic for two undated papers in the same year", () => {
    // Ties break on source_file so a regenerated file diffs cleanly.
    const papers = orderPapers([
      paper("zeta.xlsx", 2023, "Shift 1"),
      paper("alpha.xlsx", 2023, "Shift 1"),
    ]);
    expect(papers.map((p) => p.id)).toEqual(["alpha.xlsx", "zeta.xlsx"]);
  });
});

describe("detectLabelConflicts", () => {
  it("reports the 3 May 2023 paper whose filename and note disagree", () => {
    // MHT_CET_3rdMay2023_S1_QB.xlsx is noted "3rd May 2nd Shift", and a
    // SEPARATE MHT_CET_3rdMay2023_Shift2 file also exists — so one of the two
    // labels is wrong and nothing in the bank says which. Both papers are
    // real and distinct, so both keep their column; only the label is in
    // doubt, and the generator prints that doubt rather than resolving it.
    const conflicts = detectLabelConflicts([
      paper("MHT_CET_3rdMay2023_S1_QB.xlsx", 2023, "3rd May 2nd Shift"),
      paper("MHT_CET_3rdMay2023_Shift2_QuestionBank.xlsx", 2023, "3rd May Shift 2"),
    ]);
    expect(conflicts).toHaveLength(1);
    expect(conflicts[0]).toMatchObject({
      sourceFile: "MHT_CET_3rdMay2023_S1_QB.xlsx",
      fileShift: 1,
      noteShift: 2,
    });
  });

  it("stays silent when filename and note agree", () => {
    expect(
      detectLabelConflicts([
        paper("MHT_CET_10thMay2023_Shift1.xlsx", 2023, "10th May Shift 1"),
        paper("MHT_CET_2025_Apr_19_S2.docx", 2025, "19 April Shift II"),
      ])
    ).toEqual([]);
  });

  it("stays silent when the filename states no shift to disagree with", () => {
    // Absence of a second opinion is not a conflict.
    expect(
      detectLabelConflicts([paper("MHT_CET_2023_Analysis.xlsx", 2023, "Shift 1")])
    ).toEqual([]);
  });

  it("survives the misspelt filename without inventing a conflict", () => {
    // "14tthMay2024" — a real typo in the bank. The date is unparseable from
    // the filename but the SHIFT still reads, and it agrees with the note.
    expect(
      detectLabelConflicts([
        paper("MHT_CET_14tthMay2024_Shift2.xlsx", 2024, "14th May Shift 2"),
      ])
    ).toEqual([]);
  });
});

describe("buildChapterMatrix", () => {
  const papers = orderPapers([
    paper("p1.xlsx", 2023, "2nd May Shift 1"),
    paper("p2.xlsx", 2023, "2nd May Shift 2"),
    paper("p3.xlsx", 2025, "19 April Shift I"),
  ]);

  const cells: MatrixCell[] = [
    { sourceFile: "p1.xlsx", chapter: "Vectors", count: 5 },
    { sourceFile: "p2.xlsx", chapter: "Vectors", count: 6 },
    { sourceFile: "p3.xlsx", chapter: "Vectors", count: 4 },
    { sourceFile: "p1.xlsx", chapter: "Circle", count: 1 },
    { sourceFile: "p3.xlsx", chapter: "Circle", count: 2 },
  ];

  it("aligns every row 1:1 to the ordered paper list", () => {
    const rows = buildChapterMatrix(cells, papers);
    for (const row of rows) expect(row.counts).toHaveLength(papers.length);
  });

  it("writes 0 — not a gap — where a chapter missed a paper", () => {
    // A chapter absent from a paper genuinely scored zero there. Leaving the
    // slot undefined would let a renderer print an empty cell that reads as
    // "not measured", which is the opposite of what happened.
    const circle = buildChapterMatrix(cells, papers).find(
      (r) => r.chapter === "Circle"
    )!;
    expect(circle.counts).toEqual([1, 0, 2]);
  });

  it("sorts chapters by lifetime total, heaviest first", () => {
    expect(buildChapterMatrix(cells, papers).map((r) => r.chapter)).toEqual([
      "Vectors", // 15
      "Circle", // 3
    ]);
  });

  it("breaks a total tie on chapter name so the generated file is stable", () => {
    const tied: MatrixCell[] = [
      { sourceFile: "p1.xlsx", chapter: "Zeta", count: 2 },
      { sourceFile: "p1.xlsx", chapter: "Alpha", count: 2 },
    ];
    expect(buildChapterMatrix(tied, papers).map((r) => r.chapter)).toEqual([
      "Alpha",
      "Zeta",
    ]);
  });

  it("carries a total that equals its own row", () => {
    const rows = buildChapterMatrix(cells, papers);
    for (const row of rows) {
      expect(row.total).toBe(row.counts.reduce((a, b) => a + b, 0));
    }
  });

  it("conserves every question it was given", () => {
    // The invariant that makes the table's "Paper total" footer meaningful:
    // nothing is dropped between the GROUP BY and the grid.
    const rows = buildChapterMatrix(cells, papers);
    const inTotal = cells.reduce((a, c) => a + c.count, 0);
    const outTotal = rows.reduce((a, r) => a + r.total, 0);
    expect(outTotal).toBe(inTotal);
  });

  it("throws on a cell naming a paper that is not in the column list", () => {
    // Silently dropping it would break the conservation invariant above
    // exactly when the bank grows a paper the query did not pick up.
    expect(() =>
      buildChapterMatrix(
        [{ sourceFile: "ghost.xlsx", chapter: "Vectors", count: 3 }],
        papers
      )
    ).toThrow(/ghost\.xlsx/);
  });
});

describe("buildYearRateMatrix", () => {
  // Two shifts in 2023, one in 2025 — the uneven shape that makes raw counts
  // incomparable across years and rates the only honest summary.
  const papers = orderPapers([
    paper("p1.xlsx", 2023, "2nd May Shift 1"),
    paper("p2.xlsx", 2023, "2nd May Shift 2"),
    paper("p3.xlsx", 2025, "19 April Shift I"),
  ]);

  const cells: MatrixCell[] = [
    { sourceFile: "p1.xlsx", chapter: "Vectors", count: 5 },
    { sourceFile: "p2.xlsx", chapter: "Vectors", count: 6 },
    { sourceFile: "p3.xlsx", chapter: "Vectors", count: 4 },
    { sourceFile: "p1.xlsx", chapter: "Dispersion", count: 1 },
    { sourceFile: "p2.xlsx", chapter: "Dispersion", count: 1 },
  ];

  it("reports one year column per year present, ascending, with its shift count", () => {
    const { years } = buildYearRateMatrix(cells, papers);
    expect(years).toEqual([
      { year: 2023, shifts: 2 },
      { year: 2025, shifts: 1 },
    ]);
  });

  it("divides by the year's OWN shift count, not by a bank-wide total", () => {
    // 11 questions over 2 shifts is 5.5 a paper. Dividing by 3 (the whole
    // bank) would understate it by a third — this is the exact error the page
    // exists to warn about.
    const { rows } = buildYearRateMatrix(cells, papers);
    const vectors = rows.find((r) => r.chapter === "Vectors")!;
    expect(vectors.rates).toEqual([5.5, 4]);
  });

  it("rounds to 2 dp, the resolution the table prints", () => {
    const { rows } = buildYearRateMatrix(
      [
        { sourceFile: "p1.xlsx", chapter: "Thirds", count: 1 },
        { sourceFile: "p2.xlsx", chapter: "Thirds", count: 0 },
        { sourceFile: "p3.xlsx", chapter: "Thirds", count: 1 },
      ],
      papers
    );
    expect(rows[0].rates).toEqual([0.5, 1]);
  });

  it("reports a genuine 0.00 for a chapter that left the paper", () => {
    // Measures of Dispersion is the headline of this page: 1.0 a paper for two
    // years, then zero across all 14 shifts of 2025. A null or a dash there
    // would read as "not measured" and destroy the finding.
    const { rows } = buildYearRateMatrix(cells, papers);
    const dispersion = rows.find((r) => r.chapter === "Dispersion")!;
    expect(dispersion.rates).toEqual([1, 0]);
  });

  it("sorts rows the same way the shift matrix does", () => {
    // The two tables sit on the same page; a reader tracking one chapter down
    // both must not have to re-find it.
    const { rows } = buildYearRateMatrix(cells, papers);
    expect(rows.map((r) => r.chapter)).toEqual(
      buildChapterMatrix(cells, papers).map((r) => r.chapter)
    );
  });
});
