// Spec for the IPMAT paper-grid gate (scripts/ipmat/config.ts).
//
// WHY A GRID AT ALL. The extractor's completeness cannot be checked from the
// inside: a page that silently stops shipping half its questions still yields a
// well-formed record list. So the expected size of every paper is written down,
// and the gate compares against it.
//
// The numbers in PAPER_GRID are not "whatever we scraped today". They were
// measured on 2026-09-22 and then reconciled against the exams' known paper
// patterns: Indore ran 100 questions in 2019, 60 in the shortened 2020 and 2021
// sittings, and 90 from 2022; JIPMAT has run 33 QA + 33 LR + 34 VA = 100 every
// year since its first sitting in 2021. All 48 papers also numbered 1..N with no
// gaps. That agreement in both directions is what licenses the grid as a gate
// rather than a snapshot.
//
// All three mismatch kinds must FAIL. A short paper means rows went missing. A
// missing paper means a page broke. An unexpected paper means the source
// published a new sitting — which is good news, and still has to stop the
// pipeline so a human confirms the new paper's shape before it is ingested.
import { describe, it, expect } from "vitest";
import {
  PAPER_GRID,
  IPMAT_EXAMS,
  comparePaperGrid,
  expectedTotal,
  pageUrl,
  discoverPapers,
  parsePaperFileName,
  type PaperCount,
} from "../scripts/ipmat/config";

/** The full, correct census — what a healthy run produces. */
function goodCensus(): PaperCount[] {
  return PAPER_GRID.map((p) => ({
    exam: p.exam,
    year: p.year,
    section: p.section,
    count: p.count,
  }));
}

describe("PAPER_GRID", () => {
  it("covers the three exams and nothing else", () => {
    expect(new Set(PAPER_GRID.map((p) => p.exam))).toEqual(
      new Set(["ipmat-indore", "ipmat-rohtak", "jipmat"])
    );
  });

  it("totals 1,445 questions across 48 papers", () => {
    expect(PAPER_GRID).toHaveLength(48);
    expect(expectedTotal()).toBe(1445);
  });

  it("matches each exam's measured size", () => {
    expect(expectedTotal("ipmat-indore")).toBe(670);
    expect(expectedTotal("ipmat-rohtak")).toBe(175);
    expect(expectedTotal("jipmat")).toBe(600);
  });

  it("reproduces Indore's real paper pattern: 100 in 2019, 60 shortened, 90 after", () => {
    const yearTotal = (year: number) =>
      PAPER_GRID.filter((p) => p.exam === "ipmat-indore" && p.year === year).reduce(
        (n, p) => n + p.count,
        0
      );
    expect(yearTotal(2019)).toBe(100);
    expect(yearTotal(2020)).toBe(60);
    expect(yearTotal(2021)).toBe(60);
    for (const y of [2022, 2023, 2024, 2025, 2026]) expect(yearTotal(y)).toBe(90);
  });

  it("gives JIPMAT a flat 100 a year for all six sittings", () => {
    const years = [...new Set(PAPER_GRID.filter((p) => p.exam === "jipmat").map((p) => p.year))];
    expect(years.sort()).toEqual([2021, 2022, 2023, 2024, 2025, 2026]);
    for (const y of years) {
      const total = PAPER_GRID.filter((p) => p.exam === "jipmat" && p.year === y).reduce(
        (n, p) => n + p.count,
        0
      );
      expect(total).toBe(100);
    }
  });

  it("holds Rohtak at two sittings, which is all this source carries", () => {
    const years = [
      ...new Set(PAPER_GRID.filter((p) => p.exam === "ipmat-rohtak").map((p) => p.year)),
    ];
    expect(years.sort()).toEqual([2019, 2020]);
  });

  it("uses each exam's own section names rather than a shared set", () => {
    const sectionsOf = (exam: string) =>
      [...new Set(PAPER_GRID.filter((p) => p.exam === exam).map((p) => p.section))].sort();
    // Indore's sections split quant by ANSWER FORMAT (short answer vs MCQ);
    // the other two split by SUBJECT. Forcing one vocabulary on both would
    // misdescribe one of them.
    expect(sectionsOf("ipmat-indore")).toEqual(["MCQ", "SA", "VA"]);
    expect(sectionsOf("ipmat-rohtak")).toEqual(["LR", "QA", "VA"]);
    expect(sectionsOf("jipmat")).toEqual(["LR", "QA", "VA"]);
  });

  it("has no duplicate paper keys", () => {
    const keys = PAPER_GRID.map((p) => `${p.exam}/${p.year}/${p.section}`);
    expect(new Set(keys).size).toBe(keys.length);
  });
});

