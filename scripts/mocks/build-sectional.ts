/**
 * Build CHAPTER TESTS — sectional mocks (migration 0088: `source='pyq'`,
 * `scope='sectional'`, no year), for every exam in EXAMS below.
 *
 *   npx tsx scripts/mocks/build-sectional.ts --exam=nda --plan              # choose questions, write data/nda-sectional.json
 *   npx tsx scripts/mocks/build-sectional.ts --exam=nda                     # dry run from the committed plan
 *   npx tsx scripts/mocks/build-sectional.ts --exam=nda --apply             # write the rows as DRAFTS
 *   npx tsx scripts/mocks/build-sectional.ts --exam=nda --apply --publish   # write the rows, published
 *   npx tsx scripts/mocks/build-sectional.ts --exam=nda --only=<slug>
 *
 * `--exam` is one of mht-cet (the default, so the original runbook still
 * works), nda, cds, jee-mains, cbse-12, mh-hsc-12, mh-ssc-10, and the MPSC
 * exams by slug (mpsc-group-b-c, mpsc-state-services-prelims, mpsc-aso-mains,
 * mpsc-sti-mains, mpsc-psi-mains, mpsc-state-services-mains,
 * mpsc-group-b-combined-mains).
 *
 * BOARD EXAMS (2026-10-05) differ in three ways. They take textbook MCQs
 * (`question_kind='practice'`) beside the board's past-year ones, since a
 * board chapter has too few of either alone. They take a question whose
 * context is only an instruction ("Choose the correct option.") as a loose
 * question; see src/lib/mocks/instructionContext.ts. And they list in textbook
 * order. A test with any textbook question is stored as `source='practice'`.
 *
 * TWO STEPS, and the split is the point. `--plan` asks the bank which
 * questions each chapter test should carry (src/lib/mocks/sectional.ts) and
 * COMMITS the answer as data. The build step reads that file and nothing else,
 * so a later ingest or re-cut cannot reshuffle a test students have already
 * sat. Re-running `--plan` keeps every test already in the file and only adds
 * chapters that are new (appended at the end of their subject), so the slugs,
 * and with them the mock ids and every attempt, stay put.
 *
 * TWO KINDS OF SUBJECT. Most take loose questions (pickSectionalQuestions).
 * English takes WHOLE SETS (pickSectionalSets): every NDA and CDS English
 * question belongs to a set sharing a passage or a block of directions, and
 * each question stores that text in its own `context`, so a set renders in the
 * runner as it did on the paper, provided all of it is there.
 *
 * THE GATE. A mock stores question refs and renders them live through the
 * RLS-bound client, so a PRIVATE or deleted row does not error: the student
 * sees a blank question and it scores as skipped. The build step therefore
 * re-asserts, per question: PUBLIC, a past-year question, markable (a
 * four-option MCQ with exactly one correct option, or a numeric question with
 * its answer), still in the planned chapter, and, for a loose subject, not
 * tied to a shared context. For a set subject it asserts instead that every
 * PUBLIC member of each set is in the test. A test with any failure is refused
 * whole.
 *
 * Writes via the service-role client (bypasses RLS by design, as every builder).
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  CDS_ENGLISH_PAPER,
  CDS_GK_PAPER,
  CDS_MATHS_PAPER,
  CBSE_12_CHAPTER_MCQ_PAPER,
  JEE_MAINS_PAPER,
  MH_HSC_12_CHAPTER_MCQ_PAPER,
  MH_SSC_10_CHAPTER_MCQ_PAPER,
  MH_SSC_10_HUMANITIES_MCQ_PAPER,
  MHT_CET_MATHS_PAPER,
  MHT_CET_PHY_CHEM_PAPER,
  MPSC_GBC_PAPER,
  MPSC_SSP_GS1_PAPER,
  NDA_GAT_PAPER,
  NDA_MATHS_PAPER,
  type MockPaperBlueprint,
} from "../../src/lib/mocks/blueprints";
import type { MockAnswerKey, OptionLabel } from "../../src/lib/mocks/answers";
import { buildMockPaper, type PaperQuestionRow } from "../../src/lib/mocks/reconstruct";
import { mockTestRow } from "../../src/lib/mocks/row";
import {
  isSectionalEligible,
  orderChapters,
  orderChaptersByBook,
  pickSectionalQuestions,
  pickSectionalSets,
  sectionalBlueprint,
  sectionalSize,
  sectionalSlug,
  sectionalSource,
  sectionalTitle,
  type SectionalCandidate,
  type SectionalDifficulty,
  type SectionalSet,
} from "../../src/lib/mocks/sectional";
import { isInstructionOnlyContext } from "../../src/lib/mocks/instructionContext";
import { MAINS_EXAM_SLUG, mainsChapterBlueprint } from "./mpscMainsSittings";
import { EXAMS as MAINS_EXAMS, type ExamKey as MainsExamKey } from "../mpsc-mains/config";
import { PLAYBOOKS as MATHS_PLAYBOOKS } from "../../src/app/guide/mht-cet-maths/_data/playbooks";
import { PLAYBOOKS as PHYSICS_PLAYBOOKS } from "../../src/app/guide/mht-cet-physics/_data/playbooks";
import { PLAYBOOKS as CHEMISTRY_PLAYBOOKS } from "../../src/app/guide/mht-cet-chemistry/_data/playbooks";
import { PLAYBOOKS as CDS_MATHS_PLAYBOOKS } from "../../src/app/guide/cds-maths/_data/playbooks";
import { CHAPTER_TABLE as JEE_MATHS_TABLE } from "../../src/app/guide/jee-mains-maths/_data/jee-mains-maths";
import { CHAPTER_TABLE as JEE_PHYSICS_TABLE } from "../../src/app/guide/jee-mains-physics/_data/jee-mains-physics";
import { CHAPTER_TABLE as JEE_CHEMISTRY_TABLE } from "../../src/app/guide/jee-mains-chemistry/_data/jee-mains-chemistry";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

/** One subject of an exam that gets chapter tests. */
type SubjectPlan = {
  /** Bank subject name — MHT-CET's and JEE's is "Maths", not "Mathematics". */
  bankSubject: string;
  /** Slug segment, e.g. "maths". */
  code: string;
  paper: MockPaperBlueprint;
  sectionKey: string;
  /** The test's section name when it differs from the paper's (a GK subject). */
  label?: string;
  /** Recent questions per paper by chapter — the catalogue order. Empty = by pool size. */
  weights: Map<string, number>;
  /** "sets" = build from whole sets (English). Default: loose questions. */
  mode?: "sets";
  /** Chapters the exam no longer asks; they get no test. */
  retired?: Set<string>;
  /**
   * The textbook's chapter order, where the bank's `chapters.order_index` is
   * ingestion order instead (CBSE 12 and MH HSC 12 Physics and Chemistry,
   * 2026-10-05). Copied from the source PDFs' own numbering in
   * scripts/ncert/config.ts and scripts/stateboard/config.ts.
   */
  chapterOrder?: string[];
};

