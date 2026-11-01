import { afterEach, describe, expect, it, vi } from "vitest";

// Record every key the catalog asks unstable_cache for; call straight through.
const { keysSeen } = vi.hoisted(() => ({ keysSeen: [] as string[][] }));
vi.mock("next/cache", () => ({
  unstable_cache: (fn: () => unknown, keyParts: string[]) => {
    keysSeen.push(keyParts);
    return fn;
  },
}));
vi.mock("@/lib/supabase/server", () => ({
  createSupabaseAnonClient: () => ({
    from: () => ({
      select: () => Promise.resolve({ data: null, error: { message: "fetch failed" } }),
    }),
  }),
}));

import { examCatalogCacheKey, getExamCatalogForRender } from "@/lib/exam/allExamStats";

// The homepage showed a copy of the counts days past its one-day lifetime
// (2026-11-02: CISCE "Coming soon" three days after it went live, ~1,550
// questions short). A key that names the day makes yesterday's copy
// unreachable whether or not the platform ever refreshes it.
describe("examCatalogCacheKey", () => {
  it("is different on different days", () => {
    const a = examCatalogCacheKey(new Date("2026-11-02T10:00:00Z"));
    const b = examCatalogCacheKey(new Date("2026-11-03T10:00:00Z"));
    expect(a).not.toEqual(b);
  });

  it("is the same all day", () => {
    expect(examCatalogCacheKey(new Date("2026-11-02T00:05:00Z"))).toEqual(
      examCatalogCacheKey(new Date("2026-11-02T23:55:00Z"))
    );
  });
});

describe("the catalog loader uses today's key", () => {
  afterEach(() => vi.useRealTimers());

  it("asks the cache for the current day's entry", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-05T12:00:00Z"));
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    await getExamCatalogForRender();
    spy.mockRestore();
    expect(keysSeen.at(-1)).toEqual(examCatalogCacheKey(new Date("2026-11-05T12:00:00Z")));
  });
});
