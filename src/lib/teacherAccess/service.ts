/**
 * Teacher-access lead persistence + triage (service-role).
 *
 * teacher_access_requests (migration 0060) is RLS-locked to service-role, so
 * every read/write here uses the admin client. The public form writes via
 * POST /api/teacher-access (validated + rate-limited); the superadmin queue
 * reads + updates status. Mirrors the entitlements/quiz_leads service-role model.
 *
 * NOT marked "server-only": kept importable from a future tsx script the same
 * way src/lib/email/* is, and the secret is read at call time regardless.
 */
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/email/resend";
import { CONTACT_EMAIL } from "@/lib/brand";
import type { TeacherAccessClean } from "@/lib/teacherAccess/validate";

export type TeacherRequestStatus = "new" | "contacted" | "provisioned" | "declined";

export type TeacherRequest = {
  id: string;
  name: string;
  institute: string | null;
  email: string | null;
  mobile: string | null;
  city: string | null;
  message: string | null;
  status: TeacherRequestStatus;
  createdAt: string;
};

type Row = {
  id: string;
  name: string;
  institute: string | null;
  email: string | null;
  mobile: string | null;
  city: string | null;
  message: string | null;
  status: TeacherRequestStatus;
  created_at: string;
};

function toRequest(r: Row): TeacherRequest {
  return {
    id: r.id,
    name: r.name,
    institute: r.institute,
    email: r.email,
    mobile: r.mobile,
    city: r.city,
    message: r.message,
    status: r.status,
    createdAt: r.created_at,
  };
}

/** Insert a validated lead. Returns the new row id. Service-role. */
export async function createTeacherAccessRequest(
  value: TeacherAccessClean
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("teacher_access_requests")
    .insert({
      name: value.name,
      institute: value.institute,
      email: value.email,
      mobile: value.mobile,
      city: value.city,
      message: value.message,
      consent: value.consent,
    })
    .select("id")
    .single();
  if (error) return { ok: false, error: error.message };
  return { ok: true, id: data.id as string };
}

/**
 * The triage queue, newest-first. Paged in 1000-row windows so it stays correct
 * past the PostgREST cap as leads accumulate. Service-role (RLS-locked table).
 */
export async function listTeacherAccessRequests(): Promise<TeacherRequest[]> {
  const admin = createSupabaseAdminClient();
  const out: TeacherRequest[] = [];
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await admin
      .from("teacher_access_requests")
      .select("id, name, institute, email, mobile, city, message, status, created_at")
      .order("created_at", { ascending: false })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`listTeacherAccessRequests: ${error.message}`);
    const rows = (data ?? []) as Row[];
    out.push(...rows.map(toRequest));
    if (rows.length < PAGE) break;
  }
  return out;
}

const STATUSES: TeacherRequestStatus[] = ["new", "contacted", "provisioned", "declined"];

/** Update a lead's triage status. Service-role. */
export async function setTeacherAccessRequestStatus(
  id: string,
  status: TeacherRequestStatus
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!STATUSES.includes(status)) return { ok: false, error: "Invalid status." };
  const admin = createSupabaseAdminClient();
  const { error } = await admin
    .from("teacher_access_requests")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

/**
 * Best-effort ops notification so a lead never sits unseen. Never throws and
 * never blocks the insert — if email isn't configured (RESEND_API_KEY unset)
 * sendEmail just returns { ok: false } and we swallow it. Goes to the monitored
 * public inbox (override with TEACHER_REQUESTS_NOTIFY_EMAIL).
 */
export async function notifyNewTeacherRequest(value: TeacherAccessClean): Promise<void> {
  const to = process.env.TEACHER_REQUESTS_NOTIFY_EMAIL || CONTACT_EMAIL;
  const lines = [
    `Name: ${value.name}`,
    value.institute ? `Institute: ${value.institute}` : null,
    value.email ? `Email: ${value.email}` : null,
    value.mobile ? `Mobile: ${value.mobile}` : null,
    value.city ? `City: ${value.city}` : null,
    value.message ? `Message: ${value.message}` : null,
  ].filter(Boolean) as string[];
  const text = `New teacher access request:\n\n${lines.join("\n")}\n\nTriage at /superadmin.`;
  const html =
    `<h2>New teacher access request</h2><ul>` +
    lines.map((l) => `<li>${escapeHtml(l)}</li>`).join("") +
    `</ul><p>Triage at <strong>/superadmin</strong>.</p>`;
  try {
    await sendEmail({ to, subject: `Teacher access request — ${value.name}`, text, html });
  } catch {
    // swallow — notification is best-effort
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
