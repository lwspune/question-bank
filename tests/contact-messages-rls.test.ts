/**
 * Integration test for contact_messages RLS (migration 0102).
 *
 * The table is RLS-enabled with NO policies → locked to the service-role client
 * only. The load-bearing property: neither anon nor a signed-in (student)
 * account can read or write it; only service-role (POST /api/contact + the
 * superadmin queue) can. Mirrors teacher-access-rls.test.ts / the entitlements
 * service-role-only model.
 *
 * THE ORDER OF THESE TESTS IS LOAD-BEARING. The service-role insert runs FIRST
 * so that the "anon reads zero rows" assertions run against a NON-EMPTY table.
 * Run against an empty table they pass trivially and prove nothing at all.
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

const PASSWORD = "contact-msg-test-1234";
const RUN_ID = randomUUID().slice(0, 8);
const USER_EMAIL = `cm-user-${RUN_ID}@test.local`;

describe.skipIf(!HAS_ENV)("contact_messages RLS", () => {
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
    if (insertedId) await admin.from("contact_messages").delete().eq("id", insertedId);
    if (userId) await admin.auth.admin.deleteUser(userId);
  });

  it("service-role can insert a message", async () => {
    const { data, error } = await admin
      .from("contact_messages")
      .insert({
        name: `Test ${RUN_ID}`,
        email: "t@example.com",
        message: "Test message",
      })
      .select("id")
      .single();
    expect(error).toBeNull();
    insertedId = (data?.id as string) ?? null;
    expect(insertedId).toBeTruthy();
  });

  it("anon CANNOT insert a message", async () => {
    const { error } = await anonClient
      .from("contact_messages")
      .insert({ name: "Anon", email: "a@example.com", message: "hi" });
    expect(error).not.toBeNull(); // no INSERT policy → RLS denies
  });

  it("a signed-in student CANNOT insert a message", async () => {
    const { error } = await userClient
      .from("contact_messages")
      .insert({ name: "Student", email: "s@example.com", message: "hi" });
    expect(error).not.toBeNull();
  });

  it("anon CANNOT read the queue (table is non-empty by now)", async () => {
    expect(insertedId).toBeTruthy(); // the assertion below is vacuous otherwise
    const { data } = await anonClient.from("contact_messages").select("id");
    expect(data ?? []).toHaveLength(0); // no SELECT policy → zero rows
  });

  it("a signed-in student CANNOT read the queue", async () => {
    expect(insertedId).toBeTruthy();
    const { data } = await userClient.from("contact_messages").select("id");
    expect(data ?? []).toHaveLength(0);
  });

  it("service-role reads + updates status", async () => {
    expect(insertedId).toBeTruthy();
    const upd = await admin
      .from("contact_messages")
      .update({ status: "replied" })
      .eq("id", insertedId!);
    expect(upd.error).toBeNull();
    const { data } = await admin
      .from("contact_messages")
      .select("status")
      .eq("id", insertedId!)
      .single();
    expect(data?.status).toBe("replied");
  });

  it("the status CHECK rejects an unknown value", async () => {
    const { error } = await admin
      .from("contact_messages")
      .update({ status: "archived" })
      .eq("id", insertedId!);
    expect(error).not.toBeNull(); // contact_messages_status_check
  });

  it("name / email / message are NOT NULL", async () => {
    const { error } = await admin
      .from("contact_messages")
      .insert({ name: "No message", email: "x@example.com" });
    expect(error).not.toBeNull();
  });
});
