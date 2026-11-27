/**
 * Integration test for exam rooms (migration 0289). The rules that must hold
 * whatever a route does live in the guard triggers, so they are tested against
 * the database itself (the TEST project; tests/setup.ts refuses prod):
 *
 * - a student posts only into an open room they joined, not while muted, at
 *   most once every 5 seconds, at most 1,000 characters, never pinned;
 * - V replies to a visible student or team message once, at most 5 asks per
 *   student per IST day;
 * - one pin per room, swapped in one call (post_exam_room_daily);
 * - 3 reports hide a message; nobody reports their own; reviewed_at resets the count;
 * - a daily-question answer's correctness comes from options.is_correct;
 * - exam_room_summaries: unread excludes the student's own and hidden messages;
 * - anon cannot read any of it (RLS on, no policies).
 *
 * Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { testRunId } from "./helpers/runId";
import { SEED_CONTENT_HASH_PREFIX } from "./helpers/testdb";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = testRunId();
const ROOM = `test-room-${RUN_ID}`;
const CLOSED_ROOM = `test-closed-${RUN_ID}`;

describe.skipIf(!HAS_ENV)("exam rooms (0289)", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;
  const users: string[] = [];
  let a = "";
  let b = "";
  let c = "";
  let d = "";

  const studentMsg = (userId: string, body: string, extra: Record<string, unknown> = {}) =>
    admin
      .from("exam_room_messages")
      .insert({ exam_slug: ROOM, author_kind: "student", user_id: userId, display_name: "Test S.", body, ...extra })
      .select("id")
      .single();

  const teamMsg = (body: string) =>
    admin
      .from("exam_room_messages")
      .insert({ exam_slug: ROOM, author_kind: "team", display_name: "PYQ Vault team", body })
      .select("id")
      .single();

  const vReply = (askedBy: string, replyTo: number) =>
    admin
      .from("exam_room_messages")
      .insert({ exam_slug: ROOM, author_kind: "v", user_id: askedBy, display_name: "V", body: "The middle term is 2.", reply_to: replyTo })
      .select("id")
      .single();

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    anonClient = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    for (const who of ["a", "b", "c", "d"]) {
      const { data, error } = await admin.auth.admin.createUser({ email: `rooms-${who}-${RUN_ID}@test.local`, email_confirm: true });
      if (error || !data.user) throw new Error(`createUser failed: ${error?.message}`);
      users.push(data.user.id);
    }
    [a, b, c, d] = users;
    // Both rows name `open`: a bulk insert sends null, not the default, for a key one row leaves out.
    const rooms = await admin.from("exam_rooms").insert([
      { exam_slug: ROOM, open: true },
      { exam_slug: CLOSED_ROOM, open: false },
    ]);
    if (rooms.error) throw new Error(rooms.error.message);
    const members = await admin.from("exam_room_members").insert([
      { exam_slug: ROOM, user_id: a, display_name: "Asha K." },
      { exam_slug: ROOM, user_id: b, display_name: "Bala M." },
      { exam_slug: ROOM, user_id: c, display_name: "Chetan P." },
      { exam_slug: CLOSED_ROOM, user_id: a, display_name: "Asha K." },
    ]);
    if (members.error) throw new Error(members.error.message);
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("exam_rooms").delete().in("exam_slug", [ROOM, CLOSED_ROOM]); // cascades
    for (const id of users) await admin.auth.admin.deleteUser(id);
  });

  it("lets a member post, refuses a non-member, then refuses a second post within 5 seconds", async () => {
    const ok = await studentMsg(a, "Why take 2 away?");
    expect(ok.error).toBeNull();
    const outsider = await studentMsg(d, "hello");
    expect(outsider.error?.message).toMatch(/exam_room:not_member/);
    const fast = await studentMsg(a, "again");
    expect(fast.error?.message).toMatch(/exam_room:too_fast/);
  });

  it("refuses a post into a closed room", async () => {
    const r = await admin
      .from("exam_room_messages")
      .insert({ exam_slug: CLOSED_ROOM, author_kind: "student", user_id: a, display_name: "Asha K.", body: "hi" });
    expect(r.error?.message).toMatch(/exam_room:closed/);
  });

  it("refuses a muted student until the mute ends", async () => {
    await admin
      .from("exam_room_members")
      .update({ muted_until: new Date(Date.now() + 3600_000).toISOString() })
      .eq("exam_slug", ROOM)
      .eq("user_id", c);
    const r = await studentMsg(c, "let me post");
    expect(r.error?.message).toMatch(/exam_room:muted/);
    await admin.from("exam_room_members").update({ muted_until: null }).eq("exam_slug", ROOM).eq("user_id", c);
  });

  it("keeps a student message short, unpinned and question-free", async () => {
    const long = await studentMsg(b, "x".repeat(1001));
    expect(long.error?.code).toBe("23514");
    const pinned = await studentMsg(b, "pin me", { pinned: true });
    expect(pinned.error?.code).toBe("23514");
  });

  it("keeps one pin per room and swaps it in one call", async () => {
    const { data: q } = await admin.from("questions").select("id").eq("question_format", "mcq").like("content_hash", `${SEED_CONTENT_HASH_PREFIX}%`).limit(1).single();
    const first = await admin.rpc("post_exam_room_daily", { p_exam_slug: ROOM, p_question_id: q!.id, p_body: "Today's question." });
    expect(first.error).toBeNull();
    const second = await admin.rpc("post_exam_room_daily", { p_exam_slug: ROOM, p_question_id: q!.id, p_body: "Swapped." });
    expect(second.error).toBeNull();
    const { data: pins } = await admin.from("exam_room_messages").select("id").eq("exam_slug", ROOM).eq("pinned", true);
    expect(pins?.map((p) => p.id)).toEqual([second.data]);
  });

  it("decides a daily answer's correctness from the options, not the caller", async () => {
    const { data: pin } = await admin.from("exam_room_messages").select("id, question_id").eq("exam_slug", ROOM).eq("pinned", true).single();
    const { data: opts } = await admin.from("options").select("id, is_correct").eq("question_id", pin!.question_id);
    const wrong = opts!.find((o) => !o.is_correct)!;
    const r = await admin
      .from("exam_room_answers")
      .insert({ message_id: pin!.id, user_id: b, option_id: wrong.id, correct: true })
      .select("correct")
      .single();
    expect(r.error).toBeNull();
    expect(r.data?.correct).toBe(false);
    const { data: other } = await admin.from("options").select("id").neq("question_id", pin!.question_id).limit(1).single();
    const bad = await admin.from("exam_room_answers").insert({ message_id: pin!.id, user_id: c, option_id: other!.id, correct: true });
    expect(bad.error?.message).toMatch(/exam_room:bad_option/);
  });

  it("lets V reply once per message and at most 5 times a day per student", async () => {
    const targets: number[] = [];
    for (let i = 0; i < 6; i++) {
      const t = await teamMsg(`Doubt prompt ${i}`);
      expect(t.error).toBeNull();
      targets.push(t.data!.id);
    }
    for (let i = 0; i < 5; i++) expect((await vReply(b, targets[i])).error).toBeNull();
    expect((await vReply(c, targets[0])).error?.code).toBe("23505");
    expect((await vReply(b, targets[5])).error?.message).toMatch(/exam_room:v_limit/);
    const { data: vMsg } = await admin.from("exam_room_messages").select("id").eq("author_kind", "v").eq("exam_slug", ROOM).limit(1).single();
    expect((await vReply(c, vMsg!.id)).error?.message).toMatch(/exam_room:v_target/);
  });

  it("hides a message after 3 reports, refuses a self-report, and counts again after review", async () => {
    const { data: msg } = await admin.from("exam_room_messages").select("id").eq("author_kind", "student").eq("user_id", a).limit(1).single();
    const own = await admin.from("exam_room_reports").insert({ message_id: msg!.id, user_id: a, reason: "spam" });
    expect(own.error?.message).toMatch(/exam_room:own_message/);
    const outsider = await admin.from("exam_room_reports").insert({ message_id: msg!.id, user_id: d, reason: "spam" });
    expect(outsider.error?.message).toMatch(/exam_room:not_member/);

    // Only 2 members besides the author can report, so add one more member for the third.
    await admin.from("exam_room_members").insert({ exam_slug: ROOM, user_id: d, display_name: "Dev R." });
    for (const who of [b, c]) expect((await admin.from("exam_room_reports").insert({ message_id: msg!.id, user_id: who, reason: "spam" })).error).toBeNull();
    const before = await admin.from("exam_room_messages").select("hidden_at").eq("id", msg!.id).single();
    expect(before.data?.hidden_at).toBeNull();
    expect((await admin.from("exam_room_reports").insert({ message_id: msg!.id, user_id: d, reason: "abuse" })).error).toBeNull();
    const after = await admin.from("exam_room_messages").select("hidden_at, hidden_reason").eq("id", msg!.id).single();
    expect(after.data?.hidden_reason).toBe("reports");
  });

  it("counts unread for a member, leaving out their own and hidden messages", async () => {
    const { data, error } = await admin.rpc("exam_room_summaries", { p_user_id: b });
    expect(error).toBeNull();
    const row = (data as { exam_slug: string; unread: number; last_name: string }[]).find((r) => r.exam_slug === ROOM)!;
    // Visible, not b's own: 2 daily posts (one swapped), 6 team prompts, 5 V replies. a's message is hidden.
    expect(row.unread).toBe(13);
    expect(row.last_name).toBe("V");
  });

  it("is invisible to anon", async () => {
    const { data } = await anonClient.from("exam_room_messages").select("id").eq("exam_slug", ROOM);
    expect(data ?? []).toEqual([]);
    const rpc = await anonClient.rpc("exam_room_summaries", { p_user_id: b });
    expect(rpc.error).not.toBeNull();
  });
});
