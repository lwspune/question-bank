/**
 * One free Word download per account (migration 0131). The once-only rule is a
 * property of the TABLE (user_id is the primary key), so it is tested against
 * a real database: a second claim for the same account must lose, a student's
 * own JWT may read but never write the row, and a fresh account has one left.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { claimFreeDownload, hasFreeDownloadLeft } from "@/lib/export/freeDownload";
import { mustSignIn } from "./helpers/fixture";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = Date.now();
const EMAIL = `free_dl_${STAMP}@test.invalid`;
const PASSWORD = "test-password-12345";

describe.skipIf(!HAS_ENV)("free_downloads", () => {
  let admin: SupabaseClient;
  let student: SupabaseClient;
  let studentId = "";

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    const created = await admin.auth.admin.createUser({ email: EMAIL, password: PASSWORD, email_confirm: true });
    studentId = created.data.user!.id;
    student = createClient(url, key, { auth: { persistSession: false } });
    await mustSignIn("free-download student", student, { email: EMAIL, password: PASSWORD });
  });

  afterAll(async () => {
    if (!admin || !studentId) return;
    await admin.from("free_downloads").delete().eq("user_id", studentId);
    await admin.auth.admin.deleteUser(studentId);
  });

  it("a fresh account has its free download", async () => {
    expect(await hasFreeDownloadLeft(student, studentId)).toBe(true);
  });

  it("a student cannot write the row with their own JWT", async () => {
    const { error } = await student
      .from("free_downloads")
      .insert({ user_id: studentId, kind: "paper", question_count: 10 });
    expect(error).not.toBeNull();
    expect(await hasFreeDownloadLeft(student, studentId)).toBe(true);
  });

  it("the first claim wins and the second loses", async () => {
    expect(await claimFreeDownload(admin, studentId, "paper", 48)).toBe(true);
    expect(await claimFreeDownload(admin, studentId, "key", 48)).toBe(false);
  });

  it("once claimed, the account has none left, and reads its own row", async () => {
    expect(await hasFreeDownloadLeft(student, studentId)).toBe(false);
    const { data } = await student.from("free_downloads").select("kind, question_count").eq("user_id", studentId);
    expect(data).toEqual([{ kind: "paper", question_count: 48 }]);
  });
});
