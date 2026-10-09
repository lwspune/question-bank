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

  it("refuses text over 500 characters", async () => {
    const { error } = await admin
      .from("chat_interactions")
      .insert({ event_type: "typed_question", message: `${tag} ${"x".repeat(500)}` });
    expect(error).not.toBeNull();
  });

  it("hides typed questions from the public", async () => {
    const { data } = await anon.from("chat_interactions").select("message").like("message", `${tag}%`);
    expect(data ?? []).toEqual([]);
  });
});
