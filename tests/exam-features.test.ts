import { describe, expect, it } from "vitest";
import {
  buildCoverageRows,
  coverageSummary,
  examFactsFromCode,
  featureCoverage,
  parseCoverageSnapshot,
  type CoverageSnapshot,
  type ExamFacts,
} from "@/lib/examFeatures/build";

const fact = (over: Partial<ExamFacts> & Pick<ExamFacts, "slug" | "examName">): ExamFacts => ({
  displayName: over.examName,
  goal: "science",
  intl: false,
  boardReader: false,
  learn: false,
  bilingual: false,
  notesChapters: 0,
  guides: 0,
  ...over,
});

const counts = (examName: string, over: Partial<CoverageSnapshot["exams"][number]> = {}) => ({
  examName,
  pyq: 0,
  practice: 0,
  animated: 0,
  fullMocks: 0,
  sectionMocks: 0,
  draftMocks: 0,
  homework: 0,
  boardPapers: 0,
  twinsSource: 0,
  twinsTarget: 0,
  mockTakers: 0,
  ...over,
});

const FACTS: ExamFacts[] = [
  fact({ slug: "nda", examName: "NDA", goal: "defence", notesChapters: 69, guides: 10 }),
  fact({ slug: "cbse-12", examName: "CBSE Class 12", goal: "boards", boardReader: true, learn: true }),
  fact({ slug: "clat", examName: "CLAT", goal: "law" }),
];

const SNAP: CoverageSnapshot = {
  exams: [
    counts("NDA", { pyq: 5130, practice: 8892, fullMocks: 43, sectionMocks: 69, twinsTarget: 1029, mockTakers: 226 }),
    counts("CBSE Class 12", { pyq: 6543, sectionMocks: 50, boardPapers: 306, twinsSource: 1114, homework: 3 }),
    counts("CLAT", { pyq: 660, fullMocks: 5 }),
    counts("Some Retired Exam", { pyq: 3 }),
  ],
  students: [
    { slug: "nda", students: 385, active30: 162 },
    { slug: "cbse-12", students: 284, active30: 222 },
    { slug: "not-an-exam", students: 4, active30: 1 },
  ],
};

describe("buildCoverageRows", () => {
  const { rows, unmatched } = buildCoverageRows(SNAP, FACTS);

  it("sorts by students, most first, and an exam no student picked comes last with 0", () => {
    expect(rows.map((r) => r.slug)).toEqual(["nda", "cbse-12", "clat"]);
    expect(rows[2].students).toBe(0);
    expect(rows[2].active30).toBe(0);
  });

  it("joins database counts by exam name and code facts by slug", () => {
    const nda = rows[0];
    expect(nda.pyq).toBe(5130);
    expect(nda.notes).toBe(69);
    expect(nda.guides).toBe(10);
    expect(nda.mockTakers).toBe(226);
    expect(rows[1].boardReader).toBe(true);
    expect(rows[1].learn).toBe(true);
  });

  it("counts NDA twins on whichever side of the link the exam sits", () => {
    expect(rows[0].ndaTwins).toBe(1029);
    expect(rows[1].ndaTwins).toBe(1114);
  });

  it("reports database exams and target picks that match no registry exam, rather than dropping them silently", () => {
    expect(unmatched.examNames).toEqual(["Some Retired Exam"]);
    expect(unmatched.targetSlugs).toEqual(["not-an-exam"]);
  });

  it("treats a registry exam with no database row as all zeros", () => {
    const { rows: r } = buildCoverageRows({ exams: [], students: [] }, FACTS);
    expect(r.find((x) => x.slug === "clat")).toMatchObject({ pyq: 0, fullMocks: 0, students: 0 });
  });
});

describe("coverageSummary", () => {
  it("counts exams per feature and the gaps among the biggest exams", () => {
    const { rows } = buildCoverageRows(SNAP, FACTS);
    expect(coverageSummary(rows)).toEqual({
      exams: 3,
      withMocks: 3,
      withNotes: 1,
      withGuides: 1,
      withHomework: 1,
      noStudents: 1,
      top10NoNotes: 2,
      top10NoGuides: 2,
    });
  });
});

describe("featureCoverage", () => {
  const { rows } = buildCoverageRows(SNAP, FACTS);
  const cov = featureCoverage(rows);

  it("lists every feature, most widely held first", () => {
    const counts = cov.map((c) => c.exams);
    expect(counts).toEqual([...counts].sort((a, b) => b - a));
    expect(cov.find((c) => c.key === "pyq")?.exams).toBe(3);
    expect(cov.find((c) => c.key === "notes")?.exams).toBe(1);
  });

  it("gives each feature its share of student picks, rounded", () => {
    // notes: NDA's 385 of 669 picks = 57.5% -> 58
    expect(cov.find((c) => c.key === "notes")?.pickShare).toBe(58);
  });

  it("names the biggest exams without the feature, skipping exams no student picked", () => {
    expect(cov.find((c) => c.key === "notes")?.missingTop).toEqual(["CBSE Class 12"]);
    expect(cov.find((c) => c.key === "boardPapers")?.missingTop).toEqual(["NDA"]);
  });

  it("does not divide by zero when nobody has picked any exam", () => {
    const { rows: empty } = buildCoverageRows({ exams: [], students: [] }, FACTS);
    expect(featureCoverage(empty).every((c) => c.pickShare === 0)).toBe(true);
  });
});

describe("parseCoverageSnapshot", () => {
  it("reads the RPC's snake_case json and coerces counts to numbers", () => {
    const snap = parseCoverageSnapshot({
      exams: [{ exam_name: "NDA", pyq: "5", practice: 1, animated: 0, full_mocks: 2, section_mocks: 0, draft_mocks: 0, homework: 0, board_papers: 0, twins_source: 0, twins_target: 7, mock_takers: 3 }],
      students: [{ slug: "nda", students: 4, active30: 2 }],
    });
    expect(snap.exams[0]).toMatchObject({ examName: "NDA", pyq: 5, fullMocks: 2, twinsTarget: 7, mockTakers: 3 });
    expect(snap.students[0]).toEqual({ slug: "nda", students: 4, active30: 2 });
  });

  it("throws on a payload that is not the expected shape, so the page shows an error, not zeros", () => {
    expect(() => parseCoverageSnapshot(null)).toThrow();
    expect(() => parseCoverageSnapshot({ exams: "x" })).toThrow();
  });
});

describe("examFactsFromCode", () => {
  const facts = examFactsFromCode();
  const bySlug = new Map(facts.map((f) => [f.slug, f]));

  it("covers every registry exam once", () => {
    expect(new Set(facts.map((f) => f.slug)).size).toBe(facts.length);
    expect(facts.length).toBeGreaterThan(30);
  });

  it("reads notes chapters, guides, Learn, board reader and bilingual from the registries", () => {
    expect(bySlug.get("nda")?.guides).toBeGreaterThanOrEqual(10);
    expect(bySlug.get("nda")?.notesChapters).toBeGreaterThan(0);
    expect(bySlug.get("cbse-12")).toMatchObject({ boardReader: true, learn: true });
    expect(bySlug.get("mh-ssc-10")?.bilingual).toBe(true);
    expect(bySlug.get("imat")?.intl).toBe(true);
    expect(bySlug.get("clat")).toMatchObject({ notesChapters: 0, guides: 0, learn: false });
  });
});
