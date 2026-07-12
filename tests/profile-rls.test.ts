/**
 * Integration test for student_profiles RLS (migration 0045).
 *
 * The load-bearing property: a student writes + reads ONLY their own profile
 * mobile, and cannot read or forge another student's. Unlike entitlements
 * (service-role writes only), students write their OWN row via their JWT — so
 * the own-row INSERT/UPDATE/SELECT policies are what we prove here.
 *
 * Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "profile-test-password-1234";
const RUN_ID = randomUUID().slice(0, 8);
const ALICE_EMAIL = `profile-alice-${RUN_ID}@test.local`;
const BOB_EMAIL = `profile-bob-${RUN_ID}@test.local`;

describe.skipIf(!HAS_ENV)("student_profiles RLS", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;
  let aliceClient: SupabaseClient;
  let bobClient: SupabaseClient;
  let aliceId: string;
  let bobId: string;

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    admin = createClient(url, serviceRole, { auth: { persistSession: false } });

    const [{ data: alice }, { data: bob }] = await Promise.all([
      admin.auth.admin.createUser({ email: ALICE_EMAIL, password: PASSWORD, email_confirm: true }),
      admin.auth.admin.createUser({ email: BOB_EMAIL, password: PASSWORD, email_confirm: true }),
    ]);
    aliceId = alice.user!.id;
    bobId = bob.user!.id;

    anonClient = createClient(url, anon, { auth: { persistSession: false } });
    aliceClient = createClient(url, anon, { auth: { persistSession: false } });
    bobClient = createClient(url, anon, { auth: { persistSession: false } });
    await aliceClient.auth.signInWithPassword({ email: ALICE_EMAIL, password: PASSWORD });
    await bobClient.auth.signInWithPassword({ email: BOB_EMAIL, password: PASSWORD });
  });

  afterAll(async () => {
    // Deleting the users cascades their student_profiles row.
    if (aliceId) await admin.auth.admin.deleteUser(aliceId);
    if (bobId) await admin.auth.admin.deleteUser(bobId);
  });

  it("a student creates + reads their OWN profile", async () => {
    const { error: insErr } = await aliceClient
      .from("student_profiles")
      .insert({ user_id: aliceId, mobile: "919000000001", consent: true });
    expect(insErr).toBeNull();

    const { data } = await aliceClient.from("student_profiles").select("mobile").eq("user_id", aliceId);
    expect(data?.map((r) => r.mobile)).toContain("919000000001");
  });

  it("a student CANNOT read another student's profile", async () => {
    const { data } = await bobClient.from("student_profiles").select("mobile").eq("user_id", aliceId);
    expect(data ?? []).toHaveLength(0);
  });

  it("a student cannot FORGE a profile for another user", async () => {
    const { error } = await bobClient
      .from("student_profiles")
      .insert({ user_id: aliceId, mobile: "919000000009", consent: true });
    expect(error).not.toBeNull(); // WITH CHECK user_id = auth.uid()
  });

  it("a student can UPDATE their own mobile (correct a typo)", async () => {
    await bobClient.from("student_profiles").insert({ user_id: bobId, mobile: "919000000002", consent: true });
    const { error } = await bobClient
      .from("student_profiles")
      .update({ mobile: "919000000003" })
      .eq("user_id", bobId);
    expect(error).toBeNull();
    const { data } = await bobClient.from("student_profiles").select("mobile").eq("user_id", bobId);
    expect(data?.[0]?.mobile).toBe("919000000003");
  });

  it("a student writes their OWN onboarding intent (target_exams + stage)", async () => {
    // Upsert so this doesn't depend on whether the mobile tests ran first;
    // proves the 0048 columns are covered by the same own-row policies (no
    // mobile required — the column is nullable post-0048).
    const { error } = await aliceClient.from("student_profiles").upsert(
      {
        user_id: aliceId,
        target_exams: ["nda", "neet"],
        stage: "class-12",
        onboarded_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );
    expect(error).toBeNull();

    const { data } = await aliceClient
      .from("student_profiles")
      .select("target_exams, stage")
      .eq("user_id", aliceId)
      .maybeSingle();
    expect(data?.target_exams).toEqual(["nda", "neet"]);
    expect(data?.stage).toBe("class-12");
  });

  it("the stage CHECK rejects an unknown value", async () => {
    const { error } = await aliceClient
      .from("student_profiles")
      .upsert({ user_id: aliceId, stage: "postgrad" }, { onConflict: "user_id" });
    expect(error).not.toBeNull(); // student_profiles_stage_chk
  });

  it("a student writes their OWN /account detail fields (0049)", async () => {
    const { error } = await aliceClient.from("student_profiles").upsert(
      { user_id: aliceId, medium: "english", academic_stream: "pcm", city: "Pune", goal: "Clear NDA 2026" },
      { onConflict: "user_id" }
    );
    expect(error).toBeNull();

    const { data } = await aliceClient
      .from("student_profiles")
      .select("medium, academic_stream, city, goal")
      .eq("user_id", aliceId)
      .maybeSingle();
    expect(data?.medium).toBe("english");
    expect(data?.academic_stream).toBe("pcm");
    expect(data?.city).toBe("Pune");
  });

  it("a student sets their OWN whatsapp opt-in (0050)", async () => {
    const { error } = await aliceClient
      .from("student_profiles")
      .upsert(
        { user_id: aliceId, whatsapp_opt_in: true, whatsapp_prompted_at: new Date().toISOString() },
        { onConflict: "user_id" }
      );
    expect(error).toBeNull();
    const { data } = await aliceClient
      .from("student_profiles")
      .select("whatsapp_opt_in")
      .eq("user_id", aliceId)
      .maybeSingle();
    expect(data?.whatsapp_opt_in).toBe(true);
  });

  it("the medium + stream CHECKs reject unknown values", async () => {
    const bad1 = await aliceClient
      .from("student_profiles")
      .upsert({ user_id: aliceId, medium: "marathi" }, { onConflict: "user_id" });
    expect(bad1.error).not.toBeNull(); // student_profiles_medium_chk
    const bad2 = await aliceClient
      .from("student_profiles")
      .upsert({ user_id: aliceId, academic_stream: "science" }, { onConflict: "user_id" });
    expect(bad2.error).not.toBeNull(); // student_profiles_stream_chk
  });

  it("anon cannot write a profile", async () => {
    const { error } = await anonClient
      .from("student_profiles")
      .insert({ user_id: aliceId, mobile: "919000000004", consent: true });
    expect(error).not.toBeNull();
  });

  it("service-role reads all profiles (admin roster path)", async () => {
    // Ensure both rows exist independently of sibling-test ordering (idempotent
    // service-role upsert — bypasses RLS by design). Avoids a shared-DB parallel
    // flake where an exact count of 2 depended on earlier tests having committed.
    await admin.from("student_profiles").upsert(
      [
        { user_id: aliceId, mobile: "919000000001", consent: true },
        { user_id: bobId, mobile: "919000000003", consent: true },
      ],
      { onConflict: "user_id" }
    );
    const { data } = await admin
      .from("student_profiles")
      .select("user_id, mobile")
      .in("user_id", [aliceId, bobId]);
    // Containment, not exact count — proves service-role reads across users
    // without being brittle to timing or stray rows.
    expect(data?.map((r) => r.user_id)).toEqual(
      expect.arrayContaining([aliceId, bobId])
    );
  });
});
