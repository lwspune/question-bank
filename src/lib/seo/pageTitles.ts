/**
 * Titles for the DB-driven page families (/questions and /board chapters). The
 * names come from the database, so these are pure functions the pages call and
 * tests/seo-page-titles.test.ts pins with the longest real names. Rules:
 * src/lib/seo/title.ts.
 *
 * Both use the exam's registry `displayName` ("MH HSC 12"), not the DB
 * `examName` ("Maharashtra HSC Class 12"), because the long form alone ate a
 * third of the 70-character budget. Callers pass the registry name and fall
 * back to the DB name for an exam the registry does not know.
 *
 * The SUBJECT is the first thing to give way, and the chapter name is never cut
 * at a colon: sibling chapters share prefixes ("Mechanical Properties of
 * Fluids" / "…of Solids", "Historiography: …" twice), and on 2026-09-27 trimming
 * the chapter to make room for the subject gave 10 pairs of pages one title.
 * The URL and the page already name the subject; the chapter is what differs.
 */
import { fitTitle } from "@/lib/seo/title";

/**
 * Chapter + exam + (subject) + page type. Tries each page-type wording, longest
 * first, and takes the first that keeps the WHOLE chapter name; if none does,
 * the shortest wording with the chapter trimmed.
 */
function chapterTitle(chapterName: string, examDisplay: string, subjectName: string, pageTypes: string[]): string {
  let t = "";
  for (const pageType of pageTypes) {
    t = fitTitle(chapterName, [examDisplay, { text: subjectName, optional: true }, pageType], { shortenLead: false });
    if (t.startsWith(chapterName)) return t;
  }
  return t;
}

/** /questions/<exam>/<subject>/<chapter> */
export function questionsLandingTitle(p: {
  chapterName: string;
  examDisplay: string;
  subjectName: string;
  practiceOnly: boolean;
}): string {
  return chapterTitle(p.chapterName, p.examDisplay, p.subjectName, p.practiceOnly ? ["Practice Questions", "Questions"] : ["PYQs"]);
}

/**
 * /board/<exam>/<subject>/<chapter>. Names the board: before 2026-09-27 the
 * title carried only the subject, so e.g. "Matrices" in CBSE 12 and MH HSC 12
 * shared one title.
 */
export function boardChapterTitle(p: { chapterName: string; examDisplay: string; subjectName: string }): string {
  return chapterTitle(p.chapterName, p.examDisplay, p.subjectName, ["Textbook Solutions", "Solutions"]);
}
