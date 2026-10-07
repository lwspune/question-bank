/**
 * One free PAPER per account (migration 0131; one paper, not one file, since
 * 0139). The once-only rule is a property of the TABLE (user_id is the primary
 * key), so it is tested against a real database: a claim for the SAME paper
 * (its other file) still serves, a claim for a different paper loses, an old
 * one-file row (no key) frees nothing, and a student's own JWT may read but
 * never write the row.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { claimFreeDownload, isPaperFree } from "@/lib/export/freeDownload";
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

  const PAPER = "mock:nda-2026-sep-maths";
  const OTHER = "mock:nda-2026-sep-gat";

  it("a fresh account has its free paper", async () => {
    expect(await isPaperFree(student, studentId, PAPER)).toBe(true);
  });

  it("a student cannot write the row with their own JWT", async () => {
    const { error } = await student
      .from("free_downloads")
      .insert({ user_id: studentId, kind: "paper", question_count: 10, set_key: PAPER });
    expect(error).not.toBeNull();
    expect(await isPaperFree(student, studentId, PAPER)).toBe(true);
  });

  it("the free paper's other file is still free; another paper is not", async () => {
    expect(await claimFreeDownload(admin, studentId, "paper", 48, PAPER)).toBe(true);
    expect(await claimFreeDownload(admin, studentId, "key", 48, PAPER)).toBe(true);
    expect(await claimFreeDownload(admin, studentId, "paper", 48, OTHER)).toBe(false);
  });

  it("once claimed, only that paper reads as free, and the student reads their own row", async () => {
    expect(await isPaperFree(student, studentId, PAPER)).toBe(true);
    expect(await isPaperFree(student, studentId, OTHER)).toBe(false);
    const { data } = await student.from("free_downloads").select("kind, question_count, set_key").eq("user_id", studentId);
    expect(data).toEqual([{ kind: "paper", question_count: 48, set_key: PAPER }]);
  });

  it("an old one-file row (no paper key) frees nothing", async () => {
    await admin.from("free_downloads").update({ set_key: null }).eq("user_id", studentId);
    expect(await isPaperFree(student, studentId, PAPER)).toBe(false);
    expect(await claimFreeDownload(admin, studentId, "key", 48, PAPER)).toBe(false);
  });
});
