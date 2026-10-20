/**
 * V's recent_questions and save_question in the test database
 * (lib/chat/myQuestionsServer.ts): a student sees only the questions THEY
 * opened in the last few hours, newest first with how each went, and a save
 * lands in their own saved list with its activity row.
 *
 * Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { mustSignIn } from "./helpers/fixture";
import { buildMyQuestionDeps, loadRecentQuestions } from "@/lib/chat/myQuestionsServer";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "my-questions-test-1234";
const RUN_ID = randomUUID().slice(0, 8);
const ALICE_EMAIL = `myq-alice-${RUN_ID}@test.local`;
const BOB_EMAIL = `myq-bob-${RUN_ID}@test.local`;

describe.skipIf(!HAS_ENV)("V's recent questions and saves", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;
  let alice: SupabaseClient;
  let aliceId = "";
  let bobId = "";
  let ids: string[] = [];

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    const [{ data: a }, { data: b }] = await Promise.all([
      admin.auth.admin.createUser({ email: ALICE_EMAIL, password: PASSWORD, email_confirm: true }),
      admin.auth.admin.createUser({ email: BOB_EMAIL, password: PASSWORD, email_confirm: true }),
    ]);
    aliceId = a.user!.id;
    bobId = b.user!.id;
    anonClient = createClient(url, anon, { auth: { persistSession: false } });
    alice = createClient(url, anon, { auth: { persistSession: false } });
    await mustSignIn(ALICE_EMAIL, alice, { email: ALICE_EMAIL, password: PASSWORD });

    const { data: qs } = await admin.from("questions").select("id").eq("visibility", "PUBLIC").limit(3);
    ids = ((qs ?? []) as { id: string }[]).map((q) => q.id);
    const at = (minAgo: number) => new Date(Date.now() - minAgo * 60_000).toISOString();
    const { error } = await admin.from("user_activity").insert([
      { user_id: aliceId, kind: "question_practiced", ref_id: ids[0], ref_kind: "question", metadata: { correct: true }, created_at: at(30) },
      { user_id: aliceId, kind: "question_practiced", ref_id: ids[1], ref_kind: "question", metadata: { correct: false }, created_at: at(5) },
      // Older than the window: not "just now".
      { user_id: aliceId, kind: "question_practiced", ref_id: ids[2], ref_kind: "question", metadata: {}, created_at: at(60 * 5) },
      // Another student's: never Alice's.
      { user_id: bobId, kind: "question_practiced", ref_id: ids[2], ref_kind: "question", metadata: {}, created_at: at(1) },
    ]);
    if (error) throw new Error(error.message);
  });

  afterAll(async () => {
    // Deleting the users cascades their activity and saves.
    if (aliceId) await admin.auth.admin.deleteUser(aliceId);
    if (bobId) await admin.auth.admin.deleteUser(bobId);
  });

  it("lists only the student's own questions from the last few hours, newest first", async () => {
    const list = await loadRecentQuestions(alice, anonClient, aliceId, new Date());
    expect(list.map((q) => [q.id, q.outcome])).toEqual([
      [ids[1], "wrong"],
      [ids[0], "right"],
    ]);
    expect(list[0].snippet.length).toBeGreaterThan(0);
  });

  it("saves a question to the student's own list and records it", async () => {
    const deps = buildMyQuestionDeps(alice, anonClient, aliceId);
    expect(await deps.save(ids[1])).toEqual({ kind: "saved" });
    const { data: saved } = await admin.from("question_bookmarks").select("question_id").eq("user_id", aliceId);
    expect(saved).toEqual([{ question_id: ids[1] }]);
    const list = await loadRecentQuestions(alice, anonClient, aliceId, new Date());
    expect(list.find((q) => q.id === ids[1])?.saved).toBe(true);
  });

  it("refuses a question nobody can see", async () => {
    const deps = buildMyQuestionDeps(alice, anonClient, aliceId);
    expect(await deps.save(randomUUID())).toEqual({ kind: "missing" });
  });
});
