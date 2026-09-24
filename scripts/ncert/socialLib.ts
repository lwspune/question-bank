/**
 * Pure core for the NCERT Class 10 SOCIAL SCIENCE lane (History · Geography ·
 * Political Science · Economics on `cbse-10`).
 *
 * WHY A SECOND CORE RATHER THAN REUSING scienceLib WHOLESALE. The generic parts
 * ARE reused — this file imports `itemRun`, `reconcile` and `groundingViolations`
 * rather than copying them, because the last time a grounding helper was copied
 * a fourth time in this repo the copies had silently drifted. What could not be
 * reused is the part that reads the book, and there are two reasons:
 *
 * 1. **Four books, four question-block conventions.** Measured across all 22
 *    chapters: History opens with "Write in brief" and "Discuss" and has NO
 *    Exercises heading anywhere; Geography prints EXERCISES five times on one
 *    line; Polity prints "Exercises"; Economics prints EXERCISES and also runs
 *    an in-text "LET'S WORK THESE OUT" lane. A single splitter finds questions
 *    in two of the four.
 *
 * 2. **Three of the four books do not number their sections.** Only History
 *    does. Run `deriveAnchors` here and it mints anchors from any dotted number
 *    at a line start, which in Polity's prose yields "43.63" and "8.03" and in
 *    Economics "50.2". Those are PHANTOM anchors, and a phantom anchor lets an
 *    invented citation resolve — the fail-OPEN direction, which is the one
 *    thing the Science gate was built to refuse. So an anchor here is the
 *    chapter's own HEADING TEXT, read off font size and de-duplicated against
 *    running heads.
 *
 * And the reason all of this has to hold: **these four books have no answer key
 * at all.** Science had jesc1an.pdf; there is no equivalent file for any of
 * them. Grounding is not one check among several here. It is the only one.
 */

/** The four books, which are four separate SUBJECTS on `cbse-10`. */
export type Book = "history" | "geography" | "polity" | "economics";

/**
 * The heading that opens a chapter's end-of-chapter question block.
 *
 * History is the odd one and the reason this is per-book: it prints "Write in
 * brief" and "Discuss" as two separately numbered blocks and never prints the
 * word Exercises, so a splitter built on the other three finds nothing there
 * and reports the chapter as having no questions.
 *
 * Case is load-bearing for the other three. Every one of these books uses the
 * lowercase word "exercise" in body prose — Polity Ch.1 on three pages before
 * its question block — so a case-insensitive opener would cut the chapter in
 * the wrong place.
 */
export function blockOpener(book: Book): RegExp {
  if (book === "history") return /\b(?:Write in brief|Discuss)\b/;
  if (book === "polity") return /\bExercises?\b/;
  return /\bEXERCISES?\b/; // geography, economics
}

const sub = (s?: string) => (s ? ` (${s})` : "");

/** End-of-chapter exercise item → "Ex 2 Q3" / "Ex 2 Q3 (i)". */
export function ssExerciseRef(chapterNo: number, itemNo: number, subPart?: string): string {
  return `Ex ${chapterNo} Q${itemNo}${sub(subPart)}`;
}

/**
 * History "Write in brief" item → "WB 1 Q2".
 *
 * History's two blocks BOTH number from 1, so they need different prefixes or
 * the second block's Q1 collides with the first's and one of them is lost when
 * the fragments merge.
 */
export function briefRef(chapterNo: number, itemNo: number, subPart?: string): string {
  return `WB ${chapterNo} Q${itemNo}${sub(subPart)}`;
}

/** History "Discuss" item → "DS 1 Q3". */
export function discussRef(chapterNo: number, itemNo: number, subPart?: string): string {
  return `DS ${chapterNo} Q${itemNo}${sub(subPart)}`;
}

/** Economics in-text "LET'S WORK THESE OUT" item → "LW 3.2 Q1". */
export function letsWorkRef(
  chapterNo: number,
  boxNo: number,
  itemNo: number,
  subPart?: string
): string {
  return `LW ${chapterNo}.${boxNo} Q${itemNo}${sub(subPart)}`;
}

/**
 * The stable key for a heading.
 *
 * Aggressive on purpose. The text layer breaks kerning — Polity's running head
 * comes out as "De moc ra tic  Polit ics" — and it must reduce to ONE key every
 * time or the running-head rule below cannot recognise it as the same string on
 * successive pages. Punctuation goes for the same reason: a citation written
 * "Why Non-cooperation?" has to match a heading printed "Why Non-cooperation".
 */
