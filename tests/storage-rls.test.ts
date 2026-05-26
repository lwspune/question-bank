/**
 * Storage RLS — verifies the bucket policies from migration 0008:
 *   - ADMIN can upload + delete inside their own org folder
 *   - ADMIN cannot write to another org's folder
 *   - TEACHER cannot write anywhere
 * Uses the live Supabase project; skipped if env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { TINY_PNG } from "./fixtures/tinyImage";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const BUCKET = "question-images";
const PASSWORD = "storage-rls-pw-1234";
const RUN_ID = randomUUID().slice(0, 8);
const ADMIN_A_EMAIL = `storage-admin-a-${RUN_ID}@test.local`;
const ADMIN_B_EMAIL = `storage-admin-b-${RUN_ID}@test.local`;
const TEACHER_A_EMAIL = `storage-teacher-${RUN_ID}@test.local`;

describe.skipIf(!HAS_ENV)("storage RLS — editor writes scoped by org", () => {
  let admin: SupabaseClient;
  let adminAClient: SupabaseClient;
  let adminBClient: SupabaseClient;
  let teacherClient: SupabaseClient;
  let adminAUserId: string;
  let adminBUserId: string;
  let teacherUserId: string;
  let orgAId: string;
  let orgBId: string;
  const uploadedPaths: string[] = [];

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    admin = createClient(url, serviceRole, { auth: { persistSession: false } });

    const { data: a } = await admin.auth.admin.createUser({
      email: ADMIN_A_EMAIL,
      password: PASSWORD,
      email_confirm: true,
    });
    adminAUserId = a.user!.id;
    const { data: b } = await admin.auth.admin.createUser({
      email: ADMIN_B_EMAIL,
      password: PASSWORD,
      email_confirm: true,
    });
    adminBUserId = b.user!.id;
    const { data: t } = await admin.auth.admin.createUser({
      email: TEACHER_A_EMAIL,
      password: PASSWORD,
      email_confirm: true,
    });
    teacherUserId = t.user!.id;

    const { data: orgA } = await admin
      .from("organizations")
      .insert({ name: `Storage Org A ${RUN_ID}` })
      .select("id")
      .single();
    orgAId = orgA!.id;
    const { data: orgB } = await admin
      .from("organizations")
      .insert({ name: `Storage Org B ${RUN_ID}` })
      .select("id")
      .single();
    orgBId = orgB!.id;

    await admin.from("org_members").insert([
      { org_id: orgAId, user_id: adminAUserId, role: "ADMIN" },
      { org_id: orgAId, user_id: teacherUserId, role: "TEACHER" },
      { org_id: orgBId, user_id: adminBUserId, role: "ADMIN" },
    ]);

    adminAClient = createClient(url, anon, { auth: { persistSession: false } });
    adminBClient = createClient(url, anon, { auth: { persistSession: false } });
    teacherClient = createClient(url, anon, { auth: { persistSession: false } });
    await adminAClient.auth.signInWithPassword({ email: ADMIN_A_EMAIL, password: PASSWORD });
    await adminBClient.auth.signInWithPassword({ email: ADMIN_B_EMAIL, password: PASSWORD });
    await teacherClient.auth.signInWithPassword({ email: TEACHER_A_EMAIL, password: PASSWORD });
  });

  afterAll(async () => {
    if (uploadedPaths.length > 0) {
      await admin.storage.from(BUCKET).remove(uploadedPaths);
    }
    if (orgAId) await admin.from("organizations").delete().eq("id", orgAId);
    if (orgBId) await admin.from("organizations").delete().eq("id", orgBId);
    if (adminAUserId) await admin.auth.admin.deleteUser(adminAUserId);
    if (adminBUserId) await admin.auth.admin.deleteUser(adminBUserId);
    if (teacherUserId) await admin.auth.admin.deleteUser(teacherUserId);
  });

  it("ADMIN A can upload to their own org folder", async () => {
    const path = `${orgAId}/${randomUUID()}.png`;
    const { error } = await adminAClient.storage
      .from(BUCKET)
      .upload(path, TINY_PNG, { contentType: "image/png" });
    expect(error).toBeNull();
    uploadedPaths.push(path);
  });

  it("ADMIN A cannot upload to a different org's folder", async () => {
    const path = `${orgBId}/${randomUUID()}.png`;
    const { error } = await adminAClient.storage
      .from(BUCKET)
      .upload(path, TINY_PNG, { contentType: "image/png" });
    expect(error).not.toBeNull();
  });

  it("TEACHER can upload to their own org folder (migration 0025 opens editor write)", async () => {
    const path = `${orgAId}/${randomUUID()}.png`;
    const { error } = await teacherClient.storage
      .from(BUCKET)
      .upload(path, TINY_PNG, { contentType: "image/png" });
    expect(error).toBeNull();
    uploadedPaths.push(path);
  });

  it("TEACHER cannot upload to a different org's folder", async () => {
    const path = `${orgBId}/${randomUUID()}.png`;
    const { error } = await teacherClient.storage
      .from(BUCKET)
      .upload(path, TINY_PNG, { contentType: "image/png" });
    expect(error).not.toBeNull();
  });

  it("ADMIN A can delete a file in their own org folder", async () => {
    const path = `${orgAId}/${randomUUID()}.png`;
    await adminAClient.storage
      .from(BUCKET)
      .upload(path, TINY_PNG, { contentType: "image/png" });
    const { error } = await adminAClient.storage.from(BUCKET).remove([path]);
    expect(error).toBeNull();
  });

  it("ADMIN B cannot delete a file in ADMIN A's org folder", async () => {
    const path = `${orgAId}/${randomUUID()}.png`;
    await adminAClient.storage
      .from(BUCKET)
      .upload(path, TINY_PNG, { contentType: "image/png" });
    uploadedPaths.push(path); // tracked for cleanup since the test should NOT delete it
    const { data, error } = await adminBClient.storage
      .from(BUCKET)
      .remove([path]);
    // Supabase storage returns success but with empty data when RLS blocks the delete.
    // Either an error or zero affected rows counts as denial.
    const denied = !!error || !data || data.length === 0;
    expect(denied).toBe(true);

    // Confirm the file still exists.
    const { data: list } = await admin.storage
      .from(BUCKET)
      .list(orgAId, { limit: 100, search: path.split("/")[1] });
    expect(list?.some((f) => path.endsWith(f.name))).toBe(true);
  });
});
