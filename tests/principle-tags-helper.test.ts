/**
 * Helper API tests for src/lib/tags/principleTags.ts.
 *
 * Mirrors tests/concept-tags-helper.test.ts but for the principle-slug-only
 * shape — principle tags don't carry a subtopic_slug because principles are
 * horizontal (cross-subtopic) by design.
 *
 * Covers:
 *   - getTagsForQuestion
 *   - setTagsForQuestion (diff: added / removed / kept; LLM flag; idempotency)
 *   - getQuestionIdsForPrinciple
 *   - loadPrincipleQuestionIds (batch — Map<slug, questionIds[]>)
 *
 * Uses service-role client throughout — RLS gates are covered separately in
 * tests/principle-tags-rls.test.ts.
 *
 * Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import {
  getTagsForQuestion,
  setTagsForQuestion,
  getQuestionIdsForPrinciple,
  loadPrincipleQuestionIds,
} from "@/lib/tags/principleTags";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);
const ORG_NAME = `Principle Tag Helper Org ${RUN_ID}`;
const USER_EMAIL = `principle-tag-helper-${RUN_ID}@test.local`;

describe.skipIf(!HAS_ENV)("principleTags helper API", () => {
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
        text: `principle-helper-A ${RUN_ID}`,
        difficulty: "EASY",
        content_hash: `principle-helper-A-${RUN_ID}`,
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
        text: `principle-helper-B ${RUN_ID}`,
        difficulty: "MODERATE",
        content_hash: `principle-helper-B-${RUN_ID}`,
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
      `principle-helper-${RUN_ID}-a`,
      `principle-helper-${RUN_ID}-b`,
    ]);
    expect(result).toEqual({ added: 2, removed: 0, kept: 0 });

    const tags = await getTagsForQuestion(admin, questionAId);
    expect(tags.map((t) => t.principleSlug).sort()).toEqual([
      `principle-helper-${RUN_ID}-a`,
      `principle-helper-${RUN_ID}-b`,
    ]);
  });

  it("setTagsForQuestion diffs correctly: keeps shared, adds new, removes missing", async () => {
    // Currently: a, b. Setting to: b, c.
    const result = await setTagsForQuestion(admin, questionAId, [
      `principle-helper-${RUN_ID}-b`,
      `principle-helper-${RUN_ID}-c`,
    ]);
    expect(result).toEqual({ added: 1, removed: 1, kept: 1 });

    const tags = await getTagsForQuestion(admin, questionAId);
    expect(tags.map((t) => t.principleSlug).sort()).toEqual([
      `principle-helper-${RUN_ID}-b`,
      `principle-helper-${RUN_ID}-c`,
    ]);
  });

  it("setTagsForQuestion with empty array removes all tags", async () => {
    const result = await setTagsForQuestion(admin, questionAId, []);
    expect(result.removed).toBe(2);
    expect(result.added).toBe(0);
    const tags = await getTagsForQuestion(admin, questionAId);
    expect(tags).toEqual([]);
  });

  it("setTagsForQuestion is idempotent — second call with same set is a no-op", async () => {
    await setTagsForQuestion(admin, questionAId, [`principle-helper-${RUN_ID}-a`]);
    const second = await setTagsForQuestion(admin, questionAId, [`principle-helper-${RUN_ID}-a`]);
    expect(second).toEqual({ added: 0, removed: 0, kept: 1 });
  });

  it("setTagsForQuestion stamps taggedByLlm flag when opts.taggedByLlm is true", async () => {
    await setTagsForQuestion(admin, questionAId, []);
    await setTagsForQuestion(admin, questionAId, [`principle-helper-${RUN_ID}-llm`], {
      taggedByLlm: true,
    });
    const tags = await getTagsForQuestion(admin, questionAId);
    expect(tags).toHaveLength(1);
    expect(tags[0].taggedByLlm).toBe(true);
  });

  it("getQuestionIdsForPrinciple returns matching question_ids across rows", async () => {
    const shared = `principle-helper-${RUN_ID}-shared`;
    await setTagsForQuestion(admin, questionAId, [shared]);
    await setTagsForQuestion(admin, questionBId, [shared]);

    const ids = await getQuestionIdsForPrinciple(admin, shared);
    expect(ids.sort()).toEqual([questionAId, questionBId].sort());
  });

  it("loadPrincipleQuestionIds batch-loads multiple slugs into a Map", async () => {
    const slugA = `principle-helper-${RUN_ID}-only-a`;
    const slugB = `principle-helper-${RUN_ID}-only-b`;
    const shared = `principle-helper-${RUN_ID}-batch-shared`;
    await setTagsForQuestion(admin, questionAId, [slugA, shared]);
    await setTagsForQuestion(admin, questionBId, [slugB, shared]);

    const map = await loadPrincipleQuestionIds(admin, [slugA, slugB, shared]);
    expect(map.get(slugA)?.sort()).toEqual([questionAId]);
    expect(map.get(slugB)?.sort()).toEqual([questionBId]);
    expect(map.get(shared)?.sort()).toEqual([questionAId, questionBId].sort());
  });

  it("loadPrincipleQuestionIds returns an empty Map when no slugs match", async () => {
    const map = await loadPrincipleQuestionIds(admin, [`nonexistent-${RUN_ID}-x`]);
    expect(map.size).toBe(0);
  });

  it("getQuestionIdsForPrinciple returns [] for an unknown slug", async () => {
    const ids = await getQuestionIdsForPrinciple(admin, `nonexistent-${RUN_ID}-y`);
    expect(ids).toEqual([]);
  });
});
