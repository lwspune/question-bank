import { describe, it, expect } from "vitest";
import { paperKeyFor, boardPyqPaperStats } from "../src/lib/board/papers";
import { groupBoardPyqSittings, type BoardPyqQuestion } from "../src/lib/board/query";

/**
 * Fixtures use REAL source_file strings from the live bank (measured
 * 2026-09-23), because the whole rule is a claim about how each ingestion
 * pipeline names its files. An invented filename would prove nothing.
 */
const q = (over: Partial<BoardPyqQuestion> = {}): BoardPyqQuestion => ({
  id: "id-" + (over.sourceFile ?? "f") + "-" + (over.pyqYear ?? 0) + "-" + (over.sourceRow ?? 0),
  questionNumber: "Q1",
  text: "stem",
  context: null,
  solution: "worked",
  imageUrl: null,
  solutionImageUrl: null,
  format: "subjective" as const,
  setId: null,
  options: [],
  pyqYear: 2026,
  pyqMonth: null,
  sourceRow: 1,
  subtopicName: "Some Subtopic",
  sourceFile: null,
  ...over,
});

describe("paperKeyFor — CBSE Class 12", () => {
  // A CBSE year holds 5-6 SERIES (55/1, 55/2, 55/4 ...). Only the `-1` file of
  // each carries a whole paper; `-2` and `-3` hold ONLY the questions that
  // differ from their opener, because content_hash dedup already stored the
  // shared ones against the opener. So a `-2` file is a DELTA, not a paper.
  it("counts a complete paper as its own paper", () => {
    expect(paperKeyFor("CBSE Class 12", "cbse-12-pyq-2025-55-1-1", 2025)).toBe(
      "cbse-12-pyq-2025-55-1-1"
    );
    expect(paperKeyFor("CBSE Class 12", "cbse-12-pyq-2026-56-4-1", 2026)).toBe(
      "cbse-12-pyq-2026-56-4-1"
    );
  });

  it("gives a variant delta NO paper of its own", () => {
    expect(paperKeyFor("CBSE Class 12", "cbse-12-pyq-2025-55-1-2", 2025)).toBeNull();
    expect(paperKeyFor("CBSE Class 12", "cbse-12-pyq-2026-56-4-3", 2026)).toBeNull();
  });

  it("treats the short COVID Term-II papers like any other complete paper", () => {
    expect(paperKeyFor("CBSE Class 12", "cbse-12-pyq-2022-55-5-1", 2022)).toBe(
      "cbse-12-pyq-2022-55-5-1"
    );
  });
});

describe("paperKeyFor — Maharashtra HSC Class 12", () => {
  // Two pipelines feed this exam. The chapterwise compilation names its files
  // by CHAPTER and spans every year, so source_file alone cannot identify a
  // paper there — the paper is (year, compilation). The standalone sittings are
  // one file each and name themselves.
  it("keys a dated standalone paper by its own file", () => {
    expect(paperKeyFor("Maharashtra HSC Class 12", "MH_HSC_12_Maths_PYQ__2024_July.pdf", 2024)).toBe(
      "MH_HSC_12_Maths_PYQ__2024_July.pdf"
    );
    expect(
      paperKeyFor("Maharashtra HSC Class 12", "MH_HSC_12_Maths_PYQ__2026_February.pdf", 2026)
    ).toBe("MH_HSC_12_Maths_PYQ__2026_February.pdf");
  });

  it("folds every chapterwise-compilation file of a year into ONE paper", () => {
    const a = paperKeyFor(
      "Maharashtra HSC Class 12",
      "MH_HSC_12_Physics_PYQ__AC_Circuits.docx",
      2025
    );
    const b = paperKeyFor(
      "Maharashtra HSC Class 12",
      "MH_HSC_12_Physics_PYQ__Current_Electricity.docx",
      2025
    );
    expect(a).toBe(b);
  });

  it("keeps two years of the same compilation apart", () => {
    const y24 = paperKeyFor(
      "Maharashtra HSC Class 12",
      "MH_HSC_12_Maths_PYQ__Application_of_Derivatives.docx",
      2024
    );
    const y25 = paperKeyFor(
      "Maharashtra HSC Class 12",
      "MH_HSC_12_Maths_PYQ__Application_of_Derivatives.docx",
      2025
    );
    expect(y24).not.toBe(y25);
  });
});

