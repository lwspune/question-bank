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
// The account's stored answer, as GET and PATCH read it.
const stored = { current: null as null | Record<string, unknown> };
const maybeSingle = vi.fn(async () => ({ data: stored.current, error: null }));
const selectEq = vi.fn(() => ({ maybeSingle }));
const select = vi.fn(() => ({ eq: selectEq }));
const updateEq = vi.fn(async () => ({ error: null }));
const update = vi.fn(() => ({ eq: updateEq }));
const from = vi.fn(() => ({ upsert, insert, select, update }));
vi.mock("@/lib/supabase/admin", () => ({ createSupabaseAdminClient: vi.fn(() => ({ from })) }));
vi.mock("@/lib/supabase/server", () => ({ createSupabaseServerClient: vi.fn(() => ({})) }));
const profile = { current: null as null | { mobile: string | null; city: string | null } };
const getOwnProfile = vi.fn(async () => profile.current);
vi.mock("@/lib/profile/service", () => ({ getOwnProfile }));

const { GET, POST, PATCH } = await import("@/app/api/tutor-interest/route");
const { priceForUser } = await import("@/lib/tutor/price");

const post = (body: unknown) =>
  new NextRequest("http://localhost/api/tutor-interest", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json", cookie: "qb_exam=nda" },
  });

beforeEach(() => {
  vi.clearAllMocks();
  user.current = null;
  profile.current = null;
  stored.current = null;
});

const patch = (body: unknown) =>
  new NextRequest("http://localhost/api/tutor-interest", {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
  });

/**
 * GET: what the cached /tutor page asks from the browser (2026-11-06), so the
 * page itself reads no session. Per-user, so never cacheable.
 */
describe("GET /api/tutor-interest", () => {
  it("answers signed-out without touching the profile", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ signedIn: false, hasMobile: false, hasCity: false });
    expect(getOwnProfile).not.toHaveBeenCalled();
    expect(res.headers.get("cache-control")).toContain("no-store");
  });

  it("says which follow-up questions a signed-in account still needs", async () => {
    user.current = { id: "u1", email: "a@example.com" };
    profile.current = { mobile: "9876543210", city: null };
    const res = await GET();
    expect(await res.json()).toEqual({
      signedIn: true,
      hasMobile: true,
      hasCity: false,
      price: priceForUser("u1"),
      pending: null,
    });
    expect(res.headers.get("cache-control")).toContain("no-store");
  });

  it("treats a missing profile as nothing on file", async () => {
    user.current = { id: "u1", email: "a@example.com" };
    const res = await GET();
    expect(await res.json()).toEqual({
      signedIn: true,
      hasMobile: false,
      hasCity: false,
      price: priceForUser("u1"),
      pending: null,
    });
  });

  it("names the price question a returning Yes has not answered yet", async () => {
    user.current = { id: "u1", email: "a@example.com" };
    stored.current = { role: "student", wants: true, price_answer: null, teacher_rate: null };
    const res = await GET();
    expect(await res.json()).toMatchObject({ signedIn: true, pending: "price", price: priceForUser("u1") });
    expect(selectEq).toHaveBeenCalledWith("user_id", "u1");
  });
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

  it("fixes the account's price on a student Yes and clears any earlier price answer", async () => {
    user.current = { id: "u1", email: "a@example.com" };
    const res = await POST(post({ role: "student", wants: true, mode: "online" }));
    expect(await res.json()).toEqual({ ok: true, price: priceForUser("u1") });
    expect(upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        price_shown: priceForUser("u1"),
        price_answer: null,
        price_would_pay: null,
        teacher_rate: null,
        price_answered_at: null,
        price_snoozed_until: null,
        price_answered_from: null,
      }),
      { onConflict: "user_id" }
    );
  });

  it("shows no price after a No or to a teacher", async () => {
    user.current = { id: "u1", email: "a@example.com" };
    await POST(post({ role: "student", wants: false, mode: null }));
    await POST(post({ role: "teacher", wants: true, mode: "online" }));
    for (const call of upsert.mock.calls as unknown as [Record<string, unknown>][]) {
      expect(call[0]).toMatchObject({ price_shown: null, teacher_rate: null });
    }
  });

  it("refuses a malformed answer before writing", async () => {
    user.current = { id: "u1", email: "a@example.com" };
    const res = await POST(post({ role: "student", wants: true }));
    expect(res.status).toBe(400);
    expect(upsert).not.toHaveBeenCalled();
  });
});

