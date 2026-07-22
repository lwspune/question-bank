import { describe, it, expect } from "vitest";
import JSZip from "jszip";
import {
  buildQuestionPaper,
  buildAnswerKey,
} from "@/lib/export/docxBuilder";
import type { QuestionRow } from "@/lib/questions/query";

const Q1: QuestionRow = {
  id: "q1",
  text: "What is \\(\\frac{1}{2}\\) + \\(\\frac{1}{2}\\)?",
  context: null,
  difficulty: "EASY",
  solution: "Add the fractions: \\(\\frac{1}{2} + \\frac{1}{2} = 1\\).",
  imageUrl: null,
  setId: null,
  exam: { id: "e", name: "MHT-CET" },
  subject: { id: "s", name: "Maths" },
  chapter: { id: "c", name: "Fractions" },
  subtopic: null,
  questionNumber: null,
  pyqYear: null,
  pyqMonth: null,
  pyqNote: null,
  options: [
    { label: "A", text: "1", isCorrect: true, imageUrl: null },
    { label: "B", text: "2", isCorrect: false, imageUrl: null },
    { label: "C", text: "0", isCorrect: false, imageUrl: null },
    { label: "D", text: "0.5", isCorrect: false, imageUrl: null },
  ],
};

const Q2: QuestionRow = {
  id: "q2",
  text: "Simplify \\(\\sqrt{16}\\).",
  context: null,
  difficulty: "EASY",
  solution: null,
  imageUrl: null,
  setId: null,
  exam: { id: "e", name: "MHT-CET" },
  subject: { id: "s", name: "Maths" },
  chapter: { id: "c", name: "Roots" },
  subtopic: null,
  questionNumber: null,
  pyqYear: null,
  pyqMonth: null,
  pyqNote: null,
  options: [
    { label: "A", text: "2", isCorrect: false, imageUrl: null },
    { label: "B", text: "4", isCorrect: true, imageUrl: null },
    { label: "C", text: "8", isCorrect: false, imageUrl: null },
    { label: "D", text: "16", isCorrect: false, imageUrl: null },
  ],
};

async function readDocXml(buf: Buffer): Promise<string> {
  const zip = await JSZip.loadAsync(buf);
  return zip.file("word/document.xml")!.async("text");
}

describe("buildQuestionPaper", () => {
  it("produces a valid .docx zip", async () => {
    const buf = await buildQuestionPaper({ title: "T", questions: [Q1] });
    expect(buf.length).toBeGreaterThan(1000);
    expect(buf.subarray(0, 4).toString("hex")).toBe("504b0304");
  });

  it("embeds OMML for math (regression: no <undefined> wrapper)", async () => {
    const buf = await buildQuestionPaper({ title: "T", questions: [Q1] });
    const xml = await readDocXml(buf);
    expect(xml).toContain("m:oMath");
    expect(xml).not.toContain("<undefined>");
    expect(xml).not.toContain("</undefined>");
  });

  it("renders all 4 option labels in lowercase", async () => {
    const buf = await buildQuestionPaper({ title: "T", questions: [Q1] });
    const xml = await readDocXml(buf);
    for (const label of ["(a)", "(b)", "(c)", "(d)"]) {
      expect(xml).toContain(label);
    }
    // Uppercase labels are no longer emitted in the rendered paper.
    expect(xml).not.toContain("(A)");
    expect(xml).not.toContain("(B)");
  });

  it("includes the document title", async () => {
    const buf = await buildQuestionPaper({
      title: "Optics Practice",
      questions: [Q1, Q2],
    });
    const xml = await readDocXml(buf);
    expect(xml).toContain("Optics Practice");
  });

  it("does NOT include answer or solution text", async () => {
    const buf = await buildQuestionPaper({ title: "T", questions: [Q1] });
    const xml = await readDocXml(buf);
    expect(xml).not.toContain("Answer:");
    expect(xml).not.toContain("Solution:");
  });
});

