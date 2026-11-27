/**
 * Integration test for the rooms' system lines and the pin-on-join (migration
 * 0291), against the TEST project (tests/setup.ts refuses prod):
 *
 * - a student's FIRST join of a room writes one "joined" line under their
 *   nickname; leaving and joining again writes none; a closed room writes none;
 * - answering a daily question writes one "answered" line that carries no
 *   option, no question and no right/wrong;
 * - a system line cannot be reported, replied to or sent to V;
 * - system lines never count as unread and never show as a room's last message;
 * - post_exam_room_daily_if_missing pins only when the room has no pin today.
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
const ROOM = `test-lines-${RUN_ID}`;
const CLOSED_ROOM = `test-lines-closed-${RUN_ID}`;
const PIN_ROOM = `test-lines-pin-${RUN_ID}`;

describe.skipIf(!HAS_ENV)("exam room system lines (0291)", () => {
  let admin: SupabaseClient;
  const users: string[] = [];
  let a = "";
  let b = "";
  let questionId = "";

  const lines = (slug: string, event: string) =>
    admin.from("exam_room_messages").select("id, user_id, display_name, body, question_id, reply_to, pinned").eq("exam_slug", slug).eq("system_event", event);

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    for (const who of ["a", "b"]) {
      const { data, error } = await admin.auth.admin.createUser({ email: `rooms-lines-${who}-${RUN_ID}@test.local`, email_confirm: true });
      if (error || !data.user) throw new Error(`createUser failed: ${error?.message}`);
      users.push(data.user.id);
    }
    [a, b] = users;
    const rooms = await admin.from("exam_rooms").insert([
      { exam_slug: ROOM, open: true },
      { exam_slug: CLOSED_ROOM, open: false },
      { exam_slug: PIN_ROOM, open: true },
    ]);
    if (rooms.error) throw new Error(rooms.error.message);
    const { data: q } = await admin.from("questions").select("id").eq("question_format", "mcq").like("content_hash", `${SEED_CONTENT_HASH_PREFIX}%`).limit(1).single();
    questionId = q!.id as string;
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("exam_rooms").delete().in("exam_slug", [ROOM, CLOSED_ROOM, PIN_ROOM]); // cascades
    for (const id of users) await admin.auth.admin.deleteUser(id);
  });

  it("writes one joined line on a student's first join, under their nickname", async () => {
    expect((await admin.from("exam_room_members").insert({ exam_slug: ROOM, user_id: a, display_name: "Quiet Falcon" })).error).toBeNull();
    const { data } = await lines(ROOM, "joined");
    expect(data).toHaveLength(1);
    expect(data![0]).toMatchObject({ user_id: a, display_name: "Quiet Falcon", question_id: null, reply_to: null, pinned: false });
  });

  it("writes no second joined line when the student leaves and joins again", async () => {
    await admin.from("exam_room_members").delete().eq("exam_slug", ROOM).eq("user_id", a);
    expect((await admin.from("exam_room_members").insert({ exam_slug: ROOM, user_id: a, display_name: "Brave Otter" })).error).toBeNull();
    const { data } = await lines(ROOM, "joined");
    expect(data).toHaveLength(1);
  });

  it("writes no line for a closed room, and the join still goes through", async () => {
    expect((await admin.from("exam_room_members").insert({ exam_slug: CLOSED_ROOM, user_id: a, display_name: "Quiet Falcon" })).error).toBeNull();
    const { data } = await lines(CLOSED_ROOM, "joined");
    expect(data).toEqual([]);
  });

  it("writes one answered line that says nothing about the answer", async () => {
    expect((await admin.from("exam_room_members").insert({ exam_slug: ROOM, user_id: b, display_name: "Calm Heron" })).error).toBeNull();
    const pin = await admin.rpc("post_exam_room_daily", { p_exam_slug: ROOM, p_question_id: questionId, p_body: "Today's question." });
    expect(pin.error).toBeNull();
    const { data: opts } = await admin.from("options").select("id, is_correct").eq("question_id", questionId);
    const wrong = opts!.find((o) => !o.is_correct)!;
    expect((await admin.from("exam_room_answers").insert({ message_id: pin.data, user_id: b, option_id: wrong.id, correct: false })).error).toBeNull();
    const { data } = await lines(ROOM, "answered");
    expect(data).toHaveLength(1);
    expect(data![0]).toMatchObject({ user_id: b, display_name: "Calm Heron", question_id: null, reply_to: null });
    expect(data![0].body).not.toMatch(/right|wrong|correct|option|\(?[A-D]\)/i);
  });

  it("refuses a report, a reply or a V answer on a system line", async () => {
    const { data } = await lines(ROOM, "joined");
    const lineId = data![0].id as number;
    const report = await admin.from("exam_room_reports").insert({ message_id: lineId, user_id: b, reason: "spam" });
    expect(report.error?.message).toMatch(/exam_room:system/);
    const reply = await admin
      .from("exam_room_messages")
      .insert({ exam_slug: ROOM, author_kind: "student", user_id: b, display_name: "Calm Heron", body: "welcome", reply_to: lineId });
    expect(reply.error?.message).toMatch(/exam_room:reply_target/);
    const v = await admin
      .from("exam_room_messages")
      .insert({ exam_slug: ROOM, author_kind: "v", user_id: b, display_name: "V", body: "Hello.", reply_to: lineId });
    expect(v.error?.message).toMatch(/exam_room:v_target/);
  });

  it("refuses a system line without a student, or pinned", async () => {
    const noUser = await admin
      .from("exam_room_messages")
      .insert({ exam_slug: ROOM, author_kind: "system", system_event: "joined", display_name: "X", body: "joined the room" });
    // The guard refuses it first (no member), before the shape CHECK sees it.
    expect(noUser.error?.message).toMatch(/exam_room:not_member|exam_room_messages_system_shape/);
    const pinned = await admin
      .from("exam_room_messages")
      .insert({ exam_slug: ROOM, author_kind: "system", system_event: "answered", user_id: a, display_name: "X", body: "x", pinned: true });
    expect(pinned.error?.code).toBe("23514");
  });

  it("never counts a system line as unread or as the room's last message", async () => {
    const { data, error } = await admin.rpc("exam_room_summaries", { p_user_id: a });
    expect(error).toBeNull();
    const row = (data as { exam_slug: string; unread: number; last_name: string; last_body: string }[]).find((r) => r.exam_slug === ROOM)!;
    // Visible to a and not a system line: the daily question alone (b's answered line is left out).
    expect(row.unread).toBe(1);
    expect(row.last_name).toBe("PYQ Vault team");
  });

  it("pins a question only when the room has no pin today", async () => {
    const first = await admin.rpc("post_exam_room_daily_if_missing", { p_exam_slug: PIN_ROOM, p_question_id: questionId, p_body: "Today's question." });
    expect(first.error).toBeNull();
    expect(first.data).not.toBeNull();
    const second = await admin.rpc("post_exam_room_daily_if_missing", { p_exam_slug: PIN_ROOM, p_question_id: questionId, p_body: "Again." });
    expect(second.error).toBeNull();
    expect(second.data).toBeNull();
    const { data: pins } = await admin.from("exam_room_messages").select("id").eq("exam_slug", PIN_ROOM).eq("author_kind", "team");
    expect(pins?.map((p) => p.id)).toEqual([first.data]);
  });
});
