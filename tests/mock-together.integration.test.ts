/**
 * Practise together on mocks (migration 0166), against a real database.
 *
 *   - an invite is made only on a published paper, never on a practice test
 *     (that has its own copies, 0163) or a draft; one per sender per paper
 *   - a student cannot join their own invite, and joins an invite once
 *   - getOrCreateInvite returns the same code every time
 *   - joinMockInvite records a friend, skips the sender, refuses a code that
 *     belongs to another paper
 *   - the card on a mock: the viewer against everyone linked to them through
 *     an invite on that paper, first finished attempt each; waiting until a
 *     friend finishes; nothing for a stranger or someone else's attempt
 *   - the push loader finds invite groups with a recent finish, titled
 *
 * The free start itself is pinned in free-mock-limit.integration.test.ts,
 * which owns the settings row those rules need.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { getOrCreateInvite, joinMockInvite } from "@/lib/practiceTests/mockInviteService";
import { loadTogetherCard, readFriendFinishGroups } from "@/lib/practiceTests/togetherService";

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);
const ROLES = ["sam", "riya", "aman", "stan"] as const;
type Role = (typeof ROLES)[number];

describe.skipIf(!HAS_ENV)("practise together on mocks (migration 0166)", () => {
  let admin: SupabaseClient;
  const ids = {} as Record<Role, string>;
  const tests: string[] = [];
  let examId = "";
  const qs: { id: string; right: string; wrong: string }[] = [];

  async function makeTest(extra: Record<string, unknown> = {}): Promise<{ id: string; slug: string }> {
    const id = randomUUID();
    const slug = `mock-together-${RUN_ID}-${id.slice(0, 8)}`;
    const { error } = await admin.from("mock_tests").insert({
      id,
      slug,
      exam_id: examId,
      paper_code: "maths",
      source: "pyq",
      scope: "full",
      pyq_year: 2099,
      title: `Together paper ${RUN_ID}`,
      duration_secs: 600,
      marking: { correct: 1, wrong: 0 },
      sections: [{ key: "s", label: "S", count: 2 }],
      questions: qs.map((q, i) => ({ position: i + 1, questionId: q.id, sectionKey: "s", marks: 1, negMarks: 0 })),
      total_questions: 2,
      total_marks: 2,
      status: "published",
      ...extra,
    });
    expect(error).toBeNull();
    tests.push(id);
    return { id, slug };
  }

  /** A finished attempt answering q1 and q2 right (true) or wrong (false). */
  async function sit(who: Role, mockId: string, answers: [boolean, boolean], hoursAgo = 1): Promise<string> {
    const at = new Date(Date.now() - hoursAgo * 3_600_000).toISOString();
    const { data, error } = await admin
      .from("mock_attempts")
      .insert({ mock_id: mockId, user_id: ids[who], started_at: at, expires_at: at, submitted_at: at, status: "submitted" })
      .select("id")
      .single();
    expect(error).toBeNull();
    const attemptId = data!.id as string;
    const { error: ansErr } = await admin.from("attempt_answers").insert(
      qs.map((q, i) => ({ attempt_id: attemptId, question_id: q.id, selected_label: answers[i] ? q.right : q.wrong }))
    );
    expect(ansErr).toBeNull();
    return attemptId;
  }

  async function invite(sender: Role, mockId: string): Promise<{ id: string; code: string }> {
    const code = randomUUID().replace(/-/g, "").slice(0, 12);
    const { data, error } = await admin
      .from("mock_invites")
      .insert({ code, mock_id: mockId, inviter_id: ids[sender] })
      .select("id, code")
      .single();
    expect(error).toBeNull();
    return data as { id: string; code: string };
  }

  const join = (inv: { id: string }, mockId: string, sender: Role, friend: Role) =>
    admin
      .from("mock_invite_joins")
      .insert({ invite_id: inv.id, mock_id: mockId, inviter_id: ids[sender], friend_id: ids[friend] });

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    const names: Record<Role, string> = { sam: "sam kumar", riya: "Riya Sharma", aman: "Aman", stan: "Stan" };
    for (const role of ROLES) {
      const { data } = await admin.auth.admin.createUser({
        email: `mock-together-${role}-${RUN_ID}@test.local`,
        password: "mock-together-pw-1234",
        email_confirm: true,
        user_metadata: { full_name: names[role] },
      });
      ids[role] = data.user!.id;
      // A pass, so the free limits never refuse a fixture sitting.
      await admin
        .from("entitlements")
        .insert({ user_id: ids[role], scope: "mocks", source: "manual", status: "active", note: `test ${RUN_ID}` });
    }
    const { data: exam } = await admin.from("exams").select("id").order("name").limit(1).single();
    examId = exam!.id;
    const { data: rows } = await admin
      .from("questions")
      .select("id, options(label, is_correct)")
      .eq("visibility", "PUBLIC")
      .eq("question_format", "mcq")
      .order("created_at", { ascending: true })
      .limit(10);
    for (const r of (rows ?? []) as { id: string; options: { label: string; is_correct: boolean }[] }[]) {
      const right = r.options.find((o) => o.is_correct)?.label;
      const wrong = r.options.find((o) => !o.is_correct)?.label;
      if (right && wrong && qs.length < 2) qs.push({ id: r.id, right, wrong });
    }
    expect(qs).toHaveLength(2);
  });

  afterAll(async () => {
    // Deleting a paper cascades its invites, joins and attempts.
    if (tests.length) await admin.from("mock_tests").delete().in("id", tests);
    await admin.from("share_events").delete().like("subject_slug", `mock-together-${RUN_ID}%`);
    for (const role of ROLES) if (ids[role]) await admin.auth.admin.deleteUser(ids[role]);
  });

  it("makes an invite only on a published paper", async () => {
    const draft = await makeTest({ status: "draft" });
    const personal = await makeTest({ status: "personal", scope: "custom", owner_id: ids.sam, pyq_year: null });
    for (const t of [draft, personal]) {
      const { error } = await admin
        .from("mock_invites")
        .insert({ code: randomUUID().replace(/-/g, "").slice(0, 12), mock_id: t.id, inviter_id: ids.sam });
      expect(error).not.toBeNull();
    }
  });

  it("keeps one invite per sender per paper, and a 12-hex-digit code", async () => {
    const paper = await makeTest();
    await invite("sam", paper.id);
    const again = await admin
      .from("mock_invites")
      .insert({ code: "aaaaaaaaaaaa", mock_id: paper.id, inviter_id: ids.sam });
    expect(again.error?.code).toBe("23505");
    const bad = await admin.from("mock_invites").insert({ code: "NOT-A-CODE", mock_id: paper.id, inviter_id: ids.riya });
    expect(bad.error).not.toBeNull();
  });

  it("refuses joining your own invite, and a second join of the same invite", async () => {
    const paper = await makeTest();
    const inv = await invite("sam", paper.id);
    expect((await join(inv, paper.id, "sam", "sam")).error).not.toBeNull();
    expect((await join(inv, paper.id, "sam", "riya")).error).toBeNull();
    expect((await join(inv, paper.id, "sam", "riya")).error?.code).toBe("23505");
  });

  it("records a 'mock_together' share", async () => {
    const { error } = await admin.from("share_events").insert({
      user_id: ids.sam,
      subject_kind: "mock_together",
      subject_slug: `mock-together-${RUN_ID}-share`,
      channel: "whatsapp",
      included_score: false,
    });
    expect(error).toBeNull();
  });

  it("getOrCreateInvite returns the same code every time", async () => {
    const paper = await makeTest();
    const first = await getOrCreateInvite(admin, paper.id, ids.sam);
    expect(first).toMatch(/^[0-9a-f]{12}$/);
    expect(await getOrCreateInvite(admin, paper.id, ids.sam)).toBe(first);
    expect(await getOrCreateInvite(admin, paper.id, ids.riya)).not.toBe(first);
  });

  it("joinMockInvite records a friend once, skips the sender, and refuses another paper's code", async () => {
    const paper = await makeTest();
    const other = await makeTest();
    const code = await getOrCreateInvite(admin, paper.id, ids.sam);
    const allow = async () => true;

    expect(await joinMockInvite(admin, { code, slug: paper.slug, userId: ids.sam, allowNew: allow })).toBe("own");
    expect(await joinMockInvite(admin, { code, slug: other.slug, userId: ids.riya, allowNew: allow })).toBe("invalid");
    expect(await joinMockInvite(admin, { code, slug: paper.slug, userId: ids.riya, allowNew: async () => false })).toBe(
      "limited"
    );
    expect(await joinMockInvite(admin, { code, slug: paper.slug, userId: ids.riya, allowNew: allow })).toBe("joined");
    expect(await joinMockInvite(admin, { code, slug: paper.slug, userId: ids.riya, allowNew: async () => false })).toBe(
      "joined"
    );

    const { data } = await admin.from("mock_invite_joins").select("friend_id").eq("mock_id", paper.id);
    expect(data).toEqual([{ friend_id: ids.riya }]);
  });

  it("compares the viewer with everyone an invite on the paper links them to", async () => {
    const paper = await makeTest();
    const inv = await invite("sam", paper.id);
    expect((await join(inv, paper.id, "sam", "riya")).error).toBeNull();
    expect((await join(inv, paper.id, "sam", "aman")).error).toBeNull();

    const mine = await sit("sam", paper.id, [true, false], 5);
    await sit("riya", paper.id, [false, false], 3);
    // A later retake does not replace Riya's first sitting.
    await sit("riya", paper.id, [true, true], 2);
    const aman = await sit("aman", paper.id, [false, true], 1);
    // Stan sat the same paper but nobody invited him: never on the card.
    await sit("stan", paper.id, [true, true], 1);

    const got = await loadTogetherCard(admin, ids.sam, mine);
    expect(got).toMatchObject({ state: "ready" });
    if (got?.state !== "ready") throw new Error("not ready");
    expect([...got.card.friendNames].sort()).toEqual(["Aman", "Riya"]);
    expect(got.card.allMissed).toEqual([]);
    expect(got.card.youGot).toEqual([{ position: 1, names: expect.arrayContaining(["Riya", "Aman"]) }]);
    expect(got.card.theyGot).toEqual([{ position: 2, names: ["Aman"] }]);

    // A friend sees the sender and the other friend the invite reached.
    const theirs = await loadTogetherCard(admin, ids.aman, aman);
    if (theirs?.state !== "ready") throw new Error("not ready");
    expect([...theirs.card.friendNames].sort()).toEqual(["Riya", "Sam"]);
  });

  it("waits until a friend finishes, and gives nothing without an invite or to someone else", async () => {
    const paper = await makeTest();
    const lone = await sit("stan", paper.id, [true, true]);
    expect(await loadTogetherCard(admin, ids.stan, lone)).toBeNull();

    const inv = await invite("sam", paper.id);
    const mine = await sit("sam", paper.id, [true, true]);
    // Sent, nobody joined yet: no card.
    expect(await loadTogetherCard(admin, ids.sam, mine)).toBeNull();
    expect((await join(inv, paper.id, "sam", "riya")).error).toBeNull();
    expect(await loadTogetherCard(admin, ids.sam, mine)).toEqual({ state: "waiting" });

    expect(await loadTogetherCard(admin, ids.riya, mine)).toBeNull();
  });

  it("finds invite groups with a recent finish, titled with the paper", async () => {
    const paper = await makeTest();
    const inv = await invite("sam", paper.id);
    expect((await join(inv, paper.id, "sam", "riya")).error).toBeNull();
    await sit("sam", paper.id, [true, true], 30);
    await sit("riya", paper.id, [true, true], 1);
    const groups = await readFriendFinishGroups(admin, new Date(Date.now() - 2 * 3_600_000).toISOString());
    const g = groups.find((x) => x.rootId === inv.id);
    expect(g).toBeDefined();
    expect(g!.title).toBe(`Together paper ${RUN_ID}`);
    expect(g!.finishers.map((f) => f.name).sort()).toEqual(["Riya", "Sam"]);
  });
});
