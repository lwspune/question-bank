import { describe, it, expect } from "vitest";
import {
  FORMULA_CHAPTERS,
  formulaBySlug,
  allFormulaSlugs,
  relatedTopics,
  topicsByWeight,
} from "@/lib/formula";

/**
 * The formula axis indexes questions by the identity their SOLUTION uses, and
 * membership is authored by reading each solution. These assert the structural
 * invariants a generated-from-hand-labels registry can violate silently — a
 * duplicated uuid renders a question twice on one page, and a malformed one
 * simply vanishes with no error.
 *
 * The `statement` plain-text rule is the same one `/notes` enforces on its
 * plain-text fields: it feeds <meta description>, where LaTeX leaks as markup.
 */
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

describe("formula axis — structural integrity", () => {
  it("has unique, well-formed slugs across every chapter", () => {
    const slugs = allFormulaSlugs();
    expect(slugs.length).toBeGreaterThan(0);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of slugs) expect(s).toMatch(/^[a-z0-9-]+$/);
  });

  it("resolves a known slug with its chapter, and null otherwise", () => {
    const entry = formulaBySlug("adj-adj-a");
    expect(entry).not.toBeNull();
    expect(entry!.topic.name).toBe("Adjoint of an adjoint");
    expect(entry!.chapter.chapterName).toBe("Matrices & Determinants");
    expect(formulaBySlug("no-such-identity")).toBeNull();
    expect(formulaBySlug("")).toBeNull();
  });

  it("never lists the same question twice within one topic", () => {
    for (const chapter of FORMULA_CHAPTERS) {
      for (const t of chapter.topics) {
        expect(
          new Set(t.questionIds).size,
          `${t.slug} lists a duplicate question`
        ).toBe(t.questionIds.length);
      }
    }
  });

  it("carries only well-formed uuids", () => {
    for (const chapter of FORMULA_CHAPTERS) {
      for (const t of chapter.topics) {
        for (const id of t.questionIds) expect(id).toMatch(UUID_RE);
      }
    }
  });

  it("gives every topic a kind, latex, symbols and enough questions to drill", () => {
    for (const chapter of FORMULA_CHAPTERS) {
      for (const t of chapter.topics) {
        expect(["formula", "property", "technique"]).toContain(t.kind);
        expect(t.name.length).toBeGreaterThan(0);
        expect(t.latex.length).toBeGreaterThan(0);
        expect(t.symbols.length).toBeGreaterThan(0);
        // The published threshold. A page below it is not a drill, and the
        // index page states this number to the reader.
        expect(
          t.questionIds.length,
          `${t.slug} is below the 12-question publishing floor`
        ).toBeGreaterThanOrEqual(12);
      }
    }
  });

  it("keeps `statement` free of LaTeX — it feeds <meta description>", () => {
    for (const chapter of FORMULA_CHAPTERS) {
      for (const t of chapter.topics) {
        expect(t.statement, t.slug).not.toMatch(/\\[a-zA-Z]+|\\\(|\\\[|\$/);
        expect(t.statement.length).toBeGreaterThan(20);
      }
    }
  });

  it("pins the Matrices & Determinants classification", () => {
    // 768 MCQs read individually; 79 distinct identities found, 40 of them at
    // or above the publishing floor, covering 707 questions. If a re-tag moves
    // these, it should be a deliberate change rather than a silent one.
    const chapter = FORMULA_CHAPTERS[0];
    expect(chapter.topics.length).toBe(40);
    const covered = new Set(chapter.topics.flatMap((t) => t.questionIds));
    expect(covered.size).toBe(707);
    // The pilot formula, cross-checked against an independent exhaustive scan
    // of every adjoint-mentioning MCQ in the bank, which also found 14.
    expect(formulaBySlug("adj-adj-a")!.topic.questionIds).toHaveLength(14);
  });

  it("orders the index by weight, densest first", () => {
    const ordered = topicsByWeight(FORMULA_CHAPTERS[0]);
    for (let i = 1; i < ordered.length; i++) {
      expect(ordered[i - 1].questionIds.length).toBeGreaterThanOrEqual(
        ordered[i].questionIds.length
      );
    }
  });

  it("derives related topics from real co-occurrence, never from itself", () => {
    const related = relatedTopics("adj-adj-a");
    expect(related.length).toBeGreaterThan(0);
    expect(related.map((r) => r.topic.slug)).not.toContain("adj-adj-a");
    for (const r of related) expect(r.shared).toBeGreaterThan(0);
    for (let i = 1; i < related.length; i++) {
      expect(related[i - 1].shared).toBeGreaterThanOrEqual(related[i].shared);
    }
    expect(relatedTopics("no-such-identity")).toEqual([]);
  });
});
