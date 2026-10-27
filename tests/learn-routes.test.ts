/**
 * The Learn API routes. What is locked:
 *  - /api/learn/answer records a signed-in student's answer through their own client and only
 *    CHECKS a guest's (nothing stored); bad input never reaches the database; one reply shape.
 *  - /api/learn/progress is for a signed-in student only, and passes the chapters and concept on.
 * The session and the database are mocked; the decisions are real (the functions themselves are
 * pinned by learn-db.integration).
 */
import { vi, describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("server-only", () => ({}));
const user = { current: null as null | { id: string; email: string } };
vi.mock("@/lib/auth", () => ({ getSessionUser: vi.fn(async () => user.current) }));
const serverRpc = vi.fn();
const anonRpc = vi.fn();
vi.mock("@/lib/supabase/server", () => ({
  createSupabaseServerClient: vi.fn(() => ({ rpc: serverRpc })),
  createSupabaseAnonClient: vi.fn(() => ({ rpc: anonRpc })),
}));

const { POST: answer } = await import("@/app/api/learn/answer/route");
const { GET: progress } = await import("@/app/api/learn/progress/route");

const ITEM = "11111111-2222-4333-8444-555555555555";
const post = (body: unknown) =>
  new NextRequest("http://localhost/api/learn/answer", { method: "POST", body: JSON.stringify(body), headers: { "content-type": "application/json" } });
const graded = { correct: false, correct_key: "B", misconception_code: "C01-M1", remediation: "Look again.", solution: { steps: ["One.", "Two."] } };

beforeEach(() => {
  vi.clearAllMocks();
  user.current = null;
});

describe("POST /api/learn/answer", () => {
  it("refuses a malformed answer before touching the database", async () => {
    for (const body of [{ itemId: "x", key: "A" }, { itemId: ITEM, key: "E" }, {}]) {
      const res = await answer(post(body));
      expect(res.status).toBe(400);
      expect(await res.json()).toEqual({ ok: false, error: "Invalid answer." });
    }
    expect(serverRpc).not.toHaveBeenCalled();
    expect(anonRpc).not.toHaveBeenCalled();
  });

  it("checks a guest's answer and says it was not saved", async () => {
    anonRpc.mockResolvedValueOnce({ data: graded, error: null });
    const res = await answer(post({ itemId: ITEM, key: "A" }));
    expect(anonRpc).toHaveBeenCalledWith("learn_check_answer", { p_item: ITEM, p_key: "A" });
    expect(serverRpc).not.toHaveBeenCalled();
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.data).toMatchObject({ correct: false, correctKey: "B", saved: false, progress: null });
    expect(res.headers.get("cache-control")).toContain("no-store");
  });

  it("records a signed-in student's answer through their own client", async () => {
    user.current = { id: "u1", email: "a@example.com" };
    serverRpc.mockResolvedValueOnce({ data: { ...graded, correct: true, remediation: null, streak: 1, to_retry: 0, needed: 3, state: "learning" }, error: null });
    const body = await (await answer(post({ itemId: ITEM, key: "B" }))).json();
    expect(serverRpc).toHaveBeenCalledWith("learn_record_attempt", { p_item: ITEM, p_key: "B" });
    expect(anonRpc).not.toHaveBeenCalled();
    expect(body.data).toMatchObject({ correct: true, saved: true, progress: { streak: 1, needed: 3, mastered: false } });
  });

  it("answers 500 with the reply shape when the database refuses", async () => {
    user.current = { id: "u1", email: "a@example.com" };
    serverRpc.mockResolvedValueOnce({ data: null, error: { message: "no published item" } });
    const res = await answer(post({ itemId: ITEM, key: "A" }));
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ ok: false, error: "Couldn't save your answer. Please try again." });
  });
});

describe("GET /api/learn/progress", () => {
  const get = (q: string) => progress(new NextRequest(`http://localhost/api/learn/progress${q}`));

  it("is 401 for a guest", async () => {
    const res = await get("?chapters=matrices");
    expect(res.status).toBe(401);
    expect(serverRpc).not.toHaveBeenCalled();
  });

  it("refuses chapter or concept names that are not slugs", async () => {
    user.current = { id: "u1", email: "a@example.com" };
    expect((await get("?chapters=Matrices;drop")).status).toBe(400);
    expect((await get("?concept=matrices")).status).toBe(400);
    expect(serverRpc).not.toHaveBeenCalled();
  });

  it("reads the student's progress and one concept's answers", async () => {
    user.current = { id: "u1", email: "a@example.com" };
    serverRpc.mockImplementation(async (fn: string) => ({ data: fn === "learn_my_progress" ? [{ code: "C01" }] : [{ item_id: ITEM, correct: true }], error: null }));
    const body = await (await get("?chapters=matrices,vectors&concept=matrices/inverse")).json();
    expect(serverRpc).toHaveBeenCalledWith("learn_my_progress", { p_chapters: ["matrices", "vectors"] });
    expect(serverRpc).toHaveBeenCalledWith("learn_my_attempts", { p_chapter: "matrices", p_concept: "inverse" });
    expect(body).toEqual({ ok: true, data: { userId: "u1", progress: [{ code: "C01" }], attempts: [{ item_id: ITEM, correct: true }] } });
  });
});
