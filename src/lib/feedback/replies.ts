/**
 * Replies to feature requests (migration 0243). PURE.
 * Spec: tests/feedback-replies.test.ts.
 *
 * Staff answer a request on /dashboard/feedback with a status and an optional
 * note. The student reads it on /feedback, sees a line in the avatar menu while
 * it is unread, and gets one email per status: a first reply mails, a new
 * status mails, a note edit alone does not (it only shows as unread again).
 * "One email per status" is held by the email_sends dedupe key, not by this
 * module, so a double click cannot send twice and a failed send is retried.
 *
 * A reply email is a service email the student asked for (they wrote to us),
 * so it carries no unsubscribe line, the same call as the answer-sheet report.
 */
import { SITE_URL } from "@/lib/brand";
import { ACCENT, BRAND, INK, MUTED, REPLY_TO, escapeHtml, greetingName, type BuiltEmail } from "@/lib/email/templates";

export const REPLY_STATUSES = ["received", "planned", "done", "not_now"] as const;
export type ReplyStatus = (typeof REPLY_STATUSES)[number];

/** What the student reads. Mirrors the DB CHECK on feedback_replies.status. */
export const STATUS_LABELS: Record<ReplyStatus, string> = {
  received: "We've read it",
  planned: "On our list",
  done: "Live now",
  not_now: "Not planned for now",
};

/** Mirrors the DB CHECK on feedback_replies.note. */
export const MAX_NOTE = 1000;

export const FEEDBACK_REPLY_KIND = "feedback_reply" as const;

export type Reply = { status: ReplyStatus; note: string | null };

export type ReplyValidation = { ok: true; value: Reply } | { ok: false; error: string };

export function isReplyStatus(v: unknown): v is ReplyStatus {
  return typeof v === "string" && (REPLY_STATUSES as readonly string[]).includes(v);
}

export function validateReply(input: { status?: unknown; note?: unknown }): ReplyValidation {
  if (!isReplyStatus(input.status)) return { ok: false, error: "Pick a status." };
  if (input.note !== undefined && input.note !== null && typeof input.note !== "string") {
    return { ok: false, error: "The note must be text." };
  }
  const note = typeof input.note === "string" ? input.note.trim() : "";
  if (note.length > MAX_NOTE) return { ok: false, error: `Keep the note under ${MAX_NOTE} characters.` };
  return { ok: true, value: { status: input.status, note: note || null } };
}

/** Does this save show the reply as unread again? A first reply, a new status
 *  or a changed note does; saving the same reply again does not. Whether it
 *  mails is NOT decided here: the send log decides (one sent row per request
 *  and status), so a failed send is retried by the next save. */
export function isUnreadAgain(prev: Reply | null, next: Reply): boolean {
  if (!prev) return true;
  return prev.status !== next.status || (prev.note ?? null) !== (next.note ?? null);
}

export function feedbackReplyDedupeKey(feedbackId: string, status: ReplyStatus): string {
  return `feedback_reply:${feedbackId}:${status}`;
}

const SUBJECTS: Record<ReplyStatus, string> = {
  received: "We read your suggestion",
  planned: "Your suggestion is on our list",
  done: "You asked, it's live now",
  not_now: "About your suggestion",
};

/** The request as quoted in the email: one line, cut at a word near 300. */
const QUOTE_MAX = 300;
function quote(request: string): string {
  const flat = request.replace(/\s+/g, " ").trim();
  if (flat.length <= QUOTE_MAX) return flat;
  const cut = flat.slice(0, QUOTE_MAX);
  const space = cut.lastIndexOf(" ");
  return `${(space > QUOTE_MAX / 2 ? cut.slice(0, space) : cut).trim()}...`;
}

export type FeedbackReplyEmailInput = {
  name: string;
  request: string;
  status: ReplyStatus;
  note: string | null;
};

export function buildFeedbackReplyEmail(input: FeedbackReplyEmailInput): BuiltEmail {
  const who = greetingName(input.name);
  const url = `${SITE_URL}/feedback`;
  const asked = quote(input.request);
  const label = STATUS_LABELS[input.status];
  const subject = SUBJECTS[input.status];
  const text = [
    who ? `Hi ${who},` : "Hi,",
    "",
    "You sent us this suggestion:",
    `"${asked}"`,
    "",
    `Our reply: ${label}.`,
    ...(input.note ? ["", input.note] : []),
    "",
    `See all your suggestions: ${url}`,
    "",
    "Thank you for telling us. You can reply to this email too.",
    "",
    BRAND,
  ].join("\n");
  const noteHtml = input.note
    ? `<p style="margin:0 0 20px;white-space:pre-line">${escapeHtml(input.note)}</p>`
    : "";
  const html = `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:520px;margin:0 auto;color:${INK};line-height:1.55">
  <p style="margin:0 0 16px">${who ? `Hi ${escapeHtml(who)},` : "Hi,"}</p>
  <p style="margin:0 0 8px">You sent us this suggestion:</p>
  <p style="margin:0 0 16px;padding-left:12px;border-left:3px solid ${MUTED};color:${MUTED}">${escapeHtml(asked)}</p>
  <p style="margin:0 0 16px">Our reply: <strong>${escapeHtml(label)}</strong>.</p>
  ${noteHtml}
  <p style="margin:0 0 24px"><a href="${url}" style="background:${ACCENT};color:#fff;text-decoration:none;padding:10px 18px;border-radius:6px;display:inline-block;font-weight:600">See your suggestions</a></p>
  <p style="margin:0 0 24px;color:${MUTED};font-size:14px">Thank you for telling us. You can reply to this email too.</p>
  <p style="margin:0">${BRAND}</p>
</div>`;
  return { subject, text, html, replyTo: REPLY_TO, headers: {} };
}
