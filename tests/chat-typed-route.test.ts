/**
 * POST /api/chat/typed: V takes a typed question, stores it with personal
 * details masked, and answers it.
 *   2026-10-09: always the owner's fixed reply.
 *   2026-10-15: an AI answer when /dashboard/chat switches it on, under a
 *   per-person hourly limit and a site-wide daily cap (migration 0158); the
 *   fixed reply otherwise. The AI call (askV) is faked here: no request
 *   leaves the machine. Runs against the TEST database.
 */
import { describe, it, expect, afterAll, beforeAll, vi } from "vitest";
import { NextRequest } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { TYPED_QUESTION_REPLY } from "@/lib/chat/typed";

const askV = vi.fn();
vi.mock("@/lib/chat/anthropic", async (orig) => ({
  ...(await orig<typeof import("@/lib/chat/anthropic")>()),
  askV: (...args: unknown[]) => askV(...args),
}));

const RUN = randomUUID().slice(0, 8);
const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

function post(body: unknown, ip = `typed-${RUN}-${Math.random().toString(36).slice(2, 8)}`): NextRequest {
  return new NextRequest("http://localhost:3000/api/chat/typed", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

describe.skipIf(!HAS_ENV)("/api/chat/typed", () => {
  let admin: SupabaseClient;
  let saved: Record<string, unknown> | null = null;

  async function setSettings(s: { ai_enabled: boolean; per_person_per_hour: number; ai_answers_per_day: number }) {
    const { error } = await admin.from("chat_settings").update(s).eq("id", true);
    if (error) throw new Error(error.message);
  }

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    const { data } = await admin
      .from("chat_settings")
      .select("ai_enabled, per_person_per_hour, ai_answers_per_day")
      .eq("id", true)
      .single();
    saved = data;
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("chat_interactions").delete().like("message", `route-${RUN}%`);
    if (saved) await admin.from("chat_settings").update(saved).eq("id", true);
  });

  async function rowFor(prefix: string) {
    const { data } = await admin
      .from("chat_interactions")
      .select("message, reply, reply_source, tokens_in, tokens_out")
      .like("message", `${prefix}%`);
    return data;
  }

  it("refuses an empty question and one over 500 characters", async () => {
    const { POST } = await import("@/app/api/chat/typed/route");
    expect((await POST(post({ message: "   " }))).status).toBe(400);
    expect((await POST(post({ message: "x".repeat(501) }))).status).toBe(400);
  });

  it("with the AI off: stores the question masked and gives the fixed reply", async () => {
    await setSettings({ ai_enabled: false, per_person_per_hour: 15, ai_answers_per_day: 300 });
    askV.mockClear();
    const { POST } = await import("@/app/api/chat/typed/route");
    const res = await POST(post({ message: `route-${RUN}-off call me on 9876543210` }));
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ ok: true, reply: TYPED_QUESTION_REPLY, links: [], source: "fallback" });
    expect(askV).not.toHaveBeenCalled();
    expect(await rowFor(`route-${RUN}-off`)).toEqual([
      {
        message: `route-${RUN}-off call me on [phone]`,
        reply: TYPED_QUESTION_REPLY,
        reply_source: "fallback",
        tokens_in: null,
        tokens_out: null,
      },
    ]);
  });

  it("with the AI on: answers, links only the pages V was given, and records the cost", async () => {
    await setSettings({ ai_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
    askV.mockReset();
    askV.mockResolvedValue({
      ok: true,
      reply: "The pass is at /pricing. Not at /made-up/page.",
      tokensIn: 1200,
      tokensOut: 80,
    });
    const { POST } = await import("@/app/api/chat/typed/route");
    const res = await POST(post({ message: `route-${RUN}-ai I wanna buy premium, mail me a@b.com` }));
    expect(await res.json()).toMatchObject({
      ok: true,
      reply: "The pass is at /pricing. Not at /made-up/page.",
      links: ["/pricing"],
    });
    // The model never sees the email address.
    expect(askV.mock.calls[0][0].message).toBe(`route-${RUN}-ai I wanna buy premium, mail me [email]`);
    expect(await rowFor(`route-${RUN}-ai`)).toEqual([
      {
        message: `route-${RUN}-ai I wanna buy premium, mail me [email]`,
        reply: "The pass is at /pricing. Not at /made-up/page.",
        reply_source: "ai",
        tokens_in: 1200,
        tokens_out: 80,
      },
    ]);
  });

  it("falls back to the fixed reply when the AI call fails", async () => {
    await setSettings({ ai_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
    askV.mockReset();
    askV.mockResolvedValue({ ok: false, error: "overloaded" });
    const { POST } = await import("@/app/api/chat/typed/route");
    const res = await POST(post({ message: `route-${RUN}-fail atoms` }));
    expect((await res.json()).reply).toBe(TYPED_QUESTION_REPLY);
    expect((await rowFor(`route-${RUN}-fail`))?.[0]?.reply_source).toBe("fallback");
  });

  it("gives the fixed reply once the site's AI answers for the day are used up", async () => {
    await setSettings({ ai_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 0 });
    askV.mockReset();
    const { POST } = await import("@/app/api/chat/typed/route");
    const res = await POST(post({ message: `route-${RUN}-cap hello` }));
    expect((await res.json()).reply).toBe(TYPED_QUESTION_REPLY);
    expect(askV).not.toHaveBeenCalled();
  });

  it("holds one person to the hourly limit set on the dashboard", async () => {
    await setSettings({ ai_enabled: false, per_person_per_hour: 2, ai_answers_per_day: 300 });
    const { POST } = await import("@/app/api/chat/typed/route");
    const ip = `typed-${RUN}-limit`;
    expect((await POST(post({ message: `route-${RUN}-lim 1` }, ip))).status).toBe(200);
    expect((await POST(post({ message: `route-${RUN}-lim 2` }, ip))).status).toBe(200);
    expect((await POST(post({ message: `route-${RUN}-lim 3` }, ip))).status).toBe(429);
  });
it("keeps the conversation: stores its id and page, returns the row id, and gives V the earlier exchange", async () => {
    await setSettings({ ai_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
    askV.mockReset();
    askV.mockResolvedValueOnce({ ok: true, reply: "NEET papers are on /mock.", tokensIn: 10, tokensOut: 5 });
    askV.mockResolvedValueOnce({ ok: true, reply: "Which class?", tokensIn: 10, tokensOut: 5 });
    const { POST } = await import("@/app/api/chat/typed/route");
    const conversationId = randomUUID();

    const first = await (
      await POST(post({ message: `route-${RUN}-conv NEET PYQ`, conversationId, pagePath: "/browse?exam=neet" }))
    ).json();
    expect(first).toMatchObject({ ok: true, source: "ai", links: ["/mock"] });
    expect(typeof first.id).toBe("string");

    await POST(post({ message: `route-${RUN}-conv other chapter of phy`, conversationId, pagePath: "/mock" }));
    expect(askV.mock.calls[1][0].history).toEqual([
      { role: "user", content: `route-${RUN}-conv NEET PYQ` },
      { role: "assistant", content: "NEET papers are on /mock." },
    ]);
    expect(askV.mock.calls[1][0].system).toContain("The student is on the page /mock");

    const { data } = await admin
      .from("chat_interactions")
      .select("conversation_id, page_path, reply_links")
      .like("message", `route-${RUN}-conv NEET%`);
    expect(data).toEqual([{ conversation_id: conversationId, page_path: "/browse", reply_links: ["/mock"] }]);
  });

  it("ignores a conversation id that is not a uuid, and a page that is not a site path", async () => {
    await setSettings({ ai_enabled: false, per_person_per_hour: 15, ai_answers_per_day: 300 });
    const { POST } = await import("@/app/api/chat/typed/route");
    const res = await POST(post({ message: `route-${RUN}-bad hi`, conversationId: "x", pagePath: "https://evil.example" }));
    expect(res.status).toBe(200);
    const { data } = await admin
      .from("chat_interactions")
      .select("conversation_id, page_path")
      .like("message", `route-${RUN}-bad%`);
    expect(data).toEqual([{ conversation_id: null, page_path: null }]);
  });

  it("takes a thumbs up or down only on an AI reply in the right conversation", async () => {
    await setSettings({ ai_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
    askV.mockReset();
    askV.mockResolvedValue({ ok: true, reply: "Hi!", tokensIn: 1, tokensOut: 1 });
    const { POST } = await import("@/app/api/chat/typed/route");
    const { POST: FEEDBACK } = await import("@/app/api/chat/feedback/route");
    const conversationId = randomUUID();
    const { id } = await (await POST(post({ message: `route-${RUN}-fb hi`, conversationId }))).json();

    const fb = (body: unknown) =>
      FEEDBACK(
        new NextRequest("http://localhost:3000/api/chat/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-forwarded-for": `fb-${RUN}` },
          body: JSON.stringify(body),
        })
      );
    expect((await fb({ id, conversationId: randomUUID(), value: 1 })).status).toBe(404);
    expect((await fb({ id, conversationId, value: 2 })).status).toBe(400);
    expect((await fb({ id, conversationId, value: -1 })).status).toBe(200);
    const { data } = await admin.from("chat_interactions").select("feedback").eq("id", id).single();
    expect(data).toEqual({ feedback: -1 });
    expect((await fb({ id, conversationId, value: null })).status).toBe(200);
  });

  it("gives a signed-out visitor no history from the server", async () => {
    const { GET } = await import("@/app/api/chat/history/route");
    expect(await (await GET()).json()).toEqual({ ok: true, conversation: null });
  });

  it("marks a late answer read only for a signed-in student (0160)", async () => {
    const { POST: SEEN } = await import("@/app/api/chat/seen/route");
    const seen = (body: unknown) =>
      SEEN(
        new NextRequest("http://localhost:3000/api/chat/seen", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      );
    expect((await seen({ conversationId: "x" })).status).toBe(400);
    expect((await seen({ conversationId: randomUUID() })).status).toBe(401);
  });

  it("stores a button's answer in the conversation (0159)", async () => {
    const { POST: FAQ } = await import("@/app/api/chat/faq/route");
    const conversationId = randomUUID();
    const res = await FAQ(
      new NextRequest("http://localhost:3000/api/chat/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": `faq-${RUN}` },
        body: JSON.stringify({ questionId: "notes", conversationId, pagePath: "/notes" }),
      })
    );
    const { reply } = await res.json();
    const { data } = await admin
      .from("chat_interactions")
      .select("reply, reply_source, page_path")
      .eq("conversation_id", conversationId);
    expect(data).toEqual([{ reply, reply_source: "template", page_path: "/notes" }]);
    await admin.from("chat_interactions").delete().eq("conversation_id", conversationId);
  });
});

