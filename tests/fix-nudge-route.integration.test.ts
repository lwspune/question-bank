/**
 * Integration test for the bank's "5 wrong today" line (2026-10-05): POST
 * /api/activity/practice returns `fixNudge` on the flush that takes a
 * student's bank misses for the day to a multiple of five, and nowhere else.
 *
 * Same harness as practice-route-verdict.integration.test.ts: the real route
 * against the TEST project as a real signed-in student, with only the session
 * lookup substituted, so the count runs through the student's own RLS.
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

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = Date.now();
const EMAIL = `fix_nudge_${STAMP}@test.local`;
const PASSWORD = `Pw-${STAMP}-nudge`;

type Q = { id: string; wrong: string };

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

/** One wrong tap, sent the way the page's debounced flush sends it. */
function wrongTap(q: Q, surface = "bank") {
  return post({ questionIds: [q.id], surface, picks: { [q.id]: q.wrong }, celebrate: true });
}

describe.skipIf(!HAS_ENV)("POST /api/activity/practice — the fix nudge", () => {
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
    await mustSignIn("fix nudge student", client, { email: EMAIL, password: PASSWORD });
    session.user = { id: userId, email: EMAIL };
    session.client = client;

    const { data, error } = await admin
      .from("questions")
      .select("id, options(label, is_correct)")
      .eq("visibility", "PUBLIC")
      .eq("question_format", "mcq")
      .is("cancelled_note", null)
      .limit(80);
    if (error) throw new Error(error.message);
    for (const q of (data ?? []) as { id: string; options: { label: string; is_correct: boolean }[] }[]) {
      const keyed = q.options.filter((o) => o.is_correct);
      const other = q.options.find((o) => !o.is_correct);
      if (q.options.length === 4 && keyed.length === 1 && other) qs.push({ id: q.id, wrong: other.label });
      if (qs.length === 11) break;
    }
    if (qs.length < 11) throw new Error("test DB has fewer than 11 gradable PUBLIC MCQs");
  });

  afterAll(async () => {
    if (!admin || !userId) return;
    await admin.from("user_activity").delete().eq("user_id", userId);
    await admin.from("rate_limits").delete().eq("bucket", `practice:user:${userId}`);
    await admin.auth.admin.deleteUser(userId);
  });

  it("says nothing on the first four wrong taps, then names the fifth", async () => {
    for (const q of qs.slice(0, 4)) {
      const r = await wrongTap(q);
      expect(r.json?.fixNudge).toBeUndefined();
    }
    const fifth = await wrongTap(qs[4]);
    expect(fifth.status).toBe(200);
    expect(fifth.json?.fixNudge).toMatchObject({ questionId: qs[4].id, wrongToday: 5 });
    const due = (fifth.json?.fixNudge as { due: unknown }).due;
    expect(due === null || (typeof due === "number" && due >= 1)).toBe(true);
  });

  it("does not count a re-tap of a question already missed today", async () => {
    const again = await wrongTap(qs[4]);
    expect(again.json?.fixNudge).toBeUndefined();
  });

  it("stays quiet between multiples and fires again on the tenth", async () => {
    for (const q of qs.slice(5, 9)) {
      const r = await wrongTap(q);
      expect(r.json?.fixNudge).toBeUndefined();
    }
    const tenth = await wrongTap(qs[9]);
    expect(tenth.json?.fixNudge).toMatchObject({ questionId: qs[9].id, wrongToday: 10 });
  });

  it("is a bank line only: a board miss is not counted and carries no nudge", async () => {
    const board = await wrongTap(qs[10], "board");
    expect(board.json?.fixNudge).toBeUndefined();
  });

  it("never rides on a page-hide beacon, whose reply nobody reads", async () => {
    const r = await post({ questionIds: [qs[0].id], surface: "bank", picks: { [qs[0].id]: qs[0].wrong } });
    expect(r.status).toBe(204);
  });
});
