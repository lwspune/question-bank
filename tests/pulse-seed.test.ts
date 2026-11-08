/**
 * Home's numbers arrive with the page (2026-11-08). /me builds the pulse on
 * the server and SEEDS the browser's shared copy with it, so the header badge
 * and the cards use it without asking /api/me/pulse again. Live updates keep
 * working: an invalidation (a drill answer, a graded mock) still refetches.
 */
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchPulse, invalidatePulse, resetPulseCache, seedPulse } from "@/lib/viewer/usePulse";
import type { Pulse } from "@/lib/pulse/cache";

const SEED: Pulse = {
  due: 7,
  week: { done: 2, goal: 3 },
  exam: null,
  totals: { answered: 120, right: 80, fixed: 4 },
  weak: [],
  chapterDue: {},
};
const FRESH: Pulse = { ...SEED, due: 6 };

describe("seedPulse", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    resetPulseCache();
    fetchMock = vi.fn(async () => new Response(JSON.stringify(FRESH), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
  });

  it("serves the seeded pulse without a request", async () => {
    seedPulse(SEED);
    expect(await fetchPulse()).toEqual(SEED);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("still refetches on an invalidation, so the badge counts down", async () => {
    seedPulse(SEED);
    invalidatePulse();
    expect(await fetchPulse()).toEqual(FRESH);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("replaces an older value: the server's is the newest", async () => {
    seedPulse({ ...SEED, due: 99 });
    seedPulse(SEED);
    expect(await fetchPulse()).toEqual(SEED);
  });
});
