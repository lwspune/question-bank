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
import { ABUSE_REPLY } from "@/lib/chat/abuse";
import { ANON_ASKED_COOKIE, ANON_FREE_COOKIE, ANON_FREE_REPLIES_MAX, SIGN_IN_TO_ASK_REPLY } from "@/lib/chat/anonLimit";

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
  let askedId = "";
  let siblingId = "";

  async function setSettings(s: {
    ai_enabled: boolean;
    per_person_per_hour: number;
    ai_answers_per_day: number;
    explain_enabled?: boolean;
    plan_enabled?: boolean;
  }) {
    // Explanations (0168) and plans (0170) off unless a test turns them on, so one test's switch cannot leak into the next.
    const { error } = await admin.from("chat_settings").update({ explain_enabled: false, plan_enabled: false, ...s }).eq("id", true);
    if (error) throw new Error(error.message);
  }

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    const { data } = await admin
      .from("chat_settings")
      .select("ai_enabled, explain_enabled, plan_enabled, per_person_per_hour, ai_answers_per_day")
      .eq("id", true)
      .single();
    saved = data;
    // A PUBLIC single-answer question whose subtopic has another one, for the explanation tests.
    const { data: rows } = await admin
      .from("questions")
      .select("id, subtopic_id")
      .eq("visibility", "PUBLIC")
      .eq("question_format", "mcq")
      .is("set_id", null)
      .not("subtopic_id", "is", null)
      .limit(500);
    const bySubtopic = new Map<string, string[]>();
    for (const r of (rows ?? []) as { id: string; subtopic_id: string }[]) {
      bySubtopic.set(r.subtopic_id, [...(bySubtopic.get(r.subtopic_id) ?? []), r.id]);
    }
    const pair = [...bySubtopic.values()].find((ids) => ids.length >= 2);
    if (!pair) throw new Error("test DB has no subtopic with two PUBLIC questions (npm run testdb:seed)");
    [askedId, siblingId] = pair;
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

  it("keeps the tokens of an AI answer that failed part-way, and gives the fixed reply", async () => {
    await setSettings({ ai_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
    askV.mockReset();
    askV.mockResolvedValue({
      ok: false,
      error: "Anthropic API 529",
      tokensIn: 80,
      tokensOut: 10,
      cacheReadTokens: 0,
      cacheWriteTokens: 2800,
      cacheWrite1hTokens: 2800,
    });
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { POST } = await import("@/app/api/chat/typed/route");
    const res = await POST(post({ message: `route-${RUN}-partial atoms` }));
    spy.mockRestore();
    expect(await res.json()).toMatchObject({ reply: TYPED_QUESTION_REPLY, source: "fallback" });
    const { data } = await admin
      .from("chat_interactions")
      .select("reply_source, tokens_in, tokens_out, cache_read_tokens, cache_write_tokens, cache_write_1h_tokens")
      .like("message", `route-${RUN}-partial%`);
    expect(data).toEqual([
      {
        reply_source: "ai_failed",
        tokens_in: 80,
        tokens_out: 10,
        cache_read_tokens: 0,
        cache_write_tokens: 2800,
        cache_write_1h_tokens: 2800,
      },
    ]);
  });

  it("gives the fixed reply once the site's AI answers for the day are used up", async () => {
    await setSettings({ ai_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 0 });
    askV.mockReset();
    const { POST } = await import("@/app/api/chat/typed/route");
    const res = await POST(post({ message: `route-${RUN}-cap hello` }));
    expect((await res.json()).reply).toBe(TYPED_QUESTION_REPLY);
    expect(askV).not.toHaveBeenCalled();
  });

  it("answers abuse with one calm line and then nothing, never calling the AI or using a visitor's question (owner, 2026-10-20)", async () => {
    await setSettings({ ai_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
    askV.mockReset();
    const { POST } = await import("@/app/api/chat/typed/route");
    const conversationId = randomUUID();
    const first = await POST(post({ message: `route-${RUN}-abuse1 GAND MAARA`, conversationId }));
    expect(await first.json()).toMatchObject({ ok: true, reply: ABUSE_REPLY, links: [], source: "fallback" });
    expect(first.headers.get("set-cookie") ?? "").not.toContain(`${ANON_ASKED_COOKIE}=`);
    const second = await POST(post({ message: `route-${RUN}-abuse2 chutiya`, conversationId }));
    expect(await second.json()).toMatchObject({ ok: true, reply: null, silent: true });
    expect(askV).not.toHaveBeenCalled();
    const { data } = await admin
      .from("chat_interactions")
      .select("message, reply, reply_source")
      .eq("conversation_id", conversationId)
      .order("created_at");
    expect(data).toEqual([
      { message: `route-${RUN}-abuse1 GAND MAARA`, reply: ABUSE_REPLY, reply_source: "fallback" },
      { message: `route-${RUN}-abuse2 chutiya`, reply: null, reply_source: null },
    ]);
  });

  it("answers a signed-out visitor's first question, tells V it is their only one, and marks the browser", async () => {
    await setSettings({ ai_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
    askV.mockReset();
    askV.mockResolvedValue({ ok: true, reply: "Atoms is at /mock.", tokensIn: 10, tokensOut: 5 });
    const { POST } = await import("@/app/api/chat/typed/route");
    const res = await POST(post({ message: `route-${RUN}-anon1 atoms pyq` }));
    expect(await res.json()).toMatchObject({ ok: true, source: "ai", signInToContinue: true });
    expect(res.headers.get("set-cookie")).toContain(`${ANON_ASKED_COOKIE}=1`);
    expect(askV.mock.calls[0][0].systemTail).toMatch(/one answer/i);
  });

  it("asks a signed-out visitor to sign in for a second question, without calling the AI, and keeps the question", async () => {
    await setSettings({ ai_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
    askV.mockReset();
    const { POST } = await import("@/app/api/chat/typed/route");
    const req = post({ message: `route-${RUN}-anon2 and nuclei?` });
    req.headers.set("cookie", `${ANON_ASKED_COOKIE}=1`);
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({
      ok: true,
      reply: SIGN_IN_TO_ASK_REPLY,
      source: "fallback",
      signInRequired: true,
    });
    expect(askV).not.toHaveBeenCalled();
    expect(await rowFor(`route-${RUN}-anon2`)).toEqual([
      {
        message: `route-${RUN}-anon2 and nuclei?`,
        reply: SIGN_IN_TO_ASK_REPLY,
        reply_source: "fallback",
        tokens_in: null,
        tokens_out: null,
      },
    ]);
  });

  // 2026-10-18: a visitor's one question went on "Hii". A reply that only asks back is free.
  it("lets a signed-out visitor keep their question when V only asks back, and counts it", async () => {
    await setSettings({ ai_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
    askV.mockReset();
    askV.mockResolvedValue({ ok: true, reply: "Hi! Which exam are you studying for?", tokensIn: 10, tokensOut: 5 });
    const { POST } = await import("@/app/api/chat/typed/route");
    const req = post({ message: `route-${RUN}-anonfree Hii` });
    req.headers.set("cookie", `${ANON_FREE_COOKIE}=1`);
    const res = await POST(req);
    const body = await res.json();
    expect(body).toMatchObject({ ok: true, source: "ai" });
    expect(body.signInToContinue).toBeUndefined();
    const cookies = res.headers.get("set-cookie") ?? "";
    expect(cookies).toContain(`${ANON_FREE_COOKIE}=2`);
    expect(cookies).not.toContain(`${ANON_ASKED_COOKIE}=`);
  });

  it("uses the signed-out question once the free replies are spent, even on a question back", async () => {
    await setSettings({ ai_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
    askV.mockReset();
    askV.mockResolvedValue({ ok: true, reply: "Which exam are you studying for?", tokensIn: 10, tokensOut: 5 });
    const { POST } = await import("@/app/api/chat/typed/route");
    const req = post({ message: `route-${RUN}-anonspent hmm` });
    req.headers.set("cookie", `${ANON_FREE_COOKIE}=${ANON_FREE_REPLIES_MAX}`);
    const res = await POST(req);
    expect(await res.json()).toMatchObject({ signInToContinue: true });
    expect(res.headers.get("set-cookie")).toContain(`${ANON_ASKED_COOKIE}=1`);
  });

  // 2026-10-18 (migration 0167): what V searched is kept with the reply.
  it("stores the tool calls V made with its reply", async () => {
    await setSettings({ ai_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
    askV.mockReset();
    const calls = [{ name: "find_chapters", input: { query: "rotational dynamics" }, result: "No chapter matched." }];
    askV.mockResolvedValue({ ok: true, reply: "Not found, try /browse.", tokensIn: 10, tokensOut: 5, toolCalls: calls });
    const { POST } = await import("@/app/api/chat/typed/route");
    await POST(post({ message: `route-${RUN}-tools rotational dynamics` }));
    const { data } = await admin.from("chat_interactions").select("tool_calls").like("message", `route-${RUN}-tools%`);
    expect(data).toEqual([{ tool_calls: calls }]);
  });

  it("sends the same fixed instructions whatever the page, so the cache can hit, and stores cache use", async () => {
    await setSettings({ ai_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
    askV.mockReset();
    askV.mockResolvedValue({
      ok: true,
      reply: "See /mock.",
      tokensIn: 40,
      tokensOut: 5,
      cacheReadTokens: 2800,
      cacheWriteTokens: 1200,
      cacheWrite1hTokens: 1200,
    });
    const { POST } = await import("@/app/api/chat/typed/route");
    // Two chapter pages, so the page carries a chapter line too (2026-10-19), and neither path is a nav fact.
    const pageA = "/questions/cbse-12/physics/atoms";
    const pageB = "/board/mh-hsc-12/chemistry/solid-state";
    await POST(post({ message: `route-${RUN}-cache1 atoms`, pagePath: pageA }));
    await POST(post({ message: `route-${RUN}-cache2 nuclei`, pagePath: pageB }));
    const [systemA, systemB] = [askV.mock.calls[0][0].system as string, askV.mock.calls[1][0].system as string];
    expect(systemA).not.toContain(pageA);
    expect(systemB).not.toContain(pageB);
    // The live numbers (bank size, free limits) are read per question, and a neighbouring test file can
    // change them between the two calls in the shared test database: 177 -> 178 questions, then a free
    // limit 5 -> 2, each failed a push on 2026-10-19. The page is what must not change the prompt.
    const withoutNumbers = (s: string) => s.replace(/\d+/g, "N");
    expect(withoutNumbers(systemA)).toBe(withoutNumbers(systemB));
    expect(askV.mock.calls[0][0].systemTail).not.toBe(askV.mock.calls[1][0].systemTail);
    const { data } = await admin
      .from("chat_interactions")
      .select("cache_read_tokens, cache_write_tokens, cache_write_1h_tokens")
      .like("message", `route-${RUN}-cache1%`);
    expect(data).toEqual([{ cache_read_tokens: 2800, cache_write_tokens: 1200, cache_write_1h_tokens: 1200 }]);
  });

  // "Ask V about this question" (2026-10-19, migration 0168).
  describe("with explanations switched on", () => {
    const ok = { ok: true, tokensIn: 1, tokensOut: 1, cacheReadTokens: 0, cacheWriteTokens: 0 } as const;

    // 2026-10-20: a practice rep written into the notes, read from the notes by page and position.
    it("tells V the notes practice question the student tapped, read from the notes themselves", async () => {
      await setSettings({ ai_enabled: true, explain_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
      askV.mockReset();
      askV.mockResolvedValue({ ...ok, reply: "Want a hint or the full solution?" });
      const { POST } = await import("@/app/api/chat/typed/route");
      const pagePath = "/notes/mht-cet-chemistry/halogen-derivatives/cethal-classification-and-properties";
      await POST(
        post({
          message: `route-${RUN}-notes1 explain`,
          pagePath,
          question: { notes: { concept: "cethal-classes-of-halides", item: "practice", index: 0 } },
        })
      );
      const tail = (askV.mock.calls[0][0] as { systemTail: string }).systemTail;
      expect(tail).toMatch(/practice question in the notes/);
      expect(tail).toContain("STORED ANSWER");
      // A notes item on a page it is not on, or with explanations off, tells V nothing.
      await POST(post({ message: `route-${RUN}-notes2 explain`, pagePath: "/browse", question: { notes: { concept: "cethal-classes-of-halides", item: "self" } } }));
      expect((askV.mock.calls[1][0] as { systemTail: string }).systemTail).not.toMatch(/practice question in the notes/);
      await setSettings({ ai_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
      await POST(post({ message: `route-${RUN}-notes3 explain`, pagePath, question: { notes: { concept: "cethal-classes-of-halides", item: "practice", index: 0 } } }));
      expect((askV.mock.calls[2][0] as { systemTail: string }).systemTail).not.toMatch(/practice question in the notes/);
    });

    it("gives V the question tools and names the tapped question and the pick", async () => {
      await setSettings({ ai_enabled: true, explain_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
      askV.mockReset();
      askV.mockResolvedValue({ ...ok, reply: "Want a hint or the full solution?" });
      const { POST } = await import("@/app/api/chat/typed/route");
      await POST(post({ message: `route-${RUN}-ask1 explain`, question: { id: askedId, chose: "b" } }));
      const call = askV.mock.calls[0][0] as { tools: { name: string }[]; systemTail: string; system: string };
      expect(call.tools.map((t) => t.name)).toEqual([
        "find_chapters",
        "my_progress",
        "exam_strategy",
        "recent_questions",
        "save_question",
        "get_question",
        "explain_question",
        "similar_question",
        "find_question",
        // V_SPEC.md step 2 (2026-10-22): concepts, under the same switch.
        "explain_concept",
      ]);
      expect(call.systemTail).toContain(`The student tapped Ask V on question ${askedId}. They picked (B).`);
      expect(call.system).toContain("explain_question");
      expect(call.system).toContain("explain_concept");
    });

    it("refuses a signed-out visitor an explanation, giving nothing away", async () => {
      await setSettings({ ai_enabled: true, explain_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
      askV.mockReset();
      let toolSaid = "";
      askV.mockImplementation(async (input: { tools: { name: string; run: (i: unknown) => Promise<string> }[] }) => {
        toolSaid = await input.tools.find((t) => t.name === "explain_question")!.run({ question_id: askedId });
        return { ...ok, reply: "Please sign in." };
      });
      const { POST } = await import("@/app/api/chat/typed/route");
      await POST(post({ message: `route-${RUN}-ask2 full solution`, question: { id: askedId } }));
      expect(toolSaid).toMatch(/signed out/i);
      expect(toolSaid).not.toContain("Correct answer");
    });

    it("hands the chat window the similar question V offered, never the one asked about", async () => {
      await setSettings({ ai_enabled: true, explain_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
      askV.mockReset();
      askV.mockImplementation(async (input: { tools: { name: string; run: (i: unknown) => Promise<string> }[] }) => {
        await input.tools.find((t) => t.name === "similar_question")!.run({ question_id: askedId });
        return { ...ok, reply: "Try this one below." };
      });
      const { POST } = await import("@/app/api/chat/typed/route");
      const res = await POST(post({ message: `route-${RUN}-ask3 similar`, question: { id: askedId } }));
      const json = (await res.json()) as { similarQuestionId?: string };
      expect(json.similarQuestionId).toBeTruthy();
      expect(json.similarQuestionId).not.toBe(askedId);
    });
  });

  // The card inside V and the switch the Ask V buttons read (2026-10-19). Kept in this file: both
  // change chat_settings, and two files doing that at once in the shared test DB would race.
  describe("the question card and the feature switch", () => {
    const get = (url: string) => new NextRequest(`http://localhost:3000${url}`);

    it("tells the cards whether explanations are on, needing the AI on too", async () => {
      const { GET } = await import("@/app/api/chat/features/route");
      const req = () => get("/api/chat/features");
      await setSettings({ ai_enabled: true, explain_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
      expect(await (await GET(req())).json()).toEqual({ explain: true, plan: false });
      await setSettings({ ai_enabled: false, explain_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
      expect(await (await GET(req())).json()).toEqual({ explain: false, plan: false });
      await setSettings({ ai_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
      expect(await (await GET(req())).json()).toEqual({ explain: false, plan: false });
    });

    // 2026-10-20: "Plan my week" sits beside "Build a practice test" while V's week plan is on.
    it("tells the window whether the week plan is on, needing the AI on too", async () => {
      const { GET } = await import("@/app/api/chat/features/route");
      const req = () => get("/api/chat/features");
      await setSettings({ ai_enabled: true, plan_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
      expect(await (await GET(req())).json()).toEqual({ explain: false, plan: true });
      await setSettings({ ai_enabled: false, plan_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
      expect(await (await GET(req())).json()).toEqual({ explain: false, plan: false });
    });

    // 2026-10-19, live: the deployed route kept answering {explain:false} after the switch was saved,
    // while /api/chat/question (which reads its request) saw it on. A GET that ignores its request can
    // be built as static, and its database read cached, so this one opts out of both explicitly.
    it("reads the switch on every request in a production build, never from a build-time copy", async () => {
      const mod = await import("@/app/api/chat/features/route");
      expect(mod.dynamic).toBe("force-dynamic");
      expect(mod.revalidate).toBe(0);
      expect(mod.fetchCache).toBe("force-no-store");
      expect(mod.GET.length).toBe(1);
    });

    it("serves a card without its answer while explanations are on, and nothing while off", async () => {
      const { GET } = await import("@/app/api/chat/question/route");
      await setSettings({ ai_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
      expect((await GET(get(`/api/chat/question?id=${askedId}`))).status).toBe(404);
      await setSettings({ ai_enabled: true, explain_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
      const res = await GET(get(`/api/chat/question?id=${askedId}`));
      expect(res.status).toBe(200);
      const body = (await res.json()) as { question: { id: string; options: unknown[] } };
      expect(body.question.id).toBe(askedId);
      expect(body.question.options.length).toBeGreaterThan(0);
      expect(JSON.stringify(body)).not.toMatch(/isCorrect|is_correct|solution/);
      expect((await GET(get("/api/chat/question?id=nope"))).status).toBe(404);
    });

    it("checks a pick only for a signed-in student", async () => {
      const { POST } = await import("@/app/api/chat/question/route");
      await setSettings({ ai_enabled: true, explain_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
      const res = await POST(
        new NextRequest("http://localhost:3000/api/chat/question", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: askedId, chose: "A" }),
        })
      );
      expect(res.status).toBe(401);
    });
  });

  it("with explanations off, ignores a tapped question and offers no question tools", async () => {
    await setSettings({ ai_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
    askV.mockReset();
    askV.mockResolvedValue({ ok: true, reply: "See /notes.", tokensIn: 1, tokensOut: 1, cacheReadTokens: 0, cacheWriteTokens: 0 });
    const { POST } = await import("@/app/api/chat/typed/route");
    await POST(post({ message: `route-${RUN}-ask4 explain`, question: { id: askedId } }));
    const call = askV.mock.calls[0][0] as { tools: { name: string }[]; systemTail: string };
    expect(call.tools.map((t) => t.name)).toEqual(["find_chapters", "my_progress", "exam_strategy", "recent_questions", "save_question"]);
    expect(call.systemTail).not.toContain("tapped Ask V");
  });

  it("gives V the my_progress tool, which reads nothing for a signed-out visitor", async () => {
    await setSettings({ ai_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
    askV.mockReset();
    askV.mockResolvedValue({ ok: true, reply: "Sign in first.", tokensIn: 1, tokensOut: 1, cacheReadTokens: 0, cacheWriteTokens: 0 });
    const { POST } = await import("@/app/api/chat/typed/route");
    await POST(post({ message: `route-${RUN}-prog how am I doing` }));
    const tools = askV.mock.calls[0][0].tools as { name: string; run: (i: unknown) => Promise<string> }[];
    expect(tools.map((t) => t.name)).toEqual(["find_chapters", "my_progress", "exam_strategy", "recent_questions", "save_question"]);
    expect(await tools[1].run({})).toMatch(/signed out/i);
    // 2026-10-20: the student's recent questions and saves, which a signed-out visitor does not have.
    expect(await tools[3].run({})).toMatch(/signed out/i);
    expect(await tools[4].run({ question_id: askedId })).toMatch(/signed out/i);
  });

  // 2026-10-19 study-partner Phase 3: the plan tools are always offered (the tool list is cached), and read nothing signed out.
  it("asks a signed-out visitor to sign in for a week plan, and shows no plan card", async () => {
    await setSettings({ ai_enabled: true, plan_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
    askV.mockReset();
    let said = "";
    askV.mockImplementation(async (input: { tools: { name: string; run: (i: unknown) => Promise<string> }[] }) => {
      expect(input.tools.map((t) => t.name)).toEqual(["find_chapters", "my_progress", "exam_strategy", "recent_questions", "save_question", "plan_week", "my_plan"]);
      said = await input.tools.find((t) => t.name === "plan_week")!.run({ exam: "NDA" });
      return { ok: true, reply: "Sign in first.", tokensIn: 1, tokensOut: 1, cacheReadTokens: 0, cacheWriteTokens: 0, toolCalls: [] };
    });
    const { POST } = await import("@/app/api/chat/typed/route");
    const res = await POST(post({ message: `route-${RUN}-plan plan my week` }));
    expect(said).toMatch(/sign in/i);
    expect(((await res.json()) as { planShown?: boolean }).planShown).toBeUndefined();
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
    expect(askV.mock.calls[1][0].systemTail).toContain("The student is on the page /mock");

    const { data } = await admin
      .from("chat_interactions")
      .select("conversation_id, page_path, reply_links")
      .like("message", `route-${RUN}-conv NEET%`);
    expect(data).toEqual([{ conversation_id: conversationId, page_path: "/browse", reply_links: ["/mock"] }]);
  });

  // 2026-10-21 (owner): V apologised for answers about ANOTHER question. V now remembers only the current
  // session (an hour with no messages ends one), each message names its question, and a student can reply
  // to an earlier message.
  describe("sessions, question labels and replies (0174)", () => {
    const ASKED = "33333333-3333-4333-8333-333333333333";

    async function seed(conversationId: string, message: string, minutesAgo: number, extra: Record<string, unknown> = {}) {
      const { data, error } = await admin
        .from("chat_interactions")
        .insert({
          event_type: "typed_question",
          message,
          reply: `reply to ${message}`,
          reply_source: "ai",
          conversation_id: conversationId,
          created_at: new Date(Date.now() - minutesAgo * 60_000).toISOString(),
          ...extra,
        })
        .select("id")
        .single();
      if (error) throw new Error(error.message);
      return data.id as string;
    }

    it("remembers only the current session, each message labelled with its question, and stores the question", async () => {
      await setSettings({ ai_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
      askV.mockReset();
      askV.mockResolvedValue({ ok: true, reply: "ok", tokensIn: 1, tokensOut: 1 });
      const conversationId = randomUUID();
      await seed(conversationId, `route-${RUN}-ses old`, 150);
      await seed(conversationId, `route-${RUN}-ses recent`, 20, { asked_question_id: ASKED });
      const { POST } = await import("@/app/api/chat/typed/route");
      await POST(post({ message: `route-${RUN}-ses now`, conversationId, question: { id: ASKED } }));
      expect(askV.mock.calls[0][0].history).toEqual([
        { role: "user", content: `[About question ${ASKED}]\nroute-${RUN}-ses recent` },
        { role: "assistant", content: `reply to route-${RUN}-ses recent` },
      ]);
      const { data } = await admin
        .from("chat_interactions")
        .select("asked_question_id")
        .eq("message", `route-${RUN}-ses now`);
      // Explanations are off here, so the tapped question is dropped and nothing is labelled.
      expect(data).toEqual([{ asked_question_id: null }]);
    });

    it("remembers nothing once the session has been quiet for over an hour", async () => {
      await setSettings({ ai_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
      askV.mockReset();
      askV.mockResolvedValue({ ok: true, reply: "ok", tokensIn: 1, tokensOut: 1 });
      const conversationId = randomUUID();
      await seed(conversationId, `route-${RUN}-quiet a`, 70);
      const { POST } = await import("@/app/api/chat/typed/route");
      await POST(post({ message: `route-${RUN}-quiet b`, conversationId }));
      expect(askV.mock.calls[0][0].history).toEqual([]);
    });

    it("stores the tapped question while explanations are on", async () => {
      await setSettings({ ai_enabled: true, explain_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
      askV.mockReset();
      askV.mockResolvedValue({ ok: true, reply: "ok", tokensIn: 1, tokensOut: 1 });
      const { POST } = await import("@/app/api/chat/typed/route");
      await POST(post({ message: `route-${RUN}-lbl tap`, conversationId: randomUUID(), question: { id: askedId } }));
      const { data } = await admin.from("chat_interactions").select("asked_question_id").eq("message", `route-${RUN}-lbl tap`);
      expect(data).toEqual([{ asked_question_id: askedId }]);
    });

    it("tells V which earlier exchange a reply is about, and stores the link", async () => {
      await setSettings({ ai_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
      askV.mockReset();
      askV.mockResolvedValue({ ok: true, reply: "ok", tokensIn: 1, tokensOut: 1 });
      const conversationId = randomUUID();
      const target = await seed(conversationId, `route-${RUN}-rep first`, 30, { asked_question_id: ASKED });
      await seed(conversationId, `route-${RUN}-rep second`, 20);
      await seed(conversationId, `route-${RUN}-rep third`, 10);
      const { POST } = await import("@/app/api/chat/typed/route");
      await POST(post({ message: `route-${RUN}-rep why`, conversationId, replyTo: target }));
      const sent = askV.mock.calls[0][0].message as string;
      expect(sent).toContain(`replying to an earlier exchange about question ${ASKED}`);
      expect(sent).toContain(`reply to route-${RUN}-rep first`);
      expect(sent.endsWith(`route-${RUN}-rep why`)).toBe(true);
      const { data } = await admin.from("chat_interactions").select("message, reply_to_id").eq("message", `route-${RUN}-rep why`);
      expect(data).toEqual([{ message: `route-${RUN}-rep why`, reply_to_id: target }]);
    });

    it("ignores a reply to a message from another conversation or an earlier session", async () => {
      await setSettings({ ai_enabled: true, per_person_per_hour: 15, ai_answers_per_day: 300 });
      askV.mockReset();
      askV.mockResolvedValue({ ok: true, reply: "ok", tokensIn: 1, tokensOut: 1 });
      const conversationId = randomUUID();
      const elsewhere = await seed(randomUUID(), `route-${RUN}-xrep other`, 5);
      const stale = await seed(conversationId, `route-${RUN}-xrep stale`, 200);
      await seed(conversationId, `route-${RUN}-xrep recent`, 5);
      const { POST } = await import("@/app/api/chat/typed/route");
      await POST(post({ message: `route-${RUN}-xrep a`, conversationId, replyTo: elsewhere }));
      await POST(post({ message: `route-${RUN}-xrep b`, conversationId, replyTo: stale }));
      for (const call of askV.mock.calls) expect(call[0].message).not.toContain("replying to an earlier exchange");
      const { data } = await admin
        .from("chat_interactions")
        .select("reply_to_id")
        .in("message", [`route-${RUN}-xrep a`, `route-${RUN}-xrep b`]);
      expect(data).toEqual([{ reply_to_id: null }, { reply_to_id: null }]);
    });
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
});

