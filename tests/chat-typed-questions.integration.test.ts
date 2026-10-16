/**
 * V's typed questions (migration 0145): stored with their text, readable by
 * nobody but the service role, and shaped by the database, not only the route.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { recordChatInteraction } from "@/lib/chat/interactionsAdmin";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

describe.skipIf(!HAS_ENV)("chat_interactions: typed questions", () => {
  let admin: SupabaseClient;
  let anon: SupabaseClient;
  const tag = `typed-test-${randomUUID().slice(0, 8)}`;

  beforeAll(() => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    anon = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: { persistSession: false },
    });
  });

  afterAll(async () => {
    if (admin) await admin.from("chat_interactions").delete().like("message", `${tag}%`);
  });

  it("stores a typed question with its text", async () => {
    await recordChatInteraction(admin, { eventType: "typed_question", message: `${tag} when is the result`, userId: null });
    const { data } = await admin
      .from("chat_interactions")
      .select("event_type, question_id, message")
      .like("message", `${tag}%`);
    expect(data).toEqual([{ event_type: "typed_question", question_id: null, message: `${tag} when is the result` }]);
  });

  it("refuses a typed question with no text", async () => {
    const { error } = await admin.from("chat_interactions").insert({ event_type: "typed_question" });
    expect(error).not.toBeNull();
  });

  it("refuses text on a click or an open", async () => {
    const click = await admin
      .from("chat_interactions")
      .insert({ event_type: "faq_click", question_id: "exams", message: `${tag} x` });
    const open = await admin.from("chat_interactions").insert({ event_type: "launcher_open", message: `${tag} x` });
    expect(click.error).not.toBeNull();
    expect(open.error).not.toBeNull();
  });

  it("keeps cache token counts to AI replies, including rows with no reply at all (migration 0161)", async () => {
    const noReply = await admin
      .from("chat_interactions")
      .insert({ event_type: "typed_question", message: `${tag} c1`, cache_read_tokens: 10 });
    const fallback = await admin.from("chat_interactions").insert({
      event_type: "typed_question",
      message: `${tag} c2`,
      reply: "Thanks",
      reply_source: "fallback",
      cache_write_tokens: 10,
    });
    const ai = await admin.from("chat_interactions").insert({
      event_type: "typed_question",
      message: `${tag} c3`,
      reply: "See /mock",
      reply_source: "ai",
      tokens_in: 40,
      tokens_out: 5,
      cache_read_tokens: 2800,
      cache_write_tokens: 0,
    });
    expect(noReply.error).not.toBeNull();
    expect(fallback.error).not.toBeNull();
    expect(ai.error).toBeNull();
  });

  it("refuses text over 500 characters", async () => {
    const { error } = await admin
      .from("chat_interactions")
      .insert({ event_type: "typed_question", message: `${tag} ${"x".repeat(500)}` });
    expect(error).not.toBeNull();
  });

  it("refuses a reply on anything but a typed question (0158)", async () => {
    const { error } = await admin
      .from("chat_interactions")
      .insert({ event_type: "launcher_open", reply: "hi", reply_source: "fallback" });
    expect(error).not.toBeNull();
  });

  it("refuses a reply with no source, and token counts on the fixed reply (0158)", async () => {
    const noSource = await admin
      .from("chat_interactions")
      .insert({ event_type: "typed_question", message: `${tag} a`, reply: "hi" });
    const tokensOnFallback = await admin.from("chat_interactions").insert({
      event_type: "typed_question",
      message: `${tag} b`,
      reply: "hi",
      reply_source: "fallback",
      tokens_in: 10,
      tokens_out: 2,
    });
    expect(noSource.error).not.toBeNull();
    expect(tokensOnFallback.error).not.toBeNull();
  });

  it("refuses feedback on anything but an AI reply (0159)", async () => {
    const { error } = await admin.from("chat_interactions").insert({
      event_type: "typed_question",
      message: `${tag} c`,
      reply: "Thanks",
      reply_source: "fallback",
      feedback: 1,
      feedback_at: new Date().toISOString(),
    });
    expect(error).not.toBeNull();
  });

  it("refuses a button answer with no source, and a page that is not a site path (0159)", async () => {
    const noSource = await admin
      .from("chat_interactions")
      .insert({ event_type: "faq_click", question_id: "notes", reply: "x" });
    const badPage = await admin
      .from("chat_interactions")
      .insert({ event_type: "launcher_open", page_path: "https://evil.example" });
    expect(noSource.error).not.toBeNull();
    expect(badPage.error).not.toBeNull();
  });

  it("takes a late answer only with its conversation, its question and a 'followup' reply (0160)", async () => {
    const base = { event_type: "v_followup", message: `${tag} late`, reply: "Sorry for the wait!" };
    const noConversation = await admin.from("chat_interactions").insert({ ...base, reply_source: "followup" });
    const wrongSource = await admin
      .from("chat_interactions")
      .insert({ ...base, reply_source: "ai", conversation_id: crypto.randomUUID() });
    const ok = await admin
      .from("chat_interactions")
      .insert({ ...base, reply_source: "followup", conversation_id: crypto.randomUUID() });
    expect(noConversation.error).not.toBeNull();
    expect(wrongSource.error).not.toBeNull();
    expect(ok.error).toBeNull();
  });

  it("keeps 'seen' for late answers only (0160)", async () => {
    const { error } = await admin
      .from("chat_interactions")
      .insert({ event_type: "launcher_open", seen_at: new Date().toISOString() });
    expect(error).not.toBeNull();
  });

  it("hides V's settings from the public (0158)", async () => {
    const { data } = await anon.from("chat_settings").select("ai_enabled");
    expect(data ?? []).toEqual([]);
  });

  it("hides typed questions from the public", async () => {
    const { data } = await anon.from("chat_interactions").select("message").like("message", `${tag}%`);
    expect(data ?? []).toEqual([]);
  });
});
