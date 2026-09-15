/**
 * The paging arithmetic behind the performance page's list cards.
 *
 * It is a pure helper and not inline `slice` math for one reason: every one of
 * these lists is SEVERITY-RANKED, so an off-by-one does not look like a bug —
 * it looks like a slightly different diagnosis. The clamping rules below are
 * what stop a stale or hand-typed page number rendering an empty card.
 */
import { describe, it, expect } from "vitest";
import { pageOf, PERF_PAGE_SIZE } from "@/lib/paging";

const items = (n: number) => Array.from({ length: n }, (_, i) => i + 1);

describe("pageOf", () => {
  it("returns the first page and the human-readable range", () => {
    const p = pageOf(items(106), 1, 5);
    expect(p.rows).toEqual([1, 2, 3, 4, 5]);
    expect(p.page).toBe(1);
    expect(p.pageCount).toBe(22);
    expect(p.from).toBe(1);
    expect(p.to).toBe(5);
    expect(p.total).toBe(106);
  });

  it("returns a middle page", () => {
    const p = pageOf(items(106), 3, 5);
    expect(p.rows).toEqual([11, 12, 13, 14, 15]);
    expect(p.from).toBe(11);
    expect(p.to).toBe(15);
  });

  it("returns a short final page without padding it", () => {
    const p = pageOf(items(106), 22, 5);
    expect(p.rows).toEqual([106]);
    expect(p.from).toBe(106);
    expect(p.to).toBe(106);
  });

  it("counts an exact multiple without inventing a trailing empty page", () => {
    expect(pageOf(items(10), 1, 5).pageCount).toBe(2);
    expect(pageOf(items(10), 2, 5).rows).toEqual([6, 7, 8, 9, 10]);
  });

  it("clamps a page past the end to the last page", () => {
    // A stale URL or a list that shrank between renders. Clamping keeps the
    // card showing data; returning [] would read as "nothing to review".
    const p = pageOf(items(12), 99, 5);
    expect(p.page).toBe(3);
    expect(p.rows).toEqual([11, 12]);
  });

  it("clamps a page below one", () => {
    expect(pageOf(items(12), 0, 5).page).toBe(1);
    expect(pageOf(items(12), -4, 5).rows).toEqual([1, 2, 3, 4, 5]);
  });

  it("survives a NaN page rather than propagating it into slice()", () => {
    // Math.max(1, NaN) is NaN — the clamp has to test for it explicitly, or
    // slice(NaN, NaN) silently returns an empty card.
    const p = pageOf(items(12), Number.NaN, 5);
    expect(p.page).toBe(1);
    expect(p.rows).toEqual([1, 2, 3, 4, 5]);
  });

  it("reports one empty page for an empty list, never zero pages", () => {
    const p = pageOf([], 1, 5);
    expect(p.rows).toEqual([]);
    expect(p.pageCount).toBe(1);
    expect(p.page).toBe(1);
    expect(p.total).toBe(0);
    // `from` collapses to 0 so "showing 0 of 0" reads correctly rather than
    // claiming a first row that does not exist.
    expect(p.from).toBe(0);
    expect(p.to).toBe(0);
  });

  it("treats a non-positive page size as one row per page", () => {
    // A zero size would divide by zero into Infinity pages.
    expect(pageOf(items(3), 1, 0).rows).toEqual([1]);
    expect(pageOf(items(3), 1, 0).pageCount).toBe(3);
  });

  it("never mutates or re-orders the caller's array", () => {
    const source = items(7);
    pageOf(source, 2, 5);
    expect(source).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("pins the page size the performance cards ship with", () => {
    expect(PERF_PAGE_SIZE).toBe(5);
  });
});