type QuestionKind = "pyq" | "practice";

/** One exam's chapter tests. */
type ExamPlan = {
  examName: string;
  examSlug: string;
  /** The exam's name in a test title when shorter than the DB name: "MH SSC 10". */
  titleName?: string;
  /** Which question kinds a test may draw on. Boards add textbook MCQs. */
  kinds: QuestionKind[];
  /** Take a question whose context is only an instruction as a loose question. */
  looseInstructions: boolean;
  /** List chapters in textbook order rather than by weight or pool size. */
  bookOrder: boolean;
  dataFile: string;
  /** The smallest pool that gets a test: 30 (15 questions) or 20 (10 questions). */
  minPool: number;
  /** Count a question with no difficulty rating as MODERATE rather than skip it. */
  unratedAsModerate: boolean;
  /** Share of a loose test given to numeric questions (JEE: 5 of 25). */
  numericShare: number;
  subjects: SubjectPlan[];
};

const weightsOf = (p: { chapter: string; qPerPaper: number }[]) =>
  new Map(p.map((x) => [x.chapter, x.qPerPaper]));
const recentWeightsOf = (t: { chapter: string; recentPerPaper: number }[]) =>
  new Map(t.map((x) => [x.chapter, x.recentPerPaper]));
const NONE = new Map<string, number>();

/**
 * JEE chapters the 2025-26 papers barely ask (under 0.15 questions a paper on
 * the guide's own grid): the syllabus cut of 2024 (Mathematical Reasoning,
 * Communication Systems, Hydrogen, Surface Chemistry, ...). A test on one would
 * drill a topic the exam has dropped. Same reason Current Affairs is left out.
 */
const RECENT_FLOOR = 0.15;
const retiredOf = (t: { chapter: string; recentPerPaper: number }[]) =>
  new Set(t.filter((x) => x.recentPerPaper < RECENT_FLOOR).map((x) => x.chapter));
const dataFile = (slug: string) => join(__dirname, "data", `${slug}-sectional.json`);

