/**
 * Exam rooms: the service-role reads and writes behind /api/rooms/* (migration
 * 0289). Every function takes the service-role client; the ROUTE checks the
 * session first, and these check what the route cannot know from the session
 * alone: the room is one of the student's exams, and they joined it. The
 * guard triggers hold the rest (rate, mute, closed, V cap) whatever calls.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { getExamBySlug } from "@/lib/exam/examContext";
import { buildRoomList, type RoomListItem } from "./list";
import { checkNickname } from "./nickname";
import { toMessageView, type RoomMessageRow, type RoomMessageView, type RoomQuestionView } from "./view";
import type { RoomReportReason } from "./validate";

export const ROOM_PAGE = 50;

const MESSAGE_COLUMNS = "id, author_kind, user_id, display_name, body, reply_to, question_id, pinned, created_at";

export class RoomAccessError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
  }
}

export function roomName(slug: string): string | null {
  return getExamBySlug(slug)?.displayName ?? null;
}

async function profileOf(db: SupabaseClient, userId: string): Promise<{ targets: string[]; hiddenUntil: string | null }> {
  const { data, error } = await db
    .from("student_profiles")
    .select("target_exams, rooms_button_hidden_until")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(`rooms profile: ${error.message}`);
  return {
    targets: ((data?.target_exams as string[] | null) ?? []).slice(),
    hiddenUntil: (data?.rooms_button_hidden_until as string | null | undefined) ?? null,
  };
}

async function targetExams(db: SupabaseClient, userId: string): Promise<string[]> {
  return (await profileOf(db, userId)).targets;
}

const TAKEN = "That name is taken in this room. Try another.";

/** Postgres unique violation on the nickname index (migration 0290). */
function nicknameTaken(err: { code?: string; message: string } | null): boolean {
  return !!err && err.code === "23505" && err.message.includes("exam_room_members_nickname_uniq");
}

export type RoomSummary = RoomListItem & { last: { name: string; body: string; at: string } | null };

export async function loadRoomList(
  db: SupabaseClient,
  userId: string
): Promise<{ joined: RoomSummary[]; others: RoomListItem[]; hiddenUntil: string | null }> {
  const [profile, summaries, closedRows] = await Promise.all([
    profileOf(db, userId),
    db.rpc("exam_room_summaries", { p_user_id: userId }),
    db.from("exam_rooms").select("exam_slug").eq("open", false),
  ]);
  if (summaries.error) throw new Error(`rooms summaries: ${summaries.error.message}`);
  if (closedRows.error) throw new Error(`rooms closed: ${closedRows.error.message}`);
  const rows = (summaries.data ?? []) as {
    exam_slug: string;
    unread: number;
    last_name: string | null;
    last_body: string | null;
    last_at: string | null;
  }[];
  const list = buildRoomList({
    targetExams: profile.targets,
    nameOf: roomName,
    joined: new Set(rows.map((r) => r.exam_slug)),
    closed: new Set((closedRows.data ?? []).map((r) => r.exam_slug as string)),
    unread: new Map(rows.map((r) => [r.exam_slug, r.unread])),
  });
  const bySlug = new Map(rows.map((r) => [r.exam_slug, r]));
  return {
    joined: list.joined.map((item) => {
      const r = bySlug.get(item.slug);
      return { ...item, last: r?.last_at ? { name: r.last_name ?? "", body: r.last_body ?? "", at: r.last_at } : null };
    }),
    others: list.others,
    hiddenUntil: profile.hiddenUntil,
  };
}

async function requireMember(db: SupabaseClient, userId: string, slug: string): Promise<{ displayName: string; lastReadId: number }> {
  const { data, error } = await db
    .from("exam_room_members")
    .select("display_name, last_read_id")
    .eq("exam_slug", slug)
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(`rooms member: ${error.message}`);
  if (!data) throw new RoomAccessError("Join this room first.", 403);
  return { displayName: data.display_name as string, lastReadId: Number(data.last_read_id) };
}

