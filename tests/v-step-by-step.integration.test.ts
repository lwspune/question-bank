/**
 * "Teach me step by step" (V_SPEC.md section 0, step 1; migration 0252)
 * against the test database: the steps are read from a PUBLIC question only,
 * and chat_interactions keeps a step event only in its own shape (the
 * question it is about, the action code, no message).
 *
 * Fixture copies of a seed question are inserted and removed by this file.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { loadSolutionSteps } from "@/lib/chat/solutionStepsServer";
import { testRunId } from "./helpers/runId";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const RUN_ID = testRunId();
const LONG = (n: number) => `Step ${n} works through one more part of the problem with the actual numbers written out in full.`;
const SOLUTION = [LONG(1), LONG(2), LONG(3)].join(" ");

type Row = Record<string, unknown> & { id: string };

describe.skipIf(!HAS_ENV)("step by step (0252)", () => {
  let admin: SupabaseClient;
  let anon: SupabaseClient;
  let open: Row;
  let hidden: Row;
  const questions: string[] = [];
  const chatRows: string[] = [];

  async function copy(of: Row, over: Record<string, unknown>): Promise<Row> {
    const { id: _id, search_vector: _sv, created_at: _c, ...rest } = of;
    const row = { ...rest, id: randomUUID(), content_hash: `steps-test-${RUN_ID}-${randomUUID()}`, ...over };
    const { error } = await admin.from("questions").insert(row);
    if (error) throw new Error(`fixture question: ${error.message}`);
    questions.push(row.id as string);
    return row as Row;
  }

  const insertEvent = async (row: Record<string, unknown>) => {
    const { data, error } = await admin.from("chat_interactions").insert(row).select("id").maybeSingle();
    if (data?.id) chatRows.push(data.id as string);
    return error;
  };

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    anon = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    const { data, error } = await admin
      .from("questions")
      .select("*")
      .eq("visibility", "PUBLIC")
      .eq("question_format", "mcq")
      .limit(1)
      .single();
    if (error) throw new Error(`seed question: ${error.message}`);
    const seed = data as Row;
    open = await copy(seed, { solution: SOLUTION, solution_visual: null });
    hidden = await copy(seed, { solution: SOLUTION, solution_visual: null, visibility: "PRIVATE" });
  });

  afterAll(async () => {
    if (!admin) return;
    if (chatRows.length) await admin.from("chat_interactions").delete().in("id", chatRows);
    if (questions.length) await admin.from("questions").delete().in("id", questions);
  });

  it("reads a PUBLIC question's steps, with its format", async () => {
    const out = await loadSolutionSteps(anon, open.id);
    expect(out).toEqual({ steps: [LONG(1), LONG(2), LONG(3)], visual: null, format: "mcq" });
  });

  it("reads nothing from a PRIVATE question", async () => {
    expect(await loadSolutionSteps(anon, hidden.id)).toBeNull();
  });

  it("reads nothing for an id that is not a question", async () => {
    expect(await loadSolutionSteps(anon, randomUUID())).toBeNull();
  });

  it("keeps a step event: the question, the action code, no message", async () => {
    expect(await insertEvent({ event_type: "step_by_step", asked_question_id: open.id, question_id: "open:1" })).toBeNull();
  });

  it("refuses a step event without its question or action, or with a message", async () => {
    expect((await insertEvent({ event_type: "step_by_step", question_id: "next:2" }))?.code).toBe("23514");
    expect((await insertEvent({ event_type: "step_by_step", asked_question_id: open.id }))?.code).toBe("23514");
    expect(
      (await insertEvent({ event_type: "step_by_step", asked_question_id: open.id, question_id: "lost:2", message: "hi" }))?.code
    ).toBe("23514");
  });

  it("still refuses a question id on any other event but a typed question", async () => {
    expect((await insertEvent({ event_type: "builder_step", asked_question_id: open.id, question_id: "open" }))?.code).toBe("23514");
  });
});
