/**
 * Pure core for the NCERT Class 10 SCIENCE lane. No IO. Tested in
 * tests/ncert-science-lib.test.ts.
 *
 * Everything else on scripts/ncert/ is shared with the Maths/Physics/Chemistry
 * books (scripts/ncert/lib.ts re-exports the State Board core verbatim). This
 * file holds only what Class 10 Science does DIFFERENTLY, and each export earns
 * its place by a defect the book actually has:
 *
 *   spacedHeadingRe   — headings are typeset one glyph per line, so the text
 *                       layer reads "E\nX\nE\nR\nC\nI\nS\nE\nS" and a plain
 *                       /EXERCISES/ matches ZERO times in all 13 chapter PDFs.
 *   contiguousRun     — a QUESTIONS box is counted by its leading 1..n run, not
 *                       by every digit near it; the floating Activity boxes put
 *                       stray "5." tokens in reading range.
 *   *Ref / bandPrefixes — this book has TWO question lanes (in-text boxes and one
 *                       end-of-chapter exercise), so refs need a lane
 *                       discriminator and sections.ts needs prefixes that cannot
 *                       swallow a neighbouring box.
 *   deriveAnchors /   — ~75% of this corpus has no answer key and no derivation.
 *   groundingViolations The agreed standard is that every authored answer cites
 *                       the chapter's own prose and the citation RESOLVES.
 */