export function normaliseHeading(s: string): string {
  return s
    .replace(/[‘’]/g, "'")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * `bold` means EVERY span on the line is a heavy face, not that the line
 * contains a bold word — body prose bolds terms inline all the time.
 */
export type HeadingLine = { text: string; size: number; page: number; bold?: boolean };

/** A heading is bigger than the body by at least this much, in points. */
const SIZE_MARGIN = 0.5;
/** Seen on this many distinct pages, it is a running head, not a heading. */
const RUNNING_HEAD_PAGES = 3;
const MIN_LEN = 3;
const MAX_LEN = 70;

/**
 * The anchors a chapter declares, as normalised heading text.
 *
 * SIZE ALONE MISSES HALF THE HEADINGS, measured. Geography Ch.4 sets its body
 * in 10.5pt Bookman-Light and its section heading "Major Crops" in 10.5pt
 * Bookman-Demi — same size, heavier face. A size-only rule found 5 anchors in a
 * chapter with far more sections than that, and under-detection is not the
 * harmless direction here: every missing anchor rejects a CORRECT citation and
 * sends the author back to re-ground a row that was already right. So a line
 * also counts when it is wholly bold and no smaller than the body.
 *
 * RUNNING HEADS ARE THE OTHER HALF. Every one of these books sets a running head in a display face on every page —
 * "CONTEMPORARY INDIA – II", "De moc ra tic Polit ics", "<page> Nationalism in
 * India" — and by size it is indistinguishable from a real section heading.
 * REPETITION distinguishes them: a section heading appears once, a running head
 * appears throughout. The cut is at three pages rather than two so that a long
 * section which straddles a page break and repeats its heading is not lost.
 *
 * Returns [] rather than guessing when nothing outranks the body, which makes
 * `groundingViolations` fail closed for the whole chapter — the correct outcome
 * for a chapter whose headings could not be read.
 */
export function headingAnchors(lines: HeadingLine[], bodySize: number): string[] {
  const pages = new Map<string, Set<number>>();
  const order: string[] = [];
  const seen = new Set<string>();

  for (const l of lines) {
    const bigger = l.size >= bodySize + SIZE_MARGIN;
    const heavy = !!l.bold && l.size >= bodySize;
    if (!bigger && !heavy) continue;
    const key = normaliseHeading(l.text);
    if (key.length < MIN_LEN || key.length > MAX_LEN) continue;
    if (!/[a-z]{2}/.test(key)) continue;
    if (!pages.has(key)) pages.set(key, new Set());
    pages.get(key)!.add(l.page);
    if (!seen.has(key)) {
      seen.add(key);
      order.push(key);
    }
  }

  return order.filter((k) => (pages.get(k)?.size ?? 0) < RUNNING_HEAD_PAGES);
}

// A heading citation runs to an em dash, a semicolon or the end — NOT to the
// end of the sentence. Authors write "§ Heading — what it says", and swallowing
// the explanation would make a correct citation unresolvable.
const SOCIAL_CITE_RE = /§\s*([^—;.\n]+)|\b(Table)\s+(\d+\.\d+)|\bFig(?:ure|\.)?\s*(\d+\.\d+)/g;

/**
 * Anchors cited by a piece of prose, normalised, in order, de-duplicated.
 *
 * "Figure 1.3" and "Fig. 1.3" collapse to one spelling so the resolve check
 * cannot fail on a formatting difference and report it as a citation gap.
 */
export function parseSocialCitations(s: string): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  const re = new RegExp(SOCIAL_CITE_RE.source, "g");
  let m: RegExpExecArray | null;
  while ((m = re.exec(s)) !== null) {
    const token = m[1]
      ? normaliseHeading(m[1])
      : m[2]
        ? `table ${m[3]}`
        : `fig. ${m[4]}`;
    if (token && !seen.has(token)) {
      seen.add(token);
      out.push(token);
    }
  }
  return out;
}

const FIGTAB_RE = /\b(Table)\s+(\d+\.\d+)|\bFig(?:ure|\.)?\s*(\d+\.\d+)/g;

/**
 * Figure and table references the chapter's own text declares, chapter-filtered.
 *
 * The pilot chapter is why this exists: `parseSocialCitations` accepts
 * "Fig. 1.4" but `headingAnchors` only ever emits headings, so every figure
 * citation failed the gate no matter how correct it was. Geography Ch.1 carries
 * 11 figure references and Economics Ch.1 seven tables; they are citable
 * content and the anchor set has to hold them.
 *
 * Filtered to `chapterNo` for the reason the Science lane filters: these books
 * cross-reference each other's chapters, and an anchor list admitting "Fig. 3.2"
 * would let a Chapter 1 answer ground itself in Chapter 3.
 */
export function figureTableAnchors(text: string, chapterNo: number): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  const re = new RegExp(FIGTAB_RE.source, "g");
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const num = m[2] ?? m[3];
    if (Number(num.split(".")[0]) !== chapterNo) continue;
    const token = m[1] ? `table ${num}` : `fig. ${num}`;
    if (!seen.has(token)) {
      seen.add(token);
      out.push(token);
    }
  }
  return out;
}
