/**
 * Integration test for question_bookmarks RLS (migration 0047).
 *
 * Load-bearing property: a student reads + writes ONLY their own saved
 * questions; cannot read or forge another student's. Own-row via JWT.
 * Uses a real PUBLIC question id (the FK requires one).
 *
 * Skipped when env is missing (or the bank has no PUBLIC question to point at).
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "bookmarks-test-1234";
const RUN_ID = randomUUID().slice(0, 8);
const ALICE_EMAIL = `bm-alice-${RUN_ID}@test.local`;
const BOB_EMAIL = `bm-bob-${RUN_ID}@test.local`;

describe.skipIf(!HAS_ENV)("question_bookmarks RLS", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;
  let aliceClient: SupabaseClient;
  let bobClient: SupabaseClient;
  let aliceId: string;
  let bobId: string;
  let questionId: string | null = null;

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    admin = createClient(url, serviceRole, { auth: { persistSession: false } });

    const { data: q } = await admin
      .from("questions")
      .select("id")
      .eq("visibility", "PUBLIC")
      // Oldest row = a stable seed question, never a parallel run's transient
      // fixture (which its afterAll could delete mid-test → FK 23503).
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    questionId = (q?.id as string) ?? null;

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
    if (aliceId) await admin.auth.admin.deleteUser(aliceId); // cascades bookmarks
    if (bobId) await admin.auth.admin.deleteUser(bobId);
  });

  it("a student saves + reads their OWN bookmark", async () => {
    if (!questionId) return; // empty bank — nothing to point the FK at
    const { error } = await aliceClient
      .from("question_bookmarks")
      .insert({ user_id: aliceId, question_id: questionId });
    expect(error).toBeNull();

    const { data } = await aliceClient.from("question_bookmarks").select("question_id");
    expect(data?.map((r) => r.question_id)).toContain(questionId);
  });

  it("a student CANNOT read another student's bookmarks", async () => {
    if (!questionId) return;
    const { data } = await bobClient
      .from("question_bookmarks")
      .select("question_id")
      .eq("user_id", aliceId);
    expect(data ?? []).toHaveLength(0);
  });

  it("a student cannot FORGE a bookmark for another user", async () => {
    if (!questionId) return;
    const { error } = await bobClient
      .from("question_bookmarks")
      .insert({ user_id: aliceId, question_id: questionId });
    expect(error).not.toBeNull(); // WITH CHECK user_id = auth.uid()
  });

  it("a student can DELETE their own bookmark", async () => {
    if (!questionId) return;
    await bobClient.from("question_bookmarks").insert({ user_id: bobId, question_id: questionId });
    const { error } = await bobClient
      .from("question_bookmarks")
      .delete()
      .eq("user_id", bobId)
      .eq("question_id", questionId);
    expect(error).toBeNull();
    const { data } = await bobClient.from("question_bookmarks").select("question_id").eq("user_id", bobId);
    expect(data ?? []).toHaveLength(0);
  });

  it("anon cannot write a bookmark", async () => {
    if (!questionId) return;
    const { error } = await anonClient
      .from("question_bookmarks")
      .insert({ user_id: aliceId, question_id: questionId });
    expect(error).not.toBeNull();
  });
});
