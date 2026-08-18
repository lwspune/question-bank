import { describe, expect, it } from "vitest";
import {
  conceptKey,
  findDuplicateKeys,
  isConceptStatus,
  isSyllabusExam,
  validateConceptRow,
  type ConceptRow,
  handoutCellText,
  handoutVocabulary,
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

describe("handoutCellText", () => {
  // The Word handout uses a two-word vocabulary, unlike the page's five-way
  // Yes/Part/—/Mixed/? scale — and WHICH two words a status maps to depends on
  // how the subject's rulings were produced.
  describe("adjudicated subjects (rulings authored per concept)", () => {
    it("keeps the two ruled positives apart", () => {
      expect(handoutCellText("full", "adjudicated")).toBe("Yes");
      expect(handoutCellText("partial", "adjudicated")).toBe("Part");
    });

    it("reads a mixed chapter as Part", () => {
      // Some concepts inside are covered and some are not, which is what Part
      // says. Rounding it up to Yes would overstate coverage.
      expect(handoutCellText("mixed", "adjudicated")).toBe("Part");
    });
  });

  describe("derived subjects (rulings inferred from the exam banks)", () => {
    it("reads a pointer as Yes", () => {
      // derive-board-status.ts writes `partial` and NEVER `full`, because a
      // pointer proves an exam asks something in the section rather than that
      // all of it is required. That caveat is about the derivation, not about
      // the syllabus, so on a handout it reads as coverage.
      expect(handoutCellText("partial", "derived")).toBe("Yes");
      expect(handoutCellText("mixed", "derived")).toBe("Yes");
    });

    it("still renders a genuine full ruling as Yes", () => {
      expect(handoutCellText("full", "derived")).toBe("Yes");
    });
  });

  it("leaves both negative states blank under either vocabulary", () => {
    // The handout carries no legend, so there is no third word available. Blank
    // is the only rendering for BOTH "not in syllabus" and "not yet assessed" —
    // a real loss of the distinction the page keeps, and the reason the caller
    // reports how many of each a file contains.
    for (const v of ["adjudicated", "derived"] as const) {
      expect(handoutCellText("not", v)).toBe("");
      expect(handoutCellText(null, v)).toBe("");
    }
  });

  it("treats a half-reviewed chapter exactly as a mixed one", () => {
    // The page separates these two (a disagreement vs an unfinished review) and
    // the handout deliberately cannot: it has no third word and no legend to
    // explain one. Pinning them EQUAL rather than asserting a literal keeps the
    // printed sheet byte-identical when the page's vocabulary grows, so a fix to
    // the page cannot silently rewrite a teacher's handout.
    for (const v of ["adjudicated", "derived"] as const) {
      expect(handoutCellText("partly-assessed", v)).toBe(handoutCellText("mixed", v));
    }
  });

  it("emits nothing outside the two-word vocabulary", () => {
    for (const v of ["adjudicated", "derived"] as const) {
      for (const s of ["full", "partial", "not", "mixed", "partly-assessed", null] as const) {
        expect(["Yes", "Part", ""]).toContain(handoutCellText(s, v));
      }
    }
  });
});

describe("handoutVocabulary", () => {
  it("calls a subject derived when nothing was ruled fully covered", () => {
    // The discriminator is data, not a hardcoded subject list, so the label
    // corrects itself the day someone authors real rulings.
    expect(handoutVocabulary([null, "partial", "mixed", "not"])).toBe("derived");
  });

  it("calls a subject adjudicated as soon as one full ruling exists", () => {
    expect(handoutVocabulary(["partial", "full"])).toBe("adjudicated");
  });

  it("treats an empty subject as derived rather than claiming adjudication", () => {
    expect(handoutVocabulary([])).toBe("derived");
  });
});
