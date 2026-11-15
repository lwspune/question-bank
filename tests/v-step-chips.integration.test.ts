/**
 * Step chips under V's explanation (owner, 2026-11-15; migrations 0252 + 0259)
 * against the test database: a tap is kept only in its own shape (the question
 * it is about, the action code, no message), and a Reply on one step keeps a
 * step number from 1 to 12.
 *
 * Fixture rows are inserted and removed by this file.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("step chips (0252, 0259)", () => {
  let admin: SupabaseClient;
  let questionId: string;
  const chatRows: string[] = [];

  const insert = async (row: Record<string, unknown>) => {
    const { data, error } = await admin.from("chat_interactions").insert(row).select("id").maybeSingle();
    if (data?.id) chatRows.push(data.id as string);
    return error;
  };

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    const { data, error } = await admin.from("questions").select("id").eq("visibility", "PUBLIC").limit(1).single();
    if (error) throw new Error(`seed question: ${error.message}`);
    questionId = data.id as string;
  });

  afterAll(async () => {
    if (admin && chatRows.length) await admin.from("chat_interactions").delete().in("id", chatRows);
  });

  it("keeps a tap: the question, the action code, no message", async () => {
    for (const code of ["tap:1", "explain:2", "reply:12"]) {
      expect(await insert({ event_type: "step_by_step", asked_question_id: questionId, question_id: code })).toBeNull();
    }
  });

  it("refuses a tap without its question or action, or with a message", async () => {
    expect((await insert({ event_type: "step_by_step", question_id: "tap:2" }))?.code).toBe("23514");
    expect((await insert({ event_type: "step_by_step", asked_question_id: questionId }))?.code).toBe("23514");
    expect(
      (await insert({ event_type: "step_by_step", asked_question_id: questionId, question_id: "explain:2", message: "hi" }))?.code
    ).toBe("23514");
  });

  it("keeps a Reply's step from 1 to 12, and refuses any other", async () => {
    // A reply must answer a message of its own conversation (0174's trigger).
    const conversation_id = randomUUID();
    const { data: target, error } = await admin
      .from("chat_interactions")
      .insert({ event_type: "typed_question", message: "explain", reply: "1. a\n2. b", reply_source: "ai", conversation_id })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    chatRows.push(target.id as string);
    const reply = (step: number) => ({
      event_type: "typed_question",
      message: "why?",
      conversation_id,
      reply_to_id: target.id,
      reply_to_step: step,
    });
    expect(await insert(reply(2))).toBeNull();
    expect(await insert(reply(12))).toBeNull();
    expect((await insert(reply(0)))?.code).toBe("23514");
    expect((await insert(reply(13)))?.code).toBe("23514");
  });
});
