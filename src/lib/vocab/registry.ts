/**
 * The Cadet Vocab Book, declared as data.
 *
 * Unlike `src/lib/books/registry.ts`, this book is not a view over the bank —
 * most of its content is authored — so its chapters are letter bands rather
 * than bank chapters, and its unit is a WORD.
 *
 * ═══ PART 2 IS SPLIT BY EXAM, AND THE ORDER IS THE POINT ═══
 *
 * This reverses an earlier call recorded here, so the reasoning for both is
 * kept. The original objection was DUPLICATION: a word both exams have asked
 * would have to be printed in an NDA part and again in a CDS part. That
 * objection is real and is what the three-way split removes — `both` is its own
 * section, so every word is printed exactly once.
 *
 * What the split buys, measured over the FINAL corpus (target + option words):
 *
 *   both  302   asked by NDA *and* CDS
 *   nda  1001
 *   cds   788
 *
 * `both` FIRST, for both cohorts. A word two different papers have set is the
 * strongest recurrence signal in the corpus, and a single A-Z sequence hides it
 * completely. Then own-exam, then other-exam — which also gives a difficulty
 * ramp for free, since CDS is the graduate paper and its words run harder.
 *
 * ═══ IT IS A PRIORITY ORDER, NEVER A SKIP LIST ═══
 *
 * Of the 490 words the corpus has seen more than once — the only ones where
 * exam-exclusivity is falsifiable — 302 (61.6%) were asked by BOTH exams. UPSC
 * draws both English papers from one pool (migration 0038 exists because the
 * two exams share literal questions), so "NDA only" mostly records that we have
 * one sighting, not that CDS will never ask it. Telling an NDA student to SKIP
 * the CDS section would therefore be wrong more often than right, and each
 * section's blurb says so in as many words. Order, not exclusion.
 *
 * PART 3 IS NOT SPLIT, and that is measured rather than assumed: all 640
 * practice words come from NDA sources and ZERO from CDS, so an exam split
 * there would produce one full section and one empty one.
 *
 * ═══ THE BANDS ARE SIZED AGAINST THE FINAL CORPUS, NOT TODAY'S ═══
 *
 * Part 2 holds 655 authored words today and 2,922 once the option words land
 * (phase 3). Bands computed from 655 would be recut then and EVERY chapter URL
 * would move — so they are declared here, from the measured final distribution,
 * and frozen. Same call `books/registry.ts` makes about chapter order: "a
 * derived order would silently reshuffle the book on every ingest".
 *
 * PART MEMBERSHIP IS FROZEN THE SAME WAY, and this is the subtler half. A word
 * belongs to Part 2 if the exams ask it AT ALL — as the question's target OR as
 * an option — which is knowable now even though only the targets are authored
 * yet. Deciding membership from the CURRENT corpus instead would put 166 school
 * words in Part 1 today and move them to Part 2 in phase 3, changing their URL
 * and their meaning to a reader.
 */

/**
 * THREE PARTS, split on ONE yes/no fact: has a real UPSC paper asked this word?
 *
 * `pyq` and `practice` were one part until it was measured: 609 of the exam
 * words appear ONLY in coaching material (Oswaal books, weekly mocks) and never
 * in a paper. Merging them makes the book's headline claim — "the words the
 * papers have actually asked" — false for 22% of it.
 *
 * Unlike the NDA/CDS question, this split is CLEAN and costs no duplication: a
 * word either appears in a paper or it does not, and the 51 that appear in both
 * a paper and a mock simply belong to `pyq`. That is why it is a part and the
 * exam is only a tag.
 */
export type VocabPartKey = "pyq" | "practice" | "school";

/**
 * The exam sections inside Part 2. DERIVED FROM THE CORPUS, never authored —
 * the same rule `part` follows, and for the same reason: letting whoever types
 * an entry choose would put the book's central claim in their hands.
 */
