/**
 * RLS smoke test for public.quiz_atoms (migration 0030) — global Quiz-Factory
 * content: admin-read, service-role-only writes.
 *
 * Verifies:
 *   - service-role can seed an atom (bypasses RLS)
 *   - an ADMIN can read the pool
 *   - anon CANNOT read it
 *   - a TEACHER (authenticated non-admin) CANNOT read it
 *   - a TEACHER/ADMIN cannot INSERT via JWT (no write policy → service-role only)
 *
 * Skipped when env is missing OR the table doesn't exist yet (migration unapplied).
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "quiz-rls-test-1234";
const RUN_ID = randomUUID().slice(0, 8);
const ADMIN_EMAIL = `quiz-admin-${RUN_ID}@test.local`;
const TEACHER_EMAIL = `quiz-teacher-${RUN_ID}@test.local`;
const ORG_NAME = `Quiz Org ${RUN_ID}`;
const ATOM_KEY = `rls-test-concept:formula:${RUN_ID}`;

describe.skipIf(!HAS_ENV)("quiz_atoms RLS", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;
  let adminClient: SupabaseClient;
  let teacherClient: SupabaseClient;
  let adminId: string;
  let teacherId: string;
  let orgId: string;
  let tableMissing = false;

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    admin = createClient(url, serviceRole, { auth: { persistSession: false } });

    // If the migration isn't applied yet, skip the suite gracefully.
    const probe = await admin.from("quiz_atoms").select("atom_key").limit(1);
    if (probe.error && /relation .* does not exist/i.test(probe.error.message)) {
      tableMissing = true;
      return;
    }

    const [{ data: a }, { data: t }] = await Promise.all([
      admin.auth.admin.createUser({ email: ADMIN_EMAIL, password: PASSWORD, email_confirm: true }),
      admin.auth.admin.createUser({ email: TEACHER_EMAIL, password: PASSWORD, email_confirm: true }),
    ]);
    adminId = a.user!.id;
    teacherId = t.user!.id;

    const { data: org } = await admin
      .from("organizations")
      .insert({ name: ORG_NAME })
      .select("id")
      .single();
    orgId = org!.id;

    await admin.from("org_members").insert([
      { org_id: orgId, user_id: adminId, role: "ADMIN" },
      { org_id: orgId, user_id: teacherId, role: "TEACHER" },
    ]);

    await admin.from("quiz_atoms").insert({
      atom_key: ATOM_KEY,
      exam: "NDA",
      subject_route: "nda-maths",
      chapter_slug: "rls-test",
      subtopic_slug: "rls-test",
      concept_slug: "rls-test-concept",
      source_kind: "formula",
      source_index: 0,
      stem: "rls test",
      correct: "x",
      status: "auto",
      source_fingerprint: `fp-${RUN_ID}`,
    });

    anonClient = createClient(url, anon, { auth: { persistSession: false } });
    adminClient = createClient(url, anon, { auth: { persistSession: false } });
    teacherClient = createClient(url, anon, { auth: { persistSession: false } });
    await Promise.all([
      adminClient.auth.signInWithPassword({ email: ADMIN_EMAIL, password: PASSWORD }),
      teacherClient.auth.signInWithPassword({ email: TEACHER_EMAIL, password: PASSWORD }),
    ]);
  });

  afterAll(async () => {
    if (tableMissing) return;
    await admin.from("quiz_atoms").delete().eq("atom_key", ATOM_KEY);
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    if (adminId) await admin.auth.admin.deleteUser(adminId);
    if (teacherId) await admin.auth.admin.deleteUser(teacherId);
  });

  it("ADMIN can read the atom pool", async () => {
    if (tableMissing) return;
    const { data } = await adminClient.from("quiz_atoms").select("atom_key").eq("atom_key", ATOM_KEY);
    expect(data?.length).toBe(1);
  });

  it("anon CANNOT read the atom pool", async () => {
    if (tableMissing) return;
    const { data } = await anonClient.from("quiz_atoms").select("atom_key").eq("atom_key", ATOM_KEY);
    expect(data?.length ?? 0).toBe(0);
  });

  it("TEACHER (non-admin) CANNOT read the atom pool", async () => {
    if (tableMissing) return;
    const { data } = await teacherClient.from("quiz_atoms").select("atom_key").eq("atom_key", ATOM_KEY);
    expect(data?.length ?? 0).toBe(0);
  });

  it("ADMIN cannot INSERT via JWT (writes are service-role only)", async () => {
    if (tableMissing) return;
    const forged = `forged:formula:${RUN_ID}`;
    const { error } = await adminClient.from("quiz_atoms").insert({
      atom_key: forged,
      exam: "NDA",
      subject_route: "nda-maths",
      chapter_slug: "rls-test",
      subtopic_slug: "rls-test",
      concept_slug: "rls-test-concept",
      source_kind: "formula",
      source_index: 1,
      stem: "forged",
      correct: "x",
      status: "auto",
      source_fingerprint: `fp2-${RUN_ID}`,
    });
    const { data: check } = await admin.from("quiz_atoms").select("atom_key").eq("atom_key", forged);
    expect(check?.length ?? 0).toBe(0);
    expect(error !== null || (check?.length ?? 0) === 0).toBe(true);
  });
});
