/**
 * The /mock catalogue's TYPE axis — past papers vs practice mocks vs sectional
 * tests. Pure; no DB.
 *
 * These rules decide what a student sees on the exam page, and two of them are
 * load-bearing in a way a rendering test could not catch:
 *
 *  - a mock's TYPE comes from two independent columns (source, scope), so the
 *    mapping has to be asserted for all four combinations, not the two that
 *    exist today;
 *  - grouping keys differ per type (year / paper / section) because a practice
 *    mock HAS no year, and grouping it under one would print a sitting that
 *    never happened.
 */
import { describe, it, expect } from "vitest";
import {
  MOCK_TYPES,
  parseMockType,
  mockTypeOf,
  mocksOfType,
  buildMockTypeCards,
  groupMocksForType,
  mockTypeHref,
  mockKindNote,
  type MockTypeSlug,
} from "@/lib/mocks/catalogue";
import type { MockListItem } from "@/lib/mocks/query";

/** A minimal published mock; every field the catalogue reads is overridable. */
function mock(over: Partial<MockListItem> & { slug: string }): MockListItem {
  return {
    id: `id-${over.slug}`,
    paperCode: "maths",
    pyqYear: 2024,
    pyqMonth: "Apr",
    title: `Title ${over.slug}`,
    durationSecs: 9000,
    marking: { correct: 2.5, wrong: -0.83 },
    sections: [{ key: "mathematics", label: "Mathematics", count: 120 }],
    totalQuestions: 120,
    totalMarks: 300,
    examName: "NDA",
    source: "pyq",
    scope: "full",
    ...over,
  };
}

describe("MOCK_TYPES + parseMockType", () => {
  it("declares exactly the three navigable types, in student order", () => {
    expect(MOCK_TYPES.map((t) => t.slug)).toEqual([
      "past-papers",
      "practice",
      "sectional",
    ]);
  });

  it("gives every type a label and a blurb (the picker renders both)", () => {
    for (const t of MOCK_TYPES) {
      expect(t.label.length).toBeGreaterThan(0);
      expect(t.blurb.length).toBeGreaterThan(0);
      expect(t.tagline.length).toBeGreaterThan(0);
    }
  });

  it("round-trips every declared slug", () => {
    for (const t of MOCK_TYPES) {
      expect(parseMockType(t.slug)?.slug).toBe(t.slug);
    }
  });

  it("returns null for an unknown slug rather than falling back to a type", () => {
    // A fallback would serve past papers at /mock/exam/nda/pratice — a typo'd
    // URL that renders content, so nobody ever finds out it was wrong.
    expect(parseMockType("pratice")).toBeNull();
    expect(parseMockType("")).toBeNull();
    expect(parseMockType("PAST-PAPERS")).toBeNull();
  });
});

describe("mockTypeOf — the two-axis mapping", () => {
  it("maps all four (source, scope) combinations", () => {
    expect(mockTypeOf({ source: "pyq", scope: "full" })).toBe("past-papers");
    expect(mockTypeOf({ source: "practice", scope: "full" })).toBe("practice");
    // SCOPE WINS. A sectional test is a sectional test whichever bank its
    // questions came from — that is the axis a student navigates by, because
    // it is the one that decides how long they need to sit down for.
    expect(mockTypeOf({ source: "pyq", scope: "sectional" })).toBe("sectional");
    expect(mockTypeOf({ source: "practice", scope: "sectional" })).toBe("sectional");
  });
});

describe("mocksOfType", () => {
  const all = [
    mock({ slug: "a" }),
    mock({ slug: "b", source: "practice", pyqYear: null }),
    mock({ slug: "c", scope: "sectional", pyqYear: null }),
    mock({ slug: "d", source: "practice", scope: "sectional", pyqYear: null }),
  ];

  it("partitions the corpus with no row lost and none double-counted", () => {
    const counts = MOCK_TYPES.map((t) => mocksOfType(all, t.slug).length);
    expect(counts).toEqual([1, 1, 2]);
    expect(counts.reduce((a, b) => a + b, 0)).toBe(all.length);
  });
});

