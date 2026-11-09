/**
 * Replies to feature requests: reads and the save-and-email write (migration
 * 0243). The rules live in the pure replies.ts; this module fetches rows and
 * records outcomes. Spec: tests/feedback-replies-db.test.ts.
 *
 * Every function takes the supabase client as a parameter:
 * - saveFeedbackReply and countUnreadReplies(staff) run with the SERVICE ROLE
 *   (only the server writes a reply; the student's email needs the admin API).
 * - listOwnRequests runs with the STUDENT's JWT, so RLS is what scopes it.
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { sendEmail, type SendPayload, type SendResult } from "@/lib/email/resend";
import {
  FEEDBACK_REPLY_KIND,
  buildFeedbackReplyEmail,
  feedbackReplyDedupeKey,
  isReplyStatus,
  isUnreadAgain,
  type Reply,
  type ReplyStatus,
} from "./replies";

export type ReplyEmailOutcome = "sent" | "failed" | "already_sent" | "no_address";

export type SaveReplyResult =
  | { ok: true; email: ReplyEmailOutcome }
  | { ok: false; status: 404; error: string };

type Deps = { send: (p: SendPayload) => Promise<SendResult> };

/**
 * Save (or change) the reply to one feature request, then email the student
 * unless this request + status was already mailed. The reply is saved first:
 * a failed email never loses the reply, it is recorded as `failed` and the
 * next save of the same status sends it again.
 */
export async function saveFeedbackReply(
  admin: SupabaseClient,
  input: { feedbackId: string; reply: Reply; repliedBy: string | null },
  deps: Deps = { send: sendEmail }
): Promise<SaveReplyResult> {
  const { data: request, error: reqErr } = await admin
    .from("user_feedback")
    .select("id, user_id, kind, message")
    .eq("id", input.feedbackId)
    .maybeSingle();
  if (reqErr) throw new Error(`saveFeedbackReply request: ${reqErr.message}`);
  if (!request || request.kind !== "feature" || !request.message) {
    return { ok: false, status: 404, error: "No such request." };
  }

  const { data: prevRow, error: prevErr } = await admin
    .from("feedback_replies")
    .select("status, note")
    .eq("feedback_id", input.feedbackId)
    .maybeSingle();
  if (prevErr) throw new Error(`saveFeedbackReply read: ${prevErr.message}`);
  const prev: Reply | null =
    prevRow && isReplyStatus(prevRow.status) ? { status: prevRow.status, note: prevRow.note ?? null } : null;

  if (isUnreadAgain(prev, input.reply)) {
    const { error } = await admin.from("feedback_replies").upsert(
      {
        feedback_id: input.feedbackId,
        user_id: request.user_id,
        status: input.reply.status,
        note: input.reply.note,
        replied_by: input.repliedBy,
        replied_at: new Date().toISOString(),
        seen_at: null,
      },
      { onConflict: "feedback_id" }
    );
    if (error) throw new Error(`saveFeedbackReply write: ${error.message}`);
  }

  const email = await mailReply(admin, request.user_id, input.feedbackId, request.message, input.reply, deps);
  return { ok: true, email };
}

async function mailReply(
  admin: SupabaseClient,
  userId: string,
  feedbackId: string,
  message: string,
  reply: Reply,
  deps: Deps
): Promise<ReplyEmailOutcome> {
  const key = feedbackReplyDedupeKey(feedbackId, reply.status);
  const { data: prior, error: priorErr } = await admin
    .from("email_sends")
    .select("id, status")
    .eq("dedupe_key", key)
    .maybeSingle();
  if (priorErr) throw new Error(`feedback reply email read: ${priorErr.message}`);
  if (prior?.status === "sent") return "already_sent";

  const { data: u, error: userErr } = await admin.auth.admin.getUserById(userId);
  if (userErr) throw new Error(`feedback reply email user: ${userErr.message}`);
  const to = u.user?.email;
  if (!to) return "no_address";
  const meta = (u.user?.user_metadata ?? {}) as { full_name?: string; name?: string };
  const built = buildFeedbackReplyEmail({
    name: (meta.full_name ?? meta.name ?? "").trim(),
    request: message,
    status: reply.status,
    note: reply.note,
  });

  const outcome = await deps.send({ to, ...built });
  if (!outcome.ok) console.error("feedback reply email failed", outcome.error);
  const row = {
    user_id: userId,
    kind: FEEDBACK_REPLY_KIND,
    to_email: to,
    subject: built.subject,
    ref_id: feedbackId,
    ref_kind: "user_feedback",
    dedupe_key: key,
    status: outcome.ok ? "sent" : "failed",
    provider_id: outcome.ok ? outcome.providerId : null,
    error: outcome.ok ? null : outcome.error.slice(0, 1000),
  };
  // A failed earlier attempt holds the dedupe key: overwrite it rather than
  // insert a second row (the key is UNIQUE).
  const { error } = prior
    ? await admin.from("email_sends").update(row).eq("id", prior.id)
    : await admin.from("email_sends").insert(row);
  if (error) console.error("feedback reply email record failed", error.message);
  return outcome.ok ? "sent" : "failed";
}

export type OwnRequest = {
  id: string;
  message: string;
  createdAt: string;
  reply: { status: ReplyStatus; note: string | null; repliedAt: string; unread: boolean } | null;
};

type OwnRow = {
  id: string;
  message: string | null;
  created_at: string;
  feedback_replies:
    | { status: string; note: string | null; replied_at: string; seen_at: string | null }
    | { status: string; note: string | null; replied_at: string; seen_at: string | null }[]
    | null;
};

/** The student's own feature requests, newest first, each with its reply. A
 *  student sends a handful, so one page of 100 is the whole list. */
export async function listOwnRequests(db: SupabaseClient): Promise<OwnRequest[]> {
  const { data, error } = await db
    .from("user_feedback")
    .select("id, message, created_at, feedback_replies(status, note, replied_at, seen_at)")
    .eq("kind", "feature")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) throw new Error(`listOwnRequests: ${error.message}`);
  return ((data ?? []) as OwnRow[])
    .filter((r) => r.message)
    .map((r) => {
      const raw = Array.isArray(r.feedback_replies) ? r.feedback_replies[0] : r.feedback_replies;
      const reply =
        raw && isReplyStatus(raw.status)
          ? { status: raw.status, note: raw.note, repliedAt: raw.replied_at, unread: raw.seen_at === null }
          : null;
      return { id: r.id, message: r.message as string, createdAt: r.created_at, reply };
    });
}

/** Unread replies for one student. Filters on user_id explicitly, so it is
 *  right with the student's JWT (RLS agrees) and with the service role. */
export async function countUnreadReplies(db: SupabaseClient, userId: string): Promise<number> {
  const { count, error } = await db
    .from("feedback_replies")
    .select("feedback_id", { count: "exact", head: true })
    .eq("user_id", userId)
    .is("seen_at", null);
  if (error) throw new Error(`countUnreadReplies: ${error.message}`);
  return count ?? 0;
}
