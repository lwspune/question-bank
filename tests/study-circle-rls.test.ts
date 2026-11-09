/**
 * Integration test for study_circle_interest (migration 0247).
 *
 * RLS is enabled with NO policies, so only the service role (POST
 * /api/study-circle, the Home read and the growth readout) reads or writes it;
 * a signed-in student cannot read even their own row, or write one. The
 * CHECKs are the data rules: one row per account, an answer of yes or no,
 * answered_at exactly when there is an answer, a known stage.
 *
 * The service-role insert runs FIRST so the "reads zero rows" assertions run
 * against a non-empty table. Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { testRunId } from "./helpers/runId";
import { mustSignIn } from "./helpers/fixture";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = testRunId();
const USER_EMAIL = `sc-user-${RUN_ID}@test.local`;
const PASSWORD = "study-circle-1234";

describe.skipIf(!HAS_ENV)("study_circle_interest table", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;
  let userClient: SupabaseClient;
  let userId: string;

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    anonClient = createClient(url, anonKey, { auth: { persistSession: false } });
    const { data, error } = await admin.auth.admin.createUser({ email: USER_EMAIL, password: PASSWORD, email_confirm: true });
    if (error) throw error;
    userId = data.user!.id;
    userClient = createClient(url, anonKey, { auth: { persistSession: false } });
    await mustSignIn(USER_EMAIL, userClient, { email: USER_EMAIL, password: PASSWORD });
  });

  afterAll(async () => {
    if (userId) {
      await admin.from("study_circle_interest").delete().eq("user_id", userId);
      await admin.auth.admin.deleteUser(userId);
    }
  });

  it("service role records a sighting", async () => {
    const { error } = await admin
      .from("study_circle_interest")
      .insert({ user_id: userId, stage: "class-9-10", exams: ["cbse-10"] });
    expect(error).toBeNull();
  });

  it("keeps one row per account", async () => {
    const { error } = await admin.from("study_circle_interest").insert({ user_id: userId });
    expect(error?.code).toBe("23505");
  });

  it("refuses an answer other than yes or no", async () => {
    const { error } = await admin
      .from("study_circle_interest")
      .update({ answer: "maybe", answered_at: new Date().toISOString() })
      .eq("user_id", userId);
    expect(error?.code).toBe("23514");
  });

  it("refuses an answer without its time, and a time without an answer", async () => {
    const a = await admin.from("study_circle_interest").update({ answer: "yes" }).eq("user_id", userId);
    expect(a.error?.code).toBe("23514");
    const b = await admin
      .from("study_circle_interest")
      .update({ answered_at: new Date().toISOString() })
      .eq("user_id", userId);
    expect(b.error?.code).toBe("23514");
  });

  it("refuses an unknown stage", async () => {
    const { error } = await admin.from("study_circle_interest").update({ stage: "class-5" }).eq("user_id", userId);
    expect(error?.code).toBe("23514");
  });

  it("accepts a Yes with its time", async () => {
    const { error } = await admin
      .from("study_circle_interest")
      .update({ answer: "yes", answered_at: new Date().toISOString() })
      .eq("user_id", userId);
    expect(error).toBeNull();
  });

  it("anon reads zero rows", async () => {
    const { data } = await anonClient.from("study_circle_interest").select("user_id");
    expect(data ?? []).toHaveLength(0);
  });

  it("a signed-in student cannot read their own row", async () => {
    const { data } = await userClient.from("study_circle_interest").select("user_id").eq("user_id", userId);
    expect(data ?? []).toHaveLength(0);
  });

  it("a signed-in student cannot write a row", async () => {
    const { error } = await userClient
      .from("study_circle_interest")
      .update({ answer: "no", answered_at: new Date().toISOString() })
      .eq("user_id", userId);
    // No policy: the update matches no rows (or is refused outright).
    const { data } = await admin.from("study_circle_interest").select("answer").eq("user_id", userId).single();
    expect(error === null || error.code === "42501").toBe(true);
    expect(data?.answer).toBe("yes");
  });
});
