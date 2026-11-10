import { describe, it, expect } from "vitest";
import type { MockListItem } from "@/lib/mocks/query";
import type { MockPaperBlueprint } from "@/lib/mocks/blueprints";
import type { ChapterWeight } from "@/lib/me/startNext";
import { groupMocksForType } from "@/lib/mocks/catalogue";
import {
  OPEN_PAPER_TARGET,
  OPEN_YEAR_MAX,
  OPEN_YEARS_MAX,
  markingLine,
  newestSittingLabel,
  openYearKeys,
  paperCountLabel,
  paperFacts,
  paperTrends,
  pastPapersFaq,
  yearHeading,
} from "@/lib/mocks/pastPapersPage";

function paper(over: Partial<MockListItem> & { slug: string }): MockListItem {
  return {
    id: over.slug,
    paperCode: "maths",
    pyqYear: 2026,
    pyqMonth: "Sep",
    source: "pyq",
    scope: "full",
    title: "NDA 2026 (II) — Paper I — Mathematics",
    durationSecs: 150 * 60,
    marking: { correct: 2.5, wrong: -0.83 },
    sections: [{ key: "mathematics", label: "Mathematics", count: 120 }],
    totalQuestions: 120,
    totalMarks: 300,
    examName: "NDA",
    ...over,
  };
}

const gat = (over: Partial<MockListItem> & { slug: string }) =>
  paper({
    paperCode: "gat",
    title: "NDA 2026 (II) — Paper II — General Ability Test",
    marking: { correct: 4, wrong: -1.33 },
    sections: [
      { key: "english", label: "English", count: 50 },
      { key: "gk", label: "General Knowledge", count: 100 },
    ],
    totalQuestions: 150,
    totalMarks: 600,
    ...over,
  });

const NDA_BP: Record<string, MockPaperBlueprint> = {
  maths: {
    code: "maths",
    examName: "NDA",
    examSlug: "nda",
    paperLabel: "Paper I — Mathematics",
    durationSecs: 9000,
    marking: { correct: 2.5, wrong: -0.83 },
    sections: [{ key: "mathematics", label: "Mathematics", subjects: ["Mathematics"], count: 120 }],
  },
  gat: {
    code: "gat",
    examName: "NDA",
    examSlug: "nda",
    paperLabel: "Paper II — General Ability Test",
    durationSecs: 9000,
    marking: { correct: 4, wrong: -1.33 },
    sections: [
      { key: "english", label: "English", subjects: ["English"], count: 50 },
      { key: "gk", label: "General Knowledge", subjects: ["Physics"], count: 100 },
    ],
  },
};
const ndaBlueprint = (code: string) => NDA_BP[code] ?? null;

const NDA_PAPERS: MockListItem[] = [
  paper({ slug: "nda-2026-sep-maths" }),
  gat({ slug: "nda-2026-sep-gat" }),
  paper({ slug: "nda-2026-apr-maths", pyqMonth: "Apr" }),
  gat({ slug: "nda-2026-apr-gat", pyqMonth: "Apr" }),
  paper({ slug: "nda-2025-sep-maths", pyqYear: 2025 }),
  gat({ slug: "nda-2025-sep-gat", pyqYear: 2025 }),
  paper({ slug: "nda-2020-maths", pyqYear: 2020, pyqMonth: null }),
  gat({ slug: "nda-2020-gat", pyqYear: 2020, pyqMonth: null }),
];

const NO_DASH = /[—–]/;

describe("year headings", () => {
  // Live 2026-11-10: the count badge sat INSIDE the <h2>, so the heading's text
  // was "20264" to Google and to a screen reader.
  it("names the exam and the year, and never carries the count", () => {
    expect(yearHeading("NDA", "2026")).toBe("NDA 2026 question papers");
    expect(yearHeading("NDA", "2026")).not.toMatch(/\d{5}/);
  });

  it("says plainly when a paper has no year", () => {
    expect(yearHeading("NDA", "Undated")).toBe("NDA papers with no year recorded");
  });

  it("counts papers in words beside the heading", () => {
    expect(paperCountLabel(1)).toBe("1 paper");
    expect(paperCountLabel(4)).toBe("4 papers");
  });
});

