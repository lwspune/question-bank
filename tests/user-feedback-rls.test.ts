/**
 * Integration test for user_feedback RLS (migration 0051).
 *
 * A student appends + reads ONLY their own feedback (NPS / feature request),
 * cannot read another student's, cannot forge one as another user, and anon
 * cannot write. The coherence CHECK (nps needs a score, feature needs a message)
 * is exercised too. Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "feedback-test-password-1234";
const RUN_ID = randomUUID().slice(0, 8);
const ALICE_EMAIL = `feedback-alice-${RUN_ID}@test.local`;
const BOB_EMAIL = `feedback-bob-${RUN_ID}@test.local`;

describe.skipIf(!HAS_ENV)("user_feedback RLS", () => {
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
    // Deleting the users cascades their user_feedback rows.
    if (aliceId) await admin.auth.admin.deleteUser(aliceId);
    if (bobId) await admin.auth.admin.deleteUser(bobId);
  });

  it("a student appends + reads their OWN feedback (nps + feature)", async () => {
    const ins = await aliceClient.from("user_feedback").insert([
      { user_id: aliceId, kind: "nps", score: 9, message: "love it" },
      { user_id: aliceId, kind: "feature", message: "add CUET" },
    ]);
    expect(ins.error).toBeNull();

    const { data } = await aliceClient.from("user_feedback").select("kind, score").eq("user_id", aliceId);
    expect(data?.map((r) => r.kind).sort()).toEqual(["feature", "nps"]);
  });

  it("a student CANNOT read another student's feedback", async () => {
    const { data } = await bobClient.from("user_feedback").select("id").eq("user_id", aliceId);
    expect(data ?? []).toHaveLength(0);
  });

  it("a student cannot FORGE feedback as another user", async () => {
    const { error } = await bobClient
      .from("user_feedback")
      .insert({ user_id: aliceId, kind: "nps", score: 0 });
    expect(error).not.toBeNull(); // WITH CHECK user_id = auth.uid()
  });

  it("the coherence CHECK rejects an nps row with no score", async () => {
    const { error } = await aliceClient
      .from("user_feedback")
      .insert({ user_id: aliceId, kind: "nps", message: "no score" });
    expect(error).not.toBeNull(); // user_feedback_shape_chk
  });

  it("the score CHECK rejects out-of-range scores", async () => {
    const { error } = await aliceClient
      .from("user_feedback")
      .insert({ user_id: aliceId, kind: "nps", score: 11 });
    expect(error).not.toBeNull();
  });

  it("anon cannot write feedback", async () => {
    const { error } = await anonClient
      .from("user_feedback")
      .insert({ user_id: aliceId, kind: "feature", message: "x" });
    expect(error).not.toBeNull();
  });
});
