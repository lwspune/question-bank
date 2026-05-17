/**
 * Helper API tests for src/lib/tags/conceptTags.ts.
 *
 * Covers the four exported functions via DB integration:
 *   - getTagsForQuestion
 *   - setTagsForQuestion (diff: added / removed / kept)
 *   - getQuestionIdsForConcept
 *   - loadConceptDrills (subtopic-scoped, conceptSlug → questionIds[])
 *
 * Uses service-role client throughout — these tests verify the API shape, not
 * RLS gates (separate concept-tags-rls.test.ts covers those).
 *
 * Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import {
  getTagsForQuestion,
  setTagsForQuestion,
  getQuestionIdsForConcept,
  loadConceptDrills,
} from "@/lib/tags/conceptTags";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);
const ORG_NAME = `Tag Helper Org ${RUN_ID}`;
const SUBTOPIC_SLUG = `test-subtopic-${RUN_ID}`;
const USER_EMAIL = `tag-helper-${RUN_ID}@test.local`;

describe.skipIf(!HAS_ENV)("conceptTags helper API", () => {
  let admin: SupabaseClient;
  let orgId: string;
  let userId: string;
  let questionAId: string;
  let questionBId: string;

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    admin = createClient(url, serviceRole, { auth: { persistSession: false } });

    const { data: u } = await admin.auth.admin.createUser({
      email: USER_EMAIL,
      password: "helper-test-1234",
      email_confirm: true,
    });
    userId = u.user!.id;

    const { data: org } = await admin.from("organizations").insert({ name: ORG_NAME }).select("id").single();
    orgId = org!.id;
    await admin.from("org_members").insert({ org_id: orgId, user_id: userId, role: "ADMIN" });

    const { data: ex } = await admin.from("exams").select("id").limit(1).single();
    const { data: sb } = await admin.from("subjects").select("id").eq("exam_id", ex!.id).limit(1).single();
    const { data: ch } = await admin.from("chapters").select("id").eq("subject_id", sb!.id).limit(1).single();

    const { data: qA, error: qAErr } = await admin
      .from("questions")
      .insert({
        org_id: orgId,
        exam_id: ex!.id,
        subject_id: sb!.id,
        chapter_id: ch!.id,
        text: `helper-A ${RUN_ID}`,
        difficulty: "EASY",
        content_hash: `helper-A-${RUN_ID}`,
        visibility: "PUBLIC",
        created_by: userId,
      })
      .select("id")
      .single();
    if (qAErr || !qA) throw new Error(`question A insert: ${qAErr?.message ?? "no data"}`);
    questionAId = qA.id;

    const { data: qB, error: qBErr } = await admin
      .from("questions")
      .insert({
        org_id: orgId,
        exam_id: ex!.id,
        subject_id: sb!.id,
        chapter_id: ch!.id,
        text: `helper-B ${RUN_ID}`,
        difficulty: "MODERATE",
        content_hash: `helper-B-${RUN_ID}`,
        visibility: "PUBLIC",
        created_by: userId,
      })
      .select("id")
      .single();
    if (qBErr || !qB) throw new Error(`question B insert: ${qBErr?.message ?? "no data"}`);
    questionBId = qB.id;
  });

  afterAll(async () => {
    if (questionAId) await admin.from("questions").delete().eq("id", questionAId);
    if (questionBId) await admin.from("questions").delete().eq("id", questionBId);
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    if (userId) await admin.auth.admin.deleteUser(userId);
  });

  it("getTagsForQuestion returns [] for a question with no tags", async () => {
    const tags = await getTagsForQuestion(admin, questionAId);
    expect(tags).toEqual([]);
  });

  it("setTagsForQuestion inserts new tags and reports added count", async () => {
    const result = await setTagsForQuestion(admin, questionAId, [
      { subtopicSlug: SUBTOPIC_SLUG, conceptSlug: "concept-1" },
      { subtopicSlug: SUBTOPIC_SLUG, conceptSlug: "concept-2" },
    ]);
    expect(result).toEqual({ added: 2, removed: 0, kept: 0 });

    const tags = await getTagsForQuestion(admin, questionAId);
    expect(tags.map((t) => t.conceptSlug).sort()).toEqual(["concept-1", "concept-2"]);
  });

  it("setTagsForQuestion diffs correctly: keeps shared, adds new, removes missing", async () => {
    // Currently: concept-1, concept-2. Setting to: concept-2, concept-3.
    const result = await setTagsForQuestion(admin, questionAId, [
      { subtopicSlug: SUBTOPIC_SLUG, conceptSlug: "concept-2" },
      { subtopicSlug: SUBTOPIC_SLUG, conceptSlug: "concept-3" },
    ]);
    expect(result).toEqual({ added: 1, removed: 1, kept: 1 });

    const tags = await getTagsForQuestion(admin, questionAId);
    expect(tags.map((t) => t.conceptSlug).sort()).toEqual(["concept-2", "concept-3"]);
  });

  it("setTagsForQuestion with empty array removes all tags", async () => {
    const result = await setTagsForQuestion(admin, questionAId, []);
    expect(result.removed).toBe(2);
    expect(result.added).toBe(0);
    const tags = await getTagsForQuestion(admin, questionAId);
    expect(tags).toEqual([]);
  });

  it("setTagsForQuestion is idempotent — second call with same set is a no-op", async () => {
    await setTagsForQuestion(admin, questionAId, [
      { subtopicSlug: SUBTOPIC_SLUG, conceptSlug: "concept-1" },
    ]);
    const second = await setTagsForQuestion(admin, questionAId, [
      { subtopicSlug: SUBTOPIC_SLUG, conceptSlug: "concept-1" },
    ]);
    expect(second).toEqual({ added: 0, removed: 0, kept: 1 });
  });

  it("setTagsForQuestion stamps taggedByLlm flag when opts.taggedByLlm is true", async () => {
    await setTagsForQuestion(admin, questionAId, []);
    await setTagsForQuestion(
      admin,
      questionAId,
      [{ subtopicSlug: SUBTOPIC_SLUG, conceptSlug: "concept-llm" }],
      { taggedByLlm: true }
    );
    const tags = await getTagsForQuestion(admin, questionAId);
    expect(tags).toHaveLength(1);
    expect(tags[0].taggedByLlm).toBe(true);
  });

  it("getQuestionIdsForConcept returns matching question_ids across rows", async () => {
    await setTagsForQuestion(admin, questionAId, [
      { subtopicSlug: SUBTOPIC_SLUG, conceptSlug: "shared-concept" },
    ]);
    await setTagsForQuestion(admin, questionBId, [
      { subtopicSlug: SUBTOPIC_SLUG, conceptSlug: "shared-concept" },
    ]);

    const ids = await getQuestionIdsForConcept(admin, SUBTOPIC_SLUG, "shared-concept");
    expect(ids.sort()).toEqual([questionAId, questionBId].sort());
  });

  it("loadConceptDrills returns a Map keyed by conceptSlug", async () => {
    // Reset: A → concept-a + shared; B → concept-b + shared
    await setTagsForQuestion(admin, questionAId, [
      { subtopicSlug: SUBTOPIC_SLUG, conceptSlug: "concept-a" },
      { subtopicSlug: SUBTOPIC_SLUG, conceptSlug: "shared" },
    ]);
    await setTagsForQuestion(admin, questionBId, [
      { subtopicSlug: SUBTOPIC_SLUG, conceptSlug: "concept-b" },
      { subtopicSlug: SUBTOPIC_SLUG, conceptSlug: "shared" },
    ]);

    const drills = await loadConceptDrills(admin, SUBTOPIC_SLUG);
    expect(drills.get("concept-a")?.sort()).toEqual([questionAId]);
    expect(drills.get("concept-b")?.sort()).toEqual([questionBId]);
    expect(drills.get("shared")?.sort()).toEqual([questionAId, questionBId].sort());
  });

  it("loadConceptDrills returns an empty Map when no tags exist in subtopic", async () => {
    const drills = await loadConceptDrills(admin, `nonexistent-${RUN_ID}`);
    expect(drills.size).toBe(0);
  });
});
