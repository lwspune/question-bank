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
 *   both  149   asked by NDA *and* CDS
 *   nda  1001
 *   cds   941
 *
 * THOSE COUNTS REST ON A DISTINCTION THAT COST 153 WORDS TO GET RIGHT. An
 * option word carries the exams that PRINTED it, and 288 of them were printed
 * both in a paper and in a mock. Filing on the merged list put 153 words in
 * `both` whose second exam had only ever seen them in coaching material — a
 * section that claims two PAPERS asked a word. `OptionWord.pyqExams` exists to
 * keep the two apart, and placement may read only that.
 *
 * `both` FIRST, for both cohorts. A word two different papers have set is the
 * strongest recurrence signal in the corpus, and a single A-Z sequence hides it
 * completely. Then own-exam, then other-exam — which also gives a difficulty
 * ramp for free, since CDS is the graduate paper and its words run harder.
 *
 * ═══ IT IS A PRIORITY ORDER, NEVER A SKIP LIST ═══
 *
 * Of the 490 words the corpus has seen more than once — the only ones where
 * exam-exclusivity is falsifiable — 149 (30.4%) were asked by BOTH exams.
 *
 * READ THAT NUMBER CAREFULLY, because an earlier draft of this comment said
 * 61.6% and drew a stronger conclusion than the data supports. The inflated
 * figure came from the merged-exams bug above. At 30.4% the two papers are
 * plainly NOT separate vocabularies — separate pools predict ~0%, and UPSC
 * demonstrably shares literal English questions between the exams (migration
 * 0038 exists for that reason) — but neither are they one undifferentiated
 * pool, which would predict ~50%. Each paper does lean toward its own words.
 *
 * The conclusion survives the correction: a word in the other exam's section
 * still has roughly a one-in-three chance of turning up in yours, so telling a
 * student to SKIP that section would be wrong far too often. It is a priority
 * ORDER, and each section's blurb says so in as many words.
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
export type VocabPartKey = "pyq" | "practice" | "school" | "idiom";

/**
 * The exam sections inside Part 2. DERIVED FROM THE CORPUS, never authored —
 * the same rule `part` follows, and for the same reason: letting whoever types
 * an entry choose would put the book's central claim in their hands.
 */
export type VocabSectionKey = "both" | "nda" | "cds" | "papers" | "practice-set";

export type VocabSection = {
  key: VocabSectionKey;
  /**
   * Which part the section belongs to. Sections are NOT a single axis: Part 2
   * splits by EXAM (both / NDA / CDS) and Part 4 by PROVENANCE (papers /
   * practice). Without this field a listing would print Part 2's sections under
   * Part 4, which is how the contents page first rendered after Part 4 landed.
   */
  part: VocabPartKey;
  title: string;
  /** Printed under the section heading. Must never read as "you may skip this". */
  blurb: string;
};

/**
 * Section order IS the study order, so this array is not merely a list.
 * Reordering it changes what a teacher tells a batch to do first.
 */
export const VOCAB_SECTIONS: VocabSection[] = [
  {
    key: "both",
    part: "pyq",
    title: "Asked by Both Papers",
    blurb:
      "Set by NDA and by CDS. Two different papers have wanted this word, which makes these the highest-yield entries in the book — start here whichever exam you are sitting.",
  },
  {
    key: "nda",
    part: "pyq",
    title: "Asked in NDA Papers",
    blurb:
      "So far seen only in NDA papers. CDS candidates: later work, not optional — most repeated words eventually turn up in the other paper too.",
  },
  {
    key: "cds",
    part: "pyq",
    title: "Asked in CDS Papers",
    blurb:
      "So far seen only in CDS papers, which is the graduate paper and runs harder. NDA candidates: later work, not optional — most repeated words eventually turn up in the other paper too.",
  },

  /**
   * PART 4 SPLITS ON PROVENANCE, NOT ON EXAM, and that was a measured call.
   * The exam split works for Part 2 because its sections run 149 / 1,001 / 941
   * and save a candidate ~47 pages. Part 4 is 3.5 pages of content, and its
   * NDA+CDS group is FOUR idioms — a section heading over a footnote. The exam
   * is already on every entry as its tag, so an exam split there would add
   * navigation and no information.
   *
   * This boundary is different in kind: "a real paper set this" versus "only a
   * mock did" is the book's integrity claim, structural enough to earn Part 3
   * an entire part of its own.
   */
  {
    key: "papers",
    part: "idiom",
    title: "Set in the Papers",
    /**
     * THE SECOND SENTENCE WAS DELETED WITH THE PER-ENTRY EXAM TAG, and this is
     * the reason the tag's removal touched the registry at all. It read "The
     * exam that set it is named on each entry", which was a promise about the
     * page — and the moment the tags went it became a claim the book does not
     * keep. A blurb that describes a feature the pages no longer have is worse
     * than no blurb: it sends a reader looking for something that is not there.
     */
    blurb:
      "Set by a real NDA or CDS paper, with the meaning that paper keyed as correct.",
  },
  {
    key: "practice-set",
    part: "idiom",
    title: "Practice Material",
    blurb:
      "Set only in mocks and coaching books, never yet in a paper. Worth learning — but not a past question.",
  },
];