export type VocabSectionKey = "both" | "nda" | "cds";

export type VocabSection = {
  key: VocabSectionKey;
  title: string;
  /** Printed under the section heading. Must never read as "you may skip this". */
  blurb: string;
  /** What the back-of-book index prints beside a word. */
  indexTag: string;
};

/**
 * Section order IS the study order, so this array is not merely a list.
 * Reordering it changes what a teacher tells a batch to do first.
 */
export const VOCAB_SECTIONS: VocabSection[] = [
  {
    key: "both",
    title: "Asked by Both Papers",
    indexTag: "NDA + CDS",
    blurb:
      "Set by NDA and by CDS. Two different papers have wanted this word, which makes these the highest-yield entries in the book — start here whichever exam you are sitting.",
  },
  {
    key: "nda",
    title: "Asked in NDA Papers",
    indexTag: "NDA",
    blurb:
      "So far seen only in NDA papers. CDS candidates: later work, not optional — most repeated words eventually turn up in the other paper too.",
  },
  {
    key: "cds",
    title: "Asked in CDS Papers",
    indexTag: "CDS",
    blurb:
      "So far seen only in CDS papers, which is the graduate paper and runs harder. NDA candidates: later work, not optional — most repeated words eventually turn up in the other paper too.",
  },
];

export type VocabPart = {
  key: VocabPartKey;
  /** "Part 1" — a book has parts, and the running head needs one. */
  ordinal: string;
  title: string;
  /**
   * What the INDEX prints. A name, never a number: an index entry reading
   * "Part 2 · A-C" makes the reader decode an ordinal AND a band that is
   * already implied by the word's own first letter.
   */
  indexTag: string;
  /** One line under the part heading, saying what earns a word its place here. */
  blurb: string;
};

export type VocabChapter = {
  slug: string;
  /** "A-C". Printed as the chapter heading. */
  label: string;
  part: VocabPartKey;
  /**
   * Set on Part 2 chapters only. Parts 1 and 3 have a single sequence, so the
   * field is absent there rather than carrying a meaningless default — an
   * absent section and a section that happens to be "nda" must stay
   * distinguishable.
   */
  section?: VocabSectionKey;
  /** Inclusive first letters this chapter covers. */
  letters: string[];
  /** Measured against the FINAL corpus — a target, not a promise. */
  expected: number;
};

export type VocabBookDefinition = {
  slug: string;
  title: string;
  subtitle: string;
  parts: VocabPart[];
  chapters: VocabChapter[];
};

const band = (from: string, to: string): string[] => {
  const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return A.slice(A.indexOf(from), A.indexOf(to) + 1).split("");
};

