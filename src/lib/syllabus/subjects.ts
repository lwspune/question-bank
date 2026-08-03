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

export type SyllabusSubjectKey = "chemistry" | "physics";

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
   * This is DERIVED from each subject's bank, not asserted, and the two subjects
   * genuinely differ — sharing one constant gives the wrong answer:
   *   Chemistry — seven rationalised chapters stop at 2021 (metallurgy, polymers,
   *               surface chemistry, ...), every live chapter reaches 2026.
   *   Physics   — Communication Systems (63 PYQ) was still set in 2023 and has
   *               nothing since; all 27 other JEE Physics chapters reach 2026.
   * At 2023, Physics' one dropped chapter reads as live. At 2024, the split is
   * 1 dead / 27 live with a two-year margin either side.
   */
  liveFromYear: number;
  /** State Board spine seed files under scripts/syllabus/data/. */
  seedFiles: string[];
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
    spiralChapters: true,
  },
};

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