/** Join a room of one of the student's exams. Idempotent. */
export async function joinRoom(db: SupabaseClient, userId: string, slug: string, rawNickname: string): Promise<void> {
  if (!roomName(slug)) throw new RoomAccessError("There is no room for that exam.", 404);
  const nick = checkNickname(rawNickname);
  if (!nick.ok) throw new RoomAccessError(nick.error, 400);
  const targets = await targetExams(db, userId);
  if (!targets.includes(slug)) throw new RoomAccessError("Add this exam to your profile to join its room.", 403);

  const room = await db.from("exam_rooms").upsert({ exam_slug: slug }, { onConflict: "exam_slug", ignoreDuplicates: true });
  if (room.error) throw new Error(`rooms create: ${room.error.message}`);
  const { data: roomRow, error: openErr } = await db.from("exam_rooms").select("open").eq("exam_slug", slug).single();
  if (openErr) throw new Error(`rooms open: ${openErr.message}`);
  if (!roomRow.open) throw new RoomAccessError("This room is closed for now.", 403);

  // Start unread at today's latest message: history is there to scroll, not a badge of 50.
  const { data: latest } = await db.from("exam_room_messages").select("id").eq("exam_slug", slug).order("id", { ascending: false }).limit(1);
  const member = await db.from("exam_room_members").upsert(
    {
      exam_slug: slug,
      user_id: userId,
      display_name: nick.name,
      last_read_id: latest?.[0]?.id ?? 0,
    },
    { onConflict: "exam_slug,user_id", ignoreDuplicates: true }
  );
  if (nicknameTaken(member.error)) throw new RoomAccessError(TAKEN, 409);
  if (member.error) throw new Error(`rooms join: ${member.error.message}`);
}

/** A new room nickname for new messages; old ones keep the name they were sent under. */
export async function renameInRoom(db: SupabaseClient, userId: string, slug: string, rawNickname: string): Promise<string> {
  await requireMember(db, userId, slug);
  const nick = checkNickname(rawNickname);
  if (!nick.ok) throw new RoomAccessError(nick.error, 400);
  const { error } = await db.from("exam_room_members").update({ display_name: nick.name }).eq("exam_slug", slug).eq("user_id", userId);
  if (nicknameTaken(error)) throw new RoomAccessError(TAKEN, 409);
  if (error) throw new Error(`rooms rename: ${error.message}`);
  return nick.name;
}

/** Hide or show the rooms button (lib/rooms/button), on the student's profile. */
export async function setButtonHidden(db: SupabaseClient, userId: string, until: string | null): Promise<void> {
  const { data, error } = await db
    .from("student_profiles")
    .update({ rooms_button_hidden_until: until })
    .eq("user_id", userId)
    .select("user_id");
  if (error) throw new Error(`rooms button: ${error.message}`);
  if (data && data.length > 0) return;
  const ins = await db.from("student_profiles").insert({ user_id: userId, rooms_button_hidden_until: until });
  if (ins.error) throw new Error(`rooms button insert: ${ins.error.message}`);
}

export async function leaveRoom(db: SupabaseClient, userId: string, slug: string): Promise<void> {
  const { error } = await db.from("exam_room_members").delete().eq("exam_slug", slug).eq("user_id", userId);
  if (error) throw new Error(`rooms leave: ${error.message}`);
}

async function loadQuestions(
  db: SupabaseClient,
  userId: string,
  rows: readonly RoomMessageRow[]
): Promise<Map<number, RoomQuestionView>> {
  const withQ = rows.filter((r) => r.question_id);
  const out = new Map<number, RoomQuestionView>();
  if (withQ.length === 0) return out;
  const qIds = [...new Set(withQ.map((r) => r.question_id as string))];
  const [qs, opts, answers] = await Promise.all([
    db.from("questions").select("id, text, context, solution").in("id", qIds),
    db.from("options").select("id, question_id, label, text, is_correct").in("question_id", qIds).order("label"),
    db.from("exam_room_answers").select("message_id, option_id, correct").eq("user_id", userId).in("message_id", withQ.map((r) => r.id)),
  ]);
  if (qs.error || opts.error || answers.error) throw new Error(`rooms questions: ${(qs.error ?? opts.error ?? answers.error)!.message}`);
  const qById = new Map((qs.data ?? []).map((q) => [q.id as string, q]));
  const optsByQ = new Map<string, { id: string; label: string; text: string; is_correct: boolean }[]>();
  for (const o of opts.data ?? []) {
    const list = optsByQ.get(o.question_id as string) ?? [];
    list.push(o as { id: string; label: string; text: string; is_correct: boolean });
    optsByQ.set(o.question_id as string, list);
  }
  const answerByMsg = new Map((answers.data ?? []).map((a) => [Number(a.message_id), a]));
  for (const r of withQ) {
    const q = qById.get(r.question_id as string);
    if (!q) continue;
    const options = optsByQ.get(q.id as string) ?? [];
    const a = answerByMsg.get(r.id);
    out.set(r.id, {
      id: q.id as string,
      text: q.text as string,
      context: (q.context as string | null) ?? null,
      options: options.map((o) => ({ id: o.id, label: o.label, text: o.text })),
      // The key and the solution only after this student answered.
      answered: a
        ? {
            optionId: a.option_id as string,
            correct: Boolean(a.correct),
            correctOptionId: options.find((o) => o.is_correct)?.id ?? null,
            solution: (q.solution as string | null) ?? null,
          }
        : null,
    });
  }
  return out;
}

