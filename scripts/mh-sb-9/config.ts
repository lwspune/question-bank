// Config for the MAHARASHTRA STATE BOARD Class-9 textbook-ingestion pipeline.
//
// Source: the Balbharati (Maharashtra State Board) Class 9 Mathematics textbooks —
// Part 1 (Algebra) + Part 2 (Geometry) — under SOURCE_ROOT. Born-digital PDFs with
// a clean PROSE text layer (~1500 ch/page) but unicode math (∈ ∪ ∩ √ ∴) that
// flattens to `�`, plus figures (Geometry-heavy Part 2). So extraction is a HYBRID:
// text-first for prose stems + MCQ options + prose solutions, VISION for math-dense
// stems / figures / truth-tables. Mirrors scripts/stateboard + scripts/ncert
// (render → transcribe → merge → commit).
//
// UNLIKE the Class-12 pipeline, the source is TWO WHOLE-BOOK PDFs (not pre-split
// per chapter), so every chapter sets `pages` (0-based) to its page range.
//
// The Class-9 book uses "Practice set N.M" (per-topic exercises) + one chapter-end
// "Problem Set N" (whose Q.1 is usually an MCQ block "Choose the correct
// alternative"). A chapter yields the same three buckets (see ../stateboard/lib.ts):
//   - solved              : worked examples in the theory (book's solution) → PUBLIC
//   - exercise-mcq        : the Problem-Set "choose the correct alternative" block
//   - exercise-subjective : Practice-set + Problem-set free-response (answer authored)
//
// The MATHS books ship an ANSWERS section at the back (Part1 p139-146 / Part2
// p134-138, 1-based) giving per-Practice-set FINAL answers + Problem-set MCQ keys —
// so for those chapters the step-6 answer-key cross-check gate is fully feasible
// (see `answersPdf`/`answerPages`). The HISTORY / POLITICAL SCIENCE book has NO
// answers section at all, so that gate cannot run there — see the block comment
// above those chapters before assuming a missing `answersPdf` is a mistake.
//
// Committed question_kind='practice', visibility='PRIVATE' (post-commit UPDATE).
// A textbook exercise corpus is not PYQ; Class-9 is not a board year, so there are
// no PYQ papers to follow. flip-public.ts flips solved examples + keyed MCQ +
// answered subjective.
import { join } from "node:path";

// LWS Pune org + admin (same identities as the practice / stateboard / ncert pipelines).
export { ORG_ID, CREATED_BY } from "../practice/config";
// Maharashtra State Board Class 9 exam (seeded 2026-07-17); Mathematics subject seeded alongside.
export const EXAM_ID = "2030d309-a3de-4b0f-abea-75cb1b21fb18";

export const SOURCE_ROOT = "C:\\Vilas\\LWS_Pune\\NDA_Subjects_Content\\Subjects\\State-Board\\01. 9th";
export const OUT = join(__dirname, "out"); // gitignored: rendered PNGs
export const DATA = join(__dirname, "data"); // committed: transcription (source of truth)

const PART1 = join(SOURCE_ROOT, "9th_Maths_Part1_SB.pdf"); // Algebra
const PART2 = join(SOURCE_ROOT, "9th_Maths_Part2_SB.pdf"); // Geometry
void PART2; // referenced by later (Geometry) chapters as they are added
// History AND Political Science ship as ONE physical book (108pp): History ch.1-10
// (printed pp 1-54) then Political Science ch.1-6 (printed pp 57-96), each with its
// own contents page. They are two separate BANK subjects (matching mh-ssc-10, where
// the board likewise prints one paper carrying both). Printed page N → 0-based PDF
// index N+9. Canonical chapter names below come from the book's own contents pages,
// NOT the pre-split `9th_Chapters/` folder names, which paraphrase (that folder's
// splits also drop the odd opener page, so we render from the whole book).
const HIST = join(SOURCE_ROOT, "9th_Hist_SB.pdf"); // History + Political Science

