/**
 * Integration test for "Understood / Review later" on a written answer
 * (2026-10-28): the tap under a model answer on /browse or a board reader
 * (`recordSelfMark`), and the same two buttons inside the drill
 * (`recordDrillAnswer` with a `selfMark`).
 *
 * Runs against the TEST Supabase project as a real signed-in student, so every
 * read and write meets the browser's RLS, and the rows it asserts on prove the
 * 0196 kind CHECK too: the activity writer is best-effort, so a refused
 * `self_mark` row would vanish silently rather than fail the call. The test
 * project holds no written questions, so it inserts its own, copied from a
 * PUBLIC row (the v-search-answers pattern), and deletes them after.
 */
import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { mustSignIn } from "./helpers/fixture";

const session = vi.hoisted(() => ({ client: null as unknown }));
vi.mock("@/lib/supabase/server", () => ({ createSupabaseServerClient: () => session.client }));

import { recordDrillAnswer } from "@/lib/drill/service";
import { loadDrillQuestions, loadQuestionEvents, loadQuestionRefs } from "@/lib/drill/query";
import { questionState } from "@/lib/drill/select";
import { recordSelfMark } from "@/lib/questions/selfMarkService";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = Date.now();
const EMAIL = `self_mark_${STAMP}@test.local`;
const PASSWORD = `Pw-${STAMP}-self`;
const SOLUTION = `Model answer for the self-mark test (${STAMP}).`;

type Row = { kind: string; metadata: Record<string, unknown> };

