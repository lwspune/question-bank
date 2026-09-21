/**
 * Shared config for the IPMAT family ingestion pipeline.
 *
 * THREE EXAMS, NOT ONE. The IPM entrance route has three separate tests, and we
 * model them as three exams — the same shape CBSE and Maharashtra State Board
 * already use, where each class is its own exam and the grouping is a
 * PRESENTATION concern handled by src/lib/exam/examFamily.ts. Nothing is added
 * to the `questions` table for this; the taxonomy below exam is per-exam, so
 * each test keeps its own subjects and its own sections.
 *
 * Their sections do not share a vocabulary, and that is a real difference rather
 * than an inconsistency to paper over:
 *
 *   Indore      SA / MCQ / VA   — SA vs MCQ splits quant by ANSWER FORMAT
 *                                 (typed answer vs four options); both sections
 *                                 carry the same seven quant topics.
 *   Rohtak      QA / LR / VA    — splits by SUBJECT.
 *   JIPMAT      QA / LR / VA    — splits by SUBJECT.
 *
 * SOURCE. afterboards.in, read out of the page's Next.js flight payload — see
 * flight.ts for the extraction and the one trap that makes a broken extractor
 * look complete. Their answer KEYS are their own derivation: IIM Indore
 * publishes no official IPMAT key and afterboards claims none, so every key here
 * is BLIND-lane and must be re-derived before anything goes PUBLIC. Their
 * explanations, difficulty labels and topic names are their own editorial work
 * and are deliberately NOT ingested.
 *
 * Spec: tests/ipmat-grid.test.ts.
 */

export type IpmatExamSlug = "ipmat-indore" | "ipmat-rohtak" | "jipmat";

export type IpmatExam = {
  /** Our slug — the value that will go in `EXAM_REGISTRY` and the exam cookie. */
  slug: IpmatExamSlug;
  /**
   * The slug afterboards uses in its own URLs. Kept separate from ours because
   * they diverge: the Jammu test is officially JIPMAT (IIM Jammu + IIM Bodh
   * Gaya), not "IPMAT Jammu", so our slug is `jipmat` and there is no
   * `ipmat-jammu` anywhere.
   */
  sourceSlug: string;
  /** Label for reports and, later, the registry entry. */
  displayName: string;
  /** Canonical name for the `exams` DB row. */
  examName: string;
  /** This exam's own section codes, in paper order. */
  sections: readonly string[];
};

export const IPMAT_EXAMS: readonly IpmatExam[] = [
  {
    slug: "ipmat-indore",
    sourceSlug: "ipmat-indore",
    displayName: "IPMAT Indore",
    examName: "IPMAT Indore",
    sections: ["SA", "MCQ", "VA"],
  },
  {
    slug: "ipmat-rohtak",
    sourceSlug: "ipmat-rohtak",
    displayName: "IPMAT Rohtak",
    examName: "IPMAT Rohtak",
    sections: ["QA", "LR", "VA"],
  },
  {
    slug: "jipmat",
    sourceSlug: "jipmat",
    displayName: "JIPMAT (Jammu)",
    examName: "JIPMAT",
    sections: ["QA", "LR", "VA"],
  },
];

export function getIpmatExam(slug: IpmatExamSlug): IpmatExam {
  const exam = IPMAT_EXAMS.find((e) => e.slug === slug);
  if (!exam) throw new Error(`unknown IPMAT exam slug: ${slug}`);
  return exam;
}

const SOURCE_BASE = "https://www.afterboards.in/past-year-questions";

/** The source page for one paper. Built from the SOURCE slug, never ours. */
export function pageUrl(exam: IpmatExamSlug, year: number, section: string): string {
  return `${SOURCE_BASE}/${getIpmatExam(exam).sourceSlug}/${year}/${section}`;
}

export type PaperKey = {
  exam: IpmatExamSlug;
  year: number;
  section: string;
};

