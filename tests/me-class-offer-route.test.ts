/**
 * POST /api/me/class-offer (migration 0282): the /me class card's taps.
 * Signed in only, rate-limited per account before the body is read.
 *   seen -> a row, once (the readout's denominator)
 *   more -> stamps more_at; the card stays
 *   no   -> the answer; the card goes
 *   yes  -> ONE database call that saves the lead (courses merged with any
 *           earlier lead on that mobile) and the answer together
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
const dbError = { current: null as null | { message: string } };
const upsert = vi.fn(async () => ({ error: dbError.current }));
const from = vi.fn(() => ({ upsert }));
const rpc = vi.fn(async () => ({ error: dbError.current }));
vi.mock("@/lib/supabase/admin", () => ({ createSupabaseAdminClient: vi.fn(() => ({ from, rpc })) }));

const { POST } = await import("@/app/api/me/class-offer/route");

const post = (body: unknown, raw = false) =>
  new NextRequest("http://localhost/api/me/class-offer", {
    method: "POST",
    body: raw ? (body as string) : JSON.stringify(body),
    headers: { "content-type": "application/json", cookie: "qb_exam=cbse-10" },
  });

const yes = { offer: "spi", action: "yes", city: "pune", mobile: "9876543210", consent: true };

beforeEach(() => {
  vi.clearAllMocks();
  user.current = { id: "u1", email: "a@example.com", name: "Asha Patil" };
  rate.current = { ok: true };
  dbError.current = null;
});

describe("POST /api/me/class-offer", () => {
  it("refuses a signed-out caller and writes nothing", async () => {
    user.current = null;
    const res = await POST(post({ offer: "nda", action: "no" }));
    expect(res.status).toBe(401);
    expect(from).not.toHaveBeenCalled();
    expect(rpc).not.toHaveBeenCalled();
  });

  it("records the first sighting without overwriting an earlier one", async () => {
    const res = await POST(post({ offer: "nda", action: "seen" }));
    expect(res.status).toBe(200);
    expect(from).toHaveBeenCalledWith("class_offer_answers");
    const [row, opts] = upsert.mock.calls[0] as unknown as [Record<string, unknown>, Record<string, unknown>];
    expect(row).toEqual({ user_id: "u1", offer: "nda" });
    expect(opts).toEqual({ onConflict: "user_id,offer", ignoreDuplicates: true });
  });

  it("stamps Know more and leaves the answer alone", async () => {
    await POST(post({ offer: "nda", action: "more" }));
    const [row, opts] = upsert.mock.calls[0] as unknown as [Record<string, unknown>, Record<string, unknown>];
    expect(row).toMatchObject({ user_id: "u1", offer: "nda" });
    expect(typeof row.more_at).toBe("string");
    expect(row).not.toHaveProperty("answer");
    expect(opts).toEqual({ onConflict: "user_id,offer" });
  });

  it("saves a No with its time", async () => {
    await POST(post({ offer: "spi", action: "no" }));
    const [row] = upsert.mock.calls[0] as unknown as [Record<string, unknown>];
    expect(row).toMatchObject({ user_id: "u1", offer: "spi", answer: "no" });
    expect(typeof row.answered_at).toBe("string");
  });

  it("saves a Yes as one call: the lead and the answer together", async () => {
    const res = await POST(post(yes));
    expect(res.status).toBe(200);
    expect(upsert).not.toHaveBeenCalled();
    expect(rpc).toHaveBeenCalledWith("record_class_offer_yes", {
      p_user_id: "u1",
      p_offer: "spi",
      p_name: "Asha Patil",
      p_city: "Pune",
      p_is_pune: true,
      p_mobile: "919876543210",
      p_exam_slug: "cbse-10",
    });
  });

  it("refuses a bad Yes with the field to fix, and writes nothing", async () => {
    const res = await POST(post({ ...yes, mobile: "123" }));
    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({ field: "mobile" });
    expect(rpc).not.toHaveBeenCalled();
  });

  it("refuses a body that is not JSON", async () => {
    const res = await POST(post("{nope", true));
    expect(res.status).toBe(400);
  });

  it("rate-limits per account before reading the body", async () => {
    rate.current = { ok: false, retryAfter: 120 };
    const res = await POST(post(yes));
    expect(res.status).toBe(429);
    expect(res.headers.get("retry-after")).toBe("120");
    expect(String((checkAndIncrement.mock.calls[0] as unknown[])[1])).toBe("class-offer:u1");
    expect(rpc).not.toHaveBeenCalled();
  });

  it("answers 500 with a plain message when the write fails", async () => {
    dbError.current = { message: "boom" };
    vi.spyOn(console, "error").mockImplementation(() => {});
    const res = await POST(post(yes));
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: "Could not save. Please try again." });
  });
});