describe("Paper I before Paper II within a sitting", () => {
  it("orders by month, newest first, then by the printed paper label", () => {
    const groups = groupMocksForType("past-papers", [
      gat({ slug: "g-apr", pyqMonth: "Apr" }),
      paper({ slug: "m-apr", pyqMonth: "Apr" }),
      gat({ slug: "g-sep" }),
      paper({ slug: "m-sep" }),
    ]);
    expect(groups[0].items.map((m) => m.slug)).toEqual(["m-sep", "g-sep", "m-apr", "g-apr"]);
  });

  // MHT-CET, JEE and SSC record no month: the sitting is only in the title, and
  // the live MHT-CET list mixed 13 May between April shifts.
  it("orders shifts newest first by the date and shift printed in the title", () => {
    const t = (slug: string, title: string, code = "maths") =>
      paper({ slug, title, paperCode: code, pyqMonth: null });
    const groups = groupMocksForType("past-papers", [
      t("17-2-gat", "X 2026 (17 April Shift II) — Paper II", "gat"),
      t("17-2-m", "X 2026 (17 April Shift II) — Paper I"),
      t("20-2", "X 2026 (20 April Shift II) — Paper I"),
      t("13may-1", "X 2026 (13 May Shift I) — Paper I"),
      t("17-1", "X 2026 (17 April Shift I) — Paper I"),
      t("9-1", "X 2026 (9 April Shift I) — Paper I"),
    ]);
    expect(groups[0].items.map((m) => m.slug)).toEqual(["13may-1", "20-2", "17-2-m", "17-2-gat", "17-1", "9-1"]);
  });

  it("reads the JEE and SSC forms of a sitting too", () => {
    const t = (slug: string, title: string) => paper({ slug, title, pyqMonth: null });
    const jee = groupMocksForType("past-papers", [
      t("24jan-1", "JEE Mains 2026 (24 Jan, Shift 1) — Paper 1"),
      t("5apr-2", "JEE Mains 2026 (5 Apr, Shift 2) — Paper 1"),
      t("5apr-1", "JEE Mains 2026 (5 Apr, Shift 1) — Paper 1"),
    ]);
    expect(jee[0].items.map((m) => m.slug)).toEqual(["5apr-2", "5apr-1", "24jan-1"]);
    const ssc = groupMocksForType("past-papers", [
      t("13-2", "SSC CGL Tier I, 13 Sep 2025, Shift 2"),
      t("20-1", "SSC CGL Tier I, 20 Sep 2025, Shift 1"),
    ]);
    expect(ssc[0].items.map((m) => m.slug)).toEqual(["20-1", "13-2"]);
  });

  it("orders papers by the number in their label, not the alphabet (GS Paper I before CSAT Paper II)", () => {
    const mpsc = (slug: string, code: string, title: string) =>
      paper({ slug, paperCode: code, title, examName: "MPSC State Services Prelims", pyqMonth: null });
    const groups = groupMocksForType("past-papers", [
      mpsc("csat", "ssp-csat-2021", "MPSC State Services Prelims 2026 — CSAT Paper II (31 May 2026)"),
      mpsc("gs", "ssp-gs1", "MPSC State Services Prelims 2026 — GS Paper I — 31 May 2026"),
    ]);
    expect(groups[0].items.map((m) => m.slug)).toEqual(["gs", "csat"]);
  });

  it("puts the second sitting first when only its numeral says so (CDS (II) before (I))", () => {
    const t = (slug: string, title: string) => paper({ slug, title, pyqMonth: null });
    const groups = groupMocksForType("past-papers", [
      t("i", "CDS (I) 2026 — Elementary Mathematics"),
      t("ii", "CDS (II) 2026 — Elementary Mathematics"),
    ]);
    expect(groups[0].items.map((m) => m.slug)).toEqual(["ii", "i"]);
  });
});

describe("openYearKeys: recent years open, older years folded", () => {
  const g = (key: string, n: number) => ({ key, items: Array.from({ length: n }) });

  it(`opens years newest first until ${OPEN_PAPER_TARGET} papers show`, () => {
    // NDA: four papers a year, so two years open.
    expect([...openYearKeys([g("2026", 4), g("2025", 4), g("2024", 4)])]).toEqual(["2026", "2025"]);
  });

  // Sheet review 2026-11-10: an open 42-paper year (MHT-CET 2026, SSC CGL 2025)
  // pushed the trends and FAQ thousands of pixels down a phone.
  it(`opens no year that holds more than ${OPEN_YEAR_MAX} papers, nor any older one`, () => {
    expect(openYearKeys([g("2025", 37), g("2024", 30)]).size).toBe(0);
    expect([...openYearKeys([g("2026", 4), g("2025", 42), g("2024", 4)])]).toEqual(["2026"]);
  });

  it(`opens at most ${OPEN_YEARS_MAX} years when each is short (UCEED: one paper a year)`, () => {
    expect([...openYearKeys([g("2026", 1), g("2025", 1), g("2024", 1), g("2023", 1), g("2022", 1)])]).toEqual([
      "2026",
      "2025",
      "2024",
    ]);
  });

  it("opens nothing when there are no papers", () => {
    expect(openYearKeys([]).size).toBe(0);
  });
});

