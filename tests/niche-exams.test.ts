import { describe, it, expect } from "vitest";
import { isNicheExam, withoutNicheExams } from "@/lib/sites/nicheExams";

// NICHE_SITES_SPEC.md: an exam that belongs to a niche site must never be
// listed on PYQ Vault. The rule is a NAMED list, not "not in EXAM_REGISTRY":
// /browse deliberately keeps an exam that was ingested before anyone
// registered it (see FilterBar), and that must keep working. The list is
// empty since IMAT went on PYQ Vault (2026-10-20).

describe("isNicheExam", () => {
  it("is false for IMAT, which is on PYQ Vault since 2026-10-20", () => {
    expect(isNicheExam("IMAT")).toBe(false);
  });

  it("is false for PYQ Vault exams and for unknown names", () => {
    expect(isNicheExam("NDA")).toBe(false);
    expect(isNicheExam("Some Exam Not Yet Registered")).toBe(false);
    expect(isNicheExam("")).toBe(false);
  });
});

describe("withoutNicheExams", () => {
  it("keeps every row, in order, while no exam is niche", () => {
    const rows = [
      { id: "1", name: "CDS" },
      { id: "2", name: "IMAT" },
      { id: "3", name: "Some Exam Not Yet Registered" },
    ];
    expect(withoutNicheExams(rows)).toEqual(rows);
  });
});
