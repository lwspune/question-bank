import { describe, it, expect } from "vitest";
import {
  paperIssues,
  assemblePaper,
  sourceFileFor,
  pyqNoteFor,
  type IscPaper,
  type IscRow,
  type DerivedEntry,
} from "../scripts/cisce-pyq/lib";
import type { OfficialAnswer } from "../scripts/cisce-pyq/crosscheck";
import { cisceExam } from "../scripts/cisce-pyq/exams";

const ISC = cisceExam("isc-12");

/**
 * The ISC lane's pure core: the checks that run on a transcription before
 * anything is derived, and the assembly that turns transcription + derivation
 * (+ CISCE's key for 2025, + a human adjudication) into bank rows.
 */

const mcq = (over: Partial<IscRow> = {}): IscRow => ({
  ref: "1(i)",
  questionNumber: "1(i)",
  section: "A",
  marks: 1,
  format: "mcq",
  chapter: "Matrices",
  subtopic: "Multiplication of Matrices",
  text: "If \\(A^2 = O\\), then \\(A^{16}\\) is:",
  options: ["Unit matrix", "Null matrix", "Diagonal matrix", "Skew matrix"],
  ...over,
});

const subj = (over: Partial<IscRow> = {}): IscRow => ({
  ref: "5",
  questionNumber: "5",
  section: "A",
  marks: 2,
  format: "subjective",
  chapter: "Integrals",
  subtopic: "Integration by Parts",
  text: "Evaluate \\(\\int x e^x\\,dx\\).",
  ...over,
});

const paper = (rows: IscRow[], over: Partial<IscPaper> = {}): IscPaper => ({
  exam: "ISC Class 12",
  subject: "Mathematics",
  year: 2025,
  paperCode: "860",
  source: "test",
  rows,
  ...over,
});

const derived = (over: Partial<DerivedEntry> = {}): DerivedEntry => ({
  ref: "1(i)",
  label: "B",
  value: "Null matrix",
  working: "Squaring gives the zero matrix. So the answer is option (B).",
  difficulty: "Easy",
  confidence: "HIGH",
  ...over,
});

const key = (over: Partial<OfficialAnswer> = {}): OfficialAnswer => ({
  ref: "1(i)",
  labels: ["B"],
  value: "Null matrix",
  ...over,
});

describe("paperIssues", () => {
  it("accepts a clean paper", () => {
    expect(paperIssues(paper([mcq(), subj()]))).toEqual([]);
  });

  it("rejects a chapter outside the ISC taxonomy for that subject", () => {
    const issues = paperIssues(paper([mcq({ chapter: "Vector Algebra" })]));
    expect(issues.join("\n")).toMatch(/1\(i\).*chapter/);
  });

  it("rejects a subtopic that belongs to a different chapter", () => {
    const issues = paperIssues(paper([mcq({ subtopic: "Integration by Parts" })]));
    expect(issues.join("\n")).toMatch(/1\(i\).*subtopic/);
  });

  it("rejects a duplicate ref", () => {
    expect(paperIssues(paper([mcq(), mcq()])).join("\n")).toMatch(/duplicate/);
  });

  it("requires exactly four options on an MCQ and none on a subjective row", () => {
    expect(paperIssues(paper([mcq({ options: ["a", "b", "c"] })])).join("\n")).toMatch(/4 options/);
    expect(paperIssues(paper([subj({ options: ["a", "b", "c", "d"] })])).join("\n")).toMatch(/options/);
  });

  it("rejects an answer-shaped field, which would break the blind dump", () => {
    const row = { ...mcq(), answer: "B" } as IscRow;
    expect(paperIssues(paper([row])).join("\n")).toMatch(/answer-shaped/);
  });

  it("rejects unbalanced math delimiters and a literal backslash-n", () => {
    expect(paperIssues(paper([subj({ text: "Find \\(x + 1." })])).join("\n")).toMatch(/delimiter/);
    expect(paperIssues(paper([subj({ text: "Line one\\nline two" })])).join("\n")).toMatch(/literal/);
  });

  it("rejects a control character, which is what a shell-eaten backslash leaves", () => {
    // "\times" through a heredoc arrives as TAB + "imes"; "\r" as a carriage return.
    expect(paperIssues(paper([subj({ text: "\\(3 \times 10\\)" })])).join("\n")).toMatch(/control character/);
    expect(paperIssues(paper([subj({ instruction: "a \\(\theta\\)" })])).join("\n")).toMatch(/instruction.*control character/);
  });

  it("rejects an OR choice group with a single member", () => {
    const issues = paperIssues(paper([subj({ ref: "16(i)", questionNumber: "16(i)", choice: "16" })]));
    expect(issues.join("\n")).toMatch(/choice "16"/);
  });
});

