/**
 * DB-level guard for officially cancelled questions (migration 0119).
 *
 * A cancelled question has NO correct option — the exam body's final key awards
 * none — and carries the notice explaining that. The rule is enforced by the
 * database so no write path (an upload, the edit form, a repair script) can put
 * an invented key back on it:
 *   - a correct option cannot be added to a cancelled question
 *   - a question that has a correct option cannot be marked cancelled
 *   - a blank notice is rejected
 *   - a cancelled question with all-incorrect options is fine
 *
 * Service-role writes: the guard must hold even where RLS is bypassed.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;
const RUN_ID = randomUUID().slice(0, 8);

describe.skipIf(!HAS_ENV)("cancelled questions (0119)", () => {
  let admin: SupabaseClient;
  let orgId: string;
  let userId: string;
  let tax: { exam_id: string; subject_id: string; chapter_id: string };
  const created: string[] = [];

  async function question(extra: Record<string, unknown> = {}) {
    const { data, error } = await admin
      .from("questions")
      .insert({
        org_id: orgId,
        ...tax,
        text: `cancelled-test ${RUN_ID} ${created.length}`,
        difficulty: "EASY",
        content_hash: `cancelled-${RUN_ID}-${created.length}`,
        created_by: userId,
        ...extra,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    created.push(data!.id);
    return data!.id as string;
  }

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    const { data: u } = await admin.auth.admin.createUser({
      email: `cancelled-${RUN_ID}@test.local`,
      password: `cancelled-${RUN_ID}-pw`,
      email_confirm: true,
    });
    userId = u.user!.id;
    const { data: org } = await admin.from("organizations").insert({ name: `Cancelled Org ${RUN_ID}` }).select("id").single();
    orgId = org!.id;
    const { data: ex } = await admin.from("exams").select("id").limit(1).single();
    const { data: sb } = await admin.from("subjects").select("id").eq("exam_id", ex!.id).limit(1).single();
    const { data: ch } = await admin.from("chapters").select("id").eq("subject_id", sb!.id).limit(1).single();
    tax = { exam_id: ex!.id, subject_id: sb!.id, chapter_id: ch!.id };
  });

  afterAll(async () => {
    if (created.length) await admin.from("questions").delete().in("id", created);
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    if (userId) await admin.auth.admin.deleteUser(userId);
  });

  it("accepts a cancelled question whose options are all incorrect", async () => {
    const id = await question({ cancelled_note: "Cancelled by MPSC in the final answer key." });
    const { error } = await admin
      .from("options")
      .insert(["A", "B", "C", "D"].map((label) => ({ question_id: id, label, text: label, is_correct: false })));
    expect(error).toBeNull();
  });

  it("refuses a correct option on a cancelled question", async () => {
    const id = await question({ cancelled_note: "Cancelled." });
    const { error } = await admin.from("options").insert({ question_id: id, label: "A", text: "x", is_correct: true });
    expect(error?.message).toMatch(/cancelled/i);
  });

  it("refuses to cancel a question that still has a correct option", async () => {
    const id = await question();
    await admin.from("options").insert({ question_id: id, label: "A", text: "x", is_correct: true });
    const { error } = await admin.from("questions").update({ cancelled_note: "Cancelled." }).eq("id", id);
    expect(error?.message).toMatch(/cancelled/i);
  });

  it("rejects a blank notice", async () => {
    const { error } = await admin.from("questions").insert({
      org_id: orgId,
      ...tax,
      text: `blank-note ${RUN_ID}`,
      difficulty: "EASY",
      content_hash: `blank-note-${RUN_ID}`,
      created_by: userId,
      cancelled_note: "   ",
    });
    expect(error?.code).toBe("23514");
  });
});
