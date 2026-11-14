/**
 * student_profiles.app_opened_at (migration 0255): the first time a student
 * opened PYQ Vault from its home-screen icon.
 *
 * The property that matters is FIRST. The installed app writes it on every
 * device it is opened on (once per device), so a second phone, a cleared
 * browser or a re-install writes it again. The date the experiment compares
 * return visits against is the install date, so the database keeps the first
 * value and ignores the rest: a trigger, not app code, because every write path
 * (the route, a script, a hand edit) must obey it.
 *
 * Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { mustSignIn } from "./helpers/fixture";
import { testRunId } from "./helpers/runId";
import { updateOwnProfile } from "@/lib/profile/service";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "app-opened-test-password-1234";
const RUN_ID = testRunId();
const EMAIL = `app-opened-${RUN_ID}@test.local`;

describe.skipIf(!HAS_ENV)("student_profiles.app_opened_at", () => {
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

  async function openedAt(): Promise<string | null> {
    const { data } = await admin.from("student_profiles").select("app_opened_at").eq("user_id", userId).maybeSingle();
    return (data?.app_opened_at as string | null | undefined) ?? null;
  }

  it("the student's own patch stamps it, creating the profile row if there is none", async () => {
    expect(await openedAt()).toBeNull();
    await updateOwnProfile(student, userId, { appOpened: true });
    expect(await openedAt()).not.toBeNull();
  });

  it("keeps the FIRST date: a later open (another phone, a re-install) does not move it", async () => {
    const first = await openedAt();
    await new Promise((r) => setTimeout(r, 20));
    await updateOwnProfile(student, userId, { appOpened: true });
    expect(await openedAt()).toBe(first);
  });

  it("holds for a direct write too, not just the app's own path", async () => {
    const first = await openedAt();
    const { error } = await admin
      .from("student_profiles")
      .update({ app_opened_at: "2030-01-01T00:00:00Z" })
      .eq("user_id", userId);
    expect(error).toBeNull();
    expect(await openedAt()).toBe(first);
  });

  it("an unrelated profile edit leaves it alone", async () => {
    const first = await openedAt();
    await updateOwnProfile(student, userId, { city: "Pune" });
    expect(await openedAt()).toBe(first);
  });
});
