import { describe, it, expect } from "vitest";
import {
  parsePaperCode,
  PAPER_PATTERNS,
  sectionForQuestion,
  patternForYear,
  totalMarks,
  parseSectionAKey,
  codesInMsFilename,
} from "../scripts/cbse-12-pyq/lib";
import { SUBJECTS, pyqNote } from "../scripts/cbse-12-pyq/config";
import { isHindi, declaredExclusion } from "../scripts/cbse-12-pyq/papers";

// CBSE Class 12 BIOLOGY (subject code 044, papers printed "57/s/n"), measured
// 2026-10-07 off the official ZIPs for 2022-2026. Every filename and every
// text fixture below is REAL, copied from those archives.

const BIO = ["57", "044"];

describe("Biology paper patterns, read off each year's printed General Instructions", () => {
  it("2022 is its OWN Term-II paper: 13 questions, not the 12 Physics and Chemistry sat", () => {
    // 2022 57/5/1: "This question paper contains 13 questions ... Section-A has
    // 6 questions of 2 marks each. Section-B has 6 questions of 3 marks each;
    // and Section-C has a case-based question of 5 marks."
    expect(patternForYear("biology", 2022)).toBe("term2_bio");
    expect(totalMarks("term2_bio")).toBe(35);
    const bands = PAPER_PATTERNS.term2_bio;
    expect(bands[bands.length - 1].to).toBe(13);
  });

  it("puts Q1-6 in A at 2, Q7-12 in B at 3, and Q13 as the 5-mark case study", () => {
    expect(sectionForQuestion(1, "term2_bio")).toEqual({ section: "A", marks: 2, kind: "subjective" });
    expect(sectionForQuestion(6, "term2_bio")).toEqual({ section: "A", marks: 2, kind: "subjective" });
    expect(sectionForQuestion(7, "term2_bio")).toEqual({ section: "B", marks: 3, kind: "subjective" });
    expect(sectionForQuestion(12, "term2_bio")).toEqual({ section: "B", marks: 3, kind: "subjective" });
    expect(sectionForQuestion(13, "term2_bio")).toEqual({ section: "C", marks: 5, kind: "case_study" });
    expect(() => sectionForQuestion(14, "term2_bio")).toThrow(/out of range/i);
  });

  it("has no MCQs in 2022 (the marking scheme's Section C case study is written)", () => {
    for (let q = 1; q <= 13; q++) {
      expect(["mcq", "assertion_reason"]).not.toContain(sectionForQuestion(q, "term2_bio").kind);
    }
  });

  it("2023-2026 are all the 33-question full70 paper, 2023 INCLUDED (unlike Physics and Chemistry)", () => {
    // 2023 57/1/1: "Section A Questions no. 1 to 16 are multiple choice (MCQ)
    // ... Section D Questions no. 29 and 30 are case-based ... Section E
    // Questions no. 31 to 33 are long answer". 2025 is a scan; its Hindi
    // instructions page prints the same five bands.
    for (const y of [2023, 2024, 2025, 2026]) expect(patternForYear("biology", y)).toBe("full70");
  });

  it("refuses an unmeasured year", () => {
    expect(() => patternForYear("biology", 2021)).toThrow(/not measured/i);
  });
});

