import { describe, it, expect } from "vitest";
import {
  pyqSittingLabel,
  groupBoardPyqSittings,
  pyqYearCounts,
  type BoardPyqQuestion,
} from "../src/lib/board/query";

const q = (over: Partial<BoardPyqQuestion> = {}): BoardPyqQuestion => ({
  id: "id-" + (over.pyqYear ?? 0) + "-" + (over.pyqMonth ?? "x") + "-" + (over.sourceRow ?? 0),
  questionNumber: "Q1(A)(i)",
  text: "stem",
  context: null,
  solution: "worked",
  imageUrl: null,
  solutionImageUrl: null,
  format: "subjective" as const,
  setId: null,
  options: [],
  pyqYear: 2026,
  pyqMonth: "March",
  sourceRow: 1,
  subtopicName: "Solving by Factorisation",
  ...over,
});

describe("pyqSittingLabel", () => {
  it("names the sitting when a month is stored", () => {
    expect(pyqSittingLabel(2026, "March")).toBe("March 2026");
  });

  // CBSE Class 12 stores pyq_month NULL on all 1,766 rows. A naive template
  // would render "undefined 2024" on every CBSE block.
  it("falls back to the bare year when no month is stored", () => {
    expect(pyqSittingLabel(2024, null)).toBe("2024");
    expect(pyqSittingLabel(2024, "")).toBe("2024");
    expect(pyqSittingLabel(2024, "   ")).toBe("2024");
  });

  // The bank spells months inconsistently — "Apr" and "April" both exist, as do
  // "Sep" and "September". We print what is stored rather than normalising it,
  // so the label can never disagree with the row it came from.
  it("prints an abbreviated month verbatim", () => {
    expect(pyqSittingLabel(2020, "Apr")).toBe("Apr 2020");
  });
});

describe("groupBoardPyqSittings", () => {
  it("returns sittings newest first", () => {
    const out = groupBoardPyqSittings([
      q({ pyqYear: 2016 }),
      q({ pyqYear: 2026 }),
      q({ pyqYear: 2022 }),
    ]);
    expect(out.map((s) => s.year)).toEqual([2026, 2022, 2016]);
  });

  // THE load-bearing case. MH SSC 10 genuinely holds two sittings in one year —
  // July AND March 2020, April AND March 2022 — and MH HSC 12 holds
  // February AND March. Keying a block on the YEAR alone silently merges two
  // different question papers into one "2020", which no count would reveal.
  it("keeps two sittings of the same year apart", () => {
    const out = groupBoardPyqSittings([
      q({ pyqYear: 2020, pyqMonth: "March", sourceRow: 1 }),
      q({ pyqYear: 2020, pyqMonth: "July", sourceRow: 1 }),
    ]);
    expect(out).toHaveLength(2);
    expect(out.map((s) => s.label)).toEqual(["July 2020", "March 2020"]);
  });

  it("orders sittings within a year by month, latest first", () => {
    const out = groupBoardPyqSittings([
      q({ pyqYear: 2023, pyqMonth: "February" }),
      q({ pyqYear: 2023, pyqMonth: "March" }),
    ]);
    expect(out.map((s) => s.label)).toEqual(["March 2023", "February 2023"]);
  });

  // MH HSC 12's 2024 holds February, March AND rows with no month at all. An
  // undated row declares no sitting, so it is the least specific and sorts last
  // — never interleaved among the dated ones.
  it("sorts an undated sitting after the dated sittings of its own year", () => {
    const out = groupBoardPyqSittings([
      q({ pyqYear: 2024, pyqMonth: null }),
      q({ pyqYear: 2024, pyqMonth: "March" }),
      q({ pyqYear: 2024, pyqMonth: "February" }),
      q({ pyqYear: 2025, pyqMonth: null }),
    ]);
    expect(out.map((s) => s.label)).toEqual(["2025", "March 2024", "February 2024", "2024"]);
  });

  it("tolerates abbreviated month spellings when ordering", () => {
    const out = groupBoardPyqSittings([
      q({ pyqYear: 2021, pyqMonth: "Apr" }),
      q({ pyqYear: 2021, pyqMonth: "September" }),
      q({ pyqYear: 2021, pyqMonth: "Sep" }),
    ]);
    // Sep and September are the same month; both outrank April.
    expect(out.map((s) => s.year)).toEqual([2021, 2021, 2021]);
    expect(out[out.length - 1].label).toBe("Apr 2021");
  });

  it("orders questions within a sitting by source_row", () => {
    const out = groupBoardPyqSittings([
      q({ pyqYear: 2026, sourceRow: 12, questionNumber: "Q4(i)" }),
      q({ pyqYear: 2026, sourceRow: 3, questionNumber: "Q1(A)(ii)" }),
      q({ pyqYear: 2026, sourceRow: 7, questionNumber: "Q2(B)(iii)" }),
    ]);
    expect(out[0].questions.map((x) => x.questionNumber)).toEqual([
      "Q1(A)(ii)",
      "Q2(B)(iii)",
      "Q4(i)",
    ]);
  });

  it("puts a row with no source_row last rather than first", () => {
    const out = groupBoardPyqSittings([
      q({ pyqYear: 2026, sourceRow: null, questionNumber: "orphan" }),
      q({ pyqYear: 2026, sourceRow: 5, questionNumber: "first" }),
    ]);
    expect(out[0].questions.map((x) => x.questionNumber)).toEqual(["first", "orphan"]);
  });

  it("gives every sitting a distinct key", () => {
    const out = groupBoardPyqSittings([
      q({ pyqYear: 2020, pyqMonth: "March" }),
      q({ pyqYear: 2020, pyqMonth: "July" }),
      q({ pyqYear: 2020, pyqMonth: null }),
    ]);
    expect(new Set(out.map((s) => s.key)).size).toBe(3);
  });

  it("returns nothing for no rows", () => {
    expect(groupBoardPyqSittings([])).toEqual([]);
  });
});

describe("pyqYearCounts", () => {
  it("counts per year, oldest first, so it reads left to right as a timeline", () => {
    const counts = pyqYearCounts(
      groupBoardPyqSittings([
        q({ pyqYear: 2026 }),
        q({ pyqYear: 2026, sourceRow: 2 }),
        q({ pyqYear: 2024 }),
      ])
    );
    expect(counts).toEqual([
      { year: 2024, count: 1 },
      { year: 2026, count: 2 },
    ]);
  });

  it("folds both sittings of a year into one bar", () => {
    const counts = pyqYearCounts(
      groupBoardPyqSittings([
        q({ pyqYear: 2020, pyqMonth: "March" }),
        q({ pyqYear: 2020, pyqMonth: "July" }),
      ])
    );
    expect(counts).toEqual([{ year: 2020, count: 2 }]);
  });

  // The March 2021 SSC exams were CANCELLED. There is no 2021 paper, so a
  // zero-filled 2021 bar would assert a paper this chapter was absent from —
  // the opposite of true. Report observed years only.
  it("does not invent a zero bar for a year with no paper", () => {
    const counts = pyqYearCounts(
      groupBoardPyqSittings([q({ pyqYear: 2020 }), q({ pyqYear: 2022 })])
    );
    expect(counts.map((c) => c.year)).toEqual([2020, 2022]);
  });

  it("returns nothing for no sittings", () => {
    expect(pyqYearCounts([])).toEqual([]);
  });
});
