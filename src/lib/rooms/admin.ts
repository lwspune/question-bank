/**
 * /dashboard/rooms (superadmin): the owner moderates the exam rooms (owner,
 * 2026-11-25; migration 0289). Service role; the page and /api/admin/rooms
 * check the superadmin session first.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { roomName } from "./server";
import { checkRoomText } from "./text";
import { postDaily } from "./dailyServer";
import { getExamBySlug } from "@/lib/exam/examContext";
import { tallyDailyAnswers, type DailyTally } from "./adminRoom";
import { publicImageUrl } from "@/lib/storage/imageUrl";

function one<T>(x: T | T[]): T {
  return Array.isArray(x) ? x[0] : x;
}

export type AdminRoom = { slug: string; name: string; open: boolean; members: number; messages24h: number; pinnedQuestionId: string | null };

export type FlaggedMessage = {
  id: number;
  slug: string;
  room: string;
  userId: string | null;
  /** The author's account email: staff only, so a nickname can be traced (0290). */
  email: string | null;
  name: string;
  kind: string;
  body: string;
  at: string;
  hidden: boolean;
  reports: number;
  reasons: string[];
};

export async function loadAdminRooms(db: SupabaseClient): Promise<AdminRoom[]> {
  const { data, error } = await db.from("exam_rooms").select("exam_slug, open").order("exam_slug");
  if (error) throw new Error(`rooms admin list: ${error.message}`);
  const since = new Date(Date.now() - 86_400_000).toISOString();
  return Promise.all(
    (data ?? []).map(async (r) => {
      const slug = r.exam_slug as string;
      const [members, recent, pin] = await Promise.all([
        db.from("exam_room_members").select("user_id", { count: "exact", head: true }).eq("exam_slug", slug),
        // System lines (0291) are not messages: a join or an answer would inflate this.
        db
          .from("exam_room_messages")
          .select("id", { count: "exact", head: true })
          .eq("exam_slug", slug)
          .neq("author_kind", "system")
          .gte("created_at", since),
        db.from("exam_room_messages").select("question_id").eq("exam_slug", slug).eq("pinned", true).maybeSingle(),
      ]);
      return {
        slug,
        name: roomName(slug) ?? slug,
        open: Boolean(r.open),
        members: members.count ?? 0,
        messages24h: recent.count ?? 0,
        pinnedQuestionId: (pin.data?.question_id as string | null | undefined) ?? null,
      };
    })
  );
}

export async function loadFlagged(db: SupabaseClient): Promise<FlaggedMessage[]> {
  const { data, error } = await db
    .from("exam_room_reports")
    .select("reason, exam_room_messages!inner(id, exam_slug, user_id, author_kind, display_name, body, created_at, hidden_at, reviewed_at)")
    .is("exam_room_messages.reviewed_at", null)
    .limit(1000);
  if (error) throw new Error(`rooms admin flagged: ${error.message}`);
  type M = { id: number; exam_slug: string; user_id: string | null; author_kind: string; display_name: string; body: string; created_at: string; hidden_at: string | null };
  const by = new Map<number, FlaggedMessage>();
  for (const r of data ?? []) {
    // Many-to-one, so one row at runtime; untyped supabase-js infers a list.
    const m: M = one(r.exam_room_messages);
    const e =
      by.get(m.id) ??
      ({
        id: m.id,
        slug: m.exam_slug,
        room: roomName(m.exam_slug) ?? m.exam_slug,
        userId: m.author_kind === "student" ? m.user_id : null,
        email: null,
        name: m.display_name,
        kind: m.author_kind,
        body: m.body,
        at: m.created_at,
        hidden: !!m.hidden_at,
        reports: 0,
        reasons: [],
      } satisfies FlaggedMessage);
    e.reports++;
    if (!e.reasons.includes(r.reason)) e.reasons.push(r.reason);
    by.set(m.id, e);
  }
  // A message hidden by staff without reports still shows in the room's history list, not here.
  const list = [...by.values()].sort((a, b) => Number(b.hidden) - Number(a.hidden) || b.reports - a.reports || b.id - a.id);
  // Nicknames hide students from each other, not from the owner moderating them.
  const ids = [...new Set(list.map((f) => f.userId).filter((id): id is string => !!id))].slice(0, 100);
  const emails = new Map<string, string | null>();
  await Promise.all(
    ids.map(async (id) => {
      const { data } = await db.auth.admin.getUserById(id);
      emails.set(id, data.user?.email ?? null);
    })
  );
  return list.map((f) => ({ ...f, email: f.userId ? emails.get(f.userId) ?? null : null }));
}

