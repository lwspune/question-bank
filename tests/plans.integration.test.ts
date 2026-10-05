/**
 * public.plans (migration 0121) against the TEST project.
 *
 *   1. The seed carries the two passes the code constant used, same ids, and
 *      neither sells "all" — the DB CHECK, not a test, is what refuses it.
 *   2. anon and a signed-in student read ACTIVE plans only, and cannot write.
 *   3. The admin lib writes through service-role: upsert, deactivate (never
 *      delete), and the url_key is fixed after creation.
 *   4. free_mock_limit() is readable by anon and mirrors paywall_settings;
 *      savePaywallSettings applies nextPaywallSettings (counts_from moves
 *      only on switch-on).
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { listActivePlans, readFreeMockLimit } from "@/lib/billing/plansQuery";
import {
  listAllPlans,
  upsertPlan,
  setPlanActive,
  readPaywallSettings,
  savePaywallSettings,
} from "@/lib/billing/admin";
import { SCOPE_ALL, SCOPE_MOCKS, SCOPE_TEACHER } from "@/lib/entitlements/access";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = Date.now();
const TEST_ID = `test-plan-${STAMP}`;
const EMAIL = `plans_student_${STAMP}@test.invalid`;
const PASSWORD = "test-password-12345";

describe.skipIf(!HAS_ENV)("public.plans", () => {
  let admin: SupabaseClient;
  let anon: SupabaseClient;
  let student: SupabaseClient;
  let studentId = "";
  let originalSettings: { freeMockLimit: number | null; countsFrom: string | null };

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    anon = createClient(url, key, { auth: { persistSession: false } });
    const created = await admin.auth.admin.createUser({ email: EMAIL, password: PASSWORD, email_confirm: true });
    studentId = created.data.user!.id;
    student = createClient(url, key, { auth: { persistSession: false } });
    await student.auth.signInWithPassword({ email: EMAIL, password: PASSWORD });
    const s = await readPaywallSettings();
    if (s.kind !== "ok") throw new Error(s.message);
    originalSettings = s.settings;
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("plans").delete().eq("id", TEST_ID);
    if (studentId) await admin.auth.admin.deleteUser(studentId);
    await admin
      .from("paywall_settings")
      .update({ free_mock_limit: originalSettings.freeMockLimit, counts_from: originalSettings.countsFrom })
      .eq("id", true);
  });

  it("seeds the two passes under the ids the code constant used", async () => {
    const plans = await listActivePlans(anon);
    const byId = new Map(plans.map((p) => [p.id, p]));
    expect(byId.get("mock-pass-6m")).toMatchObject({ amountPaise: 9900, durationDays: 182, scope: SCOPE_MOCKS, urlKey: "mocks" });
    expect(byId.get("teacher-pass-1y")).toMatchObject({ amountPaise: 49900, durationDays: 365, scope: SCOPE_TEACHER, urlKey: "teacher" });
    for (const p of plans) expect(p.scope).not.toBe(SCOPE_ALL);
  });

  it("the database refuses scope 'all' and a zero price", async () => {
    const all = await admin.from("plans").insert({ id: TEST_ID, label: "x", url_key: TEST_ID, amount_paise: 100, scope: "all" });
    expect(all.error?.code).toBe("23514");
    const free = await admin.from("plans").insert({ id: TEST_ID, label: "x", url_key: TEST_ID, amount_paise: 0, scope: "mocks" });
    expect(free.error?.code).toBe("23514");
  });

  it("anon and a student cannot write", async () => {
    for (const c of [anon, student]) {
      const ins = await c.from("plans").insert({ id: TEST_ID, label: "x", url_key: TEST_ID, amount_paise: 100, scope: "mocks" });
      expect(ins.error).not.toBeNull();
      const upd = await c.from("plans").update({ amount_paise: 1 }).eq("id", "mock-pass-6m").select("id");
      expect(upd.data ?? []).toHaveLength(0);
    }
    const { data } = await admin.from("plans").select("amount_paise").eq("id", "mock-pass-6m").single();
    expect(data?.amount_paise).toBe(9900);
  });

  it("admin upsert creates a plan; deactivating hides it from anon but keeps the row", async () => {
    const input = {
      id: TEST_ID,
      label: "Test Pass",
      blurb: "For the test.",
      perks: ["one", "two"],
      urlKey: TEST_ID,
      amountPaise: 12300,
      currency: "INR" as const,
      durationDays: 30,
      scope: SCOPE_MOCKS,
      sortOrder: 99,
      active: true,
    };
    expect(await upsertPlan(input)).toEqual({ kind: "ok" });
    expect((await listActivePlans(anon)).some((p) => p.id === TEST_ID)).toBe(true);
    expect((await listActivePlans(student)).some((p) => p.id === TEST_ID)).toBe(true);

    // url_key is fixed after creation; the price is not.
    expect(await upsertPlan({ ...input, urlKey: "renamed", amountPaise: 45600 })).toEqual({ kind: "ok" });
    const after = (await listActivePlans(anon)).find((p) => p.id === TEST_ID)!;
    expect(after).toMatchObject({ urlKey: TEST_ID, amountPaise: 45600 });

    expect(await setPlanActive(TEST_ID, false)).toEqual({ kind: "ok" });
    expect((await listActivePlans(anon)).some((p) => p.id === TEST_ID)).toBe(false);
    const all = await listAllPlans();
    expect(all.kind === "ok" && all.plans.find((p) => p.id === TEST_ID)?.active).toBe(false);
  });

  it("rejects an invalid plan before touching the database", async () => {
    const r = await upsertPlan({
      id: "Bad Id",
      label: "x",
      blurb: "x",
      perks: [],
      urlKey: "bad",
      amountPaise: 100,
      currency: "INR",
      durationDays: null,
      scope: SCOPE_MOCKS,
      sortOrder: 0,
      active: true,
    });
    expect(r).toMatchObject({ kind: "invalid", field: "id" });
  });

  it("free_mock_limit() is anon-readable and follows paywall_settings", async () => {
    const on = await savePaywallSettings({ enabled: true, limit: 7 });
    expect(on.kind).toBe("ok");
    expect(await readFreeMockLimit(anon)).toBe(7);
    const s1 = await readPaywallSettings();
    const countsFrom = s1.kind === "ok" ? s1.settings.countsFrom : null;
    expect(countsFrom).not.toBeNull();

    // Editing the number keeps counts_from.
    await savePaywallSettings({ enabled: true, limit: 5 });
    const s2 = await readPaywallSettings();
    expect(s2.kind === "ok" && s2.settings).toMatchObject({ freeMockLimit: 5, countsFrom });

    await savePaywallSettings({ enabled: false, limit: 5 });
    expect(await readFreeMockLimit(anon)).toBeNull();
  });
});
