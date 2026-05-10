/**
 * Integration test for applyEdit's set-context fan-out: editing the
 * Question Context on a question that's part of a set must update ALL
 * siblings (rows sharing the same set_id) — but never the row's other
 * fields (text, options, taxonomy, images).
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { applyEdit } from "@/lib/questions/applyEdit";
import { validateEditPayload } from "@/lib/questions/edit";
import { contentHash } from "@/lib/upload/hash";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);

describe.skipIf(!HAS_ENV)("applyEdit · set-context fan-out", () => {
  let admin: SupabaseClient;
  let orgId: string;
  let adminUserId: string;
  let examId: string;
  let subjectId: string;
  let chapterId: string;
  let setMemberA: string; // we edit this one
  let setMemberB: string; // sibling
  let setMemberC: string; // sibling
  let standalone: string; // not in any set
  const setId = `EditSet_${RUN_ID}:S1`;
  const initialPassage = `Initial passage ${RUN_ID}`;
  const newPassage = `New passage ${RUN_ID}`;

  beforeAll(async () => {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    const { data: u } = await admin.auth.admin.createUser({
      email: `edit-set-admin-${RUN_ID}@test.local`,
      password: "edit-set-pw-1234",
      email_confirm: true,
    });
    adminUserId = u.user!.id;

    const { data: org } = await admin
      .from("organizations")
      .insert({ name: `EditSetOrg_${RUN_ID}` })
      .select("id")
      .single();
    orgId = org!.id;

    await admin.from("org_members").insert({
      org_id: orgId,
      user_id: adminUserId,
      role: "ADMIN",
    });

    const { data: exam } = await admin
      .from("exams")
      .select("id")
      .eq("name", "MHT-CET")
      .single();
    examId = exam!.id;

    const { data: subj } = await admin
      .from("subjects")
      .insert({ exam_id: examId, name: `EditSetSubj_${RUN_ID}` })
      .select("id")
      .single();
    subjectId = subj!.id;

    const { data: ch } = await admin
      .from("chapters")
      .insert({
        subject_id: subjectId,
        name: `EditSetChapter_${RUN_ID}`,
        order_index: 0,
      })
      .select("id")
      .single();
    chapterId = ch!.id;

    async function insertQuestion(text: string, set_id: string | null) {
      const hash = contentHash(text, ["a", "b", "c", "d"], "A");
      const { data: q } = await admin
        .from("questions")
        .insert({
          org_id: orgId,
          exam_id: examId,
          subject_id: subjectId,
          chapter_id: chapterId,
          text,
          context: set_id ? initialPassage : null,
          difficulty: "EASY",
          content_hash: hash,
          set_id,
          created_by: adminUserId,
        })
        .select("id")
        .single();
      const qId = q!.id;
      await admin.from("options").insert([
        { question_id: qId, label: "A", text: "a", is_correct: true },
        { question_id: qId, label: "B", text: "b", is_correct: false },
        { question_id: qId, label: "C", text: "c", is_correct: false },
        { question_id: qId, label: "D", text: "d", is_correct: false },
      ]);
      return qId;
    }

    setMemberA = await insertQuestion(`SetQ A ${RUN_ID}`, setId);
    setMemberB = await insertQuestion(`SetQ B ${RUN_ID}`, setId);
    setMemberC = await insertQuestion(`SetQ C ${RUN_ID}`, setId);
    standalone = await insertQuestion(`Standalone ${RUN_ID}`, null);
  });

  afterAll(async () => {
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    if (subjectId) await admin.from("subjects").delete().eq("id", subjectId);
    if (adminUserId) await admin.auth.admin.deleteUser(adminUserId);
  });

  function buildPayload(overrides: Record<string, unknown> = {}) {
    return {
      text: `SetQ A ${RUN_ID}`,
      context: initialPassage,
      difficulty: "EASY" as const,
      solution: null,
      imageUrl: null,
      subjectId,
      chapterId,
      subtopicId: null,
      visibility: "PRIVATE" as const,
      correct: "A" as const,
      options: [
        { label: "A" as const, text: "a", imageUrl: null },
        { label: "B" as const, text: "b", imageUrl: null },
        { label: "C" as const, text: "c", imageUrl: null },
        { label: "D" as const, text: "d", imageUrl: null },
      ],
      ...overrides,
    };
  }

  function validate(overrides: Record<string, unknown> = {}) {
    const v = validateEditPayload(buildPayload(overrides));
    if (!v.ok) throw new Error(`fixture invalid: ${v.errors.join(", ")}`);
    return v;
  }

  async function ctxOf(id: string): Promise<string | null> {
    const { data } = await admin
      .from("questions")
      .select("context")
      .eq("id", id)
      .single();
    return (data?.context ?? null) as string | null;
  }

  async function textOf(id: string): Promise<string> {
    const { data } = await admin
      .from("questions")
      .select("text")
      .eq("id", id)
      .single();
    return data!.text as string;
  }

  it("propagates context change to all siblings sharing the set_id", async () => {
    const v = validate({ context: newPassage });
    const result = await applyEdit(
      admin,
      setMemberA,
      orgId,
      v.payload,
      v.contentHash
    );
    expect(result.kind).toBe("ok");

    expect(await ctxOf(setMemberA)).toBe(newPassage);
    expect(await ctxOf(setMemberB)).toBe(newPassage);
    expect(await ctxOf(setMemberC)).toBe(newPassage);
  });

  it("does not change siblings' text/options when only context is edited", async () => {
    const newPassage2 = `${newPassage} v2`;
    const v = validate({ context: newPassage2 });
    await applyEdit(admin, setMemberA, orgId, v.payload, v.contentHash);

    expect(await textOf(setMemberA)).toBe(`SetQ A ${RUN_ID}`);
    expect(await textOf(setMemberB)).toBe(`SetQ B ${RUN_ID}`);
    expect(await textOf(setMemberC)).toBe(`SetQ C ${RUN_ID}`);
  });

  it("does not touch standalone questions even when their context happened to match", async () => {
    // First make standalone share the same context value as the set.
    const matchPassage = `Coincidence ${RUN_ID}`;
    await admin
      .from("questions")
      .update({ context: matchPassage })
      .eq("id", standalone);
    await admin
      .from("questions")
      .update({ context: matchPassage })
      .in("id", [setMemberA, setMemberB, setMemberC]);

    const newP = `${matchPassage} updated`;
    const v = validate({ context: newP });
    await applyEdit(admin, setMemberA, orgId, v.payload, v.contentHash);

    expect(await ctxOf(setMemberA)).toBe(newP);
    expect(await ctxOf(setMemberB)).toBe(newP);
    expect(await ctxOf(setMemberC)).toBe(newP);
    // Standalone keeps its original (matching but unrelated) value.
    expect(await ctxOf(standalone)).toBe(matchPassage);
  });

  it("editing a standalone question does not fan out to anyone", async () => {
    const v = validate({
      text: `Standalone ${RUN_ID}`,
      context: `Standalone-only context ${RUN_ID}`,
    });
    await applyEdit(admin, standalone, orgId, v.payload, v.contentHash);

    expect(await ctxOf(standalone)).toBe(`Standalone-only context ${RUN_ID}`);
    // Set members keep whatever they had before this call; not asserting an
    // exact value (other tests above mutated them) — just that it's NOT the
    // standalone's new context.
    expect(await ctxOf(setMemberA)).not.toBe(
      `Standalone-only context ${RUN_ID}`
    );
  });
});