describe("markingLine", () => {
  it("names the penalty as a share of the marks when it is a simple one", () => {
    expect(markingLine({ correct: 2.5, wrong: -0.83 })).toBe(
      "+2.5 for a right answer, -0.83 for a wrong one (a third of its marks)"
    );
    expect(markingLine({ correct: 4, wrong: -1 })).toBe("+4 for a right answer, -1 for a wrong one (a quarter of its marks)");
    expect(markingLine({ correct: 1, wrong: -0.5 })).toBe("+1 for a right answer, -0.5 for a wrong one (half its marks)");
  });

  it("gives only the numbers when the share is not a simple one", () => {
    expect(markingLine({ correct: 1.5, wrong: -0.4 })).toBe("+1.5 for a right answer, -0.4 for a wrong one");
  });

  it("says when a wrong answer costs nothing (MHT-CET)", () => {
    expect(markingLine({ correct: 2, wrong: 0 })).toBe("+2 for a right answer, nothing lost for a wrong one");
  });
});

describe("paperFacts", () => {
  const facts = paperFacts(NDA_PAPERS, ndaBlueprint);

  it("gives one fact card per paper, Paper I first, read from the newest paper", () => {
    expect(facts.map((f) => f.label)).toEqual(["Paper I, Mathematics", "Paper II, General Ability Test"]);
    expect(facts[0]).toMatchObject({ questions: 120, marks: 300, minutes: 150, newestSlug: "nda-2026-sep-maths" });
    expect(facts[1].sections).toEqual("English 50, General Knowledge 100");
  });

  it("prints one marking line when the whole paper is marked alike", () => {
    expect(facts[0].marking).toEqual({ kind: "one", line: "+2.5 for a right answer, -0.83 for a wrong one (a third of its marks)" });
  });

  it("points to the paper itself when its sections are marked differently (IPMAT, UCEED)", () => {
    const bp: MockPaperBlueprint = {
      ...NDA_BP.maths,
      sections: [
        { key: "mcq", label: "MCQ", subjects: ["Mathematics"], count: 40 },
        { key: "sa", label: "Short answer", subjects: ["Mathematics"], count: 15, marking: { correct: 4, wrong: 0 } },
      ],
    };
    const [f] = paperFacts([paper({ slug: "x" })], () => bp);
    expect(f.marking).toEqual({ kind: "by-section" });
  });

  it("lists earlier question counts when the paper changed shape (NEET 200 -> 180)", () => {
    const neet = [
      paper({ slug: "neet-2026", totalQuestions: 180, totalMarks: 720 }),
      paper({ slug: "neet-2024", pyqYear: 2024, totalQuestions: 200, totalMarks: 720 }),
      paper({ slug: "neet-2023", pyqYear: 2023, totalQuestions: 200, totalMarks: 720 }),
    ];
    expect(paperFacts(neet, ndaBlueprint)[0].earlierQuestions).toEqual([200]);
    expect(facts[0].earlierQuestions).toEqual([]);
  });

  it("lists several earlier counts as a sentence (UCEED: 100, 85, 80 or 68)", () => {
    const uceed = [100, 85, 80, 68, 57].map((n, i) => paper({ slug: `u${i}`, pyqYear: 2020 + i, totalQuestions: n }));
    expect(paperFacts(uceed, ndaBlueprint)[0].earlierText).toBe("Earlier papers had 100, 85, 80 or 68 questions.");
    expect(facts[0].earlierText).toBeNull();
  });

  it("orders cards by the paper number in the label (GS Paper I before CSAT Paper II)", () => {
    const bp = (code: string, paperLabel: string): MockPaperBlueprint => ({ ...NDA_BP.maths, code, paperLabel });
    const two = paperFacts(
      [paper({ slug: "c", paperCode: "csat" }), paper({ slug: "g", paperCode: "gs" })],
      (code) => (code === "csat" ? bp("csat", "CSAT Paper II") : bp("gs", "GS Paper I"))
    );
    expect(two.map((f) => f.label)).toEqual(["GS Paper I", "CSAT Paper II"]);
  });

  it("puts no em or en dash in anything it prints", () => {
    expect(JSON.stringify(facts)).not.toMatch(NO_DASH);
  });
});

