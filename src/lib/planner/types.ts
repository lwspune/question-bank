/**
 * Session planning — the teacher-facing plan that turns a printed textbook into
 * a sequence of one-hour classes.
 *
 * THE ONE DESIGN DECISION EVERYTHING ELSE FOLLOWS FROM: a session's IDENTITY is
 * authored, its NUMBER is derived.
 *
 * Teaching notes will be attached per session. A session computed on the fly
 * from a pace control has no stable identity — retune the pace and "Session 3"
 * silently becomes different content, so any note attached to it now describes
 * the wrong class, with nothing to say so. So the CUT POINTS are authored data
 * with frozen `id`s, and the displayed "Session N" is position in the list.
 * Same split `paper_questions` already makes between its fractional `position`
 * and its row identity.
 *
 * Corollary, and it is the rule that keeps notes attached: **an `id` is
 * allocated ONCE and never reissued.** Inserting a session between s03 and s04
 * appends a FRESH id (s21, say) at that position — it does NOT renumber the
 * tail. The ids in a chapter are therefore deliberately out of order once it
 * has been edited, and that is correct, not untidy.
 *
 * Everything that is NOT a cut point stays derived from the live spine:
 * subtopic and concept titles, exam weightage, practice-question counts. A
 * session stores only `section_no` REFS, so a spine correction flows through
 * automatically and the authored file cannot drift into being a stale second
 * copy of the textbook. The cost is that a ref can dangle if the spine
 * renumbers, which `tests/planner-data.test.ts` exists to catch.
 */

/** A `syllabus_concepts.section_no` of the plan's own book, e.g. "2.1.1". */
export type SectionRef = string;

/**
 * A topic an exam asks that the base book does not fully teach, surfaced from
 * the syllabus map's own rulings rather than re-decided here.
 *
 * `anchored` mirrors the placement rule measured across all 48 NDA rulings,
 * which held with zero exceptions: a `partial` ruling ALWAYS carries a
 * `covered_by` anchor (29/29) and so extends a chapter already in the plan,
 * while a `not` ruling NEVER carries one (19/19) and so needs a session of its
 * own. Where a session sits is therefore evidence, not taste.
 */
export type PlanExtra = {
  /** Which syllabus the topic comes from. */
  source: "NDA" | "CBSE";
  /** Short teacher-facing title — this is NOT a book section, so it has no ref. */
  title: string;
  /** Why the base book leaves it short. Quoted from the syllabus-map ruling. */
  reason: string;
  /** PYQ at stake in the exam bank, where the ruling records one. */
  pyq?: number;
  /**
   * true  = the ruling anchors into a chapter (`partial`) — an extension.
   * false = the ruling has no anchor (`not`) — a standalone session.
   */
  anchored: boolean;
};

export type PlannedSession = {
  /** STABLE and never reissued. Teaching notes attach here. See the file header. */
  id: string;
  /** Top-level book sections this hour covers (the Excel's "Subtopics" column). */
  subtopics: SectionRef[];
  /** Sub-sections this hour covers (the Excel's "Concepts" column). */
  concepts: SectionRef[];
  /**
   * Teaching beats with no book section of their own — a recap, a drill, a
   * worked-problem hour. Authored free text BY DESIGN: the book has no heading
   * for "Basics of Trigonometry", and the reference plan opens with exactly
   * that, so a plan that could only cite the book could not express it.
   */
  beats?: string[];
  /** Set when this session exists to close an NDA or CBSE gap. */
  extra?: PlanExtra;
  /** Teacher-facing aside (sequencing, a known trap, a prerequisite). */
  note?: string;
};

export type PlannedChapter = {
  /**
   * `syllabus_concepts.chapter_no` in the plan's book, or NULL for a block of
   * exam-only material the book has no chapter for at all.
   *
   * Nullable rather than parked on a nearby chapter because parking it lies:
   * NDA's binary-number arithmetic is not part of Sets and Relations, and
   * filing it there would tell a teacher the board teaches it somewhere. A
   * block with no chapter says the true thing — this is owed, and the book
   * will not help you.
   */
  chapterNo: number | null;
  /** Required when `chapterNo` is null; otherwise the spine supplies the name. */
  title?: string;
  /**
   * The bank's name for this chapter, where it differs from the book's.
   *
   * Needed exactly once so far and the mismatch is deliberate: the book prints
   * "Methods of Induction and Binomial Theorem" while the bank ships it as
   * "Binomial Theorem", because mathematical induction has no chapter in any
   * exam taxonomy. Without this the practice-question count silently reads 0 —
   * a near-miss on a name does not error, it just empties a column.
   */
  bankChapterName?: string;
  sessions: PlannedSession[];
};

export type SessionPlan = {
  /** URL segment. */
  key: string;
  label: string;
  /** Joins to `syllabus_concepts`: these three scope the spine this plan reads. */
  subject: string;
  cls: number;
  source: string;
  /** The bank exam whose chapters supply practice questions. */
  bankExam: string;
  /** Chapters in the order they are taught. */
  chapters: PlannedChapter[];
};