/** NCERT Class 12 Physics, Parts 1 and 2 (Part 2 restarts at 01: Ray Optics is chapter 9). */
const NCERT_12_PHYSICS = [
  "Electric Charges and Fields",
  "Electrostatic Potential and Capacitance",
  "Current Electricity",
  "Moving Charges and Magnetism",
  "Magnetism and Matter",
  "Electromagnetic Induction",
  "Alternating Current",
  "Electromagnetic Waves",
  "Ray Optics and Optical Instruments",
  "Wave Optics",
  "Dual Nature of Radiation and Matter",
  "Atoms",
  "Nuclei",
  "Semiconductor Electronics: Materials, Devices and Simple Circuits",
];
const NCERT_12_CHEMISTRY = [
  "Solutions",
  "Electrochemistry",
  "Chemical Kinetics",
  "The d-and f-Block Elements",
  "Coordination Compounds",
  "Haloalkanes and Haloarenes",
  "Alcohols, Phenols and Ethers",
  "Aldehydes, Ketones and Carboxylic Acids",
  "Amines",
  "Biomolecules",
];
const BALBHARATI_12_PHYSICS = [
  "Rotational Dynamics",
  "Mechanical Properties of Fluids",
  "Kinetic Theory of Gases and Radiation",
  "Thermodynamics",
  "Oscillations",
  "Superposition of Waves",
  "Wave Optics",
  "Electrostatics",
  "Current Electricity",
  "Magnetic Fields due to Electric Current",
  "Magnetic Materials",
  "Electromagnetic Induction",
  "AC Circuits",
  "Dual Nature of Radiation and Matter",
  "Structure of Atoms and Nuclei",
  "Semiconductor Devices",
];
const BALBHARATI_12_CHEMISTRY = [
  "Solid State",
  "Solutions",
  "Ionic Equilibria",
  "Chemical Thermodynamics",
  "Electrochemistry",
  "Chemical Kinetics",
  "Elements of Groups 16, 17 and 18",
  "Transition and Inner Transition Elements",
  "Coordination Compounds",
  "Halogen Derivatives",
  "Alcohols, Phenols and Ethers",
  "Aldehydes, Ketones and Carboxylic Acids",
  "Amines",
  "Biomolecules",
  "Introduction to Polymer Chemistry",
  "Green Chemistry and Nanochemistry",
];

/**
 * The GK subjects of NDA and CDS. Current Affairs is left out on purpose
 * (owner, 2026-10-05): its questions go stale, so a chapter test on them
 * would teach yesterday's news.
 */
const GK_SUBJECTS = [
  ["Physics", "physics"],
  ["Chemistry", "chemistry"],
  ["Biology", "biology"],
  ["History", "history"],
  ["Geography", "geography"],
  ["Polity", "polity"],
  ["Economics", "economics"],
] as const;

const gkSubjects = (paper: MockPaperBlueprint, sectionKey: string): SubjectPlan[] =>
  GK_SUBJECTS.map(([bankSubject, code]) => ({
    bankSubject, code, paper, sectionKey, label: bankSubject, weights: NONE,
  }));

/**
 * An MPSC prelims paper prints one section across every subject, so each
 * subject's test carries its own label (the GK pattern). Current Affairs is
 * left out for the same reason as on NDA and CDS.
 */
const mpscPrelimsSubjects = (paper: MockPaperBlueprint, sectionKey: string): SubjectPlan[] =>
  paper.sections[0].subjects
    .filter((s) => s !== "Current Affairs")
    .map((bankSubject) => ({
      bankSubject,
      code: bankSubject.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      paper,
      sectionKey,
      label: bankSubject,
      weights: NONE,
    }));

const mpscPrelims = (paper: MockPaperBlueprint, sectionKey: string, titleName: string): ExamPlan => ({
  examName: paper.examName,
  examSlug: paper.examSlug,
  titleName,
  kinds: ["pyq"],
  looseInstructions: false,
  bookOrder: false,
  dataFile: dataFile(paper.examSlug),
  minPool: 20,
  unratedAsModerate: true,
  numericShare: 0,
  subjects: mpscPrelimsSubjects(paper, sectionKey),
});

/**
 * MPSC Mains language papers, one exam row each. Comprehension gets no test:
 * its passage questions carry the passage in `context` but no `set_id`, so
 * they cannot be kept together as a set.
 */
const mpscMains = (exam: MainsExamKey): ExamPlan => {
  const paper = mainsChapterBlueprint(exam);
  return {
    examName: MAINS_EXAMS[exam].name,
    examSlug: MAINS_EXAM_SLUG[exam],
    kinds: ["pyq"],
    looseInstructions: false,
    bookOrder: false,
    dataFile: dataFile(MAINS_EXAM_SLUG[exam]),
    minPool: 20,
    unratedAsModerate: true,
    numericShare: 0,
    subjects: [
      { bankSubject: "Marathi", code: "marathi", paper, sectionKey: "language", label: "Marathi", weights: NONE },
      { bankSubject: "English", code: "english", paper, sectionKey: "language", label: "English", weights: NONE },
    ],
  };
};

