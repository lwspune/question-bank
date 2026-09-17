/**
 * The FORMULA axis — a bank question addressed by the identity, property or
 * technique its SOLUTION uses.
 *
 * Why this is not the `/notes` concept axis. A `ConceptUnit` is a TEACHING
 * BLOCK, and a good one teaches several identities together: the block
 * `adjoint-properties` carries `|adj A| = |A|^(n-1)` AND
 * `adj(adj A) = |A|^(n-2) A` in one `formula.latex`. Asking that block for
 * "questions on adj(adj A)" returns 11 where the answer is 1. The grain has to
 * be the identity, not the block.
 *
 * Why membership is authored. The rule is "the solution USES this", and no
 * pattern decides that — measured over 768 hand-labelled solutions, a signature
 * classifier reached 59.2% precision and 45.0% recall, with exactly one of 79
 * slugs clearing a 90%/85% bar. One operator alone has five spellings in this
 * bank, and an identity is routinely used without being written down.
 */

export type FormulaKind = "formula" | "property" | "technique";

export type FormulaTopic = {
  /** URL segment. Unique across all topics. */
  slug: string;
  /**
   * What this actually is. Not everything a solution uses is a formula:
   * `A^T = A` is a property and `cofactor-expansion` is a technique. Saying so
   * is more useful than flattening all three into "formula".
   */
  kind: FormulaKind;
  /** Display name. */
  name: string;
  /** The identity, rendered display-mode. */
  latex: string;
  /** Plain-language statement. NO LaTeX — this feeds <meta description>. */
  statement: string;
  symbols: { symbol: string; meaning: string }[];
  /**
   * Question UUIDs whose SOLUTION uses this, adjudicated by reading each one.
   * A question legitimately appears under several topics.
   */
  questionIds: string[];
};

/** Where a topic's questions live — used for breadcrumbs and cross-links. */
export type FormulaChapter = {
  chapterSlug: string;
  chapterName: string;
  examName: string;
  subjectDisplay: string;
  /** Deep link to the /notes chapter that teaches this material, if any. */
  notesHref?: string;
  topics: readonly FormulaTopic[];
};
