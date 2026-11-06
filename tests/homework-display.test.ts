import { describe, expect, it } from "vitest";
import { shortNote, sectionsOf, planWording, seeAllLabel } from "@/lib/homework/display";

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

  it("puts repeats and types in one section, since they are ranked together, then the asked-once days", () => {
    // Parts 1 and 2 interleave since 2026-11-04 (one ranking by count).
    expect(sectionsOf([day(1, 1), day(2, 2), day(3, 1), day(4, 3), day(5, 3)])).toEqual([
      { kind: "most", from: 1, to: 3, days: [day(1, 1), day(2, 2), day(3, 1)] },
      { kind: "once", from: 4, to: 5, days: [day(4, 3), day(5, 3)] },
    ]);
  });
});

describe("planWording", () => {
  const upsc = { asker: "UPSC", questions: "past questions", papers: "Past", answers: "worked solutions" };
  const board = { asker: "the board", questions: "board questions", papers: "Board", answers: "model answers" };

  it("names UPSC and past questions for the UPSC exams, NDA and CDS", () => {
    expect(planWording("NDA")).toEqual(upsc);
    expect(planWording("CDS")).toEqual(upsc);
  });

  it("names the CET Cell and past questions for MHT-CET, which no board sets", () => {
    expect(planWording("MHT-CET")).toEqual({
      asker: "the CET Cell",
      questions: "past questions",
      papers: "Past",
      answers: "worked solutions",
    });
  });

  it("names SSC and past questions for SSC CGL", () => {
    expect(planWording("SSC CGL")).toEqual({ asker: "SSC", questions: "past questions", papers: "Past", answers: "worked solutions" });
  });

  it("keeps the board wording for every board exam", () => {
    for (const exam of ["CBSE Class 12", "Maharashtra HSC Class 12", "Maharashtra SSC Class 10", "CBSE Class 10"]) {
      expect(planWording(exam)).toEqual(board);
    }
  });
});

describe("seeAllLabel", () => {
  it("names how many questions the link opens, from the slot's note", () => {
    expect(seeAllLabel("This type asked 8 times: NDA 1 2017, NDA 2 2024. This one: NDA 1 2021")).toBe("See all 8 of this type");
    expect(seeAllLabel("Asked 2 times: NDA 2 2022, NDA 2 2024")).toBe("See all 2 times it was asked");
    expect(seeAllLabel("Asked once: Mar 2016 (same type asked 6 times)")).toBe("See all 6 of this type");
  });

  it("offers nothing for a question asked once with no type", () => {
    expect(seeAllLabel("Asked once: Mar 2016")).toBeNull();
  });
});
