/**
 * Integration test for dashboard recent-activity.
 * Uses the live DB and the LWS Pune org seed (2 upload jobs).
 * Skipped if env is not present.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getRecentUploads } from "@/lib/dashboard/activity";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("getRecentUploads (against LWS Pune seed)", () => {
  let client: SupabaseClient;
  let orgId: string;

  beforeAll(async () => {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
    const { data: org } = await client
      .from("organizations")
      .select("id")
      .eq("name", "LWS Pune")
      .single();
    orgId = org!.id;
  });

  it("returns at most 5 uploads, scoped to org, most-recent first", async () => {
    const uploads = await getRecentUploads(client, orgId);
    expect(uploads.length).toBeLessThanOrEqual(5);
    expect(uploads.length).toBeGreaterThan(0);
    for (let i = 1; i < uploads.length; i++) {
      expect(
        new Date(uploads[i - 1].createdAt).getTime()
      ).toBeGreaterThanOrEqual(new Date(uploads[i].createdAt).getTime());
    }
  });

  it("includes filename, inserted, skipped, status, and createdAt", async () => {
    const [first] = await getRecentUploads(client, orgId);
    expect(first.id).toEqual(expect.any(String));
    expect(first.filename).toEqual(expect.any(String));
    expect(first.inserted).toEqual(expect.any(Number));
    expect(first.skipped).toEqual(expect.any(Number));
    expect(first.status).toMatch(/^(PENDING|PROCESSING|COMPLETED|FAILED)$/);
    expect(first.createdAt).toEqual(expect.any(String));
  });

  it("returns [] for an org with no uploads", async () => {
    const { data: emptyOrg, error } = await client
      .from("organizations")
      .insert({ name: `__test_empty_org_${Date.now()}` })
      .select("id")
      .single();
    expect(error).toBeNull();
    try {
      const uploads = await getRecentUploads(client, emptyOrg!.id);
      expect(uploads).toEqual([]);
    } finally {
      await client.from("organizations").delete().eq("id", emptyOrg!.id);
    }
  });
});
