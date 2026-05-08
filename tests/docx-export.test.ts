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
  exam: { id: "e", name: "MHT-CET" },
  subject: { id: "s", name: "Maths" },
  chapter: { id: "c", name: "Fractions" },
  subtopic: null,
  options: [
    { label: "A", text: "1", isCorrect: true },
    { label: "B", text: "2", isCorrect: false },
    { label: "C", text: "0", isCorrect: false },
    { label: "D", text: "0.5", isCorrect: false },
  ],
};

const Q2: QuestionRow = {
  id: "q2",
  text: "Simplify \\(\\sqrt{16}\\).",
  context: null,
  difficulty: "EASY",
  solution: null,
  exam: { id: "e", name: "MHT-CET" },
  subject: { id: "s", name: "Maths" },
  chapter: { id: "c", name: "Roots" },
  subtopic: null,
  options: [
    { label: "A", text: "2", isCorrect: false },
    { label: "B", text: "4", isCorrect: true },
    { label: "C", text: "8", isCorrect: false },
    { label: "D", text: "16", isCorrect: false },
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

  it("renders all 4 option labels", async () => {
    const buf = await buildQuestionPaper({ title: "T", questions: [Q1] });
    const xml = await readDocXml(buf);
    for (const label of ["(A)", "(B)", "(C)", "(D)"]) {
      expect(xml).toContain(label);
    }
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

  it("includes both answer letters in a compact list", async () => {
    const buf = await buildAnswerKey({
      title: "T",
      questions: [Q1, Q2],
      includeSolutions: false,
    });
    const xml = await readDocXml(buf);
    // Answer letters appear as "(A)" / "(B)" labels for compact display.
    expect(xml).toContain("(A)");
    expect(xml).toContain("(B)");
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
