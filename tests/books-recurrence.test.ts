/**
 * The repeat-detection core for the MHT-CET Maths book.
 *
 * MHT-CET re-asks questions across shifts and years, and those copies survive
 * `content_hash` dedup because their options were typed independently. In a
 * chapterwise book they land ADJACENT under one subtopic heading, so the book
 * either prints the same question up to four times or collapses it and says how
 * often it was asked.
 *
 * Two measured facts drive every case below.
 *
 * A REPEAT IS COUNTED IN SITTINGS, NEVER IN ROWS. Three MHT-CET papers were
 * uploaded twice under different labels; 90 of the 118 repeated-stem groups in
 * MHT-CET Maths are one of those, i.e. one sitting rather than a repeat.
 * Counting rows would print "asked twice" on 90 questions that were asked once.
 *
 * THE STEM KEY MUST KEEP MATH OPERATORS. Stripping all punctuation merges
 * `cos 2t` with `cos^2 t`, and two genuinely different plane questions whose
 * coefficients differ only in sign — measured against the live bank, three real
 * question pairs. A false merge DELETES a distinct question, so the key keeps
 * every character that can change what is asked.
 */
import { describe, it, expect } from "vitest";
import {
  normaliseStem,
  normaliseAnswer,
  groupRepeats,
  recurrenceLabels,
  type RecurrenceRow,
} from "../src/lib/books/recurrence";

function row(over: Partial<RecurrenceRow> & { questionId: string }): RecurrenceRow {
  return {
    stem: "same question",
    sittingOrdinal: 1,
    sittingLabel: "2023 - 2 May Shift 1",
    chapter: "Vectors",
    subtopic: "Dot Product",
    answer: "42",
    hasFigure: false,
    preferred: true,
    ...over,
  };
}

describe("normaliseStem", () => {
  it("sees through the formatting variance of two independent typings", () => {
    expect(
      normaliseStem("\\(x\\tan\\frac{x}{2} + c\\), where c is the constant")
    ).toBe(
      normaliseStem("\\(xtan\\frac{x}{2} + c\\),  where  c  is  the  constant")
    );
  });

  it("KEEPS an exponent, so cos 2x and cos^2 x stay different questions", () => {
    expect(normaliseStem("value of \\(\\cos2\\theta\\)")).not.toBe(
      normaliseStem("value of \\(\\cos^{2}\\theta\\)")
    );
  });

  it("KEEPS a sign, so two planes differing only in a sign stay apart", () => {
    expect(normaliseStem("perpendicular to \\(2x-y-2z=5\\)")).not.toBe(
      normaliseStem("perpendicular to \\(2x+y-2z=5\\)")
    );
  });

  it("drops an EMPTY sub/superscript, which is a typesetting artifact", () => {
    // Measured: this pair is one question typed twice, split by `_{}^{}` alone.
    expect(
      normaliseStem("\\(\\int_{}^{}\\ \\frac{x+ \\sin x}{1 + \\cos x}dx=\\)")
    ).toBe(normaliseStem("\\(\\int \\frac{x + \\sin x}{1 + \\cos x}\\,dx =\\)"));
  });
});

