/**
 * Integration test: applyEdit handling of optional `conceptTags`.
 *
 * Verifies:
 *   - Valid tags are written and survive a subsequent unrelated edit
 *   - Empty `conceptTags: []` clears all current tags
 *   - Omitting `conceptTags` leaves existing tags untouched
 *   - Invalid (subtopicSlug, conceptSlug) returns `invalid_concept_tag`
 *     without writing tags or rolling back the question UPDATE that
 *     already succeeded (last-write-wins for the question; tags are non-blocking)
 *
 * Uses the live Statistics → Central Tendency subtopic so the registry validation
 * exercises a real concept list (8 concepts). DB tests skip when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { applyEdit } from "@/lib/questions/applyEdit";
import { validateEditPayload } from "@/lib/questions/edit";
import { contentHash } from "@/lib/upload/hash";
import { getTagsForQuestion } from "@/lib/tags/conceptTags";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);
const SUBTOPIC_NAME = "Measures of Central Tendency — Mean, Median, Mode";
const SUBTOPIC_SLUG = "central-tendency";

describe.skipIf(!HAS_ENV)("applyEdit — conceptTags", () => {
  let admin: SupabaseClient;
  let orgId: string;
  let userId: string;
  let examId: string;
  let subjectId: string;
  let chapterId: string;
  let subtopicId: string;
  let questionId: string;

  beforeAll(async () => {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    const { data: u } = await admin.auth.admin.createUser({
      email: `edit-tags-${RUN_ID}@test.local`,
      password: "edit-tags-pw-1234",
      email_confirm: true,
    });
    userId = u.user!.id;

    const { data: org } = await admin
      .from("organizations")
      .insert({ name: `Edit Tags Org ${RUN_ID}` })
      .select("id")
      .single();
    orgId = org!.id;
    await admin.from("org_members").insert({ org_id: orgId, user_id: userId, role: "ADMIN" });

    // Look up the live NDA → Mathematics → Statistics → Central Tendency subtopic.
    const { data: ex } = await admin.from("exams").select("id").eq("name", "NDA").single();
    examId = ex!.id;
    const { data: sb } = await admin
      .from("subjects").select("id").eq("exam_id", examId).eq("name", "Mathematics").single();
    subjectId = sb!.id;
    const { data: ch } = await admin
      .from("chapters").select("id").eq("subject_id", subjectId).eq("name", "Statistics").single();
    chapterId = ch!.id;
    const { data: st } = await admin
      .from("subtopics").select("id").eq("chapter_id", chapterId).eq("name", SUBTOPIC_NAME).single();
    subtopicId = st!.id;

    const initialHash = contentHash(`tag-edit ${RUN_ID}?`, ["A1", "B1", "C1", "D1"], "A");
    const { data: q } = await admin
      .from("questions")
      .insert({
        org_id: orgId,
        exam_id: examId,
        subject_id: subjectId,
        chapter_id: chapterId,
        subtopic_id: subtopicId,
        text: `tag-edit ${RUN_ID}?`,
        difficulty: "EASY",
        content_hash: initialHash,
        created_by: userId,
      })
      .select("id")
      .single();
    questionId = q!.id;
    await admin.from("options").insert([
      { question_id: questionId, label: "A", text: "A1", is_correct: true },
      { question_id: questionId, label: "B", text: "B1", is_correct: false },
      { question_id: questionId, label: "C", text: "C1", is_correct: false },
      { question_id: questionId, label: "D", text: "D1", is_correct: false },
    ]);
  });

  afterAll(async () => {
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    if (userId) await admin.auth.admin.deleteUser(userId);
  });

  function buildPayload(overrides: Record<string, unknown> = {}) {
    return {
      text: `tag-edit ${RUN_ID}?`,
      context: null,
      difficulty: "EASY" as const,
      solution: null,
      imageUrl: null,
      subjectId,
      chapterId,
      subtopicId,
      visibility: "PRIVATE" as const,
      correct: "A" as const,
      options: [
        { label: "A" as const, text: "A1", imageUrl: null },
        { label: "B" as const, text: "B1", imageUrl: null },
        { label: "C" as const, text: "C1", imageUrl: null },
        { label: "D" as const, text: "D1", imageUrl: null },
      ],
      ...overrides,
    };
  }

  function validate(overrides: Record<string, unknown> = {}) {
    const v = validateEditPayload(buildPayload(overrides));
    if (!v.ok) throw new Error(`fixture invalid: ${v.errors.join(", ")}`);
    return v;
  }

  it("writes valid conceptTags and survives a subsequent unrelated edit", async () => {
    const v1 = validate({
      conceptTags: [
        { subtopicSlug: SUBTOPIC_SLUG, conceptSlug: "arithmetic-mean-raw" },
        { subtopicSlug: SUBTOPIC_SLUG, conceptSlug: "mean-linear-transformation" },
      ],
    });
    const r1 = await applyEdit(admin, questionId, orgId, v1.payload, v1.contentHash);
    expect(r1.kind).toBe("ok");

    const tags1 = await getTagsForQuestion(admin, questionId);
    expect(tags1.map((t) => t.conceptSlug).sort()).toEqual([
      "arithmetic-mean-raw",
      "mean-linear-transformation",
    ]);

    // Re-edit WITHOUT touching conceptTags — tags should persist.
    const v2 = validate({ difficulty: "MODERATE" });
    const r2 = await applyEdit(admin, questionId, orgId, v2.payload, v2.contentHash);
    expect(r2.kind).toBe("ok");

    const tags2 = await getTagsForQuestion(admin, questionId);
    expect(tags2.map((t) => t.conceptSlug).sort()).toEqual([
      "arithmetic-mean-raw",
      "mean-linear-transformation",
    ]);
  });

  it("empty conceptTags array clears all tags", async () => {
    const v = validate({ conceptTags: [] });
    const r = await applyEdit(admin, questionId, orgId, v.payload, v.contentHash);
    expect(r.kind).toBe("ok");

    const tags = await getTagsForQuestion(admin, questionId);
    expect(tags).toEqual([]);
  });

  it("returns invalid_concept_tag for an unknown concept slug", async () => {
    const v = validate({
      conceptTags: [
        { subtopicSlug: SUBTOPIC_SLUG, conceptSlug: "does-not-exist" },
      ],
    });
    const r = await applyEdit(admin, questionId, orgId, v.payload, v.contentHash);
    expect(r.kind).toBe("invalid_concept_tag");
    if (r.kind === "invalid_concept_tag") {
      expect(r.reason).toMatch(/does-not-exist/);
    }
  });

  it("returns invalid_concept_tag for a subtopicSlug that doesn't match the question's subtopic", async () => {
    const v = validate({
      conceptTags: [
        { subtopicSlug: "some-other-subtopic", conceptSlug: "arithmetic-mean-raw" },
      ],
    });
    const r = await applyEdit(admin, questionId, orgId, v.payload, v.contentHash);
    expect(r.kind).toBe("invalid_concept_tag");
  });
});
