import { describe, expect, it } from "vitest";
import { mockCardMetaLine, passLineForExam, type MockExamCard } from "@/lib/mocks/mocksNav";

const card = (over: Partial<MockExamCard>): MockExamCard => ({
  slug: "mht-cet",
  displayName: "MHT-CET",
  examName: "MHT-CET",
  count: 0,
  byType: { "past-papers": 0, practice: 0, sectional: 0 } as MockExamCard["byType"],
  firstYear: 0,
  lastYear: 0,
  paperCount: 1,
  ...over,
});

// Moved out of /mock so /pricing says it the same way (2026-11-02).
describe("mockCardMetaLine", () => {
  it("names each kind with the past-paper years", () => {
    const c = card({ count: 178, byType: { "past-papers": 106, practice: 0, sectional: 72 } as MockExamCard["byType"], firstYear: 2021, lastYear: 2026 });
    expect(mockCardMetaLine(c)).toBe("106 past papers (2021–2026) · 72 sectional");
  });

  it("says coming soon for an exam with none", () => {
    expect(mockCardMetaLine(card({}))).toBe("Coming soon");
  });
});

describe("passLineForExam (/pricing in the student's own exam)", () => {
  it("states what the pass opens for that exam", () => {
    const c = card({ count: 178, byType: { "past-papers": 106, practice: 0, sectional: 72 } as MockExamCard["byType"], firstYear: 2021, lastYear: 2026 });
    expect(passLineForExam(c)).toBe("For MHT-CET, the pass opens every mock: 106 past papers (2021–2026) · 72 sectional.");
  });

  it("says nothing for an exam with no mocks", () => {
    expect(passLineForExam(card({}))).toBeNull();
    expect(passLineForExam(undefined)).toBeNull();
  });
});
