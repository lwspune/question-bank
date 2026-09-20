/**
 * Pure core for the NCERT Class 10 SCIENCE lane.
 *
 * Science departs from every other book on scripts/ncert/ in four ways, and three
 * of them are mechanical enough to be pure functions with tests:
 *
 *  1. **Headings are letter-spaced vertically.** "EXERCISES" is typeset one glyph
 *     per line, so the text layer reads `E\nX\nE\nR\nC\nI\nS\nE\nS` and a plain
 *     /EXERCISES/ returns ZERO on all 13 chapter PDFs. Measured, not guessed.
 *  2. **Two question lanes.** In-text QUESTIONS boxes (49 boxes / 170 items) as
 *     well as the end-of-chapter EXERCISES (171 items). Maths has only the latter,
 *     so refs need a lane discriminator or the two collide.
 *  3. **Worked examples exist in Physics chapters only** and have to band to a
 *     section for the /board reader — the Maths convention (the band prefix names
 *     the EXERCISE, not the section) carries over with the box standing in for it.
 *  4. **~75% of the corpus has no key and no derivation.** Ch.1-8 + 13 key ONLY
 *     their 3-4 leading MCQs; the in-text boxes are 100% unkeyed. sympy was the
 *     independent third ground truth in the Maths lane and does not transfer to
 *     "Why is respiration considered an exothermic reaction?". The agreed standard
 *     is GROUNDING: every authored answer cites the chapter's own prose, and the
 *     citation has to resolve. That is what `groundingViolations` enforces.
 */
import { describe, it, expect } from "vitest";
import {
  spacedHeadingRe,
  contiguousRun,
  egRef,
  intextRef,
  exerciseRef,
  bandPrefixes,
  parseCitations,
  deriveAnchors,
  groundingViolations,
  parseKeyChapters,
  refStructure,
  reconcile,
} from "../scripts/ncert/scienceLib";

// The literal shape the text layer produces for Ch.1's end-of-chapter heading.
const SPACED_EXERCISES = "E\nX\nE\nR\nC\nI\nS\nE\nS";
const SPACED_QUESTIONS = "Q\nU\nE\nS\nT\nI\nO\nN\nS\n?";

describe("spacedHeadingRe", () => {
  it("matches the vertically letter-spaced heading the text layer emits", () => {
    expect(spacedHeadingRe("EXERCISES").test(SPACED_EXERCISES)).toBe(true);
    expect(spacedHeadingRe("QUESTIONS").test(SPACED_QUESTIONS)).toBe(true);
  });

  it("still matches the plain unspaced word", () => {
    // Belt and braces: a future reprint could typeset it normally, and the probe
    // must not start reporting zero sections the day that happens.
    expect(spacedHeadingRe("EXERCISES").test("EXERCISES")).toBe(true);
    expect(spacedHeadingRe("EXERCISES").test("E X E R C I S E S")).toBe(true);
  });

  it("does NOT match the lowercase word in prose", () => {
    // jesc1ps.pdf p4: "the NCERT has undertaken the exercise to rationalise".
    // A case-insensitive probe would call the rationalisation note a section head.
    const re = spacedHeadingRe("EXERCISES");
    expect(re.test("the NCERT has undertaken the exercise to rationalise")).toBe(false);
    expect(re.test("Exercises for the reader")).toBe(false);
  });

  it("does NOT match a prefix of the word", () => {
    // "EXERCISE" (singular) is not the heading; matching it would band the wrong rows.
    expect(spacedHeadingRe("EXERCISES").test("EXERCISE")).toBe(false);
  });

  it("does not run letters together across a word boundary", () => {
    // "REXERCISESQ" must not count — otherwise a hyphenated break invents a section.
    expect(spacedHeadingRe("EXERCISES").test("REXERCISESQ")).toBe(false);
  });

  it("is global-flag free so .test() is not stateful", () => {
    // A /g regex reused across .test() calls alternates true/false via lastIndex.
    // That bug would make the probe find half the sections it should.
    const re = spacedHeadingRe("QUESTIONS");
    expect(re.test(SPACED_QUESTIONS)).toBe(true);
    expect(re.test(SPACED_QUESTIONS)).toBe(true);
  });
});

