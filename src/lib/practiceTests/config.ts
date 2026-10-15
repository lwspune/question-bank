/**
 * Which exams and subjects V can build a practice test for, and the rules each
 * exam's pool follows.
 *
 * The exams are the ones that already have chapter tests
 * (scripts/mocks/build-sectional.ts EXAMS), with the same per-exam rules,
 * because those rules were each decided against that exam's bank: which
 * question kinds count, whether a board's "Choose the correct option." context
 * makes a question loose, whether an unrated question counts as moderate, and
 * JEE's numeric share. Two subjects are left out everywhere: English, whose
 * questions all belong to sets sharing a passage (a loose pick would break
 * them), and Current Affairs, whose questions go stale. MPSC Mains is left out
 * because its blueprint lives in the build scripts, not here.
 *
 * Timing and marks come from each subject's real paper (`paper`), so a
 * practice test runs at the exam's own pace and is marked by its scheme.
 *
 * Pure data. Spec: tests/practice-tests-builder.test.ts (PRACTICE_EXAMS).
 */
import {
  CBSE_10_CHAPTER_MCQ_PAPER,
  CBSE_12_CHAPTER_MCQ_PAPER,
  CDS_GK_PAPER,
  CDS_MATHS_PAPER,
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
} from "@/lib/mocks/blueprints";

export type PracticeSubject = {
  /** URL-safe key, unique within the exam: what the build request names. */
  key: string;
  /** The bank's subject name. MHT-CET's and JEE's maths is "Maths". */
  bankSubject: string;
  /** What V shows and the test's section is called. */
  label: string;
  paper: MockPaperBlueprint;
  sectionKey: string;
};

export type PracticeExam = {
  slug: string;
  /** The `exams` row name, exactly. */
  examName: string;
  /** The name in a test title and on V's buttons. */
  shortName: string;
  kinds: readonly ("pyq" | "practice")[];
  /** A board question whose context is only an instruction counts as loose. */
  looseInstructions: boolean;
  /** An unrated question counts as MODERATE instead of being left out. */
  unratedAsModerate: boolean;
  /** Share of a test given to numeric questions (JEE prints 5 of 25). */
  numericShare: number;
  subjects: readonly PracticeSubject[];
};

const subject = (
  key: string,
  bankSubject: string,
  paper: MockPaperBlueprint,
  sectionKey: string,
  label = bankSubject
): PracticeSubject => ({ key, bankSubject, label, paper, sectionKey });

const slugOf = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const GK = ["Physics", "Chemistry", "Biology", "History", "Geography", "Polity", "Economics"];

/** Every subject of a one-section paper but Current Affairs (MPSC prelims). */
const oneSectionSubjects = (paper: MockPaperBlueprint): PracticeSubject[] =>
  paper.sections[0].subjects
    .filter((s) => s !== "Current Affairs")
    .map((s) => subject(slugOf(s), s, paper, paper.sections[0].key));

const COMPETITIVE = { kinds: ["pyq"] as const, looseInstructions: false, numericShare: 0 };
const BOARD = {
  kinds: ["pyq", "practice"] as const,
  looseInstructions: true,
  unratedAsModerate: true,
  numericShare: 0,
};