describe("parsePaperCode — Biology (57), every naming convention in the archive", () => {
  it.each([
    ["57-1-1 Biology.pdf", "1", "1"], // 2022 qp
    ["XII_044_57-2-1_Biology_MS.pdf", "2", "1"], // 2022 ms
    ["XII_044_57_1_1_Biology_MS.pdf", "1", "1"], // 2022 ms
    ["57_3_2_Biology.pdf", "3", "2"], // 2023 qp
    ["57-1-1 final.pdf", "1", "1"], // 2023 ms
    ["57_5_1_final.pdf", "5", "1"], // 2023 ms
    ["57_4_1_BIOLOGY.pdf", "4", "1"], // 2024 qp
    ["57-1-2 ..pdf", "1", "2"], // 2024 ms (sic)
    ["57-6-3 BIOLOGY.pdf", "6", "3"], // 2025 qp
    ["XII_044_Biolog_MS 57-1-1.pdf", "1", "1"], // 2025 ms (sic)
    ["XII_044_Biology_MS_57-6-2.pdf", "6", "2"], // 2025 ms
    ["2402-3_57-2-3_Biology.pdf", "2", "3"], // 2026 qp, job-number prefix
    ["57-4-2.pdf", "4", "2"], // 2026 qp, bare
    ["XII_044-MS-57_1_1.pdf", "1", "1"], // 2026 ms
    ["XII_044_MS_ 57_4_2 .pdf", "4", "2"], // 2026 ms, stray spaces
    ["044 57_5_2 Biology_updated 16.04.2026.pdf", "5", "2"], // 2026 ms
  ])("%s", (name, series, set) => {
    expect(parsePaperCode(name, BIO)).toEqual({ series, set });
  });

  it("reads DOTS as separators — and never as the subject code's fallback read", () => {
    // REAL 2026 name. Before dots were separators, the "57" anchor missed it
    // and the "044" fallback read "044_57" as series 5 / set 7: a paper that
    // does not exist, with no error anywhere.
    expect(parsePaperCode("044_57.3.3_Eng_Revised.pdf", BIO)).toEqual({ series: "3", set: "3" });
  });

  it("reads a dotted single code as ONE paper, not a merged scheme off the subject code", () => {
    // REAL 2026 marking scheme. The merged-name rule on the "044" fallback read
    // "044_57.3.3" as series 5 / sets 7,3,3 and outranked the "57" anchor's
    // correct single read, so 57/3/3 lost its marking scheme.
    expect(codesInMsFilename("044_57.3.3_Eng_Revised.pdf", BIO)).toEqual(["57/3/3"]);
  });

  it("falls back to the subject code when the paper code is missing from the name", () => {
    // REAL 2026 name, carrying no "57" at all.
    expect(parsePaperCode("XII-2-044-4-3pdf  biology_updated 16.04.2026.pdf", BIO)).toEqual({
      series: "4",
      set: "3",
    });
  });

  it.each([
    "57-B-5 Biology for VI candidates.pdf",
    "57_B_5_Biology for VI candidates.pdf",
    "57B_Biology for VI candidates.pdf",
    "57 B_Biology for Visually Impaired candidates.pdf",
    "57(B) Biology.pdf",
    "XII_044_Biology_MS 57 (B).pdf",
    "XII_044_MS_57(B).pdf",
    "57-B.pdf",
  ])("excludes the visually-impaired paper %s", (name) => {
    expect(parsePaperCode(name, BIO)).toBeNull();
  });

  it("is not read under another subject's prefix", () => {
    expect(parsePaperCode("57-1-1 Biology.pdf", ["55", "042"])).toBeNull();
    expect(parsePaperCode("XII_044_57_1_1_Biology_MS.pdf", ["56", "043"])).toBeNull();
  });
});

