/**
 * "Send to a friend" (migration 0163): the database rules.
 *
 *   - shared_from only on a personal test, never pointing at itself
 *   - one copy of a test per friend (a second join cannot make a second copy)
 *   - a friend's copy is free: starting it never uses the daily free practice
 *     test, and does not block the friend's own built test either
 *   - share_events accepts the 'practice' kind
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { mustSignIn } from "./helpers/fixture";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "practice-friend-pw-1234";
const RUN_ID = randomUUID().slice(0, 8);
const FUTURE = new Date(Date.now() + 3600_000).toISOString();
const ROLES = ["sender", "friend"] as const;
type Role = (typeof ROLES)[number];

describe.skipIf(!HAS_ENV)("send a practice test to a friend (migration 0163)", () => {
  let admin: SupabaseClient;
  const ids = {} as Record<Role, string>;
  const clients = {} as Record<Role, SupabaseClient>;
  const created: string[] = [];
  let examId = "";
  let questionId = "";
  let saved: Record<string, unknown> | null = null;

  function row(owner: string | null, extra: Record<string, unknown> = {}): Record<string, unknown> & { id: string } {
    const id = randomUUID();
    return {
      id,
      slug: `practice-friend-${RUN_ID}-${id.slice(0, 8)}`,
      exam_id: examId,
      paper_code: "maths",
      source: "pyq",
      scope: "custom",
      pyq_year: null,
      title: `Friend test ${RUN_ID}`,
      duration_secs: 600,
      marking: { correct: 2.5, wrong: -0.83 },
      sections: [{ key: "mathematics", label: "Mathematics", count: 1 }],
      questions: [{ position: 1, questionId, sectionKey: "mathematics", marks: 2.5, negMarks: -0.83 }],
      total_questions: 1,
      total_marks: 2.5,
      status: "personal",
      owner_id: owner,
      ...extra,
    };
  }

  async function insert(r: Record<string, unknown> & { id: string }) {
    const { error } = await admin.from("mock_tests").insert(r);
    if (!error) created.push(r.id);
    return error;
  }

  const start = (role: Role, mockId: string) =>
    clients[role]
      .from("mock_attempts")
      .insert({ mock_id: mockId, user_id: ids[role], expires_at: FUTURE })
      .select("id")
      .single();

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

    for (const role of ROLES) {
      const email = `practice-friend-${role}-${RUN_ID}@test.local`;
      const { data } = await admin.auth.admin.createUser({ email, password: PASSWORD, email_confirm: true });
      ids[role] = data.user!.id;
      clients[role] = createClient(url, anonKey, { auth: { persistSession: false } });
      await mustSignIn(email, clients[role], { email, password: PASSWORD });
    }

    const { data: exam } = await admin.from("exams").select("id").order("name").limit(1).single();
    examId = exam!.id;
    const { data: q } = await admin
      .from("questions")
      .select("id")
      .eq("visibility", "PUBLIC")
      .order("created_at", { ascending: true })
      .limit(1)
      .single();
    questionId = q!.id;

    const { data: prev } = await admin.from("paywall_settings").select("free_practice_tests_per_day").single();
    saved = prev;
    await admin.from("paywall_settings").update({ free_practice_tests_per_day: 1 }).eq("id", true);
  });

  afterAll(async () => {
    if (saved) await admin.from("paywall_settings").update(saved).eq("id", true);
    // Copies first: shared_from is ON DELETE SET NULL, but deleting them first
    // keeps the order obvious.
    if (created.length) await admin.from("mock_tests").delete().in("id", [...created].reverse());
    await admin.from("share_events").delete().like("subject_slug", `practice-friend-${RUN_ID}%`);
    for (const role of ROLES) if (ids[role]) await admin.auth.admin.deleteUser(ids[role]);
  });

  it("refuses shared_from on a test that is not personal, and a test pointing at itself", async () => {
    const original = row(ids.sender);
    expect(await insert(original)).toBeNull();

    const published = row(null, { status: "published", scope: "full", shared_from: original.id });
    expect(await insert(published)).not.toBeNull();

    const self = row(ids.friend);
    expect(await insert({ ...self, shared_from: self.id })).not.toBeNull();
  });

  it("allows one copy of a test per friend", async () => {
    const original = row(ids.sender);
    expect(await insert(original)).toBeNull();
    expect(await insert(row(ids.friend, { shared_from: original.id }))).toBeNull();
    const second = await insert(row(ids.friend, { shared_from: original.id }));
    expect(second?.code).toBe("23505");
  });

  it("lets the friend read and start their copy, and the copy never uses the daily free test", async () => {
    const original = row(ids.sender);
    expect(await insert(original)).toBeNull();
    const copy = row(ids.friend, { shared_from: original.id });
    expect(await insert(copy)).toBeNull();

    const seen = await clients.friend.from("mock_tests").select("id").eq("id", copy.id);
    expect(seen.data).toHaveLength(1);

    expect((await start("friend", copy.id)).error).toBeNull();

    // The friend's OWN built test still starts: the copy did not use today's free test.
    const own = row(ids.friend);
    expect(await insert(own)).toBeNull();
    expect((await start("friend", own.id)).error).toBeNull();

    // And with today's free test now used, another friend copy still starts.
    const original2 = row(ids.sender);
    expect(await insert(original2)).toBeNull();
    const copy2 = row(ids.friend, { shared_from: original2.id });
    expect(await insert(copy2)).toBeNull();
    expect((await start("friend", copy2.id)).error).toBeNull();

    const { data: quota } = await clients.friend.rpc("my_mock_quota");
    expect(quota).toMatchObject({ practiceLimit: 1, practiceUsed: 1 });
  });

  it("still limits a student's own built tests to one a day", async () => {
    const first = row(ids.sender);
    const second = row(ids.sender);
    expect(await insert(first)).toBeNull();
    expect(await insert(second)).toBeNull();
    expect((await start("sender", first.id)).error).toBeNull();
    expect((await start("sender", second.id)).error?.code).toBe("PT402");
  });

  it("records a 'practice' share", async () => {
    const { error } = await admin.from("share_events").insert({
      user_id: ids.sender,
      subject_kind: "practice",
      subject_slug: `practice-friend-${RUN_ID}-share`,
      channel: "whatsapp",
      included_score: false,
    });
    expect(error).toBeNull();
  });
});
