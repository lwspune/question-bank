/**
 * POST /api/study-circle (migration 0247): the Home card records that a
 * student SAW the question, then their Yes or No. Signed-in only; nothing is
 * written once the test has ended. The session, profile and database are
 * mocked; the decisions are real.
 */
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("server-only", () => ({}));
const user = { current: null as null | { id: string; email: string } };
vi.mock("@/lib/auth", () => ({ getSessionUser: vi.fn(async () => user.current) }));
const rateOk = { current: true };
const checkAndIncrement = vi.fn(async () => (rateOk.current ? { ok: true } : { ok: false, retryAfter: 60 }));
vi.mock("@/lib/rate-limit", () => ({ checkAndIncrement }));
const upsert = vi.fn(async () => ({ error: null as null | { message: string } }));
const from = vi.fn(() => ({ upsert }));
vi.mock("@/lib/supabase/admin", () => ({ createSupabaseAdminClient: vi.fn(() => ({ from })) }));
vi.mock("@/lib/supabase/server", () => ({ createSupabaseServerClient: vi.fn(() => ({})) }));
const getOnboardingState = vi.fn(async () => ({
  targetExams: ["cbse-10", "not-an-exam"],
  stage: "class-9-10",
  onboardedAt: null,
  pushPromptedAt: null,
}));
vi.mock("@/lib/profile/service", () => ({ getOnboardingState }));

const { POST } = await import("@/app/api/study-circle/route");
const { STUDY_CIRCLE_ENDS } = await import("@/lib/studyCircle/core");

const post = (body: unknown) =>
  new NextRequest("http://localhost/api/study-circle", {
    method: "POST",
    body: typeof body === "string" ? body : JSON.stringify(body),
    headers: { "content-type": "application/json" },
  });

beforeEach(() => {
  vi.clearAllMocks();
  user.current = { id: "u1", email: "a@example.com" };
  rateOk.current = true;
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(STUDY_CIRCLE_ENDS.getTime() - 86_400_000));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("POST /api/study-circle", () => {
  it("refuses a signed-out visitor before the rate limit or any write", async () => {
    user.current = null;
    const res = await POST(post({ action: "shown" }));
    expect(res.status).toBe(401);
    expect(checkAndIncrement).not.toHaveBeenCalled();
    expect(upsert).not.toHaveBeenCalled();
  });

  it("refuses a bad body without writing", async () => {
    expect((await POST(post({ action: "answer", answer: "maybe" }))).status).toBe(400);
    expect((await POST(post("not json"))).status).toBe(400);
    expect(upsert).not.toHaveBeenCalled();
  });

  it("answers 429 when rate-limited, without writing", async () => {
    rateOk.current = false;
    expect((await POST(post({ action: "shown" }))).status).toBe(429);
    expect(upsert).not.toHaveBeenCalled();
  });

  it("records the first sight only, with the stage and known exams", async () => {
    const res = await POST(post({ action: "shown" }));
    expect(res.status).toBe(200);
    expect(from).toHaveBeenCalledWith("study_circle_interest");
    expect(upsert).toHaveBeenCalledWith(
      { user_id: "u1", stage: "class-9-10", exams: ["cbse-10"] },
      { onConflict: "user_id", ignoreDuplicates: true }
    );
  });

  it("records an answer over the seen row", async () => {
    const res = await POST(post({ action: "answer", answer: "yes" }));
    expect(res.status).toBe(200);
    expect(upsert).toHaveBeenCalledWith(
      {
        user_id: "u1",
        stage: "class-9-10",
        exams: ["cbse-10"],
        answer: "yes",
        answered_at: new Date(STUDY_CIRCLE_ENDS.getTime() - 86_400_000).toISOString(),
      },
      { onConflict: "user_id", ignoreDuplicates: false }
    );
  });

  it("writes nothing once the test has ended", async () => {
    vi.setSystemTime(STUDY_CIRCLE_ENDS);
    const res = await POST(post({ action: "answer", answer: "yes" }));
    expect(res.status).toBe(409);
    expect(upsert).not.toHaveBeenCalled();
  });

  it("answers 500 when the write fails", async () => {
    upsert.mockResolvedValueOnce({ error: { message: "boom" } });
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect((await POST(post({ action: "shown" }))).status).toBe(500);
  });
});
