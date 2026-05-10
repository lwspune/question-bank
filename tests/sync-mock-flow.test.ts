/**
 * Integration test for the /api/sync/mock route handler.
 * Hits the live database via service-role; calls POST() directly (not over HTTP).
 *
 * Skipped if env is missing.
 *
 * Coverage:
 *   - Auth: missing secret → 401
 *   - Auth: wrong secret → 401
 *   - Validation: bad payload → 400 with field errors
 *   - Validation: subject not in canonical taxonomy → row error
 *   - Happy path: 2-question payload → inserted=2, all PUBLIC, taxonomy auto-created
 *   - Idempotency: re-POST → inserted=0, merged=2
 *   - Cross-mock dedup: same content_hash from a different mock → merged,
 *     attempt_stats summed, source_mock_id updated
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { NextRequest } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);
const TEST_SECRET = `test-sync-secret-${RUN_ID}`;
const TAG = `__sync_test_${RUN_ID}__`;

function makePayload(opts: {
  mockId: string;
  questionTexts: string[];
  attemptStatsPerQuestion?: { count: number; correctPct: number };
  chapterName?: string;
  subtopicName?: string | null;
}) {
  return {
    source: {
      app: "MHT_CET_AI",
      mockId: opts.mockId,
      mockTitle: `Sync Test Mock ${RUN_ID}`,
      publishedAt: "2026-05-09T00:00:00Z",
    },
    exam: { name: "MHT-CET" },
    questions: opts.questionTexts.map((text, i) => ({
      sourceQuestionId: `${opts.mockId}-q${i}`,
      text: `${TAG} ${text}`,
      difficulty: "EASY" as const,
      pyqYear: 2024,
      marks: 4,
      negMarks: 1,
      subject: { name: "Maths" },
      chapter: { name: opts.chapterName ?? `${TAG}-chapter` },
      subtopic:
        opts.subtopicName === null
          ? undefined
          : { name: opts.subtopicName ?? `${TAG}-subtopic` },
      options: [
        { label: "A", text: "alpha", isCorrect: true },
        { label: "B", text: "beta", isCorrect: false },
        { label: "C", text: "gamma", isCorrect: false },
        { label: "D", text: "delta", isCorrect: false },
      ],
      attemptStats: opts.attemptStatsPerQuestion,
    })),
  };
}

function makeRequest(
  payload: unknown,
  opts: { secret?: string | null; rawBody?: string } = {}
): NextRequest {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (opts.secret !== null) {
    headers.Authorization = `Bearer ${opts.secret ?? TEST_SECRET}`;
  }
  return new NextRequest("http://localhost:3000/api/sync/mock", {
    method: "POST",
    headers,
    body: opts.rawBody ?? JSON.stringify(payload),
  });
}

describe.skipIf(!HAS_ENV)("/api/sync/mock route", () => {
  let admin: SupabaseClient;
  let originalSecret: string | undefined;

  beforeAll(() => {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
    originalSecret = process.env.SYNC_SHARED_SECRET;
    process.env.SYNC_SHARED_SECRET = TEST_SECRET;
  });

  afterAll(async () => {
    if (originalSecret !== undefined) {
      process.env.SYNC_SHARED_SECRET = originalSecret;
    } else {
      delete process.env.SYNC_SHARED_SECRET;
    }
    await admin.from("questions").delete().like("text", `${TAG}%`);
    await admin.from("chapters").delete().like("name", `${TAG}%`);
    await admin.from("subtopics").delete().like("name", `${TAG}%`);
  });

  it("rejects with 401 when Authorization header is missing", async () => {
    const { POST } = await import("@/app/api/sync/mock/route");
    const payload = makePayload({
      mockId: `${RUN_ID}-auth-missing`,
      questionTexts: ["q1"],
    });
    const res = await POST(makeRequest(payload, { secret: null }));
    expect(res.status).toBe(401);
  });

  it("rejects with 401 when secret is wrong", async () => {
    const { POST } = await import("@/app/api/sync/mock/route");
    const payload = makePayload({
      mockId: `${RUN_ID}-auth-wrong`,
      questionTexts: ["q1"],
    });
    const res = await POST(makeRequest(payload, { secret: "wrong-secret" }));
    expect(res.status).toBe(401);
  });

  it("rejects with 400 when body is not valid JSON", async () => {
    const { POST } = await import("@/app/api/sync/mock/route");
    const res = await POST(makeRequest(null, { rawBody: "{not json" }));
    expect(res.status).toBe(400);
  });

  it("rejects with 400 when payload structure is invalid", async () => {
    const { POST } = await import("@/app/api/sync/mock/route");
    const res = await POST(
      makeRequest({ source: {}, exam: { name: "x" }, questions: [] })
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBeDefined();
  });

  it("happy path: inserts 2 PUBLIC questions, auto-creates taxonomy", async () => {
    const { POST } = await import("@/app/api/sync/mock/route");
    const mockId = `${RUN_ID}-happy`;
    const payload = makePayload({
      mockId,
      questionTexts: ["happy1", "happy2"],
      attemptStatsPerQuestion: { count: 100, correctPct: 60 },
    });
    const res = await POST(makeRequest(payload));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.inserted).toBe(2);
    expect(body.merged).toBe(0);

    const { data: rows } = await admin
      .from("questions")
      .select(
        "text, visibility, pyq_year, marks, neg_marks, attempt_stats, source_mock_id, source_app"
      )
      .like("text", `${TAG} happy%`);
    expect(rows?.length).toBe(2);
    for (const r of rows ?? []) {
      expect(r.visibility).toBe("PUBLIC");
      expect(r.pyq_year).toBe(2024);
      expect(Number(r.marks)).toBe(4);
      expect(Number(r.neg_marks)).toBe(1);
      expect(r.source_mock_id).toBe(mockId);
      expect(r.source_app).toBe("MHT_CET_AI");
      const stats = r.attempt_stats as { count: number; correctPct: number };
      expect(stats.count).toBe(100);
      expect(stats.correctPct).toBe(60);
    }
  });

  it("idempotency: re-POSTing the same payload merges (inserted=0, merged=N)", async () => {
    const { POST } = await import("@/app/api/sync/mock/route");
    const mockId = `${RUN_ID}-idem`;
    const payload = makePayload({
      mockId,
      questionTexts: ["idem1", "idem2"],
      attemptStatsPerQuestion: { count: 50, correctPct: 80 },
    });

    const first = await POST(makeRequest(payload));
    const firstBody = await first.json();
    expect(firstBody.inserted).toBe(2);

    const second = await POST(makeRequest(payload));
    const secondBody = await second.json();
    expect(secondBody.inserted).toBe(0);
    expect(secondBody.merged).toBe(2);
  });

  it("cross-mock dedup: same question content from a different mock merges + sums stats", async () => {
    const { POST } = await import("@/app/api/sync/mock/route");
    const mockA = `${RUN_ID}-mockA`;
    const mockB = `${RUN_ID}-mockB`;

    const payloadA = makePayload({
      mockId: mockA,
      questionTexts: ["cross1"],
      attemptStatsPerQuestion: { count: 100, correctPct: 60 },
    });
    const payloadB = makePayload({
      mockId: mockB,
      questionTexts: ["cross1"],
      attemptStatsPerQuestion: { count: 50, correctPct: 80 },
    });

    await POST(makeRequest(payloadA));
    const second = await POST(makeRequest(payloadB));
    const body = await second.json();
    expect(body.inserted).toBe(0);
    expect(body.merged).toBe(1);

    const { data: rows } = await admin
      .from("questions")
      .select("attempt_stats, source_mock_id")
      .like("text", `${TAG} cross1`);
    expect(rows?.length).toBe(1);
    const stats = rows![0].attempt_stats as {
      count: number;
      correctPct: number;
    };
    expect(stats.count).toBe(150);
    // 60 correct + 40 correct = 100 / 150 = 66.67%
    expect(stats.correctPct).toBeCloseTo(66.67, 1);
    // Most-recent-wins on source_mock_id
    expect(rows![0].source_mock_id).toBe(mockB);
  });

  it("returns a per-row error when subject doesn't exist in canonical taxonomy", async () => {
    const { POST } = await import("@/app/api/sync/mock/route");
    const payload = makePayload({
      mockId: `${RUN_ID}-badsubj`,
      questionTexts: ["badsubj1"],
    });
    // Mutate to a known-bad subject name
    payload.questions[0].subject = { name: "Mathematics-not-Maths" };

    const res = await POST(makeRequest(payload));
    expect(res.status).toBe(200); // partial success: per-row error doesn't 4xx
    const body = await res.json();
    expect(body.inserted).toBe(0);
    expect(body.skipped).toBe(1);
    expect(body.errors.length).toBe(1);
    expect(body.errors[0].sourceQuestionId).toContain("badsubj");
    expect(body.errors[0].message).toMatch(/subject/i);
  });
});
