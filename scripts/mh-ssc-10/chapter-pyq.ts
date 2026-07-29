/**
 * Pure core for the per-chapter Board-PYQ handout build (see build-chapter-pyq.ts).
 *
 * Two jobs, both deliberately free of DB/filesystem access so they're unit-testable:
 *   1. CHAPTER_TARGETS — the explicit bank-chapter -> on-disk-folder registry.
 *   2. orderChapterQuestions — subtopic grouping + ordering for one chapter's doc.
 *
 * SCOPE (user's call, 2026-07-28): CURRENT SYLLABUS ONLY. The 33 chapters below are
 * exactly the chapter folders that exist on disk. The ~60 old-syllabus PUBLIC rows
 * (Control and Co-ordination, Acids/Bases, Environmental Pollution, Reflection of
 * Light, Current Electricity, the Class-9 prerequisite Algebra items, and the
 * pre-2020 Paper-II chemistry filed under Science II) have no current chapter folder
 * and are NOT exported. A chapter absent from this registry is skipped loudly.
 *
 * The registry is EXPLICIT rather than fuzzy-matched on purpose: renaming a DB
 * chapter should fail the build, not silently write a handout into the wrong
 * folder (the shipped-chapter-rename lesson).
 */

/** Bank subject names for MH-SSC-10. */
export type SscSubject =
  | "Algebra"
  | "Geometry"
  | "Science and Technology I"
  | "Science and Technology II"
  | "Geography"
  | "History"
  | "Political Science";

export type ChapterTarget = {
  /** Bank `subjects.name` — must match exactly. */
  subject: SscSubject;
  /** Bank `chapters.name` — must match exactly. */
  chapter: string;
  /** Folder path relative to CHAPTERS_ROOT, forward-slashed (joined per-platform later). */
  dir: string;
  /** Human chapter number as printed in the textbook, for the document title. */
  chapterNo: number;
  /** Textbook part label for the title line ("Part 1: Algebra", "Part 2"). */
  part: string;
};

/**
 * On-disk root holding the per-chapter folders. Each leaf already contains the
 * textbook chapter PDF + the `_Quiz.docx` / `_Quiz_Key.docx` pair; the PYQ pair
 * lands beside them using the same `<NN>_<Chapter>_<Artifact>.docx` convention.
 */
export const CHAPTERS_ROOT =
  "C:\\Vilas\\LWS_Pune\\NDA_Subjects_Content\\Subjects\\State-Board\\02. 10th\\10th_Chapters";

const algebra = (chapterNo: number, chapter: string, dir: string): ChapterTarget => ({
  subject: "Algebra",
  chapter,
  dir: `Mathematics/Part1_Algebra/${dir}`,
  chapterNo,
  part: "Mathematics (Part 1: Algebra)",
});

const geometry = (chapterNo: number, chapter: string, dir: string): ChapterTarget => ({
  subject: "Geometry",
  chapter,
  dir: `Mathematics/Part2_Geometry/${dir}`,
  chapterNo,
  part: "Mathematics (Part 2: Geometry)",
});

const sci1 = (chapterNo: number, chapter: string, dir: string): ChapterTarget => ({
  subject: "Science and Technology I",
  chapter,
  dir: `Science/Part1/${dir}`,
  chapterNo,
  part: "Science and Technology (Part 1)",
});

const sci2 = (chapterNo: number, chapter: string, dir: string): ChapterTarget => ({
  subject: "Science and Technology II",
  chapter,
  dir: `Science/Part2/${dir}`,
  chapterNo,
  part: "Science and Technology (Part 2)",
});

const geography = (chapterNo: number, chapter: string, dir: string): ChapterTarget => ({
  subject: "Geography",
  chapter,
  dir: `Geography/${dir}`,
  chapterNo,
  part: "Social Sciences (Paper 2: Geography)",
});

// History and Political Science are TWO bank subjects printed as ONE board paper
// (Paper I: Q1-5 History, Q6-9 Political Science), and on disk they share a
// parent folder. Both number their chapters from 01, so the dir PREFIX is the
// only thing keeping their output paths apart — keep the two helpers distinct.
const history = (chapterNo: number, chapter: string, dir: string): ChapterTarget => ({
  subject: "History",
  chapter,
  dir: `History_and_Political_Science/History/${dir}`,
  chapterNo,
  part: "Social Sciences (Paper 1: History)",
});

