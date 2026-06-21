import { describe, it, expect } from "vitest";
import {
  chapterOf,
  subtopicsFor,
  validateRecords,
  recToParsedRow,
  type PaperRec,
  type PaperSpec,
} from "../scripts/practice-paper/config";

// Synthetic specs (note-proof: not real chapter names) — single- vs multi-chapter.
const SINGLE: PaperSpec = {
  slug: "s", title: "S", recordsFile: "s.json", outName: "S", sourceFile: "S.pdf",
  subjectName: "Mathematics", chapterName: "Alpha", subtopics: ["A1", "A2"],
  pyqNote: "n", examName: "NDA", section: { key: "s", label: "S" }, bankAdd: true,
};
const MULTI: PaperSpec = {
  slug: "m", title: "M", recordsFile: "m.json", outName: "M", sourceFile: "M.pdf",
  subjectName: "Mathematics",
  chapters: { Alpha: ["A1", "A2"], Beta: ["B1"] },
  pyqNote: "n", examName: "NDA", section: { key: "m", label: "M" }, bankAdd: true,
};

const rec = (n: number, over: Partial<PaperRec> = {}): PaperRec => ({
  n, stem: `q${n}`, optA: "a", optB: "b", optC: "c", optD: "d",
  answer: "A", solution: "s", difficulty: "EASY", subtopic: "A1", ...over,
});

describe("chapterOf", () => {
  it("uses the record's chapter when present (multi-chapter paper)", () => {
    expect(chapterOf(MULTI, rec(1, { chapter: "Beta", subtopic: "B1" }))).toBe("Beta");
  });
  it("falls back to spec.chapterName for single-chapter papers", () => {
    expect(chapterOf(SINGLE, rec(1))).toBe("Alpha");
  });
  it("throws when neither a record chapter nor spec.chapterName exists", () => {
    expect(() => chapterOf(MULTI, rec(1))).toThrow();
  });
});

describe("subtopicsFor", () => {
  it("returns the chapter's subtopics in multi-chapter mode", () => {
    expect(subtopicsFor(MULTI, "Beta")).toEqual(["B1"]);
  });
  it("returns spec.subtopics in single-chapter mode", () => {
    expect(subtopicsFor(SINGLE, "Alpha")).toEqual(["A1", "A2"]);
  });
  it("throws for an unknown chapter in multi-chapter mode", () => {
    expect(() => subtopicsFor(MULTI, "Gamma")).toThrow();
  });
});

describe("validateRecords", () => {
  it("accepts a valid single-chapter record set", () => {
    expect(() => validateRecords(SINGLE, [rec(1), rec(2, { subtopic: "A2" })])).not.toThrow();
  });
  it("accepts a valid multi-chapter record set", () => {
    expect(() => validateRecords(MULTI, [
      rec(1, { chapter: "Alpha", subtopic: "A1" }),
      rec(2, { chapter: "Beta", subtopic: "B1" }),
    ])).not.toThrow();
  });
  it("rejects a subtopic not valid for the record's chapter", () => {
    // B1 belongs to Beta, not Alpha
    expect(() => validateRecords(MULTI, [rec(1, { chapter: "Alpha", subtopic: "B1" })])).toThrow();
  });
  it("rejects a record whose chapter is not in the spec", () => {
    expect(() => validateRecords(MULTI, [rec(1, { chapter: "Gamma", subtopic: "A1" })])).toThrow();
  });
  it("still rejects duplicate question numbers / bad answer / empty option", () => {
    expect(() => validateRecords(SINGLE, [rec(1), rec(1)])).toThrow();
    expect(() => validateRecords(SINGLE, [rec(1, { answer: "E" as any })])).toThrow();
    expect(() => validateRecords(SINGLE, [rec(1, { optC: "" })])).toThrow();
  });
});

describe("recToParsedRow", () => {
  it("files a multi-chapter record under its own chapter", () => {
    const row = recToParsedRow(MULTI, rec(1, { chapter: "Beta", subtopic: "B1" }));
    expect(row.chapterName).toBe("Beta");
    expect(row.subtopicName).toBe("B1");
  });
  it("files a single-chapter record under the spec chapter", () => {
    const row = recToParsedRow(SINGLE, rec(3, { subtopic: "A2" }));
    expect(row.chapterName).toBe("Alpha");
  });
});
