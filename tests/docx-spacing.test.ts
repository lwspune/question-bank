/**
 * Inter-question spacing in the question paper and answer-key exports.
 *
 * Question paper: one blank paragraph after every question (standalone OR
 * set sibling) so the student's eye has a visible boundary between Q_n's
 * option D and Q_{n+1}'s stem.
 *
 * Answer key: no blank when includeSolutions=false (it's already a compact
 * letter list); blank between blocks when includeSolutions=true so each
 * solution block breathes.
 */
import { describe, it, expect } from "vitest";
import JSZip from "jszip";
import { buildQuestionPaper, buildAnswerKey } from "@/lib/export/docxBuilder";
import type { QuestionRow } from "@/lib/questions/query";

const BASE: QuestionRow = {
  id: "x",
  text: "",
  context: null,
  difficulty: "EASY",
  solution: null,
  imageUrl: null,
  setId: null,
  exam: { id: "e", name: "NDA" },
  subject: { id: "s", name: "Mathematics" },
  chapter: { id: "c", name: "Algebra" },
  subtopic: null,
  questionNumber: null,
  pyqYear: null,
  pyqMonth: null,
  pyqNote: null,
  options: [
    { label: "A", text: "1", isCorrect: true, imageUrl: null },
    { label: "B", text: "2", isCorrect: false, imageUrl: null },
    { label: "C", text: "3", isCorrect: false, imageUrl: null },
    { label: "D", text: "4", isCorrect: false, imageUrl: null },
  ],
};

async function readDoc(buf: Buffer): Promise<string> {
  const zip = await JSZip.loadAsync(buf);
  return zip.file("word/document.xml")!.async("text");
}

describe("docx question-paper spacing", () => {
  it("inserts a blank paragraph between two consecutive standalone questions", async () => {
    const Q1: QuestionRow = { ...BASE, id: "q1", text: "QUESTION_ALPHA stem" };
    const Q2: QuestionRow = { ...BASE, id: "q2", text: "QUESTION_BETA stem" };
    const xml = await readDoc(
      await buildQuestionPaper({ title: "T", questions: [Q1, Q2] })
    );
    const idx1 = xml.indexOf("QUESTION_ALPHA");
    const idx2 = xml.indexOf("QUESTION_BETA");
    expect(idx1).toBeGreaterThan(-1);
    expect(idx2).toBeGreaterThan(idx1);
    expect(xml.substring(idx1, idx2)).toContain("<w:p/>");
  });

  it("inserts a blank paragraph between set siblings sharing a banner", async () => {
    const S1: QuestionRow = {
      ...BASE,
      id: "s1",
      text: "SIB_ALPHA stem",
      context: "shared passage text",
      setId: "u:S1",
    };
    const S2: QuestionRow = { ...S1, id: "s2", text: "SIB_BETA stem" };
    const xml = await readDoc(
      await buildQuestionPaper({ title: "T", questions: [S1, S2] })
    );
    const idx1 = xml.indexOf("SIB_ALPHA");
    const idx2 = xml.indexOf("SIB_BETA");
    expect(idx1).toBeGreaterThan(-1);
    expect(idx2).toBeGreaterThan(idx1);
    expect(xml.substring(idx1, idx2)).toContain("<w:p/>");
  });

  it("inserts a blank paragraph between the last set sibling and the next standalone (no double blank)", async () => {
    const S1: QuestionRow = {
      ...BASE,
      id: "s1",
      text: "SIB_ALPHA stem",
      context: "shared passage",
      setId: "u:S1",
    };
    const S2: QuestionRow = { ...S1, id: "s2", text: "SIB_BETA stem" };
    const STAND: QuestionRow = { ...BASE, id: "x1", text: "AFTER_SET stem" };
    const xml = await readDoc(
      await buildQuestionPaper({ title: "T", questions: [S1, S2, STAND] })
    );
    const idxLastSib = xml.indexOf("SIB_BETA");
    const idxStand = xml.indexOf("AFTER_SET");
    const between = xml.substring(idxLastSib, idxStand);
    // Exactly one blank paragraph between the last sibling and the next single.
    expect(between.match(/<w:p\/>/g)?.length).toBe(1);
  });
});

describe("docx answer-key spacing", () => {
  const Q1: QuestionRow = { ...BASE, id: "q1", text: "Q1 stem", solution: "S1" };
  const Q2: QuestionRow = { ...BASE, id: "q2", text: "Q2 stem", solution: "S2" };

  it("plain answer key (no solutions): no extra blanks between answers", async () => {
    const xml = await readDoc(
      await buildAnswerKey({
        title: "T",
        questions: [Q1, Q2],
        includeSolutions: false,
      })
    );
    // Title + "Answer Key" subtitle + blank() once + 2 answer paragraphs.
    // Only the one blank after the subtitle should appear.
    const blanks = xml.match(/<w:p\/>/g) ?? [];
    expect(blanks.length).toBe(1);
  });

  it("solution answer key: blank paragraph after each (answer + solution) block", async () => {
    const xml = await readDoc(
      await buildAnswerKey({
        title: "T",
        questions: [Q1, Q2],
        includeSolutions: true,
      })
    );
    // 1 blank after subtitle + 2 blanks after each (answer+solution) block.
    const blanks = xml.match(/<w:p\/>/g) ?? [];
    expect(blanks.length).toBe(3);
  });
});