const polsci = (chapterNo: number, chapter: string, dir: string): ChapterTarget => ({
  subject: "Political Science",
  chapter,
  dir: `History_and_Political_Science/Political_Science/${dir}`,
  chapterNo,
  part: "Social Sciences (Paper 1: Political Science)",
});

export const CHAPTER_TARGETS: ChapterTarget[] = [
  // ── Mathematics Part 1 — Algebra (6) ───────────────────────────────────────
  algebra(1, "Linear Equations in Two Variables", "01_Linear_Equations_in_Two_Variables"),
  algebra(2, "Quadratic Equations", "02_Quadratic_Equations"),
  algebra(3, "Arithmetic Progression", "03_Arithmetic_Progression"),
  algebra(4, "Financial Planning", "04_Financial_Planning"),
  algebra(5, "Probability", "05_Probability"),
  algebra(6, "Statistics", "06_Statistics"),

  // ── Mathematics Part 2 — Geometry (7) ──────────────────────────────────────
  geometry(1, "Similarity", "01_Similarity"),
  geometry(2, "Pythagoras Theorem", "02_Pythagoras_Theorem"),
  geometry(3, "Circle", "03_Circle"),
  geometry(4, "Geometric Constructions", "04_Geometric_Constructions"),
  geometry(5, "Co-ordinate Geometry", "05_Co-ordinate_Geometry"),
  geometry(6, "Trigonometry", "06_Trigonometry"),
  geometry(7, "Mensuration", "07_Mensuration"),

  // ── Science and Technology Part 1 (10) ─────────────────────────────────────
  sci1(1, "Gravitation", "01_Gravitation"),
  sci1(2, "Periodic Classification of Elements", "02_Periodic_Classification_of_Elements"),
  sci1(3, "Chemical Reactions and Equations", "03_Chemical_Reactions_and_Equations"),
  sci1(4, "Effects of Electric Current", "04_Effects_of_Electric_Current"),
  sci1(5, "Heat", "05_Heat"),
  sci1(6, "Refraction of Light", "06_Refraction_of_Light"),
  sci1(7, "Lenses", "07_Lenses"),
  sci1(8, "Metallurgy", "08_Metallurgy"),
  sci1(9, "Carbon Compounds", "09_Carbon_Compounds"),
  sci1(10, "Space Missions", "10_Space_Missions"),

  // ── Science and Technology Part 2 (10) ─────────────────────────────────────
  // NB the bank spells these "Part 1"/"Part 2" while the folders use "Part-1"/"Part-2".
  sci2(1, "Heredity and Evolution", "01_Heredity_and_Evolution"),
  sci2(2, "Life Processes in Living Organisms Part 1", "02_Life_Processes_in_Living_Organisms_Part-1"),
  sci2(3, "Life Processes in Living Organisms Part 2", "03_Life_Processes_in_Living_Organisms_Part-2"),
  sci2(4, "Environmental Management", "04_Environmental_Management"),
  sci2(5, "Towards Green Energy", "05_Towards_Green_Energy"),
  sci2(6, "Animal Classification", "06_Animal_Classification"),
  sci2(7, "Introduction to Microbiology", "07_Introduction_to_Microbiology"),
  sci2(8, "Cell Biology and Biotechnology", "08_Cell_Biology_and_Biotechnology"),
  sci2(9, "Social Health", "09_Social_Health"),
  sci2(10, "Disaster Management", "10_Disaster_Management"),

  // ── Social Sciences Paper 2 — Geography (9) ────────────────────────────────
  geography(1, "Field Visit", "01_Field_Visit"),
  geography(2, "Location and Extent", "02_Location_and_Extent"),
  geography(3, "Physiography and Drainage", "03_Physiography_and_Drainage"),
  geography(4, "Climate", "04_Climate"),
  geography(5, "Natural Vegetation and Wildlife", "05_Natural_Vegetation_and_Wildlife"),
  geography(6, "Population", "06_Population"),
  geography(7, "Human Settlements", "07_Human_Settlements"),
  geography(8, "Economy and Occupations", "08_Economy_and_Occupations"),
  geography(9, "Tourism, Transport and Communication", "09_Tourism_Transport_and_Communication"),

  // ── Social Sciences Paper 1 — History (9) ──────────────────────────────────
  // NB the bank spells the two Historiography chapters with a colon, the folders
  // with an underscore — the registry is explicit precisely so this can't drift.
  history(1, "Historiography: Development in the West", "01_Historiography_Development_in_the_West"),
  history(2, "Historiography: Indian Tradition", "02_Historiography_Indian_Tradition"),
  history(3, "Applied History", "03_Applied_History"),
  history(4, "History of Indian Arts", "04_History_of_Indian_Arts"),
  history(5, "Mass Media and History", "05_Mass_Media_and_History"),
  history(6, "Entertainment and History", "06_Entertainment_and_History"),
  history(7, "Sports and History", "07_Sports_and_History"),
  history(8, "Tourism and History", "08_Tourism_and_History"),
  history(9, "Heritage Management", "09_Heritage_Management"),

  // ── Social Sciences Paper 1 — Political Science (5) ────────────────────────
  polsci(1, "Working of the Constitution", "01_Working_of_the_Constitution"),
  polsci(2, "The Electoral Process", "02_The_Electoral_Process"),
  polsci(3, "Political Parties", "03_Political_Parties"),
  polsci(4, "Social and Political Movements", "04_Social_and_Political_Movements"),
  polsci(5, "Challenges faced by Indian Democracy", "05_Challenges_faced_by_Indian_Democracy"),
];

