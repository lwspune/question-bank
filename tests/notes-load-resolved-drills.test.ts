/**
 * Integration test for loadResolvedDrills — the Phase 2 reader that fetches
 * concept-tag drill lists from the DB at request time.
 *
 * Verifies:
 *   - Returns `Map<conceptSlug, string[]>` keyed by concept_slug
 *   - Empty Map when no tags exist for the subtopic
 *   - Filters out each concept's `pyqExampleId` from its drill list
 *     (the pyqExample is shown above the drill in the read mode — no duplicate)
 *   - Returns question UUIDs sorted ascending for deterministic order
 *     (insertion-order is non-deterministic across DB writes)
 *   - RLS-respecting: PRIVATE tags from another org don't leak when using anon
 *
 * Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import {
  loadResolvedDrills,
  type ConceptForResolver,
} from "@/lib/notes/loadResolvedDrills";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);
const SUBTOPIC_SLUG = `resolver-${RUN_ID}`;
const ORG_NAME = `Resolver Org ${RUN_ID}`;
const USER_EMAIL = `resolver-${RUN_ID}@test.local`;

describe.skipIf(!HAS_ENV)("loadResolvedDrills", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;
  let orgId: string;
  let userId: string;
  let publicQuestionA: string;
  let publicQuestionB: string;
  let publicQuestionC: string;
  let privateQuestionId: string;

  beforeAll(async () => {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
    anonClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } }
    );

    const { data: u } = await admin.auth.admin.createUser({
      email: USER_EMAIL,
      password: "resolver-test-1234",
      email_confirm: true,
    });
    userId = u.user!.id;

    const { data: org } = await admin
      .from("organizations").insert({ name: ORG_NAME }).select("id").single();
    orgId = org!.id;
    await admin.from("org_members").insert({ org_id: orgId, user_id: userId, role: "ADMIN" });

    const { data: ex } = await admin.from("exams").select("id").limit(1).single();
    const { data: sb } = await admin
      .from("subjects").select("id").eq("exam_id", ex!.id).limit(1).single();
    const { data: ch } = await admin
      .from("chapters").select("id").eq("subject_id", sb!.id).limit(1).single();

    const makeQuestion = async (suffix: string, visibility: "PUBLIC" | "PRIVATE") => {
      const { data } = await admin
        .from("questions")
        .insert({
          org_id: orgId,
          exam_id: ex!.id,
          subject_id: sb!.id,
          chapter_id: ch!.id,
          text: `resolver-${suffix} ${RUN_ID}`,
          difficulty: "EASY",
          content_hash: `resolver-${suffix}-${RUN_ID}`,
          visibility,
          created_by: userId,
        })
        .select("id")
        .single();
      return data!.id as string;
    };
    publicQuestionA = await makeQuestion("A", "PUBLIC");
    publicQuestionB = await makeQuestion("B", "PUBLIC");
    publicQuestionC = await makeQuestion("C", "PUBLIC");
    privateQuestionId = await makeQuestion("D-private", "PRIVATE");
  });

  afterAll(async () => {
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    if (userId) await admin.auth.admin.deleteUser(userId);
  });

  const buildConcepts = (): ConceptForResolver[] => [
    { slug: "concept-x", pyqExampleId: publicQuestionA },
    { slug: "concept-y", pyqExampleId: undefined },
  ];

  it("returns an empty Map when no tags exist for the subtopic", async () => {
    const drills = await loadResolvedDrills(
      admin,
      `nonexistent-${RUN_ID}`,
      buildConcepts()
    );
    expect(drills.size).toBe(0);
  });

  it("returns Map<conceptSlug, questionIds[]> sorted ascending by question_id", async () => {
    // Tag publicQuestionA, publicQuestionB, publicQuestionC on concept-y in
    // arbitrary insertion order; expect output sorted ascending.
    await admin.from("question_concept_tags").insert([
      { question_id: publicQuestionC, subtopic_slug: SUBTOPIC_SLUG, concept_slug: "concept-y" },
      { question_id: publicQuestionA, subtopic_slug: SUBTOPIC_SLUG, concept_slug: "concept-y" },
      { question_id: publicQuestionB, subtopic_slug: SUBTOPIC_SLUG, concept_slug: "concept-y" },
    ]);

    const drills = await loadResolvedDrills(admin, SUBTOPIC_SLUG, [
      { slug: "concept-y", pyqExampleId: undefined },
    ]);
    const list = drills.get("concept-y") ?? [];
    expect(list).toEqual([publicQuestionA, publicQuestionB, publicQuestionC].sort());
  });

  it("filters out each concept's pyqExampleId from its drill list", async () => {
    // Tag publicQuestionA on concept-x (which uses publicQuestionA as pyqExampleId)
    // along with B and C. Expect drill list to contain only B and C.
    await admin.from("question_concept_tags").insert([
      { question_id: publicQuestionA, subtopic_slug: SUBTOPIC_SLUG, concept_slug: "concept-x" },
      { question_id: publicQuestionB, subtopic_slug: SUBTOPIC_SLUG, concept_slug: "concept-x" },
      { question_id: publicQuestionC, subtopic_slug: SUBTOPIC_SLUG, concept_slug: "concept-x" },
    ]);

    const drills = await loadResolvedDrills(admin, SUBTOPIC_SLUG, buildConcepts());
    const list = drills.get("concept-x") ?? [];
    expect(list).not.toContain(publicQuestionA);
    expect(list).toEqual([publicQuestionB, publicQuestionC].sort());
  });

  it("anon client cannot see tags on PRIVATE questions (RLS-respecting)", async () => {
    await admin.from("question_concept_tags").insert([
      {
        question_id: privateQuestionId,
        subtopic_slug: SUBTOPIC_SLUG,
        concept_slug: "concept-y",
      },
    ]);

    const drills = await loadResolvedDrills(anonClient, SUBTOPIC_SLUG, [
      { slug: "concept-y", pyqExampleId: undefined },
    ]);
    const list = drills.get("concept-y") ?? [];
    expect(list).not.toContain(privateQuestionId);
  });

  it("omits concepts with zero tagged questions from the returned Map", async () => {
    const drills = await loadResolvedDrills(admin, SUBTOPIC_SLUG, [
      { slug: "concept-y", pyqExampleId: undefined },
      { slug: "concept-no-tags", pyqExampleId: undefined },
    ]);
    expect(drills.has("concept-no-tags")).toBe(false);
  });
});
