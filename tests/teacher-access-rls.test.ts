/**
 * Integration test for teacher_access_requests RLS (migration 0060).
 *
 * The table is RLS-enabled with NO policies → locked to the service-role client
 * only. The load-bearing property: neither anon nor a signed-in (student)
 * account can read or write it; only service-role (the API route + superadmin
 * queue) can. Mirrors the entitlements service-role-only model.
 *
 * Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "teacher-access-test-1234";
const RUN_ID = randomUUID().slice(0, 8);
const USER_EMAIL = `ta-user-${RUN_ID}@test.local`;

describe.skipIf(!HAS_ENV)("teacher_access_requests RLS", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;
  let userClient: SupabaseClient;
  let userId: string;
  let insertedId: string | null = null;

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    admin = createClient(url, serviceRole, { auth: { persistSession: false } });

    const { data: user } = await admin.auth.admin.createUser({
      email: USER_EMAIL,
      password: PASSWORD,
      email_confirm: true,
    });
    userId = user.user!.id;

    anonClient = createClient(url, anon, { auth: { persistSession: false } });
    userClient = createClient(url, anon, { auth: { persistSession: false } });
    await userClient.auth.signInWithPassword({ email: USER_EMAIL, password: PASSWORD });
  });

  afterAll(async () => {
    if (insertedId) await admin.from("teacher_access_requests").delete().eq("id", insertedId);
    if (userId) await admin.auth.admin.deleteUser(userId);
  });

  it("service-role can insert a request", async () => {
    const { data, error } = await admin
      .from("teacher_access_requests")
      .insert({ name: `Test ${RUN_ID}`, email: "t@example.com", consent: true })
      .select("id")
      .single();
    expect(error).toBeNull();
    insertedId = (data?.id as string) ?? null;
    expect(insertedId).toBeTruthy();
  });

  it("anon CANNOT insert a request", async () => {
    const { error } = await anonClient
      .from("teacher_access_requests")
      .insert({ name: "Anon", email: "a@example.com", consent: true });
    expect(error).not.toBeNull(); // no INSERT policy → RLS denies
  });

  it("a signed-in student CANNOT insert a request", async () => {
    const { error } = await userClient
      .from("teacher_access_requests")
      .insert({ name: "Student", email: "s@example.com", consent: true });
    expect(error).not.toBeNull();
  });

  it("anon CANNOT read the queue", async () => {
    const { data } = await anonClient.from("teacher_access_requests").select("id");
    expect(data ?? []).toHaveLength(0); // no SELECT policy → zero rows
  });

  it("a signed-in student CANNOT read the queue", async () => {
    const { data } = await userClient.from("teacher_access_requests").select("id");
    expect(data ?? []).toHaveLength(0);
  });

  it("service-role reads + updates status", async () => {
    expect(insertedId).toBeTruthy();
    const upd = await admin
      .from("teacher_access_requests")
      .update({ status: "provisioned" })
      .eq("id", insertedId!);
    expect(upd.error).toBeNull();
    const { data } = await admin
      .from("teacher_access_requests")
      .select("status")
      .eq("id", insertedId!)
      .single();
    expect(data?.status).toBe("provisioned");
  });

  it("the status CHECK rejects an unknown value", async () => {
    const { error } = await admin
      .from("teacher_access_requests")
      .update({ status: "archived" })
      .eq("id", insertedId!);
    expect(error).not.toBeNull(); // teacher_access_requests_status_check
  });
});
