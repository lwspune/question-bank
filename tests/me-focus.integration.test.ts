/**
 * Integration test: the exam focus is saved on the student's own profile row
 * (migration 0231), through their own JWT, and the DATABASE keeps it honest:
 *   - it must be "all" or one of the student's chosen exams (CHECK);
 *   - removing that exam from their list clears it (trigger), so an edit on
 *     /account never fails over a focus the student forgot about.
 *
 * Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { mustSignIn } from "./helpers/fixture";
import { saveOwnFocus, loadFocus } from "@/lib/me/focusServer";
import { FOCUS_ALL } from "@/lib/me/focus";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "focus-test-password-1234";
const RUN_ID = randomUUID().slice(0, 8);
const EMAIL = `me-focus-${RUN_ID}@test.local`;

describe.skipIf(!HAS_ENV)("exam focus", () => {
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
    const { error } = await admin
      .from("student_profiles")
      .upsert({ user_id: userId, target_exams: ["nda", "cds"] }, { onConflict: "user_id" });
    if (error) throw new Error(error.message);
  });

  afterAll(async () => {
    if (userId) await admin.auth.admin.deleteUser(userId);
  });

  const saved = async () =>
    ((await admin.from("student_profiles").select("focus_exam").eq("user_id", userId).single()).data as {
      focus_exam: string | null;
    }).focus_exam;

  it("saves one of the student's exams with their own session", async () => {
    await saveOwnFocus(student, userId, "cds");
    expect(await saved()).toBe("cds");
    const f = await loadFocus(student, userId, {});
    expect(f.selected).toBe("cds");
    expect(f.source).toBe("chosen");
    expect(f.filterExamName).toBe("CDS");
  });

  it("saves All", async () => {
    await saveOwnFocus(student, userId, FOCUS_ALL);
    expect(await saved()).toBe(FOCUS_ALL);
    const f = await loadFocus(student, userId, {});
    expect(f.selected).toBeNull();
    expect(f.filterExamName).toBeNull();
  });

  it("refuses an exam the student did not choose, in the database itself", async () => {
    const { error } = await student.from("student_profiles").update({ focus_exam: "jee-mains" }).eq("user_id", userId);
    expect(error).not.toBeNull();
    expect(await saved()).toBe(FOCUS_ALL);
  });

  it("clears the focus when its exam leaves the student's list", async () => {
    await saveOwnFocus(student, userId, "cds");
    const { error } = await student.from("student_profiles").update({ target_exams: ["nda", "jee-mains"] }).eq("user_id", userId);
    expect(error).toBeNull();
    expect(await saved()).toBeNull();
  });

  it("keeps All when the list changes", async () => {
    await saveOwnFocus(student, userId, FOCUS_ALL);
    await student.from("student_profiles").update({ target_exams: ["nda"] }).eq("user_id", userId);
    expect(await saved()).toBe(FOCUS_ALL);
  });
});