export type Chapter = {
  id: string; // slug → data/<id>.* + source_file
  chapterName: string; // DB chapter (auto-created on commit)
  subjectName: string; // DB subject (must exist — "Mathematics")
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup/rollback key)
  pdf: string; // absolute path to the whole-book PDF
  pages?: number[]; // 0-based page indices to render (the chapter's range)
  answersPdf?: string; // absolute path to the book PDF holding the ANSWERS section
  answerPages?: number[]; // 0-based page indices of this chapter's answer block (step-6)
  note: string; // questions.pyq_note
  // Canonical subtopics for this chapter — transcription maps each question to one.
  subtopics: string[];
};

const range = (startIncl: number, endIncl: number) =>
  Array.from({ length: endIncl - startIncl + 1 }, (_, i) => startIncl + i);

export const CHAPTERS: Record<string, Chapter> = {
  // ── Validation chapter — Ch.1 Sets (Part 1, Algebra). Low figure load (a few
  //    Venn diagrams). Pages 11-28 (1-based) → 0-based 10-27. Structure:
  //    Practice set 1.1 (writing sets / methods) · 1.2 (types, subsets, universal) ·
  //    1.3 (intersection & union) · 1.4 (number of elements — n(A∪B) word problems) ·
  //    Problem Set 1 (Q.1 = MCQ "choose the correct alternative" i-iv; Q.2+ subjective).
  //    Answers: Part1 p139-140 (1-based) → 0-based 138-139.
  "sets-9": {
    id: "sets-9",
    chapterName: "Sets",
    subjectName: "Mathematics",
    sourceFile: "StateBoard_09_Maths__Sets.pdf",
    pdf: PART1,
    pages: range(10, 27),
    answersPdf: PART1,
    answerPages: range(138, 139),
    note: "Maharashtra State Board (Class 9) — Sets (Balbharati textbook, Part 1 Algebra)",
    subtopics: [
      "Concept of a Set and Methods of Writing Sets",
      "Types of Sets",
      "Venn Diagrams",
      "Operations on Sets — Intersection and Union",
      "Number of Elements in a Set",
    ],
  },

  // ── History + Political Science (the 9th_Hist_SB.pdf book) ─────────────────
  //
  // ⚠ NO `answersPdf`/`answerPages` ON ANY CHAPTER BELOW, AND THAT IS NOT AN
  // OVERSIGHT: unlike both Maths books (and every Class-12 / NCERT chapter), this
  // textbook ships NO answers section anywhere in its 108 pages — verified by
  // scanning the full text layer. So the step-6 end-of-book answer-key cross-check
  // — the gate that has caught real errors on BOTH sides every time it has run —
  // simply cannot run here. Every MCQ key is DERIVED and every model answer is
  // AUTHORED, both grounded in the chapter's own prose (which, for recall-shaped
  // humanities questions, states the answer almost verbatim), then blind-re-derived
  // for MCQs and REVIEW-flagged throughout. Do not "restore" an answers reference.
  //
  // Structure per chapter: interleaved prose + inline activity boxes, ending in a
  // single "Exercises" block (Q.1 usually the "choose the correct option" MCQ set,
  // the rest free-response). There is NO solved-example bucket at all, so nothing
  // ships PUBLIC off the book's own working — every row needs an authored answer.
  // The chapter-end "Projects" and the inline "Try this / Let's do it! / Find out
  // and participate" boxes are DELIBERATELY NOT INGESTED: they are open-ended
  // activity prompts ("collect pictures of…", "get information from the internet")
  // with no determinate answer, so any model answer would be invented rather than
  // grounded. ~13 Projects + ~15 inline boxes across these five chapters.

  "sources-of-history-9": {
    id: "sources-of-history-9",
    chapterName: "Sources of History",
    subjectName: "History",
    sourceFile: "StateBoard_09_History__Sources_of_History.pdf",
    pdf: HIST,
    pages: range(10, 13), // printed pp 1-4; Exercises on p13
    note: "Maharashtra State Board (Class 9) — Sources of History (Balbharati textbook, History and Political Science)",
    subtopics: [
      "Written Sources",
      "Material Sources",
      "Oral Sources",
      "Audio-Visual Sources",
    ],
  },

  "events-after-1960-9": {
    id: "events-after-1960-9",
    chapterName: "India : Events after 1960",
    subjectName: "History",
    sourceFile: "StateBoard_09_History__Events_after_1960.pdf",
    pdf: HIST,
    pages: range(14, 18), // printed pp 5-9; Exercises on p18
    note: "Maharashtra State Board (Class 9) — India : Events after 1960 (Balbharati textbook, History and Political Science)",
    // The book narrates this chapter by decade, but the exercise questions cut
    // THEMATICALLY across decades (a wrong-pair item spans four Prime Ministers;
    // the Planning Commission question reaches back before 1960), so the subtopic
    // axis is thematic. "Science and Technology" is a book heading with zero
    // exercise questions → deliberately not a subtopic.
    subtopics: [
      "Political Leadership and Governments",
      "Wars and External Relations",
      "Economic Policy and Reforms",
      "Challenges and Strengths of Independent India",
    ],
  },

  "internal-challenges-9": {
    id: "internal-challenges-9",
    chapterName: "India's Internal Challenges",
    subjectName: "History",
    sourceFile: "StateBoard_09_History__Internal_Challenges.pdf",
    pdf: HIST,
    pages: range(19, 23), // printed pp 10-14; Exercises on p23
    note: "Maharashtra State Board (Class 9) — India's Internal Challenges (Balbharati textbook, History and Political Science)",
    // 1:1 with the book's own section headings. This chapter has NO MCQ block.
    subtopics: [
      "The Unrest in Punjab",
      "Issues Concerning North-East India",
      "Communalism",
      "Naxalism",
      "Regionalism",
    ],
  },

  "post-ww-political-developments-9": {
    id: "post-ww-political-developments-9",
    chapterName: "Post World War Political Developments",
    subjectName: "Political Science",
    sourceFile: "StateBoard_09_PolSci__Post_World_War_Political_Developments.pdf",
    pdf: HIST,
    pages: range(66, 73), // printed pp 57-64; Exercises span p72-73
    note: "Maharashtra State Board (Class 9) — Post World War Political Developments (Balbharati textbook, History and Political Science)",
    // "Creation of Military / Regional Organisations" is a book heading with zero
    // exercise questions → folded into the international-system subtopic.
    subtopics: [
      "The World Wars and the International System",
      "The Cold War and Bipolarisation",
      "Non-alignment and the Non-Aligned Movement",
      "End of the Cold War and Globalisation",
    ],
  },

  "foreign-policy-9": {
    id: "foreign-policy-9",
    chapterName: "India's Foreign Policy",
    subjectName: "Political Science",
    sourceFile: "StateBoard_09_PolSci__Indias_Foreign_Policy.pdf",
    pdf: HIST,
    pages: range(74, 80), // printed pp 65-71; Exercises span p79-80
    note: "Maharashtra State Board (Class 9) — India's Foreign Policy (Balbharati textbook, History and Political Science)",
    subtopics: [
      "Meaning, Importance and National Interest",
      "Factors Influencing Foreign Policy",
      "Objectives and Principles of India's Foreign Policy",
      "India's Foreign Policy — Phases and Nuclear Policy",
    ],
  },
};

export const questionsJsonPath = (id: string) => join(DATA, `${id}.questions.json`);

export function requireChapter(id: string | undefined): Chapter {
  if (!id || !CHAPTERS[id]) {
    throw new Error(`unknown chapter "${id}". Known: ${Object.keys(CHAPTERS).join(", ")}`);
  }
  return CHAPTERS[id];
}
