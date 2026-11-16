/**
 * Integration test for class_interest (migration 0265): offline-class leads.
 *
 * RLS on with NO policies: only the service role (POST /api/class-interest and
 * the superadmin list) reads or writes it, so anon and signed-in students see
 * nothing. The CHECKs are the data rules, mirrored by lib/classes/interest.ts:
 * at least one known course, a city with is_pune exactly when it is Pune, a
 * canonical Indian mobile (one lead per number), and consent given.
 *
 * The service-role insert runs FIRST so the "anon reads zero rows" assertion
 * runs against a non-empty table. Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { testRunId } from "./helpers/runId";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

// A test-only number per run, so parallel runs never collide on the unique mobile.
const RUN_ID = testRunId();
const digits = String(Math.abs([...RUN_ID].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 7))).padStart(9, "0");
const MOBILE = `916${digits.slice(0, 9)}`;
const MOBILE_2 = `917${digits.slice(0, 9)}`;

describe.skipIf(!HAS_ENV)("class_interest table", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;

  const good = { courses: ["nda"], city: "Pune", is_pune: true, mobile: MOBILE, consent: true };

  beforeAll(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    anonClient = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
  });

  afterAll(async () => {
    await admin.from("class_interest").delete().in("mobile", [MOBILE, MOBILE_2]);
  });

  it("service role saves a lead, and the same mobile updates it", async () => {
    const first = await admin.from("class_interest").upsert(good, { onConflict: "mobile" }).select("id").single();
    expect(first.error).toBeNull();
    const again = await admin
      .from("class_interest")
      .upsert({ ...good, courses: ["nda", "cds", "afcat", "board-12"] }, { onConflict: "mobile" })
      .select("id, courses")
      .single();
    expect(again.error).toBeNull();
    expect(again.data?.id).toBe(first.data?.id);
    expect(again.data?.courses).toEqual(["nda", "cds", "afcat", "board-12"]);
  });

  it("anon reads nothing and cannot write", async () => {
    const read = await anonClient.from("class_interest").select("id");
    expect(read.data ?? []).toEqual([]);
    const write = await anonClient.from("class_interest").insert({ ...good, mobile: MOBILE_2 });
    expect(write.error).not.toBeNull();
  });

  const bad: [string, Record<string, unknown>][] = [
    ["no course", { courses: [] }],
    ["an unknown course", { courses: ["neet"] }],
    ["a mobile not in 91XXXXXXXXXX form", { mobile: "9876543210" }],
    ["consent not given", { consent: false }],
    ["is_pune on another city", { city: "Nagpur", is_pune: true }],
    ["Pune without is_pune", { city: "Pune", is_pune: false }],
    ["an empty city", { city: "", is_pune: false }],
  ];
  for (const [label, change] of bad) {
    it(`refuses ${label}`, async () => {
      const { error } = await admin.from("class_interest").insert({ ...good, mobile: MOBILE_2, ...change });
      expect(error?.code).toBe("23514");
    });
  }
});
