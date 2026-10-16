/**
 * POST /api/practice-tests/join — a friend opens a sent practice test
 * (migration 0163). Answers { ok: true, slug } or { ok: false, error, signIn? }.
 * The signed-in paths (own test, existing copy, new copy) are the pure joinPlan
 * in tests/practice-friend.test.ts plus the database rules in
 * tests/practice-friend.integration.test.ts.
 */
import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";

const post = (body: unknown) =>
  new NextRequest("http://localhost:3000/api/practice-tests/join", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

describe("POST /api/practice-tests/join", () => {
  it("refuses a code that is not a practice test's", async () => {
    const { POST } = await import("@/app/api/practice-tests/join/route");
    const res = await POST(post({ code: "nda-2026-i-maths" }));
    expect(res.status).toBe(400);
    expect((await res.json()).ok).toBe(false);
  });

  it("asks a signed-out friend to sign in", async () => {
    const { POST } = await import("@/app/api/practice-tests/join/route");
    const res = await POST(post({ code: "practice-0a1b2c3d4e5f" }));
    expect(res.status).toBe(401);
    expect(await res.json()).toMatchObject({ ok: false, signIn: true });
  });
});
