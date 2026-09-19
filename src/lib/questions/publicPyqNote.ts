/**
 * Decide whether a question's `pyq_note` may be shown to a non-superadmin.
 *
 * `pyq_note` is one column carrying two unrelated kinds of string, and only
 * one of them belongs on an anonymous-facing page:
 *
 *  - a SITTING IDENTIFIER — "10th May Shift 1", "21 Jan 2026 Shift 1",
 *    "CDS (I) 2017 — English", "NDA 1". Load-bearing for a student: one
 *    MHT-CET month holds 14 distinct papers, so this note is the only thing
 *    that names which paper a question came from.
 *  - a SOURCE BLURB — "NDA GAT practice — Oswaal 10 Mock Test Papers, Mock
 *    Test 9", "… (Balbharati textbook, Part 2 Geometry)", "NDA Mathematics
 *    mock test 3 (LWS test series)", or the CDS disclosure that our answers
 *    are derived rather than official. Publishing those puts the founding
 *    tenant's name, a third party's name, or our own method on 317 indexed
 *    pages.
 *
 * WHY THE RULE RIDES ON `question_kind` RATHER THAN ON SPELLING. A denylist of
 * publisher names ("oswaal", "balbharati", …) under-matches silently the first
 * time a new corpus lands, and this project has been bitten by exactly that
 * shape of probe before. Measured on the live bank instead (2026-09-19, 72,206
 * PUBLIC rows): of the 34,851 `pyq` rows, 9 name a source and 0 say "practice";
 * of the 37,355 `practice` rows, 22,019 name a source. The kind axis already
 * separates the two populations, so the rule is structural.
 *
 * WHY A LENGTH CAP AS WELL. Two classes are `pyq` yet still narrative — the
 * CBSE-12 / MH-HSC-12 board notes ("chapterwise compilation, March
 * 2016-February 2025; no 2021, exams cancelled") and 9 JEE questions reprinted
 * from an Allen module. Kind cannot catch those. After the bracket strip below,
 * `pyq` notes measure either <= 38 chars (30,332 rows, every one an identifier)
 * or >= 93 chars (4,519 rows, every one narrative); NOTHING falls in between.
 * The cap therefore sits in a 54-character empty gap rather than on a knife
 * edge. `npm run audit:provenance` reports any row that ever lands in that gap,
 * because a new corpus arriving there would lose its sitting id in silence.
 *
 * Length alone would NOT work: "CC Botany HT — ParikshaGruh 13159" (practice)
 * is 33 chars while "CDS (I) 2017 — Elementary Mathematics" (pyq) is 37. The
 * two axes are needed together.
 *
 * Superadmins bypass this entirely and read the raw column — see
 * `includeRawProvenance` on `queryQuestionsByIds`.
 */

/** The `question_kind` enum (migration 0036). */
export type PublicQuestionKind = "pyq" | "practice";

/**
 * Longest `pyq_note` (post bracket-strip) that may be published.
 *
 * Chosen from the measured gap, not from taste: the largest real identifier is
 * 38 chars and the shortest real narrative is 93, so anything from 39 to 92 is
 * empty today. 48 keeps 10 characters of headroom for a slightly longer future
 * session label while staying far below the narrative floor.
 */
export const MAX_PUBLIC_PYQ_NOTE_LEN = 48;

/**
 * A parenthetical appended to a sitting label, e.g.
 * `CDS (II) 2025 — General Knowledge [No official answer key is published …]`.
 *
 * Anchored to the END on purpose. A bracket in the middle of a note is part of
 * the label itself (a paper code, a set letter) and must survive — stripping
 * every bracket would quietly shorten identifiers we mean to keep.
 */
const TRAILING_BRACKET_RE = /\s*\[[^\]]*\]\s*$/;

/**
 * The publishable form of a question's `pyq_note`, or `null` when nothing of it
 * may be shown.
 *
 * FAILS CLOSED. An unknown or absent `kind` redacts, so a caller that has not
 * plumbed `question_kind` through cannot leak by omission — the quiet default
 * is the safe one.
 */
export function publicPyqNote(
  note: string | null | undefined,
  kind: PublicQuestionKind | null | undefined
): string | null {
  if (!note) return null;
  // Anything that is not explicitly a past-year question is a practice /
  // worksheet / textbook row, and every one of those notes describes a source.
  if (kind !== "pyq") return null;

  const cleaned = note.replace(TRAILING_BRACKET_RE, "").trim();
  if (cleaned.length === 0) return null;
  // Measured AFTER the strip: the CDS General Knowledge notes are 237 chars
  // raw and ~32 once the disclosure comes off, so measuring first would drop
  // all 2,280 of their sitting labels.
  if (cleaned.length > MAX_PUBLIC_PYQ_NOTE_LEN) return null;

  return cleaned;
}