describe("paperTrends", () => {
  const w = (chapter: string, subject: string, paperCode: string, qPerPaper: number, papers = 19): ChapterWeight => ({
    chapterId: chapter,
    chapter,
    subject,
    exam: "NDA",
    paperCode,
    papers,
    qPerPaper,
    marksPerPaper: qPerPaper * 2.5,
    paperMarks: 300,
  });
  const weights = [
    w("Matrices & Determinants", "Mathematics", "maths", 9.526),
    w("Probability", "Mathematics", "maths", 9.263),
    w("Statistics", "Mathematics", "maths", 8.684),
    w("Trigonometric Identities", "Mathematics", "maths", 7.632),
    w("Functions", "Mathematics", "maths", 6.053),
    w("Lines", "Mathematics", "maths", 5.474),
    w("Vectors", "Mathematics", "maths", 5.368),
    w("Reading Comprehension", "English", "gat", 20),
    w("Vocabulary", "English", "gat", 30),
    w("Mechanics", "Physics", "gat", 14.9),
    w("Optics", "Physics", "gat", 10),
    w("Indian Rivers", "Geography", "gat", 19.3),
  ];
  const facts = paperFacts(NDA_PAPERS, ndaBlueprint);
  const hrefOf = (subject: string, chapter: string) =>
    chapter === "Probability" ? `/questions/nda/${subject.toLowerCase()}/probability` : undefined;
  const cards = paperTrends(weights, facts, hrefOf);

  it("shows a one-subject paper's top six chapters, most asked first", () => {
    const maths = cards.find((c) => c.code === "maths")!;
    expect(maths.title).toBe("Paper I, Mathematics: most-asked chapters");
    expect(maths.total).toBe(120);
    expect(maths.rows.map((r) => r.name)).toEqual([
      "Matrices & Determinants",
      "Probability",
      "Statistics",
      "Trigonometric Identities",
      "Functions",
      "Lines",
    ]);
    expect(maths.rows[0].perPaper).toBe(9.5);
    expect(maths.rows[1].href).toBe("/questions/nda/mathematics/probability");
    expect(maths.rows[0].href).toBeUndefined();
  });

  it("shows a paper that spans subjects by subject, summed over its chapters", () => {
    const g = cards.find((c) => c.code === "gat")!;
    expect(g.title).toBe("Paper II, General Ability Test: questions by subject");
    expect(g.rows.map((r) => [r.name, r.perPaper])).toEqual([
      ["English", 50],
      ["Physics", 24.9],
      ["Geography", 19.3],
    ]);
    expect(g.rows.every((r) => r.href === undefined)).toBe(true);
  });

  it("states how many sittings the averages cover", () => {
    expect(cards[0].papers).toBe(19);
  });

  it("drops a paper with fewer than four sittings: too few to show a pattern", () => {
    const thin = paperTrends([w("Lines", "Mathematics", "maths", 6, 3)], facts, hrefOf);
    expect(thin).toEqual([]);
  });

  it("is empty when the weights could not be read", () => {
    expect(paperTrends([], facts, hrefOf)).toEqual([]);
  });
});

describe("newestSittingLabel", () => {
  it("names the month and year of the newest paper", () => {
    expect(newestSittingLabel(NDA_PAPERS)).toBe("September 2026");
  });

  it("reads the day from the title when the title prints one (MHT-CET, JEE, SSC)", () => {
    const t = (slug: string, title: string, pyqYear = 2026) => paper({ slug, title, pyqYear, pyqMonth: null });
    expect(
      newestSittingLabel([
        t("a", "MHT-CET 2026 (17 April Shift II) — Paper I — Mathematics"),
        t("b", "MHT-CET 2026 (19 May Shift I) — Paper I — Mathematics"),
      ])
    ).toBe("19 May 2026");
    expect(newestSittingLabel([t("j", "JEE Mains 2026 (8 Apr, Shift 2) — Paper 1")])).toBe("8 April 2026");
    // A title's own year wins: SSC CGL Tier II for CGL 2025 was sat in January 2026.
    expect(newestSittingLabel([t("s", "SSC CGL Tier II (CGL 2025), 18 Jan 2026", 2025)])).toBe("18 January 2026");
  });

  it("falls back to the year when no month is recorded", () => {
    expect(newestSittingLabel([paper({ slug: "a", pyqMonth: null, pyqYear: 2025 })])).toBe("2025");
    expect(newestSittingLabel([])).toBeNull();
  });
});