describe("buildAnswerKey", () => {
  it("produces a valid .docx zip", async () => {
    const buf = await buildAnswerKey({
      title: "T",
      questions: [Q1, Q2],
      includeSolutions: false,
    });
    expect(buf.subarray(0, 4).toString("hex")).toBe("504b0304");
  });

  it("includes both answer letters in a compact list (lowercase, matching the paper)", async () => {
    const buf = await buildAnswerKey({
      title: "T",
      questions: [Q1, Q2],
      includeSolutions: false,
    });
    const xml = await readDocXml(buf);
    // Answer letters appear as "(a)" / "(b)" labels — matches the paper's lowercase options.
    expect(xml).toContain("(a)");
    expect(xml).toContain("(b)");
    expect(xml).not.toContain("(A)");
    expect(xml).not.toContain("(B)");
  });

  it("includes 'Answer Key' as a heading", async () => {
    const buf = await buildAnswerKey({
      title: "T",
      questions: [Q1],
      includeSolutions: false,
    });
    const xml = await readDocXml(buf);
    expect(xml.toLowerCase()).toContain("answer key");
  });

  it("does not include the question text or option text", async () => {
    const buf = await buildAnswerKey({
      title: "T",
      questions: [Q1],
      includeSolutions: false,
    });
    const xml = await readDocXml(buf);
    // Q1's question text contains "What is" — should not be in the answer key
    expect(xml).not.toContain("What is");
  });

  it("includes 'Solution:' text when includeSolutions=true", async () => {
    const buf = await buildAnswerKey({
      title: "T",
      questions: [Q1],
      includeSolutions: true,
    });
    const xml = await readDocXml(buf);
    expect(xml).toContain("Solution:");
  });

  it("omits 'Solution:' text when includeSolutions=false", async () => {
    const buf = await buildAnswerKey({
      title: "T",
      questions: [Q1],
      includeSolutions: false,
    });
    const xml = await readDocXml(buf);
    expect(xml).not.toContain("Solution:");
  });

  it("does not include 'Solution:' for questions with null solution even when includeSolutions=true", async () => {
    const buf = await buildAnswerKey({
      title: "T",
      questions: [Q2],
      includeSolutions: true,
    });
    const xml = await readDocXml(buf);
    expect(xml).not.toContain("Solution:");
  });
});

const SUBJ: QuestionRow = {
  id: "sq1",
  text: "Write the negation of \\(p \\wedge q\\).",
  context: null,
  difficulty: "MODERATE",
  solution: "The negation is \\(\\sim p \\vee \\sim q\\).",
  imageUrl: null,
  setId: null,
  questionFormat: "subjective",
  exam: { id: "e", name: "Maharashtra HSC Class 12" },
  subject: { id: "s", name: "Mathematics" },
  chapter: { id: "c", name: "Mathematical Logic" },
  subtopic: null,
  questionNumber: null,
  pyqYear: null,
  pyqMonth: null,
  pyqNote: null,
  options: [],
};

describe("subjective questions (question_format = 'subjective')", () => {
  it("paper: renders the stem with no option labels", async () => {
    const buf = await buildQuestionPaper({ title: "T", questions: [SUBJ] });
    const xml = await readDocXml(buf);
    expect(xml).toContain("m:oMath"); // stem math rendered
    for (const label of ["(a)", "(b)", "(c)", "(d)"]) {
      expect(xml).not.toContain(label);
    }
  });

  it("answer key: prints the model answer, never a '(?)' letter", async () => {
    const buf = await buildAnswerKey({
      title: "T",
      questions: [SUBJ],
      includeSolutions: false,
    });
    const xml = await readDocXml(buf);
    expect(xml).toContain("Model answer:");
    expect(xml).not.toContain("(?)");
  });

  it("answer key: shows a pending note when the model answer is absent", async () => {
    const buf = await buildAnswerKey({
      title: "T",
      questions: [{ ...SUBJ, solution: null }],
      includeSolutions: false,
    });
    const xml = await readDocXml(buf);
    expect(xml).toContain("model answer pending");
    expect(xml).not.toContain("(?)");
  });
});

