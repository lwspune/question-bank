import { describe, it, expect } from "vitest";
import {
  getMockExams,
  getMockExam,
  mockSideNav,
  mockExamSlugs,
  mockExamNames,
  buildMockExamCards,
} from "@/lib/mocks/mocksNav";
import type { MockListItem } from "@/lib/mocks/query";

/**
 * The /mock nav derives from EXAM_REGISTRY's `hasMocks` flag, so these assert
 * structural invariants (NDA + NEET + CDS + MHT-CET have mocks; JEE Mains does
 * not) rather than exact counts.
 *
 * MHT-CET was this file's exemplar of a registered-but-mock-less exam until its
 * 60 PYQ mocks shipped (2026-09-01). Each invariant moved to JEE Mains — a live
 * exam with 10,614 questions and no mocks — rather than being deleted, and
 * MHT-CET gained the positive assertion instead.
 */
describe("mocksNav — cross-exam mock grouping", () => {
  it("lists only exams that have published mocks", () => {
    const exams = getMockExams();
    expect(exams.length).toBeGreaterThan(0);
    const slugs = exams.map((e) => e.slug);
    expect(slugs).toContain("nda");
    expect(slugs).toContain("neet");
    expect(slugs).toContain("mht-cet");
    // JEE Mains has guides + notes but no mocks — must NOT appear.
    expect(slugs).not.toContain("jee-mains");
  });

  it("resolves a mock exam by slug, null for no-mocks or unknown", () => {
    expect(getMockExam("nda")?.examName).toBe("NDA");
    expect(getMockExam("neet")?.examName).toBe("NEET");
    expect(getMockExam("mht-cet")?.examName).toBe("MHT-CET");
    expect(getMockExam("jee-mains")).toBeNull(); // registered, but no mocks
    expect(getMockExam("not-an-exam")).toBeNull();
  });

  it("builds a side nav that leads with All exams, then one per mock-exam", () => {
    const nav = mockSideNav();
    expect(nav[0]).toEqual({ href: "/mock", label: "All exams" });
    expect(nav.slice(1).map((n) => n.href)).toContain("/mock/exam/nda");
    expect(nav.slice(1).map((n) => n.href)).toContain("/mock/exam/neet");
    // every per-exam href points at the /mock/exam/ segment (no /mock/[slug] clash)
    for (const item of nav.slice(1)) expect(item.href.startsWith("/mock/exam/")).toBe(true);
  });

  it("statically pre-renders every mock exam", () => {
    const slugs = mockExamSlugs();
    expect(slugs).toContain("nda");
    expect(slugs).toContain("neet");
    expect(slugs).toContain("mht-cet");
    expect(slugs).not.toContain("jee-mains");
  });

  it("includes CDS, whose 19 English PYQ papers ship as mocks", () => {
    expect(getMockExam("cds")?.examName).toBe("CDS");
    expect(mockExamSlugs()).toContain("cds");
    expect(mockSideNav().map((n) => n.href)).toContain("/mock/exam/cds");
  });

  /**
   * /mock's indexed <title> + description name the exams. That copy was
   * hardcoded "NDA & NEET" and went stale the moment CDS shipped, so it is now
   * derived — these pin the derivation rather than the sentence.
   */
  describe("mockExamNames — the derived prose for /mock's metadata", () => {
    it("names every mock exam and nothing else", () => {
      const prose = mockExamNames();
      const expected = getMockExams().map((e) => e.displayName);
      // Split back apart rather than substring-matching, so an exam gaining
      // mocks later can never make this a false alarm — it just joins the list.
      const got = prose.split(/,\s*|\s+&\s+/).filter(Boolean);
      expect(got).toEqual(expected);
    });

    it("reads as a list, with the last item joined by an ampersand", () => {
      const prose = mockExamNames();
      const n = getMockExams().length;
      expect(n).toBeGreaterThan(1); // otherwise the assertion below is vacuous
      expect(prose).toMatch(/ & /);
      // n exams → n-2 commas (none for two exams), so no trailing/doubled comma.
      expect((prose.match(/,/g) ?? []).length).toBe(n - 2);
      expect(prose).not.toMatch(/,\s*&/); // no Oxford comma before the ampersand
    });
  });
});

