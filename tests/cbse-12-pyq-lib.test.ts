import { describe, it, expect } from "vitest";
import {
  parsePaperCode,
  paperCodeLabel,
  PAPER_PATTERNS,
  sectionForQuestion,
  patternForYear,
  totalMarks,
  splitMergedMs,
  codesInMsFilename,
  parseInternalPage,
  parseSectionAKey,
} from "../scripts/cbse-12-pyq/lib";

// Every filename below is a REAL name from the official CBSE ZIPs (measured
// 2026-08-18, all five years). CBSE's naming is inconsistent across years —
// separators change, a 2022 file misspells "Mathematcs", 2026 prefixes an
// internal job number, and 2024 ships the same paper twice under two names.
describe("parsePaperCode", () => {
  it("reads the 2025 hyphen form", () => {
    expect(parsePaperCode("65-5-1_Mathematics.pdf", "65")).toEqual({ series: "5", set: "1" });
  });

  it("reads the 2024 underscore form", () => {
    expect(parsePaperCode("65_1_2_Mathematics.pdf", "65")).toEqual({ series: "1", set: "2" });
  });

  it("reads the 2024 missing-separator variant (the byte-duplicate twin)", () => {
    expect(parsePaperCode("65_5_3Mathematics.pdf", "65")).toEqual({ series: "5", set: "3" });
  });

  it("reads the 2022 space form despite the source's 'Mathematcs' typo", () => {
    expect(parsePaperCode("65-1-1 Mathematcs.pdf", "65")).toEqual({ series: "1", set: "1" });
  });

  it("reads the 2026 form past its internal job-number prefix", () => {
    // The leading 2413-1 is NOT the paper code and must not be matched.
    expect(parsePaperCode("2413-1_65-1-1_Mathematics.pdf", "65")).toEqual({ series: "1", set: "1" });
  });

  it("reads the 2026 'R' suffix form", () => {
    expect(parsePaperCode("65-3-2 R.pdf", "65")).toEqual({ series: "3", set: "2" });
  });

  it("returns null for the visually-impaired variants, which are a DIFFERENT adapted paper", () => {
    // Excluded deliberately, not overlooked: 65(B) is an accommodation paper
    // with its own question set. One per year across all five years.
    expect(parsePaperCode("65(B)Mathematics.pdf", "65")).toBeNull();
    expect(parsePaperCode("65-B-5 Mathematics for VI candidates.pdf", "65")).toBeNull();
    expect(parsePaperCode("65(B) MATHEMATICS FOR VI.pdf", "65")).toBeNull();
    expect(parsePaperCode("65(B) R Mathematics.pdf", "65")).toBeNull();
  });

  it("returns null for a name carrying no paper code at all", () => {
    expect(parsePaperCode("Applied_Mathematics.pdf", "65")).toBeNull();
    expect(parsePaperCode("readme.txt", "65")).toBeNull();
  });

  it("labels a code the way CBSE prints it on the paper", () => {
    expect(paperCodeLabel({ series: "5", set: "1" }, "65")).toBe("65/5/1");
  });
});