/** Escape a literal for use inside a RegExp. */
function esc(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * A regex matching `word` whether it is typeset normally or letter-spaced (the
 * form this book's headings take in the text layer).
 *
 * Case-SENSITIVE on purpose: jesc1ps.pdf's rationalisation note reads "the NCERT
 * has undertaken the exercise to rationalise", and a case-insensitive probe calls
 * that a section heading. Word-bounded on purpose: without it a hyphenated break
 * can run two words together into a false match. NOT global: a /g regex reused
 * across `.test()` calls alternates true/false via `lastIndex`, which would make
 * the probe find roughly half the sections it should.
 */
export function spacedHeadingRe(word: string): RegExp {
  return new RegExp("\\b" + word.split("").map(esc).join("\\s*") + "\\b");
}

/**
 * The heading that opens an in-text question box — QUESTION**S**, or QUESTION.
 *
 * Two boxes in the whole book are singular, and both hold exactly one item:
 * Ch.2 p1 ("how will you identify the contents of each test tube?") and Ch.12 p1
 * ("Why does a compass needle get deflected…"). `spacedHeadingRe("QUESTIONS")`
 * cannot see either.
 *
 * That miss is worse than it sounds, because the SAME regex fed the reconcile
 * probe and my own page survey: Ch.12 shipped reporting "in-text boxes: book 4,
 * transcribed 4" with its first box invisible to both sides of the check. Two
 * passes sharing one blind spot look exactly like two passes agreeing.
 *
 * The optional group is greedy so that a plural heading is consumed WHOLE —
 * otherwise .split() leaves a stray "S" at the head of the box's text and the
 * item scan reads it as prose.
 */
export function questionBoxRe(): RegExp {
  return new RegExp("\\b" + "QUESTION".split("").map(esc).join("\\s*") + "(?:\\s*S)?\\b");
}

/**
 * The leading 1,2,3… run of a list of item numbers.
 *
 * Returns `[]` when the list does not open at 1 — a block whose numbering starts
 * elsewhere was not a question box, and renumbering from whatever digit came
 * first would invent items for the reconcile probe to chase.
 */
export function contiguousRun(nums: number[]): number[] {
  const run: number[] = [];
  for (const n of nums) {
    if (n !== run.length + 1) break;
    run.push(n);
  }
  return run;
}

/**
 * The item labels a printed block actually carries, read as a SET.
 *
 * `contiguousRun` assumes the numbers arrive in reading order. They do not: the
 * probe reads the book through a BLOCK-SORTED dump, ordered by (round(y/8), x),
 * and Ch.2's fourth box comes out 1, 4, 2, 3 — item 4's block rounds into an
 * earlier y-bucket than items 2 and 3 do. Fed to `contiguousRun` that keeps [1]
 * alone, and the probe reported three questions the book prints as absent from
 * it. A probe that cries wolf is how a real finding gets waved through, which is
 * precisely what happened to Ch.12 in the other direction.
 *
 * Only the VALUES of the labels carry meaning, never their emitted order, so
 * dedupe and sort before taking the run. The gap rule that `contiguousRun`
 * exists for survives intact — a stray "5." from a neighbouring Activity still
 * leaves a hole at 4 and is still dropped — and one failure mode disappears
 * entirely: a stray token emitted FIRST no longer makes the whole box vanish.
 */
export function itemRun(nums: number[]): number[] {
  return contiguousRun([...new Set(nums)].sort((a, b) => a - b));
}

const sub = (s?: string) => (s ? ` (${s})` : "");

/** In-text QUESTIONS box item → "IT 1.2 Q3" / "IT 11.3 Q2 (ii)". */
export function intextRef(chapterNo: number, boxNo: number, itemNo: number, subPart?: string): string {
  return `IT ${chapterNo}.${boxNo} Q${itemNo}${sub(subPart)}`;
}

/**
 * End-of-chapter exercise item → "Ex 1 Q5" / "Ex 1 Q5 (a)".
 *
 * The ref names the CHAPTER, not an exercise number: the heading is a bare
 * EXERCISES and there is exactly one per chapter, so "Ex 1.1" would be a number
 * the book does not print.
 */
export function exerciseRef(chapterNo: number, itemNo: number, subPart?: string): string {
  return `Ex ${chapterNo} Q${itemNo}${sub(subPart)}`;
}

/**
 * Worked example → "11.3 Eg.5", banded to the in-text box it PRECEDES.
 *
 * Mirrors the Maths lane, where the band prefix names the exercise rather than
 * the section. Science has one exercise per chapter, so the box takes that role.
 * Physics chapters are the only ones with worked examples (Ch.9 ×4, Ch.11 ×14,
 * Ch.12 ×2); Ch.1-8 and 13 have none.
 */
export function egRef(chapterNo: number, boxNo: number, exampleNo: number): string {
  return `${chapterNo}.${boxNo} Eg.${exampleNo}`;
}

/**
 * The `refPrefixes` sections.ts needs for one (chapter, box) pair.
 *
 * The trailing separator in each is load-bearing — it is what stops box 1's band
 * matching box 10's refs, and example 1's band matching example 14's. Electricity
 * has seven boxes and fourteen examples, so both cases are live.
 */
export function bandPrefixes(chapterNo: number, boxNo: number): { eg: string; intext: string; exercise: string } {
  return {
    eg: `${chapterNo}.${boxNo} Eg.`,
    intext: `IT ${chapterNo}.${boxNo} Q`,
    exercise: `Ex ${chapterNo} Q`,
  };
}

// One pass over the text finds every anchor spelling the book uses. Kept as a
// single alternation so the match ORDER is the order they appear in the prose.
//   §1.2 / Section 1.2.1     → "1.2" / "1.2.1"
//   Activity|Table|Example N.N → verbatim
//   Fig. | Fig | Figure N.N  → normalised to "Fig. N.N"
// A bare decimal is deliberately NOT an anchor: "1.6 ohm m" is a value, and
// admitting it would let an ungrounded answer pass on its own arithmetic.
const CITE_RE = /(?:§\s*|\bSection\s+)(\d+\.\d+(?:\.\d+)?)|\b(Activity|Table|Example)\s+(\d+\.\d+)|\bFig(?:ure|\.)?\s*(\d+\.\d+)/g;

/**
 * Anchors cited by a piece of prose, in order of first appearance, de-duplicated.
 * "Figure 2.10" and "Fig. 2.10" normalise to one spelling so the resolve check
 * cannot fail on a formatting difference and report it as a citation gap.
 */
export function parseCitations(s: string): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  const re = new RegExp(CITE_RE.source, "g");
  let m: RegExpExecArray | null;
  while ((m = re.exec(s)) !== null) {
    const token = m[1] ? m[1] : m[2] ? `${m[2]} ${m[3]}` : `Fig. ${m[4]}`;
    if (!seen.has(token)) {
      seen.add(token);
      out.push(token);
    }
  }
  return out;
}

// A section heading is a dotted number at the START of a line followed by a
// TITLE WORD. Anywhere else the same digits are a cross-reference or a quantity.
// The second letter matters: Ch.11 p20 opens a line "0.50 A. What is the power
// of the bulb?", and `\s+[A-Z]` alone reads that as section "0.50". Requiring a
// word rather than a lone capital is what rejects a value-plus-unit.
const SECTION_HEAD_RE = /^[ \t]*(\d+\.\d+(?:\.\d+)?)\s+[A-Z][A-Za-z]/gm;

/**
 * The anchors a chapter's own text declares — the list `groundingViolations`
 * checks citations against.
 *
 * DERIVED rather than hand-typed, because a hand-typed list is a second claim
 * about the chapter that is free to drift from it. Filtered to `chapterNo`: the
 * split PDFs carry running heads and cross-references, and an anchor list that
 * admitted "9.4" would let a Chapter-1 answer ground itself in Light.
 */
export function deriveAnchors(text: string, chapterNo: number): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  const push = (a: string) => {
    if (!seen.has(a)) {
      seen.add(a);
      out.push(a);
    }
  };

  const headRe = new RegExp(SECTION_HEAD_RE.source, "gm");
  let h: RegExpExecArray | null;
  while ((h = headRe.exec(text)) !== null) push(h[1]);
  for (const c of parseCitations(text)) push(c);

  // An anchor belongs to this chapter iff its leading number is the chapter's.
  const mine = (a: string) => {
    const n = a.match(/(\d+)\.\d+/);
    return !!n && Number(n[1]) === chapterNo;
  };
  return out.filter(mine);
}

