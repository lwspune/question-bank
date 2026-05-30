import type { ReferenceTable, SubtopicNote } from "@/app/notes/_types";

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

/**
 * One reference-variant concept surfaced for the revision sheet — the
 * sheet renders the full table behind a per-concept disclosure, since
 * for recall concepts the table IS the revision content.
 */
export type SummaryReference = {
  slug: string;
  conceptName: string;
  table: ReferenceTable;
};

export type DerivedSummary = {
  formulas: SummaryFormula[];
  traps: SummaryTrap[];
  references: SummaryReference[];
};

/**
 * Pure derivation of a revision summary from a SubtopicNote — every
 * concept's formula, reference table, and trap titles, flattened with
 * the owning concept's slug + name attached for back-linking. Drives
 * both the per-subtopic SubtopicSummary and the chapter-level revision
 * sheet, so there is one source of truth and no manual sync when
 * concepts change. Mixed formula + reference concepts populate
 * different arrays in declaration order; trap order is preserved
 * regardless of variant.
 */
export function deriveSummary(note: SubtopicNote): DerivedSummary {
  const formulas: SummaryFormula[] = [];
  const traps: SummaryTrap[] = [];
  const references: SummaryReference[] = [];

  for (const c of note.concepts) {
    if (c.kind === "formula" && c.formula) {
      formulas.push({
        slug: c.slug,
        conceptName: c.name,
        label: c.formula.label,
        latex: c.formula.latex,
      });
    }
    if (c.kind === "reference") {
      references.push({
        slug: c.slug,
        conceptName: c.name,
        table: c.table,
      });
    }
    for (const t of c.traps ?? []) {
      traps.push({ slug: c.slug, conceptName: c.name, title: t.title });
    }
  }

  return { formulas, traps, references };
}