describe("contiguousRun", () => {
  it("returns the leading 1..n run", () => {
    expect(contiguousRun([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it("stops at the first gap rather than counting everything it saw", () => {
    // A QUESTIONS box that reads 1,2,3 then picks up a "5." from the answer text
    // of a neighbouring block must report 3 items, not 4. Over-counting here
    // manufactures a missing question for the reconcile probe to chase.
    expect(contiguousRun([1, 2, 3, 5])).toEqual([1, 2, 3]);
  });

  it("stops on a repeat (a page number or a stray digit re-reading '1.')", () => {
    expect(contiguousRun([1, 2, 1, 3])).toEqual([1, 2]);
  });

  it("returns empty when the list does not start at 1", () => {
    // If the run does not open at 1 the block was not a question box — say so
    // rather than silently renumbering from whatever the first digit was.
    expect(contiguousRun([2, 3, 4])).toEqual([]);
    expect(contiguousRun([])).toEqual([]);
  });
});

describe("refs", () => {
  it("builds an in-text ref carrying BOTH the box and the item", () => {
    expect(intextRef(1, 2, 3)).toBe("IT 1.2 Q3");
  });

  it("builds an exercise ref (Science chapters have exactly ONE exercise)", () => {
    // No "Ex 1.1 / Ex 1.2" here — the heading is a bare EXERCISES, so the ref
    // names the chapter, not an exercise number that does not exist.
    expect(exerciseRef(1, 5)).toBe("Ex 1 Q5");
  });

  it("appends a sub-part in the book's own bracket style", () => {
    expect(exerciseRef(1, 5, "a")).toBe("Ex 1 Q5 (a)");
    expect(intextRef(11, 3, 2, "ii")).toBe("IT 11.3 Q2 (ii)");
  });

  it("bands a worked example to the box it precedes, like the Maths lane", () => {
    // Maths used "<exercise> Eg.<n>" so the band prefix names the EXERCISE.
    // Science has one exercise per chapter, so the BOX takes that role.
    expect(egRef(11, 3, 5)).toBe("11.3 Eg.5");
  });

  it("keeps the two lanes from colliding on the same numbers", () => {
    expect(intextRef(1, 1, 1)).not.toBe(exerciseRef(1, 1));
  });
});

describe("bandPrefixes", () => {
  it("gives sections.ts a prefix per lane that cannot swallow a neighbour", () => {
    const p = bandPrefixes(11, 3);
    expect(p.eg).toBe("11.3 Eg.");
    expect(p.intext).toBe("IT 11.3 Q");
    expect(p.exercise).toBe("Ex 11 Q");
  });

  it("does not let box 1's prefix match box 10's refs", () => {
    // "IT 11.1 Q" vs "IT 11.10 Q": a startsWith band on the former would eat the
    // latter if the separator were dropped. Electricity has SEVEN boxes today,
    // but Maths' own comment warns this list grows.
    const one = bandPrefixes(11, 1).intext;
    expect(intextRef(11, 10, 2).startsWith(one)).toBe(false);
  });

  it("does not let example 1's band match example 10's ref", () => {
    // Electricity carries FOURTEEN worked examples, so "11.1 Eg.1" vs "11.1 Eg.14"
    // is live, not hypothetical. The trailing dot in the prefix is what saves it.
    expect(egRef(11, 1, 14).startsWith(bandPrefixes(11, 1).eg)).toBe(true);
    expect(egRef(11, 10, 1).startsWith(bandPrefixes(11, 1).eg)).toBe(false);
  });
});

describe("parseCitations", () => {
  it("pulls a section number", () => {
    expect(parseCitations("From §1.2 on balanced equations.")).toEqual(["1.2"]);
  });

  it("accepts the section number without the § glyph", () => {
    // The book writes "1.2.1" in running prose as often as with the glyph.
    expect(parseCitations("Section 1.2.1 defines a combination reaction.")).toEqual(["1.2.1"]);
  });

  it("pulls Activity, Figure, Table and Example anchors", () => {
    expect(parseCitations("Activity 1.5")).toEqual(["Activity 1.5"]);
    expect(parseCitations("Fig. 2.10")).toEqual(["Fig. 2.10"]);
    expect(parseCitations("Table 11.2")).toEqual(["Table 11.2"]);
    expect(parseCitations("Example 11.3")).toEqual(["Example 11.3"]);
  });

  it("normalises 'Figure 2.10' to the book's own short form", () => {
    // One anchor must have ONE spelling or the resolve check fails on a synonym
    // and reports a citation gap that is really a formatting difference.
    expect(parseCitations("Figure 2.10")).toEqual(["Fig. 2.10"]);
  });

  it("finds several anchors and de-duplicates", () => {
    expect(parseCitations("§1.2 and Activity 1.5, restated in §1.2.")).toEqual(["1.2", "Activity 1.5"]);
  });

  it("returns nothing for prose with no anchor", () => {
    expect(parseCitations("Because it releases heat.")).toEqual([]);
  });

  it("does not mistake a decimal quantity for a section number", () => {
    // "1.6 × 10^-8 ohm m" is a VALUE. Reading it as §1.6 would let an ungrounded
    // answer pass the gate on the strength of its own arithmetic.
    expect(parseCitations("resistivity 1.6 ohm m")).toEqual([]);
    expect(parseCitations("a current of 2.5 mA")).toEqual([]);
  });
});

describe("deriveAnchors", () => {
  // The grounding gate is only as good as the anchor list it checks against, so
  // the list is DERIVED from the chapter's own text rather than hand-typed.
  const CH1 = [
    "1.1 Chemical Equations",
    "Activity 1.1",
    "prose mentioning Fig. 1.3 and Figure 1.4",
    "1.2 Balanced Chemical Equations",
    "Table 1.1 shows the atom counts",
    "1.2.1 Writing a Chemical Equation",
  ].join("\n");

  it("collects section numbers, activities, figures and tables", () => {
    expect(deriveAnchors(CH1, 1).sort()).toEqual(
      ["1.1", "1.2", "1.2.1", "Activity 1.1", "Fig. 1.3", "Fig. 1.4", "Table 1.1"].sort()
    );
  });

  it("de-duplicates repeated mentions", () => {
    expect(deriveAnchors("Activity 1.1 ... see Activity 1.1 again", 1)).toEqual(["Activity 1.1"]);
  });

  it("drops anchors belonging to a DIFFERENT chapter", () => {
    // The split PDFs carry running heads and cross-references; an anchor list that
    // admitted "9.4" would let a Chapter-1 answer ground itself in Light.
    expect(deriveAnchors("see §9.4 and Activity 9.2", 1)).toEqual([]);
  });

  it("does not turn a bare decimal quantity into a section anchor", () => {
    // A section heading is a number FOLLOWED BY A TITLE at line start. "1.6 ohm"
    // is a value; admitting it would let an answer cite its own arithmetic.
    expect(deriveAnchors("resistivity is 1.6 ohm m at 20 C", 1)).toEqual([]);
  });

  it("reads a section heading only at the start of a line", () => {
    expect(deriveAnchors("as shown in 1.2 Balanced Equations above", 1)).toEqual([]);
    expect(deriveAnchors("1.2 Balanced Equations", 1)).toEqual(["1.2"]);
  });

  it("does not read a value + unit at line start as a section heading", () => {
    // Real line, Ch.11 p20: "0.50 A. What is the power of the bulb?" — a number,
    // a unit letter, a full stop. A title word must follow the number, so a lone
    // capital cannot mint an anchor. Found by running the probe on the book, not
    // by reading the regex.
    expect(deriveAnchors("1.50 A. What is the power of the bulb?", 1)).toEqual([]);
    expect(deriveAnchors("1.1 CHEMICAL EQUATIONS", 1)).toEqual(["1.1"]);
    expect(deriveAnchors("1.1.1 Writing a Chemical Equation", 1)).toEqual(["1.1.1"]);
  });
});

describe("groundingViolations", () => {
  const ANCHORS = ["1.1", "1.2", "1.2.1", "Activity 1.5", "Fig. 1.3"];

  it("passes a row citing a known anchor", () => {
    const rows = [{ ref: "Ex 1 Q4", groundedIn: "Defined in §1.2." }];
    expect(groundingViolations(rows, ANCHORS)).toEqual([]);
  });

  it("flags a row with NO groundedIn at all", () => {
    // The whole point: an unkeyed descriptive answer with no citation is an
    // assertion, and this corpus is ~75% unkeyed descriptive answers.
    const v = groundingViolations([{ ref: "Ex 1 Q4" }], ANCHORS);
    expect(v).toHaveLength(1);
    expect(v[0].ref).toBe("Ex 1 Q4");
    expect(v[0].reason).toMatch(/missing/i);
  });

  it("flags a groundedIn that cites nothing resolvable", () => {
    const v = groundingViolations([{ ref: "Ex 1 Q4", groundedIn: "It is well known." }], ANCHORS);
    expect(v).toHaveLength(1);
    expect(v[0].reason).toMatch(/no citation/i);
  });

  it("flags a citation that does not resolve against THIS chapter", () => {
    // §9.4 is a real section of the book but not of Chapter 1. Cross-chapter
    // grounding is how an answer drifts to a topic the question never asked about.
    const v = groundingViolations([{ ref: "Ex 1 Q4", groundedIn: "See §9.4." }], ANCHORS);
    expect(v).toHaveLength(1);
    expect(v[0].reason).toMatch(/unresolved/i);
    expect(v[0].reason).toContain("9.4");
  });

  it("names EVERY unresolved anchor, not just the first", () => {
    const v = groundingViolations([{ ref: "Ex 1 Q4", groundedIn: "See §9.4 and §3.1." }], ANCHORS);
    expect(v).toHaveLength(1);
    expect(v[0].reason).toContain("9.4");
    expect(v[0].reason).toContain("3.1");
  });

  it("passes when at least one anchor resolves and none dangle", () => {
    const rows = [{ ref: "Ex 1 Q4", groundedIn: "§1.2 with Activity 1.5." }];
    expect(groundingViolations(rows, ANCHORS)).toEqual([]);
  });

  it("reports one violation per row and keeps row order", () => {
    const v = groundingViolations(
      [
        { ref: "IT 1.1 Q1", groundedIn: "§1.1" },
        { ref: "IT 1.1 Q2" },
        { ref: "Ex 1 Q4", groundedIn: "§9.9" },
      ],
      ANCHORS
    );
    expect(v.map((x) => x.ref)).toEqual(["IT 1.1 Q2", "Ex 1 Q4"]);
  });

  it("treats an empty anchor list as 'cannot verify', not 'all fine'", () => {
    // A chapter whose section outline has not been authored yet must not read as
    // a clean grounding pass. Failing closed is the whole reason this exists.
    const v = groundingViolations([{ ref: "Ex 1 Q4", groundedIn: "§1.2" }], []);
    expect(v).toHaveLength(1);
    expect(v[0].reason).toMatch(/no anchors/i);
  });
});

describe("parseKeyChapters", () => {
  // The literal shape jesc1an.pdf's text layer produces: a "Chapter N" header,
  // then item numbers and answers wrapped across lines in a two-column layout.
  const KEY = [
    "A n s w e r s",
    "Chapter 1",
    "1.",
    "(i)",
    "2. (d)",
    "3.",
    "(a)",
    "Chapter 2",
    "1.",
    "(d)",
    "2. (b)",
  ].join("\n");

  it("groups keyed item numbers under their chapter", () => {
    const m = parseKeyChapters(KEY);
    expect(m.get(1)).toEqual([1, 2, 3]);
    expect(m.get(2)).toEqual([1, 2]);
  });

  it("stops a chapter's block at the next Chapter header", () => {
    // Without this the whole file reads as one chapter and every reconcile lies.
    expect(parseKeyChapters(KEY).get(1)).not.toContain(4);
  });

  it("returns nothing for a chapter the key does not carry", () => {
    expect(parseKeyChapters(KEY).get(9)).toBeUndefined();
  });

  it("records a GAP rather than renumbering it away", () => {
    // Ch.9 keys 1-7 then 9: Q8 is descriptive and has no answer. A parser that
    // closed the gap would claim an answer exists for a question that has none.
    const m = parseKeyChapters("Chapter 9\n1. (d)\n7. x\n9. Yes");
    expect(m.get(9)).toEqual([1, 7, 9]);
  });

  it("does not read an answer's own decimals as item numbers", () => {
    // Ch.11 keys "6. 122.7 m" and "13. 9.2 A, 4.6 A". The digits inside the
    // ANSWER must not mint items 122, 9 or 4 — key-items.ts's header warns that
    // this is exactly how a two-column key fools a naive item scan.
    const m = parseKeyChapters("Chapter 11\n6. 122.7 m; 1/4 times\n13. 9.2 A, 4.6 A, 18.3 A");
    expect(m.get(11)).toEqual([6, 13]);
  });

  it("is not confused by the word Chapter inside an answer", () => {
    const m = parseKeyChapters("Chapter 3\n1. (d)\n2. see Chapter 4 for more\n3. (a)");
    expect(m.get(3)).toEqual([1, 2, 3]);
    expect(m.get(4)).toBeUndefined();
  });
});

describe("refStructure", () => {
  it("recovers the two lanes from a list of refs", () => {
    const s = refStructure([
      "IT 1.1 Q1",
      "IT 1.1 Q2 (i)",
      "IT 1.1 Q2 (ii)",
      "IT 1.2 Q1",
      "Ex 1 Q1",
      "Ex 1 Q5 (a)",
      "Ex 1 Q5 (b)",
    ]);
    expect(s.boxes.get(1)).toEqual([1, 2]);
    expect(s.boxes.get(2)).toEqual([1]);
    expect(s.exercise).toEqual([1, 5]);
  });

  it("collapses sub-parts to ONE top-level item", () => {
    // Q5 (a)-(d) is four rows but one printed item. Counting rows against the
    // book's item numbers would report four phantom extras on every set question.
    const s = refStructure(["Ex 1 Q5 (a)", "Ex 1 Q5 (b)", "Ex 1 Q5 (c)", "Ex 1 Q5 (d)"]);
    expect(s.exercise).toEqual([5]);
  });

  it("sorts numerically, not as strings", () => {
    const s = refStructure(["Ex 1 Q10", "Ex 1 Q2", "Ex 1 Q1"]);
    expect(s.exercise).toEqual([1, 2, 10]);
  });

  it("ignores a worked-example ref, which the book does not number as an item", () => {
    const s = refStructure(["11.3 Eg.5", "Ex 11 Q1"]);
    expect(s.exercise).toEqual([1]);
    expect(s.boxes.size).toBe(0);
  });
});

describe("reconcile", () => {
  it("reports BOTH directions", () => {
    // One direction alone cannot catch an omission — the failure mode that let a
    // dropped sub-part and two dropped questions through in the Maths lane.
    expect(reconcile([1, 2, 3], [1, 3, 4])).toEqual({ missing: [2], extra: [4] });
  });

  it("is clean when the two agree", () => {
    expect(reconcile([1, 2], [2, 1])).toEqual({ missing: [], extra: [] });
  });

  it("treats an empty actual as everything missing, not as agreement", () => {
    expect(reconcile([1, 2], [])).toEqual({ missing: [1, 2], extra: [] });
  });
});

describe("parseKeyChapters — decimals at line start", () => {
  it("does not read a wrapped answer value as an item label", () => {
    // Ch.11's key wraps "9.  0.67 A" so that "0.67 A" can land at the START of a
    // line, where `^(\d{1,2})\.` read it as item 0. The chapter then reported 18
    // keyed items against 7 book items — 257% coverage, which is how the bug was
    // spotted. A real label has WHITESPACE after its dot; a decimal does not.
    const m = parseKeyChapters("Chapter 11\n1. (d)\n0.67 A\n18.3 A\n12. 110 bulbs");
    expect(m.get(11)).toEqual([1, 12]);
  });

  it("still accepts a label whose answer wrapped onto the next line", () => {
    // "5.\nParallel" is the common shape in this key — dot then end-of-line.
    expect(parseKeyChapters("Chapter 11\n5.\nParallel\n7.\n3.33 ohm").get(11)).toEqual([5, 7]);
  });
});
