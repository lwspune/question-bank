/**
 * "Same mistake again" through the real route (2026-11-14): POST
 * /api/activity/practice returns `moment` of kind same_mistake when a student
 * misses a bank question they had missed before, naming the earlier miss.
 *
 * Same harness as practice-route-verdict.integration.test.ts: the real route
 * against the TEST project as a real signed-in student, with only the session
 * lookup substituted, so every read runs through the student's own RLS.
 */
import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { NextRequest } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { mustSignIn } from "./helpers/fixture";

const session = vi.hoisted(() => ({
  user: null as { id: string; email: string } | null,
  client: null as unknown,
}));
vi.mock("@/lib/auth", () => ({ getSessionUser: async () => session.user }));
vi.mock("@/lib/supabase/server", () => ({ createSupabaseServerClient: () => session.client }));

import { POST } from "@/app/api/activity/practice/route";
import { testRunId } from "./helpers/runId";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = testRunId();
const EMAIL = `same_mistake_${STAMP}@test.local`;
const PASSWORD = `Pw-${STAMP}-same`;

/** A gradable question with its key and two different wrong options. */
type Q = { id: string; right: string; wrong: string; wrong2: string };

/** The Same mistake line in a reply, if any (the stuck offer may take the line instead). */
function sameMistakeIn(json: Record<string, unknown> | null): unknown {
  const m = json?.moment as { kind?: string } | undefined;
  return m?.kind === "same_mistake" ? m : undefined;
}

async function post(body: unknown): Promise<{ status: number; json: Record<string, unknown> | null }> {
  const res = await POST(
    new NextRequest("http://localhost:3000/api/activity/practice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  );
  return { status: res.status, json: res.status === 200 ? ((await res.json()) as Record<string, unknown>) : null };
}

/** One tap, sent the way the page's debounced flush sends it. */
function tap(id: string, label: string, surface = "bank") {
  return post({ questionIds: [id], surface, picks: { [id]: label }, celebrate: true });
}

describe.skipIf(!HAS_ENV)("POST /api/activity/practice: Same mistake again", () => {
  let admin: SupabaseClient;
  let userId = "";
  const qs: Q[] = [];

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

    const created = await admin.auth.admin.createUser({ email: EMAIL, password: PASSWORD, email_confirm: true });
    if (created.error) throw new Error(created.error.message);
    userId = created.data.user!.id;

    const client = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    await mustSignIn("same mistake student", client, { email: EMAIL, password: PASSWORD });
    session.user = { id: userId, email: EMAIL };
    session.client = client;

    // The test project is small, so questions may share a subtopic and three
    // misses may make the stuck offer: "nothing" below means no Same mistake line.
    const { data, error } = await admin
      .from("questions")
      .select("id, options(label, is_correct)")
      .eq("visibility", "PUBLIC")
      .eq("question_format", "mcq")
      .is("cancelled_note", null)
      .limit(200);
    if (error) throw new Error(error.message);
    for (const q of (data ?? []) as { id: string; options: { label: string; is_correct: boolean }[] }[]) {
      const keyed = q.options.filter((o) => o.is_correct);
      const others = q.options.filter((o) => !o.is_correct);
      if (q.options.length !== 4 || keyed.length !== 1 || others.length < 2) continue;
      qs.push({ id: q.id, right: keyed[0].label, wrong: others[0].label, wrong2: others[1].label });
      if (qs.length === 6) break;
    }
    if (qs.length < 6) throw new Error("test DB has fewer than 6 gradable PUBLIC MCQs");
  });

  afterAll(async () => {
    if (!admin || !userId) return;
    await admin.from("user_activity").delete().eq("user_id", userId);
    await admin.from("rate_limits").delete().eq("bucket", `practice:user:${userId}`);
    await admin.auth.admin.deleteUser(userId);
  });

  it("says nothing on a first miss", async () => {
    const r = await tap(qs[0].id, qs[0].wrong);
    expect(sameMistakeIn(r.json)).toBeUndefined();
  });

  it("names the same option on a second miss of that question", async () => {
    const r = await tap(qs[0].id, qs[0].wrong);
    expect(r.status).toBe(200);
    expect(r.json?.moment).toMatchObject({
      kind: "same_mistake",
      questionId: qs[0].id,
      chose: qs[0].wrong,
      prior: { chose: qs[0].wrong, inMock: false },
    });
  });

  it("names the earlier option when this miss picked another", async () => {
    await tap(qs[1].id, qs[1].wrong);
    const r = await tap(qs[1].id, qs[1].wrong2);
    expect(r.json?.moment).toMatchObject({ kind: "same_mistake", chose: qs[1].wrong2, prior: { chose: qs[1].wrong } });
  });

  it("knows a miss from a mock, which records no option", async () => {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { error } = await admin.from("user_activity").insert({
      user_id: userId,
      kind: "answer_wrong",
      ref_id: qs[2].id,
      ref_kind: "question",
      metadata: { mockId: "00000000-0000-4000-8000-000000000001", sectionKey: "s1" },
      created_at: yesterday,
    });
    if (error) throw new Error(error.message);
    const r = await tap(qs[2].id, qs[2].wrong);
    expect(r.json?.moment).toMatchObject({ kind: "same_mistake", prior: { chose: null, inMock: true } });
  });

  it("does not count Review later as a miss", async () => {
    const { error } = await admin.from("user_activity").insert({
      user_id: userId,
      kind: "answer_wrong",
      ref_id: qs[3].id,
      ref_kind: "question",
      metadata: { surface: "bank", selfMark: "review_later" },
    });
    if (error) throw new Error(error.message);
    const r = await tap(qs[3].id, qs[3].wrong);
    expect(sameMistakeIn(r.json)).toBeUndefined();
  });

  it("says nothing on a right answer", async () => {
    const r = await tap(qs[0].id, qs[0].right);
    expect(sameMistakeIn(r.json)).toBeUndefined();
  });

  it("is a bank line only: a board miss carries none", async () => {
    await tap(qs[4].id, qs[4].wrong);
    const r = await tap(qs[4].id, qs[4].wrong, "board");
    expect(sameMistakeIn(r.json)).toBeUndefined();
  });

  it("never rides on a page-hide beacon, whose reply nobody reads", async () => {
    await tap(qs[5].id, qs[5].wrong);
    const r = await post({ questionIds: [qs[5].id], surface: "bank", picks: { [qs[5].id]: qs[5].wrong } });
    expect(r.status).toBe(204);
  });

  it("no longer sends the retired Fix nudge", async () => {
    const r = await tap(qs[1].id, qs[1].wrong);
    expect(r.json?.fixNudge).toBeUndefined();
  });
});
