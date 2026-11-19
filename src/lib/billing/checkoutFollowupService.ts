/**
 * The reads (and, on --apply, the parent links) behind the owner's 6 pm
 * checkout follow-up. Rules are pure in ./checkoutFollowup; this file reads,
 * service role, for scripts/billing/checkout-followup.ts only.
 *
 * Volume: about 3 students a day leave a checkout, so the per-student reads
 * (account, profile, exam) stay a handful of round trips.
 *
 * Not "server-only": the tsx runner imports it (the grader.ts precedent). It
 * takes a service-role client and nothing in src/app imports it.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Entitlement, EntitlementSource, EntitlementStatus } from "@/lib/entitlements/access";
import { accountNameOf } from "@/lib/ebooks/coverName";
import {
  buildFollowupEmail,
  followupCandidates,
  followupFirstName,
  followupMessage,
  followupReadSince,
  followupWindow,
  keepUnpaid,
  type FollowupEvent,
  type FollowupRow,
} from "./checkoutFollowup";
import { findOrCreateParentLink } from "./parentLinkStore";
import { parentFirstName, parentPayUrl } from "./parentLink";
import { studentExamName } from "./parentPayService";
import { formatPrice } from "./plans";
import { listActivePlans } from "./plansQuery";

const PAGE = 1000;
/** `.in()` puts the ids in the URL; a few hundred uuids overflow it. */
const IN_CHUNK = 200;

async function loadEvents(admin: SupabaseClient, since: Date): Promise<FollowupEvent[]> {
  const out: FollowupEvent[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await admin
      .from("user_activity")
      .select("user_id, created_at, metadata, ref_id")
      .eq("kind", "paywall_event")
      .in("metadata->>step", ["checkout_opened", "declined"])
      .gte("created_at", since.toISOString())
      .order("created_at", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`checkout follow-up events: ${error.message}`);
    const rows = (data ?? []) as { user_id: string; created_at: string; metadata: Record<string, unknown> | null; ref_id: string | null }[];
    for (const r of rows) {
      const m = r.metadata ?? {};
      out.push({
        userId: r.user_id,
        at: new Date(r.created_at),
        step: typeof m.step === "string" ? m.step : "",
        gate: typeof m.gate === "string" ? m.gate : "",
        planId: typeof r.ref_id === "string" ? r.ref_id : null,
        country: typeof m.country === "string" ? m.country : null,
        reason: typeof m.reason === "string" ? m.reason : null,
      });
    }
    if (rows.length < PAGE) break;
  }
  return out;
}

async function loadStaff(admin: SupabaseClient): Promise<Set<string>> {
  const [members, admins] = await Promise.all([
    admin.from("org_members").select("user_id"),
    admin.from("platform_admins").select("user_id"),
  ]);
  if (members.error) throw new Error(`checkout follow-up org_members: ${members.error.message}`);
  if (admins.error) throw new Error(`checkout follow-up platform_admins: ${admins.error.message}`);
  return new Set([...(members.data ?? []), ...(admins.data ?? [])].map((r) => r.user_id as string));
}

async function loadGrants(admin: SupabaseClient, userIds: readonly string[]): Promise<Map<string, Entitlement[]>> {
  const out = new Map<string, Entitlement[]>();
  for (let i = 0; i < userIds.length; i += IN_CHUNK) {
    const { data, error } = await admin
      .from("entitlements")
      .select("id, user_id, scope, source, status, granted_at, expires_at, provider_ref, note, granted_by")
      .in("user_id", userIds.slice(i, i + IN_CHUNK));
    if (error) throw new Error(`checkout follow-up entitlements: ${error.message}`);
    for (const r of data ?? []) {
      const g: Entitlement = {
        id: r.id as string,
        userId: r.user_id as string,
        scope: r.scope as string,
        source: r.source as EntitlementSource,
        status: r.status as EntitlementStatus,
        grantedAt: r.granted_at as string,
        expiresAt: (r.expires_at as string | null) ?? null,
        providerRef: (r.provider_ref as string | null) ?? null,
        note: (r.note as string | null) ?? null,
        grantedBy: (r.granted_by as string | null) ?? null,
      };
      out.set(g.userId, [...(out.get(g.userId) ?? []), g]);
    }
  }
  return out;
}

async function loadMobiles(admin: SupabaseClient, userIds: readonly string[]): Promise<Map<string, string>> {
  const out = new Map<string, string>();
  for (let i = 0; i < userIds.length; i += IN_CHUNK) {
    const { data, error } = await admin.from("student_profiles").select("user_id, mobile").in("user_id", userIds.slice(i, i + IN_CHUNK));
    if (error) throw new Error(`checkout follow-up student_profiles: ${error.message}`);
    for (const r of data ?? []) if (typeof r.mobile === "string" && r.mobile) out.set(r.user_id as string, r.mobile);
  }
  return out;
}

/** Shown in a dry run, where no parent link is made. */
export const PARENT_LINK_PLACEHOLDER = "(parent link made when the email is sent)";

/**
 * Today's rows, oldest leaver first. With `makeParentLinks` (the --apply run
 * only) each student gets their parent pay link for the pass, made exactly as
 * their own "Ask a parent" tap would; otherwise the message shows a placeholder
 * and nothing is written.
 */
export async function buildFollowupRows(
  admin: SupabaseClient,
  now: Date,
  opts: { makeParentLinks: boolean }
): Promise<FollowupRow[]> {
  const [events, staff, plans] = await Promise.all([loadEvents(admin, followupReadSince(now)), loadStaff(admin), listActivePlans(admin)]);
  const candidates = followupCandidates(events, followupWindow(now), staff);
  if (candidates.length === 0) return [];
  const ids = candidates.map((c) => c.userId);
  const [grants, mobiles] = await Promise.all([loadGrants(admin, ids), loadMobiles(admin, ids)]);
  const kept = keepUnpaid(candidates, grants, plans, now);

  const rows: FollowupRow[] = [];
  for (const c of kept) {
    const [{ data: u }, examName] = await Promise.all([admin.auth.admin.getUserById(c.userId), studentExamName(admin, c.userId)]);
    const meta = (u?.user?.user_metadata ?? null) as Record<string, unknown> | null;
    const name = accountNameOf(meta);
    const preferred = typeof meta?.preferred_name === "string" ? meta.preferred_name : null;
    const email = u?.user?.email ?? null;
    const parentUrl = opts.makeParentLinks
      ? parentPayUrl(
          (
            await findOrCreateParentLink(admin, {
              userId: c.userId,
              planId: c.plan.id,
              studentName: parentFirstName(preferred, name),
              nowMs: now.getTime(),
            })
          ).code
        )
      : PARENT_LINK_PLACEHOLDER;
    const price = formatPrice(c.plan.amountPaise, c.plan.currency);
    rows.push({
      name: preferred?.trim() || name?.trim() || email || "(no name)",
      email,
      mobile: mobiles.get(c.userId) ?? null,
      examName,
      planLabel: c.plan.label,
      price,
      leftAt: c.lastOpenedAt,
      gate: c.gate,
      reason: c.reason,
      message: followupMessage({ firstName: followupFirstName(preferred, name), examName, planLabel: c.plan.label, price, parentUrl }),
    });
  }
  return rows;
}

export { buildFollowupEmail };
