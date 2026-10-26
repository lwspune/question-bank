/**
 * The "Key numbers" box and FAQ on the /guide trends reports.
 *
 * Every sentence is computed from the page's own generated matrix, so these
 * tests pin the arithmetic and the phrasing rules, not any live number: top-N
 * ordering with a stable tie-break, the share of the paper, chapters present in
 * every paper (only where each column IS one paper), the biggest rise and fall
 * between the page's two windows, and a chapter that dropped to zero. A JEE
 * page (columns are years, not papers) must say nothing about paper presence.
 */
import { describe, expect, it } from "vitest";
import {
  appearedColumn,
  keyInsights,
  perPaperInsightInput,
  papersAppeared,
  perPaperChapters,
  trendsFaq,
  windowRate,
  type InsightInput,
} from "@/lib/guide/trendsInsights";

function input(over: Partial<InsightInput> = {}): InsightInput {
  return {
    exam: "MHT-CET",
    subject: "Maths",
    early: "2023–2024",
    recent: "2025–2026",
    questions: 3388,
    papers: 68,
    firstYear: 2021,
    lastYear: 2026,
    presencePapers: 68,
    chapters: [
      { chapter: "Vectors", early: 4.9, recent: 4.4, appeared: 68 },
      { chapter: "Trigonometric Functions", early: 4.9, recent: 4.2, appeared: 68 },
      { chapter: "Line and Plane", early: 4.3, recent: 4.1, appeared: 67 },
      { chapter: "Definite Integration", early: 1.3, recent: 2.36, appeared: 60 },
      { chapter: "Conic Sections", early: 0.2, recent: 1.1, appeared: 42 },
      { chapter: "Measures of Dispersion", early: 1.0, recent: 0, appeared: 29 },
      { chapter: "Rest", early: 32.7, recent: 33.7, appeared: 68 },
    ],
    ...over,
  };
}

describe("windowRate", () => {
  it("divides the window's questions by the window's papers", () => {
    // Two 2025 papers and one 2026 paper in the window; 2024 is outside it.
    expect(windowRate([9, 1, 2, 3], [2024, 2025, 2025, 2026], 2025, 2026)).toBe(2);
  });

  it("is zero, not NaN, for a window with no papers", () => {
    expect(windowRate([1, 2], [2020, 2021], 2025, 2026)).toBe(0);
  });

  it("rounds to two places", () => {
    expect(windowRate([1, 1, 0], [2025, 2025, 2025], 2025, 2025)).toBe(0.67);
  });
});

describe("papersAppeared", () => {
  it("counts the papers with at least one question", () => {
    expect(papersAppeared([0, 3, 1, 0, 2])).toBe(3);
  });
});

describe("perPaperChapters", () => {
  it("turns a per-paper grid into both window rates plus paper presence", () => {
    const years = [2023, 2024, 2025, 2026];
    const rows = [{ chapter: "Dispersion", counts: [1, 1, 0, 0] }];
    expect(perPaperChapters(rows, years, { from: 2023, to: 2024 }, { from: 2025, to: 2026 })).toEqual([
      { chapter: "Dispersion", early: 1, recent: 0, appeared: 2 },
    ]);
  });
});

describe("perPaperInsightInput", () => {
  const built = perPaperInsightInput({
    exam: "CDS",
    subject: "Maths",
    rows: [
      { chapter: "Trigonometry", counts: [9, 12, 13] },
      { chapter: "Number System", counts: [4, 0, 2] },
    ],
    years: [2016, 2024, 2026],
    questions: 300,
    early: { from: 2016, to: 2020, label: "2016-2020" },
    recent: { from: 2024, to: 2026, label: "2024-2026" },
  });

  it("counts every column as a paper and spans the grid's own years", () => {
    expect(built).toMatchObject({ papers: 3, presencePapers: 3, firstYear: 2016, lastYear: 2026, questions: 300 });
    expect(built.early).toBe("2016-2020");
    expect(built.recent).toBe("2024-2026");
  });

  it("hands the rate table its in-papers column", () => {
    expect(appearedColumn(built)).toEqual({ byChapter: { Trigonometry: 3, "Number System": 2 }, of: 3 });
  });

  it("gives no in-papers column when the grid does not count papers", () => {
    expect(appearedColumn({ ...built, presencePapers: undefined })).toBeUndefined();
  });
});

