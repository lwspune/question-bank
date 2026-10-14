import { describe, it, expect } from "vitest";
import {
  parsePaperCode,
  PAPER_PATTERNS,
  sectionForQuestion,
  patternForYear,
  totalMarks,
  codesInMsFilename,
  codesInPageText,
  blockStartCodes,
  parseInternalPage,
  splitMergedMs,
  caseStudyFigureGaps,
  type MergedMsPage,
} from "../scripts/cbse-12-pyq/lib";
import {
  SUBJECTS,
  pyqNote,
  sourceFile,
  subjectForPaperId,
  EXAM_ID_CBSE_10,
  EXAM_ID_CBSE_12,
} from "../scripts/cbse-12-pyq/config";
import { excludedByPrefix, isHindi, declaredExclusion, msBlockOverride } from "../scripts/cbse-12-pyq/papers";
import { classFromArgs, classOfPaperId } from "../scripts/cbse-12-pyq/config";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

describe("no pipeline script is hard-wired to Class 12", () => {
  // The exam ids stay exported (for these tests), so the typechecker cannot
  // enumerate a missed call site. This scan can. The three fix scripts are
  // one-off repairs of named Class-12 rows and legitimately name that exam.
  const DIR = join(__dirname, "..", "scripts", "cbse-12-pyq");
  const CLASS_12_ONLY = new Set(["config.ts", "fix-omml-zones.ts", "fix-solution-wording.ts", "flip-impact.ts"]);
  const scripts = readdirSync(DIR).filter((f) => f.endsWith(".ts") && !CLASS_12_ONLY.has(f));

  it.each(scripts)("%s scopes to the paper's exam, not EXAM_ID_CBSE_12", (f) => {
    const src = readFileSync(join(DIR, f), "utf-8");
    expect(src).not.toMatch(/EXAM_ID_CBSE_12/);
    // A source_file built or stripped by hand as "cbse-12-pyq-…" skips Class 10.
    // (Usage lines in comments name the folder "scripts/cbse-12-pyq/", which is fine.)
    expect(src).not.toMatch(/[`"']cbse-12-pyq-|\^cbse-12-pyq-/);
  });
});

describe("class scope for scripts that scan a whole corpus", () => {
  it("requires --class, with no default", () => {
    expect(() => classFromArgs([])).toThrow(/no default/);
    expect(() => classFromArgs(["--class=11"])).toThrow(/no default/);
  });

  it("maps a class to its exam and source_file prefix", () => {
    expect(classFromArgs(["--class=10"])).toEqual({
      classLabel: 10,
      examId: EXAM_ID_CBSE_10,
      sourcePrefix: "cbse-10-pyq-",
    });
    expect(classFromArgs(["x", "--class=12"]).examId).toBe(EXAM_ID_CBSE_12);
  });

  it("reads the class off a paper id", () => {
    expect(classOfPaperId("2025-30-1-1").sourcePrefix).toBe("cbse-10-pyq-");
    expect(classOfPaperId("2024-57-4-1").examId).toBe(EXAM_ID_CBSE_12);
  });
});

// CBSE Class 10 MATHEMATICS STANDARD (041, papers printed "30/s/n") and SCIENCE
// (086, "31/s/n"), measured 2026-10-14 off the official ZIPs for 2022-2026.
// Every filename and text fixture below is REAL, copied from those archives.

const M10 = SUBJECTS.maths10;
const S10 = SUBJECTS.science10;

describe("Class 10 subjects live on the cbse-10 exam, not cbse-12", () => {
  it("each subject carries its own exam id", () => {
    expect(M10.examId).toBe(EXAM_ID_CBSE_10);
    expect(S10.examId).toBe(EXAM_ID_CBSE_10);
    expect(SUBJECTS.maths.examId).toBe(EXAM_ID_CBSE_12);
    expect(SUBJECTS.biology.examId).toBe(EXAM_ID_CBSE_12);
  });

  it("lands on the existing DB subject rows", () => {
    expect(M10.subjectName).toBe("Mathematics");
    expect(S10.subjectName).toBe("Science");
  });

  it("source_file is class-prefixed, so a Class 10 paper can never collide with a Class 12 one", () => {
    expect(sourceFile(M10, 2025, "30/1/1")).toBe("cbse-10-pyq-2025-30-1-1");
    expect(sourceFile(S10, 2026, "31/4/2")).toBe("cbse-10-pyq-2026-31-4-2");
    expect(sourceFile(SUBJECTS.maths, 2025, "65/5/1")).toBe("cbse-12-pyq-2025-65-5-1");
  });

  it("derives the subject from a paper id's prefix", () => {
    expect(subjectForPaperId("2025-30-1-1").key).toBe("maths10");
    expect(subjectForPaperId("2026-31-4-2").key).toBe("science10");
    expect(subjectForPaperId("2025-65-5-1").key).toBe("maths");
  });

  it("names the class and the paper in pyq_note (Standard, since the DB subject is plain Mathematics)", () => {
    expect(pyqNote(M10, 2024, "30/2/1")).toMatch(/^CBSE Class 10 Mathematics Standard \(041\) board examination 2024, question paper 30\/2\/1\./);
    expect(pyqNote(S10, 2025, "31/1/1")).toMatch(/^CBSE Class 10 Science \(086\) board examination 2025/);
    expect(pyqNote(SUBJECTS.maths, 2025, "65/5/1")).toMatch(/^CBSE Class 12 Mathematics \(041\)/);
  });

  it("states the 2022 Term-II size from the Class 10 pattern, not Class 12's", () => {
    expect(pyqNote(M10, 2022, "30/1/1")).toContain("(14 questions, 40 marks)");
    expect(pyqNote(S10, 2022, "31/1/1")).toContain("(15 questions, 40 marks)");
  });

  it("chapters are the live cbse-10 rows verbatim (the em dash is real) plus one [Outdated] chapter each", () => {
    expect(M10.chapters).toHaveLength(15);
    expect(M10.chapters).toContain("Constructions [Outdated]");
    expect(S10.chapters).toHaveLength(14);
    expect(S10.chapters).toContain("Light — Reflection and Refraction");
    expect(S10.chapters).toContain("Periodic Classification of Elements [Outdated]");
  });
});

describe("paper patterns, read off each year's printed General Instructions", () => {
  it("Maths 2022 is the 14-question Term-II paper with TWO case studies (Q13, Q14)", () => {
    // 30/1/1 (2022): "Section C comprises of 4 questions (Q.no. 11 to 14) of 4
    // marks each ... It also contains two case study based questions." The
    // marking scheme labels Q14 "Case Study—2".
    expect(patternForYear("maths10", 2022)).toBe("term2_m10");
    expect(totalMarks("term2_m10")).toBe(40);
    expect(sectionForQuestion(6, "term2_m10")).toEqual({ section: "A", marks: 2, kind: "subjective" });
    expect(sectionForQuestion(7, "term2_m10")).toEqual({ section: "B", marks: 3, kind: "subjective" });
    expect(sectionForQuestion(12, "term2_m10")).toEqual({ section: "C", marks: 4, kind: "subjective" });
    expect(sectionForQuestion(13, "term2_m10")).toEqual({ section: "C", marks: 4, kind: "case_study" });
    expect(sectionForQuestion(14, "term2_m10")).toEqual({ section: "C", marks: 4, kind: "case_study" });
    expect(() => sectionForQuestion(15, "term2_m10")).toThrow(/out of range/i);
  });

  it("Maths 2023-2026 is the same 38-question paper as Class 12 Maths", () => {
    // Read 2023 30/1/1, 2024 30/2/1, 2025 30/1/1 and 2026 30/2/1: Q1-18 MCQ,
    // 19-20 A-R, B 21-25 x2, C 26-31 x3, D 32-35 x5, E 36-38 case study x4.
    for (const y of [2023, 2024, 2025, 2026]) expect(patternForYear("maths10", y)).toBe("full80");
  });

  it("Science 2022 is its own Term-II paper: 15 questions, 40 marks", () => {
    // 31/1/1 (2022): "Section A Questions No. 1 to 7 ... 2 marks. Section B
    // Questions No. 8 to 13 ... 3 marks. Section C Questions No. 14 and 15 are
    // case-based questions. Each question carries 4 marks."
    expect(patternForYear("science10", 2022)).toBe("term2_s10");
    expect(totalMarks("term2_s10")).toBe(40);
    expect(sectionForQuestion(7, "term2_s10")).toEqual({ section: "A", marks: 2, kind: "subjective" });
    expect(sectionForQuestion(13, "term2_s10")).toEqual({ section: "B", marks: 3, kind: "subjective" });
    expect(sectionForQuestion(15, "term2_s10")).toEqual({ section: "C", marks: 4, kind: "case_study" });
  });

  it("Science 2023-2025 is 39 questions / 80 marks with 20 MCQs", () => {
    for (const y of [2023, 2024, 2025]) expect(patternForYear("science10", y)).toBe("sci80");
    expect(totalMarks("sci80")).toBe(80);
    expect(sectionForQuestion(20, "sci80")).toEqual({ section: "A", marks: 1, kind: "mcq" });
    expect(sectionForQuestion(26, "sci80")).toEqual({ section: "B", marks: 2, kind: "subjective" });
    expect(sectionForQuestion(33, "sci80")).toEqual({ section: "C", marks: 3, kind: "subjective" });
    expect(sectionForQuestion(36, "sci80")).toEqual({ section: "D", marks: 5, kind: "subjective" });
    expect(sectionForQuestion(39, "sci80")).toEqual({ section: "E", marks: 4, kind: "case_study" });
  });

  it("Science 2026 is split by DISCIPLINE: Biology 30, Chemistry 25, Physics 25", () => {
    // 31/1/1 (2026): "Section A : Biology (30 Marks) Section B : Chemistry (25
    // Marks) Section C : Physics (25 Marks)", per-question marks read off the
    // 31/1/1 marking scheme.
    expect(patternForYear("science10", 2026)).toBe("sci80_2026");
    const bands = PAPER_PATTERNS.sci80_2026;
    expect(bands[bands.length - 1].to).toBe(39);
    expect(totalMarks("sci80_2026")).toBe(80);
    const marksIn = (s: string) =>
      bands.filter((b) => b.section === s).reduce((n, b) => n + (b.to - b.from + 1) * b.marks, 0);
    expect([marksIn("A"), marksIn("B"), marksIn("C")]).toEqual([30, 25, 25]);
    expect(sectionForQuestion(16, "sci80_2026")).toEqual({ section: "A", marks: 5, kind: "subjective" });
    expect(sectionForQuestion(17, "sci80_2026")).toEqual({ section: "B", marks: 1, kind: "mcq" });
    expect(sectionForQuestion(28, "sci80_2026")).toEqual({ section: "B", marks: 4, kind: "case_study" });
    expect(sectionForQuestion(30, "sci80_2026")).toEqual({ section: "C", marks: 1, kind: "mcq" });
    expect(sectionForQuestion(39, "sci80_2026")).toEqual({ section: "C", marks: 5, kind: "subjective" });
  });

  it("Science 2026 31/2/2 swaps Q15 and Q16: the case study is Q16, the long answer Q15", () => {
    // 31/2/2 (2026) prints Q15 as the 5-mark long answer (2+2+1) and Q16 as the
    // case study (1/1/2), the reverse of every opener; its marking scheme agrees.
    // A paper names this variant in its own header; the year still maps to sci80_2026.
    const bands = PAPER_PATTERNS.sci80_2026_cs16;
    expect(totalMarks("sci80_2026_cs16")).toBe(80);
    const marksIn = (s: string) =>
      bands.filter((b) => b.section === s).reduce((n, b) => n + (b.to - b.from + 1) * b.marks, 0);
    expect([marksIn("A"), marksIn("B"), marksIn("C")]).toEqual([30, 25, 25]);
    expect(sectionForQuestion(15, "sci80_2026_cs16")).toEqual({ section: "A", marks: 5, kind: "subjective" });
    expect(sectionForQuestion(16, "sci80_2026_cs16")).toEqual({ section: "A", marks: 4, kind: "case_study" });
    // Everything else is the opener's table, so the MCQ positions (keys.ts) do not move.
    for (let q = 1; q <= 39; q++) {
      if (q === 15 || q === 16) continue;
      expect(sectionForQuestion(q, "sci80_2026_cs16")).toEqual(sectionForQuestion(q, "sci80_2026"));
    }
  });

  it("refuses an unmeasured year", () => {
    expect(() => patternForYear("maths10", 2021)).toThrow(/not measured/i);
  });
});

describe("parsePaperCode — Class 10, every naming convention in the archive", () => {
  const M = M10.codeAnchors;
  const S = S10.codeAnchors;
  it.each([
    ["30-1-1 Maths Standard.pdf", "1", "1"],
    ["30_4_1 Maths Standard.pdf", "4", "1"],
    ["30-2-1(Mathematics Standard).pdf", "2", "1"],
    ["30-1-3_Mathematics Standard.pdf", "1", "3"],
    ["30-1-2P-Maths (Std)_X.pdf", "1", "2"],
    ["30_3_3_Mathematics Std._cl.10.pdf", "3", "3"],
    ["1171-1_30-4-1  (Mathematics Standard).pdf", "4", "1"],
  ])("maths %s", (name, series, set) => {
    expect(parsePaperCode(name, M)).toEqual({ series, set });
  });

  it.each([
    ["31-4-3 Science.pdf", "4", "3"],
    ["31_1_1_Science.pdf", "1", "1"],
    ["31_4_1_ Science.pdf", "4", "1"],
    ["1190-2_31-4-2_Science.pdf", "4", "2"],
    ["31-2-1.pdf", "2", "1"],
  ])("science %s", (name, series, set) => {
    expect(parsePaperCode(name, S)).toEqual({ series, set });
  });

  it("does NOT read a Maths BASIC paper (430) as Standard 30 — the 2026 Standard ZIP ships both", () => {
    expect(parsePaperCode("430-1-1_Mathematics Basic.pdf", M)).toBeNull();
    expect(parsePaperCode("1158-1_430-4-1 Mathematics (Basic).pdf", M)).toBeNull();
  });

  it("does NOT read a Punjabi (40/41) or Urdu (46/47) version as an English paper", () => {
    expect(parsePaperCode("40-3-1 Maths Std Punjabi version.pdf", M)).toBeNull();
    expect(parsePaperCode("47-4-1 Science Urdu version.pdf", S)).toBeNull();
  });

  it.each([
    "30-B-5 Maths Std. for VI candidates.pdf",
    "30_B_Maths Std. for VI candidates Punjabi version.pdf",
    "30(B) Mathematics.pdf",
    "30 B_Maths Std for Visually Impaired.pdf",
    "1164_30(B)_Mathematics Standard.pdf",
  ])("excludes the maths VI paper %s", (name) => {
    expect(parsePaperCode(name, M)).toBeNull();
  });

  it.each([
    "31-B-5 Science for VI candidates.pdf",
    "31_B_Science_VI.pdf",
    "31 (B)_Science for Visually Impaired Candidates.pdf",
    "31(B)-Science for V.I..pdf",
  ])("excludes the science VI paper %s", (name) => {
    expect(parsePaperCode(name, S)).toBeNull();
  });
});

describe("codesInMsFilename — Class 10", () => {
  it("reads every Maths Standard scheme name to one code", () => {
    const M = M10.codeAnchors;
    expect(codesInMsFilename("041_30_4_1_Mathematics (Standard).pdf", M)).toEqual(["30/4/1"]);
    expect(codesInMsFilename("Marking Scheme 041_30_3_2.pdf", M)).toEqual(["30/3/2"]);
    expect(codesInMsFilename("marking Scheme _041_30_3_1_.pdf", M)).toEqual(["30/3/1"]);
    expect(codesInMsFilename("WithQuestion_041_30_2_1_Mathematics.pdf", M)).toEqual(["30/2/1"]);
    expect(codesInMsFilename("MS 041_30-1-1 Mathematics 2022-23.pdf", M)).toEqual(["30/1/1"]);
    expect(codesInMsFilename("Marking scheme 30 4 1.pdf", M)).toEqual(["30/4/1"]);
    expect(codesInMsFilename("X_MS_041_Mathematics Standard _30-4-1_2024-25_.pdf", M)).toEqual(["30/4/1"]);
    expect(codesInMsFilename("MS_X_041_Mathematics_30-5-3_2025-26 (1).pdf", M)).toEqual(["30/5/3"]);
  });

  it("never reads a Basic scheme (430) as Standard", () => {
    expect(codesInMsFilename("X_241_Mathematics Basic_MS_430_1_1.pdf", M10.codeAnchors)).toEqual([]);
  });

  it("does not use the subject code as a fallback anchor: '086_31' must not read as 31/3/1", () => {
    // The Class 12 fallback (Physics 2026 names its schemes off the subject
    // code) would read this series-1 scheme as paper 31/3/1 — a real paper,
    // so nothing downstream would notice.
    expect(S10.codeAnchors).toEqual(["31"]);
    expect(codesInMsFilename("X_086_31_2_MS UNSIGNED (1).pdf", ["31", "086"])).toEqual(["31/3/1"]);
    expect(codesInMsFilename("X_086_31_2_MS UNSIGNED (1).pdf", S10.codeAnchors)).toEqual([]);
  });
});

describe("codesInPageText — the paper code printed on a scheme page", () => {
  it.each([
    ["X_51_086_31/1/1_Science # Page-1", ["31/1/1"]],
    ["X_086_31/4/1_Science#Page- 1", ["31/4/1"]],
    ["X SCIENCE 31/4/1 PAGE 1", ["31/4/1"]],
    ["PAGE 1 {31-4-1}", ["31/4/1"]],
    ["PAGE1 (SET 31/5/1)", ["31/5/1"]],
    ["Page 1 of 12 \n \nX_086_ 31/1/1 \n", ["31/1/1"]],
    ["SUBJECT NAME : SCIENCE (Q.P. CODE 31/1/1)\n[ Paper Code: 31/1/1]", ["31/1/1"]],
  ])("%j", (text, codes) => {
    expect(codesInPageText(text, "31")).toEqual(codes);
  });

  it("finds no code on a VI scheme", () => {
    expect(codesInPageText("X_086_31/B Science # Page-1", "31")).toEqual([]);
    expect(codesInPageText("MS-Science (VI)/086/31B", "31")).toEqual([]);
  });

  it("does not read 430/1/1 as 30/1/1", () => {
    expect(codesInPageText("Paper Code 430/1/1", "30")).toEqual([]);
  });
});

describe("the Science series schemes: one file per SERIES, split by what the pages say", () => {
  it("reads the running headers as internal page numbers", () => {
    for (const first of [
      "X_51_086_31/1/1_Science # Page-1",
      "X_086_31/4/1_Science#Page- 1",
      "X SCIENCE 31/4/1 PAGE 1",
      "PAGE 1 {31-4-1}",
      "PAGE1 (SET 31/5/1)",
    ]) {
      expect(parseInternalPage(first)?.page).toBe(1);
    }
  });

  // Shaped on 2026 "X_086 Set-1 (31.1.1 to 31.1.3) in ENGLISH.pdf": a block
  // starts where the page number resets AND the page carries a code. Pages
  // 13/14 carry no code in their text, as on the real file.
  const pages: MergedMsPage[] = [
    { index: 0, codes: ["31/1/1"], firstLine: "PAGE 1 {31/1/1}" },
    { index: 1, codes: ["31/1/1"], firstLine: "PAGE 2 {31/1/1}" },
    { index: 2, codes: ["31/1/2"], firstLine: "PAGE 1 {31-1-2)" },
    { index: 3, codes: [], firstLine: "PAGE 2 {31-1-2)" },
    { index: 4, codes: ["31/1/3"], firstLine: "PAGE 1 {31-1-3}" },
    { index: 5, codes: [], firstLine: "PAGE 2 {31-1-3}" },
  ];

  it("takes the expected codes from the block-start pages", () => {
    expect(blockStartCodes(pages)).toEqual(["31/1/1", "31/1/2", "31/1/3"]);
  });

  it("splits into one block per set", () => {
    expect(splitMergedMs(pages, blockStartCodes(pages))).toEqual([
      { code: "31/1/1", from: 0, to: 1 },
      { code: "31/1/2", from: 2, to: 3 },
      { code: "31/1/3", from: 4, to: 5 },
    ]);
  });

  it("refuses a file where two block starts claim the same set", () => {
    const dup = pages.map((p) => (p.index === 4 ? { ...p, codes: ["31/1/2"] } : p));
    expect(() => blockStartCodes(dup)).toThrow(/twice/i);
  });
});

describe("files excluded by prefix: another subject, or a translation", () => {
  it.each([
    ["430-1-1_Mathematics Basic.pdf", /basic/i],
    ["1158-1_430-4-1 Mathematics (Basic).pdf", /basic/i],
    ["1167_430(B)_Mathematics (Basic).pdf", /basic/i],
    ["X_241_Mathematics Basic_MS_430_1_1.pdf", /basic/i],
    ["X_241_Mathematics Basic_MS_430 B.pdf", /basic/i],
    ["40-3-1 Maths Std Punjabi version.pdf", /punjabi/i],
    ["46-2-1 Mathematics Std. Urdu version.pdf", /urdu/i],
  ])("maths: %s", (name, reason) => {
    expect(excludedByPrefix(name, M10)).toMatch(reason);
  });

  it.each([
    ["41-3-1 Science Punjabi version.pdf", /punjabi/i],
    ["47-2-2 Science Urdu version.pdf 1.pdf", /urdu/i],
  ])("science: %s", (name, reason) => {
    expect(excludedByPrefix(name, S10)).toMatch(reason);
  });

  it("leaves the real papers alone", () => {
    expect(excludedByPrefix("30-1-1 Maths Standard.pdf", M10)).toBeNull();
    expect(excludedByPrefix("MS 041_30-1-1 Mathematics 2022-23.pdf", M10)).toBeNull();
    expect(excludedByPrefix("31_1_1_Science.pdf", S10)).toBeNull();
  });

  it("Class 12 subjects declare none", () => {
    expect(excludedByPrefix("65-1-1 Mathematcs.pdf", SUBJECTS.maths)).toBeNull();
  });
});

describe("a scheme whose running header CBSE broke is split by a declared override", () => {
  // 2026 "Revised MS X_086_31.4 ALL ENGLISH.pdf": every page of the 31/4/3
  // block is headed "PAGE 1 {31- 4- 3}", so the page-number signal fires on
  // all twelve. Each page still prints its own code, read 2026-10-14:
  // 31/4/1 on pages 0-11, 31/4/2 on 12-23, 31/4/3 on 24-35.
  const path = "C:/x/Science/2026/ms/086_SCIENCE/Revised MS X_086_31.4 ALL ENGLISH.pdf";

  it("returns the declared blocks for that file", () => {
    expect(msBlockOverride(path, S10)).toEqual([
      { code: "31/4/1", from: 0, to: 11 },
      { code: "31/4/2", from: 12, to: 23 },
      { code: "31/4/3", from: 24, to: 35 },
    ]);
  });

  it("applies to no other file, year or subject", () => {
    expect(msBlockOverride(path.replace("2026", "2025"), S10)).toBeNull();
    expect(msBlockOverride(path.replace("31.4", "31.5"), S10)).toBeNull();
    expect(msBlockOverride(path, M10)).toBeNull();
  });
});

describe("Hindi and VI schemes no filename rule catches", () => {
  it("treats every Hindi scheme as Hindi", () => {
    expect(isHindi("C:/x/Science/2022/ms/science/science hindi version 31_1 _1.pdf")).toBe(true);
    expect(isHindi("C:/x/Science/2023/ms/Science_English_Medium/Science_Hindi_Mediumm/Science set 1.pdf")).toBe(true);
    expect(isHindi("C:/x/Science/2026/ms/086_SCIENCE/X_086_31.1.1 to 31.1.3 in HINDI.pdf")).toBe(true);
  });

  it.each([
    ["C:/x/Science/2022/ms/science/X_086_31_3_B_5_MS (For VI) unsigned.pdf"],
    ["C:/x/Science/2024/ms/Science/Science_English)/science (Blind Engl.).pdf"],
    ["C:/x/Science/2026/ms/086_SCIENCE/X_086_31.B (Blind) in ENGLISH.pdf"],
  ])("drops the VI scheme %s by name", (path) => {
    expect(declaredExclusion(path, S10)).toMatch(/visually/i);
  });
});

describe("caseStudyFigureGaps: a case study's drawing goes on every part that points at it", () => {
  // 2026-10-14: 20 case-study parts across six papers carried no figure while
  // part (i) did, so a student reading part (ii) on its own met "as shown in
  // the figure" with nothing under it. audit-figures caught them only after
  // commit; this catches them at validate.
  //
  // Only when the SHARED PASSAGE points at the picture. Run over every paper
  // with the sibling rule alone it named 296 parts, mostly Class 12 case
  // studies where the drawing belongs to one part's own stem: the passage
  // never mentions it, so the other parts lose nothing without it.
  const shown = "A bucket is placed 5 m from the first potato, as shown in the figure :";
  const plain = "A student performs an experiment with three concave mirrors.";
  const part = (ref: string, setId: string | undefined, context: string, figure?: string) =>
    ({ ref, setId, context, _figure: figure });

  it("names the parts whose passage points at the figure part (i) carries", () => {
    const rows = [
      part("Q36i", "P-CS1", shown, "ILLUSTRATIVE - the bucket and the potatoes"),
      part("Q36ii", "P-CS1", shown),
      part("Q36iiia", "P-CS1", shown),
      part("Q37i", "P-CS2", shown, "REQUIRED - the kolam"),
      part("Q37ii", "P-CS2", shown, "REQUIRED - the same drawing as Q37 (i)"),
    ];
    expect(caseStudyFigureGaps(rows)).toEqual(["Q36ii", "Q36iiia"]);
  });

  it("leaves parts alone when the passage never mentions a picture", () => {
    // The figure belongs to part (i)'s own stem, not to the passage.
    const rows = [part("Q29i", "P-CS1", plain, "REQUIRED - a ray diagram"), part("Q29ii", "P-CS1", plain)];
    expect(caseStudyFigureGaps(rows)).toEqual([]);
  });

  it("leaves a set alone when its only figure is DECORATIVE", () => {
    // Every number is in the passage, so a missing picture loses nothing.
    const rows = [part("Q36i", "P-CS1", shown, "DECORATIVE - a golf ball"), part("Q36ii", "P-CS1", shown)];
    expect(caseStudyFigureGaps(rows)).toEqual([]);
  });

  it("leaves a set with no figure at all alone, and ignores questions outside a set", () => {
    const rows = [
      part("Q39a", "P-CS3", shown), part("Q39b", "P-CS3", shown),
      part("Q12", undefined, shown, "REQUIRED - a triangle"), part("Q13", undefined, shown),
    ];
    expect(caseStudyFigureGaps(rows)).toEqual([]);
  });
});