export type PaperSpec = PaperKey & { count: number };
export type PaperCount = PaperKey & { count: number };

/**
 * Every paper this source carries, with the number of questions it must yield.
 *
 * MEASURED 2026-09-22, then reconciled against the exams' known patterns before
 * being trusted as a gate — Indore's 100 / 60 / 60 / 90x5 matches its real
 * history including the two shortened COVID sittings, and JIPMAT's 33+33+34 has
 * held every year since its first sitting in 2021. All 48 papers also numbered
 * 1..N with no gaps. Agreement in both directions is what makes this a gate
 * rather than a snapshot of one afternoon.
 *
 * Rohtak stops at 2020 because THE SOURCE stops at 2020, not because the exam
 * did. Its 2021-2026 sittings are simply absent from afterboards.
 */
function indoreYear(year: number, sa: number, mcq: number, va: number): PaperSpec[] {
  return [
    { exam: "ipmat-indore", year, section: "SA", count: sa },
    { exam: "ipmat-indore", year, section: "MCQ", count: mcq },
    { exam: "ipmat-indore", year, section: "VA", count: va },
  ];
}

function tripleYear(
  exam: IpmatExamSlug,
  year: number,
  qa: number,
  lr: number,
  va: number
): PaperSpec[] {
  return [
    { exam, year, section: "QA", count: qa },
    { exam, year, section: "LR", count: lr },
    { exam, year, section: "VA", count: va },
  ];
}

export const PAPER_GRID: readonly PaperSpec[] = [
  // Indore — 8 sittings. 2020 and 2021 were shortened.
  ...indoreYear(2019, 20, 40, 40),
  ...indoreYear(2020, 10, 20, 30),
  ...indoreYear(2021, 10, 20, 30),
  ...indoreYear(2022, 15, 30, 45),
  ...indoreYear(2023, 15, 30, 45),
  ...indoreYear(2024, 15, 30, 45),
  ...indoreYear(2025, 15, 30, 45),
  ...indoreYear(2026, 15, 30, 45),

  // Rohtak — only 2019 and 2020 exist on this source. 2019 LR genuinely runs
  // to 35 (contiguous 1..35) while its QA and VA run to 40.
  ...tripleYear("ipmat-rohtak", 2019, 40, 35, 40),
  ...tripleYear("ipmat-rohtak", 2020, 20, 20, 20),

  // JIPMAT — 6 sittings, its whole history, flat 100 a year.
  ...tripleYear("jipmat", 2021, 33, 33, 34),
  ...tripleYear("jipmat", 2022, 33, 33, 34),
  ...tripleYear("jipmat", 2023, 33, 33, 34),
  ...tripleYear("jipmat", 2024, 33, 33, 34),
  ...tripleYear("jipmat", 2025, 33, 33, 34),
  ...tripleYear("jipmat", 2026, 33, 33, 34),
];

/** Expected question total, for one exam or for the whole family. */
export function expectedTotal(exam?: IpmatExamSlug): number {
  return PAPER_GRID.filter((p) => !exam || p.exam === exam).reduce((n, p) => n + p.count, 0);
}

export type GridMismatch =
  | { kind: "count"; exam: IpmatExamSlug; year: number; section: string; expected: number; actual: number }
  | { kind: "missing"; exam: IpmatExamSlug; year: number; section: string; expected: number }
  | { kind: "unexpected"; exam: IpmatExamSlug; year: number; section: string; actual: number };

const keyOf = (p: PaperKey) => `${p.exam}/${p.year}/${p.section}`;

/**
 * Compare a run's census against the grid. Empty result means the run is whole.
 *
 * All three mismatch kinds are failures, including `unexpected`. A newly
 * published sitting is welcome news and still has to stop the pipeline, because
 * its size and section shape have not been reconciled yet — 2020 and 2021 were
 * both 60-question papers, so assuming a new year matches the last one is
 * exactly the assumption this grid exists to refuse.
 */
