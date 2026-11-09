/**
 * "Ask a parent to pay" (2026-11-09): the server reads and the student's email.
 * The rules live in the pure parentLink.ts; this module fetches and records.
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getExamBySlug } from "@/lib/exam/examContext";
import { sendEmail, type SendPayload, type SendResult } from "@/lib/email/resend";
import { PARENT_PAID_KIND, buildParentPaidEmail, parentPaidDedupeKey } from "./parentLink";

/**
 * The exam the message names: the student's chosen focus, else their only (or
 * first) chosen exam, else null ("my exams"). Read with the student's own
 * client (own-row RLS). Best effort: a failed read names no exam.
 */
export async function studentExamName(db: SupabaseClient, userId: string): Promise<string | null> {
  const { data, error } = await db
    .from("student_profiles")
    .select("target_exams, focus_exam")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) {
    console.error("parent link exam read failed", error.message);
    return null;
  }
  const targets = (data?.target_exams as string[] | null) ?? [];
  const focus = (data?.focus_exam as string | null) ?? null;
  const slug = focus && targets.includes(focus) ? focus : targets[0] ?? null;
  return getExamBySlug(slug)?.displayName ?? null;
}

export type ParentPaidEmailOutcome = "sent" | "failed" | "already_sent" | "no_address";

/**
 * Tell the student their pass is active. Called only by the grant that is NEW
 * (verify or the webhook, whichever lands first); the dedupe key on the
 * payment makes a second call answer "already_sent" anyway. Never throws: the
 * pass is already granted, and the email is a courtesy.
 */
export async function emailParentPaid(
  admin: SupabaseClient,
  input: { userId: string; paymentId: string; planLabel: string; length: string },
  deps: { send: (p: SendPayload) => Promise<SendResult> } = { send: sendEmail }
): Promise<ParentPaidEmailOutcome> {
  try {
    const key = parentPaidDedupeKey(input.paymentId);
    const { data: prior, error: priorErr } = await admin
      .from("email_sends")
      .select("id, status")
      .eq("dedupe_key", key)
      .maybeSingle();
    if (priorErr) throw new Error(priorErr.message);
    if (prior?.status === "sent") return "already_sent";

    const { data: u, error: userErr } = await admin.auth.admin.getUserById(input.userId);
    if (userErr) throw new Error(userErr.message);
    const to = u.user?.email;
    if (!to) return "no_address";
    const meta = (u.user?.user_metadata ?? {}) as { full_name?: string; name?: string; preferred_name?: string };
    const built = buildParentPaidEmail({
      name: (meta.preferred_name ?? meta.full_name ?? meta.name ?? "").trim(),
      planLabel: input.planLabel,
      length: input.length,
    });

    const outcome = await deps.send({ to, ...built });
    if (!outcome.ok) console.error("parent paid email failed", outcome.error);
    const row = {
      user_id: input.userId,
      kind: PARENT_PAID_KIND,
      to_email: to,
      subject: built.subject,
      ref_id: input.paymentId,
      ref_kind: "razorpay_payment",
      dedupe_key: key,
      status: outcome.ok ? "sent" : "failed",
      provider_id: outcome.ok ? outcome.providerId : null,
      error: outcome.ok ? null : outcome.error.slice(0, 1000),
    };
    const { error } = prior
      ? await admin.from("email_sends").update(row).eq("id", prior.id)
      : await admin.from("email_sends").insert(row);
    if (error) console.error("parent paid email record failed", error.message);
    return outcome.ok ? "sent" : "failed";
  } catch (err) {
    console.error("parent paid email error", err instanceof Error ? err.message : err);
    return "failed";
  }
}
