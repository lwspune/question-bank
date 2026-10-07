import { describe, it, expect } from "vitest";
import { shortMockTitle, hubRows, pickNextMock, HUB_MOCK_ROWS } from "@/lib/mocks/hub";
import type { MockAttemptSummary } from "@/lib/mocks/attempted";

/**
 * /mock/exam/<exam> lists papers under type tabs (5 newest each, "Show all"
 * goes to the type's full page), and a signed-in student gets one card on top:
 * the mock they are in the middle of, else the newest past paper they have not
 * sat.
 */
describe("shortMockTitle", () => {
  it("drops the exam name the page already shows and uses middots", () => {
    expect(shortMockTitle("NDA 2026 (II) — Paper I — Mathematics", "NDA")).toBe("2026 (II) · Paper I · Mathematics");
    expect(shortMockTitle("MHT-CET 2025 — 19 April Shift 1", "MHT-CET")).toBe("2025 · 19 April Shift 1");
  });

  it("leaves a title that does not start with the exam name", () => {
    expect(shortMockTitle("Practice Mock 4", "NDA")).toBe("Practice Mock 4");
  });
});

describe("hubRows", () => {
  const m = (slug: string, pyqYear: number | null, source = "pyq", scope = "full") => ({
    id: slug,
    slug,
    title: `NDA ${slug}`,
    examName: "NDA",
    paperCode: "maths",
    pyqYear,
    pyqMonth: null,
    source,
    scope,
    durationSecs: 9000,
    totalQuestions: 120,
  });

  it("takes the newest past papers first, in the full page's order", () => {
    const rows = hubRows("past-papers", [m("a", 2024), m("b", 2026), m("c", 2025)] as never);
    expect(rows.items.map((r) => r.slug)).toEqual(["b", "c", "a"]);
    expect(rows.total).toBe(3);
  });

  it("stops at the hub's row count but reports the full total", () => {
    const many = Array.from({ length: 9 }, (_, i) => m(`p${i}`, 2017 + i));
    const rows = hubRows("past-papers", many as never);
    expect(rows.items).toHaveLength(HUB_MOCK_ROWS);
    expect(rows.total).toBe(9);
  });
});

describe("pickNextMock", () => {
  const sum = (s: Partial<MockAttemptSummary>): MockAttemptSummary => ({
    count: 0,
    live: false,
    bestScore: null,
    maxScore: null,
    ...s,
  });
  const past = ["p26", "p25", "p24"]; // newest first
  const all = ["p26", "p25", "p24", "practice1", "ch1"];

  it("offers a mock in progress first, wherever it sits", () => {
    const s = new Map([["ch1", sum({ live: true })], ["p26", sum({ count: 1 })]]);
    expect(pickNextMock(past, all, s)).toEqual({ kind: "resume", mockId: "ch1" });
  });

  it("otherwise offers the newest past paper not yet sat", () => {
    const s = new Map([["p26", sum({ count: 2, bestScore: 140, maxScore: 300 })]]);
    expect(pickNextMock(past, all, s)).toEqual({ kind: "next", mockId: "p25" });
  });

  it("offers nothing once every past paper has been sat", () => {
    const s = new Map(past.map((id) => [id, sum({ count: 1 })] as const));
    expect(pickNextMock(past, all, s)).toBeNull();
  });

  it("treats a student with no attempts as starting from the newest paper", () => {
    expect(pickNextMock(past, all, new Map())).toEqual({ kind: "next", mockId: "p26" });
  });
});
