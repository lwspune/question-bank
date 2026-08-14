/**
 * Which subjects the syllabus map covers, and what differs between them.
 *
 * `syllabus_concepts` carries `subject` in its unique key `(source, class,
 * subject, section_no)`, so two subjects coexist without a migration and WITHOUT
 * new spine names: "MH State Board", "NCERT" and "<exam> bank taxonomy" name
 * BOOKS, not subjects, and Physics reuses them. `SPINE`/`BOOK_OF_EXAM` in
 * summary.ts are therefore subject-independent by design — the only thing that
 * must be per-subject is what genuinely differs, which is this file.
 *
 * Adding a subject is a data job, not a code job: append an entry here, seed its
 * spines, and its route exists.
 */

export type SyllabusSubjectKey = "chemistry" | "physics" | "maths";

export type SyllabusSubject = {
  /** URL segment: /dashboard/syllabus/<key>. */
  key: SyllabusSubjectKey;
  /** The literal `syllabus_concepts.subject` value. Every loader filters on it. */
  subject: string;
  /** Heading text. */
  label: string;
  /**
   * First exam year whose papers reflect the CURRENT syllabus. A chapter whose
   * last question predates this is treated as dropped (`loadOldSyllabusChapters`
   * tests `lastYear < liveFromYear`).
   *
   * THIS IS A JEE-ONLY FACT. It exists because JEE rationalised its syllabus and
   * genuinely stopped setting whole chapters — a dated event, visible in a
   * 3,455-question corpus where a chapter going silent is real evidence. Neither
   * other exam has such an event: MHT-CET is set on the State Board syllabus, and
   * NDA is a services exam that does not rationalise. Do NOT read this as a knob
   * to tune per exam.
   *
   * That the value is applied to all three exams is a containment measure, not a
   * feature. The dead SET is keyed per exam (see `loadOldSyllabusByExam`) so that
   * JEE's deadness cannot leak onto the others by shared chapter name — which was
   * a real defect that buried 183 live MHT-CET PYQ. Raising this value to make the
   * JEE column sharper therefore flags the other two exams as collateral, and the
   * arithmetic is brutal:
   *   2026 — correct for JEE (7 dead), but MHT-CET has NO 2026 papers at all, so
   *          all 30 of its chapters read as dropped and its row collapses to
   *          live=0; NDA loses 5, three of them merely unsampled in a single
   *          15-question 2026 sitting.
   *   2025 — JEE 5 dead, MHT-CET 0, but NDA 2 — and NDA averages ~29 questions a
   *          year over 12 chapters, so absence in a year is noise, not a signal.
   * Hence 2023 for Chemistry: nothing is assumed dead for anyone. It costs 3 rows
   * of history on JEE's 37-row gap list, which is cheaper than asserting a
   * syllabus change that did not happen.
   *
   * Physics 2024 is calibrated the same way and happens to be safe because it
   * sits BELOW every exam's newest year: Communication Systems (63 PYQ, last set
   * 2023) is dead, and no MHT-CET or NDA chapter is touched.
   *
   * Measure before changing this: per exam, the newest year in the bank AND the
   * per-chapter last year. A threshold at or above an exam's newest year marks
   * that entire exam dead.
   */
  liveFromYear: number;
  /** State Board spine seed files under scripts/syllabus/data/. */
  seedFiles: string[];
  /**
   * NCERT spine seed files, seeded with `--spine=ncert`.
   *
   * Separate from the State Board list rather than concatenated: the two spines
   * are seeded independently (the NCERT extraction is a different script with
   * its own failure modes), and a single list would force a re-seed of both
   * whenever either changes. Empty means that spine is not extracted yet.
   */
  ncertSeedFiles: string[];
  /**
   * What the BANK's `subjects.name` rows are called, when any exam disagrees
   * with the spine literal. JEE's Maths subject row is literally "Maths" while
   * NDA and MHT-CET say "Mathematics" — the first subject where the three banks
   * disagree — and both bank-join seams (`ingest-bank-spine`,
   * `loadOldSyllabusByExam`) would silently drop JEE on a plain
   * `.eq("subjects.name", subject)`: the spine would ingest 196 of 309 subtopics
   * and the dead-chapter scan would see no JEE Maths at all, with no error
   * either way. Renaming the JEE row instead is the wrong fix — scripts/jee/
   * passes the 'Maths' literal throughout.
   *
   * Absent means the spine literal IS the bank name (Chemistry, Physics). When
   * present it must include the spine literal itself: aliases WIDEN the join,
   * never replace it. Resolve via {@link bankSubjectNames}, not by reading this
   * field — the helper is what keeps the default in one place.
   */
  bankSubjectNames?: string[];
  /**
   * The State Board book teaches some topics across BOTH years as complementary
   * halves — Std XI Ch.10 Electrostatics stops at Gauss' law and Std XII Ch.8
   * picks it up at potential and capacitance; likewise current electricity,
   * magnetism, optics and semiconductors. Those chapters have two legitimate
   * book homes, so pinning one dominant chapter hides the other.
   *
   * Chemistry has no such spiral, which is why this is a flag and not the
   * default: the shipped Chemistry ordering must not move.
   */
  spiralChapters: boolean;
  /**
   * Per-class callout under the alignment table, warning where the two books
   * teach the same material in DIFFERENT years.
   *
   * Optional, and absent means "not measured yet" — never "no mismatch". Each
   * string is a counted claim about one subject's books, so it cannot be reused
   * or guessed across subjects: Chemistry's crossings are a dozen rows confined
   * to Thermodynamics and Equilibrium, whereas the Physics books diverge over
   * roughly a third of their chapters in BOTH directions. Writing a plausible
   * note before counting is exactly the fabrication this map exists to avoid.
   */
  crossYearNote?: Partial<Record<11 | 12, string>>;
};

