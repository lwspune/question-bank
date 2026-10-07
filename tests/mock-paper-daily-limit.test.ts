/**
 * The daily past-paper download limit (migration 0137), as the download route
 * decides it before building a file. The database trigger is the real limit;
 * this check only refuses early, so a refused download never builds a PDF.
 *
 * Rules (owner, 2026-10-07): N different papers per IST day for EVERY account
 * that can download (pass holders and institute staff alike). A paper's answer
 * key is not a separate paper, and downloading a paper already downloaded today
 * costs nothing.
 */
import { describe, it, expect } from "vitest";
import { decideMockPaperDownload, mockPaperLimitMessage } from "@/lib/export/mockPaperLimit";

const M = (n: number) => `mock-${n}`;

describe("decideMockPaperDownload", () => {
  it("allows anything while the limit is off", () => {
    expect(decideMockPaperDownload({ limit: null, todaysMockIds: [M(1), M(2)], mockId: M(3) })).toEqual({
      allowed: true,
    });
  });

  it("allows a new paper while under the limit", () => {
    expect(
      decideMockPaperDownload({ limit: 5, todaysMockIds: [M(1), M(2), M(3), M(4)], mockId: M(5) })
    ).toEqual({ allowed: true });
  });

  it("refuses a sixth different paper once five are downloaded today", () => {
    expect(
      decideMockPaperDownload({ limit: 5, todaysMockIds: [M(1), M(2), M(3), M(4), M(5)], mockId: M(6) })
    ).toEqual({ allowed: false, limit: 5 });
  });

  it("allows a paper already downloaded today, at the limit (its key, or a second copy)", () => {
    expect(
      decideMockPaperDownload({ limit: 5, todaysMockIds: [M(1), M(2), M(3), M(4), M(5)], mockId: M(3) })
    ).toEqual({ allowed: true });
  });

  it("refuses every paper when the limit is zero", () => {
    expect(decideMockPaperDownload({ limit: 0, todaysMockIds: [], mockId: M(1) })).toEqual({
      allowed: false,
      limit: 0,
    });
  });

  it("counts a paper once however many times it appears", () => {
    expect(
      decideMockPaperDownload({ limit: 2, todaysMockIds: [M(1), M(1), M(1)], mockId: M(2) })
    ).toEqual({ allowed: true });
  });
});

describe("mockPaperLimitMessage", () => {
  it("names the number and when it resets", () => {
    expect(mockPaperLimitMessage(5)).toBe(
      "You've downloaded 5 papers today. You can download more tomorrow."
    );
  });

  it("reads naturally for one paper", () => {
    expect(mockPaperLimitMessage(1)).toBe(
      "You've downloaded 1 paper today. You can download more tomorrow."
    );
  });
});
