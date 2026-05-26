/**
 * Verifies the locked layout for both Question Paper and Answer Key:
 * 0.5" margins all sides, 0 header/footer, 2 columns, Cambria 10pt body,
 * decimal numbered list with hanging indent so options align under the
 * question text.
 */
import { describe, it, expect } from "vitest";
import JSZip from "jszip";
import { buildQuestionPaper } from "@/lib/export/docxBuilder";
import type { QuestionRow } from "@/lib/questions/query";

const SAMPLE: QuestionRow = {
  id: "q1",
  text: "What is x?",
  context: null,
  difficulty: "EASY",
  solution: null,
  imageUrl: null,
  setId: null,
  exam: { id: "e", name: "MHT-CET" },
  subject: { id: "s", name: "Maths" },
  chapter: { id: "c", name: "Algebra" },
  subtopic: null,
  options: [
    { label: "A", text: "1", isCorrect: true, imageUrl: null },
    { label: "B", text: "2", isCorrect: false, imageUrl: null },
    { label: "C", text: "3", isCorrect: false, imageUrl: null },
    { label: "D", text: "4", isCorrect: false, imageUrl: null },
  ],
};

async function readPart(buf: Buffer, path: string): Promise<string> {
  const zip = await JSZip.loadAsync(buf);
  const file = zip.file(path);
  if (!file) throw new Error(`missing ${path}`);
  return file.async("text");
}

describe("docx layout defaults", () => {
  it("uses 0.5\" margins (720 twips) on all sides", async () => {
    const buf = await buildQuestionPaper({ title: "T", questions: [SAMPLE] });
    const xml = await readPart(buf, "word/document.xml");
    expect(xml).toMatch(/<w:pgMar[^>]*\bw:top="720"/);
    expect(xml).toMatch(/<w:pgMar[^>]*\bw:right="720"/);
    expect(xml).toMatch(/<w:pgMar[^>]*\bw:bottom="720"/);
    expect(xml).toMatch(/<w:pgMar[^>]*\bw:left="720"/);
  });

  it("uses 0 header / 0 footer offset", async () => {
    const buf = await buildQuestionPaper({ title: "T", questions: [SAMPLE] });
    const xml = await readPart(buf, "word/document.xml");
    expect(xml).toMatch(/<w:pgMar[^>]*\bw:header="0"/);
    expect(xml).toMatch(/<w:pgMar[^>]*\bw:footer="0"/);
  });

  it("uses 2 columns", async () => {
    const buf = await buildQuestionPaper({ title: "T", questions: [SAMPLE] });
    const xml = await readPart(buf, "word/document.xml");
    expect(xml).toMatch(/<w:cols[^>]*\bw:num="2"/);
  });

  it("declares Cambria 10pt as the default body font", async () => {
    const buf = await buildQuestionPaper({ title: "T", questions: [SAMPLE] });
    const styles = await readPart(buf, "word/styles.xml");
    // Document run defaults inside <w:rPrDefault><w:rPr>...</w:rPr></w:rPrDefault>
    expect(styles).toMatch(/<w:rPrDefault>[\s\S]*?Cambria[\s\S]*?<\/w:rPrDefault>/);
    // 10pt = 20 half-points
    expect(styles).toMatch(/<w:rPrDefault>[\s\S]*?<w:sz w:val="20"[\s\S]*?<\/w:rPrDefault>/);
  });

  it("ships a flush-left decimal numbering definition with space suffix", async () => {
    const buf = await buildQuestionPaper({ title: "T", questions: [SAMPLE] });
    const numbering = await readPart(buf, "word/numbering.xml");
    expect(numbering).toContain("decimal");
    // Wrap lines come back to column 0 so they align with the number + options.
    expect(numbering).toMatch(/<w:ind\s+w:left="0"[^>]*w:hanging="0"/);
    // Single space between number and body (default 'tab' would push body to next tab stop).
    expect(numbering).toMatch(/<w:suff\s+w:val="space"\s*\/>/);
  });

  it("question paragraphs reference the numbered list", async () => {
    const buf = await buildQuestionPaper({ title: "T", questions: [SAMPLE] });
    const xml = await readPart(buf, "word/document.xml");
    expect(xml).toContain("<w:numPr>");
    expect(xml).toMatch(/<w:numId\s+w:val="\d+"\s*\/>/);
  });

  it("options sit flush at the left margin (no 720-twip indent on option/context paragraphs)", async () => {
    const buf = await buildQuestionPaper({ title: "T", questions: [SAMPLE] });
    const xml = await readPart(buf, "word/document.xml");
    // Previously options + context carried <w:ind w:left="720"/>; with the
    // flush-left layout there should be no such paragraph-level indent.
    expect(xml).not.toMatch(/<w:ind\s+w:left="720"\s*\/>/);
  });

  // Without this, Word falls back to its built-in math defaults
  // (defJc="centerGroup", wrapIndent="1440", non-zero margins). Paragraphs
  // that contain a 2-D math element (e.g. <m:f> for a fraction) then render
  // shifted right by ~1" — so option "(A) -3/4" lands further indented than
  // a plain-text option on the next question. Force the math-zone defaults
  // to left-aligned with zero margins so all options align under the
  // question text regardless of math content.
  it("pins math-zone defaults so fraction options don't get extra indent", async () => {
    const buf = await buildQuestionPaper({ title: "T", questions: [SAMPLE] });
    const settings = await readPart(buf, "word/settings.xml");
    expect(settings).toMatch(/<m:mathPr\b/);
    expect(settings).toMatch(/<m:defJc\s+m:val="left"\s*\/>/);
    expect(settings).toMatch(/<m:wrapIndent\s+m:val="0"\s*\/>/);
    expect(settings).toMatch(/<m:lMargin\s+m:val="0"\s*\/>/);
    expect(settings).toMatch(/<m:rMargin\s+m:val="0"\s*\/>/);
  });

  it("answer key applies the same math-zone defaults (solutions can contain fractions)", async () => {
    const { buildAnswerKey } = await import("@/lib/export/docxBuilder");
    const buf = await buildAnswerKey({
      title: "T",
      questions: [SAMPLE],
      includeSolutions: true,
    });
    const settings = await readPart(buf, "word/settings.xml");
    expect(settings).toMatch(/<m:mathPr\b/);
    expect(settings).toMatch(/<m:defJc\s+m:val="left"\s*\/>/);
  });
});