// Every pattern is MEASURED off a paper's own printed General Instructions,
// never assumed. Maths: full80 from 65/5/1 2025 p3, term2 from 65/1/1 2022 p2.
// Sciences (2026-09-10): full70 from 2024+2026 55/1/1 and 56/1/1 (all four
// agree), and the two 2023 tables from 55/1/1 and 56/1/1, which do NOT.
//
// Five patterns for two subjects across five years is not over-fitting — it is
// what the papers actually are. CBSE changed the paper twice in this window
// (35 questions in 2023, 33 from 2024) and the two sciences did not change it
// the same way.
describe("paper patterns", () => {
  it("knows only the patterns that have been measured", () => {
    expect(Object.keys(PAPER_PATTERNS).sort()).toEqual([
      "full70",
      "full70_chem_2023",
      "full70_phy_2023",
      "full80",
      "term2",
      "term2_sci",
    ]);
  });

  it("maps each year to its measured pattern", () => {
    expect(patternForYear("maths", 2022)).toBe("term2");
    for (const y of [2023, 2024, 2025, 2026]) expect(patternForYear("maths", y)).toBe("full80");
  });

  it("refuses a year whose pattern has NOT been measured, rather than guessing", () => {
    // A silent default here would assert a structure nobody checked — the
    // failure mode this project keeps re-learning. Fail loud instead.
    expect(() => patternForYear("maths", 2021)).toThrow(/not measured/i);
    expect(() => patternForYear("maths", 2027)).toThrow(/not measured/i);
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

// ─────────────────────────────────────────────────────────────────────────────
// PHYSICS (55) + CHEMISTRY (56)
//
// Every filename below is REAL, read out of the official ZIPs on 2026-09-10.
// The subject prefix is a REQUIRED argument, never a defaulted one: the point
// is that the typechecker enumerates every call site — the technique the NCERT
// Class-11 ingest used when EXAM_ID became per-chapter.
//
// ⚠ Why this matters more than it looks. Before parameterisation the hardcoded
// /65/ regex returned null for EVERY Physics and Chemistry filename, and
// papers.ts counts null as a visually-impaired EXCLUSION. So the unmodified
// pipeline reported "0 papers, 90 VI excluded" and exited 0 — a total silent
// failure. These tests exist so that cannot happen again.
// ─────────────────────────────────────────────────────────────────────────────
describe("parsePaperCode — Physics (55)", () => {
  it("reads the 2026 form past its internal job-number prefix", () => {
    expect(parsePaperCode("2383-1_55-1-1_Physics.pdf", "55")).toEqual({ series: "1", set: "1" });
    expect(parsePaperCode("2384-3_55-2-3_Physics.pdf", "55")).toEqual({ series: "2", set: "3" });
  });

  it("reads the bare form used for series 3-5 in the SAME 2026 folder", () => {
    // CBSE mixes two conventions inside one directory.
    expect(parsePaperCode("55-3-1.pdf", "55")).toEqual({ series: "3", set: "1" });
    expect(parsePaperCode("55-5-3.pdf", "55")).toEqual({ series: "5", set: "3" });
  });

  it("reads the 2023 merged marking-scheme names, taking the FIRST code", () => {
    // "55-1-1,2,3" is ONE file carrying three papers. Parsing the name yields
    // the opener; splitMergedMs is what recovers the other two.
    expect(parsePaperCode("Marking scheme 55-1-1,2,3 meged.pdf", "55")).toEqual({
      series: "1",
      set: "1",
    });
    expect(parsePaperCode("Marking Scheme 55-2-1,2,3 merged.pdf", "55")).toEqual({
      series: "2",
      set: "1",
    });
  });

  it("excludes the visually-impaired papers in BOTH spellings Physics uses", () => {
    expect(parsePaperCode("55(B)_Physics (Theory).pdf", "55")).toBeNull();
    expect(parsePaperCode("Marking Scheme 55-B Final.pdf", "55")).toBeNull();
  });
});

describe("parsePaperCode — Chemistry (56)", () => {
  it("reads the 2022 underscore form", () => {
    expect(parsePaperCode("XII_043_MS_56_1_1.pdf", "56")).toEqual({ series: "1", set: "1" });
    expect(parsePaperCode("XII_043_MS_56_5_3.pdf", "56")).toEqual({ series: "5", set: "3" });
  });

  it("reads all FIVE separator conventions CBSE ships in one 2025 folder", () => {
    const f = (n: string) => parsePaperCode(n, "56");
    expect(f("XII_043_Chemistry_MS_56-6-1.pdf")).toEqual({ series: "6", set: "1" });
    expect(f("XII_043_Chemistry_MS_56_1- 1.pdf")).toEqual({ series: "1", set: "1" }); // embedded space
    expect(f("XII_043_Chemistry_MS_56_2- 1-.pdf")).toEqual({ series: "2", set: "1" }); // trailing dash
    expect(f("XII_043_Chemistry_MS_56_4_1.pdf")).toEqual({ series: "4", set: "1" });
    expect(f("XII_043_Chemistry_MS_56_7_1.pdf")).toEqual({ series: "7", set: "1" }); // series 7 exists
  });

  it("excludes the visually-impaired papers in BOTH spellings Chemistry uses", () => {
    // 2025 says 56_B; 2022 spells it out as 56_Blind.
    expect(parsePaperCode("XII_043_Chemistry_MS_56_B.pdf", "56")).toBeNull();
    expect(parsePaperCode("XII_043_MS_56_Blind.pdf", "56")).toBeNull();
  });
});

describe("parsePaperCode — cross-subject safety", () => {
  // The most dangerous confusion available here: 55, 56 and 65 are the same
  // three digits rearranged, and every Chemistry filename also carries the
  // subject code 043. A file must NEVER parse under another subject's prefix —
  // that would file a Chemistry paper into the Physics corpus with no error
  // anywhere downstream.
  it("refuses a Chemistry file under the Physics prefix, and vice versa", () => {
    expect(parsePaperCode("XII_043_MS_56_1_1.pdf", "55")).toBeNull();
    expect(parsePaperCode("2383-1_55-1-1_Physics.pdf", "56")).toBeNull();
  });

  it("refuses a Maths file under either science prefix", () => {
    expect(parsePaperCode("65-5-1_Mathematics.pdf", "55")).toBeNull();
    expect(parsePaperCode("65-5-1_Mathematics.pdf", "56")).toBeNull();
  });

  it("labels a code with its own subject prefix", () => {
    expect(paperCodeLabel({ series: "1", set: "1" }, "55")).toBe("55/1/1");
    expect(paperCodeLabel({ series: "7", set: "3" }, "56")).toBe("56/7/3");
  });
});

// Measured off the printed General Instructions of Physics 2026 55/1/1:
// 33 questions, five sections — and unlike Maths, whose assertion-reason band
// is Q19-20, Physics puts assertion-reason at Q13-16. So full70 is NOT a
// rescaled full80; the band boundaries genuinely differ.
describe("full70 — the Physics paper pattern", () => {
  it("reconstructs the printed 70 marks from the section table", () => {
    expect(totalMarks("full70")).toBe(70);
  });

  it("puts Q1-12 in Section A as 1-mark MCQs", () => {
    expect(sectionForQuestion(1, "full70")).toEqual({ section: "A", marks: 1, kind: "mcq" });
    expect(sectionForQuestion(12, "full70")).toEqual({ section: "A", marks: 1, kind: "mcq" });
  });

  it("puts Q13-16 in Section A as assertion-reason — NOT Maths' Q19-20 band", () => {
    // "For question number 13 to 16, two statements are given – one labelled as
    // Assertion (A) and the other labelled as Reason (R)."
    for (const q of [13, 14, 15, 16]) {
      expect(sectionForQuestion(q, "full70")).toEqual({
        section: "A",
        marks: 1,
        kind: "assertion_reason",
      });
    }
    // Guard against silently inheriting the Maths band.
    expect(sectionForQuestion(19, "full70").kind).not.toBe("assertion_reason");
  });

  it("puts Q17-21 in Section B at 2 marks", () => {
    expect(sectionForQuestion(17, "full70")).toEqual({
      section: "B",
      marks: 2,
      kind: "subjective",
    });
    expect(sectionForQuestion(21, "full70")).toEqual({
      section: "B",
      marks: 2,
      kind: "subjective",
    });
  });

  it("puts Q22-28 in Section C at 3 marks", () => {
    expect(sectionForQuestion(22, "full70")).toEqual({
      section: "C",
      marks: 3,
      kind: "subjective",
    });
    expect(sectionForQuestion(28, "full70")).toEqual({
      section: "C",
      marks: 3,
      kind: "subjective",
    });
  });

  it("puts Q29-30 in Section D as 4-mark case studies", () => {
    // Note the contrast with Maths, where the case studies are Section E.
    expect(sectionForQuestion(29, "full70")).toEqual({
      section: "D",
      marks: 4,
      kind: "case_study",
    });
    expect(sectionForQuestion(30, "full70")).toEqual({
      section: "D",
      marks: 4,
      kind: "case_study",
    });
  });

  it("puts Q31-33 in Section E at 5 marks", () => {
    expect(sectionForQuestion(31, "full70")).toEqual({
      section: "E",
      marks: 5,
      kind: "subjective",
    });
    expect(sectionForQuestion(33, "full70")).toEqual({
      section: "E",
      marks: 5,
      kind: "subjective",
    });
  });

  it("refuses a question number outside the 33-question paper", () => {
    expect(() => sectionForQuestion(34, "full70")).toThrow(/out of range/i);
    expect(() => sectionForQuestion(0, "full70")).toThrow(/out of range/i);
  });
});

// 2023 is a THIRTY-FIVE question paper in both sciences, and the two subjects'
// 2023 papers differ from EACH OTHER. Both total 70, so a marks check cannot
// tell them apart — only the printed instructions can, and they were read.
describe("the two 2023 patterns, which are not interchangeable", () => {
  it("both reconstruct 70 marks", () => {
    expect(totalMarks("full70_phy_2023")).toBe(70);
    expect(totalMarks("full70_chem_2023")).toBe(70);
  });

  it("Physics 2023: assertion-reason at Q16-18, D is LONG ANSWER, E is case", () => {
    // "Questions number 16 to 18 are Assertion (A) and Reason (R) type questions."
    expect(sectionForQuestion(15, "full70_phy_2023").kind).toBe("mcq");
    expect(sectionForQuestion(16, "full70_phy_2023").kind).toBe("assertion_reason");
    expect(sectionForQuestion(18, "full70_phy_2023").kind).toBe("assertion_reason");
    expect(sectionForQuestion(31, "full70_phy_2023")).toEqual({
      section: "D",
      marks: 5,
      kind: "subjective",
    });
    expect(sectionForQuestion(35, "full70_phy_2023")).toEqual({
      section: "E",
      marks: 4,
      kind: "case_study",
    });
  });

  it("Chemistry 2023: assertion-reason at Q15-18, D is CASE, E is long answer", () => {
    // "For Questions number 15 to 18, two statements are given …"
    expect(sectionForQuestion(14, "full70_chem_2023").kind).toBe("mcq");
    expect(sectionForQuestion(15, "full70_chem_2023").kind).toBe("assertion_reason");
    expect(sectionForQuestion(31, "full70_chem_2023")).toEqual({
      section: "D",
      marks: 4,
      kind: "case_study",
    });
    expect(sectionForQuestion(35, "full70_chem_2023")).toEqual({
      section: "E",
      marks: 5,
      kind: "subjective",
    });
  });

  it("DISAGREE where it costs marks — the reason they are separate patterns", () => {
    // Q31 is 5 marks in Physics and 4 in Chemistry; Q35 is the reverse. Using
    // one table for both would mis-mark five questions per paper, silently,
    // while still totalling 70.
    expect(sectionForQuestion(31, "full70_phy_2023").marks).toBe(5);
    expect(sectionForQuestion(31, "full70_chem_2023").marks).toBe(4);
    expect(sectionForQuestion(35, "full70_phy_2023").marks).toBe(4);
    expect(sectionForQuestion(35, "full70_chem_2023").marks).toBe(5);
    // …and Q15 is a plain MCQ in Physics but assertion-reason in Chemistry.
    expect(sectionForQuestion(15, "full70_phy_2023").kind).not.toBe(
      sectionForQuestion(15, "full70_chem_2023").kind
    );
  });

  it("refuses a question past 35 in either", () => {
    expect(() => sectionForQuestion(36, "full70_phy_2023")).toThrow(/out of range/i);
    expect(() => sectionForQuestion(36, "full70_chem_2023")).toThrow(/out of range/i);
  });
});

// 2022 is the COVID Term-II paper for the sciences too — but it is NOT Maths'
// Term-II paper. Measured 2026-09-10 from the printed instructions of 2022
// 55/1/1 and 56/1/1, which agree with each other exactly:
//   12 questions / THREE sections / 35 marks
// against Maths' 14 questions / 40 marks. Corroborated independently by the
// marking scheme, which instructs "A full scale of marks 0-35 has to be used".
describe("term2_sci — the 2022 Term-II paper, shared by Physics and Chemistry", () => {
  it("reconstructs the printed 35 marks — NOT Maths' 40", () => {
    expect(totalMarks("term2_sci")).toBe(35);
    expect(totalMarks("term2")).toBe(40);
  });

  it("has NO MCQs anywhere, so the blind-MCQ control is unavailable for 2022", () => {
    for (let q = 1; q <= 12; q++) {
      expect(sectionForQuestion(q, "term2_sci").kind).not.toBe("mcq");
      expect(sectionForQuestion(q, "term2_sci").kind).not.toBe("assertion_reason");
    }
  });

  it("puts Q1-3 in Section A at 2 marks", () => {
    expect(sectionForQuestion(1, "term2_sci")).toEqual({
      section: "A",
      marks: 2,
      kind: "subjective",
    });
    expect(sectionForQuestion(3, "term2_sci")).toEqual({
      section: "A",
      marks: 2,
      kind: "subjective",
    });
  });

  it("puts Q4-11 in Section B at 3 marks", () => {
    expect(sectionForQuestion(4, "term2_sci")).toEqual({
      section: "B",
      marks: 3,
      kind: "subjective",
    });
    expect(sectionForQuestion(11, "term2_sci")).toEqual({
      section: "B",
      marks: 3,
      kind: "subjective",
    });
  });

  it("makes Q12 the single 5-mark case study", () => {
    // "Section C - question number 12 is a case study based question,
    //  this question carries 5 marks."
    expect(sectionForQuestion(12, "term2_sci")).toEqual({
      section: "C",
      marks: 5,
      kind: "case_study",
    });
  });

  it("refuses a question number outside the 12-question paper", () => {
    expect(() => sectionForQuestion(13, "term2_sci")).toThrow(/out of range/i);
  });
});

// THE OFFICIAL MCQ KEY — the single biggest quality difference between this
// ingest and its key-less predecessors, and the one thing here that is machine
// readable where everything else needs vision. Measured: the corruption in
// these marking schemes hits SYMBOLS, so the option LETTER survives intact
// while the answer's value text does not ("8 μF" extracts as "8 F").
//
// ⚠ It is NOT uniform. Some papers' Section-A block extracts perfectly and
// others are scrambled by their two-column layout, so the parser must REFUSE a
// bad parse rather than return a short list that reads as a complete key.
describe("parseSectionAKey", () => {
  it("reads the plain form (Chemistry 2026: uppercase, numbered with a dot)", () => {
    const t = `Q.No.\nEXPECTED OUTCOMES\nMarks\n\nSECTION - A\n\n1. \n(B) \n1 \n2. \n(B) \n1 \n3. \n(C) \n1 \n\nSECTION - B\n\n17. \nNegative deviation`;
    expect(parseSectionAKey(t)).toEqual([
      { q: 1, answer: "B" },
      { q: 2, answer: "B" },
      { q: 3, answer: "C" },
    ]);
  });

  it("reads the lowercase form and UPPERCASES it (Chemistry 2023)", () => {
    // The bank stores A/B/C/D uppercase; CBSE prints either case by year.
    const t = `SECTION-A \n \n1. \n(a) \n1 \n2. \n(c) \n1 \n \nSECTION- B \n \n19. \nHenry's law`;
    expect(parseSectionAKey(t)).toEqual([
      { q: 1, answer: "A" },
      { q: 2, answer: "C" },
    ]);
  });

  it("reads a number with NO trailing dot (Chemistry 2025 56/1/1)", () => {
    const t = `SECTION A \n \n1 \n(A) \n1 \n2 \n(B) \n1 \n \nSECTION B  \n \n17 \n(A) (a) Due to high pressure`;
    expect(parseSectionAKey(t)).toEqual([
      { q: 1, answer: "A" },
      { q: 2, answer: "B" },
    ]);
  });

  it("keeps the answer's VALUE TEXT where CBSE prints it (Physics 2024)", () => {
    // Worth keeping as an independent cross-check on the letter — though it is
    // exactly the part the Symbol-font corruption eats, so it is advisory.
    const t = `Section  A \n \n \n1. \n(B)     Zero \n1 \n1 \n2. \n(D)     5.0 J \n1 \n1 \n \nSection B\n\n17. \nsomething`;
    expect(parseSectionAKey(t)).toEqual([
      { q: 1, answer: "B", valueText: "Zero" },
      { q: 2, answer: "D", valueText: "5.0 J" },
    ]);
  });

  it("captures CBSE's OWN inline errata — questions the Board itself voided", () => {
    // REAL, Chemistry 2023 56/1/1. These are questions CBSE declared broken and
    // awarded to everyone. Losing them would mean transcribing a defective
    // question with a key that cannot be right, and never knowing why.
    const plain = [1, 2, 3, 4, 5].map((n) => `${n}. \n(a) \n1 `).join("\n");
    const t =
      `SECTION-A \n \n${plain}\n` +
      `6. \n(c) / Full mark to be awarded for any option \n1 \n` +
      [7, 8, 9, 10, 11, 12].map((n) => `${n}. \n(b) \n1 `).join("\n") +
      `\n13. \n(c) / Award full mark if attempted (Printing error) \n1 \n \nSECTION- B \n \n19. \nx`;
    const key = parseSectionAKey(t);
    expect(key).toHaveLength(13);
    expect(key[5]).toEqual({
      q: 6,
      answer: "C",
      valueText: "/ Full mark to be awarded for any option",
      graceNote: "/ Full mark to be awarded for any option",
    });
    expect(key[12]).toEqual({
      q: 13,
      answer: "C",
      valueText: "/ Award full mark if attempted (Printing error)",
      graceNote: "/ Award full mark if attempted (Printing error)",
    });
    // …and the ordinary entries carry no grace note.
    expect(key.filter((e) => e.graceNote).map((e) => e.q)).toEqual([6, 13]);
  });

  it("stops at Section B — a later '(a)' sub-part is NOT a Section-A answer", () => {
    // Section E prints "31 (a)" for sub-parts; sweeping the whole document
    // would read those as MCQ answers for questions 31+.
    const t = `SECTION A\n\n1. \n(A) \n1 \n\nSECTION B\n\n17. \nprose\n\nSECTION E \n \n31 \n(a) (i) E = ...\n32 \n(b) x`;
    expect(parseSectionAKey(t)).toEqual([{ q: 1, answer: "A" }]);
  });

  it("returns NOTHING when there is no Section-A block at all", () => {
    expect(parseSectionAKey("Marking Scheme\nGeneral Instructions:\n1 You are aware")).toEqual([]);
  });

  it("refuses a block whose question numbers are not 1..N ascending", () => {
    // A scrambled two-column extraction yields plausible-looking pairs in the
    // wrong order. Returning them would hand on a key that is confidently wrong.
    const t = `SECTION A\n\n1. \n(A) \n1 \n5. \n(B) \n1 \n2. \n(C) \n1 \n\nSECTION B\n\n19. x`;
    expect(() => parseSectionAKey(t)).toThrow(/ascending|1\.\.N|order/i);
  });

  it("refuses a duplicate question number", () => {
    const t = `SECTION A\n\n1. \n(A) \n1 \n1. \n(B) \n1 \n\nSECTION B\n\n19. x`;
    expect(() => parseSectionAKey(t)).toThrow(/ascending|duplicate|order/i);
  });

  // The paper's measured pattern already states how many Section-A questions
  // there are, so that count is a second bound — and a useful one, because in
  // several real marking schemes the "SECTION B" header does not survive
  // extraction and the scan runs on into Section E's "31 (a)" sub-parts.
  describe("bounded by the expected count", () => {
    it("takes exactly N when the Section-B header is missing and the scan runs on", () => {
      // REAL shape: the first 16 read cleanly, then the boundary is lost and
      // sub-part labels follow. The first 16 ARE the key.
      const head = Array.from({ length: 16 }, (_, i) => `${i + 1}. \n(A) \n1 `).join("\n");
      const spill = `\n19 \n(a) x\n21 \n(b) y\n31 \n(a) z`;
      const t = `SECTION A\n\n${head}${spill}`;
      expect(parseSectionAKey(t, 16)).toHaveLength(16);
      expect(parseSectionAKey(t, 16)[15]).toEqual({ q: 16, answer: "A" });
    });

    it("still REFUSES when the first N are not 1..N — a gap is not a boundary problem", () => {
      // Missing Q9: [1..8, 10..17]. Truncating to 16 would hand on a key whose
      // Q9 answer is really Q10's, which is the worst outcome available here.
      const nums = [...Array.from({ length: 8 }, (_, i) => i + 1), ...Array.from({ length: 9 }, (_, i) => i + 10)];
      const t = `SECTION A\n\n${nums.map((n) => `${n}. \n(A) \n1 `).join("\n")}\n\nSECTION B\n\n19. x`;
      expect(() => parseSectionAKey(t, 16)).toThrow(/ascending/i);
    });

    it("refuses when FEWER than N are present, rather than returning a short key", () => {
      const t = `SECTION A\n\n1. \n(A) \n1 \n2. \n(B) \n1 \n\nSECTION B\n\n19. x`;
      expect(() => parseSectionAKey(t, 16)).toThrow(/2 of 16|expected/i);
    });

    it("is unchanged when no count is supplied", () => {
      const t = `SECTION A\n\n1. \n(A) \n1 \n2. \n(B) \n1 \n\nSECTION B\n\n19. x`;
      expect(parseSectionAKey(t)).toHaveLength(2);
    });
  });

  it("skips a TABLE OF CONTENTS entry and finds the real Section A", () => {
    // REAL: Physics 2026's marking scheme opens with a contents page whose
    // "SECTION-A ........ 4" line matches first. Anchoring there finds nothing
    // but dot leaders, and the paper reads as keyless when it is not.
    const toc =
      `SECTION-A ${".".repeat(90)} 4 \n1. ${".".repeat(90)} 4 \n2. ${".".repeat(90)} 4 \n`;
    const real = `SECTION-A \n \n1. \n(B) \n1 \n2. \n(D) \n1 \n \nSECTION-B \n \n17. \nprose`;
    expect(parseSectionAKey(toc + real)).toEqual([
      { q: 1, answer: "B" },
      { q: 2, answer: "D" },
    ]);
  });
});

// ── The four Section-A layouts PHYSICS ships that Chemistry never did ────────
//
// Measured 2026-09-10 across all 78 Physics marking schemes. Before these, 8 of
// the 43 "needs vision" papers were parser gaps rather than genuine image-only
// schemes — and the failure was always the SAME SHAPE: an otherwise perfect run
// with one or two questions missing, which broke the ascending check and failed
// the whole paper closed. Fail-closed was right; the parser was incomplete.
describe("parseSectionAKey — Physics layout variants", () => {
  it("reads a 'Q1.' prefix, not just a bare number (Physics 2023 55/4/*)", () => {
    // REAL: that series numbers its key entries Q1./Q2. The old pattern
    // required the line to START with a digit, so it read ZERO of 18 answers
    // and three papers looked keyless when their key is perfectly clean.
    const t = `SECTION - A \nMarks \nTotal \nQ1. \n(c) zero \n1 \nQ2. \n(b) v \n1 \n \nSECTION - B \n19. prose`;
    expect(parseSectionAKey(t)).toEqual([
      { q: 1, answer: "C", valueText: "zero" },
      { q: 2, answer: "B", valueText: "v" },
    ]);
  });

  it("tolerates a MISSING opening parenthesis: 'A)' (Physics 2025 55/1/2 Q16)", () => {
    // REAL, and it is CBSE's own typo on the last entry of the block: every
    // other row reads "(A)" and Q16 reads "A)". One missing character made a
    // 16-answer key report as 15 and routed the paper to vision.
    const t = `SECTION A \n1 \n(C) x \n1 \n2 \nA)   Both Assertion (A) and Reason (R) are true \n1 \n \nSECTION - B \n17 \nprose`;
    const key = parseSectionAKey(t);
    expect(key.map((e) => [e.q, e.answer])).toEqual([
      [1, "C"],
      [2, "A"],
    ]);
  });

  it("does NOT invent a letter from ordinary prose beginning with A-D", () => {
    // The guard on the rule above: the closing paren stays REQUIRED, so
    // "Award one mark" cannot be read as answer "A". Without this the void
    // wording below would key itself.
    const t = `SECTION A \n1 \nAward one mark to each student \n1 \n \nSECTION B \n17 \nprose`;
    expect(() => parseSectionAKey(t, 1)).toThrow(/short|expected|no option/i);
  });

  describe("the KEYLESS VOID — CBSE says no option is correct, so prints no letter", () => {
    // A SIXTH defect class, beyond the five catalogued on Chemistry. The five
    // there all keep a printed letter ("(c) / Full mark to be awarded for any
    // option"). Here CBSE prints a note and NO letter at all, because none of
    // the four options is right. The old parser skipped the row entirely, which
    // broke the 1..N run and failed the paper — so the commonest Physics void
    // presented as a corrupt layout.
    const VOIDS = [
      "Since no option is correct award 1 mark even if student does not attempt.",
      "No option is correct, award 1 mark.",
      "No option is correct. [Award one mark to each student]",
    ];
    for (const wording of VOIDS) {
      it(`reads it as answer:null with the note kept — "${wording.slice(0, 34)}…"`, () => {
        const t = `SECTION A \n1 \n(A) x \n1 \n2 \n${wording} \n1 \n3 \n(D) y \n1 \n \nSECTION - B \n17 \nprose`;
        const key = parseSectionAKey(t, 3);
        expect(key).toHaveLength(3);
        expect(key[1].q).toBe(2);
        // null, not undefined: "CBSE printed no letter" is a FINDING and must be
        // distinguishable from a field nobody filled in.
        expect(key[1].answer).toBeNull();
        expect(key[1].graceNote).toContain("option is correct");
        // …and it does not disturb its neighbours.
        expect(key[0].answer).toBe("A");
        expect(key[2].answer).toBe("D");
      });
    }

    it("keeps the run ascending, so the paper is no longer refused", () => {
      const rows = Array.from({ length: 18 }, (_, i) =>
        i === 3 ? `${i + 1} \nNo option is correct, award 1 mark. \n1 ` : `${i + 1} \n(A) \n1 `
      ).join("\n");
      const key = parseSectionAKey(`SECTION A \n${rows}\n \nSECTION - B \n19 \nprose`, 18);
      expect(key).toHaveLength(18);
      expect(key.filter((e) => e.answer === null).map((e) => e.q)).toEqual([4]);
    });
  });

  describe("a MEDIUM-SPECIFIC void is REFUSED, never auto-keyed", () => {
    // ⚠ THE DANGEROUS ONE. CBSE sometimes voids a question for ONE medium only,
    // and the two directions are opposite:
    //   • "In Hindi version none of the answer is correct" — the ENGLISH key
    //     stands, and voiding the English row would discard a good question;
    //   • 2023 55/4/1 Q11 prints a letter "for students who have opted to
    //     answer in Hindi medium only" and then awards ENGLISH students full
    //     marks for a misprint — so the printed letter is the HINDI answer and
    //     keying it would assert an answer CBSE explicitly voided for English.
    // Nothing in the text reliably says which way round it is, so this refuses
    // and sends the paper to a human. Guessing is the one option not available.
    it("refuses when the note voids the HINDI version only", () => {
      const t = `SECTION A \n1 \n(A) x \n1 \n2 \nIn Hindi version none of the answer is correct, Therefore award 1 mark. \n1 \n \nSECTION - B \n17 \nprose`;
      expect(() => parseSectionAKey(t, 2)).toThrow(/medium-specific|hindi|english/i);
    });

    it("refuses when the letter applies to Hindi and English is awarded full marks", () => {
      const t = `SECTION A \n1 \n(A) x \n1 \n2 \n(c ) R for students who have opted to answer the question in Hindi medium only. English medium students-There is misprint in the English version. \n1 \n \nSECTION - B \n17 \nprose`;
      expect(() => parseSectionAKey(t, 2)).toThrow(/medium-specific|hindi|english/i);
    });

    it("names the question number, so the reader knows which page to open", () => {
      const t = `SECTION A \n1 \n(A) x \n1 \n2 \nIn Hindi version none of the answer is correct. \n1 \n \nSECTION - B \n17 \nprose`;
      // Anchored on "Q2" rather than a bare "2": the pre-fix message read
      // "short: read 1 of 2 expected", so a bare digit made this pass for
      // entirely the wrong reason.
      expect(() => parseSectionAKey(t, 2)).toThrow(/Q2\b/);
    });

    it("does NOT fire on an ordinary answer that merely mentions a medium", () => {
      // The guard against over-refusing: the trigger is a medium-specific
      // AWARD clause, not the word "English" appearing in an answer's text.
      const t = `SECTION A \n1 \n(A) English physicist Faraday \n1 \n2 \n(B) y \n1 \n \nSECTION - B \n17 \nprose`;
      expect(parseSectionAKey(t, 2).map((e) => e.answer)).toEqual(["A", "B"]);
    });
  });
});

describe("patternForYear is per SUBJECT, not global", () => {
  it("knows the Physics years that have been measured", () => {
    expect(patternForYear("physics", 2026)).toBe("full70");
    expect(patternForYear("physics", 2024)).toBe("full70");
    expect(patternForYear("chemistry", 2026)).toBe("full70");
    expect(patternForYear("chemistry", 2024)).toBe("full70");
    expect(patternForYear("physics", 2023)).toBe("full70_phy_2023");
    expect(patternForYear("chemistry", 2023)).toBe("full70_chem_2023");
    expect(patternForYear("physics", 2025)).toBe("full70");
    expect(patternForYear("chemistry", 2025)).toBe("full70");
    expect(patternForYear("physics", 2022)).toBe("term2_sci");
    expect(patternForYear("chemistry", 2022)).toBe("term2_sci");
  });

  it("THROWS for a subject-year nobody has read off the page", () => {
    // Deliberately years outside the archive, so this stays true as the table
    // is filled in. The rule it protects: a pattern is only ever added by
    // READING that paper's printed General Instructions. Inheriting Physics'
    // Q13-16 assertion-reason band for Chemistry, say, would be exactly the
    // unmeasured-default failure this project keeps paying for — Chemistry's
    // marking scheme lists a bare "13 (A) 1" and says nothing about the band.
    for (const s of ["maths", "physics", "chemistry"] as const) {
      expect(() => patternForYear(s, 2021)).toThrow(/not measured/i);
      expect(() => patternForYear(s, 2027)).toThrow(/not measured/i);
    }
    // All ten science subject-years are now measured (2022 and 2025 by vision,
    // being pure scans). The guard still protects any year CBSE adds next.
  });

  it("keeps Maths answering exactly as before", () => {
    expect(patternForYear("maths", 2022)).toBe("term2");
    expect(patternForYear("maths", 2025)).toBe("full80");
  });
});

// Physics 2023 ships ALL FIVE series as merged 3-in-1 marking schemes, so
// without this split 10 of its 15 papers appear to have no marking scheme at
// all. Measured on the real files: each block start is identified by TWO
// signals that must AGREE — the paper code printed on the block's first page,
// and the file's internal page number resetting to "1".
describe("splitMergedMs", () => {
  const page = (index: number, codes: string[], firstLine: string) => ({ index, codes, firstLine });
  const filler = (start: number, n: number, from = 2) =>
    Array.from({ length: n }, (_, i) => page(start + i, [], String(from + i)));

  // The real shape of "Marking scheme 55-1-1,2,3 meged.pdf": 66 pages, three
  // blocks at 0, 22 and 44. Note p02 carries the code too but is NOT a start.
  const realPages = [
    page(0, ["55/1/1"], "1"),
    page(1, [], "2"),
    page(2, ["55/1/1"], "3"),
    ...filler(3, 19, 4),
    page(22, ["55/1/2"], "1"),
    page(23, [], "2"),
    page(24, ["55/1/2"], "3"),
    ...filler(25, 19, 4),
    page(44, ["55/1/3"], "1"),
    page(45, [], "2"),
    page(46, ["55/1/3"], "3"),
    ...filler(47, 19, 4),
  ];

  it("splits the real 66-page file into its three 22-page blocks", () => {
    expect(splitMergedMs(realPages, ["55/1/1", "55/1/2", "55/1/3"])).toEqual([
      { code: "55/1/1", from: 0, to: 21 },
      { code: "55/1/2", from: 22, to: 43 },
      { code: "55/1/3", from: 44, to: 65 },
    ]);
  });

  it("does NOT treat a mid-block code reprint as a new block", () => {
    // p02 carries "55/1/1" but its internal page number is 3, not 1. Requiring
    // BOTH signals is what stops the file being cut into six pieces.
    expect(splitMergedMs(realPages, ["55/1/1", "55/1/2", "55/1/3"])).toHaveLength(3);
  });

  it("handles UNEVEN blocks — the second real file is 22/23/24 pages", () => {
    const uneven = [
      page(0, ["55/3/1"], "1"),
      ...filler(1, 21),
      page(22, ["55/3/2"], "1"),
      ...filler(23, 22),
      page(45, ["55/3/3"], "1"),
      ...filler(46, 23),
    ];
    expect(splitMergedMs(uneven, ["55/3/1", "55/3/2", "55/3/3"])).toEqual([
      { code: "55/3/1", from: 0, to: 21 },
      { code: "55/3/2", from: 22, to: 44 },
      { code: "55/3/3", from: 45, to: 68 },
    ]);
  });

  it("FAILS CLOSED when the blocks found disagree with the filename's codes", () => {
    // The filename says three papers; if only two block starts are detected one
    // paper's marking scheme would silently go missing. Refuse instead.
    const twoStarts = [
      page(0, ["55/1/1"], "1"),
      ...filler(1, 21),
      page(22, ["55/1/2"], "1"),
      ...filler(23, 21),
    ];
    expect(() => splitMergedMs(twoStarts, ["55/1/1", "55/1/2", "55/1/3"])).toThrow(/expected 3/i);
  });

  it("refuses a file where no block start is detectable at all", () => {
    const noStarts = filler(0, 10, 1);
    expect(() => splitMergedMs(noStarts, ["55/1/1"])).toThrow(/no block start/i);
  });

  it("handles the ordinary single-paper file as one block", () => {
    const single = [page(0, ["56/1/1"], "1"), ...filler(1, 7)];
    expect(splitMergedMs(single, ["56/1/1"])).toEqual([{ code: "56/1/1", from: 0, to: 7 }]);
  });

  // CBSE writes its internal page number TWO ways, and the second carries more
  // information. Measured 2026-09-10: the 2023 55/1 and 55/3 files print a bare
  // "1", while 2023 55/4, all of 2022/2024/2025 print "Page 1 of 19". Handling
  // only the bare form left 12 of Physics' 15 merged files unsplittable — i.e.
  // most of the subject's marking schemes silently unpaired.
  describe("the 'Page N of M' internal numbering", () => {
    const ofPages = [
      page(0, ["55/4/1"], "Page 1 of 19"),
      page(1, [], "Page 2 of 19"),
      page(2, ["55/4/1"], "Page 3 of 19"),
      ...Array.from({ length: 16 }, (_, i) => page(3 + i, [], `Page ${4 + i} of 19`)),
      page(19, ["55/4/2"], "Page 1 of 18"),
      page(20, [], "Page 2 of 18"),
      page(21, ["55/4/2"], "Page 3 of 18"),
      ...Array.from({ length: 15 }, (_, i) => page(22 + i, [], `Page ${4 + i} of 18`)),
      page(37, ["55/4/3"], "Page 1 of 18"),
      ...Array.from({ length: 17 }, (_, i) => page(38 + i, [], `Page ${2 + i} of 18`)),
    ];

    it("splits a file numbered 'Page 1 of 19'", () => {
      expect(splitMergedMs(ofPages, ["55/4/1", "55/4/2", "55/4/3"])).toEqual([
        { code: "55/4/1", from: 0, to: 18 },
        { code: "55/4/2", from: 19, to: 36 },
        { code: "55/4/3", from: 37, to: 54 },
      ]);
    });

    // The stated "of M" is a THIRD signal, and the two ways it can disagree
    // mean OPPOSITE things — so they are handled oppositely.
    it("REFUSES a block LONGER than stated — that means our boundary is wrong", () => {
      const tooLong = [
        page(0, ["55/4/1"], "Page 1 of 3"),
        ...Array.from({ length: 9 }, (_, i) => page(1 + i, [], `Page ${2 + i} of 3`)),
        page(10, ["55/4/2"], "Page 1 of 18"),
        ...Array.from({ length: 17 }, (_, i) => page(11 + i, [], `Page ${2 + i} of 18`)),
      ];
      expect(() => splitMergedMs(tooLong, ["55/4/1", "55/4/2"])).toThrow(/longer|boundar/i);
    });

    it("RECORDS a block SHORTER than stated — that means the SOURCE lost pages", () => {
      // REAL: 2024 "55-4 -1,2,3 English Version.pdf" — blocks 55/4/2 and 55/4/3
      // each print "of 16" and carry only 15 pages, so CBSE's own merged file
      // is missing the last page of two marking schemes. 55/4/1 is complete.
      // Refusing the whole file would throw away the good block as collateral,
      // so the shortfall is recorded on the block and reported instead.
      const short = [
        ...Array.from({ length: 15 }, (_, i) => page(i, ["55/4/1"], `55/4/1 page ${i + 1} of 15`)),
        ...Array.from({ length: 15 }, (_, i) =>
          page(15 + i, ["55/4/2"], `55/4/2 Page ${i + 1} of 16`)
        ),
      ];
      const blocks = splitMergedMs(short, ["55/4/1", "55/4/2"]);
      expect(blocks).toEqual([
        { code: "55/4/1", from: 0, to: 14 },
        { code: "55/4/2", from: 15, to: 29, shortBy: 1 },
      ]);
    });

    it("REFUSES a block whose page numbers are not contiguous from 1", () => {
      // A gap in the MIDDLE is not a lost tail, and treating it as one would
      // hand on a block quietly missing an interior page.
      const gappy = [
        page(0, ["55/4/1"], "Page 1 of 4"),
        page(1, [], "Page 2 of 4"),
        page(2, [], "Page 4 of 4"),
      ];
      expect(() => splitMergedMs(gappy, ["55/4/1"])).toThrow(/contiguous|gap/i);
    });

    it("still refuses a mid-block code reprint as a start", () => {
      // p02 carries the code AND says "Page 3 of 19" — not a start.
      expect(splitMergedMs(ofPages, ["55/4/1", "55/4/2", "55/4/3"])).toHaveLength(3);
    });
  });

  // FOUR internal-numbering conventions exist across Physics 2022-2025, and
  // each was found only by opening a file that had failed to split. Two of them
  // put the paper code and the page number on the SAME line, so the number
  // cannot be read by matching the whole line.
  describe("the running-header conventions", () => {
    it("reads the 2022 form: '042_55/1/1_Physics # Page-1'", () => {
      expect(parseInternalPage("042_55/1/1_Physics # Page-1")).toEqual({ page: 1 });
      expect(parseInternalPage("042_55/1/2_Physics # Page-11")).toEqual({ page: 11 });
    });

    it("reads the 2024 form: the code and 'Page 1 of 24' on one line", () => {
      expect(parseInternalPage("55/1/1                    Page 1 of 24")).toEqual({
        page: 1,
        of: 24,
      });
    });

    it("still reads the two whole-line forms", () => {
      expect(parseInternalPage("1")).toEqual({ page: 1 });
      expect(parseInternalPage("Page 1 of 19")).toEqual({ page: 1, of: 19 });
    });

    it("returns null for a page whose first line is ordinary content", () => {
      expect(parseInternalPage("Dipole moment due to dipole BA is")).toBeNull();
      expect(parseInternalPage("MARKING SCHEME: PHYSICS(042)")).toBeNull();
      expect(parseInternalPage("")).toBeNull();
    });

    it("splits a 2022-style file where EVERY page carries the code", () => {
      // The 2022 running header repeats the code on all 11 pages, so the
      // code-present signal alone would cut this into 11 blocks. Only the
      // page-number reset distinguishes a real boundary.
      const p = (i: number, code: string, n: number) => ({
        index: i,
        codes: [code],
        firstLine: `042_${code}_Physics # Page-${n}`,
      });
      const pages = [
        ...Array.from({ length: 10 }, (_, i) => p(i, "55/1/1", i + 1)),
        ...Array.from({ length: 11 }, (_, i) => p(10 + i, "55/1/2", i + 1)),
        ...Array.from({ length: 10 }, (_, i) => p(21 + i, "55/1/3", i + 1)),
      ];
      expect(splitMergedMs(pages, ["55/1/1", "55/1/2", "55/1/3"])).toEqual([
        { code: "55/1/1", from: 0, to: 9 },
        { code: "55/1/2", from: 10, to: 20 },
        { code: "55/1/3", from: 21, to: 30 },
      ]);
    });
  });
});

// CBSE advertises how many papers a merged marking scheme carries in its own
// FILENAME, and does it four different ways across the five years. This is the
// count splitMergedMs is checked against, so a form we cannot read means a
// paper silently loses its key.
describe("codesInMsFilename", () => {
  it("reads the comma form (2023, 2024, 2025)", () => {
    expect(codesInMsFilename("Marking scheme 55-1-1,2,3 meged.pdf", "55")).toEqual([
      "55/1/1",
      "55/1/2",
      "55/1/3",
    ]);
  });

  it("reads the ampersand form (2022)", () => {
    // "XII_042_MS__55_1-(1 & 2 & 3).pdf"
    expect(codesInMsFilename("XII_042_MS__55_1-(1 & 2 & 3).pdf", "55")).toEqual([
      "55/1/1",
      "55/1/2",
      "55/1/3",
    ]);
    expect(codesInMsFilename("XII_042_MS__55_2-(1 & 2 & 3) (1).pdf", "55")).toEqual([
      "55/2/1",
      "55/2/2",
      "55/2/3",
    ]);
  });

  it("reads the 2024 file whose separator list contains a TYPO", () => {
    // "55-2-1,2.3  English Version.pdf" — a period where a comma belongs. Read
    // as two papers it would leave 55/2/3 with no marking scheme at all.
    expect(codesInMsFilename("55-2-1,2.3  English Version.pdf", "55")).toEqual([
      "55/2/1",
      "55/2/2",
      "55/2/3",
    ]);
  });

  it("tolerates the stray space in '55-4 -1,2,3'", () => {
    expect(codesInMsFilename("55-4 -1,2,3 English Version.pdf", "55")).toEqual([
      "55/4/1",
      "55/4/2",
      "55/4/3",
    ]);
  });

  it("returns a single code for an ordinary one-paper name", () => {
    expect(codesInMsFilename("XII_043_Chemistry_MS_56_1- 1.pdf", "56")).toEqual(["56/1/1"]);
  });

  it("returns nothing for a VI marking scheme", () => {
    expect(codesInMsFilename("Marking Scheme 55-B Final.pdf", "55")).toEqual([]);
  });

  it("LABELS with the paper prefix even when the SUBJECT-CODE anchor matched", () => {
    // Physics 2026: "XII-2-042-1-1.pdf" is found via the 042 anchor but IS
    // paper 55/1/1. Labelling it "042/1/1" would key the marking scheme
    // differently from its own question paper, so all 15 of that year's keys
    // would look missing while sitting right there on disk.
    expect(codesInMsFilename("XII-2-042-1-1.pdf", ["55", "042"])).toEqual(["55/1/1"]);
    expect(codesInMsFilename("XII-2-042-5-3.pdf", ["55", "042"])).toEqual(["55/5/3"]);
  });

  it("labels a merged file with the paper prefix too", () => {
    expect(codesInMsFilename("XII_042_Physics_MS_55_7_1,2,3.pdf", ["55", "042"])).toEqual([
      "55/7/1",
      "55/7/2",
      "55/7/3",
    ]);
  });
});

// Physics 2026 abandons the paper-code naming entirely and keys its marking
// schemes on the SUBJECT code instead: "XII-2-042-1-1.pdf" is paper 55/1/1.
// Without a second anchor all 15 of that year's marking schemes are unreadable.
describe("parsePaperCode — the alternate subject-code anchor", () => {
  it("reads the Physics 2026 marking-scheme convention", () => {
    expect(parsePaperCode("XII-2-042-1-1.pdf", ["55", "042"])).toEqual({ series: "1", set: "1" });
    expect(parsePaperCode("XII-2-042-5-3.pdf", ["55", "042"])).toEqual({ series: "5", set: "3" });
  });

  it("excludes the VI paper under the alternate anchor too", () => {
    expect(parsePaperCode("XII-2-042-B-0.pdf", ["55", "042"])).toBeNull();
  });

  it("prefers the real paper code when BOTH anchors are present", () => {
    // 2025 names carry 042 AND 55; only the 55-anchored code is the paper code.
    expect(parsePaperCode("XII_042_Physics_MS_55_7_1,2,3.pdf", ["55", "042"])).toEqual({
      series: "7",
      set: "1",
    });
  });

  it("does not let a Chemistry name match under the Physics anchors", () => {
    expect(parsePaperCode("XII_043_Chemistry_MS_56_1- 1.pdf", ["55", "042"])).toBeNull();
  });

  it("keeps a bare string anchor working exactly as before", () => {
    expect(parsePaperCode("55-3-1.pdf", "55")).toEqual({ series: "3", set: "1" });
  });
});

describe("parseSectionAKey — the BARE-LETTER layout (Chemistry 2025/2026)", () => {
  // REAL, measured 2026-09-13 off 2026-56-1-2's marking scheme. Its text layer
  // is pristine (12,975 chars, header "SECTION – A" with a true en-dash) and
  // the key is trivially legible -- but the number, the letter and the MARK are
  // each on their OWN LINE:
  //
  //     1.        2.
  //     C         B
  //     1         1
  //
  // The old LETTER rule required a CLOSING PAREN, so it matched nothing here
  // and the paper was refused as "read 0 of 16". Four 2026 Chemistry papers and
  // fifteen more across other years were routed to vision for this alone, even
  // though their keys are machine-readable.
  const CHEM_2026 = `MARKING SCHEME\nCHEMISTRY (Subject Code-043)\nQ.No.\nEXPECTED OUTCOMES/VALUE POINTS\nMarks\n \nSECTION – A\n \n1.  \nC \n1 \n2. \nB \n1 \n3. \nD \n1 \n \nSECTION – B \n17. \nPositive Deviation`;

  it("reads a bare letter that stands alone on its line", () => {
    expect(parseSectionAKey(CHEM_2026, 3).map((e) => [e.q, e.answer])).toEqual([
      [1, "C"],
      [2, "B"],
      [3, "D"],
    ]);
  });

  it("does not mistake the MARKS column for an answer", () => {
    // Every entry is followed by a line reading just "1". If those were read as
    // candidates the run would not ascend 1..N and the paper would be refused.
    const key = parseSectionAKey(CHEM_2026, 3);
    expect(key).toHaveLength(3);
    expect(key.every((e) => e.valueText === undefined || e.valueText === "")).toBe(true);
  });

  it("STILL refuses to read 'Award one mark' as answer A", () => {
    // The regression guard. The closing paren was required precisely to stop
    // prose keying itself; the bare-letter form is admitted ONLY when the
    // letter is alone on its line, which prose never is.
    const t = `SECTION A \n1 \nAward one mark to each student \n1 \n \nSECTION B \n17 \nprose`;
    expect(() => parseSectionAKey(t, 1)).toThrow(/short|expected|no option/i);
  });

  it("STILL reads the parenthesised forms unchanged", () => {
    const t = `SECTION A \n1 \n(C) zero \n1 \n2 \nA)   Both are true \n1 \n \nSECTION - B \n17 \nprose`;
    expect(parseSectionAKey(t).map((e) => [e.q, e.answer])).toEqual([
      [1, "C"],
      [2, "A"],
    ]);
  });
});