describe("isHindi — the Biology archives name Hindi files in the FILENAME, not a folder", () => {
  it.each([
    "57-1-1 hindi.pdf",
    "57 -2 -1 hindi.pdf",
    "57-3-1_Hindi Biology MS 2024 (1).pdf",
    "57-4-1 - Hindi.pdf",
    "57 (B) hindi 1.pdf",
    "XII_044_Biology_MS 57-1-1 (H).pdf",
    "XII_044_57_4_1 HINDI_Revised.pdf",
    "XII_044_MS_57_5_1HINDI.pdf",
    "XII_MS_044_57_1_2HINDI.pdf",
    "hindi 57.3.1_Revised.pdf",
  ])("%s is Hindi", (name) => {
    expect(isHindi(`C:\\tmp\\Biology\\2026\\ms\\Biology\\${name}`)).toBe(true);
  });

  it.each([
    "57-1-1.pdf",
    "XII_044_Biology_MS 57-1-1.pdf",
    "57-1-3_Eng_Revised.pdf",
    "044 57_5_2 Biology_updated 16.04.2026.pdf",
    "57-3-2 .pdf",
  ])("%s is English", (name) => {
    expect(isHindi(`C:\\tmp\\Biology\\2026\\ms\\Biology\\${name}`)).toBe(false);
  });

  it("keeps the folder and _H rules the other subjects rely on", () => {
    expect(isHindi("C:\\x\\043 Chemistry -Hindi Medium\\56-1-1.pdf")).toBe(true);
    expect(isHindi("C:\\x\\ms\\XII_043_MS_56_1_1_H.pdf")).toBe(true);
  });
});

describe("declared exclusions — files no filename rule can classify", () => {
  const year = (y: number, kind: "qp" | "ms", name: string) =>
    `C:\\tmp\\PYQPs\\CBSE\\XII\\Biology\\${y}\\${kind}\\BIOLOGY\\${name}`;

  it("drops the SCANNED copies of 2024 57/5/1-3, which are not byte-identical to the born-digital ones", () => {
    for (const s of ["1", "2", "3"]) {
      expect(declaredExclusion(year(2024, "qp", `57_5_${s}_BIOLOGY.pdf`), SUBJECTS.biology)).toMatch(/scan/i);
      expect(declaredExclusion(year(2024, "qp", `57-5-${s}_Biology.pdf`), SUBJECTS.biology)).toBeNull();
    }
  });

  it("drops the 2026 Hindi scheme whose Devanagari name arrives garbled", () => {
    expect(
      declaredExclusion(year(2026, "ms", "044 57_3_3 Óñ¦Óñ+Óñ¿ÓÑìÓñªÓÑÇ -1.PDF"), SUBJECTS.biology)
    ).toMatch(/hindi/i);
    expect(declaredExclusion(year(2026, "ms", "044_57.3.3_Eng_Revised.pdf"), SUBJECTS.biology)).toBeNull();
  });

  it("is scoped to the year: the same name in another year is not excluded", () => {
    expect(declaredExclusion(year(2025, "qp", "57_5_1_BIOLOGY.pdf"), SUBJECTS.biology)).toBeNull();
  });

  it("excludes nothing for a subject that declares nothing", () => {
    expect(declaredExclusion(year(2024, "qp", "57_5_1_BIOLOGY.pdf"), SUBJECTS.physics)).toBeNull();
  });
});