export const SYLLABUS_SUBJECTS: Record<SyllabusSubjectKey, SyllabusSubject> = {
  chemistry: {
    key: "chemistry",
    subject: "Chemistry",
    label: "Chemistry",
    liveFromYear: 2023,
    seedFiles: ["chem-sb-11.json", "chem-sb-12.json"],
    // Chemistry's NCERT spine is seeded by ingest-ncert-spine.ts, which also
    // authors its State Board rulings, so it is not re-seeded from here.
    ncertSeedFiles: [],
    spiralChapters: false,
    crossYearNote: {
      // Measured: 12 of 72 Std XI rows cross into the Std XII State Board book
      // and every one is Thermodynamics or Equilibrium. Std XII crosses back
      // exactly once, so the callout belongs on Std XI only.
      11:
        " Watch the year: NCERT teaches Thermodynamics and Equilibrium in Class 11," +
        " but the State Board holds them until Std XII — the mismatch there is" +
        " timing, not absence.",
    },
  },
  physics: {
    key: "physics",
    subject: "Physics",
    label: "Physics",
    liveFromYear: 2024,
    seedFiles: ["phy-sb-11.json", "phy-sb-12.json"],
    ncertSeedFiles: ["phy-ncert-11.json", "phy-ncert-12.json"],
    spiralChapters: true,
  },
  maths: {
    key: "maths",
    subject: "Mathematics",
    label: "Mathematics",
    // Measured 2026-08-07: every JEE Maths chapter reaches 2025/2026 except
    // Height & Distance (last 2023, 15 PYQ) and Mathematical Reasoning (last
    // 2023, 67 PYQ) — both dropped in the 2025 JEE rationalisation. 2024 flags
    // exactly those two. Watch: Properties of Triangle last fired 2024 across
    // only 11 PYQ, so it reads live — correctly undecided until 2026 papers
    // settle it. NDA has no dead chapters; MHT-CET's Measures of Dispersion
    // (last 2024) stays live, one silent year not being evidence.
    liveFromYear: 2024,
    seedFiles: ["maths-sb-11.json", "maths-sb-12.json"],
    ncertSeedFiles: ["maths-ncert-11.json", "maths-ncert-12.json"],
    // Trig (XI Ch.2-3 -> XII Ch.3), Matrices/Determinants (XI Ch.4 -> XII Ch.2),
    // Straight Line (XI Ch.5 -> XII Pair of Lines), Probability (XI Ch.9 ->
    // XII Ch.7-8) and Limits/Continuity/Differentiation (XI Part 2 Ch.7-9 ->
    // XII Part 2 Ch.1-2) all split across the two State Board years.
    spiralChapters: true,
    bankSubjectNames: ["Mathematics", "Maths"],
  },
};

/**
 * The `subjects.name` literals a bank join must match for a spine subject.
 * Defaults to the literal itself for unregistered or alias-free subjects, so
 * every existing caller keeps its exact behaviour. See
 * {@link SyllabusSubject.bankSubjectNames} for why this exists.
 */
export function bankSubjectNames(subject: string): string[] {
  const entry = Object.values(SYLLABUS_SUBJECTS).find((s) => s.subject === subject);
  return entry?.bankSubjectNames ?? [subject];
}

/** The subject `/dashboard/syllabus` redirects to. */
export const DEFAULT_SYLLABUS_SUBJECT: SyllabusSubjectKey = "chemistry";

export function syllabusSubjectKeys(): SyllabusSubjectKey[] {
  return Object.keys(SYLLABUS_SUBJECTS) as SyllabusSubjectKey[];
}

function isSubjectKey(key: string): key is SyllabusSubjectKey {
  return Object.prototype.hasOwnProperty.call(SYLLABUS_SUBJECTS, key);
}

/**
 * Resolve a URL segment. Returns null for anything unmapped so the route can
 * 404 — falling back to the default would serve the Chemistry map under another
 * subject's URL and read as a claim that subject had been mapped.
 */
export function resolveSyllabusSubject(key: string | undefined): SyllabusSubject | null {
  if (!key) return null;
  const k = key.trim().toLowerCase();
  // hasOwnProperty, not `k in`, so "constructor"/"toString" cannot resolve.
  return isSubjectKey(k) ? SYLLABUS_SUBJECTS[k] : null;
}
