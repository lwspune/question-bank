import { describe, it, expect } from "vitest";
import {
  getMockExams,
  getMockExam,
  mockSideNav,
  mockExamSlugs,
  mockExamNames,
} from "@/lib/mocks/mocksNav";

/**
 * The /mock nav derives from EXAM_REGISTRY's `hasMocks` flag, so these assert
 * structural invariants (NDA + NEET + CDS have mocks; MHT-CET does not yet)
 * rather than exact counts.
 */
describe("mocksNav — cross-exam mock grouping", () => {
  it("lists only exams that have published mocks", () => {
    const exams = getMockExams();
    expect(exams.length).toBeGreaterThan(0);
    const slugs = exams.map((e) => e.slug);
    expect(slugs).toContain("nda");
    expect(slugs).toContain("neet");
    // MHT-CET has notes but no mocks yet — must NOT appear.
    expect(slugs).not.toContain("mht-cet");
  });

  it("resolves a mock exam by slug, null for no-mocks or unknown", () => {
    expect(getMockExam("nda")?.examName).toBe("NDA");
    expect(getMockExam("neet")?.examName).toBe("NEET");
    expect(getMockExam("mht-cet")).toBeNull(); // registered, but no mocks
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
    expect(slugs).not.toContain("mht-cet");
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
