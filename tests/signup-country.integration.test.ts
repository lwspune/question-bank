/**
 * Integration test: the country an account was created from is saved once,
 * through the student's own JWT (RLS own-row insert/update, 0045), migration
 * 0142.
 *
 * It is saved WITHOUT the first-touch cookie (saveFirstTouch does nothing
 * when that cookie is missing; the country does not depend on it), it creates
 * the profile row when it is missing, it is never overwritten, and an OLD
 * account signing in later is not stamped with wherever it is today.
 *
 * Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { mustSignIn } from "./helpers/fixture";
import { saveSignupCountry } from "@/lib/profile/service";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "country-test-password-1234";
const RUN_ID = randomUUID().slice(0, 8);
const EMAIL = `signup-country-${RUN_ID}@test.local`;

describe.skipIf(!HAS_ENV)("saveSignupCountry", () => {
  let admin: SupabaseClient;
  let student: SupabaseClient;
  let userId: string;
  let authUser: { id: string; created_at: string; last_sign_in_at: string | null };

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    const { data } = await admin.auth.admin.createUser({ email: EMAIL, password: PASSWORD, email_confirm: true });
    userId = data.user!.id;
    student = createClient(url, anon, { auth: { persistSession: false } });
    await mustSignIn(EMAIL, student, { email: EMAIL, password: PASSWORD });
    const { data: me } = await student.auth.getUser();
    authUser = me.user! as typeof authUser;
  });

  afterAll(async () => {
    if (userId) await admin.auth.admin.deleteUser(userId);
  });

  const readRow = async () =>
    (
      await admin
        .from("student_profiles")
        .select("signup_country, acq_source, onboarded_at")
        .eq("user_id", userId)
        .maybeSingle()
    ).data;

  it("does nothing without a country, and creates no row", async () => {
    await saveSignupCountry(student, authUser, null);
    expect(await readRow()).toBeNull();
  });

  it("creates the row and saves the country for a brand-new account, with no first-touch cookie", async () => {
    await saveSignupCountry(student, authUser, "IN");
    const row = await readRow();
    expect(row?.signup_country).toBe("IN");
    expect(row?.acq_source).toBeNull();
    // Saving the country must not count as onboarding: /welcome still shows.
    expect(row?.onboarded_at).toBeNull();
  });

  it("never overwrites the first country", async () => {
    await saveSignupCountry(student, authUser, "KE");
    expect((await readRow())?.signup_country).toBe("IN");
  });

  it("does not stamp an OLD account with the country of a later sign-in", async () => {
    await admin.from("student_profiles").update({ signup_country: null }).eq("user_id", userId);
    const old = { ...authUser, created_at: "2026-01-01T00:00:00Z" };
    await saveSignupCountry(student, old, "KE");
    expect((await readRow())?.signup_country).toBeNull();
  });

  it("is refused by the database when it is not a two-letter code", async () => {
    const { error } = await admin.from("student_profiles").update({ signup_country: "India" }).eq("user_id", userId);
    expect(error).not.toBeNull();
  });
});
