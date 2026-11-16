import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { parseNtaResponseText, scoreNtaSheet, type NtaResponse } from "@/lib/scoreCalc/ntaSheet";
import type { NtaKeyEntry } from "@/lib/scoreCalc/ntaKey";
import { JEE_MAINS_PAPER } from "@/lib/mocks/blueprints";

/**
 * SYNTHETIC FIXTURE, built in the label shape of NTA's exam software (the same
 * labels its public question paper prints: "Question ID", "Option 1 ID"...),
 * plus the candidate fields "Status", "Chosen Option" and "Given Answer".
 * Replace with a real student's sheet (names and roll number removed) as soon
 * as one is in hand: until then this proves the logic, not the real page.
 */
const SHEET = `
Application No  ######
Section : Mathematics Section A
Q.1
Question Type : MCQ
Question ID : 6911211
Option 1 ID : 6911211001
Option 2 ID : 6911211002
Option 3 ID : 6911211003
Option 4 ID : 6911211004
Status : Answered
Chosen Option : 3
Q.2
Question Type : MCQ
Question ID : 6911212
Option 1 ID : 6911212001
Option 2 ID : 6911212002
Option 3 ID : 6911212003
Option 4 ID : 6911212004
Status : Not Answered
Chosen Option : --
Q.3
Question Type : MCQ
Question ID : 6911213
Option 1 ID : 6911213001
Option 2 ID : 6911213002
Option 3 ID : 6911213003
Option 4 ID : 6911213004
Status : Answered and Marked For Review
Chosen Option : 1
Q.4
Question Type : MCQ
Question ID : 6911214
Option 1 ID : 6911214001
Option 2 ID : 6911214002
Option 3 ID : 6911214003
Option 4 ID : 6911214004
Status : Marked For Review
Chosen Option : --
Section : Mathematics Section B
Q.21
Given Answer : 126
Question Type : SA
Question ID : 69112121
Status : Answered
Q.22
Given Answer : --
Question Type : SA
Question ID : 69112122
Status : Not Answered
`;

describe("parseNtaResponseText", () => {
  const rows = parseNtaResponseText(SHEET);

  it("reads every question once, in sheet order", () => {
    expect(rows.map((r) => r.questionId)).toEqual(["6911211", "6911212", "6911213", "6911214", "69112121", "69112122"]);
  });

  it("turns a chosen option NUMBER into that option's ID", () => {
    expect(rows[0]).toEqual({ questionId: "6911211", chosen: "6911211003" });
    expect(rows[2]).toEqual({ questionId: "6911213", chosen: "6911213001" });
  });

  it("reads a blank, and 'Marked For Review' with nothing chosen, as not answered", () => {
    expect(rows[1].chosen).toBeNull();
    expect(rows[3].chosen).toBeNull();
  });

  it("reads a numeric answer, which NTA prints before its question ID", () => {
    expect(rows[4]).toEqual({ questionId: "69112121", chosen: "126" });
    expect(rows[5]).toEqual({ questionId: "69112122", chosen: null });
  });

  it("finds nothing in a page that is not a response sheet", () => {
    expect(parseNtaResponseText("Hello, this is not a sheet")).toEqual([]);
  });
});

/**
 * REAL LAYOUT: a JEE Main 2025 (29 Jan, Shift 1) response sheet a coaching site
 * posted publicly as a PDF, read in reading order (`pdftotext -raw`), with the
 * candidate's identity lines removed and every question/option ID replaced by a
 * made-up one (scratch script, 2026-11-16). The page had 75 questions, 36 of
 * them "Status : Answered", and two "Not Attempted and Marked For Review".
 */
describe("parseNtaResponseText on a real sheet's layout", () => {
  const real = readFileSync(join(__dirname, "fixtures/score-calc/nta-jee-response-sheet-anonymised.txt"), "utf8");
  const rows = parseNtaResponseText(real);

  it("finds every question once", () => {
    expect(rows).toHaveLength(75);
    expect(new Set(rows.map((r) => r.questionId)).size).toBe(75);
  });

  it("counts exactly the answered questions the sheet's statuses list", () => {
    expect(rows.filter((r) => r.chosen !== null)).toHaveLength(36);
  });

  it("reads numeric answers whose label the PDF breaks across lines ('Give / n / Ans / wer :')", () => {
    const numeric = rows.filter((r) => r.chosen !== null && !/^\d{9,}$/.test(r.chosen)).map((r) => r.chosen);
    expect(numeric).toEqual(["0", "4", "11", "485", "125"]);
  });

  it("keeps the identity lines out of the fixture", () => {
    expect(real).not.toMatch(/Candidate Name|Roll No|Application No/i);
  });
});

describe("scoreNtaSheet", () => {
  function keyFor(n: number, subject: NtaKeyEntry["subject"]): [string, NtaKeyEntry][] {
    return Array.from({ length: n }, (_, i) => [
      `${subject}-${i}`,
      { subject, answer: { kind: "values", values: [`${subject}-${i}-right`] } },
    ]);
  }
  const key = new Map<string, NtaKeyEntry>([...keyFor(25, "physics"), ...keyFor(25, "chemistry"), ...keyFor(25, "maths")]);
  const allRight = (): NtaResponse[] => [...key.keys()].map((q) => ({ questionId: q, chosen: `${q}-right` }));

  it("scores a full sheet against the key by subject", () => {
    const responses = allRight();
    responses[0].chosen = "nope"; // physics wrong
    responses[30].chosen = null; // chemistry blank
    const r = scoreNtaSheet(responses, key, JEE_MAINS_PAPER);
    if (!r.ok) throw new Error(r.error);
    expect(r.score.total).toBe(300 - 4 - 1 - 4);
    expect(r.score.sections.find((s) => s.key === "physics")).toMatchObject({ right: 24, wrong: 1 });
    expect(r.score.sections.find((s) => s.key === "chemistry")).toMatchObject({ right: 24, blank: 1 });
  });

  it("says the sheet is from another shift when its questions are not in the key", () => {
    const responses = allRight();
    responses[5].questionId = "999";
    const r = scoreNtaSheet(responses, key, JEE_MAINS_PAPER);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toMatch(/shift/);
  });

  it("refuses a sheet missing questions the key has", () => {
    const r = scoreNtaSheet(allRight().slice(1), key, JEE_MAINS_PAPER);
    expect(r.ok).toBe(false);
  });
});
