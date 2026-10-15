import { describe, it, expect, vi } from "vitest";
import { listWithFreshOnMiss } from "@/lib/questionPapers/freshOnMiss";

// A subject or paper page 404s when the cached published list has nothing for
// it. That list is cached per page route and outlives a deploy, so a publish
// without a cache-key bump left CBSE 10 Maths + Science serving a cached 404
// (2026-10-15, the third time). A miss now costs one fresh read instead.
describe("listWithFreshOnMiss", () => {
  const wanted = (n: number) => n === 3;

  it("returns the cached list without a fresh read when it has the page's papers", async () => {
    const fresh = vi.fn(async () => [9]);
    expect(await listWithFreshOnMiss(async () => [1, 3], fresh, wanted)).toEqual([1, 3]);
    expect(fresh).not.toHaveBeenCalled();
  });

  it("reads afresh once when the cached list is stale", async () => {
    const fresh = vi.fn(async () => [1, 3, 5]);
    expect(await listWithFreshOnMiss(async () => [1], fresh, wanted)).toEqual([1, 3, 5]);
    expect(fresh).toHaveBeenCalledTimes(1);
  });

  it("returns the fresh list even when it misses too, so a real 404 stays a 404", async () => {
    expect(await listWithFreshOnMiss(async () => [1], async () => [2], wanted)).toEqual([2]);
  });

  it("lets a failed fresh read throw rather than cache a 404 for a day", async () => {
    await expect(
      listWithFreshOnMiss(async () => [1], async () => {
        throw new Error("down");
      }, wanted)
    ).rejects.toThrow("down");
  });
});
