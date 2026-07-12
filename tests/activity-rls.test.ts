/**
 * Integration test for user_activity RLS (migration 0052).
 *
 * Load-bearing properties of the engagement activity spine:
 *  - a student inserts + reads ONLY their own activity (own-row via their JWT),
 *  - cannot read or forge another student's activity,
 *  - anon cannot write,
 *  - the log is APPEND-ONLY (no UPDATE / DELETE policy for students),
 *  - the DB CHECK rejects unknown kinds,
 *  - the partial-unique dedupe_key makes backfill idempotent.
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

const PASSWORD = "activity-rls-test-1234";
const RUN_ID = randomUUID().slice(0, 8);
const ALICE_EMAIL = `act-alice-${RUN_ID}@test.local`;
const BOB_EMAIL = `act-bob-${RUN_ID}@test.local`;

describe.skipIf(!HAS_ENV)("user_activity RLS", () => {
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
    // Deleting the users cascades their user_activity rows.
    if (aliceId) await admin.auth.admin.deleteUser(aliceId);
    if (bobId) await admin.auth.admin.deleteUser(bobId);
  });

  it("a student logs + reads their OWN activity", async () => {
    const { error } = await aliceClient
      .from("user_activity")
      .insert({ user_id: aliceId, kind: "mock_submitted", ref_id: "a1", metadata: { score: 42 } });
    expect(error).toBeNull();

    const { data } = await aliceClient
      .from("user_activity")
      .select("kind, ref_id")
      .eq("user_id", aliceId);
    expect(data?.some((r) => r.kind === "mock_submitted" && r.ref_id === "a1")).toBe(true);
  });

  it("a student CANNOT read another student's activity", async () => {
    const { data } = await bobClient.from("user_activity").select("kind").eq("user_id", aliceId);
    expect(data ?? []).toHaveLength(0);
  });

  it("a student cannot FORGE activity for another user", async () => {
    const { error } = await bobClient
      .from("user_activity")
      .insert({ user_id: aliceId, kind: "mock_submitted" });
    expect(error).not.toBeNull(); // WITH CHECK user_id = auth.uid()
  });

  it("anon cannot write activity", async () => {
    const { error } = await anonClient
      .from("user_activity")
      .insert({ user_id: aliceId, kind: "mock_submitted" });
    expect(error).not.toBeNull();
  });

  it("the log is APPEND-ONLY — a student cannot UPDATE or DELETE their own rows", async () => {
    await aliceClient
      .from("user_activity")
      .insert({ user_id: aliceId, kind: "question_bookmarked", ref_id: "q-immutable" });

    const upd = await aliceClient
      .from("user_activity")
      .update({ kind: "answer_correct" })
      .eq("user_id", aliceId)
      .eq("ref_id", "q-immutable");
    // No UPDATE policy → the row is invisible to the update (0 rows) or errors; either way it must NOT change.
    const { data: afterUpd } = await aliceClient
      .from("user_activity")
      .select("kind")
      .eq("user_id", aliceId)
      .eq("ref_id", "q-immutable")
      .single();
    expect(afterUpd?.kind).toBe("question_bookmarked");
    expect(upd.error === null ? "ok" : "err").toBeDefined();

    await aliceClient.from("user_activity").delete().eq("user_id", aliceId).eq("ref_id", "q-immutable");
    const { data: afterDel } = await aliceClient
      .from("user_activity")
      .select("kind")
      .eq("user_id", aliceId)
      .eq("ref_id", "q-immutable");
    expect(afterDel ?? []).toHaveLength(1); // still there — delete had no policy
  });

  it("rejects an unknown activity kind via the DB CHECK", async () => {
    const { error } = await aliceClient
      .from("user_activity")
      .insert({ user_id: aliceId, kind: "earned_100_xp" });
    expect(error).not.toBeNull();
  });

  it("dedupe_key is partial-unique per user → backfill re-runs no-op", async () => {
    const row = {
      user_id: aliceId,
      kind: "mock_submitted",
      ref_id: "dupe-attempt",
      dedupe_key: `mock_submitted:${RUN_ID}:dupe-attempt`,
    };
    // Upsert twice (the backfill's own shape) — retry-safe: a second run of the
    // same key is a no-op, never an error.
    const first = await aliceClient
      .from("user_activity")
      .upsert(row, { onConflict: "dedupe_key", ignoreDuplicates: true });
    expect(first.error).toBeNull();
    const second = await aliceClient
      .from("user_activity")
      .upsert(row, { onConflict: "dedupe_key", ignoreDuplicates: true });
    expect(second.error).toBeNull(); // ignored, not errored

    const { count } = await aliceClient
      .from("user_activity")
      .select("*", { count: "exact", head: true })
      .eq("user_id", aliceId)
      .eq("dedupe_key", row.dedupe_key);
    expect(count).toBe(1);
  });
});