describe("groupRepeats", () => {
  it("returns nothing for questions that appear once", () => {
    expect(
      groupRepeats([
        row({ questionId: "a", stem: "one" }),
        row({ questionId: "b", stem: "two" }),
      ])
    ).toEqual([]);
  });

  /** THE LOAD-BEARING CASE — see the header. */
  it("calls two copies from ONE sitting a duplicate upload, not a repeat", () => {
    const g = groupRepeats([
      row({ questionId: "a", sittingOrdinal: 7, sittingLabel: "2023 - 16 May Shift 2" }),
      row({
        questionId: "b",
        sittingOrdinal: 7,
        sittingLabel: "2023 - 16 May Shift 2",
        preferred: false,
      }),
    ]);
    expect(g).toHaveLength(1);
    expect(g[0].kind).toBe("upload-duplicate");
    expect(g[0].sittings).toEqual(["2023 - 16 May Shift 2"]);
  });

  it("calls copies from DIFFERENT sittings a repeat, listing each sitting once", () => {
    const g = groupRepeats([
      row({ questionId: "a", sittingOrdinal: 3, sittingLabel: "2023 - 2 May Shift 1" }),
      row({ questionId: "b", sittingOrdinal: 9, sittingLabel: "2024 - 9 May Shift 1" }),
      row({ questionId: "c", sittingOrdinal: 9, sittingLabel: "2024 - 9 May Shift 1" }),
    ]);
    expect(g[0].kind).toBe("repeat");
    expect(g[0].sittings).toEqual(["2023 - 2 May Shift 1", "2024 - 9 May Shift 1"]);
  });

  it("keeps the EARLIEST sitting's copy and marks the rest redundant", () => {
    const g = groupRepeats([
      row({ questionId: "late", sittingOrdinal: 9 }),
      row({ questionId: "early", sittingOrdinal: 2 }),
    ]);
    expect(g[0].keeperId).toBe("early");
    expect(g[0].redundantIds).toEqual(["late"]);
  });

  it("prefers the primary upload's copy when two share a sitting", () => {
    // The duplicate label's copy was typed independently and is the weaker
    // transcription — for 2025 the primary is the curated .docx pipeline.
    const g = groupRepeats([
      row({ questionId: "dup", preferred: false }),
      row({ questionId: "primary", preferred: true }),
    ]);
    expect(g[0].keeperId).toBe("primary");
  });

  it("is a pure function of its input, not of the order rows arrive in", () => {
    const rows = [
      row({ questionId: "a", sittingOrdinal: 5 }),
      row({ questionId: "b", sittingOrdinal: 2 }),
      row({ questionId: "c", sittingOrdinal: 8 }),
    ];
    expect(groupRepeats(rows)).toEqual(groupRepeats([...rows].reverse()));
  });

  describe("review reasons — a flagged group is never collapsed automatically", () => {
    it("flags copies whose answers disagree", () => {
      const g = groupRepeats([
        row({ questionId: "a", answer: "7:5" }),
        row({ questionId: "b", answer: "5:7", sittingOrdinal: 4 }),
      ]);
      expect(g[0].review).toContain("answer-conflict");
    });

    /**
     * THIS is the case that guards auto-collapse, and it must go through
     * `groupRepeats` rather than test `normaliseAnswer` alone: asserting the
     * helper is correct proves nothing about whether the caller uses it. An
     * earlier version of these tests passed with `reviewReasons` still on the
     * stem key.
     */
    it("flags answers differing ONLY by an interval bracket", () => {
      const g = groupRepeats([
        row({ questionId: "a", answer: "(1, 7/3)" }),
        row({ questionId: "b", answer: "[1, 7/3]", sittingOrdinal: 4 }),
      ]);
      expect(g[0].review).toContain("answer-conflict");
    });

    it("flags answers differing ONLY by a unicode minus sign", () => {
      const g = groupRepeats([
        row({ questionId: "a", answer: "–3" }),
        row({ questionId: "b", answer: "3", sittingOrdinal: 4 }),
      ]);
      expect(g[0].review).toContain("answer-conflict");
    });

    /**
     * Order matters inside `normaliseAnswer`: brackets are kept as CONTENT, so
     * the inline-math delimiters must be stripped FIRST or they read as content
     * too. Measured on the live bank, getting this wrong produced 14 false
     * conflicts — every one the same answer typed with and without delimiters.
     */
    it("does NOT flag the same answer typed with and without math delimiters", () => {
      const g = groupRepeats([
        row({ questionId: "a", answer: String.raw`\(4\)` }),
        row({ questionId: "b", answer: "4", sittingOrdinal: 4 }),
      ]);
      expect(g[0].review).toEqual([]);
    });

    it("does NOT flag copies whose answers agree once normalised", () => {
      const g = groupRepeats([
        row({ questionId: "a", answer: "xtanx2+c" }),
        row({ questionId: "b", answer: "xtanx2+c", sittingOrdinal: 4 }),
      ]);
      expect(g[0].review).toEqual([]);
    });

    it("flags copies filed under different chapters or subtopics", () => {
      const chapters = groupRepeats([
        row({ questionId: "a", chapter: "Vectors" }),
        row({ questionId: "b", chapter: "Line and Plane", sittingOrdinal: 4 }),
      ]);
      expect(chapters[0].review).toContain("chapter-split");

      const subs = groupRepeats([
        row({ questionId: "a", subtopic: "Dot Product" }),
        row({ questionId: "b", subtopic: "Cross Product", sittingOrdinal: 4 }),
      ]);
      expect(subs[0].review).toContain("subtopic-split");
    });

    it("flags a group carrying a figure, since identical text can hide two questions", () => {
      // Real case: "The shaded region in the following figure is the solution
      // set of the inequations" — the question lives in the figure, not the stem.
      const g = groupRepeats([
        row({ questionId: "a", hasFigure: true }),
        row({ questionId: "b", sittingOrdinal: 4 }),
      ]);
      expect(g[0].review).toContain("figure");
    });

    it("flags a group whose sitting cannot be read, since A and B are then indistinguishable", () => {
      const g = groupRepeats([
        row({ questionId: "a", sittingOrdinal: null }),
        row({ questionId: "b" }),
      ]);
      expect(g[0].review).toContain("unknown-sitting");
    });
  });
});