describe("comparePaperGrid", () => {
  it("passes a complete, correct census", () => {
    expect(comparePaperGrid(goodCensus())).toEqual([]);
  });

  it("is insensitive to census order", () => {
    expect(comparePaperGrid([...goodCensus()].reverse())).toEqual([]);
  });

  it("fails a paper that came back short", () => {
    const census = goodCensus();
    const target = census.find((p) => p.exam === "jipmat" && p.year === 2024 && p.section === "QA")!;
    target.count = 30;
    expect(comparePaperGrid(census)).toEqual([
      { kind: "count", exam: "jipmat", year: 2024, section: "QA", expected: 33, actual: 30 },
    ]);
  });

  it("fails a paper that came back long", () => {
    const census = goodCensus();
    census.find((p) => p.exam === "ipmat-indore" && p.year === 2026 && p.section === "SA")!.count = 16;
    expect(comparePaperGrid(census)).toEqual([
      { kind: "count", exam: "ipmat-indore", year: 2026, section: "SA", expected: 15, actual: 16 },
    ]);
  });

  it("fails a paper that is missing from the census entirely", () => {
    const census = goodCensus().filter(
      (p) => !(p.exam === "ipmat-rohtak" && p.year === 2020 && p.section === "LR")
    );
    expect(comparePaperGrid(census)).toEqual([
      { kind: "missing", exam: "ipmat-rohtak", year: 2020, section: "LR", expected: 20 },
    ]);
  });

  it("fails an unexpected paper, even though a new sitting is good news", () => {
    const census = goodCensus();
    census.push({ exam: "ipmat-indore", year: 2027, section: "SA", count: 15 });
    expect(comparePaperGrid(census)).toEqual([
      { kind: "unexpected", exam: "ipmat-indore", year: 2027, section: "SA", actual: 15 },
    ]);
  });

  it("reports a zero-row paper as a count mismatch, not as missing", () => {
    // A page that loads but yields nothing is a different failure from a page
    // we never fetched, and the distinction points at a different fix.
    const census = goodCensus();
    census.find((p) => p.exam === "jipmat" && p.year === 2021 && p.section === "VA")!.count = 0;
    expect(comparePaperGrid(census)).toEqual([
      { kind: "count", exam: "jipmat", year: 2021, section: "VA", expected: 34, actual: 0 },
    ]);
  });

  it("reports every mismatch, not just the first", () => {
    const census = goodCensus();
    census.find((p) => p.exam === "jipmat" && p.year === 2022 && p.section === "QA")!.count = 1;
    census.find((p) => p.exam === "jipmat" && p.year === 2023 && p.section === "LR")!.count = 2;
    expect(comparePaperGrid(census)).toHaveLength(2);
  });

  it("fails an empty census loudly rather than reporting nothing wrong", () => {
    expect(comparePaperGrid([])).toHaveLength(PAPER_GRID.length);
  });
});

describe("IPMAT_EXAMS", () => {
  it("keeps our slug separate from the source's slug", () => {
    // They coincide for two exams and NOT for the third: the Jammu exam is
    // officially JIPMAT (IIM Jammu + IIM Bodh Gaya), so our slug is `jipmat`
    // rather than `ipmat-jammu`. Conflating the two fields would work until
    // exactly that case.
    const jammu = IPMAT_EXAMS.find((e) => e.slug === "jipmat")!;
    expect(jammu.sourceSlug).toBe("jipmat");
    expect(jammu.displayName).toContain("JIPMAT");
  });

  it("lists every exam in the grid", () => {
    expect(new Set(IPMAT_EXAMS.map((e) => e.slug))).toEqual(new Set(PAPER_GRID.map((p) => p.exam)));
  });
});

describe("pageUrl", () => {
  it("builds the source URL from the SOURCE slug, not ours", () => {
    expect(pageUrl("jipmat", 2025, "QA")).toBe(
      "https://www.afterboards.in/past-year-questions/jipmat/2025/QA"
    );
    expect(pageUrl("ipmat-indore", 2026, "SA")).toBe(
      "https://www.afterboards.in/past-year-questions/ipmat-indore/2026/SA"
    );
  });

  it("throws on an exam it does not know", () => {
    // @ts-expect-error deliberately passing an unregistered slug
    expect(() => pageUrl("ipmat-jammu", 2025, "QA")).toThrow(/unknown/i);
  });
});

// ---------------------------------------------------------------------------
// Paper DISCOVERY.
//
// WHY THIS SECTION EXISTS, AND WHAT IT CAUGHT. The first version of extract.ts
// decided which papers to extract by iterating PAPER_GRID. That made the grid's
// `unexpected` branch unreachable: the census could only ever contain papers the
// grid already listed, so a newly published sitting was invisible and the gate
// reported PASS. The unit tests above passed anyway, because they hand-build a
// census with an extra row — a census the real caller could not produce.
//
// Proved by deleting 2026 from the grid and re-running the extractor on the real
// cached pages: it printed "GATE: PASS" and exited 0, having silently skipped
// three real papers.
//
// So discovery has to come from OUTSIDE the grid. `discoverPapers` reads the
// year/section links off an exam's landing page — the source's own statement of
// what it carries — and `papersOnDisk` reads what was actually cached. Either
// can now disagree with the grid, which is the whole point of having one.