export function comparePaperGrid(census: readonly PaperCount[]): GridMismatch[] {
  const out: GridMismatch[] = [];
  const seen = new Map(census.map((c) => [keyOf(c), c]));

  for (const spec of PAPER_GRID) {
    const found = seen.get(keyOf(spec));
    if (!found) {
      out.push({
        kind: "missing",
        exam: spec.exam,
        year: spec.year,
        section: spec.section,
        expected: spec.count,
      });
    } else if (found.count !== spec.count) {
      out.push({
        kind: "count",
        exam: spec.exam,
        year: spec.year,
        section: spec.section,
        expected: spec.count,
        actual: found.count,
      });
    }
  }

  const expectedKeys = new Set(PAPER_GRID.map(keyOf));
  for (const got of census) {
    if (expectedKeys.has(keyOf(got))) continue;
    out.push({
      kind: "unexpected",
      exam: got.exam,
      year: got.year,
      section: got.section,
      actual: got.count,
    });
  }

  return out;
}

/** Human-readable one-liner for a mismatch, for the gate's report. */
export function describeMismatch(m: GridMismatch): string {
  const where = `${m.exam} ${m.year} ${m.section}`;
  if (m.kind === "count") return `${where}: expected ${m.expected} questions, got ${m.actual}`;
  if (m.kind === "missing") return `${where}: MISSING from this run (expected ${m.expected})`;
  return `${where}: UNEXPECTED paper with ${m.actual} questions — reconcile its shape before ingesting`;
}

/**
 * The landing page for one exam — the source's own index of what it carries.
 */
export function landingUrl(exam: IpmatExamSlug): string {
  return `${SOURCE_BASE}/${getIpmatExam(exam).sourceSlug}`;
}

/**
 * Read the papers an exam's landing page links to.
 *
 * WHY DISCOVERY IS SEPARATE FROM THE GRID. The first version of the pipeline
 * chose which papers to fetch and extract by iterating PAPER_GRID. That made
 * the grid unfalsifiable: the census could only ever contain papers the grid
 * already listed, so `comparePaperGrid`'s `unexpected` branch was dead code and
 * a newly published sitting was invisible. Verified by deleting 2026 from the
 * grid and re-running — the extractor reported PASS while skipping three real
 * papers.
 *
 * So this reads the SOURCE and is deliberately not filtered by the grid. Only
 * the section code is validated, against the exam's own section list, because a
 * link shaped like `/jipmat/2025/SA` means the source reorganised its sections
 * and that must surface as a discrepancy rather than as a fetchable paper.
 *
 * Results are sorted and de-duplicated so a run's census is stable.
 */