describe("buildMockTypeCards", () => {
  it("returns one card per type, in MOCK_TYPES order, even when empty", () => {
    const cards = buildMockTypeCards([]);
    expect(cards.map((c) => c.slug)).toEqual(MOCK_TYPES.map((t) => t.slug));
    expect(cards.every((c) => c.count === 0)).toBe(true);
  });

  it("counts each type and its distinct papers", () => {
    const cards = buildMockTypeCards([
      mock({ slug: "p1", paperCode: "maths" }),
      mock({ slug: "p2", paperCode: "gat" }),
      mock({ slug: "x1", paperCode: "maths", source: "practice", pyqYear: null }),
      mock({ slug: "x2", paperCode: "gat", source: "practice", pyqYear: null }),
      mock({ slug: "x3", paperCode: "gat", source: "practice", pyqYear: null }),
    ]);
    const by = Object.fromEntries(cards.map((c) => [c.slug, c]));
    expect(by["past-papers"].count).toBe(2);
    expect(by["past-papers"].paperCount).toBe(2);
    expect(by["practice"].count).toBe(3);
    expect(by["practice"].paperCount).toBe(2);
    expect(by["sectional"].count).toBe(0);
  });

  it("derives a year span for past papers only", () => {
    const cards = buildMockTypeCards([
      mock({ slug: "p1", pyqYear: 2017 }),
      mock({ slug: "p2", pyqYear: 2026 }),
      mock({ slug: "x1", source: "practice", pyqYear: null }),
    ]);
    const by = Object.fromEntries(cards.map((c) => [c.slug, c]));
    expect(by["past-papers"].firstYear).toBe(2017);
    expect(by["past-papers"].lastYear).toBe(2026);
    // No sitting ⇒ no span. 0 is the "nothing to show" signal the picker
    // already uses; it must never read a year off a paper that has none.
    expect(by["practice"].firstYear).toBe(0);
    expect(by["practice"].lastYear).toBe(0);
  });

  it("ignores a stray year on a non-past-paper rather than folding it into a span", () => {
    // The DB permits a year on a practice row (only a FULL PAST PAPER is
    // required to have one). If one is ever set, it must not silently widen a
    // span that claims to describe real sittings.
    const cards = buildMockTypeCards([
      mock({ slug: "p1", pyqYear: 2024 }),
      mock({ slug: "x1", source: "practice", pyqYear: 1999 }),
    ]);
    const by = Object.fromEntries(cards.map((c) => [c.slug, c]));
    expect(by["past-papers"].firstYear).toBe(2024);
    expect(by["past-papers"].lastYear).toBe(2024);
  });
});

describe("groupMocksForType — past papers", () => {
  it("groups by year, newest first", () => {
    const groups = groupMocksForType("past-papers", [
      mock({ slug: "a", pyqYear: 2024 }),
      mock({ slug: "b", pyqYear: 2026 }),
      mock({ slug: "c", pyqYear: 2024 }),
    ]);
    expect(groups.map((g) => g.label)).toEqual(["2026", "2024"]);
    expect(groups[1].items.map((m) => m.slug)).toEqual(["a", "c"]);
  });

  it("surfaces an undated past paper instead of hiding it", () => {
    // A DB CHECK makes this impossible, so if one ever appears it is a defect
    // and the catalogue's job is to make it visible — not to drop the row, and
    // not to file it under a year it does not have.
    const groups = groupMocksForType("past-papers", [
      mock({ slug: "a", pyqYear: 2026 }),
      mock({ slug: "bad", pyqYear: null }),
    ]);
    expect(groups.map((g) => g.label)).toEqual(["2026", "Undated"]);
    expect(groups[1].items.map((m) => m.slug)).toEqual(["bad"]);
  });
});

describe("groupMocksForType — practice", () => {
  const practice = (slug: string, paperCode: string) =>
    mock({ slug, paperCode, source: "practice", pyqYear: null });

  it("groups by paper and labels the group from the blueprint", () => {
    const groups = groupMocksForType("practice", [
      practice("nda-practice-gat-1", "gat"),
      practice("nda-practice-maths-1", "maths"),
    ]);
    // Paper I before Paper II — the printed order, not the paper CODE's
    // alphabetical order, which would put "gat" first.
    expect(groups.map((g) => g.label)).toEqual([
      "Paper I — Mathematics",
      "Paper II — General Ability Test",
    ]);
  });

  it("falls back to the raw paper code when no blueprint is registered", () => {
    const groups = groupMocksForType("practice", [
      mock({ slug: "z", paperCode: "custom", source: "practice", pyqYear: null }),
    ]);
    expect(groups).toHaveLength(1);
    expect(groups[0].label).toBe("custom");
  });

  it("orders within a group by slug NUMERICALLY, so Mock 10 follows Mock 9", () => {
    // An undated paper has no sitting to order by. Slug order is stable across
    // rebuilds (updated_at is not — a re-run of the builder would reshuffle the
    // list under a student), and a numeric compare means the build script does
    // not have to remember to zero-pad.
    const groups = groupMocksForType("practice", [
      practice("nda-practice-maths-10", "maths"),
      practice("nda-practice-maths-2", "maths"),
      practice("nda-practice-maths-1", "maths"),
    ]);
    expect(groups[0].items.map((m) => m.slug)).toEqual([
      "nda-practice-maths-1",
      "nda-practice-maths-2",
      "nda-practice-maths-10",
    ]);
  });
});

