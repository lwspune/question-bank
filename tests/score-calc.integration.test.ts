/**
 * Integration test: the access rules of migration 0266 (score calculators).
 *
 * What it pins, against the TEST database:
 *   - score_keys: anyone reads, nobody but the service role writes.
 *   - score_checks: no client can write (the API route writes with the service
 *     role after validating); a student reads only their own saved rows; the
 *     table's CHECKs refuse impossible marks and a malformed sheet hash.
 *   - score_check_spread: says nothing until 200 sheets exist for a sitting.
 *   - score_alerts: a student adds, reads and removes only their own alert, and
 *     cannot mark one as already sent.
 *
 * Skipped when env is missing.
 */
import { createHash } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { mustSignIn } from "./helpers/fixture";
import { testRunId } from "./helpers/runId";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "score-calc-test-password-1234";
const RUN_ID = testRunId();
const SITTING = `test-${RUN_ID}`.slice(0, 40);
const KEY_SITTING = "2099-01-01-s1";

const hash = (s: string) => createHash("sha256").update(s).digest("hex");

function checkRow(userId: string | null, n: number) {
  return {
    calculator: "ssc-cgl",
    sitting: SITTING,
    total: (n % 200) - 20,
    max_marks: 200,
    sections: [],
    sheet_hash: hash(`${RUN_ID}-${n}`),
    user_id: userId,
  };
}

describe.skipIf(!HAS_ENV)("score calculator tables (0266)", () => {
  let admin: SupabaseClient;
  let anon: SupabaseClient;
  let alice: SupabaseClient;
  let bob: SupabaseClient;
  let aliceId = "";
  let bobId = "";

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    anon = createClient(url, anonKey, { auth: { persistSession: false } });

    const make = async (who: string) => {
      const email = `score-calc-${who}-${RUN_ID}@test.local`;
      const { data, error } = await admin.auth.admin.createUser({ email, password: PASSWORD, email_confirm: true });
      if (error) throw error;
      const client = createClient(url, anonKey, { auth: { persistSession: false } });
      await mustSignIn(email, client, { email, password: PASSWORD });
      return { id: data.user!.id, client };
    };
    ({ id: aliceId, client: alice } = await make("alice"));
    ({ id: bobId, client: bob } = await make("bob"));
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("score_checks").delete().eq("sitting", SITTING);
    await admin.from("score_keys").delete().eq("sitting", KEY_SITTING);
    if (aliceId) await admin.auth.admin.deleteUser(aliceId);
    if (bobId) await admin.auth.admin.deleteUser(bobId);
  });

  it("lets anyone read an answer key, and no client write one", async () => {
    const row = {
      calculator: "jee-main",
      sitting: KEY_SITTING,
      region: "india",
      status: "final",
      key: { "123456": { subject: "maths", answer: { kind: "values", values: ["1234567"] } } },
      drop_policy: "all",
      source_url: "https://example.org/key.pdf",
    };
    const ins = await admin.from("score_keys").upsert(row, { onConflict: "calculator,sitting,region,status" });
    expect(ins.error).toBeNull();

    const read = await anon.from("score_keys").select("key").eq("sitting", KEY_SITTING);
    expect(read.error).toBeNull();
    expect(read.data).toHaveLength(1);

    const anonWrite = await anon.from("score_keys").insert({ ...row, region: "outside" });
    expect(anonWrite.error).not.toBeNull();
    const studentWrite = await alice.from("score_keys").insert({ ...row, region: "outside" });
    expect(studentWrite.error).not.toBeNull();
  });

  it("lets no client write a score check", async () => {
    const asAnon = await anon.from("score_checks").insert(checkRow(null, 1));
    expect(asAnon.error).not.toBeNull();
    const asAlice = await alice.from("score_checks").insert(checkRow(aliceId, 2));
    expect(asAlice.error).not.toBeNull();
  });

  it("shows a student only their own saved checks", async () => {
    const ins = await admin.from("score_checks").insert([checkRow(aliceId, 3), checkRow(bobId, 4), checkRow(null, 5)]);
    expect(ins.error).toBeNull();
    const mine = await alice.from("score_checks").select("user_id").eq("sitting", SITTING);
    expect(mine.error).toBeNull();
    expect(mine.data?.map((r) => r.user_id)).toEqual([aliceId]);
    const asAnon = await anon.from("score_checks").select("id").eq("sitting", SITTING);
    expect(asAnon.data ?? []).toHaveLength(0);
  });

  it("refuses marks beyond the paper and a malformed sheet hash", async () => {
    const tooHigh = await admin.from("score_checks").insert({ ...checkRow(null, 6), total: 201 });
    expect(tooHigh.error).not.toBeNull();
    const badHash = await admin.from("score_checks").insert({ ...checkRow(null, 7), sheet_hash: "abc" });
    expect(badHash.error).not.toBeNull();
    const twice = await admin.from("score_checks").insert([checkRow(null, 8), checkRow(null, 8)]);
    expect(twice.error).not.toBeNull();
  });

  it("says nothing about how others scored until 200 sheets exist", async () => {
    const before = await anon.rpc("score_check_spread", { p_calculator: "ssc-cgl", p_sitting: SITTING });
    expect(before.error).toBeNull();
    expect(before.data).toEqual([]);

    const rows = Array.from({ length: 200 }, (_, i) => checkRow(null, 1000 + i));
    const ins = await admin.from("score_checks").insert(rows);
    expect(ins.error).toBeNull();

    const after = await anon.rpc("score_check_spread", { p_calculator: "ssc-cgl", p_sitting: SITTING });
    expect(after.error).toBeNull();
    const buckets = (after.data ?? []) as { sheets: number; bucket: number; n: number }[];
    expect(buckets.length).toBeGreaterThan(0);
    expect(Number(buckets[0].sheets)).toBeGreaterThanOrEqual(200);
    expect(buckets.reduce((a, b) => a + Number(b.n), 0)).toBe(Number(buckets[0].sheets));
  });

  it("lets a student add, read and remove only their own key alert", async () => {
    const own = await alice.from("score_alerts").insert({ user_id: aliceId, calculator: "jee-main" });
    expect(own.error).toBeNull();
    const forBob = await alice.from("score_alerts").insert({ user_id: bobId, calculator: "jee-main" });
    expect(forBob.error).not.toBeNull();
    const preSent = await bob.from("score_alerts").insert({ user_id: bobId, calculator: "jee-main", sent_at: new Date().toISOString() });
    expect(preSent.error).not.toBeNull();

    const bobSees = await bob.from("score_alerts").select("user_id");
    expect(bobSees.data ?? []).toHaveLength(0);

    const del = await alice.from("score_alerts").delete().eq("user_id", aliceId).select("user_id");
    expect(del.error).toBeNull();
    expect(del.data).toHaveLength(1);
  });
});
