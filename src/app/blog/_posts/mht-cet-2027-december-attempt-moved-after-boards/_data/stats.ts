/**
 * Every number the MHT-CET 2027 dates post states, in one place, measured on
 * the live bank on 2026-10-10.
 *
 * THE QUESTION. With both 2027 attempts now after the HSC boards, how much of
 * an MHT-CET paper does board revision already cover? Board revision is the
 * Std XII book; the Std XI book is not on the HSC paper. So each chapter of
 * the 2023-2025 papers (40 papers per subject) is filed under the Balbharati
 * book it comes from.
 *
 * HOW A CHAPTER IS FILED. The syllabus rulings
 * (scripts/syllabus/data/*-cet-rulings.json) tie each CET subtopic to
 * numbered Balbharati sections, each marked XI or XII. Where a chapter has at
 * least MIN_RULED_QUESTIONS ruled questions, bookFromRuledTally decides: one
 * book if 75%+ of them point only to it, otherwise "both". Below that floor
 * (the rulings predate a later subtopic rename, so about a third of Maths is
 * unruled) the chapter goes by its Balbharati chapter title.
 *
 * The prod-contract suite tests/blog-mhtcet-2027-stats.test.ts re-derives the
 * counts below from production and re-checks every well-ruled chapter's book,
 * so the article cannot quietly drift from the bank.
 */

export type Subject = "Physics" | "Chemistry" | "Maths";
export type Book = "XII" | "XI" | "both";

export const SUBJECTS: readonly Subject[] = ["Physics", "Chemistry", "Maths"];
export const BOOKS: readonly Book[] = ["XII", "XI", "both"];

/** The papers measured: every MHT-CET PCM shift we hold from 2023 to 2025. */
export const WINDOW = { fromYear: 2023, toYear: 2025, papers: 40 } as const;

/** MHT-CET PCM: 50 questions a subject, Maths at 2 marks, 200 marks, no negative marking. */
export const MARKS_PER_QUESTION: Record<Subject, number> = { Physics: 1, Chemistry: 1, Maths: 2 };

/** A chapter needs this many ruled questions before its rulings decide its book. */
export const MIN_RULED_QUESTIONS = 20;
const SINGLE_BOOK_SHARE = 0.75;

export function bookFromRuledTally(t: Record<Book, number>): Book | null {
  const n = t.XII + t.XI + t.both;
  if (n < MIN_RULED_QUESTIONS) return null;
  if (t.XII / n >= SINGLE_BOOK_SHARE) return "XII";
  if (t.XI / n >= SINGLE_BOOK_SHARE) return "XI";
  return "both";
}

export type ChapterCount = { subject: Subject; chapter: string; book: Book; questions: number };

