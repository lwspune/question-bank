/**
 * Set banner rendering in the question-paper export.
 *
 * groupBySet always opens a group when a question has a non-null setId, but
 * the user's selection (cart or filter) can leave a set with only ONE
 * sibling in the export. In that case the original "Set: …the three items
 * that follow" passage promises items that aren't there. We render the
 * passage as inline Context for that lone question instead, dropping the
 * Set: banner. Sets of 2+ still render with the banner.
 */
import { describe, it, expect } from "vitest";
import JSZip from "jszip";
import { buildQuestionPaper } from "@/lib/export/docxBuilder";
import type { QuestionRow } from "@/lib/questions/query";

const PASSAGE =
  "Consider the following for the three (03) items that follow: " +
  "Let p = sin 35, q = sin 25 and r = sin -95.";

const SET_SIBLING_1: QuestionRow = {
  id: "s1",
  text: "What is (pq + qr + rp) equal to?",
  context: PASSAGE,
  difficulty: "MODERATE",
  solution: null,
  imageUrl: null,
  setId: "upload-x:S1",
  exam: { id: "e", name: "NDA" },
  subject: { id: "s", name: "Mathematics" },
  chapter: { id: "c", name: "Trigonometric Functions" },
  subtopic: null,
  options: [
    { label: "A", text: "-3/4", isCorrect: true, imageUrl: null },
    { label: "B", text: "0", isCorrect: false, imageUrl: null },
    { label: "C", text: "1/4", isCorrect: false, imageUrl: null },
    { label: "D", text: "3/4", isCorrect: false, imageUrl: null },
  ],
};

const SET_SIBLING_2: QuestionRow = {
  ...SET_SIBLING_1,
  id: "s2",
  text: "What is (p + q + r) equal to?",
};

const STANDALONE: QuestionRow = {
  ...SET_SIBLING_1,
  id: "x1",
  text: "The maximum value of sin (x + pi/5) + cos (x + pi/5).",
  context: null,
  setId: null,
};

async function readPart(buf: Buffer, path: string): Promise<string> {
  const zip = await JSZip.loadAsync(buf);
  const file = zip.file(path);
  if (!file) throw new Error(`missing ${path}`);
  return file.async("text");
}

describe("docx Set banner rendering", () => {
  it("set-of-1 (only one sibling selected): no Set: banner, passage renders as inline Context", async () => {
    const buf = await buildQuestionPaper({
      title: "T",
      questions: [SET_SIBLING_1, STANDALONE],
    });
    const xml = await readPart(buf, "word/document.xml");

    // No "Set:" banner anywhere.
    expect(xml).not.toContain("Set: ");
    // Passage is still present (rendered as Context: for the lone sibling).
    expect(xml).toContain("Context: ");
    expect(xml).toContain("Consider the following for the three (03) items");
  });

  it("set-of-2+ at the top of the export: banner names questions 1-2 and strips count phrase from passage", async () => {
    const buf = await buildQuestionPaper({
      title: "T",
      questions: [SET_SIBLING_1, SET_SIBLING_2, STANDALONE],
    });
    const xml = await readPart(buf, "word/document.xml");

    // Banner names which questions belong to the set.
    expect(xml).toContain("Common context for questions 1-2:");
    // Old "Set: " framing is gone.
    expect(xml).not.toContain("Set: ");
    // Passage's "three (03) items" count phrase is stripped at render.
    expect(xml).not.toContain("for the three (03) items");
    expect(xml).toContain("for the items that follow");
    // Banner appears once, not duplicated as per-question Context.
    expect(xml).not.toContain("Context: ");
    const bannerMatches = xml.match(/Common context for questions/g) ?? [];
    expect(bannerMatches.length).toBe(1);
  });

  it("set-of-2+ mid-paper: banner names the actual question positions (12-13), not 1-2", async () => {
    // 11 standalone questions, then a 2-sibling set, then 1 standalone.
    const pre: QuestionRow[] = Array.from({ length: 11 }, (_, i) => ({
      ...STANDALONE,
      id: `pre-${i + 1}`,
      text: `Standalone question ${i + 1}.`,
    }));
    const post: QuestionRow = { ...STANDALONE, id: "post-1", text: "Final standalone." };
    const buf = await buildQuestionPaper({
      title: "T",
      questions: [...pre, SET_SIBLING_1, SET_SIBLING_2, post],
    });
    const xml = await readPart(buf, "word/document.xml");

    expect(xml).toContain("Common context for questions 12-13:");
    expect(xml).not.toContain("Common context for questions 1-2:");
  });
});
