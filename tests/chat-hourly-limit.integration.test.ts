/**
 * Migration 0226: a message V's hourly limit stopped is kept (event_type
 * 'hourly_limit', the message with no reply), and the Premium hourly limit
 * lives in chat_settings, never below the free one.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { recordChatInteraction } from "@/lib/chat/interactionsAdmin";
import { readChatSettings } from "@/lib/chat/settingsAdmin";
import { testRunId } from "./helpers/runId";

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("V's hourly limit (0226)", () => {
  let admin: SupabaseClient;
  const tag = `hourly-test-${testRunId()}`;

  beforeAll(() => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
  });

  afterAll(async () => {
    if (admin) await admin.from("chat_interactions").delete().like("message", `${tag}%`);
  });

  it("keeps a stopped message with its page, and no reply", async () => {
    const id = await recordChatInteraction(admin, {
      eventType: "hourly_limit",
      message: `${tag} explain this question`,
      userId: null,
      conversationId: randomUUID(),
      pagePath: "/browse",
    });
    expect(id).not.toBeNull();
    const { data } = await admin
      .from("chat_interactions")
      .select("event_type, message, reply, page_path")
      .like("message", `${tag}%`);
    expect(data).toEqual([
      { event_type: "hourly_limit", message: `${tag} explain this question`, reply: null, page_path: "/browse" },
    ]);
  });

  it("refuses a stopped message without its text, or with a reply", async () => {
    const empty = await admin.from("chat_interactions").insert({ event_type: "hourly_limit" });
    expect(empty.error).not.toBeNull();
    const replied = await admin
      .from("chat_interactions")
      .insert({ event_type: "hourly_limit", message: `${tag} x`, reply: "hi", reply_source: "fallback" });
    expect(replied.error).not.toBeNull();
  });

  it("reads the Premium hourly limit, and refuses one below the free limit", async () => {
    const s = await readChatSettings(admin);
    expect(s.premiumPerPersonPerHour).toBeGreaterThanOrEqual(s.perPersonPerHour);
    const { error } = await admin
      .from("chat_settings")
      .update({ premium_per_person_per_hour: s.perPersonPerHour - 1 })
      .eq("id", true);
    expect(error).not.toBeNull();
  });
});
