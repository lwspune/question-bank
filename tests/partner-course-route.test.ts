/**
 * GET /api/partner-course/[id] (owner, 2026-11-17; migration 0269): a tap on a
 * partner course card on /store comes through here, is counted, and goes on to
 * the partner's page with our UTM tags. Counting server-side counts signed-out
 * visitors too (most of the traffic) and no ad blocker can hide it.
 *
 * Since 2026-11-27 (owner) a signed-out tap is counted, then sent to sign up
 * and back through the same link, so every student who reaches the partner has
 * an account. A signed-in tap must ALWAYS reach the partner: a failed write
 * only loses the count, and a failed session read sends the student on. Bots are sent on without a row. Unique students are counted
 * by account when signed in, else by a random first-party visitor id (qb_vid).
 * Session and database are mocked; the decisions are real.
 */
import { vi, describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { PARTNER_COURSES, outboundUrl, signInHref } from "@/lib/partnerCourses/courses";

vi.mock("server-only", () => ({}));
const user = { current: null as null | { id: string; email: string } };
const getSessionUser = vi.fn(async () => user.current);
vi.mock("@/lib/auth", () => ({ getSessionUser }));
const insertError = { current: null as null | { message: string } };
const insert = vi.fn(async () => ({ error: insertError.current }));
const from = vi.fn(() => ({ insert }));
vi.mock("@/lib/supabase/admin", () => ({ createSupabaseAdminClient: vi.fn(() => ({ from })) }));

const { GET } = await import("@/app/api/partner-course/[id]/route");

const COURSE = PARTNER_COURSES[0];
const PHONE_UA = "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/130.0 Mobile Safari/537.36";
const VID = "3f2b8c1e-9a4d-4e6f-8b7a-1c2d3e4f5a6b";

const tap = (id: string, headers: Record<string, string> = {}) =>
  GET(new NextRequest(`http://localhost/api/partner-course/${id}`, { headers: { "user-agent": PHONE_UA, ...headers } }), {
    params: Promise.resolve({ id }),
  });

beforeEach(() => {
  vi.clearAllMocks();
  user.current = null;
  insertError.current = null;
  getSessionUser.mockImplementation(async () => user.current);
});

describe("GET /api/partner-course/[id]", () => {
  it("counts a signed-out tap with a new visitor id and sends it to sign up first", async () => {
    const res = await tap(COURSE.id);
    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe(new URL(signInHref(COURSE), "http://localhost").toString());
    expect(res.headers.get("cache-control")).toContain("no-store");

    expect(from).toHaveBeenCalledWith("partner_course_clicks");
    const [row] = insert.mock.calls[0] as unknown as [Record<string, unknown>];
    expect(row).toMatchObject({ course_id: COURSE.id, exam_slug: COURSE.examSlug });
    expect(row).not.toHaveProperty("user_id");
    expect(String(row.visitor_id)).toMatch(/^[0-9a-f-]{36}$/);

    const cookie = res.headers.get("set-cookie") ?? "";
    expect(cookie).toContain(`qb_vid=${row.visitor_id}`);
    expect(cookie.toLowerCase()).toContain("httponly");
    expect(cookie.toLowerCase()).toContain("samesite=lax");
  });

  it("reuses the visitor id a browser already carries, so one student counts once", async () => {
    await tap(COURSE.id, { cookie: `qb_vid=${VID}` });
    const [row] = insert.mock.calls[0] as unknown as [Record<string, unknown>];
    expect(row.visitor_id).toBe(VID);
  });

  it("replaces a malformed visitor id rather than storing it", async () => {
    await tap(COURSE.id, { cookie: "qb_vid=not-a-uuid'); drop table x;--" });
    const [row] = insert.mock.calls[0] as unknown as [Record<string, unknown>];
    expect(row.visitor_id).not.toBe("not-a-uuid'); drop table x;--");
    expect(String(row.visitor_id)).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  it("records the account of a signed-in student and sends them on to the partner", async () => {
    user.current = { id: "11111111-2222-4333-8444-555555555555", email: "s@example.com" };
    const res = await tap(COURSE.id, { cookie: `qb_vid=${VID}` });
    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe(outboundUrl(COURSE));
    const [row] = insert.mock.calls[0] as unknown as [Record<string, unknown>];
    expect(row.user_id).toBe(user.current.id);
    expect(row.visitor_id).toBe(VID);
  });

  it("sends a bot on without counting it", async () => {
    const res = await tap(COURSE.id, { "user-agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" });
    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe(outboundUrl(COURSE));
    expect(insert).not.toHaveBeenCalled();
  });

  it("still sends a signed-in student on when the write fails", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    user.current = { id: "11111111-2222-4333-8444-555555555555", email: "s@example.com" };
    insertError.current = { message: "boom" };
    const res = await tap(COURSE.id);
    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe(outboundUrl(COURSE));
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it("still sends the student on when the session read throws", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    getSessionUser.mockImplementation(async () => {
      throw new Error("auth down");
    });
    const res = await tap(COURSE.id);
    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe(outboundUrl(COURSE));
    spy.mockRestore();
  });

  it("still sends a signed-out student to sign up when the write fails", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    insertError.current = { message: "boom" };
    const res = await tap(COURSE.id);
    expect(new URL(res.headers.get("location")!).pathname).toBe("/signup");
    spy.mockRestore();
  });

  it("does not count the app's own background fetch of the link (it re-runs as a full page load)", async () => {
    user.current = { id: "11111111-2222-4333-8444-555555555555", email: "s@example.com" };
    const res = await tap(COURSE.id, { rsc: "1" });
    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe(outboundUrl(COURSE));
    expect(insert).not.toHaveBeenCalled();
  });

  it("sends an unknown course back to the store, uncounted", async () => {
    const res = await tap("no-such-course");
    expect(res.status).toBe(302);
    expect(new URL(res.headers.get("location")!).pathname).toBe("/store");
    expect(insert).not.toHaveBeenCalled();
  });
});
