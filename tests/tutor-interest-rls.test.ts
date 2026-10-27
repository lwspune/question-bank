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

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);
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
});
