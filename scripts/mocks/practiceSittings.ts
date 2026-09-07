/**
 * The PRACTICE-mock registry: full-length papers ASSEMBLED from the bank rather
 * than sat at a real sitting (migration 0088 — `source='practice'`, `scope='full'`).
 *
 * WHY THESE ARE NOT DISCOVERABLE FROM THE BANK, unlike every PYQ family. A PYQ
 * mock is found by asking the corpus a question — which (year, month) sittings
 * exist (NDA), or which `source_file`s (CDS/NEET/MHT-CET), or which row BLOCKS
 * within one (JEE). A practice mock has no sitting to discover and its questions
 * are scattered across dozens of unrelated `source_file`s, so the paper exists
 * only as an ordered LIST of question identities. That list is the artifact.
 *
 * WHERE THE LIST COMES FROM. Each paper was run through the /lws-test-ingest
 * dedup gate (see .claude/commands/lws-test-ingest.md): every printed question
 * was matched against the live bank, giving `{n, verdict, bankId}` per question.
 * The NDA2_2026 series turned out to be ~98% already present (585 of 600), so a
 * paper is overwhelmingly a re-assembly of rows the bank already holds — the
 * "bank-mirrored" case. The handful that are genuinely new are committed as
 * practice rows first and resolved here by their own source_file + question
 * number.
 *
 * ORDERING. `buildMockPaper` sorts within a section by `PaperQuestionRow.sourceRow`,
 * which for a PYQ paper is the row's position in its source file. That is
 * MEANINGLESS here — an assembled paper draws on 40+ files with overlapping row
 * numbers, so those keys collide and `validatePaperRows` would reject the paper
 * as ambiguous. The printed question number IS this paper's ordering key, so the
 * builder sets `sourceRow = n`. No change to the pure core.
 */

/** One printed question: either a row the bank already holds, or a new one. */
export type PracticeQuestionRef =
  /** Mirrors an existing bank row (the dedup gate's DUP/MAYBE verdicts). */
  | { n: number; kind: "bank"; questionId: string }
  /** A row this ingest committed, addressed by its own source_file + number. */
  | { n: number; kind: "new"; sourceFile: string; questionNumber: number };

export type PracticeSitting = {
  /** Registry key, also matched by `--only`. */
  key: string;
  /** Mock slug — `nda-practice-maths-01`. The `practice` segment is what keeps
   *  this out of the PYQ slug namespace: a year can never be that literal, so
   *  slugToUuid() cannot collide with a real sitting's id. */
  slug: string;
  /** Student-facing title. Deliberately NOT the source's own name — those are
   *  internal build labels ("MATHS MOCK TEST-1", "Mock TEST 5 MATHS") that are
   *  inconsistent with each other and name neither the exam nor the paper. */
  title: string;
  /** Exam slug + paper code, resolved against the blueprint registry. */
  examSlug: string;
  paperCode: string;
  /** questions.pyq_note — provenance. */
  note: string;
  /** The printed paper, in printed order. */
  questions: PracticeQuestionRef[];
  /** KNOWN not to reconstruct whole — the reason. An ASSERTION, not a mute:
   *  the build is still attempted and a hold whose paper now reconstructs is
   *  reported as a failure telling you to delete the line. */
  hold?: string;
};

/**
 * The LWS NDA-II 2026 Maths test series — five 120-question papers.
 *
 * Source PDFs are outside the repo (`C:\Vilas\LWS_Pune\NDA_Subjects_Content\
 * Test_Series\NDA2_2026`), which is why the question LIST is committed here:
 * it is the only artifact that survives the source moving.
 *
 * Titles are student-facing per the naming decision — "NDA Paper I — Practice
 * Mock N" says the exam, the paper and what kind of test it is, none of which
 * the printed names do.
 */
export const NDA2_2026_TITLE = (n: number) => `NDA Paper I — Practice Mock ${n}`;

/** Provenance for every row and mock of this series. */
export const NDA2_2026_NOTE =
  "NDA Mathematics practice — LWS NDA-II 2026 test series (assembled paper, not a past sitting)";