describe("recurrenceLabels — what the badge prints", () => {
  const pair = [
    row({ questionId: "keep", sittingOrdinal: 2, sittingLabel: "2023 - 2 May Shift 1" }),
    row({ questionId: "drop", sittingOrdinal: 9, sittingLabel: "2024 - 9 May Shift 1" }),
  ];

  it("gives a collapsed question every sitting it stands for, oldest first", () => {
    const map = recurrenceLabels(pair, new Set(["drop"]));
    expect(map.get("keep")).toEqual(["2023 - 2 May Shift 1", "2024 - 9 May Shift 1"]);
  });

  it("gives a REFUSED group no badge — both copies print, each speaking for itself", () => {
    // Nothing excluded means nobody adjudicated the group, so neither copy may
    // claim the other's sitting. This is what makes refusal cost-free.
    const map = recurrenceLabels(pair, new Set());
    expect(map.get("keep")).toEqual(["2023 - 2 May Shift 1"]);
    expect(map.get("drop")).toEqual(["2024 - 9 May Shift 1"]);
  });

  it("gives a collapsed DUPLICATE UPLOAD one sitting, so it earns no badge", () => {
    const dup = [
      row({ questionId: "keep", sittingOrdinal: 7, sittingLabel: "2023 - 16 May Shift 2" }),
      row({ questionId: "drop", sittingOrdinal: 7, sittingLabel: "2023 - 16 May Shift 2" }),
    ];
    expect(recurrenceLabels(dup, new Set(["drop"])).get("keep")).toEqual([
      "2023 - 16 May Shift 2",
    ]);
  });

  it("never lists an excluded question itself", () => {
    expect(recurrenceLabels(pair, new Set(["drop"])).has("drop")).toBe(false);
  });
});

describe("normaliseAnswer — stricter than the stem key, and that is the point", () => {
  /**
   * Both cases are REAL option lists from MHT-CET Maths that the stem key
   * reported as duplicates. The failure direction that matters is the quiet
   * one: two different answers comparing EQUAL means the group is never
   * flagged and gets collapsed automatically.
   */
  it("keeps interval brackets apart, because the bracket IS the answer", () => {
    const three = ["(1, 7/3)", "[1, 7/3)", "[1, 7/3]"];
    expect(new Set(three.map(normaliseAnswer)).size).toBe(3);
    // The stem key flattens all three to one string — why it must not be used here.
    expect(new Set(three.map(normaliseStem)).size).toBe(1);
  });

  it("folds a unicode minus onto ASCII, so -3 and 3 stay different answers", () => {
    const enDash = "–3";
    expect(normaliseAnswer(enDash)).not.toBe(normaliseAnswer("3"));
    // The stem key drops the en-dash as punctuation and calls them equal.
    expect(normaliseStem(enDash)).toBe(normaliseStem("3"));
  });

  it("still sees through the spacing variance of two independent typings", () => {
    expect(normaliseAnswer("2 sqrt(29) + c")).toBe(normaliseAnswer("2sqrt(29)+c"));
  });
});