async function viewsOf(db: SupabaseClient, userId: string, rows: RoomMessageRow[]): Promise<RoomMessageView[]> {
  if (rows.length === 0) return [];
  const ids = rows.map((r) => r.id);
  const missingParents = [...new Set(rows.map((r) => r.reply_to).filter((id): id is number => id != null && !ids.includes(id)))];
  const [vReplies, parents, questions] = await Promise.all([
    db.from("exam_room_messages").select("reply_to").eq("author_kind", "v").in("reply_to", ids),
    missingParents.length
      ? db.from("exam_room_messages").select("id, display_name, body").in("id", missingParents).is("hidden_at", null)
      : Promise.resolve({ data: [], error: null }),
    loadQuestions(db, userId, rows),
  ]);
  if (vReplies.error) throw new Error(`rooms v replies: ${vReplies.error.message}`);
  if (parents.error) throw new Error(`rooms parents: ${parents.error.message}`);
  const byId = new Map<number, Pick<RoomMessageRow, "id" | "display_name" | "body">>();
  for (const r of rows) byId.set(r.id, r);
  for (const p of (parents.data ?? []) as { id: number; display_name: string; body: string }[]) byId.set(Number(p.id), p);
  const repliedByV = new Set((vReplies.data ?? []).map((v) => Number(v.reply_to)));
  return rows.map((r) => toMessageView(r, { viewerId: userId, repliedByV, byId, question: questions.get(r.id) ?? null }));
}

function normalise(rows: unknown[] | null): RoomMessageRow[] {
  return ((rows ?? []) as RoomMessageRow[]).map((r) => ({ ...r, id: Number(r.id), reply_to: r.reply_to == null ? null : Number(r.reply_to) }));
}

/**
 * The room's latest page (no cursor), the messages after `after` (polling), or
 * an older page before `before`. Oldest first. Marks what it returns as read.
 */
export async function loadMessages(
  db: SupabaseClient,
  userId: string,
  slug: string,
  cursor: { after?: number | null; before?: number | null }
): Promise<{ messages: RoomMessageView[]; pinned: RoomMessageView | null; hasMore: boolean; nickname: string }> {
  const member = await requireMember(db, userId, slug);
  let q = db.from("exam_room_messages").select(MESSAGE_COLUMNS).eq("exam_slug", slug).is("hidden_at", null);
  if (cursor.after) q = q.gt("id", cursor.after);
  if (cursor.before) q = q.lt("id", cursor.before);
  const { data, error } = await q.order("id", { ascending: false }).limit(ROOM_PAGE + 1);
  if (error) throw new Error(`rooms messages: ${error.message}`);
  const all = normalise(data);
  const hasMore = !cursor.after && all.length > ROOM_PAGE;
  const rows = all.slice(0, ROOM_PAGE).reverse();

  const pinRes = await db.from("exam_room_messages").select(MESSAGE_COLUMNS).eq("exam_slug", slug).eq("pinned", true).is("hidden_at", null).maybeSingle();
  if (pinRes.error) throw new Error(`rooms pin: ${pinRes.error.message}`);
  const pinRow = pinRes.data ? normalise([pinRes.data])[0] : null;
  const pinInPage = pinRow ? rows.some((r) => r.id === pinRow.id) : false;

  const views = await viewsOf(db, userId, pinRow && !pinInPage ? [...rows, pinRow] : rows);
  const pinned = pinRow ? views.find((v) => v.id === pinRow.id) ?? null : null;
  const messages = pinRow && !pinInPage ? views.filter((v) => v.id !== pinRow.id) : views;

  const maxId = rows.length ? rows[rows.length - 1].id : 0;
  if (maxId > member.lastReadId) {
    const { error: readErr } = await db
      .from("exam_room_members")
      .update({ last_read_id: maxId })
      .eq("exam_slug", slug)
      .eq("user_id", userId)
      .lt("last_read_id", maxId);
    if (readErr) console.error("rooms mark read failed:", readErr.message);
  }
  return { messages, pinned, hasMore, nickname: member.displayName };
}