/** Questions per chapter, 2023-2025, PUBLIC past-paper questions only. */
export const CHAPTER_COUNTS: readonly ChapterCount[] = [
  // Physics
  { subject: "Physics", chapter: "Electrostatics", book: "both", questions: 156 },
  { subject: "Physics", chapter: "AC Circuits", book: "XII", questions: 124 },
  { subject: "Physics", chapter: "Rotational Dynamics", book: "both", questions: 122 },
  { subject: "Physics", chapter: "Semiconductor Devices", book: "XII", questions: 122 },
  { subject: "Physics", chapter: "Superposition of Waves", book: "both", questions: 118 },
  { subject: "Physics", chapter: "Mechanical Properties of Fluids", book: "XII", questions: 118 },
  { subject: "Physics", chapter: "Electromagnetic Induction", book: "XII", questions: 115 },
  { subject: "Physics", chapter: "Wave Optics", book: "XII", questions: 112 },
  { subject: "Physics", chapter: "Oscillations", book: "XII", questions: 106 },
  { subject: "Physics", chapter: "Magnetic Fields Due to Electric Current", book: "XII", questions: 94 },
  { subject: "Physics", chapter: "Thermodynamics", book: "XII", questions: 81 },
  { subject: "Physics", chapter: "Dual Nature of Radiation and Matter", book: "XII", questions: 80 },
  { subject: "Physics", chapter: "Structure of Atoms and Nuclei", book: "XII", questions: 80 },
  { subject: "Physics", chapter: "Current Electricity", book: "XII", questions: 79 },
  { subject: "Physics", chapter: "Thermal Properties of Matter", book: "both", questions: 79 },
  { subject: "Physics", chapter: "Kinetic Theory of Gases", book: "XII", questions: 76 },
  { subject: "Physics", chapter: "Gravitation", book: "XI", questions: 76 },
  { subject: "Physics", chapter: "Optics (Ray)", book: "XI", questions: 73 },
  { subject: "Physics", chapter: "Motion in a Plane", book: "XI", questions: 47 },
  { subject: "Physics", chapter: "Laws of Motion", book: "XI", questions: 45 },
  { subject: "Physics", chapter: "Sound", book: "both", questions: 45 },
  { subject: "Physics", chapter: "Magnetic Materials", book: "both", questions: 31 },
  { subject: "Physics", chapter: "Units and Measurement", book: "XI", questions: 14 },
  { subject: "Physics", chapter: "Mechanical Properties of Solids", book: "XI", questions: 5 },
  // Chemistry
  { subject: "Chemistry", chapter: "Solutions and Colligative Properties", book: "XII", questions: 125 },
  { subject: "Chemistry", chapter: "Solid State", book: "XII", questions: 125 },
  { subject: "Chemistry", chapter: "Chemical Kinetics", book: "XII", questions: 120 },
  { subject: "Chemistry", chapter: "Alcohols, Phenols and Ethers", book: "XII", questions: 119 },
  { subject: "Chemistry", chapter: "Electrochemistry", book: "XII", questions: 117 },
  { subject: "Chemistry", chapter: "Ionic Equilibria", book: "XII", questions: 117 },
  { subject: "Chemistry", chapter: "Chemical Thermodynamics and Energetics", book: "XII", questions: 116 },
  { subject: "Chemistry", chapter: "Aldehydes, Ketones and Carboxylic Acids", book: "XII", questions: 102 },
  { subject: "Chemistry", chapter: "Coordination Compounds", book: "XII", questions: 84 },
  { subject: "Chemistry", chapter: "Biomolecules", book: "XII", questions: 83 },
  { subject: "Chemistry", chapter: "Introduction to Polymer Chemistry", book: "XII", questions: 80 },
  { subject: "Chemistry", chapter: "Amines", book: "XII", questions: 78 },
  { subject: "Chemistry", chapter: "Halogen Derivatives of Alkanes", book: "XII", questions: 76 },
  { subject: "Chemistry", chapter: "Transition and Inner Transition Elements", book: "XII", questions: 72 },
  { subject: "Chemistry", chapter: "Structure of Atom", book: "XI", questions: 67 },
  { subject: "Chemistry", chapter: "Chemical Bonding and Molecular Structure", book: "XI", questions: 59 },
  { subject: "Chemistry", chapter: "Some Basic Concepts of Chemistry", book: "XI", questions: 51 },
  { subject: "Chemistry", chapter: "Elements of Group 16, 17 and 18", book: "XII", questions: 45 },
  { subject: "Chemistry", chapter: "Redox Reactions", book: "XI", questions: 42 },
  { subject: "Chemistry", chapter: "Surface Chemistry", book: "XI", questions: 36 },
  { subject: "Chemistry", chapter: "Elements of Group 1 and 2", book: "both", questions: 35 },
  { subject: "Chemistry", chapter: "Alkanes", book: "both", questions: 35 },
  { subject: "Chemistry", chapter: "Basic Principles of Organic Chemistry", book: "XI", questions: 35 },
  { subject: "Chemistry", chapter: "Aromatic Compounds", book: "both", questions: 33 },
  { subject: "Chemistry", chapter: "Alkenes", book: "XI", questions: 33 },
  { subject: "Chemistry", chapter: "Green Chemistry and Nanochemistry", book: "XII", questions: 31 },
  { subject: "Chemistry", chapter: "States of Matter", book: "XI", questions: 28 },
  { subject: "Chemistry", chapter: "Modern Periodic Table", book: "XI", questions: 18 },
  { subject: "Chemistry", chapter: "Alkynes", book: "XI", questions: 9 },
  { subject: "Chemistry", chapter: "Elements of Group 13, 14 and 15", book: "XI", questions: 3 },
  // Maths
  { subject: "Maths", chapter: "Vectors", book: "XII", questions: 208 },
  { subject: "Maths", chapter: "Trigonometric Functions", book: "XII", questions: 202 },
  { subject: "Maths", chapter: "Line and Plane", book: "XII", questions: 185 },
  { subject: "Maths", chapter: "Applications of Derivative", book: "XII", questions: 168 },
  { subject: "Maths", chapter: "Indefinite Integration", book: "XII", questions: 146 },
  { subject: "Maths", chapter: "Differential Equations", book: "XII", questions: 130 },
  { subject: "Maths", chapter: "Differentiation", book: "XII", questions: 129 },
  { subject: "Maths", chapter: "Probability Distribution", book: "both", questions: 103 },
  { subject: "Maths", chapter: "Mathematical Logic", book: "XII", questions: 80 },
  { subject: "Maths", chapter: "Limits", book: "XI", questions: 80 },
  { subject: "Maths", chapter: "Definite Integration", book: "XII", questions: 62 },
  { subject: "Maths", chapter: "Binomial Distribution", book: "XII", questions: 53 },
  { subject: "Maths", chapter: "Determinants and Matrices", book: "both", questions: 43 },
  { subject: "Maths", chapter: "Applications of Definite Integral", book: "XII", questions: 41 },
  { subject: "Maths", chapter: "Pair of Straight Lines", book: "XII", questions: 41 },
  { subject: "Maths", chapter: "Linear Programming", book: "XII", questions: 40 },
  { subject: "Maths", chapter: "Circle", book: "XI", questions: 40 },
  { subject: "Maths", chapter: "Straight Line", book: "XI", questions: 39 },
  { subject: "Maths", chapter: "Complex Numbers", book: "XI", questions: 39 },
  { subject: "Maths", chapter: "Permutations and Combinations", book: "XI", questions: 37 },
  { subject: "Maths", chapter: "Trigonometry - II", book: "XI", questions: 34 },
  { subject: "Maths", chapter: "Sets, Relations and Functions", book: "XI", questions: 34 },
  { subject: "Maths", chapter: "Measures of Dispersion", book: "XI", questions: 27 },
  { subject: "Maths", chapter: "Conic Sections", book: "XI", questions: 17 },
  { subject: "Maths", chapter: "Sequences and Series", book: "XI", questions: 10 },
  { subject: "Maths", chapter: "Quadratic Equations", book: "XI", questions: 4 },
];

