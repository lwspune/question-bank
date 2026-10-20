/**
 * Pure core of scripts/imat/subtopics.ts. Spec: tests/imat-subtopics.test.ts.
 *
 * IMAT's DB subtopics are derived from the notes registry, never typed: a
 * notes page finds its subtopic by (subject, chapter, subtopicName), so the
 * names must be the notes' own.
 */
import type { NotesChapterRegistration } from "../../src/lib/notes/chapters";

export type PlannedSubtopic = {
  subject: string;
  chapter: string;
  /** The notes subtopic slug; the key an assignment file uses. */
  slug: string;
  /** `subtopics.name`, equal to the note's `subtopicName`. */
  name: string;
  orderIndex: number;
};

export type TwinRef = { id: string; subject: string; chapter: string };

export function subtopicPlan(chapters: readonly NotesChapterRegistration[]): PlannedSubtopic[] {
  return chapters.flatMap((c) =>
    c.chapter.subtopicOrder.map((slug, orderIndex) => {
      const note = c.notes[slug];
      if (!note) throw new Error(`${c.chapter.chapterName}: no note for subtopic "${slug}"`);
      return { subject: c.subjectName, chapter: c.chapter.chapterName, slug, name: note.subtopicName, orderIndex };
    })
  );
}

/** Every problem with an assignment file ({ questionId: subtopicSlug }); empty when it is sound. */
export function checkAssignments(
  plan: readonly PlannedSubtopic[],
  twins: readonly TwinRef[],
  assignments: Readonly<Record<string, string>>
): string[] {
  const problems: string[] = [];
  const twinIds = new Set(twins.map((t) => t.id));
  for (const t of twins) {
    const slug = assignments[t.id];
    if (slug === undefined) {
      problems.push(`${t.id}: not assigned`);
      continue;
    }
    if (!plan.some((p) => p.slug === slug && p.subject === t.subject && p.chapter === t.chapter)) {
      problems.push(`${t.id}: "${slug}" is not a subtopic of ${t.subject} / ${t.chapter}`);
    }
  }
  for (const id of Object.keys(assignments)) {
    if (!twinIds.has(id)) problems.push(`${id}: not an IMAT twin`);
  }
  return problems;
}
