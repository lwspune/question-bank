/**
 * "Teach me the idea" in a panel (owner, 2026-11-15): the stuck offer's button
 * shows the subtopic's notes on the same page instead of leaving for the notes
 * page, so the student is still on their question afterwards. Pure.
 * Spec: tests/teach-panel.test.ts.
 *
 * The panel shows the TEACHING half of each concept card (intuition,
 * definition, formula, worked example or table, traps), not the practice,
 * the bank examples or the interactive diagram: the diagrams alone are 1.4 MB
 * of code over 229 files, which a phone would download on the tap. A concept
 * with a diagram says so and links the full page.
 */
import type { AuthoredExample, ConceptUnit, FormulaSpec, ReferenceTable, SubtopicNote, TrapCallout } from "@/app/notes/_types";

const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,99}$/;
const HREF_RE = /^\/notes\/([a-z0-9][a-z0-9-]*)\/([a-z0-9][a-z0-9-]*)\/([a-z0-9][a-z0-9-]*)(?:#([a-z0-9][a-z0-9-]*))?$/;

export function isNotesSlug(v: string): boolean {
  return SLUG_RE.test(v);
}

export type NotesRef = { subjectRoute: string; chapterSlug: string; subtopicSlug: string; conceptSlug: string | null };

/** The subtopic (and concept) a card's notes link points at, or null. */
export function parseNotesHref(href: string): NotesRef | null {
  const m = HREF_RE.exec(href);
  if (!m) return null;
  return { subjectRoute: m[1], chapterSlug: m[2], subtopicSlug: m[3], conceptSlug: m[4] ?? null };
}

export type TeachConcept = {
  slug: string;
  name: string;
  kind: "formula" | "reference";
  intuition: string;
  definition: string;
  formula: FormulaSpec | null;
  example: AuthoredExample | null;
  table: ReferenceTable | null;
  traps: TrapCallout[];
  /** The full notes page has an interactive diagram for this concept. */
  hasDiagram: boolean;
};

function teachConcept(c: ConceptUnit): TeachConcept {
  return {
    slug: c.slug,
    name: c.name,
    kind: c.kind,
    intuition: c.intuition,
    definition: c.definition,
    formula: c.kind === "formula" ? (c.formula ?? null) : null,
    example: c.kind === "formula" ? c.authoredExample : null,
    table: c.kind === "reference" ? c.table : null,
    traps: c.traps ?? [],
    hasDiagram: Boolean(c.visualizationSlug),
  };
}

/**
 * Whether a concept says "there is an interactive diagram on the full notes
 * page". Not for the concept the student opened the panel from in the Visuals
 * viewer (2026-11-25): they were just looking at that diagram.
 */
export function diagramNoteShown(c: Pick<TeachConcept, "slug" | "hasDiagram">, skipFor: string | null): boolean {
  return c.hasDiagram && c.slug !== skipFor;
}

/** The panel's concepts: the one the question is tagged with first, then teaching order. */
export function teachConcepts(note: SubtopicNote, conceptSlug: string | null): TeachConcept[] {
  const all = note.concepts.map(teachConcept);
  const k = conceptSlug ? all.findIndex((c) => c.slug === conceptSlug) : -1;
  if (k <= 0) return all;
  return [all[k], ...all.slice(0, k), ...all.slice(k + 1)];
}
