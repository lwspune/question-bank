/**
 * GFM pipe-tables in a question stem export as a native Word table (<w:tbl>),
 * with the surrounding prose kept as paragraphs. Table-free questions must NOT
 * emit a table (no regression).
 */
import { describe, it, expect } from "vitest";
import JSZip from "jszip";
import { buildQuestionPaper } from "@/lib/export/docxBuilder";
import type { QuestionRow } from "@/lib/questions/query";

const base = {
  context: null,
  difficulty: "EASY" as const,
  solution: null,
  imageUrl: null,
  setId: null,
  exam: { id: "e", name: "NDA" },
  subject: { id: "s", name: "Mathematics" },
  chapter: { id: "c", name: "Statistics" },
  subtopic: null,
  questionNumber: null,
  pyqYear: null,
  pyqMonth: null,
  pyqNote: null,
  options: [
    { label: "A" as const, text: "20", isCorrect: true, imageUrl: null },
    { label: "B" as const, text: "25", isCorrect: false, imageUrl: null },
    { label: "C" as const, text: "30", isCorrect: false, imageUrl: null },
    { label: "D" as const, text: "35", isCorrect: false, imageUrl: null },
  ],
};

const TABLE_Q: QuestionRow = {
  ...base,
  id: "qt",
  text: [
    "The distribution is given below:",
    "| Marks | 5-15 | 15-25 | 25-35 |",
    "|---|---|---|---|",
    "| Students | 20 | 30 | 30 |",
    "What is the arithmetic mean?",
  ].join("\n"),
};

const PLAIN_Q: QuestionRow = { ...base, id: "qp", text: "What is the value of x?" };

async function documentXml(buf: Buffer): Promise<string> {
  const zip = await JSZip.loadAsync(buf);
  return zip.file("word/document.xml")!.async("text");
}

describe("docx table export", () => {
  it("emits a Word table for a pipe-table stem", async () => {
    const xml = await documentXml(
      await buildQuestionPaper({ title: "T", questions: [TABLE_Q] })
    );
    expect(xml).toContain("<w:tbl>");
    // table cell values present
    for (const v of ["Marks", "Students", "20", "30", "5-15"]) {
      expect(xml).toContain(v);
    }
    // surrounding prose kept as text
    expect(xml).toContain("The distribution is given below:");
    expect(xml).toContain("What is the arithmetic mean?");
  });

  it("does NOT emit a table for a table-free question", async () => {
    const xml = await documentXml(
      await buildQuestionPaper({ title: "T", questions: [PLAIN_Q] })
    );
    expect(xml).not.toContain("<w:tbl>");
  });
});