describe("assemblePaper: 2025 (keyed)", () => {
  it("keys an MCQ from CISCE's key and takes the derived working as the solution", () => {
    const { rows, issues } = assemblePaper({
      paper: paper([mcq()]),
      derived: [derived()],
      key: [key()],
    });
    expect(issues).toEqual([]);
    expect(rows[0].answer).toBe("B");
    expect(rows[0].options?.map((o) => o.isCorrect)).toEqual([false, true, false, false]);
    expect(rows[0].solution).toMatch(/option \(B\)/);
    expect(rows[0].difficulty).toBe("Easy");
  });

  it("blocks an unadjudicated disagreement between derivation and key", () => {
    const { issues } = assemblePaper({
      paper: paper([mcq()]),
      derived: [derived({ label: "C" })],
      key: [key()],
    });
    expect(issues.join("\n")).toMatch(/1\(i\).*disagree/);
  });

  it("an adjudication settles a disagreement and can replace the solution", () => {
    const { rows, issues } = assemblePaper({
      paper: paper([mcq()]),
      derived: [derived({ label: "C" })],
      key: [key()],
      adjudications: [{ ref: "1(i)", answer: "B", solution: "Rewritten. So the answer is option (B)." }],
    });
    expect(issues).toEqual([]);
    expect(rows[0].answer).toBe("B");
    expect(rows[0].solution).toBe("Rewritten. So the answer is option (B).");
  });

  it("a grace row agrees with any accepted letter and keys the first one", () => {
    const { rows, issues } = assemblePaper({
      paper: paper([mcq()]),
      derived: [derived({ label: "A" })],
      key: [key({ labels: ["B", "A"], grace: true })],
    });
    expect(issues).toEqual([]);
    expect(rows[0].answer).toBe("B");
  });

  it("free-response rows need a human reading before they ship", () => {
    const { issues } = assemblePaper({
      paper: paper([subj()]),
      derived: [derived({ ref: "5", label: undefined, value: "x e^x - e^x + C" })],
      key: [key({ ref: "5", labels: [], value: "e^x(x - 1) + C" })],
    });
    expect(issues.join("\n")).toMatch(/5.*adjudicat/);
    const ok = assemblePaper({
      paper: paper([subj()]),
      derived: [derived({ ref: "5", label: undefined, value: "x e^x - e^x + C" })],
      key: [key({ ref: "5", labels: [], value: "e^x(x - 1) + C" })],
      adjudications: [{ ref: "5", agree: true }],
    });
    expect(ok.issues).toEqual([]);
    expect(ok.rows[0].format).toBe("subjective");
    expect(ok.rows[0].options).toBeUndefined();
  });

  it("refuses a row with no derivation or no key entry", () => {
    expect(assemblePaper({ paper: paper([mcq()]), derived: [], key: [key()] }).issues.join("\n")).toMatch(/no derivation/);
    expect(assemblePaper({ paper: paper([mcq()]), derived: [derived()], key: [] }).issues.join("\n")).toMatch(/no key/);
  });

  it("a held row is left out, not shipped", () => {
    const { rows, issues } = assemblePaper({
      paper: paper([mcq(), subj()]),
      derived: [derived(), derived({ ref: "5", label: undefined })],
      key: [key(), key({ ref: "5", labels: [] })],
      adjudications: [{ ref: "5", hold: "figure unreadable" }],
    });
    expect(issues).toEqual([]);
    expect(rows.map((r) => r.ref)).toEqual(["1(i)"]);
  });
});

describe("assemblePaper: 2026 (unkeyed)", () => {
  const p26 = (rows: IscRow[]) => paper(rows, { year: 2026 });

  it("keys an MCQ from the derivation when no key exists", () => {
    const { rows, issues } = assemblePaper({ paper: p26([mcq()]), derived: [derived({ label: "D" })] });
    expect(issues).toEqual([]);
    expect(rows[0].answer).toBe("D");
  });

  it("blocks a disagreement between two independent derivations until adjudicated", () => {
    const blocked = assemblePaper({
      paper: p26([mcq()]),
      derived: [derived({ label: "B" })],
      second: [derived({ label: "C" })],
    });
    expect(blocked.issues.join("\n")).toMatch(/1\(i\).*second/);
    const settled = assemblePaper({
      paper: p26([mcq()]),
      derived: [derived({ label: "B" })],
      second: [derived({ label: "C" })],
      adjudications: [{ ref: "1(i)", answer: "B" }],
    });
    expect(settled.issues).toEqual([]);
    expect(settled.rows[0].answer).toBe("B");
  });

  it("refuses a derivation whose letter names no option", () => {
    const { issues } = assemblePaper({ paper: p26([mcq()]), derived: [derived({ label: "E" })] });
    expect(issues.join("\n")).toMatch(/names no option/);
  });

  it("refuses a missing or invalid difficulty", () => {
    const { issues } = assemblePaper({ paper: p26([mcq()]), derived: [derived({ difficulty: "Tough" })] });
    expect(issues.join("\n")).toMatch(/difficulty/);
  });
});

describe("provenance", () => {
  it("names one source file per paper", () => {
    expect(sourceFileFor(ISC, 2025, "Physics")).toBe("isc-12-pyq-2025-physics");
  });

  it("says plainly whether CISCE's key checked the answers", () => {
    expect(pyqNoteFor(ISC, 2025, "Mathematics", "860")).toMatch(/cross-checked against CISCE/);
    expect(pyqNoteFor(ISC, 2026, "Mathematics", "860")).toMatch(/not yet published/);
    // Long by design: publicPyqNote publishes only notes under 48 characters,
    // so this provenance blurb never prints as a sitting label.
    expect(pyqNoteFor(ISC, 2026, "Chemistry", "862A").length).toBeGreaterThan(48);
  });
});
