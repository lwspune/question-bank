/**
 * Integration test for the rate-limit library against the live DB.
 * Uses unique bucket names (per-run UUID prefix) so concurrent test runs
 * don't collide and prod data is never touched.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { checkAndIncrement } from "@/lib/rate-limit";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);
const HOUR_MS = 60 * 60 * 1000;

describe.skipIf(!HAS_ENV)("rate-limit checkAndIncrement", () => {
  let admin: SupabaseClient;

  beforeAll(() => {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
  });

  afterAll(async () => {
    await admin.from("rate_limits").delete().like("bucket", `test:${RUN_ID}%`);
  });

  it("allows the first N calls and blocks the (N+1)th within the same window", async () => {
    const bucket = `test:${RUN_ID}:limit`;
    const limit = 3;
    for (let i = 1; i <= limit; i++) {
      const r = await checkAndIncrement(admin, bucket, { limit, windowMs: HOUR_MS });
      expect(r.ok).toBe(true);
      if (r.ok) expect(r.used).toBe(i);
    }
    const blocked = await checkAndIncrement(admin, bucket, { limit, windowMs: HOUR_MS });
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) {
      expect(blocked.limit).toBe(limit);
      expect(blocked.used).toBeGreaterThan(limit);
      expect(blocked.retryAfter).toBeGreaterThan(0);
      expect(blocked.retryAfter).toBeLessThanOrEqual(HOUR_MS / 1000);
    }
  });

  it("returns retryAfter in seconds (not ms) and within the window length", async () => {
    const bucket = `test:${RUN_ID}:retry`;
    const limit = 1;
    await checkAndIncrement(admin, bucket, { limit, windowMs: HOUR_MS });
    const blocked = await checkAndIncrement(admin, bucket, { limit, windowMs: HOUR_MS });
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) {
      expect(blocked.retryAfter).toBeLessThanOrEqual(3600);
      expect(blocked.retryAfter).toBeGreaterThan(0);
    }
  });

  it("buckets are isolated — incrementing A doesn't affect B", async () => {
    const bucketA = `test:${RUN_ID}:isoA`;
    const bucketB = `test:${RUN_ID}:isoB`;
    const limit = 2;
    await checkAndIncrement(admin, bucketA, { limit, windowMs: HOUR_MS });
    await checkAndIncrement(admin, bucketA, { limit, windowMs: HOUR_MS });
    const blockedA = await checkAndIncrement(admin, bucketA, { limit, windowMs: HOUR_MS });
    expect(blockedA.ok).toBe(false);

    const okB = await checkAndIncrement(admin, bucketB, { limit, windowMs: HOUR_MS });
    expect(okB.ok).toBe(true);
  });

  it("opportunistically GCs windows older than 2h for the calling bucket", async () => {
    const bucket = `test:${RUN_ID}:gc`;
    // Plant an old window manually
    const ancientWindow = new Date(Date.now() - 3 * HOUR_MS).toISOString();
    await admin
      .from("rate_limits")
      .insert({ bucket, window_start: ancientWindow, count: 99 });

    // Sanity: the row exists pre-call
    const { data: before } = await admin
      .from("rate_limits")
      .select("window_start")
      .eq("bucket", bucket);
    expect(before?.length).toBe(1);

    await checkAndIncrement(admin, bucket, { limit: 5, windowMs: HOUR_MS });

    // The ancient row should be gone, only the fresh one remains
    const { data: after } = await admin
      .from("rate_limits")
      .select("window_start")
      .eq("bucket", bucket);
    expect(after?.length).toBe(1);
    expect(after![0].window_start).not.toBe(ancientWindow);
  });
});