export type GroundedRow = { ref: string; groundedIn?: string };
export type GroundingViolation = { ref: string; reason: string };

/**
 * Rows whose grounding does not hold up, in row order, at most one per row.
 *
 * An EMPTY anchor list is a violation for every row, not a clean pass: a chapter
 * whose outline has not been derived yet cannot be said to have grounded answers,
 * and failing closed is the whole reason this gate exists.
 */
export function groundingViolations(rows: GroundedRow[], anchors: string[]): GroundingViolation[] {
  if (anchors.length === 0) {
    return rows.map((r) => ({
      ref: r.ref,
      reason: "no anchors derived for this chapter — grounding cannot be verified",
    }));
  }
  const known = new Set(anchors);
  const out: GroundingViolation[] = [];
  for (const r of rows) {
    const g = (r.groundedIn ?? "").trim();
    if (!g) {
      out.push({ ref: r.ref, reason: "missing groundedIn" });
      continue;
    }
    const cites = parseCitations(g);
    if (cites.length === 0) {
      out.push({ ref: r.ref, reason: `no citation found in groundedIn: "${g}"` });
      continue;
    }
    const dangling = cites.filter((c) => !known.has(c));
    if (dangling.length) {
      out.push({ ref: r.ref, reason: `unresolved anchor(s): ${dangling.join(", ")}` });
    }
  }
  return out;
}

// ── Completeness reconcile ────────────────────────────────────────────────────
// `key-items.ts` is the Maths lane's completeness gate and it is INOPERATIVE
// here: it looks for "EXERCISE 1.1" blocks, and the Science key is headed
// "Chapter 1". Run against a Science chapter it reports "0 items to check" and
// exits 0 — a green that means nothing was looked at. These three functions are
// the Science-shaped replacement.