describe("pastPapersFaq", () => {
  const facts = paperFacts(NDA_PAPERS, ndaBlueprint);
  const base = {
    examName: "NDA",
    facts,
    years: [2026, 2025, 2020],
    paperCount: 8,
    solved: true,
    yearNotes: { 2020: "UPSC held NDA 1 and NDA 2 2020 as one combined exam, so there is a single sitting that year." },
  };
  const faq = pastPapersFaq(base);
  const answer = (q: RegExp) => faq.find((f) => q.test(f.q))?.a;

  it("answers how many questions each paper has, from the newest papers", () => {
    expect(answer(/How many questions/)).toBe(
      "Paper I, Mathematics, has 120 questions for 300 marks in 150 minutes. Paper II, General Ability Test, has 150 questions for 600 marks in 150 minutes."
    );
  });

  it("says yes to negative marking when any paper deducts", () => {
    expect(answer(/negative marking/)).toMatch(/^Yes\./);
    expect(answer(/negative marking/)).toMatch(/A question you leave blank loses nothing\./);
  });

  it("sets a label off with commas only when the label has one itself", () => {
    const bp = (code: string, paperLabel: string): MockPaperBlueprint => ({ ...NDA_BP.maths, code, paperLabel });
    const mpsc = pastPapersFaq({
      ...base,
      examName: "MPSC",
      facts: paperFacts(
        [paper({ slug: "c", paperCode: "csat", totalQuestions: 80, totalMarks: 200, durationSecs: 7200 }), paper({ slug: "g", paperCode: "gs" })],
        (code) => (code === "csat" ? bp("csat", "CSAT Paper II") : bp("gs", "GS Paper I"))
      ),
    });
    expect(mpsc[0].a).toMatch(/^GS Paper I has 120 questions/);
    expect(mpsc[0].a).toMatch(/CSAT Paper II has 80 questions for 200 marks in 120 minutes\.$/);
  });

  it("explains a paper marked differently by section in plain words (UCEED)", () => {
    const bp: MockPaperBlueprint = {
      ...NDA_BP.maths,
      paperLabel: "Part A",
      sections: [
        { key: "nat", label: "Numerical answer", subjects: [], count: 14, marking: { correct: 4, wrong: 0 } },
        { key: "mcq", label: "Multiple choice", subjects: [], count: 28, marking: { correct: 3, wrong: -0.71 } },
      ],
    };
    const uceed = pastPapersFaq({ ...base, examName: "UCEED", facts: paperFacts([paper({ slug: "u" })], () => bp) });
    expect(uceed.find((f) => /negative marking/.test(f.q))?.a).toBe(
      "In some sections. Each section is marked differently: a paper's start page lists the marking for each. A question you leave blank loses nothing."
    );
  });

  it("says no to negative marking when nothing deducts (MHT-CET)", () => {
    const cet = pastPapersFaq({
      ...base,
      examName: "MHT-CET",
      facts: paperFacts([paper({ slug: "c", marking: { correct: 2, wrong: 0 } })], () => null),
    });
    expect(cet.find((f) => /negative marking/.test(f.q))?.a).toBe(
      "No. A wrong answer costs nothing, so answer every question, even a guess."
    );
  });

  it("names the years covered and the years missing from the range", () => {
    expect(answer(/Which .* papers are here/)).toBe(
      "8 papers from 2020 to 2026. Not here: 2021, 2022, 2023, 2024."
    );
  });

  it("answers a short year only from a written note", () => {
    expect(answer(/Why does 2020 have fewer papers/)).toBe(base.yearNotes[2020]);
    expect(pastPapersFaq({ ...base, yearNotes: {} }).some((f) => /Why does/.test(f.q))).toBe(false);
  });

  it("promises worked solutions only where the exam has them", () => {
    expect(answer(/solutions/)).toMatch(/worked solution/);
    const unsolved = pastPapersFaq({ ...base, solved: false });
    expect(unsolved.find((f) => /solutions/.test(f.q))?.a).not.toMatch(/worked solution/);
  });

  it("always answers the download question with the page's existing promise", () => {
    expect(answer(/download/)).toBe(
      "Every paper is free to read online and to sit as a timed mock. Your first PDF paper and its answer key are free to download."
    );
  });

  it("puts no em or en dash in any question or answer", () => {
    expect(JSON.stringify(faq)).not.toMatch(NO_DASH);
  });
});
