/**
 * Integration test for notes_progress RLS (migration 0046).
 *
 * Load-bearing property: a student reads + writes ONLY their own notes progress
 * and cannot read or forge another student's. Own-row via their JWT (like
 * student_profiles 0045). Also asserts the checkpoint CHECK constraint.
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

const PASSWORD = "notes-progress-test-1234";
const RUN_ID = randomUUID().slice(0, 8);
const ALICE_EMAIL = `np-alice-${RUN_ID}@test.local`;
const BOB_EMAIL = `np-bob-${RUN_ID}@test.local`;

const SLUG = "geometric-progressions";
const baseRow = {
  subtopic_slug: SLUG,
  chapter_slug: "sequence-series",
  subject_route: "nda-maths",
};

describe.skipIf(!HAS_ENV)("notes_progress RLS", () => {
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
    // Deleting the users cascades their notes_progress rows.
    if (aliceId) await admin.auth.admin.deleteUser(aliceId);
    if (bobId) await admin.auth.admin.deleteUser(bobId);
  });

  it("a student creates + reads their OWN progress row", async () => {
    const { error } = await aliceClient
      .from("notes_progress")
      .insert({ user_id: aliceId, ...baseRow, bookmarked: true });
    expect(error).toBeNull();

    const { data } = await aliceClient
      .from("notes_progress")
      .select("subtopic_slug, bookmarked")
      .eq("user_id", aliceId)
      .eq("subtopic_slug", SLUG);
    expect(data?.[0]?.bookmarked).toBe(true);
  });

  it("a student CANNOT read another student's progress", async () => {
    const { data } = await bobClient
      .from("notes_progress")
      .select("subtopic_slug")
      .eq("user_id", aliceId);
    expect(data ?? []).toHaveLength(0);
  });

  it("a student cannot FORGE a row for another user", async () => {
    const { error } = await bobClient
      .from("notes_progress")
      .insert({ user_id: aliceId, ...baseRow, subtopic_slug: "forged", bookmarked: true });
    expect(error).not.toBeNull(); // WITH CHECK user_id = auth.uid()
  });

  it("a student can UPDATE their own row (mark mastered)", async () => {
    await bobClient.from("notes_progress").insert({ user_id: bobId, ...baseRow });
    const { error } = await bobClient
      .from("notes_progress")
      .update({ mastered_at: new Date().toISOString() })
      .eq("user_id", bobId)
      .eq("subtopic_slug", SLUG);
    expect(error).toBeNull();
    const { data } = await bobClient
      .from("notes_progress")
      .select("mastered_at")
      .eq("user_id", bobId)
      .eq("subtopic_slug", SLUG);
    expect(data?.[0]?.mastered_at).not.toBeNull();
  });

  it("anon cannot write progress", async () => {
    const { error } = await anonClient
      .from("notes_progress")
      .insert({ user_id: aliceId, ...baseRow, subtopic_slug: "anon-write" });
    expect(error).not.toBeNull();
  });

  it("rejects an incoherent checkpoint score (score > total) via CHECK", async () => {
    const { error } = await aliceClient
      .from("notes_progress")
      .insert({
        user_id: aliceId,
        ...baseRow,
        subtopic_slug: "bad-score",
        checkpoint_score: 6,
        checkpoint_total: 5,
      });
    expect(error).not.toBeNull();
  });
});