describe("parseSectionAKey — a Section A with NO heading (Biology 2024)", () => {
  // REAL, 2024 57/1/1 marking scheme page 3 (the U+F0B4 symbol-font glyph in
  // Q4's value text is left out). The block opens straight after the
  // "MARKING SCHEME ... [ Paper Code: 57/1/1]" header, and the General
  // Instructions above it are numbered too ("18 The candidates are entitled").
  const BIO_2024 =
    "18 The candidates are entitled to obtain photocopy of the Answer Book on request on payment of the \n" +
    "prescribed processing fee. All Examiners/Additional Head Examiners/Head Examiners are once \n" +
    "each answer as given in the Marking Scheme. \nXII_ 044 57/1/1 BIOLOGY # pg. 3 \n \nMARKING SCHEME \n" +
    "Senior Secondary School Examination, 2024 \nBIOLOGY (Subject Code–044) \n[ Paper Code: 57/1/1] \n" +
    "1 \n(C) / Maize \n1 \n1 \n2. \n(B) / Human Chorionic Gonadotropin   \n1 \n1 \n" +
    "3. \n(C) / Day 10 to 17 of menstrual cycle.  \n1 \n1 \n4. \n(B) / 44 XXY– Overall feminine development   \n1 \n1 \n" +
    "5. \n(C) / 2 \n1 \n1 \n6. \n(C) / N–glycosidic linkage \n1 \n1 \n7. \n(B) / Allergy \n1 \n1 \n" +
    "8. \n(D) / Heterotrophic bacteria \n1 \n1 \n9. \n(D) /  Mice \n1 \n1 \n10. (A) / Six base pairs \n1 \n1 \n" +
    "11. (D) / High vitamin – A content \n1 \n1 \n" +
    "12. (C) / Secondary productivity and Net primary productivity \n1 \n1 \n" +
    "13. (C) / Assertion (A) is true, but Reason (R) is false. \n1 \n1 \n" +
    "14. (A) / Both Assertion (A) and Reason (R) are true and Reason (R) is the correct explanation \nof Assertion (A). \n1 \n1 \n" +
    "15. (D) / Assertion (A) is false, but Reason (R) is true \n1 \n1 \n" +
    "16. (C) / Assertion (A) is true, but reason (R) is false. \n1 \n1 \n \nSECTION – B \n \n \n17. A – Wall of fruit /";

  it("reads all 16 answers from the block under the MARKING SCHEME header", () => {
    const key = parseSectionAKey(BIO_2024, 16);
    expect(key.map((e) => e.answer).join("")).toBe("CBCBCCBDDADCCADC");
    expect(key[0]).toEqual({ q: 1, answer: "C", valueText: "/ Maize" });
  });

  it("still returns NOTHING without an expected count, so a Term-II paper stays MCQ-less", () => {
    expect(parseSectionAKey(BIO_2024)).toEqual([]);
  });

  it("still fails closed when the headless block is short", () => {
    const short = BIO_2024.replace(/16\. \(C\)[^\n]*\n1 \n1 \n/, "");
    expect(() => parseSectionAKey(short, 16)).toThrow(/15 of 16|expected/i);
  });
});

describe("pyqNote — the 2022 clause states THIS subject's paper", () => {
  it("says 13 questions for Biology", () => {
    expect(pyqNote(SUBJECTS.biology, 2022, "57/1/1")).toContain("(13 questions, 35 marks)");
  });

  it("is byte-identical to what Physics and Chemistry rows already carry", () => {
    expect(pyqNote(SUBJECTS.physics, 2022, "55/1/1")).toBe(
      "CBSE Class 12 Physics (042) board examination 2022, question paper 55/1/1. This is the COVID-era " +
        "Term-II paper (12 questions, 35 marks), covering part of the syllabus only, and it predates NCERT's " +
        "rationalisation — some questions examine content the current syllabus no longer includes. Official " +
        "CBSE question paper; answer cross-checked against CBSE's published marking scheme for the same paper code."
    );
  });

  it("adds no clause for a full-length year", () => {
    expect(pyqNote(SUBJECTS.biology, 2024, "57/1/1")).not.toMatch(/Term-II/);
  });
});

describe("Biology chapters: the one dropped topic has an [Outdated] home", () => {
  // The rationalised NCERT removed "Organism and its Environment" (adaptations,
  // responses to abiotic factors). Five 2022 rows examine it; like Chemistry's
  // Surface Chemistry they need a chapter the validator accepts, or a re-commit
  // of those papers fails, or worse, files them onto a live subtopic.
  it("accepts the [Outdated] chapter after the 13 live ones", () => {
    const ch = SUBJECTS.biology.chapters as readonly string[];
    expect(ch).toContain("Organism and its Environment [Outdated]");
    expect(ch.indexOf("Organism and its Environment [Outdated]")).toBe(13);
  });

  it("keeps tissue culture on the live Ch.10, not an [Outdated] chapter", () => {
    const ch = SUBJECTS.biology.chapters as readonly string[];
    expect(ch.filter((c) => c.includes("[Outdated]"))).toHaveLength(1);
    expect(ch).toContain("Biotechnology and its Applications");
  });
});