describe.skipIf(!HAS_ENV)("self-marking a written answer", () => {
  let admin: SupabaseClient;
  let client: SupabaseClient;
  let userId = "";
  const made: string[] = [];
  let written: string[] = [];
  let privateWritten = "";
  let mcq = "";

  async function rowsFor(questionId: string): Promise<Row[]> {
    const { data, error } = await admin
      .from("user_activity")
      .select("kind, metadata")
      .eq("user_id", userId)
      .eq("ref_id", questionId)
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []) as Row[];
  }

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    const created = await admin.auth.admin.createUser({ email: EMAIL, password: PASSWORD, email_confirm: true });
    if (created.error) throw new Error(created.error.message);
    userId = created.data.user!.id;
    client = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    await mustSignIn("self-mark student", client, { email: EMAIL, password: PASSWORD });
    session.client = client;

    const { data: seed, error } = await admin
      .from("questions")
      .select("*")
      .eq("visibility", "PUBLIC")
      .eq("question_format", "mcq")
      .limit(1)
      .single();
    if (error) throw new Error(`seed question: ${error.message}`);
    const row = seed as Record<string, unknown>;
    mcq = row.id as string;
    for (const k of ["id", "created_at", "updated_at", "search_vector"]) delete row[k];

    const fixtures = [
      { visibility: "PUBLIC", text: `Explain the first self-mark test idea. (${STAMP})` },
      { visibility: "PUBLIC", text: `Explain the second self-mark test idea. (${STAMP})` },
      { visibility: "PUBLIC", text: `Explain the third self-mark test idea. (${STAMP})` },
      { visibility: "PRIVATE", text: `Explain a private self-mark test idea. (${STAMP})` },
    ];
    for (const [i, f] of fixtures.entries()) {
      const { data, error: insErr } = await admin
        .from("questions")
        .insert({ ...row, ...f, question_format: "subjective", solution: SOLUTION, content_hash: `self-mark-test-${STAMP}-${i}` })
        .select("id")
        .single();
      if (insErr) throw new Error(`fixture ${i}: ${insErr.message}`);
      made.push(data!.id as string);
    }
    written = made.slice(0, 3);
    privateWritten = made[3];
  });

  afterAll(async () => {
    if (!admin) return;
    if (userId) {
      await admin.from("user_activity").delete().eq("user_id", userId);
      await admin.auth.admin.deleteUser(userId);
    }
    if (made.length) await admin.from("questions").delete().in("id", made);
  });

  it("Review later puts the question in the drill and records the tap", async () => {
    const out = await recordSelfMark(client, userId, { questionId: written[0], mark: "review", surface: "board" });
    expect(out).toEqual({ outcome: "saved" });
    // One insert carries both rows, so their order is not promised.
    const rows = await rowsFor(written[0]);
    expect(rows).toHaveLength(2);
    expect(rows).toEqual(
      expect.arrayContaining([
        { kind: "self_mark", metadata: { surface: "board", mark: "review" } },
        { kind: "answer_wrong", metadata: { surface: "board", selfMark: "review" } },
      ])
    );
    expect(questionState(await loadQuestionEvents(client, userId, written[0]), new Date())).toBe("due");
  });

  it("the drill takes the written question and serves its model answer with it", async () => {
    const refs = await loadQuestionRefs(client, [written[0], mcq]);
    expect(refs.has(written[0])).toBe(true);
    const [q] = await loadDrillQuestions(client, [written[0]]);
    expect(q).toMatchObject({ format: "subjective", modelAnswer: SOLUTION, options: [] });
    // An MCQ's solution names its key, so it never rides in the payload.
    const [m] = await loadDrillQuestions(client, [mcq]);
    expect(m).toMatchObject({ format: "mcq", modelAnswer: null });
  });

  it("Understood in the drill fixes it", async () => {
    const out = await recordDrillAnswer(userId, written[0], { selfMark: "understood" });
    expect(out).toMatchObject({ correct: true, correctLabel: null, progress: "fixed", solution: SOLUTION });
    const rows = await rowsFor(written[0]);
    expect(rows.slice(-2)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ kind: "answer_correct", metadata: expect.objectContaining({ surface: "drill", selfMark: "understood" }) }),
        expect.objectContaining({ kind: "self_mark", metadata: { surface: "drill", mark: "understood" } }),
      ])
    );
  });

  it("Review later in the drill keeps it waiting", async () => {
    await recordSelfMark(client, userId, { questionId: written[1], mark: "review", surface: "bank" });
    const out = await recordDrillAnswer(userId, written[1], { selfMark: "review" });
    expect(out).toMatchObject({ correct: false, progress: "wrong", solution: SOLUTION });
    expect(questionState(await loadQuestionEvents(client, userId, written[1]), new Date())).toBe("due");
  });

  it("Understood on a question never marked stores the tap alone, once a day", async () => {
    expect(await recordSelfMark(client, userId, { questionId: written[2], mark: "understood", surface: "bank" })).toEqual({
      outcome: "understood",
    });
    await recordSelfMark(client, userId, { questionId: written[2], mark: "understood", surface: "bank" });
    expect(await rowsFor(written[2])).toEqual([expect.objectContaining({ kind: "self_mark" })]);
  });

  it("the latest tap wins, however many the same day", async () => {
    const q = written[2];
    expect(await recordSelfMark(client, userId, { questionId: q, mark: "review", surface: "bank" })).toEqual({ outcome: "saved" });
    expect(await recordSelfMark(client, userId, { questionId: q, mark: "understood", surface: "bank" })).toEqual({ outcome: "fixed" });
    expect(await recordSelfMark(client, userId, { questionId: q, mark: "review", surface: "bank" })).toEqual({ outcome: "saved" });
    expect(questionState(await loadQuestionEvents(client, userId, q), new Date())).toBe("due");
  });

  it("refuses an MCQ or a PRIVATE question, and writes nothing", async () => {
    expect(await recordSelfMark(client, userId, { questionId: mcq, mark: "review", surface: "bank" })).toBeNull();
    expect(await recordSelfMark(client, userId, { questionId: privateWritten, mark: "review", surface: "bank" })).toBeNull();
    expect(await recordDrillAnswer(userId, mcq, { selfMark: "understood" })).toBeNull();
    expect(await rowsFor(mcq)).toEqual([]);
    expect(await rowsFor(privateWritten)).toEqual([]);
  });
});
