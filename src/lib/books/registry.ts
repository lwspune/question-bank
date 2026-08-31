/**
 * The book registry — what a "book" IS, declared as data.
 *
 * A book here is a DERIVED VIEW over questions that already exist in the bank.
 * It stores no content and duplicates nothing: it names a subject, the SECTIONS
 * each chapter is split into, and the chapters to draw them into, in order.
 *
 * SECTIONS ARE PER-BOOK, and that is what makes a second book possible. The
 * first version hardcoded `[nda, cds]` in order.ts behind a `"NDA" | "CDS"`
 * union; a book over one exam, or three, could not have used it. What is NOT
 * here is how to read an exam's SITTING — that is a property of the exam
 * (`EXAM_SITTING` in order.ts), true for every book containing it, so a new
 * book inheriting NDA does not restate NDA's rule.
 *
 * CHAPTER NAMES MUST MATCH THE DB EXACTLY. They are matched by name against
 * `chapters.name`, and a near-miss does not error — it silently yields an empty
 * chapter. `tests/books-registry.test.ts` is the standing guard: it resolves
 * every name against the live bank in every exam the book draws from, and fails
 * in both directions.
 */
import type { BookSectionDef, SubtopicGroupDef } from "./order";

export type BookChapter = {
  /** URL segment. Stable — it is the shareable link to a chapter of the book. */
  slug: string;
  /** Must equal `chapters.name` in the bank, character for character. */
  name: string;
  /**
   * Opt-in subtopic grouping (layout A), in print order.
   *
   * ONLY set this where NO SET SPANS A SUBTOPIC — measured per chapter, since
   * a set takes the subtopic of its first question. Vocabulary, Sentence
   * Rearrangement and Fill in the Blanks are clean (0 spanning sets). Grammar
   * (18 of 72), Spotting Errors (28 of 37) and Reading Comprehension (49 of 65)
   * are NOT: grouping them would tear questions away from their passage.
   *
   * `directions` is an authored line replacing the per-set Directions for the
   * whole block. Set it only where every set genuinely shares one instruction.
   * Omit it and the block keeps its per-set Directions, which is right for the
   * catch-all subtopics that mix task types.
   */
  groupSubtopics?: SubtopicGroupDef[];
};

export type BookDefinition = {
  slug: string;
  title: string;
  /** One line under the title, describing what the book is. */
  subtitle: string;
  /** Matched against `subjects.name`. */
  subject: string;
  /** Every chapter is split into these, in this order. */
  sections: BookSectionDef[];
  chapters: BookChapter[];
};

/**
 * Chapter order is EDITORIAL, not derived.
 *
 * It runs heaviest-first by combined question count, which is how the `/guide`
 * subjects tier their chapters. It is a hand-written list rather than a
 * `count desc` sort because a derived order would silently reshuffle the book
 * on every ingest, and a book's chapter order should change only when someone
 * decides it should.
 */