describe("keyInsights", () => {
  it("leads with the three heaviest recent chapters and what they add up to", () => {
    const [first] = keyInsights(input({ chapters: input().chapters.filter((c) => c.chapter !== "Rest") }));
    expect(first).toContain("Vectors (4.4 a paper), Trigonometric Functions (4.2) and Line and Plane (4.1)");
    expect(first).toContain("12.7");
  });

  it("breaks a tie on the recent rate by chapter name, so the order never wobbles", () => {
    const chapters = [
      { chapter: "Zeta", early: 1, recent: 3 },
      { chapter: "Alpha", early: 1, recent: 3 },
      { chapter: "Mid", early: 1, recent: 2 },
    ];
    const [first] = keyInsights(input({ chapters, presencePapers: undefined }));
    expect(first.indexOf("Alpha")).toBeLessThan(first.indexOf("Zeta"));
  });

  it("states the share of the paper the five heaviest chapters carry", () => {
    const lines = keyInsights(input());
    // Rest 33.7 + Vectors 4.4 + Trig 4.2 + Line 4.1 + Def Int 2.36 = 48.76 of 49.86.
    expect(lines.some((l) => /five heaviest chapters carry 98% of the paper/.test(l))).toBe(true);
  });

  it("names the chapters that appeared in every paper", () => {
    const lines = keyInsights(input());
    expect(lines.some((l) => l.includes("appeared in all 68 papers") && l.includes("Vectors"))).toBe(true);
  });

  it("falls back to the most regular chapter when none appeared in every paper", () => {
    const chapters = input().chapters.map((c) => ({ ...c, appeared: Math.min(c.appeared ?? 0, 66) }));
    const lines = keyInsights(input({ chapters }));
    expect(lines.some((l) => l.includes("in 66 of 68 papers"))).toBe(true);
  });

  it("says nothing about paper presence when the columns are years, not papers", () => {
    const chapters = input().chapters.map(({ appeared: _a, ...c }) => c);
    const lines = keyInsights(input({ chapters, presencePapers: undefined, papers: undefined }));
    expect(lines.some((l) => /appeared in|of \d+ papers/.test(l))).toBe(false);
  });

  it("names the biggest rise and the biggest fall between the two windows", () => {
    const lines = keyInsights(input());
    expect(lines).toContain("Biggest rise: Definite Integration, from 1.3 to 2.4 questions a paper (2023–2024 to 2025–2026).");
  });

  it("names a chapter that dropped to zero on its own line, never as 0.0", () => {
    const lines = keyInsights(input());
    expect(lines).toContain("Gone from the paper: Measures of Dispersion (1.0 a paper) was asked in 2023–2024 and not at all in 2025–2026.");
    expect(lines.join(" ")).not.toMatch(/0\.0 questions/);
  });

  it("lists several dropped chapters heaviest first, the rate unit said once", () => {
    const chapters = [
      { chapter: "Hydrogen", early: 0.4, recent: 0 },
      { chapter: "Surface Chemistry", early: 0.6, recent: 0 },
      { chapter: "Kept", early: 2, recent: 2 },
    ];
    const lines = keyInsights(input({ chapters, presencePapers: undefined }));
    expect(lines).toContain(
      "Gone from the paper: Surface Chemistry (0.6 a paper) and Hydrogen (0.4) were asked in 2023–2024 and not at all in 2025–2026."
    );
  });

  it("counts the biggest fall among chapters still asked, so a drop is not reported twice", () => {
    const lines = keyInsights(input());
    expect(lines).toContain("Biggest fall: Trigonometric Functions, from 4.9 to 4.2 questions a paper (2023–2024 to 2025–2026).");
  });

  it("says a chapter that started from zero came from none", () => {
    const chapters = [
      { chapter: "Conic Sections", early: 0, recent: 2 },
      { chapter: "Other", early: 5, recent: 4.5 },
    ];
    const lines = keyInsights(input({ chapters, presencePapers: undefined }));
    expect(lines).toContain("Biggest rise: Conic Sections, from none in 2023–2024 to 2.0 questions a paper in 2025–2026.");
  });

  it("omits the rise when nothing rose, and the fall when nothing fell", () => {
    const chapters = [
      { chapter: "A", early: 2, recent: 2 },
      { chapter: "B", early: 1, recent: 1 },
    ];
    const lines = keyInsights(input({ chapters, presencePapers: undefined }));
    expect(lines.some((l) => l.startsWith("Biggest rise"))).toBe(false);
    expect(lines.some((l) => l.startsWith("Biggest fall"))).toBe(false);
  });

  it("never prints an em dash or a spaced en dash (the voice rule)", () => {
    for (const l of keyInsights(input())) expect(l).not.toMatch(/—| – | -- /);
  });
});

describe("trendsFaq", () => {
  it("answers which chapters carry the most weight, with the source of the figures", () => {
    const faq = trendsFaq(input());
    const q = faq.find((f) => f.q === "Which chapters carry the most weight in MHT-CET Maths?");
    expect(q).toBeDefined();
    expect(q!.a).toContain("the heaviest are Rest (33.7 questions a paper), Vectors (4.4)");
    expect(q!.a).toContain("68 past papers");
    expect(q!.a).toContain("3,388 questions");
  });

  it("asks about every-paper chapters only where columns are papers", () => {
    const withPresence = trendsFaq(input()).map((f) => f.q);
    expect(withPresence).toContain("Which MHT-CET Maths chapters come in every paper?");
    const chapters = input().chapters.map(({ appeared: _a, ...c }) => c);
    const without = trendsFaq(input({ chapters, presencePapers: undefined, papers: undefined })).map((f) => f.q);
    expect(without).not.toContain("Which MHT-CET Maths chapters come in every paper?");
  });

  it("asks about dropped chapters only when one went to zero", () => {
    expect(trendsFaq(input()).some((f) => f.q.includes("dropped out"))).toBe(true);
    const chapters = input().chapters.filter((c) => c.chapter !== "Measures of Dispersion");
    expect(trendsFaq(input({ chapters })).some((f) => f.q.includes("dropped out"))).toBe(false);
  });

  it("without a paper count, cites the questions and years alone", () => {
    const chapters = input().chapters.map(({ appeared: _a, ...c }) => c);
    const faq = trendsFaq(input({ chapters, presencePapers: undefined, papers: undefined }));
    expect(faq[0].a).toContain("3,388 past-year questions from 2021 to 2026");
    expect(faq[0].a).not.toContain("past papers");
  });

  it("writes plain text with no em dashes", () => {
    for (const f of trendsFaq(input())) {
      expect(f.a).not.toMatch(/—| – |\*\*/);
      expect(f.q).not.toMatch(/—/);
    }
  });
});