/**
 * Base filename for a chapter's artifacts — the folder leaf, so the PYQ pair
 * sorts next to the existing `<leaf>_Quiz.docx` / `<leaf>_Quiz_Key.docx`.
 */
export function chapterDocBaseName(target: ChapterTarget): string {
  return target.dir.split("/").pop()!;
}

// ── Ordering ─────────────────────────────────────────────────────────────────

/** The slice of a QuestionRow the ordering needs. Structurally satisfied by QuestionRow. */
export type OrderableQuestion = {
  id: string;
  setId: string | null;
  pyqYear: number | null;
  questionNumber: string | null;
  subtopic: { id: string; name: string } | null;
};

/** Heading docxBuilder prints for a question whose subtopic is null. */
const TAIL_LABEL = "Other";

export type OrderOptions = {
  /**
   * Subtopics holding fewer than this many questions are folded into the tail
   * group (their `subtopic` nulled, so docxBuilder prints them under "Other").
   * 41% of MH-SSC-10 subtopic groups hold a single question — rendering each as
   * its own heading makes a printed chapter look scrappy. Pass 1 to keep them all.
   */
  minGroup?: number;
};

/** One atomic placement unit: a passage set (siblings must stay adjacent) or a lone question. */
type Unit<T> = {
  key: string;
  questions: T[];
  /** Modal subtopic across members; null once folded into the tail. */
  subtopic: { id: string; name: string } | null;
  /** Newest member's year — what the unit sorts by. */
  year: number | null;
  /** First member's printed number, for a stable tie-break. */
  firstNumber: string;
};

/** Ascending compare that pushes nulls/empties last. */
const byNumber = (a: string, b: string) => a.localeCompare(b, "en");

/** Newest year first; a null year sorts last. */
function byYearDesc(a: number | null, b: number | null): number {
  if (a === b) return 0;
  if (a === null) return 1;
  if (b === null) return -1;
  return b - a;
}

/** The subtopic held by most members; ties break on the earliest printed number. */
function modalSubtopic<T extends OrderableQuestion>(questions: T[]): T["subtopic"] {
  const counts = new Map<string, { subtopic: T["subtopic"]; n: number; first: string }>();
  for (const q of questions) {
    const label = q.subtopic?.name ?? TAIL_LABEL;
    const num = q.questionNumber ?? "";
    const hit = counts.get(label);
    if (hit) {
      hit.n += 1;
      if (byNumber(num, hit.first) < 0) hit.first = num;
    } else {
      counts.set(label, { subtopic: q.subtopic, n: 1, first: num });
    }
  }
  const ranked = Array.from(counts.values()).sort(
    (a, b) => b.n - a.n || byNumber(a.first, b.first)
  );
  return ranked[0]?.subtopic ?? null;
}

