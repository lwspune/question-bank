import { describe, it, expect } from "vitest";
import JSZip from "jszip";
import { buildQuestionPaper, buildAnswerKey } from "@/lib/export/docxBuilder";
import type { QuestionRow } from "@/lib/questions/query";
import { TINY_PNG } from "./fixtures/tinyImage";

const Q_WITH_IMAGES: QuestionRow = {
  id: "q1",
  text: "What is shown in the diagram?",
  context: null,
  difficulty: "EASY",
  solution: "See the diagram.",
  imageUrl: "ORG/q-image.png",
  setId: null,
  exam: { id: "e", name: "MHT-CET" },
  subject: { id: "s", name: "Physics" },
  chapter: { id: "c", name: "Optics" },
  subtopic: null,
  questionNumber: null,
  pyqYear: null,
  pyqMonth: null,
  pyqNote: null,
  options: [
    { label: "A", text: "First option", isCorrect: true, imageUrl: "ORG/opt-a.png" },
    { label: "B", text: "Second option", isCorrect: false, imageUrl: null },
    { label: "C", text: "Third option", isCorrect: false, imageUrl: null },
    { label: "D", text: "Fourth option", isCorrect: false, imageUrl: null },
  ],
};

const IMAGE_BYTES = new Map<string, Buffer>([
  ["ORG/q-image.png", TINY_PNG],
  ["ORG/opt-a.png", TINY_PNG],
]);

describe("docx image embedding", () => {
  it("question paper embeds question + option images as media entries", async () => {
    const buf = await buildQuestionPaper({
      title: "T",
      questions: [Q_WITH_IMAGES],
      imageBytes: IMAGE_BYTES,
    });
    const zip = await JSZip.loadAsync(buf);
    const mediaFiles = Object.keys(zip.files).filter((p) =>
      p.startsWith("word/media/")
    );
    // Question image + option A image = 2 media files.
    expect(mediaFiles.length).toBe(2);
  });

  it("references the embedded images via <w:drawing> in document.xml", async () => {
    const buf = await buildQuestionPaper({
      title: "T",
      questions: [Q_WITH_IMAGES],
      imageBytes: IMAGE_BYTES,
    });
    const zip = await JSZip.loadAsync(buf);
    const xml = await zip.file("word/document.xml")!.async("text");
    expect(xml).toContain("<w:drawing>");
  });

  it("works without imageBytes — image_url silently skipped (graceful fallback)", async () => {
    const buf = await buildQuestionPaper({
      title: "T",
      questions: [Q_WITH_IMAGES],
      // imageBytes not provided
    });
    const zip = await JSZip.loadAsync(buf);
    const mediaFiles = Object.keys(zip.files).filter((p) =>
      p.startsWith("word/media/")
    );
    expect(mediaFiles.length).toBe(0);
  });

  it("answer key does NOT embed images even when bytes are provided", async () => {
    // Answer key shows just the answer letter; stem/option images would be noise.
    const buf = await buildAnswerKey({
      title: "T",
      questions: [Q_WITH_IMAGES],
      includeSolutions: true,
      imageBytes: IMAGE_BYTES,
    });
    const zip = await JSZip.loadAsync(buf);
    const mediaFiles = Object.keys(zip.files).filter((p) =>
      p.startsWith("word/media/")
    );
    expect(mediaFiles.length).toBe(0);
  });
});

const Q_SUBJECTIVE_WITH_SOLUTION_IMAGE: QuestionRow = {
  id: "qs1",
  text: "Show that the pair represents an equilateral triangle with y = 3.",
  context: null,
  difficulty: "MODERATE",
  solution: "The two lines meet the base y = 3 to form an equilateral triangle.",
  imageUrl: null,
  solutionImageUrl: "ORG/sol-diagram.png",
  setId: null,
  questionFormat: "subjective",
  exam: { id: "e", name: "State Board" },
  subject: { id: "s", name: "Mathematics" },
  chapter: { id: "c", name: "Pair of Straight Lines" },
  subtopic: null,
  questionNumber: null,
  pyqYear: null,
  pyqMonth: null,
  pyqNote: null,
  options: [],
};

const SOLUTION_IMAGE_BYTES = new Map<string, Buffer>([
  ["ORG/sol-diagram.png", TINY_PNG],
]);

describe("docx solution image (migration 0042)", () => {
  it("answer key WITH solutions embeds the solution diagram", async () => {
    const buf = await buildAnswerKey({
      title: "T",
      questions: [Q_SUBJECTIVE_WITH_SOLUTION_IMAGE],
      includeSolutions: true,
      imageBytes: SOLUTION_IMAGE_BYTES,
    });
    const zip = await JSZip.loadAsync(buf);
    const mediaFiles = Object.keys(zip.files).filter((p) =>
      p.startsWith("word/media/") && !zip.files[p].dir
    );
    expect(mediaFiles.length).toBe(1);
    const xml = await zip.file("word/document.xml")!.async("text");
    expect(xml).toContain("<w:drawing>");
  });

  it("answer key WITHOUT solutions omits the solution diagram", async () => {
    // A plain answer key (letters/model answers only) must not carry the diagram.
    const buf = await buildAnswerKey({
      title: "T",
      questions: [Q_SUBJECTIVE_WITH_SOLUTION_IMAGE],
      includeSolutions: false,
      imageBytes: SOLUTION_IMAGE_BYTES,
    });
    const zip = await JSZip.loadAsync(buf);
    const mediaFiles = Object.keys(zip.files).filter((p) =>
      p.startsWith("word/media/") && !zip.files[p].dir
    );
    expect(mediaFiles.length).toBe(0);
  });

  it("question paper NEVER embeds the solution diagram (no answer leak)", async () => {
    const buf = await buildQuestionPaper({
      title: "T",
      questions: [Q_SUBJECTIVE_WITH_SOLUTION_IMAGE],
      imageBytes: SOLUTION_IMAGE_BYTES,
    });
    const zip = await JSZip.loadAsync(buf);
    const mediaFiles = Object.keys(zip.files).filter((p) =>
      p.startsWith("word/media/") && !zip.files[p].dir
    );
    expect(mediaFiles.length).toBe(0);
  });
});
