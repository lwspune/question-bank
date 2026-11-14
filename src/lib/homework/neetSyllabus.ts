/**
 * NEET's 2024 syllabus cut, for homework plans (2026-11-14). NMC's revised
 * syllabus dropped these chapters from NEET 2024 on, and the bank agrees: none
 * of them has more than one question from 2024 to 2026. Their older questions
 * stay out of a plan; a question from 2024 on stays in, because it was on a
 * current paper (the few there are test a topic still examined, filed under the
 * old chapter). Pure; spec tests/homework-neet-syllabus-cut.test.ts.
 */
export const NEET_CUT_CHAPTERS: ReadonlySet<string> = new Set([
  // Chemistry
  "States of Matter",
  "Solid State",
  "Surface Chemistry",
  "Hydrogen",
  "The s-Block Elements",
  "General Principles and Processes of Isolation of Elements",
  "Environmental Chemistry",
  "Polymers",
  "Chemistry in Everyday Life",
  // Botany
  "Transport in Plants",
  "Mineral Nutrition",
  // Zoology
  "Digestion and Absorption",
]);

const FIRST_YEAR_OF_NEW_SYLLABUS = 2024;

export function neetSyllabusCut<R extends { id: string; pyq_year: number; chapter: { name: string } | null }>(
  rows: R[]
): { kept: R[]; leftOut: { id: string; reason: string }[] } {
  const kept: R[] = [];
  const leftOut: { id: string; reason: string }[] = [];
  for (const r of rows) {
    const chapter = r.chapter?.name ?? "";
    if (NEET_CUT_CHAPTERS.has(chapter) && r.pyq_year < FIRST_YEAR_OF_NEW_SYLLABUS) {
      leftOut.push({ id: r.id, reason: `${chapter} left the NEET syllabus in 2024; this is a ${r.pyq_year} question` });
    } else kept.push(r);
  }
  return { kept, leftOut };
}