describe("discoverPapers", () => {
  const landing = (...paths: string[]) =>
    `<html><body><nav>` +
    paths.map((p) => `<a href="${p}">link</a>`).join("") +
    `</nav></body></html>`;

  it("finds the year/section papers an exam's landing page links to", () => {
    const html = landing(
      "https://www.afterboards.in/past-year-questions/jipmat/2025/QA",
      "https://www.afterboards.in/past-year-questions/jipmat/2025/LR",
      "/past-year-questions/jipmat/2025/VA"
    );
    expect(discoverPapers("jipmat", html)).toEqual([
      { exam: "jipmat", year: 2025, section: "LR" },
      { exam: "jipmat", year: 2025, section: "QA" },
      { exam: "jipmat", year: 2025, section: "VA" },
    ]);
  });

  it("finds a NEW sitting the grid has never heard of", () => {
    // The case the first gate could not see. Discovery must not be filtered by
    // the grid, or the grid can never be contradicted.
    const html = landing(
      "/past-year-questions/ipmat-indore/2026/SA",
      "/past-year-questions/ipmat-indore/2027/SA"
    );
    const found = discoverPapers("ipmat-indore", html);
    expect(found).toContainEqual({ exam: "ipmat-indore", year: 2027, section: "SA" });
    expect(comparePaperGrid(found.map((p) => ({ ...p, count: 15 })))).toContainEqual({
      kind: "unexpected",
      exam: "ipmat-indore",
      year: 2027,
      section: "SA",
      actual: 15,
    });
  });

  it("ignores links belonging to a DIFFERENT exam on the same page", () => {
    const html = landing(
      "/past-year-questions/jipmat/2025/QA",
      "/past-year-questions/ipmat-indore/2025/SA",
      "/past-year-questions/ipmat-rohtak/2019/QA"
    );
    expect(discoverPapers("jipmat", html)).toEqual([{ exam: "jipmat", year: 2025, section: "QA" }]);
  });

  it("ignores the topic-filter and analyser links that sit beside them", () => {
    // The landing pages link ~40 topic pages in the same shape but with a
    // slug where the year goes: /past-year-questions/jipmat/algebra/indices.
    const html = landing(
      "/past-year-questions/jipmat/2025/QA",
      "/past-year-questions/jipmat/algebra/indices",
      "/past-year-questions/jipmat/algebra/progression-series",
      "/past-year-questions/jipmat/analyser"
    );
    expect(discoverPapers("jipmat", html)).toEqual([{ exam: "jipmat", year: 2025, section: "QA" }]);
  });

  it("de-duplicates a paper linked more than once", () => {
    const html = landing(
      "/past-year-questions/jipmat/2025/QA",
      "https://www.afterboards.in/past-year-questions/jipmat/2025/QA"
    );
    expect(discoverPapers("jipmat", html)).toHaveLength(1);
  });

  it("rejects a section code that is not one of this exam's own", () => {
    // Indore has no QA section and JIPMAT has no SA section. A link shaped like
    // one means the source reorganised, which must surface rather than be read
    // as a paper we can fetch.
    const html = landing("/past-year-questions/jipmat/2025/SA");
    expect(discoverPapers("jipmat", html)).toEqual([]);
  });

  it("returns nothing for a page with no paper links at all", () => {
    expect(discoverPapers("jipmat", "<html><body>down for maintenance</body></html>")).toEqual([]);
  });
});

describe("parsePaperFileName", () => {
  it("round-trips a cached file name back to its paper key", () => {
    expect(parsePaperFileName("jipmat-2025-QA.html")).toEqual({
      exam: "jipmat",
      year: 2025,
      section: "QA",
    });
  });

  it("handles a slug that itself contains hyphens", () => {
    // "ipmat-indore-2026-SA" must not split on the first hyphen.
    expect(parsePaperFileName("ipmat-indore-2026-SA.html")).toEqual({
      exam: "ipmat-indore",
      year: 2026,
      section: "SA",
    });
    expect(parsePaperFileName("ipmat-rohtak-2019-LR.html")).toEqual({
      exam: "ipmat-rohtak",
      year: 2019,
      section: "LR",
    });
  });

  it("recovers a paper the grid does not list, so disk can contradict the grid", () => {
    expect(parsePaperFileName("ipmat-indore-2027-SA.html")).toEqual({
      exam: "ipmat-indore",
      year: 2027,
      section: "SA",
    });
  });

  it("returns null for anything that is not a paper file", () => {
    expect(parsePaperFileName("notes.txt")).toBeNull();
    expect(parsePaperFileName("jipmat-2025-QA.json")).toBeNull();
    expect(parsePaperFileName("unknown-exam-2025-QA.html")).toBeNull();
    expect(parsePaperFileName("jipmat-20x5-QA.html")).toBeNull();
  });
});
