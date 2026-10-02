/**
 * Integration test for POST /api/activity/practice with `picks` — the bank's
 * right-or-wrong recording (2026-10-02, ENGAGEMENT_SPEC B3).
 *
 * Drives the real route handler against the TEST Supabase project as a real
 * signed-in student. The only substitution is the session lookup: the route
 * reads its session from Next's request cookies, which do not exist outside a
 * request, so `getSessionUser` and `createSupabaseServerClient` hand back the
 * test user and that user's own JWT client. Every write therefore goes through
 * the same RLS a browser would meet.
 */
import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { NextRequest } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { mustSignIn } from "./helpers/fixture";
import { answerDedupeKey } from "@/lib/questions/bankVerdict";

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
const EMAIL = `bank_verdict_${STAMP}@test.local`;
const PASSWORD = `Pw-${STAMP}-verdict`;

type Q = { id: string; right: string; wrong: string };

function post(body: unknown): Promise<Response> {
  return POST(
    new NextRequest("http://localhost:3000/api/activity/practice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  );
}

describe.skipIf(!HAS_ENV)("POST /api/activity/practice — bank verdicts", () => {
  let admin: SupabaseClient;
  let userId = "";
  // Three gradable PUBLIC MCQs from the seeded bank: [plain right, plain wrong, recovery].
  let qs: Q[] = [];

  async function rows(questionId: string) {
    const { data, error } = await admin
      .from("user_activity")
      .select("kind, metadata, dedupe_key")
      .eq("user_id", userId)
      .eq("ref_id", questionId)
      .order("created_at");
    if (error) throw new Error(error.message);
    return (data ?? []) as { kind: string; metadata: Record<string, unknown>; dedupe_key: string | null }[];
  }

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

    const created = await admin.auth.admin.createUser({ email: EMAIL, password: PASSWORD, email_confirm: true });
    if (created.error) throw new Error(created.error.message);
    userId = created.data.user!.id;

    const client = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    await mustSignIn("bank verdict student", client, { email: EMAIL, password: PASSWORD });
    session.user = { id: userId, email: EMAIL };
    session.client = client;

    const { data, error } = await admin
      .from("questions")
      .select("id, question_format, cancelled_note, options(label, is_correct)")
      .eq("visibility", "PUBLIC")
      .eq("question_format", "mcq")
      .is("cancelled_note", null)
      .limit(40);
    if (error) throw new Error(error.message);
    for (const q of (data ?? []) as { id: string; options: { label: string; is_correct: boolean }[] }[]) {
      const keyed = q.options.filter((o) => o.is_correct);
      const other = q.options.find((o) => !o.is_correct);
      if (q.options.length === 4 && keyed.length === 1 && other) {
        qs.push({ id: q.id, right: keyed[0].label, wrong: other.label });
      }
      if (qs.length === 3) break;
    }
    if (qs.length < 3) throw new Error("test DB has fewer than 3 gradable PUBLIC MCQs");
  });

  afterAll(async () => {
    if (!admin || !userId) return;
    await admin.from("user_activity").delete().eq("user_id", userId);
    await admin.from("rate_limits").delete().eq("bucket", `practice:user:${userId}`);
    await admin.auth.admin.deleteUser(userId);
  });

  it("grades a right and a wrong pick: verdicts on the reveal rows, the miss into the drill", async () => {
    const [right, wrong] = qs;
    const res = await post({
      questionIds: [right.id, wrong.id],
      surface: "bank",
      picks: { [right.id]: right.right, [wrong.id]: wrong.wrong },
    });
    expect(res.status).toBe(204);

    const r = await rows(right.id);
    expect(r).toHaveLength(1);
    expect(r[0]).toMatchObject({
      kind: "question_practiced",
      metadata: { surface: "bank", chose: right.right, correct: true },
    });

    const w = await rows(wrong.id);
    expect(w.map((x) => x.kind).sort()).toEqual(["answer_wrong", "question_practiced"]);
    expect(w.find((x) => x.kind === "answer_wrong")).toMatchObject({
      metadata: { surface: "bank", chose: wrong.wrong },
      dedupe_key: answerDedupeKey("bank", userId, wrong.id, new Date()),
    });
  });

  it("records only ONE drill verdict per question per day, however often it is re-tapped", async () => {
    const wrong = qs[1];
    // The same miss again, then the answer the card has just shown them.
    await post({ questionIds: [wrong.id], surface: "bank", picks: { [wrong.id]: wrong.wrong } });
    await post({ questionIds: [wrong.id], surface: "bank", picks: { [wrong.id]: wrong.right } });

    const w = await rows(wrong.id);
    // Every reveal is history; the ladder keeps the day's first verdict alone.
    expect(w.filter((x) => x.kind === "question_practiced")).toHaveLength(3);
    expect(w.filter((x) => x.kind === "answer_wrong")).toHaveLength(1);
    expect(w.filter((x) => x.kind === "answer_correct")).toHaveLength(0);
  });

  it("a right pick on a question missed on an EARLIER day is a recovery (answer_correct)", async () => {
    const q = qs[2];
    const { error } = await admin.from("user_activity").insert({
      user_id: userId,
      kind: "answer_wrong",
      ref_id: q.id,
      ref_kind: "question",
      metadata: {},
      created_at: new Date(Date.now() - 3 * 86_400_000).toISOString(),
    });
    if (error) throw new Error(error.message);

    const res = await post({ questionIds: [q.id], surface: "bank", picks: { [q.id]: q.right } });
    expect(res.status).toBe(204);
    const kinds = (await rows(q.id)).map((x) => x.kind);
    expect(kinds).toContain("answer_correct");
  });

  it("still records a plain reveal from a tab running the pre-verdict bundle", async () => {
    const q = qs[0];
    const before = (await rows(q.id)).length;
    const res = await post({ questionIds: [q.id], surface: "bank" });
    expect(res.status).toBe(204);
    const after = await rows(q.id);
    expect(after).toHaveLength(before + 1);
    expect(after[after.length - 1].metadata).toEqual({ surface: "bank" });
  });

  it("does not grade picks from other surfaces — the bank only, for now", async () => {
    const q = qs[0];
    const before = (await rows(q.id)).length;
    await post({ questionIds: [q.id], surface: "board", picks: { [q.id]: q.wrong } });
    const after = await rows(q.id);
    expect(after).toHaveLength(before + 1);
    expect(after[after.length - 1]).toMatchObject({ kind: "question_practiced", metadata: { surface: "board" } });
  });

  it("rejects a malformed pick (400) and writes nothing", async () => {
    const q = qs[0];
    const before = (await rows(q.id)).length;
    const res = await post({ questionIds: [q.id], surface: "bank", picks: { [q.id]: "E" } });
    expect(res.status).toBe(400);
    expect(await rows(q.id)).toHaveLength(before);
  });
});
