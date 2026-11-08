/**
 * POST /api/me/focus: a two-exam student taps an exam chip (or All) on /me or
 * /performance. Signed in only; the choice must be one of the student's own
 * exams, refused BEFORE any write (the database refuses it too, 0231, tested
 * in me-focus.integration.test.ts). Consistent { ok } / { error } shape.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

let sessionUser: { id: string } | null = null;
let targets: string[] = [];
const saved: string[] = [];

vi.mock("@/lib/auth", async (orig) => ({
  ...(await orig<typeof import("@/lib/auth")>()),
  getSessionUser: async () => sessionUser,
}));

vi.mock("@/lib/supabase/server", async (orig) => ({
  ...(await orig<typeof import("@/lib/supabase/server")>()),
  createSupabaseServerClient: () => ({}),
}));

vi.mock("@/lib/profile/service", async (orig) => ({
  ...(await orig<typeof import("@/lib/profile/service")>()),
  getOnboardingState: async () => ({ targetExams: targets, stage: null, onboardedAt: null, pushPromptedAt: null }),
}));

vi.mock("@/lib/me/focusServer", async (orig) => ({
  ...(await orig<typeof import("@/lib/me/focusServer")>()),
  saveOwnFocus: async (_db: unknown, _id: string, choice: string) => {
    saved.push(choice);
  },
}));

const post = async (body: unknown) => {
  const { POST } = await import("@/app/api/me/focus/route");
  return POST(
    new NextRequest("http://localhost/api/me/focus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: typeof body === "string" ? body : JSON.stringify(body),
    })
  );
};

describe("POST /api/me/focus", () => {
  beforeEach(() => {
    sessionUser = { id: "u1" };
    targets = ["nda", "cds"];
    saved.length = 0;
  });

  it("refuses a signed-out visitor", async () => {
    sessionUser = null;
    const res = await post({ exam: "cds" });
    expect(res.status).toBe(401);
    expect(saved).toEqual([]);
  });

  it("refuses a body that is not JSON or not the right shape", async () => {
    expect((await post("not json")).status).toBe(400);
    expect((await post({ exam: 5 })).status).toBe(400);
    expect(saved).toEqual([]);
  });

  it("refuses an exam that is not one of the student's", async () => {
    const res = await post({ exam: "jee-mains" });
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: expect.any(String) });
    expect(saved).toEqual([]);
  });

  it("saves one of the student's exams, and All", async () => {
    const res = await post({ exam: "cds" });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect((await post({ exam: "all" })).status).toBe(200);
    expect(saved).toEqual(["cds", "all"]);
  });

  it("refuses a one-exam student: there is nothing to switch", async () => {
    targets = ["nda"];
    expect((await post({ exam: "nda" })).status).toBe(400);
    expect(saved).toEqual([]);
  });
});