export function subjectTotal(subject: Subject): number {
  return CHAPTER_COUNTS.filter((r) => r.subject === subject).reduce((a, r) => a + r.questions, 0);
}

/** Questions per paper from one book's chapters, to one decimal. */
export function perPaper(subject: Subject, book: Book): number {
  const n = CHAPTER_COUNTS.filter((r) => r.subject === subject && r.book === book).reduce((a, r) => a + r.questions, 0);
  return Math.round((10 * n) / WINDOW.papers) / 10;
}

/** Share of all marks by book, whole numbers that add to 100 (largest remainder). */
export function marksShare(): Record<Book, number> {
  const marks: Record<Book, number> = { XII: 0, XI: 0, both: 0 };
  for (const r of CHAPTER_COUNTS) marks[r.book] += r.questions * MARKS_PER_QUESTION[r.subject];
  const total = marks.XII + marks.XI + marks.both;
  const raw = BOOKS.map((b) => ({ b, v: (100 * marks[b]) / total }));
  const out: Record<Book, number> = { XII: 0, XI: 0, both: 0 };
  for (const x of raw) out[x.b] = Math.floor(x.v);
  let left = 100 - (out.XII + out.XI + out.both);
  for (const x of [...raw].sort((p, q) => (q.v % 1) - (p.v % 1))) {
    if (left-- <= 0) break;
    out[x.b] += 1;
  }
  return out;
}

export function topChaptersOf(subject: Subject, book: Book, n: number): ChapterCount[] {
  return CHAPTER_COUNTS.filter((r) => r.subject === subject && r.book === book)
    .slice()
    .sort((a, b) => b.questions - a.questions)
    .slice(0, n);
}

export type TimelineStatus = "announced" | "reported" | "not announced";

/**
 * The 2027 season as known on 10 October 2026. `sortKey` is the earliest day
 * the step can start, for ordering only. HSC dates are the board's probable
 * schedule of 17 September 2026; the CET dates are news reports of 9 October
 * 2026, with no CET Cell notice yet.
 */
export const TIMELINE: readonly { sortKey: string; when: string; what: string; status: TimelineStatus }[] = [
  { sortKey: "2027-01-20", when: "Late January to 6 Feb 2027", what: "HSC practicals, orals and internal assessment", status: "announced" },
  { sortKey: "2027-02-08", when: "8 Feb to 16 Mar 2027", what: "HSC written papers", status: "announced" },
  { sortKey: "2027-03-17", when: "After the boards, around late March or April 2027", what: "MHT-CET first attempt", status: "reported" },
  { sortKey: "2027-04-15", when: "Around May 2027, at least four weeks later", what: "MHT-CET second attempt", status: "reported" },
];
