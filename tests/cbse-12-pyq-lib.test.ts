import { describe, it, expect } from "vitest";
import {
  parsePaperCode,
  paperCodeLabel,
  PAPER_PATTERNS,
  sectionForQuestion,
  patternForYear,
  totalMarks,
} from "../scripts/cbse-12-pyq/lib";

// Every filename below is a REAL name from the official CBSE ZIPs (measured
// 2026-08-18, all five years). CBSE's naming is inconsistent across years —
// separators change, a 2022 file misspells "Mathematcs", 2026 prefixes an
// internal job number, and 2024 ships the same paper twice under two names.
describe("parsePaperCode", () => {
  it("reads the 2025 hyphen form", () => {
    expect(parsePaperCode("65-5-1_Mathematics.pdf")).toEqual({ series: "5", set: "1" });
  });

  it("reads the 2024 underscore form", () => {
    expect(parsePaperCode("65_1_2_Mathematics.pdf")).toEqual({ series: "1", set: "2" });
  });

  it("reads the 2024 missing-separator variant (the byte-duplicate twin)", () => {
    expect(parsePaperCode("65_5_3Mathematics.pdf")).toEqual({ series: "5", set: "3" });
  });

  it("reads the 2022 space form despite the source's 'Mathematcs' typo", () => {
    expect(parsePaperCode("65-1-1 Mathematcs.pdf")).toEqual({ series: "1", set: "1" });
  });

  it("reads the 2026 form past its internal job-number prefix", () => {
    // The leading 2413-1 is NOT the paper code and must not be matched.
    expect(parsePaperCode("2413-1_65-1-1_Mathematics.pdf")).toEqual({ series: "1", set: "1" });
  });

  it("reads the 2026 'R' suffix form", () => {
    expect(parsePaperCode("65-3-2 R.pdf")).toEqual({ series: "3", set: "2" });
  });

  it("returns null for the visually-impaired variants, which are a DIFFERENT adapted paper", () => {
    // Excluded deliberately, not overlooked: 65(B) is an accommodation paper
    // with its own question set. One per year across all five years.
    expect(parsePaperCode("65(B)Mathematics.pdf")).toBeNull();
    expect(parsePaperCode("65-B-5 Mathematics for VI candidates.pdf")).toBeNull();
    expect(parsePaperCode("65(B) MATHEMATICS FOR VI.pdf")).toBeNull();
    expect(parsePaperCode("65(B) R Mathematics.pdf")).toBeNull();
  });

  it("returns null for a name carrying no paper code at all", () => {
    expect(parsePaperCode("Applied_Mathematics.pdf")).toBeNull();
    expect(parsePaperCode("readme.txt")).toBeNull();
  });

  it("labels a code the way CBSE prints it on the paper", () => {
    expect(paperCodeLabel({ series: "5", set: "1" })).toBe("65/5/1");
  });
});

// The two patterns are MEASURED off the papers' own printed General
// Instructions, not assumed: 2023-2026 from 65/5/1 2025 p3, 2022 from
// 65/1/1 2022 p2. They are genuinely different exams.
describe("paper patterns", () => {
  it("knows only the two patterns that have been measured", () => {
    expect(Object.keys(PAPER_PATTERNS).sort()).toEqual(["full80", "term2"]);
  });

  it("maps each year to its measured pattern", () => {
    expect(patternForYear(2022)).toBe("term2");
    for (const y of [2023, 2024, 2025, 2026]) expect(patternForYear(y)).toBe("full80");
  });

  it("refuses a year whose pattern has NOT been measured, rather than guessing", () => {
    // A silent default here would assert a structure nobody checked — the
    // failure mode this project keeps re-learning. Fail loud instead.
    expect(() => patternForYear(2021)).toThrow(/not measured/i);
    expect(() => patternForYear(2027)).toThrow(/not measured/i);
  });

  it("reconstructs 80 marks from the full80 section table", () => {
    expect(totalMarks("full80")).toBe(80);
  });

  it("reconstructs 40 marks from the term2 section table", () => {
    expect(totalMarks("term2")).toBe(40);
  });
});

