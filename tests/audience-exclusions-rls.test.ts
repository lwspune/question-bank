/**
 * Integration test for question_audience_exclusions RLS (migration 0062).
 *
 * Load-bearing properties:
 *   - READ is open (anon included). The filter is a public /browse control and
 *     the rows are metadata about already-PUBLIC questions.
 *   - WRITE is superadmin-only, matching every other CONTENT write since 0056.
 *     A signed-in non-superadmin must not be able to insert, update or delete —
 *     otherwise any account could quietly hide questions from the screen.
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

const PASSWORD = "audience-excl-test-1234";
const RUN_ID = randomUUID().slice(0, 8);
const USER_EMAIL = `ae-user-${RUN_ID}@test.local`;
const AUDIENCE = `test-${RUN_ID}`;

describe.skipIf(!HAS_ENV)("question_audience_exclusions RLS", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;
  let userClient: SupabaseClient;
  let userId: string;
  let questionId: string;

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    anonClient = createClient(url, anonKey, { auth: { persistSession: false } });

    const { data: created, error: cErr } = await admin.auth.admin.createUser({
      email: USER_EMAIL,
      password: PASSWORD,
      email_confirm: true,
    });
    if (cErr) throw cErr;
    userId = created.user!.id;

    userClient = createClient(url, anonKey, { auth: { persistSession: false } });
    const { error: sErr } = await userClient.auth.signInWithPassword({
      email: USER_EMAIL,
      password: PASSWORD,
    });
    if (sErr) throw sErr;

    // Any real PUBLIC question — the FK needs a live row.
    const { data: q } = await admin
      .from("questions")
      .select("id")
      .eq("visibility", "PUBLIC")
      // Oldest row = a stable seed question, never a parallel run's transient
      // fixture (which its afterAll could delete mid-test → FK 23503).
      .order("created_at", { ascending: true })
      .limit(1)
      .single();
    questionId = (q as { id: string }).id;

    // Seed one row under a throwaway audience so reads have something to find
    // without touching the real 'nda-cet' screen.
    const { error: seedErr } = await admin
      .from("question_audience_exclusions")
      .insert({
        question_id: questionId,
        audience: AUDIENCE,
        blocking_tool: "eigenvalues",
      });
    if (seedErr) throw seedErr;
  });

  afterAll(async () => {
    if (!HAS_ENV) return;
    await admin
      .from("question_audience_exclusions")
      .delete()
      .eq("audience", AUDIENCE);
    if (userId) await admin.auth.admin.deleteUser(userId);
  });

  it("anon can read the screen", async () => {
    const { data, error } = await anonClient
      .from("question_audience_exclusions")
      .select("question_id, blocking_tool")
      .eq("audience", AUDIENCE);
    expect(error).toBeNull();
    expect(data).toHaveLength(1);
    expect(data![0].blocking_tool).toBe("eigenvalues");
  });

  it("anon cannot insert", async () => {
    const { error } = await anonClient
      .from("question_audience_exclusions")
      .insert({
        question_id: questionId,
        audience: `${AUDIENCE}-anon`,
        blocking_tool: "similarity",
      });
    expect(error).not.toBeNull();
  });

  it("a signed-in non-superadmin cannot insert", async () => {
    const { error } = await userClient
      .from("question_audience_exclusions")
      .insert({
        question_id: questionId,
        audience: `${AUDIENCE}-user`,
        blocking_tool: "similarity",
      });
    expect(error).not.toBeNull();
  });

  it("a signed-in non-superadmin cannot update or delete an existing row", async () => {
    const { error: upErr } = await userClient
      .from("question_audience_exclusions")
      .update({ blocking_tool: "similarity" })
      .eq("audience", AUDIENCE);
    // RLS makes the row invisible to the write path rather than erroring, so
    // assert the row is UNCHANGED rather than trusting the error alone.
    const { data: after } = await admin
      .from("question_audience_exclusions")
      .select("blocking_tool")
      .eq("audience", AUDIENCE)
      .single();
    expect(upErr ?? after!.blocking_tool).toBeTruthy();
    expect(after!.blocking_tool).toBe("eigenvalues");

    await userClient
      .from("question_audience_exclusions")
      .delete()
      .eq("audience", AUDIENCE);
    const { count } = await admin
      .from("question_audience_exclusions")
      .select("*", { count: "exact", head: true })
      .eq("audience", AUDIENCE);
    expect(count).toBe(1);
  });

  it("rejects an over-long blocking_tool via the CHECK constraint", async () => {
    const { error } = await admin
      .from("question_audience_exclusions")
      .insert({
        question_id: questionId,
        audience: `${AUDIENCE}-len`,
        blocking_tool: "x".repeat(61),
      });
    expect(error).not.toBeNull();
  });
});