/**
 * buildMockExamCards — the derived model behind the /mock exam picker.
 *
 * /mock used to render every published mock as one flat exam -> year -> card
 * list: 63 cards under 29 headings, ~7 screens on desktop and ~11 on mobile.
 * Worse, its ordering was an accident — it sorted on newest year and then fell
 * through to a localeCompare tiebreak, and since all three exams have a 2026
 * sitting the tiebreak decided the whole page. That put CDS first (6 attempts,
 * 2.3% of all attempts) above NDA (252, 95.5%), and disagreed with the left
 * rail one column over, which has always been registry order.
 *
 * So the ordering assertion below is the point of this suite, not decoration.
 *
 * Every number a card shows is DERIVED from the rows /mock already fetches, so
 * a new sitting updates the card by itself. /guide's picker hand-writes its
 * "8,259 questions - 2017-2026" meta line; this project has watched that class
 * of string rot, so none of it is hand-typed here.
 */
describe("buildMockExamCards — the /mock picker model", () => {
  function fixture(
    examName: string,
    pyqYear: number,
    over: Partial<MockListItem> = {}
  ): MockListItem {
    return {
      id: `${examName}-${pyqYear}-${over.paperCode ?? "full"}`,
      slug: `${examName.toLowerCase()}-${pyqYear}-${over.paperCode ?? "full"}`,
      paperCode: "full",
      pyqYear,
      pyqMonth: null,
      title: `${examName} ${pyqYear}`,
      durationSecs: 120 * 60,
      marking: { correct: 1, wrong: 0 },
      sections: [],
      totalQuestions: 100,
      totalMarks: 100,
      examName,
      ...over,
    };
  }

  /** A miniature of the live shape: NDA two papers, CDS one, NEET one. */
  const SAMPLE: MockListItem[] = [
    fixture("CDS", 2026),
    fixture("CDS", 2017),
    fixture("NDA", 2026, { paperCode: "maths" }),
    fixture("NDA", 2026, { paperCode: "gat" }),
    fixture("NDA", 2017, { paperCode: "maths" }),
    fixture("NEET", 2021),
  ];

  it("orders exams by the registry, never alphabetically", () => {
    const slugs = buildMockExamCards(SAMPLE).map((c) => c.slug);
    const expected = getMockExams().map((e) => e.slug);
    expect(slugs).toEqual(expected);

    // Pin the actual regression: the old list sorted CDS above NDA on a
    // localeCompare tiebreak. Registry order leads with NDA.
    expect(slugs.indexOf("nda")).toBeLessThan(slugs.indexOf("cds"));
  });

  it("derives the count and the year span from the rows", () => {
    const cards = buildMockExamCards(SAMPLE);
    const nda = cards.find((c) => c.slug === "nda")!;
    expect(nda.count).toBe(3);
    expect(nda.firstYear).toBe(2017);
    expect(nda.lastYear).toBe(2026);

    const neet = cards.find((c) => c.slug === "neet")!;
    expect(neet.count).toBe(1);
    expect(neet.firstYear).toBe(2021);
    expect(neet.lastYear).toBe(2021);
  });

  it("counts the distinct papers a sitting is made of", () => {
    const cards = buildMockExamCards(SAMPLE);
    // NDA sits two papers (Maths + GAT); CDS and NEET are one paper each.
    expect(cards.find((c) => c.slug === "nda")!.paperCount).toBe(2);
    expect(cards.find((c) => c.slug === "cds")!.paperCount).toBe(1);
    expect(cards.find((c) => c.slug === "neet")!.paperCount).toBe(1);
  });

  it("still renders a card for a mock-exam with nothing published yet", () => {
    // hasMocks can legitimately be flipped a beat before the build lands.
    // Silently omitting a shipped exam is the worse failure, so the card
    // renders and reads as empty — the per-exam page already says so too.
    const cards = buildMockExamCards([]);
    expect(cards.map((c) => c.slug)).toEqual(getMockExams().map((e) => e.slug));
    for (const c of cards) {
      expect(c.count).toBe(0);
      expect(c.firstYear).toBe(0);
      expect(c.lastYear).toBe(0);
      expect(c.paperCount).toBe(0);
    }
  });

  it("ignores mocks belonging to an exam that is not a mock-exam", () => {
    // The flat list rendered whatever the DB returned; the picker renders only
    // registry exams. A row for an unflagged exam must not appear, and must not
    // disturb the exams that are flagged. (The prod-contract probe in
    // tests/mocks-registry.test.ts is what stops such a row existing at all.)
    const cards = buildMockExamCards([...SAMPLE, fixture("JEE Mains", 2026)]);
    expect(cards.map((c) => c.slug)).not.toContain("jee-mains");
    expect(cards.find((c) => c.slug === "nda")!.count).toBe(3);
  });
});