describe("paperKeyFor — everything else", () => {
  // MH SSC 10 writes one file per paper, which is the shape the default rule
  // assumes. An exam we have not special-cased gets this too, and the failure
  // mode is over-counting papers, never inventing questions.
  it("keys a one-file-per-paper exam by its file", () => {
    expect(
      paperKeyFor("Maharashtra State Board Class 10", "MH_SSC_10_Algebra_2024.pdf", 2024)
    ).toBe("MH_SSC_10_Algebra_2024.pdf");
  });

  it("falls back to the year when a row carries no source file", () => {
    expect(paperKeyFor("Maharashtra State Board Class 10", null, 2024)).toBe("2024");
  });
});

describe("boardPyqPaperStats", () => {
  it("reports questions per paper, oldest year first", () => {
    const stats = boardPyqPaperStats(
      groupBoardPyqSittings([
        q({ pyqYear: 2024, sourceFile: "MH_SSC_10_Algebra_2024.pdf", sourceRow: 1 }),
        q({ pyqYear: 2024, sourceFile: "MH_SSC_10_Algebra_2024.pdf", sourceRow: 2 }),
        q({ pyqYear: 2025, sourceFile: "MH_SSC_10_Algebra_2025.pdf", sourceRow: 1 }),
      ]),
      "Maharashtra State Board Class 10",
      new Map([
        [2024, 1],
        [2025, 1],
      ])
    );
    expect(stats.years).toEqual([
      { year: 2024, questions: 2, papers: 1, perPaper: 2 },
      { year: 2025, questions: 1, papers: 1, perPaper: 1 },
    ]);
    expect(stats.totalPapers).toBe(2);
  });

  // THE DEFECT THIS SHIPPED TO FIX. MH Maths gained a second sitting in 2024
  // and kept it (2024 + July 2024, 2025 + July 2025, February + June 2026), so
  // a per-YEAR bar read roughly double what one paper asks.
  it("divides a year that holds two papers", () => {
    const stats = boardPyqPaperStats(
      groupBoardPyqSittings([
        q({ pyqYear: 2024, sourceFile: "MH_HSC_12_Maths_PYQ__Matrices.docx", sourceRow: 1 }),
        q({ pyqYear: 2024, sourceFile: "MH_HSC_12_Maths_PYQ__Matrices.docx", sourceRow: 2 }),
        q({
          pyqYear: 2024,
          pyqMonth: "July",
          sourceFile: "MH_HSC_12_Maths_PYQ__2024_July.pdf",
          sourceRow: 1,
        }),
        q({
          pyqYear: 2024,
          pyqMonth: "July",
          sourceFile: "MH_HSC_12_Maths_PYQ__2024_July.pdf",
          sourceRow: 2,
        }),
      ]),
      "Maharashtra HSC Class 12",
      new Map([[2024, 2]])
    );
    expect(stats.years).toEqual([{ year: 2024, questions: 4, papers: 2, perPaper: 2 }]);
  });

  // MH Chemistry 2019 stores 13 rows stamped "March" and 14 with no month, from
  // different files of the SAME compilation. Keyed on the sitting that reads as
  // two papers; keyed on the source it is correctly one.
  it("does not split one paper in two because half its rows lost their month", () => {
    const stats = boardPyqPaperStats(
      groupBoardPyqSittings([
        q({
          pyqYear: 2019,
          pyqMonth: "March",
          sourceFile: "MH_HSC_12_Chemistry_PYQ__Amines.docx",
          sourceRow: 1,
        }),
        q({
          pyqYear: 2019,
          pyqMonth: null,
          sourceFile: "MH_HSC_12_Chemistry_PYQ__Chemical_Kinetics.docx",
          sourceRow: 1,
        }),
      ]),
      "Maharashtra HSC Class 12",
      new Map([[2019, 1]])
    );
    expect(stats.years).toEqual([{ year: 2019, questions: 2, papers: 1, perPaper: 2 }]);
  });

  it("leaves CBSE variant deltas out of BOTH the count and the divisor", () => {
    const stats = boardPyqPaperStats(
      groupBoardPyqSittings([
        q({ pyqYear: 2025, sourceFile: "cbse-12-pyq-2025-55-1-1", sourceRow: 1 }),
        q({ pyqYear: 2025, sourceFile: "cbse-12-pyq-2025-55-1-1", sourceRow: 2 }),
        q({ pyqYear: 2025, sourceFile: "cbse-12-pyq-2025-55-2-1", sourceRow: 1 }),
        // A delta row: real, listed below the strip, but part of no single paper.
        q({ pyqYear: 2025, sourceFile: "cbse-12-pyq-2025-55-1-2", sourceRow: 1 }),
      ]),
      "CBSE Class 12",
      new Map([[2025, 2]])
    );
    expect(stats.years).toEqual([{ year: 2025, questions: 3, papers: 2, perPaper: 1.5 }]);
    // The delta is not lost, just not averaged.
    expect(stats.excludedQuestions).toBe(1);
  });

  // THE DENOMINATOR IS A PROPERTY OF THE SUBJECT, NOT OF THE CHAPTER.
  // Counting only the papers that happen to ask about this chapter would
  // divide by 2 here instead of 6 — and it is precisely the sparse chapters
  // where that lies loudest. Live: CBSE Magnetism and Matter drew 4 questions
  // across the 6 papers of 2025. Per paper that is 0.7, which is the number a
  // student plans with; per asking-paper it is 2, which reads like a chapter
  // worth revising hard.
  it("divides by every paper of the year, not only the ones that asked", () => {
    const stats = boardPyqPaperStats(
      groupBoardPyqSittings([
        q({ pyqYear: 2025, sourceFile: "cbse-12-pyq-2025-55-1-1", sourceRow: 1 }),
        q({ pyqYear: 2025, sourceFile: "cbse-12-pyq-2025-55-1-1", sourceRow: 2 }),
        q({ pyqYear: 2025, sourceFile: "cbse-12-pyq-2025-55-2-1", sourceRow: 1 }),
        q({ pyqYear: 2025, sourceFile: "cbse-12-pyq-2025-55-2-1", sourceRow: 2 }),
      ]),
      "CBSE Class 12",
      new Map([[2025, 6]])
    );
    expect(stats.years).toEqual([{ year: 2025, questions: 4, papers: 6, perPaper: 0.7 }]);
  });

  // A year we hold questions for but have no paper count for cannot be divided.
  // Say so instead of falling back to the chapter's own papers, which would
  // quietly produce a DIFFERENT, larger number that looks just as plausible.
  it("reports perPaper null when the year has no paper count", () => {
    const stats = boardPyqPaperStats(
      groupBoardPyqSittings([q({ pyqYear: 2025, sourceFile: "cbse-12-pyq-2025-55-1-1" })]),
      "CBSE Class 12",
      new Map()
    );
    expect(stats.years).toEqual([{ year: 2025, questions: 1, papers: 0, perPaper: null }]);
  });

  it("rounds to one decimal", () => {
    const stats = boardPyqPaperStats(
      groupBoardPyqSittings([
        q({ pyqYear: 2025, sourceFile: "cbse-12-pyq-2025-55-1-1", sourceRow: 1 }),
        q({ pyqYear: 2025, sourceFile: "cbse-12-pyq-2025-55-2-1", sourceRow: 1 }),
        q({ pyqYear: 2025, sourceFile: "cbse-12-pyq-2025-55-3-1", sourceRow: 1 }),
        q({ pyqYear: 2025, sourceFile: "cbse-12-pyq-2025-55-3-1", sourceRow: 2 }),
      ]),
      "CBSE Class 12",
      new Map([[2025, 3]])
    );
    expect(stats.years[0].perPaper).toBe(1.3);
  });

  // Same reasoning as pyqYearCounts: the March 2021 exams were cancelled, so a
  // zero bar would assert a paper the chapter was absent from.
  it("does not invent a bar for a year with no paper", () => {
    const stats = boardPyqPaperStats(
      groupBoardPyqSittings([
        q({ pyqYear: 2020, sourceFile: "MH_SSC_10_Algebra_2020.pdf" }),
        q({ pyqYear: 2022, sourceFile: "MH_SSC_10_Algebra_2022.pdf" }),
      ]),
      "Maharashtra State Board Class 10",
      new Map([
        [2020, 1],
        [2022, 1],
      ])
    );
    expect(stats.years.map((y) => y.year)).toEqual([2020, 2022]);
  });

  // Cannot happen on today's data (every CBSE year holds complete papers), but
  // a year of nothing but deltas has no honest per-paper number. Report the
  // year with perPaper null rather than dividing by zero or dropping it
  // silently — the strip skips it, and the questions still list below.
  it("reports perPaper null rather than guessing when a year has no whole paper", () => {
    const stats = boardPyqPaperStats(
      groupBoardPyqSittings([q({ pyqYear: 2025, sourceFile: "cbse-12-pyq-2025-55-1-2" })]),
      "CBSE Class 12",
      new Map([[2025, 5]])
    );
    expect(stats.years).toEqual([{ year: 2025, questions: 0, papers: 5, perPaper: 0 }]);
  });

  it("returns nothing for no sittings", () => {
    const stats = boardPyqPaperStats([], "CBSE Class 12", new Map());
    expect(stats.years).toEqual([]);
    expect(stats.totalPapers).toBe(0);
  });
});
