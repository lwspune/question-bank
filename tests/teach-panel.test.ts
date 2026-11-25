/**
 * "Teach me the idea" in a panel (2026-11-15, lib/notes/teachPanel.ts): the
 * stuck offer's button shows the subtopic's notes on the same page instead of
 * leaving for the notes page. These are the pure parts: reading the card's
 * notes link, and the concepts the panel shows, in what order.
 */
import { describe, it, expect } from "vitest";
import { diagramNoteShown, parseNotesHref, teachConcepts } from "@/lib/notes/teachPanel";
import type { ConceptUnit, SubtopicNote } from "@/app/notes/_types";

describe("parseNotesHref", () => {
  it("reads a subtopic link, with or without a concept anchor", () => {
    expect(parseNotesHref("/notes/nda-maths/statistics/central-tendency")).toEqual({
      subjectRoute: "nda-maths",
      chapterSlug: "statistics",
      subtopicSlug: "central-tendency",
      conceptSlug: null,
    });
    expect(parseNotesHref("/notes/nda-maths/statistics/central-tendency#weighted-mean")?.conceptSlug).toBe("weighted-mean");
  });

  it("refuses anything that is not a notes subtopic link", () => {
    expect(parseNotesHref("/notes/nda-maths/statistics")).toBeNull();
    expect(parseNotesHref("/guide/nda-maths")).toBeNull();
    expect(parseNotesHref("https://evil.example/notes/a/b/c")).toBeNull();
    expect(parseNotesHref("/notes/nda-maths/statistics/central-tendency/extra")).toBeNull();
    expect(parseNotesHref("/notes/NDA Maths/x/y")).toBeNull();
  });
});

const concept = (slug: string, extra: Partial<ConceptUnit> = {}): ConceptUnit =>
  ({
    slug,
    name: `Concept ${slug}`,
    kind: "formula",
    intuition: "why",
    definition: "what",
    formula: { latex: "a+b" },
    authoredExample: { prompt: "p", steps: ["s"], answer: "a" },
    traps: [{ title: "t", body: "b" }],
    practiceSet: [{ prompt: "x", answer: "y" }],
    ...extra,
  }) as unknown as ConceptUnit;

const note = (concepts: ConceptUnit[]): SubtopicNote => ({
  subtopicName: "Central tendency",
  title: "Central tendency",
  oneLineDefinition: "The middle of the data.",
  whyItMatters: "",
  concepts,
});

describe("teachConcepts", () => {
  it("keeps teaching order when no concept is named", () => {
    expect(teachConcepts(note([concept("a"), concept("b"), concept("c")]), null).map((c) => c.slug)).toEqual(["a", "b", "c"]);
  });

  it("puts the concept the question is tagged with first", () => {
    expect(teachConcepts(note([concept("a"), concept("b"), concept("c")]), "c").map((c) => c.slug)).toEqual(["c", "a", "b"]);
  });

  it("ignores a named concept the subtopic does not have", () => {
    expect(teachConcepts(note([concept("a"), concept("b")]), "zzz").map((c) => c.slug)).toEqual(["a", "b"]);
  });

  it("carries only the teaching parts, and says when the full page has a diagram", () => {
    const [c] = teachConcepts(note([concept("a", { visualizationSlug: "dice-sum-grid" } as Partial<ConceptUnit>)]), null);
    expect(c).not.toHaveProperty("practiceSet");
    expect(c.hasDiagram).toBe(true);
    expect(c).toMatchObject({ slug: "a", name: "Concept a", intuition: "why", definition: "what" });
  });
});

describe("diagramNoteShown", () => {
  const [withDiagram] = teachConcepts(note([concept("a", { visualizationSlug: "dice-sum-grid" } as Partial<ConceptUnit>)]), null);
  const [plain] = teachConcepts(note([concept("b")]), null);

  it("points at the full page's diagram when there is one", () => {
    expect(diagramNoteShown(withDiagram, null)).toBe(true);
    expect(diagramNoteShown(plain, null)).toBe(false);
  });

  it("says nothing about the diagram the student was just looking at (the Visuals viewer)", () => {
    expect(diagramNoteShown(withDiagram, "a")).toBe(false);
    // Another concept's diagram is still worth pointing at.
    expect(diagramNoteShown(withDiagram, "b")).toBe(true);
  });
});
