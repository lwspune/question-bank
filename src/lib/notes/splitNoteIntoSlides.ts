import type { Slide, SubtopicNote } from "@/app/notes/_types";

/**
 * Derive the Present-mode slide deck from a SubtopicNote. Pure function.
 *
 * Per-concept slide order:
 *   intro → visualization? → authored → faded? → self-check? → pyq? → trap* → concept-drill?
 *
 * Outer order: title → why? → [concepts] → drill. Optional sections are
 * skipped; minimum deck is title + drill.
 *
 * `drillsByConcept` is the runtime overlay from Phase 2 — for each concept slug,
 * a list of question UUIDs sourced from `question_concept_tags` at request time
 * (via `loadResolvedDrills`). Concepts missing from the map (or with empty arrays)
 * silently skip their concept-drill slide. Pass `new Map()` when DB data isn't
 * available (tests, fallback rendering).
 */
export function splitNoteIntoSlides(
  note: SubtopicNote,
  drillsByConcept: Map<string, string[]>
): Slide[] {
  const slides: Slide[] = [];

  slides.push({
    kind: "title",
    title: note.title,
    definition: note.oneLineDefinition,
  });

  if (note.whyItMatters.trim().length > 0) {
    slides.push({ kind: "why", whyItMatters: note.whyItMatters });
  }

  for (const c of note.concepts) {
    slides.push({
      kind: "concept-intro",
      conceptName: c.name,
      intuition: c.intuition,
      definition: c.definition,
      formula: c.formula,
    });

    if (c.visualizationSlug) {
      slides.push({
        kind: "visualization",
        conceptName: c.name,
        slug: c.visualizationSlug,
      });
    }

    slides.push({
      kind: "authored-example",
      conceptName: c.name,
      example: c.authoredExample,
    });

    if (c.fadedExample) {
      slides.push({
        kind: "faded-example",
        conceptName: c.name,
        example: c.fadedExample,
      });
    }

    if (c.selfCheckExample) {
      slides.push({
        kind: "self-check",
        conceptName: c.name,
        example: c.selfCheckExample,
      });
    }

    if (c.pyqExampleId) {
      slides.push({
        kind: "pyq-example",
        conceptName: c.name,
        exampleId: c.pyqExampleId,
      });
    }

    for (const t of c.traps ?? []) {
      slides.push({ kind: "trap", conceptName: c.name, trap: t });
    }

    const conceptDrillIds = drillsByConcept.get(c.slug);
    if (conceptDrillIds && conceptDrillIds.length > 0) {
      slides.push({
        kind: "concept-drill",
        conceptName: c.name,
        questionIds: conceptDrillIds,
      });
    }
  }

  slides.push({ kind: "drill", subtopicName: note.subtopicName });

  return slides;
}
