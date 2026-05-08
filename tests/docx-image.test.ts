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
  exam: { id: "e", name: "MHT-CET" },
  subject: { id: "s", name: "Physics" },
  chapter: { id: "c", name: "Optics" },
  subtopic: null,
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
    // Answer key shows just the answer letter; images would be noise.
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