describe("groupMocksForType — sectional", () => {
  const sectional = (slug: string, label: string) =>
    mock({
      slug,
      scope: "sectional",
      pyqYear: null,
      sections: [{ key: "k", label, count: 25 }],
    });

  it("groups by the test's own section label, alphabetically", () => {
    const groups = groupMocksForType("sectional", [
      sectional("s2", "Mathematics"),
      sectional("s1", "English"),
    ]);
    expect(groups.map((g) => g.label)).toEqual(["English", "Mathematics"]);
  });

  it("does not drop a test that carries no sections", () => {
    const groups = groupMocksForType("sectional", [
      mock({ slug: "s0", scope: "sectional", pyqYear: null, sections: [] }),
    ]);
    expect(groups.flatMap((g) => g.items.map((m) => m.slug))).toEqual(["s0"]);
  });
});

describe("groupMocksForType — shared invariants", () => {
  const corpus: MockListItem[] = [
    mock({ slug: "a", pyqYear: 2026 }),
    mock({ slug: "b", pyqYear: 2024 }),
    mock({ slug: "c", source: "practice", pyqYear: null, paperCode: "gat" }),
    mock({ slug: "d", scope: "sectional", pyqYear: null }),
  ];

  it("never loses or duplicates a row, for every type", () => {
    for (const t of MOCK_TYPES) {
      const mine = mocksOfType(corpus, t.slug);
      const flat = groupMocksForType(t.slug, mine).flatMap((g) => g.items);
      expect(flat.map((m) => m.slug).sort()).toEqual(
        mine.map((m) => m.slug).sort()
      );
    }
  });

  it("returns no groups for an empty list", () => {
    for (const t of MOCK_TYPES) {
      expect(groupMocksForType(t.slug, [])).toEqual([]);
    }
  });
});

describe("mockTypeHref", () => {
  it("builds the per-exam, per-type route", () => {
    const cases: [MockTypeSlug, string][] = [
      ["past-papers", "/mock/exam/nda/past-papers"],
      ["practice", "/mock/exam/nda/practice"],
      ["sectional", "/mock/exam/nda/sectional"],
    ];
    for (const [type, href] of cases) {
      expect(mockTypeHref("nda", type)).toBe(href);
    }
  });
});

describe("mockKindNote — the honesty line on the instructions page", () => {
  const note = (over: Parameters<typeof mockKindNote>[0]) => mockKindNote(over);

  it("gives EVERY type a note, so absence never carries the meaning", () => {
    // If only practice mocks said what they were, "no note" would silently mean
    // "past paper" — a claim made by omission, which is the failure this
    // codebase has paid for repeatedly. Every type states itself.
    const shapes = [
      { source: "pyq", scope: "full" },
      { source: "practice", scope: "full" },
      { source: "pyq", scope: "sectional" },
      { source: "practice", scope: "sectional" },
    ] as const;
    for (const sh of shapes) {
      const text = note({ ...sh, examName: "NDA", totalQuestions: 120 });
      expect(text.length).toBeGreaterThan(0);
    }
  });

  it("says a past paper is the real thing", () => {
    const text = note({ source: "pyq", scope: "full", examName: "NDA", totalQuestions: 120 });
    expect(text).toContain("real NDA paper");
  });

  it("says outright that a practice paper is NOT a past paper", () => {
    const text = note({ source: "practice", scope: "full", examName: "NDA", totalQuestions: 120 });
    expect(text).toMatch(/not a past paper/i);
    expect(text).toContain("blueprint");
  });

  it("says a sectional test is not a full paper, and names its source", () => {
    const fromPyq = note({ source: "pyq", scope: "sectional", examName: "NDA", totalQuestions: 25 });
    expect(fromPyq).toMatch(/not a full paper/i);
    expect(fromPyq).toContain("25");
    expect(fromPyq).toMatch(/past-paper questions/i);

    const fromBank = note({ source: "practice", scope: "sectional", examName: "NDA", totalQuestions: 25 });
    expect(fromBank).toMatch(/not a full paper/i);
    expect(fromBank).not.toMatch(/past-paper questions/i);
  });
});