export const CADET_VOCAB: VocabBookDefinition = {
  slug: "cadet-vocab",
  title: "Cadet Vocabulary",
  // Follows the part order. It has now been wrong twice after a restructure —
  // if the parts move again, this line moves with them.
  subtitle:
    "The Class 5-12 school list, then every word an NDA or CDS paper has actually asked — with the sentence it was asked in — and finally the words only the mocks set.",
  /**
   * PART ORDER IS SCHOOL -> PAPERS -> PRACTICE: the book is read as a ladder,
   * from the foundation a cadet should already have, up to what the papers
   * actually set, then out to what the coaching books add.
   *
   * The ORDINALS live here and nowhere else. Slugs are keyed on the part's NAME
   * ("school-a-b", "papers-c"), never its number, so reordering the parts moves
   * no URL — which is the whole reason to name rather than number a slug.
   */
  parts: [
    {
      key: "school",
      ordinal: "Part 1",
      title: "School List (Class 5-12)",
      indexTag: "School",
      blurb:
        "The CBSE class lists — the foundation. Not yet seen in either exam, but assumed by both.",
    },
    {
      key: "pyq",
      ordinal: "Part 2",
      title: "Asked in the Papers",
      indexTag: "Papers",
      blurb:
        "Every word an NDA or CDS paper has actually asked, with the sentence it was asked in.",
    },
    {
      key: "practice",
      ordinal: "Part 3",
      title: "Practice Material",
      indexTag: "Practice",
      blurb:
        "Set only in mocks and coaching books, never yet in a paper. Worth learning — but not a past question.",
    },
  ],
  /**
   * ═══ AT MOST 200 ENTRIES PER CHAPTER, AND NEVER A SPLIT LETTER ═══
   *
   * Generated by `scripts/vocab/plan-chapters.ts` against the FINAL corpus
   * (2,091 pyq + 640 practice + 676 school = 3,407), not today's 12. Sizing on
   * the 655 target words alone produced 3 chapters where Part 1 needs 14 — and
   * these slugs are URLs, so that is not something a later pass can quietly fix.
   *
   * THE EXAM SPLIT REMOVED THE ONE OVER-CAP CHAPTER. Part 2 was previously a
   * single A-Z whose `papers-c` held 226 and could not be cut without splitting
   * the letter C. Sectioning by exam divides C three ways, so every chapter now
   * sits under 200 with no exception to defend.
   *
   * To regenerate: `npx tsx scripts/vocab/plan-sections.ts --cap=200` (Part 2)
   * and `plan-chapters.ts --cap=200` (Parts 1 and 3). Re-run after an ingest and
   * DIFF — do not trust these numbers, re-derive them.
   */
  chapters: [
    // ── Part 2 · section 1: asked by BOTH papers (302) ──
    { slug: "papers-both-a-o", label: "A-O", part: "pyq", section: "both", letters: band("A", "O"), expected: 185 },
    { slug: "papers-both-p-z", label: "P-Z", part: "pyq", section: "both", letters: band("P", "Z"), expected: 117 },

    // ── Part 2 · section 2: NDA only (1,001) ──
    { slug: "papers-nda-a-b", label: "A-B", part: "pyq", section: "nda", letters: band("A", "B"), expected: 119 },
    { slug: "papers-nda-c", label: "C", part: "pyq", section: "nda", letters: band("C", "C"), expected: 104 },
    { slug: "papers-nda-d-e", label: "D-E", part: "pyq", section: "nda", letters: band("D", "E"), expected: 155 },
    { slug: "papers-nda-f-k", label: "F-K", part: "pyq", section: "nda", letters: band("F", "K"), expected: 180 },
    { slug: "papers-nda-l-q", label: "L-Q", part: "pyq", section: "nda", letters: band("L", "Q"), expected: 186 },
    { slug: "papers-nda-r-t", label: "R-T", part: "pyq", section: "nda", letters: band("R", "T"), expected: 178 },
    { slug: "papers-nda-u-z", label: "U-Z", part: "pyq", section: "nda", letters: band("U", "Z"), expected: 79 },

    // ── Part 2 · section 3: CDS only (788) ──
    { slug: "papers-cds-a-c", label: "A-C", part: "pyq", section: "cds", letters: band("A", "C"), expected: 171 },
    { slug: "papers-cds-d-g", label: "D-G", part: "pyq", section: "cds", letters: band("D", "G"), expected: 179 },
    { slug: "papers-cds-h-o", label: "H-O", part: "pyq", section: "cds", letters: band("H", "O"), expected: 180 },
    { slug: "papers-cds-p-s", label: "P-S", part: "pyq", section: "cds", letters: band("P", "S"), expected: 170 },
    { slug: "papers-cds-t-z", label: "T-Z", part: "pyq", section: "cds", letters: band("T", "Z"), expected: 88 },

    { slug: "practice-a-d", label: "A-D", part: "practice", letters: band("A", "D"), expected: 197 },
    { slug: "practice-e-m", label: "E-M", part: "practice", letters: band("E", "M"), expected: 200 },
    { slug: "practice-n-s", label: "N-S", part: "practice", letters: band("N", "S"), expected: 180 },
    { slug: "practice-t-z", label: "T-Z", part: "practice", letters: band("T", "Z"), expected: 63 },

    { slug: "school-a-b", label: "A-B", part: "school", letters: band("A", "B"), expected: 145 },
    { slug: "school-c-d", label: "C-D", part: "school", letters: band("C", "D"), expected: 188 },
    { slug: "school-e-l", label: "E-L", part: "school", letters: band("E", "L"), expected: 191 },
    { slug: "school-m-z", label: "M-Z", part: "school", letters: band("M", "Z"), expected: 152 },
  ],
};