const EXAMS: Record<string, ExamPlan> = {
  // The first chapter tests (2026-09-30). Its rules are frozen: a re-plan with
  // a lower floor or unrated rows would add tests to a running experiment.
  "mht-cet": {
    examName: "MHT-CET",
    examSlug: "mht-cet",
    kinds: ["pyq"],
    looseInstructions: false,
    bookOrder: false,
    dataFile: dataFile("mht-cet"),
    minPool: 30,
    unratedAsModerate: false,
    numericShare: 0,
    subjects: [
      { bankSubject: "Maths", code: "maths", paper: MHT_CET_MATHS_PAPER, sectionKey: "mathematics", weights: weightsOf(MATHS_PLAYBOOKS) },
      { bankSubject: "Physics", code: "physics", paper: MHT_CET_PHY_CHEM_PAPER, sectionKey: "physics", weights: weightsOf(PHYSICS_PLAYBOOKS) },
      { bankSubject: "Chemistry", code: "chemistry", paper: MHT_CET_PHY_CHEM_PAPER, sectionKey: "chemistry", weights: weightsOf(CHEMISTRY_PLAYBOOKS) },
    ],
  },
  nda: {
    examName: "NDA",
    examSlug: "nda",
    kinds: ["pyq"],
    looseInstructions: false,
    bookOrder: false,
    dataFile: dataFile("nda"),
    minPool: 20,
    unratedAsModerate: true,
    numericShare: 0,
    subjects: [
      { bankSubject: "Mathematics", code: "maths", paper: NDA_MATHS_PAPER, sectionKey: "mathematics", weights: NONE },
      { bankSubject: "English", code: "english", paper: NDA_GAT_PAPER, sectionKey: "english", weights: NONE, mode: "sets" },
      ...gkSubjects(NDA_GAT_PAPER, "gk"),
    ],
  },
  cds: {
    examName: "CDS",
    examSlug: "cds",
    kinds: ["pyq"],
    looseInstructions: false,
    bookOrder: false,
    dataFile: dataFile("cds"),
    minPool: 20,
    unratedAsModerate: true,
    numericShare: 0,
    subjects: [
      { bankSubject: "Mathematics", code: "maths", paper: CDS_MATHS_PAPER, sectionKey: "mathematics", weights: weightsOf(CDS_MATHS_PLAYBOOKS) },
      { bankSubject: "English", code: "english", paper: CDS_ENGLISH_PAPER, sectionKey: "english", weights: NONE, mode: "sets" },
      ...gkSubjects(CDS_GK_PAPER, "general-knowledge"),
    ],
  },
  "jee-mains": {
    examName: "JEE Mains",
    examSlug: "jee-mains",
    kinds: ["pyq"],
    looseInstructions: false,
    bookOrder: false,
    dataFile: dataFile("jee-mains"),
    minPool: 20,
    unratedAsModerate: true,
    // The paper prints 20 MCQs and 5 numeric per subject.
    numericShare: 0.2,
    subjects: [
      { bankSubject: "Physics", code: "physics", paper: JEE_MAINS_PAPER, sectionKey: "physics", weights: recentWeightsOf(JEE_PHYSICS_TABLE), retired: retiredOf(JEE_PHYSICS_TABLE) },
      { bankSubject: "Chemistry", code: "chemistry", paper: JEE_MAINS_PAPER, sectionKey: "chemistry", weights: recentWeightsOf(JEE_CHEMISTRY_TABLE), retired: retiredOf(JEE_CHEMISTRY_TABLE) },
      { bankSubject: "Maths", code: "maths", paper: JEE_MAINS_PAPER, sectionKey: "maths", weights: recentWeightsOf(JEE_MATHS_TABLE), retired: retiredOf(JEE_MATHS_TABLE) },
    ],
  },

  // Board chapter tests (2026-10-05): textbook and board MCQs together, a
  // 10-question floor (owner: a 10-question test is big enough), book order.
  "cbse-12": {
    examName: "CBSE Class 12",
    examSlug: "cbse-12",
    kinds: ["pyq", "practice"],
    looseInstructions: true,
    bookOrder: true,
    dataFile: dataFile("cbse-12"),
    minPool: 10,
    unratedAsModerate: true,
    numericShare: 0,
    subjects: [
      { bankSubject: "Physics", code: "physics", paper: CBSE_12_CHAPTER_MCQ_PAPER, sectionKey: "physics", weights: NONE, chapterOrder: NCERT_12_PHYSICS },
      { bankSubject: "Chemistry", code: "chemistry", paper: CBSE_12_CHAPTER_MCQ_PAPER, sectionKey: "chemistry", weights: NONE, chapterOrder: NCERT_12_CHEMISTRY },
      { bankSubject: "Mathematics", code: "maths", paper: CBSE_12_CHAPTER_MCQ_PAPER, sectionKey: "mathematics", weights: NONE },
      // Added 2026-10-08 with the Biology board papers. The bank's order_index
      // is already NCERT book order here. The [Outdated] chapter holds content
      // the rationalised book dropped, so it gets no test.
      { bankSubject: "Biology", code: "biology", paper: CBSE_12_CHAPTER_MCQ_PAPER, sectionKey: "biology", weights: NONE, retired: new Set(["Organism and its Environment [Outdated]"]) },
    ],
  },
  "mh-hsc-12": {
    examName: "Maharashtra HSC Class 12",
    examSlug: "mh-hsc-12",
    titleName: "MH HSC 12",
    kinds: ["pyq", "practice"],
    looseInstructions: true,
    bookOrder: true,
    dataFile: dataFile("mh-hsc-12"),
    minPool: 10,
    unratedAsModerate: true,
    numericShare: 0,
    // Geography is left out: none of its 8 chapters has 10 MCQs (2026-10-05).
    subjects: [
      { bankSubject: "Physics", code: "physics", paper: MH_HSC_12_CHAPTER_MCQ_PAPER, sectionKey: "physics", weights: NONE, chapterOrder: BALBHARATI_12_PHYSICS },
      { bankSubject: "Chemistry", code: "chemistry", paper: MH_HSC_12_CHAPTER_MCQ_PAPER, sectionKey: "chemistry", weights: NONE, chapterOrder: BALBHARATI_12_CHEMISTRY },
      { bankSubject: "Mathematics", code: "maths", paper: MH_HSC_12_CHAPTER_MCQ_PAPER, sectionKey: "mathematics", weights: NONE },
    ],
  },
  "mh-ssc-10": {
    examName: "Maharashtra State Board Class 10",
    examSlug: "mh-ssc-10",
    titleName: "MH SSC 10",
    kinds: ["pyq", "practice"],
    looseInstructions: true,
    bookOrder: true,
    dataFile: dataFile("mh-ssc-10"),
    minPool: 10,
    unratedAsModerate: true,
    numericShare: 0,
    subjects: [
      { bankSubject: "Algebra", code: "algebra", paper: MH_SSC_10_CHAPTER_MCQ_PAPER, sectionKey: "algebra", weights: NONE },
      { bankSubject: "Geometry", code: "geometry", paper: MH_SSC_10_CHAPTER_MCQ_PAPER, sectionKey: "geometry", weights: NONE },
      { bankSubject: "Science and Technology I", code: "science-1", paper: MH_SSC_10_CHAPTER_MCQ_PAPER, sectionKey: "science-1", weights: NONE },
      { bankSubject: "Science and Technology II", code: "science-2", paper: MH_SSC_10_CHAPTER_MCQ_PAPER, sectionKey: "science-2", weights: NONE },
      { bankSubject: "History", code: "history", paper: MH_SSC_10_HUMANITIES_MCQ_PAPER, sectionKey: "history", weights: NONE },
      { bankSubject: "Political Science", code: "political-science", paper: MH_SSC_10_HUMANITIES_MCQ_PAPER, sectionKey: "political-science", weights: NONE },
      { bankSubject: "Geography", code: "geography", paper: MH_SSC_10_HUMANITIES_MCQ_PAPER, sectionKey: "geography", weights: NONE },
    ],
  },

  // MPSC (2026-10-06): the NDA/CDS rules (20-question floor, no Current
  // Affairs). Prelims tests are bilingual, as the exam is.
  "mpsc-group-b-c": mpscPrelims(MPSC_GBC_PAPER, "general-ability", "MPSC Group B & C"),
  "mpsc-state-services-prelims": mpscPrelims(MPSC_SSP_GS1_PAPER, "general-studies", "MPSC State Services Prelims"),
  "mpsc-aso-mains": mpscMains("aso"),
  "mpsc-sti-mains": mpscMains("sti"),
  "mpsc-psi-mains": mpscMains("psi"),
  "mpsc-state-services-mains": mpscMains("ssm"),
  "mpsc-group-b-combined-mains": mpscMains("grpb"),
};

