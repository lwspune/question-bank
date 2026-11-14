/**
 * Exam features (/dashboard/exam-features, migration 0253). Pure.
 *
 * Which features each exam has, beside how many students picked it, so the
 * next piece of work can go where the students are. Two kinds of fact meet
 * here and are joined by NAME, so a mismatch is reported, never dropped:
 *
 * - DATABASE counts (get_exam_feature_coverage): questions, mocks, homework
 *   plans, board papers, animated solutions, NDA twins, students. Keyed by
 *   `exams.name`, except target picks, which student_profiles stores by slug.
 * - CODE facts: notes chapters (NOTES_NAV_INDEX), guides (GUIDE_CATALOG), and
 *   the registry flags for the board reader, Learn and bilingual papers.
 *
 * Spec: tests/exam-features.test.ts.
 */
import { EXAM_REGISTRY, type ExamGoal } from "@/lib/exam/examContext";
import { GOAL_LABEL } from "@/lib/exam/examGoals";
import { GUIDE_CATALOG } from "@/lib/guide/guideCatalog";
import { NOTES_NAV_INDEX } from "@/lib/notes/notesNavIndex.generated";

export type ExamCounts = {
  examName: string;
  pyq: number;
  practice: number;
  animated: number;
  fullMocks: number;
  sectionMocks: number;
  draftMocks: number;
  homework: number;
  boardPapers: number;
  /** Board questions carrying an "Asked in NDA" link. */
  twinsSource: number;
  /** Questions those links point to (NDA's side). */
  twinsTarget: number;
  mockTakers: number;
};

export type StudentCounts = { slug: string; students: number; active30: number };

export type CoverageSnapshot = { exams: ExamCounts[]; students: StudentCounts[] };

export type ExamFacts = {
  slug: string;
  examName: string;
  displayName: string;
  goal: ExamGoal;
  intl: boolean;
  boardReader: boolean;
  learn: boolean;
  bilingual: boolean;
  notesChapters: number;
  guides: number;
};

export type ExamCoverageRow = {
  slug: string;
  exam: string;
  goal: ExamGoal;
  goalLabel: string;
  intl: boolean;
  students: number;
  active30: number;
  mockTakers: number;
  pyq: number;
  practice: number;
  fullMocks: number;
  sectionMocks: number;
  draftMocks: number;
  notes: number;
  guides: number;
  homework: number;
  boardReader: boolean;
  boardPapers: number;
  animated: number;
  learn: boolean;
  ndaTwins: number;
  bilingual: boolean;
};

export type CoverageResult = {
  rows: ExamCoverageRow[];
  /** Database facts that match no registry exam: a rename or a retired exam. */
  unmatched: { examNames: string[]; targetSlugs: string[] };
};

/** The code-side facts for every registry exam, www and intl. */
export function examFactsFromCode(): ExamFacts[] {
  const notes = new Map<string, number>();
  for (const n of NOTES_NAV_INDEX) notes.set(n.examName, (notes.get(n.examName) ?? 0) + 1);
  return EXAM_REGISTRY.map((e) => ({
    slug: e.slug,
    examName: e.examName,
    displayName: e.displayName,
    goal: e.goal,
    intl: e.site === "intl",
    boardReader: e.boardExam === true,
    learn: Boolean(e.learnPath),
    bilingual: e.bilingual === true,
    notesChapters: notes.get(e.examName) ?? 0,
    guides: GUIDE_CATALOG[e.slug]?.length ?? 0,
  }));
}

const num = (v: unknown): number => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

/** The RPC's jsonb (snake_case) into a snapshot. Throws on the wrong shape. */
export function parseCoverageSnapshot(raw: unknown): CoverageSnapshot {
  const obj = raw as { exams?: unknown; students?: unknown } | null;
  if (!obj || !Array.isArray(obj.exams) || !Array.isArray(obj.students)) {
    throw new Error("get_exam_feature_coverage returned an unexpected shape");
  }
  const exams = (obj.exams as Record<string, unknown>[]).map((r) => ({
    examName: String(r.exam_name),
    pyq: num(r.pyq),
    practice: num(r.practice),
    animated: num(r.animated),
    fullMocks: num(r.full_mocks),
    sectionMocks: num(r.section_mocks),
    draftMocks: num(r.draft_mocks),
    homework: num(r.homework),
    boardPapers: num(r.board_papers),
    twinsSource: num(r.twins_source),
    twinsTarget: num(r.twins_target),
    mockTakers: num(r.mock_takers),
  }));
  const students = (obj.students as Record<string, unknown>[]).map((r) => ({
    slug: String(r.slug),
    students: num(r.students),
    active30: num(r.active30),
  }));
  return { exams, students };
}