export const VOCAB_BOOKS: VocabBookDefinition[] = [CADET_VOCAB];

export function vocabBook(slug: string): VocabBookDefinition | undefined {
  return VOCAB_BOOKS.find((b) => b.slug === slug);
}

/**
 * What the back-of-book index prints beside a word.
 *
 * THE INDEX IS WHAT KEEPS ONE LOOKUP WORKING once Part 2 is split three ways:
 * a reader who does not know which exam asked a word finds it in the single
 * A-Z index, and this tag tells them which section to turn to. So a Part 2 word
 * is tagged by its SECTION ("NDA + CDS" / "NDA" / "CDS"), not by the part —
 * "Papers" would name the thing the reader already knows and withhold the thing
 * they came for.
 */
export function indexTagFor(
  book: VocabBookDefinition,
  part: VocabPartKey,
  section: VocabSectionKey | null
): string {
  if (section) {
    const s = VOCAB_SECTIONS.find((x) => x.key === section);
    if (!s) throw new Error(`indexTagFor: unknown section "${section}"`);
    return s.indexTag;
  }
  const p = book.parts.find((x) => x.key === part);
  if (!p) throw new Error(`indexTagFor: unknown part "${part}"`);
  return p.indexTag;
}

/**
 * Which exam section a word belongs to, from the exams that have ASKED it.
 *
 * A word seen in both papers is `both`; otherwise it takes the single exam that
 * has it. An empty set cannot occur for a Part 2 word by construction (a word
 * is in Part 2 because a paper asked it), and resolving it to `nda` rather than
 * throwing would invent a claim — so callers must pass a non-empty set and the
 * function says so.
 */
export function examSectionOf(exams: Iterable<string>): VocabSectionKey {
  const s = new Set(exams);
  if (s.has("NDA") && s.has("CDS")) return "both";
  if (s.has("CDS")) return "cds";
  if (s.has("NDA")) return "nda";
  throw new Error("examSectionOf: no exam — a Part 2 word is defined by the paper that asked it");
}

/**
 * Which chapter a word belongs to. Pure, and the ONLY place the letter -> chapter
 * rule lives — the commit script and the reader must not each have their own.
 *
 * `section` IS A REQUIRED PARAMETER THAT ACCEPTS null, rather than an optional
 * one. Optional compiles for every existing caller, so the typechecker stays
 * silent and a caller that has not been updated files every word into one
 * section — a failure that is invisible, because the entry renders perfectly,
 * in the wrong section, under a claim about which exam asked it. Required-but-
 * nullable makes tsc enumerate all four call sites and forces each to say which
 * case it is in. (The same technique `Chapter.examId` used when a second class
 * landed on the NCERT pipeline.)
 */
export function chapterFor(
  book: VocabBookDefinition,
  part: VocabPartKey,
  word: string,
  section: VocabSectionKey | null
): VocabChapter | undefined {
  const first = (word.trim()[0] ?? "").toUpperCase();
  const sectioned = book.chapters.some((c) => c.part === part && c.section);
  if (sectioned && !section) {
    throw new Error(`chapterFor: part "${part}" is split by exam — pass a section`);
  }
  return book.chapters.find(
    (c) => c.part === part && c.letters.includes(first) && (!sectioned || c.section === section)
  );
}
