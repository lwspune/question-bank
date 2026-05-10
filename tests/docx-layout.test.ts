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

  it("ships a decimal numbering definition with hanging indent for questions", async () => {
    const buf = await buildQuestionPaper({ title: "T", questions: [SAMPLE] });
    const numbering = await readPart(buf, "word/numbering.xml");
    expect(numbering).toContain("decimal");
    expect(numbering).toMatch(/<w:ind\s+w:left="720"[^>]*w:hanging="480"/);
  });

  it("question paragraphs reference the numbered list", async () => {
    const buf = await buildQuestionPaper({ title: "T", questions: [SAMPLE] });
    const xml = await readPart(buf, "word/document.xml");
    expect(xml).toContain("<w:numPr>");
    expect(xml).toMatch(/<w:numId\s+w:val="\d+"\s*\/>/);
  });

  it("options are indented to align under question text (4 indented paragraphs per question)", async () => {
    const buf = await buildQuestionPaper({ title: "T", questions: [SAMPLE] });
    const xml = await readPart(buf, "word/document.xml");
    const matches = xml.match(/<w:ind\s+w:left="720"\s*\/>/g) ?? [];
    expect(matches.length).toBeGreaterThanOrEqual(4);
  });
});