/** One committed chapter test. */
type PlannedTest = {
  slug: string;
  title: string;
  examSlug: string;
  paperCode: string;
  sectionKey: string;
  subject: string;
  chapter: string;
  chapterId: string;
  /** In sitting order. */
  questionIds: string[];
};

const CHUNK = 200; // `.in()` puts its filter in the URL; PostgREST 400s past ~200 ids.
const PAGE = 1000; // PostgREST's silent row cap.

type BankRow = {
  id: string;
  visibility: string;
  question_kind: string;
  question_format: string | null;
  numeric_answer: number | string | null;
  difficulty: SectionalDifficulty | null;
  set_id: string | null;
  context: string | null;
  pyq_year: number | null;
  pyq_month: number | null;
  source_row: number | null;
  question_number: string | null;
  chapter_id: string;
  chapter: { name: string; order_index: number | null; subject: { name: string } | null } | null;
  subtopic: { name: string } | null;
  options: { label: string; is_correct: boolean }[];
};

const SELECT =
  "id, visibility, question_kind, question_format, numeric_answer, difficulty, set_id, context, " +
  "pyq_year, pyq_month, source_row, question_number, chapter_id, " +
  "chapter:chapters(name, order_index, subject:subjects(name)), subtopic:subtopics(name), options(label, is_correct)";

function one<T>(v: T | T[] | null): T | null {
  return Array.isArray(v) ? (v[0] ?? null) : v;
}

function normalise(r: BankRow): BankRow {
  const chapter = one(r.chapter as never) as BankRow["chapter"];
  return {
    ...r,
    chapter: chapter
      ? { name: chapter.name, order_index: chapter.order_index ?? null, subject: one(chapter.subject as never) }
      : null,
    subtopic: one(r.subtopic as never),
  };
}

const formatOf = (r: BankRow) => r.question_format ?? "mcq";
/**
 * Tied to a shared context, so unusable as a loose question. A board exam lets
 * an instruction-only context through ("Choose the correct option."): such a
 * question does not depend on its neighbours.
 */
