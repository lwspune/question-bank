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

  it("keeps the tokens of a failed AI answer under ai_failed, never on a plain fallback (migration 0162)", async () => {
    const failed = await admin.from("chat_interactions").insert({
      event_type: "typed_question",
      message: `${tag} f1`,
      reply: "Let me get back to you",
      reply_source: "ai_failed",
      tokens_in: 80,
      tokens_out: 10,
      cache_write_tokens: 2800,
    });
    const plain = await admin.from("chat_interactions").insert({
      event_type: "typed_question",
      message: `${tag} f2`,
      reply: "Let me get back to you",
      reply_source: "fallback",
      tokens_in: 80,
    });
    expect(failed.error).toBeNull();
    expect(plain.error).not.toBeNull();
  });

  it("adds up AI use per India-time day in the database, with no row limit (migration 0162)", async () => {
    // 2001-03-04 23:59 and 2001-03-05 00:01 in India: either side of midnight. No other row lives on these days.
    const at = (iso: string, source: "ai" | "ai_failed", n: number) => ({
      event_type: "typed_question",
      message: `${tag} day ${iso}`,
      reply: "x",
      reply_source: source,
      tokens_in: n,
      tokens_out: n,
      cache_read_tokens: n,
      cache_write_tokens: n,
      created_at: iso,
    });
    const { error } = await admin
      .from("chat_interactions")
      .insert([at("2001-03-04T18:29:00Z", "ai", 1), at("2001-03-04T18:31:00Z", "ai", 10), at("2001-03-04T20:00:00Z", "ai_failed", 100)]);
    expect(error).toBeNull();

    const { data, error: rpcError } = await admin.rpc("chat_ai_usage_by_day");
    expect(rpcError).toBeNull();
    const days = (data as { day: string }[]).filter((d) => d.day.startsWith("2001-03-0"));
    expect(days).toEqual([
      { day: "2001-03-04", answers: 1, failed: 0, tokens_in: 1, tokens_out: 1, cache_read_tokens: 1, cache_write_tokens: 1 },
      { day: "2001-03-05", answers: 1, failed: 1, tokens_in: 110, tokens_out: 110, cache_read_tokens: 110, cache_write_tokens: 110 },
    ]);
  });

  it("does not let the public read V's AI usage", async () => {
    const { error } = await anon.rpc("chat_ai_usage_by_day");
    expect(error).not.toBeNull();
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

  // 0174 (2026-10-21): which question a message was about, and the earlier message it replies to.
  it("stores the question a message was about and the message it replies to, through the writer", async () => {
    const conversationId = randomUUID();
    const asked = randomUUID();
    const first = await recordChatInteraction(admin, {
      eventType: "typed_question",
      message: `${tag} r-first`,
      userId: null,
      conversationId,
      askedQuestionId: asked,
      reply: { text: "Use the rule.", source: "ai" },
    });
    const second = await recordChatInteraction(admin, {
      eventType: "typed_question",
      message: `${tag} r-second`,
      userId: null,
      conversationId,
      replyToId: first,
      reply: { text: "Because.", source: "ai" },
    });
    expect(second).not.toBeNull();
    const { data } = await admin
      .from("chat_interactions")
      .select("message, asked_question_id, reply_to_id")
      .like("message", `${tag} r-%`)
      .order("created_at");
    expect(data).toEqual([
      { message: `${tag} r-first`, asked_question_id: asked, reply_to_id: null },
      { message: `${tag} r-second`, asked_question_id: null, reply_to_id: first },
    ]);
  });

  it("refuses a reply to a message in another conversation, or to one V never answered (0174)", async () => {
    const conversationId = randomUUID();
    const { data: answered } = await admin
      .from("chat_interactions")
      .insert({ event_type: "typed_question", message: `${tag} t1`, conversation_id: conversationId, reply: "Hi", reply_source: "ai" })
      .select("id")
      .single();
    const { data: unanswered } = await admin
      .from("chat_interactions")
      .insert({ event_type: "typed_question", message: `${tag} t2`, conversation_id: conversationId })
      .select("id")
      .single();
    const base = { event_type: "typed_question", message: `${tag} t3` };
    const otherConversation = await admin
      .from("chat_interactions")
      .insert({ ...base, conversation_id: randomUUID(), reply_to_id: answered!.id });
    const noConversation = await admin.from("chat_interactions").insert({ ...base, reply_to_id: answered!.id });
    const notAnswered = await admin
      .from("chat_interactions")
      .insert({ ...base, conversation_id: conversationId, reply_to_id: unanswered!.id });
    const ok = await admin
      .from("chat_interactions")
      .insert({ ...base, conversation_id: conversationId, reply_to_id: answered!.id });
    expect(otherConversation.error).not.toBeNull();
    expect(noConversation.error).not.toBeNull();
    expect(notAnswered.error).not.toBeNull();
    expect(ok.error).toBeNull();
  });

  it("keeps the question and the reply link to typed questions (0174)", async () => {
    const open = await admin.from("chat_interactions").insert({ event_type: "launcher_open", asked_question_id: randomUUID() });
    expect(open.error).not.toBeNull();
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
