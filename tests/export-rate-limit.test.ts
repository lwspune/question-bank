/**
 * Integration test for the rate-limit gate on /api/export.
 * Uses an examId that doesn't exist so queryQuestions returns 0 and the
 * route bails fast with 400 — but the rate-limit check still fires before
 * that and increments the counter. Means each test request is cheap
 * (no real ZIP generation).
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { NextRequest } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);

function makeReq(ip: string, body: unknown): NextRequest {
  return new NextRequest("http://localhost:3000/api/export", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

const BAD_FILTER_PAYLOAD = {
  filters: {
    examId: "00000000-0000-0000-0000-000000000000",
    subjectId: null,
    chapterIds: [],
    subtopicIds: [],
    difficulties: [],
    q: "",
    page: 1,
  },
  options: { title: "rate-test", includeSolutions: false },
};

describe.skipIf(!HAS_ENV)("/api/export rate limit", () => {
  let admin: SupabaseClient;

  beforeAll(() => {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
  });

  afterAll(async () => {
    // Clean test buckets so prod data isn't carrying our test counts.
    await admin.from("rate_limits").delete().like("bucket", `%${RUN_ID}%`);
  });

  it("anon: allows first 10 requests, blocks the 11th with 429 + Retry-After", async () => {
    const { POST } = await import("@/app/api/export/route");
    const ip = `test-${RUN_ID}-single`;

    for (let i = 1; i <= 10; i++) {
      const res = await POST(makeReq(ip, BAD_FILTER_PAYLOAD));
      // 200/400 in production. 500 is acceptable in tests only because
      // createSupabaseServerClient() reads next/headers cookies(), which
      // throws outside Next's request scope. The rate-limit check fires
      // BEFORE that, so the bucket still increments — that's what we're
      // verifying via the 11th call below.
      expect([200, 400, 500]).toContain(res.status);
    }

    const blocked = await POST(makeReq(ip, BAD_FILTER_PAYLOAD));
    expect(blocked.status).toBe(429);
    const retryAfter = blocked.headers.get("Retry-After");
    expect(retryAfter).toBeTruthy();
    expect(Number(retryAfter)).toBeGreaterThan(0);

    const body = await blocked.json();
    expect(body.error).toBeDefined();
    expect(body.retryAfter).toBeDefined();
    expect(body.limit).toBe(10);
  });

  it("anon: separate IPs are limited independently", async () => {
    const { POST } = await import("@/app/api/export/route");
    const ipA = `test-${RUN_ID}-iso-A`;
    const ipB = `test-${RUN_ID}-iso-B`;

    // Burn through ipA's quota
    for (let i = 0; i < 11; i++) {
      await POST(makeReq(ipA, BAD_FILTER_PAYLOAD));
    }
    const blockedA = await POST(makeReq(ipA, BAD_FILTER_PAYLOAD));
    expect(blockedA.status).toBe(429);

    // ipB should still pass — anything but 429 (test-context cookie failure
    // can produce 500; that's fine, we just want to verify it's not blocked)
    const okB = await POST(makeReq(ipB, BAD_FILTER_PAYLOAD));
    expect(okB.status).not.toBe(429);
  });

  it("rate-limit fires before payload validation (so junk requests still count)", async () => {
    const { POST } = await import("@/app/api/export/route");
    const ip = `test-${RUN_ID}-junk`;

    // 10 invalid-payload requests still increment the bucket
    for (let i = 0; i < 10; i++) {
      const res = await POST(makeReq(ip, { totally: "wrong" }));
      // 400 for bad payload; rate limit incremented anyway
      expect(res.status).toBe(400);
    }
    const blocked = await POST(makeReq(ip, { totally: "wrong" }));
    expect(blocked.status).toBe(429);
  });
});
