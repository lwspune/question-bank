import { describe, it, expect } from "vitest";
import { examsForSite, isNicheExam, withoutNicheExams } from "@/lib/sites/nicheExams";

// An international exam (`site: "intl"`) is listed on intl.pyqvault.com only,
// never on PYQ Vault's www (2026-10-30, NICHE_SITES_SPEC.md). The /browse exam
// dropdown reads exams straight from the database, so it filters by DB name.
// The rule is a NAMED list, not "not in EXAM_REGISTRY": /browse deliberately
// keeps an exam that was ingested before anyone registered it (FilterBar), and
// that must keep working on www.

describe("isNicheExam", () => {
  it("is true for IMAT, an international exam since 2026-10-30", () => {
    expect(isNicheExam("IMAT")).toBe(true);
  });

  it("is false for PYQ Vault exams and for unknown names", () => {
    expect(isNicheExam("NDA")).toBe(false);
    expect(isNicheExam("IPMAT Indore")).toBe(false);
    expect(isNicheExam("Some Exam Not Yet Registered")).toBe(false);
    expect(isNicheExam("")).toBe(false);
  });
});

const rows = [
  { id: "1", name: "CDS" },
  { id: "2", name: "IMAT" },
  { id: "3", name: "Some Exam Not Yet Registered" },
];

describe("withoutNicheExams", () => {
  it("drops international exams and keeps the rest, unregistered ones included, in order", () => {
    expect(withoutNicheExams(rows)).toEqual([rows[0], rows[2]]);
  });
});

describe("examsForSite", () => {
  it("lists only international exams on intl", () => {
    expect(examsForSite(rows, true)).toEqual([rows[1]]);
  });

  it("lists everything else on www", () => {
    expect(examsForSite(rows, false)).toEqual([rows[0], rows[2]]);
  });
});