/**
 * Order one chapter's questions for its handout: subtopic-grouped, newest-year-first
 * within a group, passage sets kept whole, thin subtopics folded into a trailing
 * "Other" section.
 *
 * Guarantees (each covered by a test):
 *  - every input question appears exactly once, and inputs are never mutated;
 *  - set siblings end up ADJACENT and share one subtopic value — the invariant
 *    docxBuilder's `groupBySet` + `groupSubtopicLabel` rely on to print a shared
 *    passage once, under a single heading;
 *  - the folded tail is always last, however large it grows.
 */
export function orderChapterQuestions<T extends OrderableQuestion>(
  questions: T[],
  options: OrderOptions = {}
): T[] {
  const minGroup = options.minGroup ?? 2;
  if (questions.length === 0) return [];

  // 1. Collapse into atomic units — a passage set is placed as one block.
  const bySet = new Map<string, T[]>();
  const units: Unit<T>[] = [];
  for (const q of questions) {
    if (q.setId === null) {
      units.push({
        key: q.id,
        questions: [q],
        subtopic: q.subtopic,
        year: q.pyqYear,
        firstNumber: q.questionNumber ?? "",
      });
      continue;
    }
    const bucket = bySet.get(q.setId);
    if (bucket) bucket.push(q);
    else bySet.set(q.setId, [q]);
  }
  for (const [setId, members] of bySet) {
    // Printed sub-question order is the reading order of the passage.
    const ordered = [...members].sort((a, b) =>
      byNumber(a.questionNumber ?? "", b.questionNumber ?? "")
    );
    units.push({
      key: setId,
      questions: ordered,
      subtopic: modalSubtopic(ordered),
      year: ordered.reduce<number | null>(
        (best, q) => (byYearDesc(q.pyqYear, best) < 0 ? q.pyqYear : best),
        null
      ),
      firstNumber: ordered[0].questionNumber ?? "",
    });
  }

  // 2. Size each subtopic group by QUESTION count (not unit count) — a 2-question
  //    set is one unit but genuinely two questions, so it clears minGroup=2.
  const groupSize = new Map<string, number>();
  for (const unit of units) {
    const label = unit.subtopic?.name ?? TAIL_LABEL;
    groupSize.set(label, (groupSize.get(label) ?? 0) + unit.questions.length);
  }

  // 3. Fold thin groups into the tail. Folding is per-UNIT, so a set is never split.
  for (const unit of units) {
    const label = unit.subtopic?.name ?? TAIL_LABEL;
    if (label === TAIL_LABEL || (groupSize.get(label) ?? 0) < minGroup) {
      unit.subtopic = null;
    }
  }

  // 4. Named groups by question count desc, then name asc. Tail always last.
  const finalSize = new Map<string, number>();
  for (const unit of units) {
    const label = unit.subtopic?.name ?? TAIL_LABEL;
    finalSize.set(label, (finalSize.get(label) ?? 0) + unit.questions.length);
  }
  const rank = new Map<string, number>();
  Array.from(finalSize.keys())
    .filter((label) => label !== TAIL_LABEL)
    .sort((a, b) => (finalSize.get(b) ?? 0) - (finalSize.get(a) ?? 0) || a.localeCompare(b, "en"))
    .forEach((label, i) => rank.set(label, i));

  const sorted = [...units].sort((a, b) => {
    const la = a.subtopic?.name ?? TAIL_LABEL;
    const lb = b.subtopic?.name ?? TAIL_LABEL;
    const ra = la === TAIL_LABEL ? Number.MAX_SAFE_INTEGER : rank.get(la)!;
    const rb = lb === TAIL_LABEL ? Number.MAX_SAFE_INTEGER : rank.get(lb)!;
    if (ra !== rb) return ra - rb;
    const year = byYearDesc(a.year, b.year);
    if (year !== 0) return year;
    return byNumber(a.firstNumber, b.firstNumber) || byNumber(a.key, b.key);
  });

  // 5. Flatten, stamping each question with its unit's (possibly folded) subtopic
  //    so every set sibling carries one label. Copies — inputs stay untouched.
  return sorted.flatMap((unit) =>
    unit.questions.map((q) => ({ ...q, subtopic: unit.subtopic }) as T)
  );
}
