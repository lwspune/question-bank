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
import { readAllPages } from "@/lib/supabase/readAllPages";
import { readInChunks } from "@/lib/supabase/readInChunks";

type EventRow = { user_id: string; created_at: string; metadata: Record<string, unknown> | null; ref_id: string | null };

async function loadEvents(admin: SupabaseClient, since: Date): Promise<FollowupEvent[]> {
  const rows = await readAllPages<EventRow>((from, to) =>
    admin
      .from("user_activity")
      .select("user_id, created_at, metadata, ref_id")
      .eq("kind", "paywall_event")
      .in("metadata->>step", ["checkout_opened", "declined"])
      .gte("created_at", since.toISOString())
      .order("id")
      .range(from, to)
  );
  return rows.map((r) => {
    const m = r.metadata ?? {};
    return {
      userId: r.user_id,
      at: new Date(r.created_at),
      step: typeof m.step === "string" ? m.step : "",
      gate: typeof m.gate === "string" ? m.gate : "",
      planId: typeof r.ref_id === "string" ? r.ref_id : null,
      country: typeof m.country === "string" ? m.country : null,
      reason: typeof m.reason === "string" ? m.reason : null,
    };
  });
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

type GrantRow = {
  id: string;
  user_id: string;
  scope: string;
  source: string;
  status: string;
  granted_at: string;
  expires_at: string | null;
  provider_ref: string | null;
  note: string | null;
  granted_by: string | null;
};

async function loadGrants(admin: SupabaseClient, userIds: readonly string[]): Promise<Map<string, Entitlement[]>> {
  const rows = await readInChunks<GrantRow>(userIds, (ids, from, to) =>
    admin
      .from("entitlements")
      .select("id, user_id, scope, source, status, granted_at, expires_at, provider_ref, note, granted_by")
      .in("user_id", ids)
      .order("id")
      .range(from, to)
  );
  const out = new Map<string, Entitlement[]>();
  for (const r of rows) {
    const g: Entitlement = {
      id: r.id,
      userId: r.user_id,
      scope: r.scope,
      source: r.source as EntitlementSource,
      status: r.status as EntitlementStatus,
      grantedAt: r.granted_at,
      expiresAt: r.expires_at ?? null,
      providerRef: r.provider_ref ?? null,
      note: r.note ?? null,
      grantedBy: r.granted_by ?? null,
    };
    out.set(g.userId, [...(out.get(g.userId) ?? []), g]);
  }
  return out;
}

async function loadMobiles(admin: SupabaseClient, userIds: readonly string[]): Promise<Map<string, string>> {
  const rows = await readInChunks<{ user_id: string; mobile: string | null }>(userIds, (ids, from, to) =>
    admin.from("student_profiles").select("user_id, mobile").in("user_id", ids).order("user_id").range(from, to)
  );
  const out = new Map<string, string>();
  for (const r of rows) if (typeof r.mobile === "string" && r.mobile) out.set(r.user_id, r.mobile);
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
