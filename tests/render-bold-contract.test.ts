/**
 * Markdown `**bold**` in a long-form field must render as BOLD on every
 * surface — never as literal `**` markers — including when the bold span
 * contains a math zone.
 *
 * Why this test exists: bold was resolved AFTER the text was split on math
 * zones, so a span like `**Null (zero) matrix \(O\):**` had its opening and
 * closing markers land in different fragments; neither paired, and both
 * printed raw (191 spans across 97 /notes files, 76 PUBLIC question rows).
 * Separately the docx exporter never parsed `**` at all, so bold printed
 * literally in every downloaded paper (358 PUBLIC rows).
 *
 * This is the render CONTRACT test, the sibling of docx-solution-table:
 * every long-form field (text, context, solution) must handle prose + math +
 * bold on every surface. Fixing one renderer and not the other is the
 * failure mode — it has happened twice.
 */
import { describe, it, expect } from "vitest";
import JSZip from "jszip";
import { buildAnswerKey, buildQuestionPaper } from "@/lib/export/docxBuilder";
import { textWithMathToOmmlSegments } from "@/lib/export/ommlBuilder";
import type { QuestionRow } from "@/lib/questions/query";

const BOLD_SPANNING_MATH = "A matrix of **order \\(m \\times n\\)** has m rows.";
const BOLD_PLAIN = "The **null matrix** has every entry 0.";

const base = {
  context: null,
  difficulty: "EASY" as const,
  imageUrl: null,
  solutionImageUrl: null,
  setId: null,
  exam: { id: "e", name: "NDA" },
  subject: { id: "s", name: "Mathematics" },
  chapter: { id: "c", name: "Matrices & Determinants" },
  subtopic: null,
  questionNumber: null,
  pyqYear: null,
  pyqMonth: null,
  pyqNote: null,
};

const Q: QuestionRow = {
  ...base,
  id: "q-bold",
  text: BOLD_SPANNING_MATH,
  solution: BOLD_PLAIN,
  options: [
    { label: "A" as const, text: "**mn** entries", isCorrect: true, imageUrl: null },
    { label: "B" as const, text: "m entries", isCorrect: false, imageUrl: null },
    { label: "C" as const, text: "n entries", isCorrect: false, imageUrl: null },
    { label: "D" as const, text: "1 entry", isCorrect: false, imageUrl: null },
  ],
};

async function documentXml(buf: Buffer): Promise<string> {
  const zip = await JSZip.loadAsync(buf);
  return zip.file("word/document.xml")!.async("text");
}

describe("ommlBuilder — bold segments", () => {
  it("flags a plain bold span and strips its markers", () => {
    expect(textWithMathToOmmlSegments(BOLD_PLAIN)).toEqual([
      { type: "text", content: "The " },
      { type: "text", content: "null matrix", bold: true },
      { type: "text", content: " has every entry 0." },
    ]);
  });

  it("carries bold across a math zone inside the span", () => {
    const segs = textWithMathToOmmlSegments(BOLD_SPANNING_MATH);
    expect(segs[0]).toEqual({ type: "text", content: "A matrix of " });
    expect(segs[1]).toEqual({ type: "text", content: "order ", bold: true });
    expect(segs[2].type).toBe("math");
    expect(segs[3]).toEqual({ type: "text", content: " has m rows." });
  });

  it("leaves text with no bold markers untouched", () => {
    expect(textWithMathToOmmlSegments("plain prose")).toEqual([
      { type: "text", content: "plain prose" },
    ]);
  });
});

describe("docx export — bold never leaks as literal **", () => {
  it("bolds a stem span in the question paper", async () => {
    const xml = await documentXml(await buildQuestionPaper({ title: "T", questions: [Q] }));
    expect(xml).not.toContain("**");
    expect(xml).toContain("order ");
    expect(xml).toContain("A matrix of ");
  });

  it("bolds option text in the question paper", async () => {
    const xml = await documentXml(await buildQuestionPaper({ title: "T", questions: [Q] }));
    expect(xml).not.toContain("**");
    expect(xml).toContain("mn");
  });

  it("bolds a solution span in the answer key", async () => {
    const xml = await documentXml(
      await buildAnswerKey({ title: "T", questions: [Q], includeSolutions: true })
    );
    expect(xml).not.toContain("**");
    expect(xml).toContain("null matrix");
  });
});
