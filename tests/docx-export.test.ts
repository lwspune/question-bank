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
