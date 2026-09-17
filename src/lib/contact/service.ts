/**
 * Contact-message persistence + triage (service-role).
 *
 * contact_messages (migration 0102) is RLS-locked to service-role, so every
 * read/write here uses the admin client. The public /about form writes via
 * POST /api/contact (validated + rate-limited); the superadmin queue reads +
 * updates status. Mirrors teacherAccess/service.ts, which mirrors the
 * entitlements/quiz_leads service-role model.
 *
 * THE ROW IS THE DELIVERY. The email notification below is best-effort ON TOP
 * of a committed row, never instead of it — that is the whole point of this
 * feature. When it shipped, pyqvault.com had no MX record and a `mailto:`
 * bounced outright; an MX landed 2026-09-17, which changes the urgency and not
 * the ordering. A mailbox can always fill, move or filter; the row cannot.
 *
 * NOT marked "server-only": kept importable from a future tsx script the same
 * way src/lib/email/* is, and the secret is read at call time regardless.
 */
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/email/resend";
import { CONTACT_EMAIL } from "@/lib/brand";
import type { ContactMessageClean } from "@/lib/contact/validate";

export type ContactMessageStatus = "new" | "read" | "replied" | "spam";

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: ContactMessageStatus;
  createdAt: string;
};

type Row = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: ContactMessageStatus;
  created_at: string;
};

function toMessage(r: Row): ContactMessage {
  return {
    id: r.id,
    name: r.name,
    email: r.email,
    phone: r.phone,
    message: r.message,
    status: r.status,
    createdAt: r.created_at,
  };
}

/** Insert a validated message. Returns the new row id. Service-role. */
export async function createContactMessage(
  value: ContactMessageClean
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("contact_messages")
    .insert({
      name: value.name,
      email: value.email,
      phone: value.phone,
      message: value.message,
    })
    .select("id")
    .single();
  if (error) return { ok: false, error: error.message };
  return { ok: true, id: (data as { id: string }).id };
}

/** Newest-first triage list. Service-role. */
export async function listContactMessages(): Promise<ContactMessage[]> {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("contact_messages")
    .select("id, name, email, phone, message, status, created_at")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) throw new Error(`listContactMessages: ${error.message}`);
  return ((data ?? []) as Row[]).map(toMessage);
}

const STATUSES: ContactMessageStatus[] = ["new", "read", "replied", "spam"];

/** Update a message's triage status. Service-role. */
export async function setContactMessageStatus(
  id: string,
  status: ContactMessageStatus
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!STATUSES.includes(status)) return { ok: false, error: "Invalid status." };
  const admin = createSupabaseAdminClient();
  const { error } = await admin
    .from("contact_messages")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

/**
 * Build the ops-notification payload for a new contact message. PURE — the
 * recipient is resolved separately (env-dependent) so this stays unit-testable.
 * Every field here is user-controlled, so the HTML body is escaped.
 */
export function buildContactNotification(value: ContactMessageClean): {
  subject: string;
  text: string;
  html: string;
} {
  const lines = [
    `Name: ${value.name}`,
    `Email: ${value.email}`,
    value.phone ? `Phone: ${value.phone}` : null,
  ].filter(Boolean) as string[];
  const text =
    `New message from the /about contact form:\n\n${lines.join("\n")}\n\n` +
    `${value.message}\n\nTriage at /superadmin.`;
  const html =
    `<h2>New message from /about</h2><ul>` +
    lines.map((l) => `<li>${escapeHtml(l)}</li>`).join("") +
    `</ul><p style="white-space:pre-wrap">${escapeHtml(value.message)}</p>` +
    `<p>Triage at <strong>/superadmin</strong>.</p>`;
  return { subject: `PYQ Vault contact — ${value.name}`, text, html };
}

/**
 * Best-effort ops notification so a message is noticed quickly. Never throws
 * and never blocks the insert — the ROW is the durable record, this is only a
 * nudge. A failure is LOGGED (the same silent-catch bug bit teacher-access for
 * two real leads) and returned so Vercel's runtime logs can see it.
 *
 * Goes to the public contact address; override with CONTACT_NOTIFY_EMAIL. We
 * deliberately do NOT log the sender's PII — only the recipient + the error.
 */
export async function notifyNewContactMessage(
  value: ContactMessageClean
): Promise<{ ok: boolean; error?: string }> {
  const to = process.env.CONTACT_NOTIFY_EMAIL || CONTACT_EMAIL;
  const { subject, text, html } = buildContactNotification(value);
  try {
    const result = await sendEmail({ to, subject, text, html, replyTo: value.email });
    if (!result.ok) {
      console.error(`contact notification not sent (to ${to}): ${result.error}`);
      return { ok: false, error: result.error };
    }
    return { ok: true };
  } catch (e) {
    const error = (e as Error).message;
    console.error(`contact notification threw (to ${to}): ${error}`);
    return { ok: false, error };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
