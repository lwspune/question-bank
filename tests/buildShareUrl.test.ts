import { describe, it, expect } from "vitest";
import { buildShareUrl } from "@/lib/questions/buildShareUrl";
import { EMPTY_FILTERS, type Filters } from "@/lib/questions/filters";

describe("buildShareUrl", () => {
  it("returns origin + /browse for empty filters", () => {
    expect(buildShareUrl(EMPTY_FILTERS, "https://qb.example.com")).toBe(
      "https://qb.example.com/browse"
    );
  });

  it("includes filter params for an exam + difficulty selection", () => {
    const f: Filters = {
      ...EMPTY_FILTERS,
      examId: "exam-1",
      difficulties: ["HARD"],
    };
    const url = buildShareUrl(f, "https://qb.example.com");
    expect(url).toContain("https://qb.example.com/browse?");
    expect(url).toContain("examId=exam-1");
    expect(url).toContain("difficulty=HARD");
  });

  it("strips trailing slash on origin", () => {
    expect(
      buildShareUrl(EMPTY_FILTERS, "https://qb.example.com/")
    ).toBe("https://qb.example.com/browse");
  });

  it("includes multiple PYQ years", () => {
    const f: Filters = { ...EMPTY_FILTERS, pyqYears: [2025, 2024] };
    const url = buildShareUrl(f, "https://qb.example.com");
    expect(url).toContain("pyqYears=2025%2C2024");
  });

  it("omits page=1 (the default)", () => {
    const f: Filters = { ...EMPTY_FILTERS, page: 1 };
    expect(buildShareUrl(f, "https://qb.example.com")).toBe(
      "https://qb.example.com/browse"
    );
  });

  it("includes page when > 1", () => {
    const f: Filters = { ...EMPTY_FILTERS, page: 3 };
    expect(buildShareUrl(f, "https://qb.example.com")).toContain("page=3");
  });
});
