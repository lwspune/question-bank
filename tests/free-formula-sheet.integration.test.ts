/**
 * One free FORMULA SHEET per account (migration 0150), apart from the one free
 * paper (0131/0139). Once-only is a property of the TABLE (user_id is the
 * primary key), so it is tested against a real database: a claim for the
 * SAME chapter again still serves (a re-download), a claim for a different
 * chapter loses, taking the free paper does not spend the free sheet, and a
 * student's own JWT may read but never write the row.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { claimFreeFormulaSheet, isFormulaSheetFree } from "@/lib/export/freeFormulaSheet";
import { claimFreeDownload } from "@/lib/export/freeDownload";
import { mustSignIn } from "./helpers/fixture";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = Date.now();
const EMAIL = `free_fs_${STAMP}@test.invalid`;
const PASSWORD = "test-password-12345";

describe.skipIf(!HAS_ENV)("free_formula_sheets", () => {
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
    await mustSignIn("free-formula-sheet student", student, { email: EMAIL, password: PASSWORD });
  });

  afterAll(async () => {
    if (!admin || !studentId) return;
    await admin.from("free_formula_sheets").delete().eq("user_id", studentId);
    await admin.from("free_downloads").delete().eq("user_id", studentId);
    await admin.auth.admin.deleteUser(studentId);
  });

  const SHEET = "formula:nda-maths/trigonometric-identities";
  const OTHER = "formula:nda-maths/vectors";

  it("a fresh account has its free sheet", async () => {
    expect(await isFormulaSheetFree(student, studentId, SHEET)).toBe(true);
  });

  it("taking the free PAPER leaves the free sheet", async () => {
    expect(await claimFreeDownload(admin, studentId, "paper", 10, "mock:some-paper")).toBe(true);
    expect(await isFormulaSheetFree(student, studentId, SHEET)).toBe(true);
  });

  it("the first claim wins and records the chapter", async () => {
    expect(await claimFreeFormulaSheet(admin, studentId, SHEET)).toBe(true);
    const { data } = await admin.from("free_formula_sheets").select("sheet").eq("user_id", studentId).single();
    expect(data?.sheet).toBe(SHEET);
  });

  it("the same chapter again still serves (a re-download)", async () => {
    expect(await claimFreeFormulaSheet(admin, studentId, SHEET)).toBe(true);
    expect(await isFormulaSheetFree(student, studentId, SHEET)).toBe(true);
  });

  it("a different chapter loses", async () => {
    expect(await isFormulaSheetFree(student, studentId, OTHER)).toBe(false);
    expect(await claimFreeFormulaSheet(admin, studentId, OTHER)).toBe(false);
    const { data } = await admin.from("free_formula_sheets").select("sheet").eq("user_id", studentId).single();
    expect(data?.sheet).toBe(SHEET);
  });

  it("a student may read their own row but never write one", async () => {
    const { data } = await student.from("free_formula_sheets").select("sheet").eq("user_id", studentId);
    expect(data).toHaveLength(1);
    const { error } = await student.from("free_formula_sheets").upsert({ user_id: studentId, sheet: OTHER });
    expect(error).not.toBeNull();
  });
});