/** A line that is nothing but "Chapter N" — the key's own block header. */
const KEY_CHAPTER_RE = /^[ \t]*Chapter[ \t]+(\d{1,2})[ \t]*$/gm;
/** An item label at the START of a line: "2. (d)", "1.", "13. 9.2 A, 4.6 A". */
// The dot MUST be followed by whitespace or end-of-line. Without that, a wrapped
// answer VALUE landing at the start of a line ("0.67 A", "18.3 A") reads as item
// 0 or item 18 — which gave Ch.11 eighteen keyed items against seven book items,
// i.e. 257% key coverage. That impossible percentage is how the bug surfaced. A
// real label has whitespace after its dot; a decimal never does.
const KEY_ITEM_RE = /^[ \t]*(\d{1,2})\.(?=[ \t]|$)/gm;

/**
 * The item numbers the answer key lists, grouped by chapter.
 *
 * Two properties matter and both are tested. The chapter header must be a line
 * of its OWN — an answer reading "see Chapter 4 for more" is not a new block —
 * and item labels are read only at line start, because a two-column key puts the
 * answer's own digits ("6. 122.7 m", "13. 9.2 A, 4.6 A") right beside the label.
 *
 * GAPS ARE PRESERVED. Ch.9 keys 1-7 then 9, and Ch.11 skips 11: those questions
 * are descriptive or constructions and genuinely have no answer. Closing the gap
 * would claim an answer exists where none does.
 */
export function parseKeyChapters(text: string): Map<number, number[]> {
  const out = new Map<number, number[]>();
  const heads: { chapter: number; at: number; end: number }[] = [];
  const hre = new RegExp(KEY_CHAPTER_RE.source, "gm");
  let h: RegExpExecArray | null;
  while ((h = hre.exec(text)) !== null) heads.push({ chapter: Number(h[1]), at: h.index, end: hre.lastIndex });

  for (let i = 0; i < heads.length; i++) {
    const block = text.slice(heads[i].end, i + 1 < heads.length ? heads[i + 1].at : text.length);
    const items = new Set<number>();
    const ire = new RegExp(KEY_ITEM_RE.source, "gm");
    let m: RegExpExecArray | null;
    while ((m = ire.exec(block)) !== null) items.add(Number(m[1]));
    out.set(heads[i].chapter, [...items].sort((a, b) => a - b));
  }
  return out;
}

export type RefStructure = { boxes: Map<number, number[]>; exercise: number[] };

/**
 * The book's own item numbering, recovered from a chapter's transcribed refs.
 *
 * SUB-PARTS COLLAPSE TO ONE ITEM. "Ex 1 Q5 (a)".."(d)" is four bank rows but ONE
 * printed question, and comparing row counts against the book's item numbers
 * would report four phantom extras on every set question. A worked-example ref
 * is ignored: the book numbers examples separately from exercise items.
 */
export function refStructure(refs: string[]): RefStructure {
  const boxes = new Map<number, Set<number>>();
  const exercise = new Set<number>();
  for (const ref of refs) {
    const it = ref.match(/^IT \d+\.(\d+) Q(\d+)/);
    if (it) {
      const box = Number(it[1]);
      if (!boxes.has(box)) boxes.set(box, new Set());
      boxes.get(box)!.add(Number(it[2]));
      continue;
    }
    const ex = ref.match(/^Ex \d+ Q(\d+)/);
    if (ex) exercise.add(Number(ex[1]));
  }
  const sorted = new Map<number, number[]>();
  for (const k of [...boxes.keys()].sort((a, b) => a - b)) {
    sorted.set(k, [...boxes.get(k)!].sort((a, b) => a - b));
  }
  return { boxes: sorted, exercise: [...exercise].sort((a, b) => a - b) };
}

/**
 * Compare two item lists BOTH WAYS.
 *
 * One direction cannot catch an omission. The Maths lane lost Ch.3 Ex 3.2 Q3(vi)
 * and Ch.7 Ex 7.1 Q9-Q10 to page-scoped reads that looked complete, and only the
 * other direction found them.
 */
export function reconcile(expected: number[], actual: number[]): { missing: number[]; extra: number[] } {
  const e = new Set(expected);
  const a = new Set(actual);
  return {
    missing: [...e].filter((x) => !a.has(x)).sort((p, q) => p - q),
    extra: [...a].filter((x) => !e.has(x)).sort((p, q) => p - q),
  };
}
