import { describe, expect, it } from "vitest";
import { formatMarks, scoreShareText, sittingLabel } from "@/lib/scoreCalc/display";

describe("sittingLabel", () => {
  it("reads a shift the way students say it", () => {
    expect(sittingLabel({ date: "2027-01-22", shift: 1, region: "india", keyStatus: "provisional" })).toBe(
      "22 Jan 2027, Shift 1",
    );
  });

  it("says when the sheet came from a centre outside India", () => {
    expect(sittingLabel({ date: "2026-04-04", shift: 2, region: "outside", keyStatus: "final" })).toBe(
      "4 Apr 2026, Shift 2 (centre outside India)",
    );
  });
});

describe("formatMarks", () => {
  it("drops a trailing .0 and keeps halves and quarters", () => {
    expect(formatMarks(201)).toBe("201");
    expect(formatMarks(144.5)).toBe("144.5");
    expect(formatMarks(98.25)).toBe("98.25");
    expect(formatMarks(-3)).toBe("-3");
  });
});

describe("scoreShareText", () => {
  it("says the score, the key it used and where to check, with a tagged link", () => {
    const t = scoreShareText({ title: "JEE Main", total: 201, max: 300, keyStatus: "provisional", slug: "jee-main" });
    expect(t).toBe(
      "I scored 201/300 in JEE Main on NTA's provisional key. Check yours in 10 seconds: " +
        "https://www.pyqvault.com/score-calculator/jee-main?utm_source=share&utm_medium=score&utm_campaign=score-calc",
    );
  });

  it("never uses an em dash", () => {
    const t = scoreShareText({ title: "SSC CGL Tier I", total: 144.5, max: 200, keyStatus: "final", slug: "ssc-cgl" });
    expect(t).not.toMatch(/—/);
  });
});
