import { describe, it, expect } from "vitest";
import {
  buildMockCatalogueEntries,
  getMockExams,
  getMockFamilies,
  getMockFamily,
  mockExamSlugs,
  mockFamilyOf,
  mockSideNav,
} from "@/lib/mocks/mocksNav";
import type { MockListItem } from "@/lib/mocks/query";

/**
 * A registry FAMILY with two or more mock exams collapses to ONE rail link and
 * ONE /mock card, opening a family page (/mock/exam/<family>). MPSC has six mock
 * exams (Prelims + five Mains); listing them flat buried the rest of the rail.
 */
describe("mock families", () => {
  it("collapses MPSC and IPMAT — each has 2+ mock exams — and nothing else", () => {
    expect(getMockFamilies().map((f) => f.slug)).toEqual(["ipmat", "mpsc"]);
  });

  it("MPSC's members group by stage, Prelims before Mains, in registry order", () => {
    const mpsc = getMockFamily("mpsc")!;
    expect(mpsc.name).toBe("MPSC");
    expect(mpsc.stages.map((s) => s.stage)).toEqual(["Prelims", "Mains"]);
    expect(mpsc.stages[0].members.map((m) => m.slug)).toEqual(["mpsc-group-b-c"]);
    expect(mpsc.stages[1].members.map((m) => m.slug)).toEqual([
      "mpsc-state-services-mains",
      "mpsc-group-b-combined-mains",
      "mpsc-sti-mains",
      "mpsc-aso-mains",
      "mpsc-psi-mains",
    ]);
  });

  it("a family without stages is one unnamed group", () => {
    const ipmat = getMockFamily("ipmat")!;
    expect(ipmat.stages).toHaveLength(1);
    expect(ipmat.stages[0].stage).toBeNull();
  });

  it("a family slug never collides with an exam slug", () => {
    const exams = new Set(getMockExams().map((e) => e.slug as string));
    for (const f of getMockFamilies()) expect(exams.has(f.slug)).toBe(false);
  });

  it("maps a member exam back to its family, and a lone exam to none", () => {
    expect(mockFamilyOf("mpsc-aso-mains")?.slug).toBe("mpsc");
    expect(mockFamilyOf("nda")).toBeNull();
  });

  it("the rail shows ONE link per family, active on every member page", () => {
    const nav = mockSideNav();
    const labels = nav.map((n) => n.label);
    expect(labels.filter((l) => l.startsWith("MPSC"))).toEqual(["MPSC"]);
    expect(labels).not.toContain("IPMAT Indore");
    const mpsc = nav.find((n) => n.label === "MPSC")!;
    expect(mpsc.href).toBe("/mock/exam/mpsc");
    expect(mpsc.alsoActive).toContain("/mock/exam/mpsc-aso-mains");
    expect(labels).toContain("NDA");
  });

  it("pre-renders the family pages alongside the exam pages", () => {
    const slugs = mockExamSlugs() as string[];
    expect(slugs).toContain("mpsc");
    expect(slugs).toContain("mpsc-aso-mains");
  });
});

describe("buildMockCatalogueEntries — /mock shows one card per family", () => {
  const m = (examName: string, pyqYear: number): MockListItem => ({
    id: `${examName}-${pyqYear}`,
    slug: `${examName}-${pyqYear}`,
    paperCode: "full",
    pyqYear,
    pyqMonth: null,
    title: `${examName} ${pyqYear}`,
    durationSecs: 3600,
    marking: { correct: 1, wrong: -0.25 },
    sections: [],
    totalQuestions: 100,
    totalMarks: 100,
    examName,
    source: "pyq",
    scope: "full",
  });

  it("folds MPSC's exams into one entry whose numbers sum its members", () => {
    const entries = buildMockCatalogueEntries([
      m("MPSC Group B & C Prelims", 2024),
      m("MPSC ASO Mains", 2012),
      m("MPSC ASO Mains", 2017),
      m("NDA", 2026),
    ]);
    const mpsc = entries.filter((e) => e.kind === "family" && e.family.slug === "mpsc");
    expect(mpsc).toHaveLength(1);
    const f = mpsc[0];
    if (f.kind !== "family") throw new Error("unreachable");
    expect(f.card.count).toBe(3);
    expect(f.card.byType["past-papers"]).toBe(3);
    expect([f.card.firstYear, f.card.lastYear]).toEqual([2012, 2024]);
    expect(f.memberSlugs).toContain("mpsc-aso-mains");
    // no MPSC exam leaks out as its own card
    expect(entries.some((e) => e.kind === "exam" && e.card.slug.startsWith("mpsc"))).toBe(false);
    expect(entries.some((e) => e.kind === "exam" && e.card.slug === "nda")).toBe(true);
  });
});