function setBound(r: BankRow, exam: ExamPlan): boolean {
  const bound = r.set_id !== null || (r.context ?? "").trim() !== "";
  return bound && !(exam.looseInstructions && isInstructionOnlyContext(r.context));
}
const correctCount = (r: BankRow) => (r.options ?? []).filter((o) => o.is_correct).length;

function candidateOf(r: BankRow, exam: ExamPlan): SectionalCandidate {
  return {
    id: r.id,
    difficulty: r.difficulty ?? (exam.unratedAsModerate ? "MODERATE" : null),
    subtopic: r.subtopic?.name ?? null,
    setBound: setBound(r, exam),
    format: formatOf(r),
    // A row without exactly four options is unusable here; report it as
    // not-one-correct so the core's single eligibility rule excludes it.
    correctCount: (r.options ?? []).length === 4 ? correctCount(r) : -1,
    hasNumericKey: r.numeric_answer !== null && (r.options ?? []).length === 0,
  };
}

/** A set's printed order: the source row, then the question number. */
function printedOrder(a: BankRow, b: BankRow): number {
  return (
    (a.source_row ?? 0) - (b.source_row ?? 0) ||
    (parseInt(a.question_number ?? "", 10) || 0) - (parseInt(b.question_number ?? "", 10) || 0) ||
    a.id.localeCompare(b.id)
  );
}

function setsOf(rows: BankRow[], exam: ExamPlan): SectionalSet[] {
  const bySet = new Map<string, BankRow[]>();
  for (const r of rows) {
    if (!r.set_id) continue;
    bySet.set(r.set_id, [...(bySet.get(r.set_id) ?? []), r]);
  }
  return [...bySet.entries()].map(([setId, members]) => ({
    setId,
    sitting: Math.max(...members.map((m) => (m.pyq_year ?? 0) * 100 + (m.pyq_month ?? 0))),
    members: [...members].sort(printedOrder).map((m) => candidateOf(m, exam)),
  }));
}

async function examId(db: SupabaseClient, exam: ExamPlan): Promise<string> {
  const { data, error } = await db.from("exams").select("id").eq("name", exam.examName).single();
  if (error || !data) throw new Error(`exam ${exam.examName}: ${error?.message ?? "not found"}`);
  return data.id as string;
}

/** Every PUBLIC row of the exam of the given kinds, paged past the 1000-row cap. */
async function fetchPool(db: SupabaseClient, exam: string, kinds: QuestionKind[]): Promise<BankRow[]> {
  const out: BankRow[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("questions")
      .select(SELECT)
      .eq("exam_id", exam)
      .eq("visibility", "PUBLIC")
      .in("question_kind", kinds)
      .order("id")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`fetchPool: ${error.message}`);
    const rows = (data ?? []) as unknown as BankRow[];
    out.push(...rows.map(normalise));
    if (rows.length < PAGE) break;
  }
  return out;
}

async function fetchByIds(db: SupabaseClient, ids: string[]): Promise<Map<string, BankRow>> {
  const out = new Map<string, BankRow>();
  for (let i = 0; i < ids.length; i += CHUNK) {
    const { data, error } = await db.from("questions").select(SELECT).in("id", ids.slice(i, i + CHUNK));
    if (error) throw new Error(`fetchByIds: ${error.message}`);
    for (const r of (data ?? []) as unknown as BankRow[]) out.set(r.id, normalise(r));
  }
  return out;
}

/** set_id → the ids of its PUBLIC members, for the whole-set check. */
async function fetchPublicSetMembers(db: SupabaseClient, setIds: string[]): Promise<Map<string, string[]>> {
  const out = new Map<string, string[]>();
  for (let i = 0; i < setIds.length; i += CHUNK) {
    const { data, error } = await db
      .from("questions")
      .select("id, set_id")
      .eq("visibility", "PUBLIC")
      .in("set_id", setIds.slice(i, i + CHUNK));
    if (error) throw new Error(`fetchPublicSetMembers: ${error.message}`);
    for (const r of (data ?? []) as { id: string; set_id: string }[]) {
      out.set(r.set_id, [...(out.get(r.set_id) ?? []), r.id]);
    }
  }
  return out;
}

function readPlan(exam: ExamPlan): PlannedTest[] {
  return existsSync(exam.dataFile)
    ? (JSON.parse(readFileSync(exam.dataFile, "utf8")) as PlannedTest[])
    : [];
}

// ── --plan ──────────────────────────────────────────────────────────────────

