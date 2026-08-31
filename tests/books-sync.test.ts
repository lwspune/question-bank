/**
 * The sync planner: what changes when the bank moves under a curated book.
 *
 * A book's contents are MATERIALISED — one row per question — so the bank and
 * the book can drift apart, and this decides what to do about it. The three
 * rules that matter are all about NOT destroying a curation decision:
 *
 *   - a question the bank has and the book does not is APPENDED, never
 *     inserted mid-order, because inserting would silently reshuffle a
 *     sequence someone arranged by hand;
 *   - a question the book has and the bank no longer does is REPORTED, never
 *     deleted, because deleting it would also delete the `excluded` decision
 *     attached to it, and the next sync would then re-add it as if new;
 *   - a question the bank has re-chaptered is REPORTED, never moved, because
 *     the book's `chapter_slug` is deliberately allowed to diverge from the
 *     bank's — that divergence IS the "move this to another chapter" feature,
 *     and an auto-move would undo it on the next run.
 */
import { describe, it, expect } from "vitest";
import { planBookSync, type DerivedRow, type StoredRow } from "../src/lib/books/sync";

function d(
  questionId: string,
  chapterSlug = "vocabulary",
  sectionKey: "nda" | "cds" = "nda",
  order = 0
): DerivedRow {
  return { questionId, chapterSlug, sectionKey, order };
}

function s(
  questionId: string,
  position: number,
  chapterSlug = "vocabulary",
  sectionKey: "nda" | "cds" = "nda",
  excluded = false
): StoredRow {
  return { questionId, chapterSlug, sectionKey, position, excluded };
}

describe("planBookSync", () => {
  it("seeds an empty book in derived order, numbering from 1", () => {
    const plan = planBookSync(
      [d("a", "vocabulary", "nda", 0), d("b", "vocabulary", "nda", 1), d("c", "vocabulary", "nda", 2)],
      []
    );
    expect(plan.inserts.map((i) => [i.questionId, i.position])).toEqual([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ]);
    expect(plan.orphans).toEqual([]);
    expect(plan.rechaptered).toEqual([]);
  });

  it("numbers each (chapter, section) independently", () => {
    const plan = planBookSync(
      [
        d("n1", "vocabulary", "nda", 0),
        d("c1", "vocabulary", "cds", 0),
        d("g1", "grammar", "nda", 0),
      ],
      []
    );
    const byId = new Map(plan.inserts.map((i) => [i.questionId, i.position]));
    expect(byId.get("n1")).toBe(1);
    expect(byId.get("c1")).toBe(1);
    expect(byId.get("g1")).toBe(1);
  });

  it("is a no-op on a second run", () => {
    const derived = [d("a", "vocabulary", "nda", 0), d("b", "vocabulary", "nda", 1)];
    const stored = [s("a", 1), s("b", 2)];
    const plan = planBookSync(derived, stored);
    expect(plan.inserts).toEqual([]);
    expect(plan.orphans).toEqual([]);
    expect(plan.rechaptered).toEqual([]);
    expect(plan.unchanged).toBe(2);
  });

  // The load-bearing property: a hand-arranged order must survive an ingest.
  it("appends a new question after the section's current maximum", () => {
    const plan = planBookSync(
      [d("a", "vocabulary", "nda", 0), d("new", "vocabulary", "nda", 1)],
      // Someone reordered: "a" was dragged to position 7.5.
      [s("a", 7.5)]
    );
    expect(plan.inserts).toEqual([
      { questionId: "new", chapterSlug: "vocabulary", sectionKey: "nda", position: 8.5 },
    ]);
  });

  it("appends several new questions in derived order without colliding", () => {
    const plan = planBookSync(
      [d("x", "vocabulary", "nda", 0), d("y", "vocabulary", "nda", 1), d("z", "vocabulary", "nda", 2)],
      [s("x", 3)]
    );
    expect(plan.inserts.map((i) => [i.questionId, i.position])).toEqual([
      ["y", 4],
      ["z", 5],
    ]);
  });

  it("reports a question the bank no longer has, and does not delete it", () => {
    const plan = planBookSync([d("a", "vocabulary", "nda", 0)], [s("a", 1), s("gone", 2)]);
    expect(plan.orphans.map((o) => o.questionId)).toEqual(["gone"]);
    expect(plan.inserts).toEqual([]);
  });

  // An excluded row is a DECISION. It must not read as an orphan and must not
  // be re-inserted — either would quietly undo it.
  it("leaves an excluded question alone", () => {
    const plan = planBookSync(
      [d("a", "vocabulary", "nda", 0), d("dropped", "vocabulary", "nda", 1)],
      [s("a", 1), s("dropped", 2, "vocabulary", "nda", true)]
    );
    expect(plan.inserts).toEqual([]);
    expect(plan.orphans).toEqual([]);
    expect(plan.unchanged).toBe(2);
  });

  // The book's chapter is allowed to differ from the bank's — that divergence
  // is the "move this question" feature. So this is reported, never applied.
  it("reports a re-chaptered question without moving it", () => {
    const plan = planBookSync(
      [d("a", "grammar", "nda", 0)],
      [s("a", 1, "vocabulary", "nda")]
    );
    expect(plan.rechaptered).toEqual([
      { questionId: "a", from: "vocabulary", to: "grammar" },
    ]);
    expect(plan.inserts).toEqual([]);
    expect(plan.orphans).toEqual([]);
  });

  it("does not treat a re-sectioned question as new", () => {
    // Moved from the NDA half to the CDS half by hand. The bank still says NDA,
    // but that is the book's decision to keep.
    const plan = planBookSync(
      [d("a", "vocabulary", "nda", 0)],
      [s("a", 1, "vocabulary", "cds")]
    );
    expect(plan.inserts).toEqual([]);
    expect(plan.orphans).toEqual([]);
  });

  it("assigns positions that are unique within a section", () => {
    const plan = planBookSync(
      [d("a", "vocabulary", "nda", 0), d("b", "vocabulary", "nda", 1), d("c", "vocabulary", "nda", 2)],
      [s("a", 2)]
    );
    const positions = plan.inserts.map((i) => i.position);
    expect(new Set(positions).size).toBe(positions.length);
    for (const p of positions) expect(p).toBeGreaterThan(2);
  });

  it("does not depend on the order rows arrive in", () => {
    const derived = [
      d("b", "vocabulary", "nda", 1),
      d("a", "vocabulary", "nda", 0),
      d("c", "vocabulary", "cds", 0),
    ];
    const stored = [s("a", 1)];
    const forward = planBookSync(derived, stored);
    const reversed = planBookSync([...derived].reverse(), [...stored].reverse());
    expect(JSON.stringify(reversed)).toEqual(JSON.stringify(forward));
  });
});
