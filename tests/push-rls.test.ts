/**
 * Integration test for push_subscriptions + push_sends + push_prompted_at
 * (migration 0128), against the TEST project.
 *
 * The load-bearing properties:
 *  - Both tables are SERVICE-ROLE-WRITTEN. A student may read their own rows
 *    and nothing else. A forged subscription would let a browser receive
 *    another student's nudges; an erased send would dodge the daily cap.
 *  - dedupe_key UNIQUE is the one-a-day contract a re-run of the sender leans on.
 *  - endpoint UNIQUE + https-only: one row per browser, never a non-TLS target.
 *  - user_activity accepts push_clicked (a kind missing from the CHECK is
 *    silently dropped by the best-effort writer — 0123's lesson).
 *  - A student can stamp their own push_prompted_at (the 0045 own-row policies
 *    cover new columns).
 *
 * Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { mustSignIn } from "./helpers/fixture";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "push-test-password-1234";
const RUN_ID = randomUUID().slice(0, 8);
const ALICE_EMAIL = `push-alice-${RUN_ID}@test.local`;
const BOB_EMAIL = `push-bob-${RUN_ID}@test.local`;
const KEYS = { p256dh: "BNcRdreALRFXTkOOUHK1EtK2wtaz5Ry4YfYCA_0QTpQ", auth: "tBHItJI5svbpez7KI4CCXg" };
const endpoint = (s: string) => `https://fcm.googleapis.com/fcm/send/${RUN_ID}-${s}`;

describe.skipIf(!HAS_ENV)("push tables RLS (0128)", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;
  let aliceClient: SupabaseClient;
  let bobClient: SupabaseClient;
  let aliceId = "";
  let bobId = "";
  let aliceSubId = "";
  let aliceSendId = "";

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

    const [{ data: alice }, { data: bob }] = await Promise.all([
      admin.auth.admin.createUser({ email: ALICE_EMAIL, password: PASSWORD, email_confirm: true }),
      admin.auth.admin.createUser({ email: BOB_EMAIL, password: PASSWORD, email_confirm: true }),
    ]);
    aliceId = alice.user!.id;
    bobId = bob.user!.id;

    anonClient = createClient(url, anon, { auth: { persistSession: false } });
    aliceClient = createClient(url, anon, { auth: { persistSession: false } });
    bobClient = createClient(url, anon, { auth: { persistSession: false } });
    await mustSignIn(ALICE_EMAIL, aliceClient, { email: ALICE_EMAIL, password: PASSWORD });
    await mustSignIn(BOB_EMAIL, bobClient, { email: BOB_EMAIL, password: PASSWORD });

    const { data: sub, error: subErr } = await admin
      .from("push_subscriptions")
      .insert({ user_id: aliceId, endpoint: endpoint("alice"), p256dh: KEYS.p256dh, auth: KEYS.auth })
      .select("id")
      .single();
    if (subErr) throw new Error(`seed push_subscriptions: ${subErr.message}`);
    aliceSubId = sub.id as string;

    const { data: send, error: sendErr } = await admin
      .from("push_sends")
      .insert({
        user_id: aliceId,
        subscription_id: aliceSubId,
        kind: "due_nudge",
        dedupe_key: `due_nudge:${aliceId}:2026-10-01`,
        status: "sent",
        status_code: 201,
      })
      .select("id")
      .single();
    if (sendErr) throw new Error(`seed push_sends: ${sendErr.message}`);
    aliceSendId = send.id as string;
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("user_activity").delete().in("user_id", [aliceId, bobId].filter(Boolean));
    // Deleting the users cascades their subscriptions, sends and profiles.
    if (aliceId) await admin.auth.admin.deleteUser(aliceId);
    if (bobId) await admin.auth.admin.deleteUser(bobId);
  });

  it("a student reads their OWN subscriptions and sends", async () => {
    const subs = await aliceClient.from("push_subscriptions").select("id").eq("user_id", aliceId);
    const sends = await aliceClient.from("push_sends").select("id").eq("user_id", aliceId);
    expect(subs.data?.map((r) => r.id)).toEqual([aliceSubId]);
    expect(sends.data?.map((r) => r.id)).toEqual([aliceSendId]);
  });

  it("another student and anon read nothing of them", async () => {
    for (const client of [bobClient, anonClient]) {
      const subs = await client.from("push_subscriptions").select("id").eq("user_id", aliceId);
      const sends = await client.from("push_sends").select("id").eq("user_id", aliceId);
      expect(subs.data ?? []).toHaveLength(0);
      expect(sends.data ?? []).toHaveLength(0);
    }
  });

  it("a student cannot write a subscription, even their own (service-role only)", async () => {
    const { error } = await aliceClient
      .from("push_subscriptions")
      .insert({ user_id: aliceId, endpoint: endpoint("forged"), p256dh: KEYS.p256dh, auth: KEYS.auth });
    expect(error).not.toBeNull();
  });

  it("a student cannot delete or rewrite a send to dodge the daily cap", async () => {
    await aliceClient.from("push_sends").delete().eq("id", aliceSendId);
    await aliceClient.from("push_sends").update({ status: "failed" }).eq("id", aliceSendId);
    const { data } = await admin.from("push_sends").select("status").eq("id", aliceSendId);
    expect(data).toEqual([{ status: "sent" }]);
  });

  it("dedupe_key UNIQUE: a second send the same day is refused", async () => {
    const { error } = await admin.from("push_sends").insert({
      user_id: aliceId,
      kind: "due_nudge",
      dedupe_key: `due_nudge:${aliceId}:2026-10-01`,
      status: "sent",
    });
    expect(error).not.toBeNull();
  });

  it("endpoint is one row per browser, and https only", async () => {
    const dup = await admin
      .from("push_subscriptions")
      .insert({ user_id: bobId, endpoint: endpoint("alice"), p256dh: KEYS.p256dh, auth: KEYS.auth });
    expect(dup.error).not.toBeNull();
    const http = await admin
      .from("push_subscriptions")
      .insert({ user_id: bobId, endpoint: "http://insecure.example/x", p256dh: KEYS.p256dh, auth: KEYS.auth });
    expect(http.error).not.toBeNull();
  });

  it("user_activity accepts push_clicked", async () => {
    const { error } = await admin.from("user_activity").insert({
      user_id: aliceId,
      kind: "push_clicked",
      ref_id: aliceSendId,
      ref_kind: "push_send",
      dedupe_key: `push_click:${aliceSendId}`,
    });
    expect(error).toBeNull();
  });

  it("a student stamps their own push_prompted_at", async () => {
    const at = new Date().toISOString();
    const { error } = await aliceClient
      .from("student_profiles")
      .upsert({ user_id: aliceId, push_prompted_at: at }, { onConflict: "user_id" });
    expect(error).toBeNull();
    const { data } = await admin.from("student_profiles").select("push_prompted_at").eq("user_id", aliceId).single();
    expect(data?.push_prompted_at).not.toBeNull();
  });
});
