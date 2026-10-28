/**
 * POST /api/tutor-interest. What is locked (owner, 2026-10-28): only a signed-in
 * account can answer, so every answer belongs to someone we can reach. A
 * signed-out answer is refused before the rate limit or any write; a signed-in
 * one upserts on user_id. The session and the database are mocked; the
 * decisions are real.
 */
import { vi, describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("server-only", () => ({}));
const user = { current: null as null | { id: string; email: string } };
vi.mock("@/lib/auth", () => ({ getSessionUser: vi.fn(async () => user.current) }));
const checkAndIncrement = vi.fn(async () => ({ ok: true }));
vi.mock("@/lib/rate-limit", () => ({ checkAndIncrement }));
const upsert = vi.fn(async () => ({ error: null }));
const insert = vi.fn(async () => ({ error: null }));
const from = vi.fn(() => ({ upsert, insert }));
vi.mock("@/lib/supabase/admin", () => ({ createSupabaseAdminClient: vi.fn(() => ({ from })) }));

const { POST } = await import("@/app/api/tutor-interest/route");

const post = (body: unknown) =>
  new NextRequest("http://localhost/api/tutor-interest", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json", cookie: "qb_exam=nda" },
  });

beforeEach(() => {
  vi.clearAllMocks();
  user.current = null;
});

describe("POST /api/tutor-interest", () => {
  it("refuses a signed-out answer and writes nothing", async () => {
    const res = await POST(post({ role: "student", wants: true, mode: "online" }));
    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: "Sign in to answer." });
    expect(checkAndIncrement).not.toHaveBeenCalled();
    expect(upsert).not.toHaveBeenCalled();
    expect(insert).not.toHaveBeenCalled();
  });

  it("saves a signed-in answer against the account", async () => {
    user.current = { id: "u1", email: "a@example.com" };
    const res = await POST(post({ role: "student", wants: true, mode: "online", from: "store" }));
    expect(res.status).toBe(200);
    expect(upsert).toHaveBeenCalledWith(
      expect.objectContaining({ user_id: "u1", role: "student", wants: true, mode: "online", from_section: "store", exam_slug: "nda" }),
      { onConflict: "user_id" }
    );
    expect(insert).not.toHaveBeenCalled();
  });

  it("refuses a malformed answer before writing", async () => {
    user.current = { id: "u1", email: "a@example.com" };
    const res = await POST(post({ role: "student", wants: true }));
    expect(res.status).toBe(400);
    expect(upsert).not.toHaveBeenCalled();
  });
});
