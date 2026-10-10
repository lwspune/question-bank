/**
 * get_signup_countries (migration 0151) against the TEST project.
 *
 * The function counts STUDENTS by the country their account was created from,
 * since a given moment. Staff (an org_members row) are left out, as on the
 * rest of /dashboard/growth, and a student with no country is counted apart.
 *
 * Isolation: fixtures use "QQ", a user-assigned ISO code no real country
 * holds, so other rows in the test project cannot leak into its count. The
 * "not recorded" count is shared with any other row made since `since`, so
 * it is asserted as a lower bound.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import type { SignupCountries } from "@/lib/growth/snapshot";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);
const PASSWORD = `signup-countries-${RUN_ID}`;
const FAKE = "QQ";

describe.skipIf(!HAS_ENV)("get_signup_countries (migration 0151)", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;
  let orgId = "";
  const userIds: string[] = [];
  const since = new Date(Date.now() - 60_000).toISOString();

  async function makeUser(tag: string, country: string | null): Promise<string> {
    const email = `countries-${tag}-${RUN_ID}@test.local`;
    const { data, error } = await admin.auth.admin.createUser({ email, password: PASSWORD, email_confirm: true });
    expect(error).toBeNull();
    const id = data.user!.id;
    userIds.push(id);
    const { error: pErr } = await admin
      .from("student_profiles")
      .upsert({ user_id: id, signup_country: country }, { onConflict: "user_id" });
    expect(pErr).toBeNull();
    return id;
  }

  const read = async (p_since: string) => {
    const { data, error } = await admin.rpc("get_signup_countries", { p_since });
    expect(error).toBeNull();
    return data as SignupCountries;
  };

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    anonClient = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });

    await makeUser("student-a", FAKE);
    await makeUser("student-b", FAKE);
    await makeUser("no-country", null);
    const staff = await makeUser("staff", FAKE);

    const { data: org } = await admin.from("organizations").insert({ name: `__countries_${RUN_ID}` }).select("id").single();
    orgId = org!.id;
    const { error } = await admin.from("org_members").insert({ user_id: staff, org_id: orgId, role: "TEACHER" });
    expect(error).toBeNull();
  });

  afterAll(async () => {
    if (!admin) return;
    if (orgId) {
      await admin.from("org_members").delete().eq("org_id", orgId);
      await admin.from("organizations").delete().eq("id", orgId);
    }
    for (const id of userIds) await admin.auth.admin.deleteUser(id);
  });

  it("counts students by signup country, leaving staff out", async () => {
    const s = await read(since);
    expect(s.countries.find((c) => c.country === FAKE)?.n).toBe(2);
  });

  it("counts a student with no country apart", async () => {
    const s = await read(since);
    expect(s.unrecorded).toBeGreaterThanOrEqual(1);
  });

  it("counts only accounts made since the given moment", async () => {
    const s = await read(new Date(Date.now() + 60_000).toISOString());
    expect(s.countries.find((c) => c.country === FAKE)).toBeUndefined();
  });

  // Server-only, like get_growth_snapshot: the browser's anon key cannot call it.
  it("refuses the anon key", async () => {
    const { error } = await anonClient.rpc("get_signup_countries", { p_since: since });
    expect(error).not.toBeNull();
  });
});
