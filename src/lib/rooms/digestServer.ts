/**
 * The data for the owner's evening rooms email (lib/rooms/digest). Read-only,
 * service role. "To check": messages hidden by reports, or reported at least
 * once, that the owner has not reviewed. "Unanswered": a student's message
 * with a question mark, 2 to 48 hours old, that nobody (student, team or V)
 * has replied to. Counts: the last 24 hours per room.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { roomName } from "./server";
import type { RoomsDigestInput } from "./digest";

const HOUR = 3_600_000;
const CAP = 25;

export async function loadRoomsDigest(db: SupabaseClient, now: Date): Promise<Omit<RoomsDigestInput, "dateLabel" | "dashboardUrl">> {
  const since24 = new Date(now.getTime() - 24 * HOUR).toISOString();
  const since48 = new Date(now.getTime() - 48 * HOUR).toISOString();
  const before2 = new Date(now.getTime() - 2 * HOUR).toISOString();

  const reports = await db
    .from("exam_room_reports")
    .select("message_id, reason, exam_room_messages!inner(id, exam_slug, display_name, body, hidden_at, reviewed_at)")
    .is("exam_room_messages.reviewed_at", null)
    .limit(500);
  if (reports.error) throw new Error(`rooms digest reports: ${reports.error.message}`);
  type Msg = { id: number; exam_slug: string; display_name: string; body: string; hidden_at: string | null };
  const byMsg = new Map<number, { msg: Msg; reasons: Set<string>; reports: number }>();
  for (const r of (reports.data ?? []) as unknown as { message_id: number; reason: string; exam_room_messages: Msg }[]) {
    const e = byMsg.get(r.message_id) ?? { msg: r.exam_room_messages, reasons: new Set<string>(), reports: 0 };
    e.reasons.add(r.reason);
    e.reports++;
    byMsg.set(r.message_id, e);
  }
  const flagged = [...byMsg.values()]
    .sort((a, b) => Number(!!b.msg.hidden_at) - Number(!!a.msg.hidden_at) || b.reports - a.reports)
    .slice(0, CAP)
    .map((e) => ({
      room: roomName(e.msg.exam_slug) ?? e.msg.exam_slug,
      name: e.msg.display_name,
      body: e.msg.body,
      reports: e.reports,
      hidden: !!e.msg.hidden_at,
      reasons: [...e.reasons],
    }));

  const doubts = await db
    .from("exam_room_messages")
    .select("id, exam_slug, display_name, body, created_at")
    .eq("author_kind", "student")
    .is("hidden_at", null)
    .gte("created_at", since48)
    .lte("created_at", before2)
    .like("body", "%?%")
    .order("created_at", { ascending: true })
    .limit(200);
  if (doubts.error) throw new Error(`rooms digest doubts: ${doubts.error.message}`);
  const doubtIds = (doubts.data ?? []).map((d) => d.id as number);
  const replied = new Set<number>();
  for (let i = 0; i < doubtIds.length; i += 200) {
    const r = await db.from("exam_room_messages").select("reply_to").in("reply_to", doubtIds.slice(i, i + 200));
    if (r.error) throw new Error(`rooms digest replies: ${r.error.message}`);
    for (const x of r.data ?? []) replied.add(Number(x.reply_to));
  }
  const unanswered = (doubts.data ?? [])
    .filter((d) => !replied.has(Number(d.id)))
    .slice(0, CAP)
    .map((d) => ({
      room: roomName(d.exam_slug as string) ?? (d.exam_slug as string),
      name: d.display_name as string,
      body: d.body as string,
      hoursAgo: Math.round((now.getTime() - Date.parse(d.created_at as string)) / HOUR),
    }));

  const [recent, joins] = await Promise.all([
    db.from("exam_room_messages").select("exam_slug, user_id").eq("author_kind", "student").gte("created_at", since24).limit(5000),
    db.from("exam_room_members").select("exam_slug").gte("joined_at", since24).limit(5000),
  ]);
  if (recent.error || joins.error) throw new Error(`rooms digest counts: ${(recent.error ?? joins.error)!.message}`);
  const per = new Map<string, { messages: number; students: Set<string>; joined: number }>();
  const slot = (slug: string) => {
    const e = per.get(slug) ?? { messages: 0, students: new Set<string>(), joined: 0 };
    per.set(slug, e);
    return e;
  };
  for (const m of recent.data ?? []) {
    const e = slot(m.exam_slug as string);
    e.messages++;
    e.students.add(m.user_id as string);
  }
  for (const j of joins.data ?? []) slot(j.exam_slug as string).joined++;
  const rooms = [...per.entries()]
    .map(([slug, e]) => ({ room: roomName(slug) ?? slug, messages: e.messages, students: e.students.size, joined: e.joined }))
    .sort((a, b) => b.messages - a.messages || b.joined - a.joined);

  return { flagged, unanswered, rooms };
}
