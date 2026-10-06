/**
 * Integration test: first-touch acquisition is saved when the ACCOUNT is
 * created, through the student's own JWT (RLS own-row insert/update, 0045).
 *
 * Why it exists: the channel used to be saved only on the /welcome submit, as
 * an UPDATE of a profile row. The download box signs people in without sending
 * them to /welcome, so neither the row nor the channel was ever written: 9 of
 * the 16 accounts with no source in the three weeks to 2026-10-06 came that
 * way. These tests pin the two properties the fix rests on: the save creates
 * the row when it is missing, and it never overwrites a first touch.
 *
 * Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { mustSignIn } from "./helpers/fixture";
import { saveFirstTouch } from "@/lib/profile/service";
import { writeAcquisitionCookieValue } from "@/lib/acquisition/cookie";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "acq-test-password-1234";
const RUN_ID = randomUUID().slice(0, 8);
const EMAIL = `acq-persist-${RUN_ID}@test.local`;

const CHATGPT = writeAcquisitionCookieValue({
  source: "chatgpt.com",
  medium: "referral",
  campaign: null,
  landing: "/questions/nda/maths/sets",
  referrerHost: null,
});
const GOOGLE = writeAcquisitionCookieValue({
  source: "google",
  medium: "organic",
  campaign: null,
  landing: "/",
  referrerHost: "google.com",
});

describe.skipIf(!HAS_ENV)("saveFirstTouch", () => {
  let admin: SupabaseClient;
  let student: SupabaseClient;
  let userId: string;
  // What the sign-in paths hand over: the auth user as Supabase returns it.
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
        .select("acq_source, acq_landing, acq_captured_at, onboarded_at")
        .eq("user_id", userId)
        .maybeSingle()
    ).data;

  it("does nothing without a cookie, and creates no row", async () => {
    await saveFirstTouch(student, authUser, null);
    expect(await readRow()).toBeNull();
  });

  it("creates the profile row and saves the channel for a brand-new account", async () => {
    await saveFirstTouch(student, authUser, CHATGPT);
    const row = await readRow();
    expect(row?.acq_source).toBe("chatgpt.com");
    expect(row?.acq_landing).toBe("/questions/nda/maths/sets");
    expect(row?.acq_captured_at).not.toBeNull();
    // Saving the channel must not count as onboarding: /welcome still shows.
    expect(row?.onboarded_at).toBeNull();
  });

  it("never overwrites the first touch", async () => {
    await saveFirstTouch(student, authUser, GOOGLE);
    expect((await readRow())?.acq_source).toBe("chatgpt.com");
  });

  it("does not attribute an OLD account to a channel seen at a later sign-in", async () => {
    await admin.from("student_profiles").update({ acq_source: null, acq_captured_at: null }).eq("user_id", userId);
    const old = { ...authUser, created_at: "2026-01-01T00:00:00Z" };
    await saveFirstTouch(student, old, GOOGLE);
    expect((await readRow())?.acq_source).toBeNull();
  });
});