export async function postMessage(
  db: SupabaseClient,
  userId: string,
  slug: string,
  body: string,
  replyTo: number | null
): Promise<{ view: RoomMessageView } | { dbError: string }> {
  const member = await requireMember(db, userId, slug);
  if (replyTo != null) {
    const { data: parent } = await db.from("exam_room_messages").select("id").eq("id", replyTo).eq("exam_slug", slug).maybeSingle();
    if (!parent) throw new RoomAccessError("That message is not in this room.", 400);
  }
  const { data, error } = await db
    .from("exam_room_messages")
    .insert({ exam_slug: slug, author_kind: "student", user_id: userId, display_name: member.displayName, body, reply_to: replyTo })
    .select(MESSAGE_COLUMNS)
    .single();
  if (error) return { dbError: error.message };
  const [view] = await viewsOf(db, userId, normalise([data]));
  return { view };
}

async function messageInRoom(db: SupabaseClient, slug: string, messageId: number): Promise<RoomMessageRow> {
  const { data, error } = await db
    .from("exam_room_messages")
    .select(MESSAGE_COLUMNS)
    .eq("id", messageId)
    .eq("exam_slug", slug)
    .is("hidden_at", null)
    .maybeSingle();
  if (error) throw new Error(`rooms message: ${error.message}`);
  if (!data) throw new RoomAccessError("That message is not in this room.", 404);
  return normalise([data])[0];
}

export async function reportMessage(
  db: SupabaseClient,
  userId: string,
  slug: string,
  messageId: number,
  reason: RoomReportReason
): Promise<{ dbError: string } | { ok: true }> {
  await requireMember(db, userId, slug);
  await messageInRoom(db, slug, messageId);
  const { error } = await db
    .from("exam_room_reports")
    .upsert({ message_id: messageId, user_id: userId, reason }, { onConflict: "message_id,user_id", ignoreDuplicates: true });
  return error ? { dbError: error.message } : { ok: true };
}

export async function answerDaily(
  db: SupabaseClient,
  userId: string,
  slug: string,
  messageId: number,
  optionId: string
): Promise<{ dbError: string } | { question: RoomQuestionView }> {
  await requireMember(db, userId, slug);
  const msg = await messageInRoom(db, slug, messageId);
  if (!msg.question_id) throw new RoomAccessError("That message has no question.", 400);
  const { error } = await db
    .from("exam_room_answers")
    .upsert({ message_id: messageId, user_id: userId, option_id: optionId, correct: false }, { onConflict: "message_id,user_id", ignoreDuplicates: true });
  if (error) return { dbError: error.message };
  const q = (await loadQuestions(db, userId, [msg])).get(msg.id);
  if (!q) throw new Error("rooms answer: question vanished");
  return { question: q };
}

/** What V needs to answer a doubt: the doubt, what it replies to, the room's pinned question. */
export async function loadAskVContext(
  db: SupabaseClient,
  userId: string,
  slug: string,
  messageId: number
): Promise<{ doubt: RoomMessageRow; repliesTo: string | null; question: { text: string; options: string[] } | null }> {
  await requireMember(db, userId, slug);
  const doubt = await messageInRoom(db, slug, messageId);
  if (doubt.author_kind !== "student") throw new RoomAccessError("V answers students' doubts.", 400);
  const parent = doubt.reply_to != null ? await messageInRoom(db, slug, doubt.reply_to).catch(() => null) : null;
  const { data: pin } = await db.from("exam_room_messages").select("question_id").eq("exam_slug", slug).eq("pinned", true).maybeSingle();
  let question: { text: string; options: string[] } | null = null;
  if (pin?.question_id) {
    const [q, o] = await Promise.all([
      db.from("questions").select("text").eq("id", pin.question_id).maybeSingle(),
      db.from("options").select("text").eq("question_id", pin.question_id).order("label"),
    ]);
    if (q.data) question = { text: q.data.text as string, options: (o.data ?? []).map((x) => x.text as string) };
  }
  return { doubt, repliesTo: parent?.body ?? null, question };
}

export async function postVReply(
  db: SupabaseClient,
  userId: string,
  slug: string,
  replyTo: number,
  body: string
): Promise<{ view: RoomMessageView } | { dbError: string }> {
  const { data, error } = await db
    .from("exam_room_messages")
    .insert({ exam_slug: slug, author_kind: "v", user_id: userId, display_name: "V", body, reply_to: replyTo })
    .select(MESSAGE_COLUMNS)
    .single();
  if (error) return { dbError: error.message };
  const [view] = await viewsOf(db, userId, normalise([data]));
  return { view };
}
