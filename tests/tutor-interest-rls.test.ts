/**
 * Integration test for tutor_interest (migration 0190).
 *
 * The table is RLS-enabled with NO policies, so only the service role (POST
 * /api/tutor-interest and the growth readout) reads or writes it. The CHECKs
 * are the data rules: a role and a Yes/No always, a mode exactly when the
 * answer is Yes, and one row per signed-in account.
 *
 * The service-role insert runs FIRST so the "anon reads zero rows" assertion
 * runs against a non-empty table.
 *
 * Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { testRunId } from "./helpers/runId";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = testRunId();
const USER_EMAIL = `ti-user-${RUN_ID}@test.local`;

describe.skipIf(!HAS_ENV)("tutor_interest table", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;
  let userId: string;
  const ids: string[] = [];

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    anonClient = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    const { data } = await admin.auth.admin.createUser({
      email: USER_EMAIL,
      password: "tutor-interest-1234",
      email_confirm: true,
    });
    userId = data.user!.id;
  });

  afterAll(async () => {
    if (ids.length) await admin.from("tutor_interest").delete().in("id", ids);
    if (userId) {
      await admin.from("tutor_interest").delete().eq("user_id", userId);
      await admin.auth.admin.deleteUser(userId);
    }
  });

  async function insert(row: Record<string, unknown>) {
    const res = await admin.from("tutor_interest").insert(row).select("id").single();
    if (res.data?.id) ids.push(res.data.id as string);
    return res;
  }

  it("service role can insert a signed-out Yes", async () => {
    const { error } = await insert({ role: "student", wants: true, mode: "online", from_section: "notes", exam_slug: "nda" });
    expect(error).toBeNull();
  });

  it("anon can neither insert nor read", async () => {
    const ins = await anonClient.from("tutor_interest").insert({ role: "student", wants: false });
    expect(ins.error).not.toBeNull();
    const sel = await anonClient.from("tutor_interest").select("id");
    expect(sel.data ?? []).toEqual([]);
  });

  it("refuses a Yes without a mode", async () => {
    const { error } = await insert({ role: "student", wants: true });
    expect(error?.code).toBe("23514");
  });

  it("refuses a No with a mode", async () => {
    const { error } = await insert({ role: "teacher", wants: false, mode: "offline" });
    expect(error?.code).toBe("23514");
  });

  it("refuses an unknown role, mode or section", async () => {
    expect((await insert({ role: "parent", wants: false })).error?.code).toBe("23514");
    expect((await insert({ role: "student", wants: true, mode: "home" })).error?.code).toBe("23514");
    expect((await insert({ role: "student", wants: false, from_section: "<x>" })).error?.code).toBe("23514");
  });

  it("keeps many signed-out rows but one row per account, updated by upsert", async () => {
    expect((await insert({ role: "student", wants: false })).error).toBeNull();

    const first = await admin
      .from("tutor_interest")
      .upsert({ user_id: userId, role: "student", wants: false }, { onConflict: "user_id" });
    expect(first.error).toBeNull();
    const second = await admin
      .from("tutor_interest")
      .upsert(
        { user_id: userId, role: "teacher", wants: true, mode: "either", updated_at: new Date().toISOString() },
        { onConflict: "user_id" }
      );
    expect(second.error).toBeNull();

    const { data } = await admin.from("tutor_interest").select("role, wants, mode").eq("user_id", userId);
    expect(data).toEqual([{ role: "teacher", wants: true, mode: "either" }]);
  });

  // The price test (migration 0223): a price only for a student Yes, an answer
  // only to a price shown, a lower amount only below it, a rate only from a teacher Yes.
  it("keeps a student's price answer", async () => {
    const { error } = await insert({
      role: "student",
      wants: true,
      mode: "online",
      price_shown: 749,
      price_answer: "cheaper",
      price_would_pay: 500,
      price_answered_at: new Date().toISOString(),
    });
    expect(error).toBeNull();
  });

  it("keeps a teacher's rate", async () => {
    const { error } = await insert({ role: "teacher", wants: true, mode: "either", teacher_rate: "750-1000" });
    expect(error).toBeNull();
  });

  it("refuses a price answer that breaks the rules", async () => {
    const yes = { role: "student", wants: true, mode: "online" };
    // an unknown price, or a price shown to a teacher or after a No
    expect((await insert({ ...yes, price_shown: 600 })).error?.code).toBe("23514");
    expect((await insert({ role: "teacher", wants: true, mode: "online", price_shown: 499 })).error?.code).toBe("23514");
    expect((await insert({ role: "student", wants: false, price_shown: 499 })).error?.code).toBe("23514");
    // an answer with no price, or an unknown answer
    expect((await insert({ ...yes, price_answer: "yes" })).error?.code).toBe("23514");
    expect((await insert({ ...yes, price_shown: 499, price_answer: "maybe" })).error?.code).toBe("23514");
    // a lower amount on a Yes, or not below the price shown
    expect((await insert({ ...yes, price_shown: 499, price_answer: "yes", price_would_pay: 300 })).error?.code).toBe("23514");
    expect((await insert({ ...yes, price_shown: 499, price_answer: "cheaper", price_would_pay: 600 })).error?.code).toBe("23514");
    // a rate from a student, or an unknown rate
    expect((await insert({ ...yes, teacher_rate: "500-750" })).error?.code).toBe("23514");
    expect((await insert({ role: "teacher", wants: true, mode: "online", teacher_rate: "cheap" })).error?.code).toBe("23514");
  });

  // The /me card (migration 0224): where a price answer was given, and a Not now.
  it("keeps where a price answer was given and a Not now", async () => {
    const { error } = await insert({
      role: "student",
      wants: true,
      mode: "online",
      price_shown: 999,
      price_answer: "no",
      price_answered_from: "me",
      price_snoozed_until: new Date().toISOString(),
    });
    expect(error).toBeNull();
  });

  it("refuses an unknown answer place, or one with nothing answered", async () => {
    const yes = { role: "student", wants: true, mode: "online" };
    expect((await insert({ ...yes, price_shown: 499, price_answer: "no", price_answered_from: "app" })).error?.code).toBe(
      "23514"
    );
    expect((await insert({ ...yes, price_answered_from: "me" })).error?.code).toBe("23514");
  });
});
