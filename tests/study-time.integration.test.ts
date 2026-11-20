/**
 * The study clock's database side (migration 0277): add_study_time adds a
 * signed-in student's seconds to one row per India day, chapter and kind;
 * a question becomes its chapter; one call can add no more than the time
 * since the student's last call; a student reads only their own rows and
 * writes none directly.
 */
import { describe, it, expect, beforeAll, beforeEach, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { testRunId } from "./helpers/runId";
import { mustSignIn } from "./helpers/fixture";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = testRunId();
const PASSWORD = "test-password-12345";
const UNKNOWN = "99999999-9999-4999-8999-999999999999";

function indiaDay(d = new Date()): string {
  return new Date(d.getTime() + 5.5 * 3_600_000).toISOString().slice(0, 10);
}

type Row = { day: string; kind: string; secs: number; chapter_id: string | null; chapter: string | null; exam_id: string | null };

describe.skipIf(!HAS_ENV)("study time", () => {
  let admin: SupabaseClient;
  let student: SupabaseClient;
  let other: SupabaseClient;
  const users: string[] = [];
  let chapterId = "";
  let questionId = "";
  let questionChapterId = "";

  async function makeStudent(tag: string): Promise<SupabaseClient> {
    const email = `study-time-${tag}-${RUN_ID}@test.local`;
    const { data, error } = await admin.auth.admin.createUser({ email, password: PASSWORD, email_confirm: true });
    if (error || !data.user) throw new Error(`create user: ${error?.message}`);
    users.push(data.user.id);
    const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: { persistSession: false },
    });
    await mustSignIn(`study-time ${tag}`, client, { email, password: PASSWORD });
    return client;
  }

  /** Make the student's last call an hour ago, so the next one may add a full call. */
  async function rested(userIndex = 0): Promise<void> {
    const { error } = await admin
      .from("study_clock")
      .upsert({ user_id: users[userIndex], last_at: new Date(Date.now() - 3_600_000).toISOString() });
    if (error) throw new Error(`rest: ${error.message}`);
  }

  async function own(client: SupabaseClient): Promise<Row[]> {
    const today = indiaDay();
    const { data, error } = await client.rpc("get_own_study_time", { p_from: today, p_to: today });
    if (error) throw new Error(`read: ${error.message}`);
    return (data ?? []) as Row[];
  }

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    const { data: qs, error: qErr } = await admin
      .from("questions")
      .select("id, chapter_id")
      .eq("visibility", "PUBLIC")
      .not("chapter_id", "is", null)
      .limit(1);
    if (qErr || !qs || qs.length === 0) throw new Error(`need a PUBLIC question in the test db: ${qErr?.message}`);
    questionId = qs[0].id as string;
    questionChapterId = qs[0].chapter_id as string;
    const { data: chs, error: cErr } = await admin.from("chapters").select("id").neq("id", questionChapterId).limit(1);
    if (cErr || !chs || chs.length === 0) throw new Error(`need a second chapter in the test db: ${cErr?.message}`);
    chapterId = chs[0].id as string;

    student = await makeStudent("a");
    other = await makeStudent("b");
  });

  beforeEach(async () => {
    if (users.length === 2) {
      await rested(0);
      await rested(1);
    }
  });

  afterAll(async () => {
    for (const id of users) await admin.auth.admin.deleteUser(id); // cascades study_time + study_clock
  });

  it("refuses a visitor who is not signed in", async () => {
    const anon = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: { persistSession: false },
    });
    const { error } = await anon.rpc("add_study_time", { p_items: [{ k: "r", c: chapterId, s: 30 }] });
    expect(error).not.toBeNull();
  });

  it("adds reading time to the chapter, and a second call to the same row", async () => {
    const first = await student.rpc("add_study_time", { p_items: [{ k: "r", c: chapterId, s: 30 }] });
    expect(first.error).toBeNull();
    expect(first.data).toBe(30);
    await rested();
    const second = await student.rpc("add_study_time", { p_items: [{ k: "r", c: chapterId, s: 45 }] });
    expect(second.error).toBeNull();

    const rows = (await own(student)).filter((r) => r.kind === "reading" && r.chapter_id === chapterId);
    expect(rows).toHaveLength(1);
    expect(rows[0].secs).toBe(75);
    expect(rows[0].chapter).toBeTruthy();
    expect(rows[0].exam_id).toBeTruthy();
  });

  it("turns a question into its chapter", async () => {
    const { error } = await student.rpc("add_study_time", { p_items: [{ k: "p", q: questionId, s: 60 }] });
    expect(error).toBeNull();
    const rows = (await own(student)).filter((r) => r.kind === "practice" && r.chapter_id === questionChapterId);
    expect(rows).toHaveLength(1);
    expect(rows[0].secs).toBe(60);
  });

  it("keeps unassigned time, and time on a chapter that no longer exists, without a chapter", async () => {
    const { error } = await student.rpc("add_study_time", {
      p_items: [
        { k: "p", s: 20 },
        { k: "r", c: UNKNOWN, s: 10 },
      ],
    });
    expect(error).toBeNull();
    const loose = (await own(student)).filter((r) => r.chapter_id === null);
    expect(loose.find((r) => r.kind === "practice")?.secs).toBe(20);
    expect(loose.find((r) => r.kind === "reading")?.secs).toBe(10);
  });

  it("adds no more than the time since the student's last call", async () => {
    const { error } = await admin
      .from("study_clock")
      .upsert({ user_id: users[0], last_at: new Date(Date.now() - 10_000).toISOString() });
    if (error) throw new Error(error.message);
    const res = await student.rpc("add_study_time", {
      p_items: [
        { k: "r", c: chapterId, s: 200 },
        { k: "p", q: questionId, s: 100 },
      ],
    });
    expect(res.error).toBeNull();
    // 10 s since the last call plus 30 s of slack, give or take the few seconds
    // this machine's clock and the database's disagree: far below the 300 asked.
    expect(res.data).toBeGreaterThanOrEqual(32);
    expect(res.data).toBeLessThanOrEqual(48);
  });

  it("rejects a malformed call", async () => {
    const bad = [
      [{ k: "x", s: 30 }],
      [{ k: "r", s: 301 }],
      [{ k: "r", s: 0 }],
      [{ k: "r", c: "not-a-uuid", s: 30 }],
      Array.from({ length: 21 }, () => ({ k: "r", s: 1 })),
    ];
    for (const items of bad) {
      const { error } = await student.rpc("add_study_time", { p_items: items });
      expect(error, JSON.stringify(items).slice(0, 60)).not.toBeNull();
    }
  });

  it("shows a student only their own time and lets them write none directly", async () => {
    expect(await own(other)).toEqual([]);
    const { data } = await other.from("study_time").select("secs");
    expect(data ?? []).toEqual([]);

    const { error } = await student
      .from("study_time")
      .insert({ user_id: users[0], day: indiaDay(), kind: "reading", secs: 999, chapter_id: chapterId });
    expect(error).not.toBeNull();
    const { error: clockErr } = await student
      .from("study_clock")
      .update({ last_at: new Date(Date.now() - 86_400_000).toISOString() })
      .eq("user_id", users[0]);
    // RLS lets nothing through: either an error or zero rows changed.
    const { data: clock } = await admin.from("study_clock").select("last_at").eq("user_id", users[0]).single();
    expect(clockErr !== null || new Date(clock!.last_at as string).getTime() > Date.now() - 3 * 3_600_000).toBe(true);
  });
});
