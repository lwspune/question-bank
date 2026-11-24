import { describe, it, expect } from "vitest";
import { paginate, visiblePages } from "@/lib/pagination";

const ids = (n: number) => Array.from({ length: n }, (_, i) => i + 1);

describe("paginate", () => {
  it("returns the first page and its 1-based bounds", () => {
    const p = paginate(ids(120), 1, 50);
    expect(p.items).toEqual(ids(50));
    expect(p).toMatchObject({ page: 1, totalPages: 3, from: 1, to: 50, total: 120 });
  });

  it("returns a short last page", () => {
    const p = paginate(ids(120), 3, 50);
    expect(p.items).toEqual([101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120]);
    expect(p).toMatchObject({ page: 3, from: 101, to: 120 });
  });

  it("clamps a page past the end to the last page (a filter shrank the list)", () => {
    const p = paginate(ids(60), 9, 50);
    expect(p.page).toBe(2);
    expect(p.items).toEqual(ids(60).slice(50));
  });

  it("clamps a page below 1, or not a whole number, to page 1", () => {
    expect(paginate(ids(60), 0, 50).page).toBe(1);
    expect(paginate(ids(60), -3, 50).page).toBe(1);
    expect(paginate(ids(60), Number.NaN, 50).page).toBe(1);
  });

  it("treats an empty list as one empty page, never page 0", () => {
    const p = paginate([], 4, 50);
    expect(p).toMatchObject({ items: [], page: 1, totalPages: 1, from: 0, to: 0, total: 0 });
  });

  it("a list of exactly one page has one page", () => {
    const p = paginate(ids(50), 2, 50);
    expect(p).toMatchObject({ page: 1, totalPages: 1, from: 1, to: 50 });
  });

  it("does not mutate its input", () => {
    const src = ids(10);
    paginate(src, 2, 3);
    expect(src).toEqual(ids(10));
  });
});

describe("visiblePages", () => {
  it("lists every page when there are 7 or fewer", () => {
    expect(visiblePages(1, 1)).toEqual([1]);
    expect(visiblePages(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("keeps first, last and the neighbours of the current page, gaps as an ellipsis", () => {
    expect(visiblePages(1, 75)).toEqual([1, 2, "…", 75]);
    expect(visiblePages(40, 75)).toEqual([1, "…", 39, 40, 41, "…", 75]);
    expect(visiblePages(75, 75)).toEqual([1, "…", 74, 75]);
    expect(visiblePages(3, 75)).toEqual([1, 2, 3, 4, "…", 75]);
  });
});