const NAT: QuestionRow = {
  id: "nq1",
  text: "The value of \\(k\\) is",
  context: null,
  difficulty: "MODERATE",
  solution: "Solving gives \\(k = 7744\\).",
  imageUrl: null,
  setId: null,
  questionFormat: "numeric",
  numericAnswer: 7744,
  exam: { id: "e", name: "JEE Mains" },
  subject: { id: "s", name: "Maths" },
  chapter: { id: "c", name: "Sequences and Series" },
  subtopic: null,
  questionNumber: "81",
  pyqYear: 2021,
  pyqMonth: null,
  pyqNote: "Paper 19",
  options: [],
};

describe("numeric (NAT) questions (question_format = 'numeric')", () => {
  it("paper: renders the stem with no option labels", async () => {
    const buf = await buildQuestionPaper({ title: "T", questions: [NAT] });
    const xml = await readDocXml(buf);
    expect(xml).toContain("m:oMath");
    for (const label of ["(a)", "(b)", "(c)", "(d)"]) {
      expect(xml).not.toContain(label);
    }
  });

  it("answer key: prints the exact numeric answer, never a '(?)' letter", async () => {
    const buf = await buildAnswerKey({
      title: "T",
      questions: [NAT],
      includeSolutions: false,
    });
    const xml = await readDocXml(buf);
    expect(xml).toContain("Answer:");
    expect(xml).toContain("7744");
    expect(xml).not.toContain("(?)");
  });
});

describe("groupBySubtopic — section headings", () => {
  const withSub = (
    id: string,
    text: string,
    sub: { id: string; name: string } | null
  ): QuestionRow => ({
    ...Q1,
    id,
    text,
    setId: null,
    subtopic: sub,
  });

  const MATOPS = { id: "st1", name: "Matrix Operations" };
  const SPECIAL = { id: "st2", name: "Special Matrices" };
  const ordered = [
    withSub("a", "Stem one.", MATOPS),
    withSub("b", "Stem two.", MATOPS),
    withSub("c", "Stem three.", SPECIAL),
  ];

  it("paper: prints each subtopic heading once, in order, only when enabled", async () => {
    const buf = await buildQuestionPaper({
      title: "T",
      questions: ordered,
      groupBySubtopic: true,
    });
    const xml = await readDocXml(buf);
    expect(xml).toContain("Matrix Operations");
    expect(xml).toContain("Special Matrices");
    // single heading per contiguous run
    expect(xml.match(/Matrix Operations/g)?.length).toBe(1);
    // teaching order preserved
    expect(xml.indexOf("Matrix Operations")).toBeLessThan(
      xml.indexOf("Special Matrices")
    );
  });

  it("paper: no headings when the flag is off", async () => {
    const buf = await buildQuestionPaper({ title: "T", questions: ordered });
    const xml = await readDocXml(buf);
    expect(xml).not.toContain("Matrix Operations");
    expect(xml).not.toContain("Special Matrices");
  });

  it("answer key: prints subtopic headings when enabled", async () => {
    const buf = await buildAnswerKey({
      title: "T",
      questions: ordered,
      includeSolutions: false,
      groupBySubtopic: true,
    });
    const xml = await readDocXml(buf);
    expect(xml).toContain("Matrix Operations");
    expect(xml).toContain("Special Matrices");
    expect(xml.indexOf("Matrix Operations")).toBeLessThan(
      xml.indexOf("Special Matrices")
    );
  });

  it('falls back to "Other" for a null subtopic', async () => {
    const buf = await buildQuestionPaper({
      title: "T",
      questions: [withSub("z", "Untagged stem.", null)],
      groupBySubtopic: true,
    });
    const xml = await readDocXml(buf);
    expect(xml).toContain("Other");
  });
});
