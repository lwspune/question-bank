/**
 * Writing the exam calendar (migration 0281): the checks `npm run calendar`
 * applies before any write, mirroring the table's CHECKs so a dry run catches
 * what the INSERT would refuse, plus the rules only code can check (the exam
 * is in the registry, and is not a course with no sitting).
 */
import { describe, it, expect } from "vitest";
import { checkSittingInput, planCalendarWrite } from "@/lib/exam/calendarWrite";
import type { SittingEntry } from "@/lib/exam/calendar";

const GOOD = {
  exam: "ssc-cgl",
  sitting: "2027",
  label: "SSC CGL 2027 (Tier I)",
  date: "2027-06-10",
  official: true,
  source: "SSC calendar 2027-28",
  sourceUrl: "https://ssc.gov.in/x.pdf",
};

describe("checkSittingInput", () => {
  it("accepts a well-formed official sitting", () => {
    const r = checkSittingInput(GOOD);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value).toEqual(GOOD);
  });

  it("accepts an expected sitting with no URL", () => {
    expect(checkSittingInput({ ...GOOD, official: false, sourceUrl: null }).ok).toBe(true);
    expect(checkSittingInput({ ...GOOD, official: false, sourceUrl: undefined }).ok).toBe(true);
  });

  it("refuses an official date without an https source link", () => {
    for (const sourceUrl of [null, "", "http://ssc.gov.in/x.pdf", "ssc.gov.in"]) {
      const r = checkSittingInput({ ...GOOD, sourceUrl });
      expect(r.ok).toBe(false);
    }
  });

  it("refuses an exam not in the registry, and a course with no sitting", () => {
    expect(checkSittingInput({ ...GOOD, exam: "cat" }).ok).toBe(false);
    expect(checkSittingInput({ ...GOOD, exam: "foundation-course" }).ok).toBe(false);
    expect(checkSittingInput({ ...GOOD, exam: "worksheets-11-12" }).ok).toBe(false);
    // practiceOnly AND a board: a real sitting, so allowed.
    expect(checkSittingInput({ ...GOOD, exam: "cbse-10" }).ok).toBe(true);
  });

  it("refuses a date that is not a real YYYY-MM-DD", () => {
    for (const date of ["2027-02-30", "10/06/2027", "", 20270610]) {
      expect(checkSittingInput({ ...GOOD, date }).ok).toBe(false);
    }
  });

  it("refuses a bad sitting key, an empty or long label, and dashes in the label", () => {
    expect(checkSittingInput({ ...GOOD, sitting: "2027 I" }).ok).toBe(false);
    expect(checkSittingInput({ ...GOOD, sitting: "" }).ok).toBe(false);
    expect(checkSittingInput({ ...GOOD, label: "" }).ok).toBe(false);
    expect(checkSittingInput({ ...GOOD, label: "x".repeat(81) }).ok).toBe(false);
    expect(checkSittingInput({ ...GOOD, label: "SSC CGL — 2027" }).ok).toBe(false);
    expect(checkSittingInput({ ...GOOD, label: "SSC CGL – 2027" }).ok).toBe(false);
    expect(checkSittingInput({ ...GOOD, label: "SSC CGL -- 2027" }).ok).toBe(false);
  });

  it("refuses an empty or over-long source, and a non-boolean official", () => {
    expect(checkSittingInput({ ...GOOD, source: "" }).ok).toBe(false);
    expect(checkSittingInput({ ...GOOD, source: "x".repeat(401) }).ok).toBe(false);
    expect(checkSittingInput({ ...GOOD, official: "true" }).ok).toBe(false);
  });

  it("names every problem at once, prefixed with the row", () => {
    const r = checkSittingInput({ ...GOOD, date: "x", label: "" });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.errors.length).toBe(2);
      expect(r.errors.every((e) => e.startsWith("ssc-cgl 2027:"))).toBe(true);
    }
  });

  it("is not fooled by a non-object", () => {
    expect(checkSittingInput(null).ok).toBe(false);
    expect(checkSittingInput("nda").ok).toBe(false);
  });
});

describe("planCalendarWrite", () => {
  const existing: SittingEntry[] = [
    { exam: "nda", sitting: "2027-I", label: "NDA 2027 (I)", date: "2027-04-11", official: true, source: "UPSC", sourceUrl: "https://upsc.gov.in/a.pdf" },
    { exam: "neet", sitting: "2027", label: "NEET 2027", date: "2027-05-02", official: false, source: "pattern", sourceUrl: null },
  ];

  it("says insert for a new sitting, same for an unchanged one, and lists what an update changes", () => {
    const plan = planCalendarWrite(
      [
        existing[0],
        { ...existing[1], date: "2027-05-03", official: true, source: "NTA notice", sourceUrl: "https://nta.ac.in/n.pdf" },
        { ...existing[1], exam: "ssc-cgl", label: "SSC CGL 2027" },
      ],
      existing
    );
    expect(plan.map((p) => p.action)).toEqual(["same", "update", "insert"]);
    expect(plan[1].changes).toEqual([
      "date 2027-05-02 -> 2027-05-03",
      "official false -> true",
      "source pattern -> NTA notice",
      "sourceUrl none -> https://nta.ac.in/n.pdf",
    ]);
    expect(plan[0].changes).toEqual([]);
  });

  it("warns when an update moves an official date to not official", () => {
    const plan = planCalendarWrite([{ ...existing[0], official: false, sourceUrl: null }], existing);
    expect(plan[0].action).toBe("update");
    expect(plan[0].warning).toMatch(/official/i);
  });

  it("refuses the same sitting twice in one file", () => {
    expect(() => planCalendarWrite([existing[1], existing[1]], [])).toThrow(/twice/);
  });
});