export const NDA_CDS_ENGLISH: BookDefinition = {
  slug: "nda-cds-english",
  title: "NDA / CDS English PYQ Master",
  subtitle:
    "Every English past-year question from both exams, chapter by chapter — NDA first, then CDS, oldest to newest.",
  subject: "English",
  sections: [
    { key: "nda", title: "NDA PYQ", exam: "NDA" },
    { key: "cds", title: "CDS PYQ", exam: "CDS" },
  ],
  chapters: [
    {
      slug: "vocabulary",
      name: "Vocabulary",
      // 0 of 91 sets span a subtopic. Synonyms and Antonyms carry an authored
      // line because all 65 of their sets say the same thing in 22 different
      // wordings; the other two mix task types (Word Definition alone spans
      // Match-List, word-pair meaning and single-word meaning), so no single
      // line would be true of them and they keep their per-set Directions.
      groupSubtopics: [
        {
          name: "Synonyms",
          directions:
            "Each item consists of a sentence with an underlined word or words, followed by four options. Select the option nearest in meaning to the underlined part.",
        },
        {
          name: "Antonyms",
          directions:
            "Each item consists of a sentence with an underlined word or words, followed by four options. Select the option opposite in meaning to the underlined part.",
        },
        { name: "Word Definition" },
        { name: "Confusable Word Pairs" },
      ],
    },
    {
      slug: "grammar",
      name: "Grammar",
      // 18 of 75 sets span a subtopic, ALL of them in CDS — and every one mixes
      // ONLY the three merged below, never any other subtopic (measured:
      // `npx tsx scripts/books/subtopic-report.ts --chapter=grammar --spanning`).
      //
      // They interleave because they are ONE task. Those CDS papers print a
      // single instruction — "fill the blank with the appropriate word" — over
      // ten questions, and the three subtopics classify what the ANSWER turned
      // out to be, not what the student was asked to do. CDS says so itself:
      // three of its "Preposition Usage" sets are headed "select the most
      // appropriate preposition OR DETERMINER". Merging them takes the chapter
      // to 0 spanning sets and 0 questions printed under a wrong heading,
      // without splitting a set or re-tagging the bank.
      //
      // NO authored `directions` on any block, deliberately. Parts of Speech
      // and Sentence Completion would each take one (all their wordings are the
      // same task), but writing that prose needs the full Directions text read
      // rather than the measured claim that it exists. Correct Sentence
      // Identification can never take one: its five CDS wordings are five
      // different tasks — combining two sentences, choosing which of two uses a
      // word correctly, a word used variously across S1/S2/S3. Per-set
      // Directions are always correct, so they stay.
      groupSubtopics: [
        {
          name: "Prepositions, Determiners and Connectors",
          members: [
            "Preposition Usage",
            "Discourse Markers and Connectors",
            "Articles, Determiners and Quantifiers",
          ],
        },
        { name: "Parts of Speech" },
        { name: "Sentence Completion" },
        { name: "Correct Sentence Identification" },
        { name: "Direct and Indirect Speech" },
        { name: "Active and Passive Voice" },
        // NDA only — CDS has never asked it, so it prints a blank CDS cell.
        { name: "Subject-Verb Agreement" },
      ],
    },
    {
      slug: "sentence-rearrangement",
      name: "Sentence Rearrangement",
      // 0 of 55 sets span a subtopic. Both blocks are genuinely one task type,
      // but the two differ from each other, so each carries its own line.
      groupSubtopics: [
        {
          name: "Sentence Part Rearrangement (PQRS)",
          directions:
            "Each item is a sentence whose parts have been jumbled and labelled P, Q, R and S. Select the sequence that produces the correct sentence.",
        },
        {
          name: "Paragraph Sequencing (S1–S6)",
          directions:
            "Each item is a passage of six sentences. The first and sixth are given as S1 and S6; the middle four have been jumbled and labelled P, Q, R and S. Select the correct order.",
        },
      ],
    },
    { slug: "spotting-errors", name: "Spotting Errors" },
    { slug: "reading-comprehension", name: "Reading Comprehension" },
    { slug: "idioms-and-phrases", name: "Idioms and Phrases" },
    { slug: "cloze-test", name: "Cloze Test" },
    {
      slug: "fill-in-the-blanks",
      name: "Fill in the Blanks",
      // 0 of 11 sets span a subtopic.
      groupSubtopics: [
        {
          name: "Contextual Fill-in-Blank",
          directions:
            "Each sentence has a blank space followed by four options. Select the word or group of words most appropriate for the blank.",
        },
        { name: "Contextual Word Selection (Phrasal Verbs and Collocations)" },
      ],
    },
  ],
};

export const BOOKS: BookDefinition[] = [NDA_CDS_ENGLISH];

export function getBookBySlug(slug: string): BookDefinition | null {
  return BOOKS.find((b) => b.slug === slug) ?? null;
}

export function getBookChapter(
  book: BookDefinition,
  chapterSlug: string
): BookChapter | null {
  return book.chapters.find((c) => c.slug === chapterSlug) ?? null;
}

/** The distinct exams a book draws on, in section order. */
export function bookExams(book: BookDefinition): string[] {
  return Array.from(new Set(book.sections.map((s) => s.exam)));
}
