import type { Slide, SubtopicNote } from "@/app/notes/_types";

/**
 * Derive the Present-mode slide deck from a SubtopicNote. Pure function.
 *
 * Slide order: title → why → (for each concept: intro → authored → pyq? → trap*) → drill.
 * Optional sections are skipped — minimum deck is title + drill.
 */
export function splitNoteIntoSlides(note: SubtopicNote): Slide[] {
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

    slides.push({
      kind: "authored-example",
      conceptName: c.name,
      example: c.authoredExample,
    });

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

    if (c.drillQuestionIds && c.drillQuestionIds.length > 0) {
      slides.push({
        kind: "concept-drill",
        conceptName: c.name,
        questionIds: c.drillQuestionIds,
      });
    }
  }

  slides.push({ kind: "drill", subtopicName: note.subtopicName });

  return slides;
}