describe("sectionForQuestion (full80: 2023-2026)", () => {
  it("puts Q1-18 in Section A as 1-mark MCQs", () => {
    expect(sectionForQuestion(1, "full80")).toEqual({ section: "A", marks: 1, kind: "mcq" });
    expect(sectionForQuestion(18, "full80")).toEqual({ section: "A", marks: 1, kind: "mcq" });
  });

  it("puts Q19-20 in Section A as assertion-reason, which are NOT plain MCQs", () => {
    // Same 1 mark and same four options, but a distinct question type the
    // paper names separately — worth carrying so it can be filtered later.
    expect(sectionForQuestion(19, "full80")).toEqual({
      section: "A",
      marks: 1,
      kind: "assertion_reason",
    });
    expect(sectionForQuestion(20, "full80")).toEqual({
      section: "A",
      marks: 1,
      kind: "assertion_reason",
    });
  });

  it("puts Q21-25 in Section B at 2 marks", () => {
    expect(sectionForQuestion(21, "full80")).toEqual({ section: "B", marks: 2, kind: "subjective" });
    expect(sectionForQuestion(25, "full80")).toEqual({ section: "B", marks: 2, kind: "subjective" });
  });

  it("puts Q26-31 in Section C at 3 marks", () => {
    expect(sectionForQuestion(26, "full80")).toEqual({ section: "C", marks: 3, kind: "subjective" });
    expect(sectionForQuestion(31, "full80")).toEqual({ section: "C", marks: 3, kind: "subjective" });
  });

  it("puts Q32-35 in Section D at 5 marks", () => {
    expect(sectionForQuestion(32, "full80")).toEqual({ section: "D", marks: 5, kind: "subjective" });
    expect(sectionForQuestion(35, "full80")).toEqual({ section: "D", marks: 5, kind: "subjective" });
  });

  it("puts Q36-38 in Section E as 4-mark case studies", () => {
    expect(sectionForQuestion(36, "full80")).toEqual({ section: "E", marks: 4, kind: "case_study" });
    expect(sectionForQuestion(38, "full80")).toEqual({ section: "E", marks: 4, kind: "case_study" });
  });

  it("refuses a question number outside the paper", () => {
    expect(() => sectionForQuestion(0, "full80")).toThrow(/out of range/i);
    expect(() => sectionForQuestion(39, "full80")).toThrow(/out of range/i);
  });
});

describe("sectionForQuestion (term2: 2022 only)", () => {
  it("has NO mcq questions anywhere — the Term-2 paper is entirely subjective", () => {
    // Measured, and it matters: the blind-MCQ-re-derivation control that
    // anchors the other years is simply unavailable for 2022.
    for (let q = 1; q <= 14; q++) {
      expect(sectionForQuestion(q, "term2").kind).not.toBe("mcq");
    }
  });

  it("puts Q1-6 in Section A at 2 marks", () => {
    expect(sectionForQuestion(1, "term2")).toEqual({ section: "A", marks: 2, kind: "subjective" });
    expect(sectionForQuestion(6, "term2")).toEqual({ section: "A", marks: 2, kind: "subjective" });
  });

  it("puts Q7-10 in Section B at 3 marks", () => {
    expect(sectionForQuestion(7, "term2")).toEqual({ section: "B", marks: 3, kind: "subjective" });
    expect(sectionForQuestion(10, "term2")).toEqual({ section: "B", marks: 3, kind: "subjective" });
  });

  it("puts Q11-13 in Section C at 4 marks", () => {
    expect(sectionForQuestion(11, "term2")).toEqual({ section: "C", marks: 4, kind: "subjective" });
    expect(sectionForQuestion(13, "term2")).toEqual({ section: "C", marks: 4, kind: "subjective" });
  });

  it("marks Q14 as the case study the paper says it is", () => {
    // "Q.14 is a case study question with two parts of 2 marks each."
    expect(sectionForQuestion(14, "term2")).toEqual({
      section: "C",
      marks: 4,
      kind: "case_study",
    });
  });

  it("refuses a question number outside the shorter paper", () => {
    expect(() => sectionForQuestion(15, "term2")).toThrow(/out of range/i);
  });
});
