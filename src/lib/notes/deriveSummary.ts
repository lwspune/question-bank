import type { SubtopicNote } from "@/app/notes/_types";

export type SummaryFormula = {
  /** Concept slug — used as an in-page anchor target (#slug). */
  slug: string;
  conceptName: string;
  label: string;
  latex: string;
};

export type SummaryTrap = {
  slug: string;
  conceptName: string;
  title: string;
};

export type DerivedSummary = {
  formulas: SummaryFormula[];
  traps: SummaryTrap[];
};

/**
 * Pure derivation of a revision summary from a SubtopicNote — every
 * concept's formula and trap titles, flattened with the owning concept's
 * slug + name attached for back-linking. Drives both the per-subtopic
 * SubtopicSummary and the chapter-level revision sheet, so there is one
 * source of truth and no manual sync when concepts change.
 */
export function deriveSummary(note: SubtopicNote): DerivedSummary {
  const formulas: SummaryFormula[] = [];
  const traps: SummaryTrap[] = [];

  for (const c of note.concepts) {
    if (c.formula) {
      formulas.push({
        slug: c.slug,
        conceptName: c.name,
        label: c.formula.label,
        latex: c.formula.latex,
      });
    }
    for (const t of c.traps ?? []) {
      traps.push({ slug: c.slug, conceptName: c.name, title: t.title });
    }
  }

  return { formulas, traps };
}