export function discoverPapers(exam: IpmatExamSlug, landingHtml: string): PaperKey[] {
  const { sourceSlug, sections } = getIpmatExam(exam);
  const valid = new Set(sections);
  // Matches both absolute and root-relative hrefs. The year must be four
  // digits, which is what separates a paper link from the ~40 topic-filter
  // links on the same page (`/<slug>/algebra/indices`).
  // Character classes are spelled out rather than written as \d and \w: this
  // pattern is built in a TEMPLATE LITERAL, where an unknown escape collapses to
  // the bare letter, so `\d{4}` silently becomes `d{4}` and matches "dddd". It
  // did exactly that on the first run and discovery returned nothing.
  const re = new RegExp(
    `/past-year-questions/${sourceSlug}/([0-9]{4})/([A-Za-z]+)(?![A-Za-z0-9_-])`,
    "g"
  );

  const seen = new Set<string>();
  const out: PaperKey[] = [];
  for (const m of landingHtml.matchAll(re)) {
    const year = Number(m[1]);
    const section = m[2];
    if (!valid.has(section)) continue;
    const key = `${year}/${section}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ exam, year, section });
  }

  return out.sort((a, b) => a.year - b.year || a.section.localeCompare(b.section));
}

/**
 * The cached-HTML file name for one paper.
 *
 * Lives here, next to its inverse `parsePaperFileName`, rather than in
 * fetch.ts. It was in fetch.ts first, and because that file calls `main()` at
 * module load, extract.ts importing the helper silently RAN A WHOLE FETCH
 * before extracting. A pure helper in a module with a top-level side effect is
 * not importable.
 */
export function paperFileName(exam: string, year: number, section: string): string {
  return `${exam}-${year}-${section}.html`;
}

/**
 * Recover a paper key from a cached HTML file name.
 *
 * Splits from the RIGHT, because two of the three exam slugs contain hyphens
 * ("ipmat-indore-2026-SA") and splitting from the left would take "ipmat" as
 * the exam. Returns null for anything that is not one of our paper files, and
 * deliberately accepts a year the grid does not list — reading the census off
 * disk is the second way the grid can be contradicted.
 */
export function parsePaperFileName(fileName: string): PaperKey | null {
  const m = /^(.+)-(\d{4})-([A-Za-z]+)\.html$/.exec(fileName);
  if (!m) return null;
  const exam = IPMAT_EXAMS.find((e) => e.slug === m[1]);
  if (!exam) return null;
  const section = m[3];
  if (!exam.sections.includes(section)) return null;
  return { exam: exam.slug, year: Number(m[2]), section };
}

/**
 * Rows carrying a SOURCE defect that code cannot repair.
 *
 * Declared as data, not left to fail the gate forever, so the decision shows up
 * in a diff and can be revisited. `covers` names the problem kinds the
 * exclusion accounts for: a NEW, different problem on an already-excluded row
 * still fails the gate. Without that, an exclusion becomes a blanket amnesty
 * for a row nobody looks at again.
 *
 * NOT the same thing as a `reconstructed` row. Those 15 are flagged by the
 * source's own disclaimer and filtered by `reconstructed`, not listed here.
 */
export type Exclusion = PaperKey & {
  questionNumber: number;
  reason: string;
  /** Substrings of the problem messages this exclusion accounts for. */
  covers: string[];
};

export const EXCLUSIONS: readonly Exclusion[] = [
  {
    exam: "jipmat",
    year: 2025,
    section: "LR",
    questionNumber: 6,
    reason:
      "Matches a list of figures against a list of numbers; the figures live in table cells and ARE the answer set, so removing them leaves a table of empty cells that still reads as a complete question.",
    covers: ["figure inside a table cell"],
  },
  {
    exam: "jipmat",
    year: 2025,
    section: "LR",
    questionNumber: 13,
    reason:
      "Matches groups against Venn diagrams held in table cells; the diagrams ARE the answer set, so the question is unanswerable once they are lifted out.",
    covers: ["figure inside a table cell"],
  },
  {
    exam: "jipmat",
    year: 2026,
    section: "LR",
    questionNumber: 22,
    reason:
      "Matches groups against Venn diagrams held in GFM table cells; the diagrams ARE the answer set, so the question is unanswerable once they are lifted out.",
    covers: ["figure inside a table cell"],
  },
  {
    exam: "jipmat",
    year: 2025,
    section: "VA",
    questionNumber: 1,
    reason:
      "The source keys TWO correct options (correctAnswer \"2,4\") on an indirect-speech question. Our schema requires exactly one correct option, and choosing between them would be inventing an answer the source does not give.",
    covers: ["MCQ key is not an option index", "options marked correct"],
  },
];

export function exclusionFor(key: PaperKey & { questionNumber: number }): Exclusion | null {
  return (
    EXCLUSIONS.find(
      (e) =>
        e.exam === key.exam &&
        e.year === key.year &&
        e.section === key.section &&
        e.questionNumber === key.questionNumber
    ) ?? null
  );
}

/** True when this exclusion explicitly accounts for the given problem message. */
export function isCoveredBy(exclusion: Exclusion, problem: string): boolean {
  return exclusion.covers.some((c) => problem.includes(c));
}
