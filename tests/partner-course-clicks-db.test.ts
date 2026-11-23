/**
 * Integration test for partner_course_clicks (migration 0269): taps on the
 * partner course cards on /store.
 *
 * RLS on with NO policies: only the service role (GET /api/partner-course/[id]
 * and the readout) reads or writes it, so anon sees nothing. The CHECKs are the
 * data rules, mirrored by lib/partnerCourses/courses.ts: a URL-safe course id,
 * a visitor id on every row (that is what "unique students" counts).
 *
 * The service-role insert runs FIRST so the "anon reads zero rows" assertion
 * runs against a non-empty table. Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("partner_course_clicks table", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;
  const visitor = randomUUID();

  beforeAll(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    anonClient = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
  });

  afterAll(async () => {
    await admin.from("partner_course_clicks").delete().eq("visitor_id", visitor);
  });

  it("service role records a signed-out tap", async () => {
    const { error } = await admin
      .from("partner_course_clicks")
      .insert({ course_id: "cds-sikandar-3", exam_slug: "cds", visitor_id: visitor });
    expect(error).toBeNull();
  });

  it("anon can neither read nor write it", async () => {
    const read = await anonClient.from("partner_course_clicks").select("id").eq("visitor_id", visitor);
    expect(read.data ?? []).toHaveLength(0);
    const write = await anonClient
      .from("partner_course_clicks")
      .insert({ course_id: "cds-sikandar-3", exam_slug: "cds", visitor_id: visitor });
    expect(write.error).not.toBeNull();
  });

  it("refuses a malformed course id", async () => {
    const { error } = await admin
      .from("partner_course_clicks")
      .insert({ course_id: "Bad Id!", exam_slug: "cds", visitor_id: visitor });
    expect(error).not.toBeNull();
  });

  it("refuses a row without a visitor id", async () => {
    const { error } = await admin.from("partner_course_clicks").insert({ course_id: "cds-sikandar-3", exam_slug: "cds" });
    expect(error).not.toBeNull();
  });
});
