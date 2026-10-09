import { describe, expect, it } from "vitest";
import { shortNote, sectionsOf } from "@/lib/homework/display";

describe("shortNote", () => {
  it("shortens each kind of note the plan builder writes", () => {
    expect(shortNote("Asked 6 times: Mar 2016, Mar 2018 (* = numbers changed that year)")).toBe("asked 6×");
    expect(shortNote("This type asked 12 times: Mar 2016. This one: Feb 2026")).toBe("type asked 12×");
    expect(shortNote("Asked once: Mar 2017 (same type asked 6 times)")).toBe("asked once");
  });

  it("falls back to the note itself", () => {
    expect(shortNote("Something else")).toBe("Something else");
  });
});

describe("sectionsOf", () => {
  const day = (n: number, part: 1 | 2 | 3) => ({ day: n, items: [{ part }] });

  it("groups days by the part their first question belongs to, with the day range", () => {
    expect(sectionsOf([day(1, 1), day(2, 1), day(3, 2), day(4, 3), day(5, 3)])).toEqual([
      { part: 1, from: 1, to: 2, days: [day(1, 1), day(2, 1)] },
      { part: 2, from: 3, to: 3, days: [day(3, 2)] },
      { part: 3, from: 4, to: 5, days: [day(4, 3), day(5, 3)] },
    ]);
  });
});
