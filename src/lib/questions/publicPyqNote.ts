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
 * A KNOWN BOARD SHAPE publishes its sitting label instead (2026-10-14): the
 * CBSE set code, the Maharashtra board month, the UPSC paper. See
 * `sittingLabel` below; a note matching none of its rules is unaffected.
 *
 * Superadmins bypass this entirely and read the raw column — see
 * `includeRawProvenance` on `queryQuestionsByIds`. (The card TAG still shows
 * them the short label; sourceTag passes the full note as hover text.)
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
  // A note with a known sitting label publishes the label whatever its
  // length, so a short UPSC note ("… 2017 - CSAT Paper II") reads like the
  // long ones beside it instead of repeating the exam and year.
  const label = sittingLabel(cleaned);
  if (label) return label;
  if (cleaned.length > MAX_PUBLIC_PYQ_NOTE_LEN) return null;

  return cleaned;
}

/**
 * The short sitting label inside a long board-paper note, or `null` when the
 * note names no single sitting.
 *
 * WHY (2026-10-14). The board corpora write a provenance SENTENCE into
 * `pyq_note`, so the length cap redacted their sitting along with the
 * narrative: a student could not tell CBSE set 31/1/1 from 31/5/1, or the
 * March 2024 SSC paper from July 2024's, and a superadmin's card tag ran to
 * 200 characters. Each corpus puts its sitting in a fixed, generated place,
 * so the label is read from there and the rest of the note stays private.
 * A note matching none of these is narrative with no single sitting (a
 * chapterwise compilation, an Allen reprint) and gets nothing.
 *
 * Only ever called on a `pyq` note: publicPyqNote checks the kind first, and
 * a practice note never reaches here.
 */
const SITTING_LABEL_RULES: RegExp[] = [
  // CBSE Class 10 / 12: "… board examination 2024, question paper 31/5/1. …"
  /board examination \d{4}, question paper (\d+\/\d+\/\d+)\./,
  // MH HSC 12 papers: "… (Subject code 56), June 2026 sitting (paper code J-297)"
  /^Maharashtra HSC Class 12 Board question paper .*, ([A-Z][a-z]+) \d{4} sitting/,
  // MH SSC 10 papers: "… Geometry (Mathematics Part II), March 2019 board paper"
  /^Maharashtra State Board Class 10 \(SSC\) .*, ([A-Z][a-z]+) \d{4} board paper$/,
  // UPSC: "UPSC CSE (Prelims) 2017 - General Studies Paper I[. Answer verified …]"
  /^UPSC CSE \(Prelims\) \d{4} - ([^.]+?)(?:\.|$)/,
];

export function sittingLabel(note: string): string | null {
  for (const rule of SITTING_LABEL_RULES) {
    const m = note.match(rule);
    if (m) return m[1].trim();
  }
  return null;
}
