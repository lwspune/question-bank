/**
 * /api/class-interest (owner, 2026-11-16; migration 0265). Anyone may leave a
 * number for offline classes, signed in or not (owner's choice: a parent may
 * have no account), so the IP rate limit runs before the body is read and the
 * write is keyed on the MOBILE: the same number twice updates one lead. A
 * signed-out answer never clears the account a lead was already tied to.
 * GET prefills the cached /classes form for a signed-in visitor.
 * Session and database are mocked; the decisions are real.
 */
import { vi, describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("server-only", () => ({}));
const user = { current: null as null | { id: string; email: string; name?: string | null } };
vi.mock("@/lib/auth", () => ({ getSessionUser: vi.fn(async () => user.current) }));
const rate = { current: { ok: true } as { ok: boolean; retryAfter?: number } };
const checkAndIncrement = vi.fn(async () => rate.current);
vi.mock("@/lib/rate-limit", () => ({ checkAndIncrement }));
const upsertError = { current: null as null | { message: string } };
const upsert = vi.fn(async () => ({ error: upsertError.current }));
const from = vi.fn(() => ({ upsert }));
vi.mock("@/lib/supabase/admin", () => ({ createSupabaseAdminClient: vi.fn(() => ({ from })) }));
vi.mock("@/lib/supabase/server", () => ({ createSupabaseServerClient: vi.fn(() => ({})) }));
const profile = { current: null as null | { mobile: string | null; city: string | null } };
const getOwnProfile = vi.fn(async () => profile.current);
vi.mock("@/lib/profile/service", () => ({ getOwnProfile }));

const { GET, POST } = await import("@/app/api/class-interest/route");

const post = (body: unknown, raw = false) =>
  new NextRequest("http://localhost/api/class-interest", {
    method: "POST",
    body: raw ? (body as string) : JSON.stringify(body),
    headers: { "content-type": "application/json", cookie: "qb_exam=nda" },
  });

const good = { courses: ["nda", "board-12"], city: "pune", mobile: "9876543210", consent: true, name: "Asha", from: "notes" };

beforeEach(() => {
  vi.clearAllMocks();
  user.current = null;
  profile.current = null;
  rate.current = { ok: true };
  upsertError.current = null;
});

describe("POST /api/class-interest", () => {
  it("saves a signed-out lead keyed on the mobile, without an account column", async () => {
    const res = await POST(post(good));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(from).toHaveBeenCalledWith("class_interest");
    const [row, opts] = upsert.mock.calls[0] as unknown as [Record<string, unknown>, unknown];
    expect(opts).toEqual({ onConflict: "mobile" });
    expect(row).toMatchObject({
      courses: ["nda", "board-12"],
      city: "Pune",
      is_pune: true,
      mobile: "919876543210",
      consent: true,
      name: "Asha",
      from_section: "notes",
      exam_slug: "nda",
    });
    // A signed-out answer must not unlink a lead an account already owns,
    // and a resubmission must keep the team's "called" tick and first date.
    expect(row).not.toHaveProperty("user_id");
    expect(row).not.toHaveProperty("called_at");
    expect(row).not.toHaveProperty("created_at");
  });

  it("ties a signed-in lead to the account and falls back to the account name", async () => {
    user.current = { id: "u1", email: "a@example.com", name: "Asha Patil" };
    await POST(post({ ...good, name: "" }));
    const [row] = upsert.mock.calls[0] as unknown as [Record<string, unknown>];
    expect(row).toMatchObject({ user_id: "u1", name: "Asha Patil" });
  });

  it("refuses a bad answer with the field to fix, and writes nothing", async () => {
    const res = await POST(post({ ...good, mobile: "123" }));
    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({ field: "mobile" });
    expect(upsert).not.toHaveBeenCalled();
  });

  it("refuses a body that is not JSON", async () => {
    const res = await POST(post("{not json", true));
    expect(res.status).toBe(400);
    expect(upsert).not.toHaveBeenCalled();
  });

  it("rate-limits per IP before reading the body", async () => {
    rate.current = { ok: false, retryAfter: 600 };
    const res = await POST(post(good));
    expect(res.status).toBe(429);
    expect(res.headers.get("retry-after")).toBe("600");
    expect(upsert).not.toHaveBeenCalled();
  });

  it("answers 500 with a plain message when the write fails", async () => {
    upsertError.current = { message: "boom" };
    vi.spyOn(console, "error").mockImplementation(() => {});
    const res = await POST(post(good));
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: "Could not save. Please try again." });
  });
});

describe("GET /api/class-interest", () => {
  it("says signed out, and is never cached", async () => {
    const res = await GET();
    expect(await res.json()).toEqual({ signedIn: false });
    expect(res.headers.get("cache-control")).toContain("no-store");
    expect(getOwnProfile).not.toHaveBeenCalled();
  });

  it("prefills name, the 10-digit mobile and the city for a signed-in account", async () => {
    user.current = { id: "u1", email: "a@example.com", name: "Asha" };
    profile.current = { mobile: "919876543210", city: "Pune" };
    const res = await GET();
    expect(await res.json()).toEqual({ signedIn: true, name: "Asha", mobile: "9876543210", city: "Pune" });
  });
});
