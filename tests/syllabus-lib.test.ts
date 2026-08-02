import { describe, expect, it } from "vitest";
import {
  conceptKey,
  findDuplicateKeys,
  isConceptStatus,
  isSyllabusExam,
  validateConceptRow,
  type ConceptRow,
} from "../scripts/syllabus/lib";

const ok: ConceptRow = {
  class: 11,
  subject: "Chemistry",
  source: "MH State Board",
  chapter_no: 1,
  chapter_name: "Some Basic Concepts of Chemistry",
  section_no: "1.2.3",
  concept: "States of matter",
  seq: 5,
};

describe("validateConceptRow", () => {
  it("accepts a well-formed row", () => {
    expect(validateConceptRow(ok, 0)).toEqual([]);
  });

  it("rejects a class outside 9-12", () => {
    expect(validateConceptRow({ ...ok, class: 13 }, 1).join()).toMatch(/class must be 9-12/);
  });

  it("rejects a blank concept", () => {
    expect(validateConceptRow({ ...ok, concept: "   " }, 2).join()).toMatch(/concept is required/);
  });

  it("rejects an over-long section_no, matching the DB CHECK", () => {
    expect(validateConceptRow({ ...ok, section_no: "x".repeat(21) }, 3).join()).toMatch(
      /section_no exceeds 20/,
    );
  });

  it("reports every problem in one pass rather than stopping at the first", () => {
    const errors = validateConceptRow({ ...ok, class: 99, concept: "" }, 4);
    expect(errors).toHaveLength(2);
  });
});

describe("conceptKey / findDuplicateKeys", () => {
  it("keys on the 0065 unique constraint", () => {
    expect(conceptKey(ok)).toBe("MH State Board|11|Chemistry|1.2.3");
  });

  it("does not collide across classes sharing a section number", () => {
    // Std XI 1.1 and Std XII 1.1 are different concepts in different books.
    expect(conceptKey(ok)).not.toBe(conceptKey({ ...ok, class: 12 }));
  });

  it("finds a duplicate that would silently upsert away a concept", () => {
    expect(findDuplicateKeys([ok, { ...ok, concept: "Different text" }])).toEqual([
      "MH State Board|11|Chemistry|1.2.3",
    ]);
  });

  it("returns nothing for distinct rows", () => {
    expect(findDuplicateKeys([ok, { ...ok, section_no: "1.2.4" }])).toEqual([]);
  });
});

describe("enum guards", () => {
  it("accepts known exams and statuses", () => {
    expect(isSyllabusExam("MHT-CET")).toBe(true);
    expect(isConceptStatus("partial")).toBe(true);
  });

  it("rejects unknown values", () => {
    expect(isSyllabusExam("CUET")).toBe(false);
    // 'unknown' is deliberately not a status - absence of a row means unassessed.
    expect(isConceptStatus("unknown")).toBe(false);
  });
});
