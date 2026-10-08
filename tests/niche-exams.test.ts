import { describe, it, expect } from "vitest";
import { isNicheExam, withoutNicheExams } from "@/lib/sites/nicheExams";

// NICHE_SITES_SPEC.md: an exam that belongs to a niche site (IMAT first) must
// never be listed on PYQ Vault. The rule is a NAMED list, not "not in
// EXAM_REGISTRY": /browse deliberately keeps an exam that was ingested before
// anyone registered it (see FilterBar), and that must keep working.

describe("isNicheExam", () => {
  it("is true for IMAT", () => {
    expect(isNicheExam("IMAT")).toBe(true);
  });

  it("is false for PYQ Vault exams and for unknown names", () => {
    expect(isNicheExam("NDA")).toBe(false);
    expect(isNicheExam("MHT-CET")).toBe(false);
    expect(isNicheExam("Some Exam Not Yet Registered")).toBe(false);
    expect(isNicheExam("")).toBe(false);
  });
});

describe("withoutNicheExams", () => {
  it("drops niche exams and keeps every other row in order", () => {
    const rows = [
      { id: "1", name: "CDS" },
      { id: "2", name: "IMAT" },
      { id: "3", name: "NDA" },
      { id: "4", name: "Some Exam Not Yet Registered" },
    ];
    expect(withoutNicheExams(rows)).toEqual([
      { id: "1", name: "CDS" },
      { id: "3", name: "NDA" },
      { id: "4", name: "Some Exam Not Yet Registered" },
    ]);
  });

  it("returns an empty list unchanged", () => {
    expect(withoutNicheExams([])).toEqual([]);
  });
});
