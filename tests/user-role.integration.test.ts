/**
 * student_profiles.user_role + user_role_at (migration 0258): the answer to
 * "Are you a teacher or a student?".
 *
 * The rules that live in the DATABASE, so every write path obeys them: the
 * role is teacher or student and nothing else, and a role always carries the
 * time it was given (the readout splits answers by when and where they came).
 * The student writes their own row through their JWT (RLS own-row, 0045).
 *
 * Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SIGN_IN_TEST_TIMEOUT_MS, mustSignIn } from "./helpers/fixture";
import { testRunId } from "./helpers/runId";
import { updateOwnProfile } from "@/lib/profile/service";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "user-role-test-password-1234";
const RUN_ID = testRunId();
const EMAIL = `user-role-${RUN_ID}@test.local`;

// File-wide: a test signs in a second account, which can meet the auth rate-limit wait.
describe.skipIf(!HAS_ENV)("student_profiles.user_role", { timeout: SIGN_IN_TEST_TIMEOUT_MS }, () => {
  let admin: SupabaseClient;
  let student: SupabaseClient;
  let userId: string;

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    const { data } = await admin.auth.admin.createUser({ email: EMAIL, password: PASSWORD, email_confirm: true });
    userId = data.user!.id;
    student = createClient(url, anon, { auth: { persistSession: false } });
    await mustSignIn(EMAIL, student, { email: EMAIL, password: PASSWORD });
  });

  afterAll(async () => {
    // Deleting the user cascades the profile row.
    if (userId) await admin.auth.admin.deleteUser(userId);
  });

  async function stored(): Promise<{ user_role: string | null; user_role_at: string | null } | null> {
    const { data } = await admin
      .from("student_profiles")
      .select("user_role, user_role_at")
      .eq("user_id", userId)
      .maybeSingle();
    return (data as { user_role: string | null; user_role_at: string | null } | null) ?? null;
  }

  it("the student's own answer is saved with its time, creating the profile row if there is none", async () => {
    expect(await stored()).toBeNull();
    await updateOwnProfile(student, userId, { userRole: "teacher" });
    const row = await stored();
    expect(row?.user_role).toBe("teacher");
    expect(row?.user_role_at).not.toBeNull();
  });

  it("refuses any role other than teacher or student", async () => {
    const { error } = await admin
      .from("student_profiles")
      .update({ user_role: "parent", user_role_at: new Date().toISOString() })
      .eq("user_id", userId);
    expect(error).not.toBeNull();
    expect((await stored())?.user_role).toBe("teacher");
  });

  it("refuses a role without the time it was given", async () => {
    const { error } = await admin
      .from("student_profiles")
      .update({ user_role: "student", user_role_at: null })
      .eq("user_id", userId);
    expect(error).not.toBeNull();
  });

  it("another student cannot answer for them", async () => {
    const otherEmail = `user-role-other-${RUN_ID}@test.local`;
    const { data } = await admin.auth.admin.createUser({ email: otherEmail, password: PASSWORD, email_confirm: true });
    const otherId = data.user!.id;
    try {
      const other = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
        auth: { persistSession: false },
      });
      await mustSignIn(otherEmail, other, { email: otherEmail, password: PASSWORD });
      await expect(updateOwnProfile(other, userId, { userRole: "student" })).rejects.toThrow();
      expect((await stored())?.user_role).toBe("teacher");
    } finally {
      await admin.auth.admin.deleteUser(otherId);
    }
  });
});