export const PRACTICE_EXAMS: readonly PracticeExam[] = [
  {
    slug: "nda",
    examName: "NDA",
    shortName: "NDA",
    ...COMPETITIVE,
    unratedAsModerate: true,
    subjects: [
      subject("maths", "Mathematics", NDA_MATHS_PAPER, "mathematics"),
      ...GK.map((s) => subject(slugOf(s), s, NDA_GAT_PAPER, "gk")),
    ],
  },
  {
    slug: "cds",
    examName: "CDS",
    shortName: "CDS",
    ...COMPETITIVE,
    unratedAsModerate: true,
    subjects: [
      subject("maths", "Mathematics", CDS_MATHS_PAPER, "mathematics"),
      ...GK.map((s) => subject(slugOf(s), s, CDS_GK_PAPER, "general-knowledge")),
    ],
  },
  {
    slug: "mht-cet",
    examName: "MHT-CET",
    shortName: "MHT-CET",
    ...COMPETITIVE,
    // MHT-CET's chapter tests leave unrated questions out; so do these.
    unratedAsModerate: false,
    subjects: [
      subject("maths", "Maths", MHT_CET_MATHS_PAPER, "mathematics", "Maths"),
      subject("physics", "Physics", MHT_CET_PHY_CHEM_PAPER, "physics"),
      subject("chemistry", "Chemistry", MHT_CET_PHY_CHEM_PAPER, "chemistry"),
    ],
  },
  {
    slug: "jee-mains",
    examName: "JEE Mains",
    shortName: "JEE Mains",
    ...COMPETITIVE,
    unratedAsModerate: true,
    numericShare: 0.2,
    subjects: [
      subject("physics", "Physics", JEE_MAINS_PAPER, "physics"),
      subject("chemistry", "Chemistry", JEE_MAINS_PAPER, "chemistry"),
      subject("maths", "Maths", JEE_MAINS_PAPER, "maths", "Maths"),
    ],
  },
  {
    slug: "cbse-10",
    examName: "CBSE Class 10",
    shortName: "CBSE 10",
    ...BOARD,
    subjects: [
      subject("maths", "Mathematics", CBSE_10_CHAPTER_MCQ_PAPER, "mathematics"),
      subject("science", "Science", CBSE_10_CHAPTER_MCQ_PAPER, "science"),
    ],
  },
  {
    slug: "cbse-12",
    examName: "CBSE Class 12",
    shortName: "CBSE 12",
    ...BOARD,
    subjects: [
      subject("physics", "Physics", CBSE_12_CHAPTER_MCQ_PAPER, "physics"),
      subject("chemistry", "Chemistry", CBSE_12_CHAPTER_MCQ_PAPER, "chemistry"),
      subject("maths", "Mathematics", CBSE_12_CHAPTER_MCQ_PAPER, "mathematics"),
      subject("biology", "Biology", CBSE_12_CHAPTER_MCQ_PAPER, "biology"),
    ],
  },
  {
    slug: "mh-hsc-12",
    examName: "Maharashtra HSC Class 12",
    shortName: "MH HSC 12",
    ...BOARD,
    subjects: [
      subject("physics", "Physics", MH_HSC_12_CHAPTER_MCQ_PAPER, "physics"),
      subject("chemistry", "Chemistry", MH_HSC_12_CHAPTER_MCQ_PAPER, "chemistry"),
      subject("maths", "Mathematics", MH_HSC_12_CHAPTER_MCQ_PAPER, "mathematics"),
      subject("biology", "Biology", MH_HSC_12_CHAPTER_MCQ_PAPER, "biology"),
    ],
  },
  {
    slug: "mh-ssc-10",
    examName: "Maharashtra State Board Class 10",
    shortName: "MH SSC 10",
    ...BOARD,
    subjects: [
      subject("algebra", "Algebra", MH_SSC_10_CHAPTER_MCQ_PAPER, "algebra"),
      subject("geometry", "Geometry", MH_SSC_10_CHAPTER_MCQ_PAPER, "geometry"),
      subject("science-1", "Science and Technology I", MH_SSC_10_CHAPTER_MCQ_PAPER, "science-1"),
      subject("science-2", "Science and Technology II", MH_SSC_10_CHAPTER_MCQ_PAPER, "science-2"),
      subject("history", "History", MH_SSC_10_HUMANITIES_MCQ_PAPER, "history"),
      subject("political-science", "Political Science", MH_SSC_10_HUMANITIES_MCQ_PAPER, "political-science"),
      subject("geography", "Geography", MH_SSC_10_HUMANITIES_MCQ_PAPER, "geography"),
    ],
  },
  {
    slug: "mpsc-group-b-c",
    examName: "MPSC Group B & C Prelims",
    shortName: "MPSC Group B & C",
    ...COMPETITIVE,
    unratedAsModerate: true,
    subjects: oneSectionSubjects(MPSC_GBC_PAPER),
  },
  {
    slug: "mpsc-state-services-prelims",
    examName: "MPSC State Services Prelims",
    shortName: "MPSC State Services",
    ...COMPETITIVE,
    unratedAsModerate: true,
    subjects: oneSectionSubjects(MPSC_SSP_GS1_PAPER),
  },
];

export function getPracticeExam(slug: string | null | undefined): PracticeExam | null {
  return PRACTICE_EXAMS.find((e) => e.slug === slug) ?? null;
}

export function getPracticeSubject(exam: PracticeExam, key: string | null | undefined): PracticeSubject | null {
  return exam.subjects.find((s) => s.key === key) ?? null;
}
