/**
 * "Ask a parent to pay" (migration 0244): the links table and its store,
 * against the test database. What is locked:
 *
 * - a student's live link for a pass is REUSED, not remade on every tap;
 * - a link near its end (under a day left) is replaced by a fresh one;
 * - nobody but the service role can read a link: a code is never listable;
 * - the database refuses an email as the name and a malformed code.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { findOrCreateParentLink, readParentLink } from "@/lib/billing/parentLinkStore";
import { mustSignIn } from "./helpers/fixture";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = Date.now();
const PASSWORD = "test-password-12345";
const EMAIL = `parent_link_${STAMP}@test.local`;
const PLAN = "mock-pass-6m";

describe.skipIf(!HAS_ENV)("parent_pay_links (0244)", () => {
  let admin: SupabaseClient;
  let student: SupabaseClient;
  let anon: SupabaseClient;
  let userId = "";

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    const created = await admin.auth.admin.createUser({ email: EMAIL, password: PASSWORD, email_confirm: true });
    if (created.error) throw new Error(`create user: ${created.error.message}`);
    userId = created.data.user!.id;
    student = createClient(url, anonKey, { auth: { persistSession: false } });
    anon = createClient(url, anonKey, { auth: { persistSession: false } });
    await mustSignIn("parent link student", student, { email: EMAIL, password: PASSWORD });
  });

  afterAll(async () => {
    if (!admin || !userId) return;
    await admin.from("parent_pay_links").delete().eq("user_id", userId);
    await admin.auth.admin.deleteUser(userId);
  });

  it("makes a link, then reuses it for the same pass", async () => {
    const now = Date.now();
    const first = await findOrCreateParentLink(admin, { userId, planId: PLAN, studentName: "Riya", nowMs: now });
    expect(first.code).toMatch(/^[A-Za-z0-9]{10}$/);
    expect(first.studentName).toBe("Riya");
    expect(Date.parse(first.expiresAt) - now).toBeGreaterThan(6.9 * 86_400_000);

    const again = await findOrCreateParentLink(admin, { userId, planId: PLAN, studentName: "Riya", nowMs: now + 60_000 });
    expect(again.code).toBe(first.code);

    const read = await readParentLink(admin, first.code);
    expect(read).toMatchObject({ code: first.code, userId, planId: PLAN, studentName: "Riya" });
  });

  it("replaces a link with under a day left", async () => {
    const now = Date.now();
    const first = await findOrCreateParentLink(admin, { userId, planId: PLAN, studentName: null, nowMs: now });
    const nearEnd = Date.parse(first.expiresAt) - 12 * 3_600_000;
    const fresh = await findOrCreateParentLink(admin, { userId, planId: PLAN, studentName: null, nowMs: nearEnd });
    expect(fresh.code).not.toBe(first.code);
  });

  it("reads nothing for an unknown or malformed code", async () => {
    await expect(readParentLink(admin, "ZZZZZZZZZZ")).resolves.toBeNull();
    await expect(readParentLink(admin, "not-a-code")).resolves.toBeNull();
  });

  it("is invisible to the student and to anon", async () => {
    const own = await student.from("parent_pay_links").select("code").eq("user_id", userId);
    expect(own.data ?? []).toHaveLength(0);
    const open = await anon.from("parent_pay_links").select("code").limit(1);
    expect(open.data ?? []).toHaveLength(0);
  });

  it("refuses an email as the name and a malformed code", async () => {
    const expires = new Date(Date.now() + 86_400_000).toISOString();
    const email = await admin
      .from("parent_pay_links")
      .insert({ code: "AbCdEfGh23", user_id: userId, plan_id: PLAN, student_name: "riya@gmail.com", expires_at: expires });
    expect(email.error?.code).toBe("23514");
    const badCode = await admin
      .from("parent_pay_links")
      .insert({ code: "AbCdEfGh2O", user_id: userId, plan_id: PLAN, expires_at: expires });
    expect(badCode.error?.code).toBe("23514");
  });
});
