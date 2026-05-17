/**
 * DB integration test for queryQuestions when filters.principleSlug is set.
 *
 * Verifies:
 *   - Setting principleSlug narrows results to questions tagged with that slug.
 *   - principleSlug AND-composes with other filters (difficulty, exam, etc.).
 *   - An unknown principleSlug returns zero rows (no crash on empty `.in("id", [])`).
 *   - principleSlug = null behaves as if absent.
 *
 * Uses service-role client to control test fixtures end-to-end.
 * Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { queryQuestions } from "@/lib/questions/query";
import { EMPTY_FILTERS } from "@/lib/questions/filters";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);
const ORG_NAME = `QPrinciple Org ${RUN_ID}`;
const USER_EMAIL = `qprinciple-${RUN_ID}@test.local`;
const PRINCIPLE_A = `qprinciple-${RUN_ID}-a`;
const PRINCIPLE_B = `qprinciple-${RUN_ID}-b`;

describe.skipIf(!HAS_ENV)("queryQuestions with principleSlug filter", () => {
  let admin: SupabaseClient;
  let orgId: string;
  let userId: string;
  let examId: string;
  let subjectId: string;
  let chapterId: string;
  let easyQId: string;
  let hardQId: string;
  let untaggedQId: string;

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    admin = createClient(url, serviceRole, { auth: { persistSession: false } });

    const { data: u } = await admin.auth.admin.createUser({
      email: USER_EMAIL,
      password: "qprinciple-test-1234",
      email_confirm: true,
    });
    userId = u.user!.id;

    const { data: org } = await admin.from("organizations").insert({ name: ORG_NAME }).select("id").single();
    orgId = org!.id;
    await admin.from("org_members").insert({ org_id: orgId, user_id: userId, role: "ADMIN" });

    const { data: ex } = await admin.from("exams").select("id").limit(1).single();
    examId = ex!.id;
    const { data: sb } = await admin.from("subjects").select("id").eq("exam_id", examId).limit(1).single();
    subjectId = sb!.id;
    const { data: ch } = await admin.from("chapters").select("id").eq("subject_id", subjectId).limit(1).single();
    chapterId = ch!.id;

    // Three questions: easy + tagged A, hard + tagged A, easy + untagged
    const inserts = await admin
      .from("questions")
      .insert([
        {
          org_id: orgId,
          exam_id: examId,
          subject_id: subjectId,
          chapter_id: chapterId,
          text: `qprinciple easy tagged ${RUN_ID}`,
          difficulty: "EASY",
          content_hash: `qprinciple-easy-tagged-${RUN_ID}`,
          visibility: "PUBLIC",
          created_by: userId,
        },
        {
          org_id: orgId,
          exam_id: examId,
          subject_id: subjectId,
          chapter_id: chapterId,
          text: `qprinciple hard tagged ${RUN_ID}`,
          difficulty: "HARD",
          content_hash: `qprinciple-hard-tagged-${RUN_ID}`,
          visibility: "PUBLIC",
          created_by: userId,
        },
        {
          org_id: orgId,
          exam_id: examId,
          subject_id: subjectId,
          chapter_id: chapterId,
          text: `qprinciple easy untagged ${RUN_ID}`,
          difficulty: "EASY",
          content_hash: `qprinciple-easy-untagged-${RUN_ID}`,
          visibility: "PUBLIC",
          created_by: userId,
        },
      ])
      .select("id, difficulty");
    easyQId = inserts.data!.find((r) => r.difficulty === "EASY" && r.id !== (inserts.data!.find((x) => x.difficulty === "EASY" && x.id !== r.id)?.id))!.id;
    // Simpler: just pull all three and resolve by hash:
    const byHash = await admin
      .from("questions")
      .select("id, content_hash")
      .in("content_hash", [
        `qprinciple-easy-tagged-${RUN_ID}`,
        `qprinciple-hard-tagged-${RUN_ID}`,
        `qprinciple-easy-untagged-${RUN_ID}`,
      ]);
    const map = new Map(byHash.data!.map((r) => [r.content_hash, r.id]));
    easyQId = map.get(`qprinciple-easy-tagged-${RUN_ID}`)!;
    hardQId = map.get(`qprinciple-hard-tagged-${RUN_ID}`)!;
    untaggedQId = map.get(`qprinciple-easy-untagged-${RUN_ID}`)!;

    // Tag easy + hard with PRINCIPLE_A. Tag nothing with PRINCIPLE_B (for empty-set test).
    await admin.from("question_principle_tags").insert([
      { question_id: easyQId, principle_slug: PRINCIPLE_A },
      { question_id: hardQId, principle_slug: PRINCIPLE_A },
    ]);
  });

  afterAll(async () => {
    if (easyQId) await admin.from("questions").delete().eq("id", easyQId);
    if (hardQId) await admin.from("questions").delete().eq("id", hardQId);
    if (untaggedQId) await admin.from("questions").delete().eq("id", untaggedQId);
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    if (userId) await admin.auth.admin.deleteUser(userId);
  });

  it("returns only tagged questions when principleSlug is set", async () => {
    const result = await queryQuestions(admin, orgId, {
      ...EMPTY_FILTERS,
      principleSlug: PRINCIPLE_A,
    });
    const ids = result.rows.map((r) => r.id).sort();
    expect(ids).toEqual([easyQId, hardQId].sort());
    expect(result.totalCount).toBe(2);
  });

  it("AND-composes with other filters (difficulty=HARD narrows to 1)", async () => {
    const result = await queryQuestions(admin, orgId, {
      ...EMPTY_FILTERS,
      principleSlug: PRINCIPLE_A,
      difficulties: ["HARD"],
    });
    expect(result.rows.map((r) => r.id)).toEqual([hardQId]);
    expect(result.totalCount).toBe(1);
  });

  it("returns zero rows for a principleSlug with no tagged questions", async () => {
    const result = await queryQuestions(admin, orgId, {
      ...EMPTY_FILTERS,
      principleSlug: PRINCIPLE_B,
    });
    expect(result.rows).toEqual([]);
    expect(result.totalCount).toBe(0);
  });

  it("principleSlug = null does NOT narrow results", async () => {
    const result = await queryQuestions(admin, orgId, {
      ...EMPTY_FILTERS,
      principleSlug: null,
    });
    // All 3 inserted questions visible — no narrowing happens
    const ids = result.rows.map((r) => r.id).sort();
    expect(ids).toEqual([easyQId, hardQId, untaggedQId].sort());
  });
});