describe("PATCH /api/tutor-interest (the price question)", () => {
  it("refuses a signed-out answer", async () => {
    const res = await PATCH(patch({ answer: "yes" }));
    expect(res.status).toBe(401);
    expect(update).not.toHaveBeenCalled();
  });

  it("refuses a price answer from an account that has not said Yes", async () => {
    user.current = { id: "u1", email: "a@example.com" };
    stored.current = { role: "student", wants: false, price_answer: null, teacher_rate: null };
    const res = await PATCH(patch({ answer: "yes" }));
    expect(res.status).toBe(409);
    expect(update).not.toHaveBeenCalled();
  });

  it("saves a student's answer against the account's own price, never one from the body", async () => {
    user.current = { id: "u1", email: "a@example.com" };
    stored.current = { role: "student", wants: true, price_answer: null, teacher_rate: null };
    const res = await PATCH(patch({ answer: "no", price: 1 }));
    expect(res.status).toBe(200);
    expect(update).toHaveBeenCalledWith(
      expect.objectContaining({ price_shown: priceForUser("u1"), price_answer: "no", price_would_pay: null })
    );
    expect(updateEq).toHaveBeenCalledWith("user_id", "u1");
    // No `from`: answered on /tutor.
    expect(update).toHaveBeenCalledWith(expect.objectContaining({ price_answered_from: "tutor" }));
  });

  it("records an answer given on the /me card as from 'me'", async () => {
    user.current = { id: "u1", email: "a@example.com" };
    stored.current = { role: "student", wants: true, price_answer: null, teacher_rate: null };
    const res = await PATCH(patch({ answer: "yes", from: "me" }));
    expect(res.status).toBe(200);
    expect(update).toHaveBeenCalledWith(expect.objectContaining({ price_answer: "yes", price_answered_from: "me" }));
  });

  it("puts the /me card away for a week on Not now, saving no answer", async () => {
    user.current = { id: "u1", email: "a@example.com" };
    stored.current = { role: "student", wants: true, price_answer: null, teacher_rate: null };
    const before = Date.now();
    const res = await PATCH(patch({ snooze: true }));
    expect(res.status).toBe(200);
    const changes = (update.mock.calls as unknown as [Record<string, unknown>][])[0][0];
    expect(Object.keys(changes).sort()).toEqual(["price_snoozed_until", "updated_at"]);
    const until = new Date(changes.price_snoozed_until as string).getTime();
    expect(until - before).toBeGreaterThanOrEqual(7 * 86_400_000 - 1000);
    expect(until - before).toBeLessThanOrEqual(7 * 86_400_000 + 5000);
  });

  it("refuses a Not now from a teacher (there is no card for them)", async () => {
    user.current = { id: "u1", email: "a@example.com" };
    stored.current = { role: "teacher", wants: true, price_answer: null, teacher_rate: null };
    const res = await PATCH(patch({ snooze: true }));
    expect(res.status).toBe(400);
    expect(update).not.toHaveBeenCalled();
  });

  it("refuses an amount that was not offered at the account's price", async () => {
    user.current = { id: "u1", email: "a@example.com" };
    stored.current = { role: "student", wants: true, price_answer: null, teacher_rate: null };
    const res = await PATCH(patch({ answer: "cheaper", wouldPay: 450 }));
    expect(res.status).toBe(400);
    expect(update).not.toHaveBeenCalled();
  });

  it("saves a teacher's rate", async () => {
    user.current = { id: "u1", email: "a@example.com" };
    stored.current = { role: "teacher", wants: true, price_answer: null, teacher_rate: null };
    const res = await PATCH(patch({ rate: "750-1000" }));
    expect(res.status).toBe(200);
    expect(update).toHaveBeenCalledWith(expect.objectContaining({ teacher_rate: "750-1000" }));
  });
});