export async function reviewMessage(db: SupabaseClient, id: number, verdict: "keep" | "hide"): Promise<void> {
  const now = new Date().toISOString();
  const patch =
    verdict === "keep"
      ? { hidden_at: null, hidden_reason: null, reviewed_at: now }
      : { hidden_at: now, hidden_reason: "staff", reviewed_at: now };
  const { error } = await db.from("exam_room_messages").update(patch).eq("id", id);
  if (error) throw new Error(`rooms admin review: ${error.message}`);
}

export async function muteStudent(db: SupabaseClient, slug: string, userId: string, days: number): Promise<void> {
  const until = days > 0 ? new Date(Date.now() + days * 86_400_000).toISOString() : null;
  const { error } = await db.from("exam_room_members").update({ muted_until: until }).eq("exam_slug", slug).eq("user_id", userId);
  if (error) throw new Error(`rooms admin mute: ${error.message}`);
}

export async function setRoomOpen(db: SupabaseClient, slug: string, open: boolean): Promise<void> {
  if (!roomName(slug)) throw new Error("No such exam.");
  const { error } = await db.from("exam_rooms").upsert({ exam_slug: slug, open }, { onConflict: "exam_slug" });
  if (error) throw new Error(`rooms admin open: ${error.message}`);
}

export async function teamPost(
  db: SupabaseClient,
  slug: string,
  staffUserId: string,
  raw: string,
  image: { path: string; alt: string } | null = null,
): Promise<{ error: string } | { ok: true }> {
  // Staff may share a link (an official notice); phone numbers and emails still never go in a room.
  const text = checkRoomText(raw);
  if (!text.ok && !/Links can't/.test(text.error)) return { error: text.error };
  // 0295: a picture is filed under its own circle; the CHECK holds the shape.
  if (image && !image.path.startsWith(`circles/${slug}/`)) return { error: "That picture belongs to another circle." };
  const body = raw.replace(/\r\n?/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  const { error } = await db
    .from("exam_room_messages")
    .insert({
      exam_slug: slug,
      author_kind: "team",
      user_id: staffUserId,
      display_name: "PYQ Vault team",
      body,
      image_path: image?.path ?? null,
      image_alt: image?.alt ?? null,
    });
  if (error) return { error: error.message };
  return { ok: true };
}

/** Swap the room's pinned question for one the team chose. It must be a question the card can show. */
export async function swapDaily(db: SupabaseClient, slug: string, questionId: string, staffUserId: string): Promise<{ error: string } | { ok: true }> {
  const examName = getExamBySlug(slug)?.examName;
  const { data: exam } = await db.from("exams").select("id").eq("name", examName ?? "").maybeSingle();
  if (!exam) return { error: "Exam not found." };
  const { data: q } = await db.from("questions").select("exam_id").eq("id", questionId).maybeSingle();
  if (!q || q.exam_id !== exam.id) return { error: "That question is not from this exam." };
  const usable = await showableInRoom(db, questionId);
  if (!usable) return { error: "That question can't be shown in a circle (needs a PUBLIC MCQ without a figure)." };
  await postDaily(db, slug, questionId, staffUserId);
  return { ok: true };
}

async function showableInRoom(db: SupabaseClient, questionId: string): Promise<boolean> {
  const { data } = await db
    .from("questions")
    .select("id, visibility, question_format, image_url")
    .eq("id", questionId)
    .maybeSingle();
  if (!data || data.visibility !== "PUBLIC" || data.question_format !== "mcq" || data.image_url) return false;
  const { data: opts } = await db.from("options").select("image_url").eq("question_id", questionId);
  return (opts ?? []).length >= 2 && (opts ?? []).every((o) => !o.image_url);
}


export type AdminRoomMessage = {
  id: number;
  kind: "student" | "team" | "v" | "system";
  event: "joined" | "answered" | null;
  name: string;
  /** Students only: the account email, so a nickname can be traced (staff page). */
  email: string | null;
  userId: string | null;
  body: string;
  at: string;
  hidden: boolean;
  hiddenReason: string | null;
  pinned: boolean;
  replyTo: { name: string; body: string } | null;
  /** A team post's picture (0295). */
  image: { url: string; alt: string } | null;
};

export type AdminRoomDetail = {
  slug: string;
  name: string;
  open: boolean;
  members: number;
  /** Newest first, hidden ones included. */
  messages: AdminRoomMessage[];
  /** Pass as ?before= for the next older page; null when this is the oldest. */
  olderBefore: number | null;
  daily: {
    messageId: number;
    questionId: string;
    at: string;
    text: string;
    context: string | null;
    options: { label: string; text: string }[];
    tally: DailyTally;
  } | null;
};

export const ADMIN_ROOM_PAGE = 100;

/** One room as the owner reads it: the whole chat, hidden messages too, and how its daily question went. */
export async function loadAdminRoom(db: SupabaseClient, slug: string, before: number | null): Promise<AdminRoomDetail | null> {
  const name = roomName(slug);
  if (!name) return null;
  const { data: room, error: roomErr } = await db.from("exam_rooms").select("open").eq("exam_slug", slug).maybeSingle();
  if (roomErr) throw new Error(`rooms admin room: ${roomErr.message}`);
  if (!room) return null;

  let q = db
    .from("exam_room_messages")
    .select("id, author_kind, system_event, user_id, display_name, body, created_at, hidden_at, hidden_reason, pinned, reply_to, image_path, image_alt")
    .eq("exam_slug", slug);
  if (before) q = q.lt("id", before);
  const [msgs, members, pin] = await Promise.all([
    q.order("id", { ascending: false }).limit(ADMIN_ROOM_PAGE + 1),
    db.from("exam_room_members").select("user_id", { count: "exact", head: true }).eq("exam_slug", slug),
    db.from("exam_room_messages").select("id, question_id, created_at").eq("exam_slug", slug).eq("pinned", true).maybeSingle(),
  ]);
  if (msgs.error || members.error || pin.error) throw new Error(`rooms admin room: ${(msgs.error ?? members.error ?? pin.error)!.message}`);
  type Row = {
    id: number;
    author_kind: AdminRoomMessage["kind"];
    system_event: AdminRoomMessage["event"];
    user_id: string | null;
    display_name: string;
    body: string;
    created_at: string;
    hidden_at: string | null;
    hidden_reason: string | null;
    pinned: boolean;
    reply_to: number | null;
    image_path: string | null;
    image_alt: string | null;
  };
  const all = (msgs.data ?? []) as Row[];
  const rows = all.slice(0, ADMIN_ROOM_PAGE);

  const byId = new Map<number, { name: string; body: string }>(rows.map((r) => [Number(r.id), { name: r.display_name, body: r.body }]));
  const missing = [...new Set(rows.map((r) => r.reply_to).filter((id): id is number => id != null && !byId.has(Number(id))))];
  if (missing.length) {
    const { data } = await db.from("exam_room_messages").select("id, display_name, body").in("id", missing.slice(0, 200));
    for (const p of data ?? []) byId.set(Number(p.id), { name: p.display_name as string, body: p.body as string });
  }

  const studentIds = [...new Set(rows.filter((r) => r.author_kind === "student" && r.user_id).map((r) => r.user_id as string))];
  const emails = new Map<string, string | null>();
  await Promise.all(
    studentIds.map(async (id) => {
      const { data } = await db.auth.admin.getUserById(id);
      emails.set(id, data.user?.email ?? null);
    })
  );

  const messages: AdminRoomMessage[] = rows.map((r) => ({
    id: Number(r.id),
    kind: r.author_kind,
    event: r.system_event,
    name: r.display_name,
    email: r.author_kind === "student" && r.user_id ? emails.get(r.user_id) ?? null : null,
    userId: r.author_kind === "student" ? r.user_id : null,
    body: r.body,
    at: r.created_at,
    hidden: !!r.hidden_at,
    hiddenReason: r.hidden_reason,
    image: r.image_path && r.image_alt ? { url: publicImageUrl(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "", r.image_path), alt: r.image_alt } : null,
    pinned: r.pinned,
    replyTo: r.reply_to != null ? byId.get(Number(r.reply_to)) ?? null : null,
  }));

  let daily: AdminRoomDetail["daily"] = null;
  if (pin.data?.question_id) {
    const questionId = pin.data.question_id as string;
    const messageId = Number(pin.data.id);
    const [question, opts] = await Promise.all([
      db.from("questions").select("text, context").eq("id", questionId).maybeSingle(),
      db.from("options").select("id, label, text, is_correct").eq("question_id", questionId).order("label"),
    ]);
    if (question.error || opts.error) throw new Error(`rooms admin daily: ${(question.error ?? opts.error)!.message}`);
    const options = (opts.data ?? []) as { id: string; label: string; text: string; is_correct: boolean }[];
    // One count per option (count: exact), so a busy room never meets the 1,000-row cap.
    const counts = new Map<string, number>();
    await Promise.all(
      options.map(async (o) => {
        const { count } = await db
          .from("exam_room_answers")
          .select("user_id", { count: "exact", head: true })
          .eq("message_id", messageId)
          .eq("option_id", o.id);
        counts.set(o.id, count ?? 0);
      })
    );
    if (question.data) {
      daily = {
        messageId,
        questionId,
        at: pin.data.created_at as string,
        text: question.data.text as string,
        context: (question.data.context as string | null) ?? null,
        options: options.map((o) => ({ label: o.label, text: o.text })),
        tally: tallyDailyAnswers(options, counts),
      };
    }
  }

  return {
    slug,
    name,
    open: Boolean(room.open),
    members: members.count ?? 0,
    messages,
    olderBefore: all.length > ADMIN_ROOM_PAGE ? Number(rows[rows.length - 1].id) : null,
    daily,
  };
}