async function plan(db: SupabaseClient, exam: ExamPlan): Promise<void> {
  const existing = readPlan(exam);
  const planned = new Set(existing.map((t) => t.chapterId));
  const pool = await fetchPool(db, await examId(db, exam), exam.kinds);
  console.log(`pool: ${pool.length} PUBLIC ${exam.kinds.join("+")} rows · ${existing.length} tests already planned\n`);

  const added: PlannedTest[] = [];
  for (const sp of exam.subjects) {
    const rows = pool.filter((r) => r.chapter?.subject?.name === sp.bankSubject);
    const byChapter = new Map<string, { id: string; name: string; orderIndex: number | null; rows: BankRow[] }>();
    for (const r of rows) {
      const c = byChapter.get(r.chapter_id) ?? {
        id: r.chapter_id, name: r.chapter!.name, orderIndex: r.chapter!.order_index, rows: [],
      };
      c.rows.push(r);
      byChapter.set(r.chapter_id, c);
    }
    const withPools = [...byChapter.values()].map((c) => ({
      ...c,
      eligible: c.rows.map((r) => candidateOf(r, exam)).filter(isSectionalEligible),
      pyq: c.rows.length,
    }));
    if (sp.chapterOrder) {
      for (const c of withPools) {
        const at = sp.chapterOrder.indexOf(c.name);
        if (at < 0) console.log(`  ! ${c.name} is not in the book order list, so it lists last`);
        c.orderIndex = at < 0 ? null : at;
      }
    }
    const chapters = exam.bookOrder ? orderChaptersByBook(withPools) : orderChapters(withPools, sp.weights);

    // New chapters take the next free order numbers, after the committed ones.
    let seq = existing.filter((t) => t.subject === sp.bankSubject).length;
    console.log(`${sp.bankSubject}${sp.mode === "sets" ? " (whole sets)" : ""}`);
    for (const c of chapters) {
      if (planned.has(c.id)) {
        console.log(`  = ${c.name.padEnd(44)} already planned`);
        continue;
      }
      if (sp.retired?.has(c.name)) {
        console.log(`  – ${c.name.padEnd(44)} not on recent papers — no test`);
        continue;
      }
      let picked: SectionalCandidate[] | null;
      if (sp.mode === "sets") {
        picked = pickSectionalSets(setsOf(c.rows, exam));
      } else {
        const size = sectionalSize(c.eligible.length, exam.minPool);
        picked = size === null ? null : pickSectionalQuestions(c.eligible, size, { numericShare: exam.numericShare });
      }
      if (picked === null) {
        const have = sp.mode === "sets" ? `${c.rows.length} in sets` : `${c.eligible.length} eligible`;
        console.log(`  – ${c.name.padEnd(44)} ${have.padStart(12)} — too few for a test`);
        continue;
      }
      seq += 1;
      const test: PlannedTest = {
        slug: sectionalSlug(exam.examSlug, sp.code, seq, c.name),
        title: sectionalTitle(exam.titleName ?? exam.examName, c.name),
        examSlug: exam.examSlug,
        paperCode: sp.paper.code,
        sectionKey: sp.sectionKey,
        subject: sp.bankSubject,
        chapter: c.name,
        chapterId: c.id,
        questionIds: picked.map((q) => q.id),
      };
      added.push(test);
      const n = picked.length;
      const mins = sectionalBlueprint(sp.paper, sp.sectionKey, n).durationSecs / 60;
      let detail: string;
      if (sp.mode === "sets") {
        const sets = new Set(c.rows.filter((r) => test.questionIds.includes(r.id)).map((r) => r.set_id)).size;
        detail = `${sets} whole set(s)`;
      } else {
        const mix = (d: string) => picked.filter((q) => q.difficulty === d).length;
        const subs = new Set(picked.map((q) => q.subtopic)).size;
        const allSubs = new Set(c.eligible.map((q) => q.subtopic)).size;
        const nums = picked.filter((q) => q.format === "numeric").length;
        const kindOf = new Map(c.rows.map((r) => [r.id, r.question_kind]));
        const textbook = picked.filter((q) => kindOf.get(q.id) === "practice").length;
        detail =
          `E${mix("EASY")}/M${mix("MODERATE")}/H${mix("HARD")} · ${subs}/${allSubs} subtopics` +
          (nums ? ` · ${nums} numeric` : "") +
          (exam.kinds.includes("practice") ? ` · ${picked.length - textbook} pyq + ${textbook} textbook` : "");
      }
      console.log(
        `  + ${String(seq).padStart(2)} ${c.name.padEnd(41)} ${String(c.rows.length).padStart(4)} rows → ` +
          `${n} q · ${mins} min · ${detail}`
      );
    }
    console.log("");
  }

  if (added.length === 0) {
    console.log("nothing new to plan — the committed file is unchanged");
    return;
  }
  writeFileSync(exam.dataFile, JSON.stringify([...existing, ...added], null, 2) + "\n");
  console.log(`planned ${added.length} new test(s) → ${exam.dataFile}`);
}

// ── build ───────────────────────────────────────────────────────────────────

function problemsOf(r: BankRow | undefined, t: PlannedTest, sp: SubjectPlan, exam: ExamPlan): string[] {
  if (!r) return ["NOT FOUND in the bank"];
  const p: string[] = [];
  if (r.visibility !== "PUBLIC") p.push(`${r.visibility} (would render BLANK to a student)`);
  if (!exam.kinds.includes(r.question_kind as QuestionKind)) p.push(`question_kind ${r.question_kind}`);
  const format = formatOf(r);
  if (format === "mcq") {
    if ((r.options ?? []).length !== 4) p.push(`${(r.options ?? []).length} options`);
    if (correctCount(r) !== 1) p.push(`${correctCount(r)} correct options`);
  } else if (format === "numeric") {
    if (r.numeric_answer === null) p.push("numeric question without its answer");
    if ((r.options ?? []).length !== 0) p.push(`numeric question with ${(r.options ?? []).length} options`);
  } else {
    p.push(`format ${format}`);
  }
  if (sp.mode !== "sets" && setBound(r, exam)) p.push("tied to a shared context");
  if (sp.mode === "sets" && !r.set_id) p.push("not in a set");
  if (r.chapter_id !== t.chapterId) p.push(`moved to chapter "${r.chapter?.name}"`);
  return p;
}

