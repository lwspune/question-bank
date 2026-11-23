/**
 * GET /api/gallery/weak?subject=<route> (2026-11-23): a signed-in student's
 * chapters with mistakes waiting on the Fix list, for one gallery subject, so
 * the cached gallery page can put those chapters first. The pool is the Fix
 * list's own (loadOwnPool), so the count matches /me and the drill.
 * Session and pool are mocked; the decisions are real.
 */
import { vi, describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("server-only", () => ({}));
const user = { current: null as null | { id: string } };
vi.mock("@/lib/auth", () => ({ getSessionUser: vi.fn(async () => user.current) }));
vi.mock("@/lib/supabase/server", () => ({ createSupabaseServerClient: vi.fn(async () => ({})) }));
const drillable = {
  current: [] as { chapter: string; exam?: string; subject?: string }[],
};
const loadOwnPool = vi.fn(async () => ({ events: [], drillable: drillable.current }));
vi.mock("@/lib/drill/compose", () => ({ loadOwnPool }));

const { GET } = await import("@/app/api/gallery/weak/route");
const get = (subject: string) => new NextRequest(`http://localhost/api/gallery/weak?subject=${encodeURIComponent(subject)}`);

beforeEach(() => {
  vi.clearAllMocks();
  user.current = null;
  drillable.current = [];
});

describe("GET /api/gallery/weak", () => {
  it("answers nothing waiting for a signed-out visitor, without reading the pool", async () => {
    const res = await GET(get("nda-maths"));
    expect(await res.json()).toEqual({ chapters: {} });
    expect(res.headers.get("cache-control")).toContain("no-store");
    expect(loadOwnPool).not.toHaveBeenCalled();
  });

  it("refuses a subject the gallery does not have", async () => {
    user.current = { id: "u1" };
    expect((await GET(get("not-a-subject"))).status).toBe(400);
    expect(loadOwnPool).not.toHaveBeenCalled();
  });

  it("counts waiting mistakes per chapter for that subject's exam and subject", async () => {
    user.current = { id: "u1" };
    drillable.current = [
      { chapter: "Vectors", exam: "NDA", subject: "Mathematics" },
      { chapter: "Vectors", exam: "NDA", subject: "Mathematics" },
      { chapter: "Probability", exam: "NDA", subject: "Mathematics" },
      { chapter: "Vectors", exam: "MHT-CET", subject: "Mathematics" },
    ];
    const res = await GET(get("nda-maths"));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ chapters: { Vectors: 2, Probability: 1 } });
  });
});
