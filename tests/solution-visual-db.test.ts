/**
 * DB-level shape guard for questions.solution_visual (migration 0184).
 *
 * Code validates a visual fully (lib/visuals/visual.ts); the database holds the
 * envelope no matter which write path is used: version 1, a scene name, object
 * params, 1-12 steps, an 8-hex fingerprint, a numeric answer, and a size cap.
 * Service-role writes, so the guard must hold where RLS is bypassed.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { ARC_VISUAL } from "./fixtures/visuals";

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;
const RUN_ID = randomUUID().slice(0, 8);

describe.skipIf(!HAS_ENV)("solution_visual shape (0184)", () => {
  let admin: SupabaseClient;
  let orgId: string;
  let userId: string;
  let questionId: string;

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    const { data: u } = await admin.auth.admin.createUser({
      email: `visual-${RUN_ID}@test.local`,
      password: `visual-${RUN_ID}-pw`,
      email_confirm: true,
    });
    userId = u.user!.id;
    const { data: org } = await admin.from("organizations").insert({ name: `Visual Org ${RUN_ID}` }).select("id").single();
    orgId = org!.id;
    const { data: ex } = await admin.from("exams").select("id").limit(1).single();
    const { data: sb } = await admin.from("subjects").select("id").eq("exam_id", ex!.id).limit(1).single();
    const { data: ch } = await admin.from("chapters").select("id").eq("subject_id", sb!.id).limit(1).single();
    const { data: q, error } = await admin
      .from("questions")
      .insert({
        org_id: orgId,
        exam_id: ex!.id,
        subject_id: sb!.id,
        chapter_id: ch!.id,
        text: `visual-test ${RUN_ID}`,
        difficulty: "EASY",
        content_hash: `visual-${RUN_ID}`,
        created_by: userId,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    questionId = q!.id;
  });

  afterAll(async () => {
    if (questionId) await admin.from("questions").delete().eq("id", questionId);
    if (orgId) await admin.from("organizations").delete().eq("id", orgId);
    if (userId) await admin.auth.admin.deleteUser(userId);
  });

  const write = (v: unknown) => admin.from("questions").update({ solution_visual: v }).eq("id", questionId);

  it("accepts a well-formed visual, and null", async () => {
    expect((await write(ARC_VISUAL)).error).toBeNull();
    expect((await write(null)).error).toBeNull();
  });

  it("refuses an unknown version", async () => {
    expect((await write({ ...ARC_VISUAL, v: 2 })).error?.code).toBe("23514");
  });

  it("refuses no steps and more than 12", async () => {
    expect((await write({ ...ARC_VISUAL, steps: [] })).error?.code).toBe("23514");
    const many = Array.from({ length: 13 }, (_, k) => ({ from: k, beats: ["angle"] }));
    expect((await write({ ...ARC_VISUAL, steps: many })).error?.code).toBe("23514");
  });

  it("refuses a malformed fingerprint and a missing answer value", async () => {
    expect((await write({ ...ARC_VISUAL, fingerprint: "nothex!!" })).error?.code).toBe("23514");
    expect((await write({ ...ARC_VISUAL, answer: { label: "π/4" } })).error?.code).toBe("23514");
  });

  it("refuses a missing key rather than letting NULL pass the check", async () => {
    const { scene: _scene, ...noScene } = ARC_VISUAL;
    const { steps: _steps, ...noSteps } = ARC_VISUAL;
    expect((await write(noScene)).error?.code).toBe("23514");
    expect((await write(noSteps)).error?.code).toBe("23514");
    expect((await write({ ...ARC_VISUAL, answer: undefined })).error?.code).toBe("23514");
  });

  it("refuses a visual past the size cap", async () => {
    // Random text, so compression cannot shrink it under the cap.
    const padding = Array.from({ length: 600 }, () => randomUUID()).join("");
    const huge = { ...ARC_VISUAL, params: { ...ARC_VISUAL.params, padding } };
    expect((await write(huge)).error?.code).toBe("23514");
  });
});