function answerOf(r: BankRow): MockAnswerKey {
  if (formatOf(r) === "numeric") return { kind: "numeric", value: Number(r.numeric_answer) };
  return { kind: "mcq", label: r.options.find((o) => o.is_correct)!.label as OptionLabel };
}

async function build(
  db: SupabaseClient,
  exam: ExamPlan,
  opts: { apply: boolean; publish: boolean; only?: string }
) {
  const tests = readPlan(exam).filter((t) => !opts.only || t.slug === opts.only);
  if (tests.length === 0) throw new Error(`no planned tests${opts.only ? ` match ${opts.only}` : ""} — run --plan first`);

  const examRowId = await examId(db, exam);
  const byId = await fetchByIds(db, [...new Set(tests.flatMap((t) => t.questionIds))]);
  const setIds = [...new Set([...byId.values()].map((r) => r.set_id).filter((s): s is string => s !== null))];
  const setMembers = await fetchPublicSetMembers(db, setIds);
  const now = new Date();
  let built = 0;
  const failures: string[] = [];

  for (const t of tests) {
    const sp = exam.subjects.find((s) => s.bankSubject === t.subject);
    if (!sp) { failures.push(`${t.slug}: unknown subject ${t.subject}`); continue; }

    const issues: string[] = [];
    const rows: PaperQuestionRow[] = t.questionIds.flatMap((id, i) => {
      const r = byId.get(id);
      const p = problemsOf(r, t, sp, exam);
      if (p.length) { issues.push(`${id}: ${p.join("; ")}`); return []; }
      return [{
        id,
        // The planned order IS the sitting order — see pickSectionalQuestions.
        sourceRow: i + 1,
        questionNumber: String(i + 1),
        subjectName: sp.bankSubject,
        answer: answerOf(r!),
      }];
    });
    if (sp.mode === "sets") {
      const inTest = new Set(t.questionIds);
      const sets = new Set(t.questionIds.map((id) => byId.get(id)?.set_id).filter((s): s is string => !!s));
      for (const s of sets) {
        const missing = (setMembers.get(s) ?? []).filter((id) => !inTest.has(id));
        if (missing.length) issues.push(`set ${s}: ${missing.length} PUBLIC member(s) missing from the test`);
      }
    }
    if (issues.length) {
      failures.push(`${t.slug}: ${issues.length} problem(s)\n    ${issues.join("\n    ")}`);
      continue;
    }

    let snap;
    try {
      const bp = sectionalBlueprint(sp.paper, t.sectionKey, t.questionIds.length, sp.label);
      // year 0 is never stored: mockTestRow writes pyq_year from its own argument.
      snap = buildMockPaper(bp, rows, { year: 0, month: null, title: t.title, slug: t.slug });
    } catch (e) {
      failures.push(`${t.slug}: ${(e as Error).message}`);
      continue;
    }

    console.log(
      `  ✓ ${snap.slug.padEnd(66)} ${snap.totalQuestions}q / ${snap.totalMarks}m / ${snap.durationSecs / 60} min`
    );
    if (opts.apply) {
      const { error } = await db.from("mock_tests").upsert(
        mockTestRow(snap, {
          examId: examRowId,
          source: sectionalSource(t.questionIds.map((id) => byId.get(id)!.question_kind)),
          scope: "sectional",
          pyqYear: null, pyqMonth: null, publish: opts.publish, now,
        }),
        { onConflict: "id" }
      );
      if (error) { failures.push(`${t.slug}: upsert ${error.message}`); continue; }
    }
    built++;
  }

  console.log(`\n${opts.apply ? (opts.publish ? "applied + published" : "applied as draft") : "dry run"} — built ${built}, failed ${failures.length}`);
  for (const f of failures) console.error(`  ! ${f}`);
  if (failures.length) process.exit(1);
}

async function main() {
  const args = process.argv.slice(2);
  const examSlug = args.find((a) => a.startsWith("--exam="))?.slice("--exam=".length) ?? "mht-cet";
  const exam = EXAMS[examSlug];
  if (!exam) throw new Error(`unknown --exam=${examSlug}; one of ${Object.keys(EXAMS).join(", ")}`);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  const db = createClient(url, key, { auth: { persistSession: false } });

  if (args.includes("--plan")) return plan(db, exam);
  return build(db, exam, {
    apply: args.includes("--apply"),
    publish: args.includes("--publish"),
    only: args.find((a) => a.startsWith("--only="))?.slice("--only=".length),
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
