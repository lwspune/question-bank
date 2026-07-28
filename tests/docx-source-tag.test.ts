/**
 * Source-attribution tag in the exported Question Paper.
 *
 * `includeSourceTag` prints `[JEE Mains 2016]` at the end of a question's stem
 * (before the options), so a teacher's printed paper cites each PYQ's sitting.
 *
 * The contract these tests pin:
 *  - OFF by default — every pre-existing export stays byte-identical.
 *  - Never on a practice question (null pyqYear), even with the flag on.
 *  - Never in the Answer Key.
 *  - Survives a stem that ends in a GFM pipe-table (own paragraph, not swallowed).
 */
import { describe, it, expect } from "vitest";
import JSZip from "jszip";
import { buildQuestionPaper, buildAnswerKey } from "@/lib/export/docxBuilder";
import type { QuestionRow } from "@/lib/questions/query";

const BASE: QuestionRow = {
  id: "q1",
  text: "If the sum of the roots of \\(x^2 - kx + 6 = 0\\) is 5, then \\(k\\) =",
  context: null,
  difficulty: "EASY",
  solution: "Sum of roots is \\(k\\), so \\(k = 5\\).",
  imageUrl: null,
  setId: null,
  exam: { id: "e", name: "JEE Mains" },
  subject: { id: "s", name: "Maths" },
  chapter: { id: "c", name: "Quadratic Equations" },
  subtopic: null,
  questionNumber: "12",
  pyqYear: 2016,
  pyqMonth: null,
  pyqNote: "8 Apr 2023",
  options: [
    { label: "A", text: "1", isCorrect: false, imageUrl: null },
    { label: "B", text: "5", isCorrect: true, imageUrl: null },
    { label: "C", text: "6", isCorrect: false, imageUrl: null },
    { label: "D", text: "11", isCorrect: false, imageUrl: null },
  ],
};

// A practice question: no PYQ year, so it must never be attributed.
const PRACTICE: QuestionRow = {
  ...BASE,
  id: "q2",
  text: "Practice: solve \\(x + 1 = 3\\).",
  pyqYear: null,
  pyqNote: null,
};

// Stem whose LAST block is a GFM pipe-table — the tag cannot ride on a table
// cell, so it must get its own paragraph rather than vanish.
const TABLE_TAIL: QuestionRow = {
  ...BASE,
  id: "q3",
  text: "Match the columns:\n\n| List I | List II |\n|---|---|\n| A | 1 |\n| B | 2 |",
};

async function docXml(buf: Buffer): Promise<string> {
  const zip = await JSZip.loadAsync(buf);
  return zip.file("word/document.xml")!.async("text");
}

describe("question paper source tag", () => {
  it("prints [exam year] after the stem when includeSourceTag is on", async () => {
    const xml = await docXml(
      await buildQuestionPaper({
        title: "T",
        questions: [BASE],
        includeSourceTag: true,
      })
    );
    expect(xml).toContain("[JEE Mains 2016]");
  });

  it("prints the tag BEFORE the options, not after them", async () => {
    const xml = await docXml(
      await buildQuestionPaper({
        title: "T",
        questions: [BASE],
        includeSourceTag: true,
      })
    );
    expect(xml.indexOf("[JEE Mains 2016]")).toBeLessThan(xml.indexOf("(a)"));
  });

  it("omits the tag by default (existing exports unchanged)", async () => {
    const xml = await docXml(
      await buildQuestionPaper({ title: "T", questions: [BASE] })
    );
    expect(xml).not.toContain("[JEE Mains 2016]");
    expect(xml).not.toContain("JEE Mains");
  });

  it("omits the tag when explicitly off", async () => {
    const xml = await docXml(
      await buildQuestionPaper({
        title: "T",
        questions: [BASE],
        includeSourceTag: false,
      })
    );
    expect(xml).not.toContain("JEE Mains");
  });

  it("never tags a practice question, even with the flag on", async () => {
    const xml = await docXml(
      await buildQuestionPaper({
        title: "T",
        questions: [PRACTICE],
        includeSourceTag: true,
      })
    );
    expect(xml).not.toContain("JEE Mains");
    // ...while its PYQ neighbour in the same paper still gets one.
    const mixed = await docXml(
      await buildQuestionPaper({
        title: "T",
        questions: [PRACTICE, BASE],
        includeSourceTag: true,
      })
    );
    expect(mixed).toContain("[JEE Mains 2016]");
    expect(mixed.match(/\[JEE Mains 2016\]/g)).toHaveLength(1);
  });

  it("still prints the tag when the stem ends in a table", async () => {
    const xml = await docXml(
      await buildQuestionPaper({
        title: "T",
        questions: [TABLE_TAIL],
        includeSourceTag: true,
      })
    );
    expect(xml).toContain("<w:tbl>");
    expect(xml).toContain("[JEE Mains 2016]");
    expect(xml.indexOf("[JEE Mains 2016]")).toBeLessThan(xml.indexOf("(a)"));
  });

  it("never appears in the Answer Key", async () => {
    const xml = await docXml(
      await buildAnswerKey({
        title: "T",
        questions: [BASE],
        includeSolutions: true,
      })
    );
    expect(xml).not.toContain("JEE Mains");
  });
});