export function buildCoverageRows(snap: CoverageSnapshot, facts: readonly ExamFacts[]): CoverageResult {
  const byName = new Map(snap.exams.map((e) => [e.examName, e]));
  const bySlug = new Map(snap.students.map((s) => [s.slug, s]));
  const rows = facts.map((f): ExamCoverageRow => {
    const c = byName.get(f.examName);
    const s = bySlug.get(f.slug);
    return {
      slug: f.slug,
      exam: f.displayName,
      goal: f.goal,
      goalLabel: GOAL_LABEL[f.goal],
      intl: f.intl,
      students: s?.students ?? 0,
      active30: s?.active30 ?? 0,
      mockTakers: c?.mockTakers ?? 0,
      pyq: c?.pyq ?? 0,
      practice: c?.practice ?? 0,
      fullMocks: c?.fullMocks ?? 0,
      sectionMocks: c?.sectionMocks ?? 0,
      draftMocks: c?.draftMocks ?? 0,
      notes: f.notesChapters,
      guides: f.guides,
      homework: c?.homework ?? 0,
      boardReader: f.boardReader,
      boardPapers: c?.boardPapers ?? 0,
      animated: c?.animated ?? 0,
      learn: f.learn,
      ndaTwins: (c?.twinsSource ?? 0) + (c?.twinsTarget ?? 0),
      bilingual: f.bilingual,
    };
  });
  rows.sort((a, b) => b.students - a.students || a.exam.localeCompare(b.exam));
  const names = new Set(facts.map((f) => f.examName));
  const slugs = new Set(facts.map((f) => f.slug));
  return {
    rows,
    unmatched: {
      examNames: snap.exams.map((e) => e.examName).filter((n) => !names.has(n)).sort(),
      targetSlugs: snap.students.map((s) => s.slug).filter((s) => !slugs.has(s)).sort(),
    },
  };
}

export type CoverageSummary = {
  exams: number;
  withMocks: number;
  withNotes: number;
  withGuides: number;
  withHomework: number;
  noStudents: number;
  top10NoNotes: number;
  top10NoGuides: number;
};

const hasMocks = (r: ExamCoverageRow) => r.fullMocks > 0 || r.sectionMocks > 0;

/** Headline counts. `rows` must already be sorted by students (buildCoverageRows does). */
export function coverageSummary(rows: readonly ExamCoverageRow[]): CoverageSummary {
  const top10 = rows.slice(0, 10);
  return {
    exams: rows.length,
    withMocks: rows.filter(hasMocks).length,
    withNotes: rows.filter((r) => r.notes > 0).length,
    withGuides: rows.filter((r) => r.guides > 0).length,
    withHomework: rows.filter((r) => r.homework > 0).length,
    noStudents: rows.filter((r) => r.students === 0).length,
    top10NoNotes: top10.filter((r) => r.notes === 0).length,
    top10NoGuides: top10.filter((r) => r.guides === 0).length,
  };
}

export type FeatureKey =
  | "pyq"
  | "practice"
  | "mocks"
  | "fullMocks"
  | "notes"
  | "guides"
  | "homework"
  | "boardReader"
  | "boardPapers"
  | "animated"
  | "learn"
  | "ndaTwins"
  | "bilingual";

export const FEATURES: readonly { key: FeatureKey; label: string; has: (r: ExamCoverageRow) => boolean }[] = [
  { key: "pyq", label: "Past-year questions", has: (r) => r.pyq > 0 },
  { key: "practice", label: "Practice bank", has: (r) => r.practice > 0 },
  { key: "mocks", label: "Published mocks", has: hasMocks },
  { key: "fullMocks", label: "Full past-paper mocks", has: (r) => r.fullMocks > 0 },
  { key: "notes", label: "Notes", has: (r) => r.notes > 0 },
  { key: "guides", label: "Strategy guides", has: (r) => r.guides > 0 },
  { key: "homework", label: "Homework plans", has: (r) => r.homework > 0 },
  { key: "boardReader", label: "Board reader", has: (r) => r.boardReader },
  { key: "boardPapers", label: "Board past papers", has: (r) => r.boardPapers > 0 },
  { key: "animated", label: "Animated solutions", has: (r) => r.animated > 0 },
  { key: "learn", label: "Learn lessons", has: (r) => r.learn },
  { key: "ndaTwins", label: "NDA twins", has: (r) => r.ndaTwins > 0 },
  { key: "bilingual", label: "Marathi and English", has: (r) => r.bilingual },
];

export type FeatureCoverage = {
  key: FeatureKey;
  label: string;
  exams: number;
  total: number;
  /** Share of all target picks that fall on exams with this feature, 0-100. */
  pickShare: number;
  /** Up to three exams with the most students that lack it (none with 0 students). */
  missingTop: string[];
};

/** Per feature, most widely held first. `rows` must be sorted by students. */
export function featureCoverage(rows: readonly ExamCoverageRow[]): FeatureCoverage[] {
  const allPicks = rows.reduce((s, r) => s + r.students, 0);
  return FEATURES.map((f) => {
    const withIt = rows.filter(f.has);
    const picks = withIt.reduce((s, r) => s + r.students, 0);
    return {
      key: f.key,
      label: f.label,
      exams: withIt.length,
      total: rows.length,
      pickShare: allPicks ? Math.round((picks / allPicks) * 100) : 0,
      missingTop: rows.filter((r) => !f.has(r) && r.students > 0).slice(0, 3).map((r) => r.exam),
    };
  }).sort((a, b) => b.exams - a.exams);
}
