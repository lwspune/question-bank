import { describe, it, expect } from "vitest";
import {
  chapterOf,
  subtopicsFor,
  validateRecords,
  recToParsedRow,
  recToQuestionRow,
  formatOf,
  kindOf,
  type PaperRec,
  type PaperSpec,
} from "../scripts/practice-paper/config";
import { contentHash, numericContentHash } from "../src/lib/upload/hash";

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

// --- numeric (NAT) + per-record kind, added for the JEE Compound Angles module -----
// The booklet mixes formats (a "Numerical Grid" exercise with no options) and kinds
// (its JEE-MAIN exercise reprints real past-year questions, which must not be filed
// as practice). Both are per-RECORD facts; everything defaults to today's behaviour.

const numRec = (n: number, over: Partial<PaperRec> = {}): PaperRec => ({
  n, stem: `nq${n}`, format: "numeric", numericAnswer: 5,
  solution: "s", difficulty: "EASY", subtopic: "A1", ...over,
});

describe("formatOf / kindOf defaults", () => {
  it("a record with no format is an MCQ and a record with no kind is practice", () => {
    expect(formatOf(rec(1))).toBe("mcq");
    expect(kindOf(rec(1))).toBe("practice");
  });
  it("reads an explicit format/kind", () => {
    expect(formatOf(numRec(1))).toBe("numeric");
    expect(kindOf(rec(1, { kind: "pyq", pyqYear: 2019 }))).toBe("pyq");
  });
});

describe("validateRecords — numeric records", () => {
  it("accepts a numeric record with an answer and no options", () => {
    expect(() => validateRecords(SINGLE, [numRec(1)])).not.toThrow();
  });
  it("accepts a numeric answer of 0 (falsy but valid)", () => {
    expect(() => validateRecords(SINGLE, [numRec(1, { numericAnswer: 0 })])).not.toThrow();
  });
  it("rejects a numeric record with no numericAnswer", () => {
    expect(() => validateRecords(SINGLE, [numRec(1, { numericAnswer: undefined })])).toThrow(/numericAnswer/);
  });
  it("rejects a non-finite numericAnswer", () => {
    expect(() => validateRecords(SINGLE, [numRec(1, { numericAnswer: NaN })])).toThrow(/numericAnswer/);
  });
  it("rejects a numeric record that still carries options (half-converted)", () => {
    expect(() => validateRecords(SINGLE, [numRec(1, { optA: "a" })])).toThrow(/option/i);
  });
  it("rejects a numeric record that still carries an MCQ answer letter", () => {
    expect(() => validateRecords(SINGLE, [numRec(1, { answer: "A" })])).toThrow(/answer/i);
  });
  it("still rejects an MCQ record with a missing option or bad answer", () => {
    expect(() => validateRecords(SINGLE, [rec(1, { optC: undefined })])).toThrow();
    expect(() => validateRecords(SINGLE, [rec(1, { answer: undefined })])).toThrow();
  });
});

describe("validateRecords — question kind", () => {
  it("accepts a pyq record carrying its year", () => {
    expect(() => validateRecords(SINGLE, [rec(1, { kind: "pyq", pyqYear: 2012 })])).not.toThrow();
  });
  it("rejects a pyq record with no year — the year is the point of filing it as pyq", () => {
    expect(() => validateRecords(SINGLE, [rec(1, { kind: "pyq" })])).toThrow(/pyqYear/);
  });
  it("rejects an implausible year", () => {
    expect(() => validateRecords(SINGLE, [rec(1, { kind: "pyq", pyqYear: 1492 })])).toThrow(/pyqYear/);
  });
  it("rejects a practice record carrying a year (mis-set kind)", () => {
    expect(() => validateRecords(SINGLE, [rec(1, { pyqYear: 2019 })])).toThrow(/pyqYear/);
  });
});

describe("recToParsedRow — numeric", () => {
  it("emits questionFormat/numericAnswer and zero options", () => {
    const row = recToParsedRow(SINGLE, numRec(7, { numericAnswer: 1.73 }));
    expect(row.questionFormat).toBe("numeric");
    expect(row.numericAnswer).toBe(1.73);
    expect(row.options).toEqual([]);
  });
  it("hashes a numeric row in the NUMERIC namespace, not the MCQ one", () => {
    const numHash = recToParsedRow(SINGLE, numRec(7, { stem: "same stem" })).contentHash;
    const mcqHash = recToParsedRow(SINGLE, rec(7, { stem: "same stem" })).contentHash;
    expect(numHash).not.toBe(mcqHash);
    expect(numHash).toBe(numericContentHash("same stem", null));
  });
  it("leaves an MCQ row's shape and hash exactly as before", () => {
    const row = recToParsedRow(SINGLE, rec(4));
    expect(row.options).toHaveLength(4);
    expect(row.contentHash).toBe(contentHash("q4", ["a", "b", "c", "d"], "A"));
    expect(row.numericAnswer).toBeUndefined();
  });
});

describe("recToQuestionRow — numeric + pyq", () => {
  it("gives a numeric record no options and carries its answer", () => {
    const q = recToQuestionRow(SINGLE, numRec(2, { numericAnswer: 4 }));
    expect(q.options).toEqual([]);
    expect(q.questionFormat).toBe("numeric");
    expect(q.numericAnswer).toBe(4);
  });
  it("carries a pyq record's year onto the view-model", () => {
    expect(recToQuestionRow(SINGLE, rec(2, { kind: "pyq", pyqYear: 2017 })).pyqYear).toBe(2017);
  });
  it("leaves a practice record's pyqYear null", () => {
    expect(recToQuestionRow(SINGLE, rec(2)).pyqYear).toBeNull();
  });
});
