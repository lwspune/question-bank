/**
 * The "Teach me" buttons (2026-11-21, owner-approved mockup): /me's "Your weak
 * spots", the mock result's "Where your next marks are" and V's own "Teach me a
 * chapter" open V with one typed request, which V answers with chapter_overview
 * starting from the student's waiting mistakes. Pure core: src/lib/chat/teachChapter.ts.
 */
import { describe, it, expect } from "vitest";
import { examOfPlace, teachChapterMessage } from "@/lib/chat/teachChapter";
import { isAskVTextDetail } from "@/lib/chat/askVEvent";

describe("teachChapterMessage", () => {
  it("names the chapter and the exam, and asks V to start from the student's mistakes", () => {
    expect(teachChapterMessage({ chapter: "Vectors", place: "Mathematics · MHT-CET" })).toBe(
      "Teach me Vectors for MHT-CET. Start from what I got wrong."
    );
  });

  it("from a mock result topic: starts with that topic", () => {
    expect(teachChapterMessage({ chapter: "Vectors", exam: "MHT-CET", startWith: "Dot Product, Angle, and Perpendicularity" })).toBe(
      "Teach me Vectors for MHT-CET, starting with Dot Product, Angle, and Perpendicularity, where I lost marks."
    );
  });

  it("an exam given outright wins over the place", () => {
    expect(teachChapterMessage({ chapter: "Probability", exam: "NDA", place: "Mathematics · MHT-CET" })).toBe(
      "Teach me Probability for NDA. Start from what I got wrong."
    );
  });

  it("no exam known: the chapter alone", () => {
    expect(teachChapterMessage({ chapter: "Vectors", place: "Mathematics" })).toBe("Teach me Vectors. Start from what I got wrong.");
  });

  it("is always a message V's window accepts, however long the names", () => {
    const msg = teachChapterMessage({ chapter: "A".repeat(200), exam: "B".repeat(80), startWith: "C".repeat(150) });
    expect(isAskVTextDetail({ message: msg })).toBe(true);
  });
});

describe("examOfPlace", () => {
  it("reads the exam after the subject", () => {
    expect(examOfPlace("Mathematics · MHT-CET")).toBe("MHT-CET");
    expect(examOfPlace("Physics · Maharashtra HSC Class 12")).toBe("Maharashtra HSC Class 12");
  });

  it("a place with no exam, or none at all, gives null", () => {
    expect(examOfPlace("Mathematics")).toBeNull();
    expect(examOfPlace("")).toBeNull();
    expect(examOfPlace(undefined)).toBeNull();
  });
});