export type VocabPart = {
  key: VocabPartKey;
  /** "Part 1" — a book has parts, and the running head needs one. */
  ordinal: string;
  title: string;
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
  /**
   * Set on PART 1 ONLY. Part 1 is a class ladder, so its chapter is decided by
   * the word's CLASS and not by its initial letter -- which is why `letters` is
   * optional and absent there. The two are mutually exclusive by construction:
   * a chapter is found by one or the other, never both.
   */
  schoolClass?: number;
  /** Inclusive first letters this chapter covers. Absent on a class rung. */
  letters?: string[];
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
    "The Class 5-12 school list, then every word an NDA or CDS paper has printed — with the sentence it was asked in, wherever the paper tested it — and finally the words only the mocks set.",
  /**
   * PART ORDER IS SCHOOL -> PAPERS -> PRACTICE: the book is read as a ladder,
   * from the foundation a cadet should already have, up to what the papers
   * actually set, then out to what the coaching books add.
   *
   * The ORDINALS live here and nowhere else. Slugs are keyed on the part's NAME
   * ("school-class-9", "papers-c"), never its number, so reordering the parts moves
   * no URL — which is the whole reason to name rather than number a slug.
   */
  parts: [
    {
      key: "school",
      ordinal: "Part 1",
      title: "School List (Class 5-12)",
      /**
       * THE BLURB NAMES THE MIXED PROVENANCE, because the heading "Class 9"
       * would otherwise imply CBSE graded every word under it. Most of the
       * upper rungs are ours: the printed Class 9 list is 86% a re-run of
       * Class 7, so filing each word at the class that FIRST introduces it
       * leaves Class 9 holding 21 of the source's words and Class 12 holding
       * 30. The rest were written to the level of that class. `school_source`
       * records which is which per row (migration 0092); this line is what a
       * reader sees.
       */
      blurb:
        "A ladder, one rung per class. Each word sits at the class that should first know it, so a student can start at their own level and climb. Built on the CBSE class lists and extended to a full rung where those lists only repeat themselves.",
    },
    {
      key: "pyq",
      ordinal: "Part 2",
      title: "Asked in the Papers",
      /**
       * "PRINTED", not "asked", and the distinction is load-bearing. Only 510
       * of Part 2's 2,091 words were the TARGET of a question; the rest
       * appeared among the four choices. Both were set in front of a candidate
       * by a real paper, so both belong here — but claiming the exam "asked"
       * a distractor would be false for three quarters of the part, and this
       * book's whole claim over a bought word list is that its provenance is
       * exact. A tested word carries the sentence it was asked in; an option
       * word carries no citation and no recurrence count, so the page shows
       * which is which without needing a label.
       */
      blurb:
        "Every word an NDA or CDS paper has printed. Where the paper tested the word, the sentence it was asked in is given.",
    },
    {
      key: "practice",
      ordinal: "Part 3",
      title: "Practice Material",
      blurb:
        "Set only in mocks and coaching books, never yet in a paper. Worth learning — but not a past question.",
    },
    {
      /**
       * PART 4 CARRIES A MEANING AND NOTHING ELSE, and that is the corpus's
       * decision rather than a shortcut. Of the 350 idiom questions, 318 print
       * the bare idiom with four meanings under it and only ~32 embed it in a
       * sentence — so there is nothing to quote for ~91% of them, and an
       * authored sentence would be our invention dressed as evidence. Synonyms
       * are dropped for a different reason: an idiom's synonym IS its meaning.
       *
       * The meaning is the PAPER'S OWN KEYED OPTION, which makes it the
       * best-attested text in the book: elsewhere we author a definition and
       * the exam merely confirms a synonym; here the exam publishes the
       * definition itself as the correct answer.
       */
      key: "idiom",
      ordinal: "Part 4",
      title: "Idioms and Phrases",
      /**
       * "PAPER OR A MOCK", because the part now contains both. The first
       * wording read "every idiom an NDA or CDS paper has set", which was true
       * while the part was one sequence and became false the moment the
       * practice section moved inside it — 79 of the 296 were never set by a
       * paper. The sections below draw the line; this line must not pre-empt
       * it with a claim that covers only one of them.
       */
      blurb:
        "Every idiom an NDA or CDS paper or mock has set, with the meaning the exam itself keyed as correct.",
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
    // ── Part 2 · section 1: asked by BOTH papers (149) ──
    { slug: "papers-both-a-z", label: "A-Z", part: "pyq", section: "both", letters: band("A", "Z"), expected: 149 },

    // ── Part 2 · section 2: NDA only (1,001) ──
    { slug: "papers-nda-a-b", label: "A-B", part: "pyq", section: "nda", letters: band("A", "B"), expected: 119 },
    { slug: "papers-nda-c", label: "C", part: "pyq", section: "nda", letters: band("C", "C"), expected: 104 },
    { slug: "papers-nda-d-e", label: "D-E", part: "pyq", section: "nda", letters: band("D", "E"), expected: 155 },
    { slug: "papers-nda-f-k", label: "F-K", part: "pyq", section: "nda", letters: band("F", "K"), expected: 180 },
    { slug: "papers-nda-l-q", label: "L-Q", part: "pyq", section: "nda", letters: band("L", "Q"), expected: 186 },
    { slug: "papers-nda-r-t", label: "R-T", part: "pyq", section: "nda", letters: band("R", "T"), expected: 178 },
    { slug: "papers-nda-u-z", label: "U-Z", part: "pyq", section: "nda", letters: band("U", "Z"), expected: 79 },

    // ── Part 2 · section 3: CDS only (941) ──
    { slug: "papers-cds-a-c", label: "A-C", part: "pyq", section: "cds", letters: band("A", "C"), expected: 197 },
    { slug: "papers-cds-d-e", label: "D-E", part: "pyq", section: "cds", letters: band("D", "E"), expected: 161 },
    { slug: "papers-cds-f-l", label: "F-L", part: "pyq", section: "cds", letters: band("F", "L"), expected: 196 },
    { slug: "papers-cds-m-r", label: "M-R", part: "pyq", section: "cds", letters: band("M", "R"), expected: 195 },
    { slug: "papers-cds-s-z", label: "S-Z", part: "pyq", section: "cds", letters: band("S", "Z"), expected: 192 },

    { slug: "practice-a-d", label: "A-D", part: "practice", letters: band("A", "D"), expected: 197 },
    { slug: "practice-e-m", label: "E-M", part: "practice", letters: band("E", "M"), expected: 200 },
    { slug: "practice-n-s", label: "N-S", part: "practice", letters: band("N", "S"), expected: 180 },
    { slug: "practice-t-z", label: "T-Z", part: "practice", letters: band("T", "Z"), expected: 63 },

    // ── Part 1 · the class ladder ──
    //
    // EIGHT RUNGS, NOT FOUR LETTER BANDS. A band answers "where do I look this
    // word up"; a rung answers "what should I know by now", which is the only
    // question this part exists to answer. The letter bands went with the A-Z
    // index they were built to complement.
    //
    // A WORD SITS AT THE CLASS THAT FIRST INTRODUCES IT, so it is printed once
    // and a Class 10 student can start at Class 5 and climb. `expected` is the
    // ~130 target per rung; Class 5 keeps its 164, since levelling it down
    // would mean dropping real CBSE words to hit a round number.
    { slug: "school-class-5",  label: "Class 5",  part: "school", schoolClass: 5,  expected: 164 },
    { slug: "school-class-6",  label: "Class 6",  part: "school", schoolClass: 6,  expected: 130 },
    { slug: "school-class-7",  label: "Class 7",  part: "school", schoolClass: 7,  expected: 130 },
    { slug: "school-class-8",  label: "Class 8",  part: "school", schoolClass: 8,  expected: 130 },
    { slug: "school-class-9",  label: "Class 9",  part: "school", schoolClass: 9,  expected: 130 },
    { slug: "school-class-10", label: "Class 10", part: "school", schoolClass: 10, expected: 130 },
    { slug: "school-class-11", label: "Class 11", part: "school", schoolClass: 11, expected: 130 },
    { slug: "school-class-12", label: "Class 12", part: "school", schoolClass: 12, expected: 130 },

    /**
     * ═══ SORTED ON THE LITERAL FIRST WORD (user's call) ═══
     *
     * So "a damp squib" files under A and "to pull your weight" under T, as
     * printed. The alternative — filing on the first CONTENT word — spreads the
     * section more evenly (biggest letters S 33 / C 30 against T 50 / A 46), but
     * it asks the reader to strip the article before looking a phrase up, and a
     * reader who has just read "at the drop of a hat" in a paper looks under A.
     * Recorded because the two rules give visibly different books and the
     * measurement is easy to re-run: `plan-sections.ts` prints both.
     */
    { slug: "idioms-papers-a-s", label: "A-S", part: "idiom", section: "papers", letters: band("A", "S"), expected: 170 },
    { slug: "idioms-papers-t-z", label: "T-Z", part: "idiom", section: "papers", letters: band("T", "Z"), expected: 47 },
    { slug: "idioms-practice-a-z", label: "A-Z", part: "idiom", section: "practice-set", letters: band("A", "Z"), expected: 79 },
  ],
};

export const VOCAB_BOOKS: VocabBookDefinition[] = [CADET_VOCAB];

export function vocabBook(slug: string): VocabBookDefinition | undefined {
  return VOCAB_BOOKS.find((b) => b.slug === slug);
}

/**
 * The exam tag printed beside an idiom — the only provenance Part 4 carries.
 *
 * A PRACTICE-ONLY IDIOM MUST SAY SO. 79 of the 296 were set only in mocks and
 * coaching books; printing a bare "NDA" beside one asserts that the exam asked
 * it, which is exactly the false claim that put "adroit — NDA" in this book off
 * an Oswaal paper and forced `citationOf` to name practice explicitly. Part 4
 * has no citation line to carry that distinction, so the tag carries it.
 *
 * `timesAsked` counts REAL PAPER appearances only, so 0 means practice-only.
 */
/*
 * `examTagOf` WAS HERE AND IS DELETED (2026-09-08). It rendered the per-entry
 * "NDA" / "CDS" / "NDA practice" line under each Part 4 idiom.
 *
 * It stopped earning its place when Part 4 was split into "Set in the Papers"
 * and "Practice Material": the section heading carries the papers-vs-practice
 * claim — the half a candidate can act on — leaving the tag to say only WHICH
 * exam, a third line on a two-line entry.
 *
 * `exams` and `times_asked` still sit on every row, and `idiomSectionOf` below
 * still derives the section from `times_asked`, so nothing was lost from the
 * data and restoring the line is a small change.
 */

/**
 * Which Part 4 section an idiom belongs to. DERIVED, like every other
 * placement in this book: `timesAsked` counts real-paper appearances only, so 0
 * means a mock set it and nothing else. Letting this be authored would put the
 * book's integrity claim in the hands of whoever typed the entry.
 */
export function idiomSectionOf(timesAsked: number): VocabSectionKey {
  return timesAsked > 0 ? "papers" : "practice-set";
}

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
  section: VocabSectionKey | null,
  schoolClass: number | null
): VocabChapter | undefined {
  // A CLASS-LADDERED PART IS FOUND BY CLASS, NEVER BY LETTER. `schoolClass` is
  // required-but-nullable for the same reason `section` is: making it optional
  // would let a caller silently omit it and land on `undefined`, where a
  // required parameter makes the typechecker enumerate every call site.
  const laddered = book.chapters.some((c) => c.part === part && c.schoolClass !== undefined);
  if (laddered) {
    if (schoolClass == null) {
      throw new Error(`chapterFor: part "${part}" is a class ladder — pass a class`);
    }
    return book.chapters.find((c) => c.part === part && c.schoolClass === schoolClass);
  }

  const first = (word.trim()[0] ?? "").toUpperCase();
  const sectioned = book.chapters.some((c) => c.part === part && c.section);
  if (sectioned && !section) {
    throw new Error(`chapterFor: part "${part}" is split by exam — pass a section`);
  }
  return book.chapters.find(
    (c) => c.part === part && (c.letters?.includes(first) ?? false) && (!sectioned || c.section === section)
  );
}
