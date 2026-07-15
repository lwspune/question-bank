/**
 * Integration test for email_sends + the email-consent columns (migration 0059).
 *
 * The load-bearing properties:
 *  - The send log is APPEND-ONLY and SERVICE-ROLE-WRITTEN. A student may read
 *    their own rows (transparency) but must not be able to insert, update, or
 *    delete one — deleting a row would let them dodge the cooldown/dedupe and
 *    re-trigger emails.
 *  - `dedupe_key` UNIQUE is the idempotency contract that makes re-running
 *    scripts/email/send-next-mock.ts safe.
 *  - A student CAN flip their own email_opt_out (the unsubscribe path + a future
 *    /account toggle), because the 0045 own-row policies cover new columns.
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

const PASSWORD = "email-test-password-1234";
const RUN_ID = randomUUID().slice(0, 8);
const ALICE_EMAIL = `email-alice-${RUN_ID}@test.local`;
const BOB_EMAIL = `email-bob-${RUN_ID}@test.local`;

describe.skipIf(!HAS_ENV)("email_sends RLS + consent columns", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;
  let aliceClient: SupabaseClient;
  let bobClient: SupabaseClient;
  let aliceId: string;
  let bobId: string;
  let aliceSendId: string;

  const key = (s: string) => `test:${RUN_ID}:${s}`;

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

    // A service-role send row for Alice — the script's write path.
    const { data: sent, error } = await admin
      .from("email_sends")
      .insert({
        user_id: aliceId,
        kind: "next_mock",
        to_email: ALICE_EMAIL,
        subject: "Your next NDA mock is ready",
        ref_id: "mock-abc",
        ref_kind: "mock_test",
        dedupe_key: key("alice-next"),
        provider_id: "resend-fake-1",
        status: "sent",
      })
      .select("id")
      .single();
    if (error) throw new Error(`seed email_sends: ${error.message}`);
    aliceSendId = sent!.id as string;
  });

  afterAll(async () => {
    // Deleting the users cascades their email_sends + student_profiles rows.
    if (aliceId) await admin.auth.admin.deleteUser(aliceId);
    if (bobId) await admin.auth.admin.deleteUser(bobId);
  });

  it("a student reads their OWN send log", async () => {
    const { data } = await aliceClient.from("email_sends").select("subject").eq("user_id", aliceId);
    expect(data?.map((r) => r.subject)).toContain("Your next NDA mock is ready");
  });

  it("a student CANNOT read another student's send log", async () => {
    const { data } = await bobClient.from("email_sends").select("id").eq("user_id", aliceId);
    expect(data ?? []).toHaveLength(0);
  });

  it("anon cannot read the send log", async () => {
    const { data } = await anonClient.from("email_sends").select("id").eq("user_id", aliceId);
    expect(data ?? []).toHaveLength(0);
  });

  it("a student cannot INSERT a send row (service-role only)", async () => {
    const { error } = await aliceClient.from("email_sends").insert({
      user_id: aliceId,
      kind: "next_mock",
      to_email: ALICE_EMAIL,
      subject: "forged",
      dedupe_key: key("forged"),
      status: "sent",
    });
    expect(error).not.toBeNull(); // no INSERT policy exists
  });

  it("a student cannot DELETE a send row to dodge the dedupe/cooldown", async () => {
    await aliceClient.from("email_sends").delete().eq("id", aliceSendId);
    // No DELETE policy → the row survives (service-role re-read proves it).
    const { data } = await admin.from("email_sends").select("id").eq("id", aliceSendId);
    expect(data ?? []).toHaveLength(1);
  });

  it("a student cannot UPDATE a send row (append-only history)", async () => {
    await aliceClient.from("email_sends").update({ subject: "rewritten" }).eq("id", aliceSendId);
    const { data } = await admin.from("email_sends").select("subject").eq("id", aliceSendId);
    expect(data?.[0]?.subject).toBe("Your next NDA mock is ready");
  });

  it("dedupe_key UNIQUE makes a re-run idempotent", async () => {
    const { error } = await admin.from("email_sends").insert({
      user_id: aliceId,
      kind: "next_mock",
      to_email: ALICE_EMAIL,
      subject: "duplicate send",
      dedupe_key: key("alice-next"), // same key as the seeded row
      status: "sent",
    });
    expect(error).not.toBeNull(); // email_sends_dedupe_key
  });

  it("the kind + status CHECKs reject unknown values", async () => {
    const badKind = await admin.from("email_sends").insert({
      user_id: bobId,
      kind: "newsletter",
      to_email: BOB_EMAIL,
      subject: "x",
      dedupe_key: key("bad-kind"),
      status: "sent",
    });
    expect(badKind.error).not.toBeNull(); // email_sends_kind_ck

    const badStatus = await admin.from("email_sends").insert({
      user_id: bobId,
      kind: "first_mock",
      to_email: BOB_EMAIL,
      subject: "x",
      dedupe_key: key("bad-status"),
      status: "queued",
    });
    expect(badStatus.error).not.toBeNull(); // email_sends_status_ck
  });

  it("the status-coherence CHECK rejects a sent row carrying an error", async () => {
    const { error } = await admin.from("email_sends").insert({
      user_id: bobId,
      kind: "first_mock",
      to_email: BOB_EMAIL,
      subject: "x",
      dedupe_key: key("incoherent"),
      status: "sent",
      error: "domain not verified",
    });
    expect(error).not.toBeNull(); // email_sends_status_coherent_ck
  });

  it("a failed row records the provider error and carries no provider id", async () => {
    const { error } = await admin.from("email_sends").insert({
      user_id: bobId,
      kind: "first_mock",
      to_email: BOB_EMAIL,
      subject: "Start your first NDA mock",
      dedupe_key: key("bob-failed"),
      status: "failed",
      error: "403 domain not verified",
    });
    expect(error).toBeNull();
  });

  it("a student flips their OWN email_opt_out (the unsubscribe path)", async () => {
    const { error } = await aliceClient
      .from("student_profiles")
      .upsert({ user_id: aliceId, email_opt_out: true }, { onConflict: "user_id" });
    expect(error).toBeNull();

    const { data } = await aliceClient
      .from("student_profiles")
      .select("email_opt_out")
      .eq("user_id", aliceId)
      .maybeSingle();
    expect(data?.email_opt_out).toBe(true);
  });

  it("a student CANNOT flip another student's email_opt_out", async () => {
    await admin.from("student_profiles").upsert({ user_id: bobId }, { onConflict: "user_id" });
    await aliceClient.from("student_profiles").update({ email_opt_out: true }).eq("user_id", bobId);
    const { data } = await admin
      .from("student_profiles")
      .select("email_opt_out")
      .eq("user_id", bobId)
      .maybeSingle();
    expect(data?.email_opt_out).toBe(false); // RLS filtered the UPDATE to zero rows
  });

  it("every profile row is minted with a distinct unsubscribe_token", async () => {
    const { data } = await admin
      .from("student_profiles")
      .select("user_id, unsubscribe_token")
      .in("user_id", [aliceId, bobId]);
    const tokens = (data ?? []).map((r) => r.unsubscribe_token as string);
    expect(tokens).toHaveLength(2);
    expect(tokens.every(Boolean)).toBe(true);
    expect(new Set(tokens).size).toBe(2);
  });

  it("a lazily-created profile row needs only a user_id (mobile is nullable)", async () => {
    // 25 of 41 students have no profile row, so the send path mints one to get a
    // token. Proves that insert shape works without a mobile (nullable since 0048).
    const { data: u } = await admin.auth.admin.createUser({
      email: `email-lazy-${RUN_ID}@test.local`,
      password: PASSWORD,
      email_confirm: true,
    });
    const lazyId = u.user!.id;
    const { error } = await admin.from("student_profiles").insert({ user_id: lazyId });
    expect(error).toBeNull();

    const { data } = await admin
      .from("student_profiles")
      .select("email_opt_out, unsubscribe_token, mobile")
      .eq("user_id", lazyId)
      .maybeSingle();
    expect(data?.email_opt_out).toBe(false);
    expect(data?.unsubscribe_token).toBeTruthy();
    expect(data?.mobile).toBeNull();

    await admin.auth.admin.deleteUser(lazyId);
  });
});
