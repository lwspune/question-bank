import { describe, it, expect, vi } from "vitest";

// unstable_cache needs a Next request context; here it just calls through.
vi.mock("next/cache", () => ({ unstable_cache: (fn: () => unknown) => fn }));
// An anon client whose every read fails, as on 2026-10-08.
vi.mock("@/lib/supabase/server", () => ({
  createSupabaseAnonClient: () => ({
    from: () => ({
      select: () => Promise.resolve({ data: null, error: { message: "fetch failed" } }),
    }),
  }),
}));

import { getExamCatalogForRender } from "@/lib/exam/allExamStats";

describe("getExamCatalogForRender — a per-request page survives a failed load", () => {
  it("returns the registry with countsKnown false instead of throwing", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { catalog, countsKnown } = await getExamCatalogForRender();
    expect(countsKnown).toBe(false);
    // The cards still render (every exam, its name and link); only numbers go.
    expect(catalog.exams.length).toBeGreaterThan(0);
    expect(catalog.exams.every((e) => e.href.length > 0)).toBe(true);
    // The failure is logged, not swallowed.
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
