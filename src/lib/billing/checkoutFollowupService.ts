/**
 * The reads (and, on --apply, the parent links) behind the owner's 6 pm
 * checkout follow-up. Rules are pure in ./checkoutFollowup; this file reads,
 * service role, for scripts/billing/checkout-followup.ts only.
 *
 * Volume: about 3 students a day leave a checkout, so the per-student reads
 * (account, profile, exam) stay a handful of round trips.
 *
 * Failed payments come from Razorpay itself (2026-11-26): the day's payments,
 * read with the server keys. A Razorpay outage or missing keys leaves the list
 * without the failure line, never without the list.
 *
 * Not "server-only": the tsx runner imports it (the grader.ts precedent). It
 * takes a service-role client and nothing in src/app imports it.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Entitlement, EntitlementSource, EntitlementStatus } from "@/lib/entitlements/access";
import { accountNameOf } from "@/lib/ebooks/coverName";
import {
  bookFollowupCandidates,
  buildFollowupEmail,
  followupCandidates,
  followupFirstName,
  followupMessage,
  followupReadSince,
  followupWindow,
  keepUnpaid,
  keepUnpaidBooks,
  type FollowupEvent,
  type FollowupFailure,
  type FollowupRow,
} from "./checkoutFollowup";
import { latestFailureByUser, type PaymentFailure } from "./paymentFailure";
import { listPayments } from "./razorpay";
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
      .in("metadata->>step", ["checkout_opened", "book_checkout_opened", "declined"])
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

/** Ebooks on sale, by slug: what checkout would sell. */
async function loadBooks(admin: SupabaseClient): Promise<Map<string, { title: string; pricePaise: number }>> {
  const rows = await readAllPages<{ slug: string; title: string; price_paise: number }>((from, to) =>
    admin.from("ebooks").select("slug, title, price_paise").eq("active", true).order("slug").range(from, to)
  );
  return new Map(rows.map((r) => [r.slug, { title: r.title, pricePaise: r.price_paise }]));
}

/** The books each student owns (active purchases). */
async function loadOwnedBooks(admin: SupabaseClient, userIds: readonly string[]): Promise<Map<string, Set<string>>> {
  const rows = await readInChunks<{ user_id: string; ebook_slug: string }>(userIds, (ids, from, to) =>
    admin
      .from("ebook_purchases")
      .select("user_id, ebook_slug")
      .in("user_id", ids)
      .eq("status", "active")
      .order("id")
      .range(from, to)
  );
  const out = new Map<string, Set<string>>();
  for (const r of rows) out.set(r.user_id, new Set([...(out.get(r.user_id) ?? []), r.ebook_slug]));
  return out;
}

/** Each student's latest failed payment from the window's start to now, or none when Razorpay can't be read. */
async function loadFailures(window: { from: Date }, now: Date): Promise<Map<string, PaymentFailure>> {
  const res = await listPayments(window.from.getTime() / 1000);
  if (!res.ok) {
    console.error(`checkout follow-up: Razorpay payments not read, listing without failures (${res.error})`);
    return new Map();
  }
  return latestFailureByUser(res.payments, { from: window.from, to: now });
}

/** The failure that belongs to this checkout: after they opened it, and for the same kind of order. */
function failureFor(
  failures: ReadonlyMap<string, PaymentFailure>,
  userId: string,
  openedAt: Date,
  matches: (f: PaymentFailure) => boolean
): FollowupFailure | null {
  const f = failures.get(userId);
  if (!f || f.at.getTime() < openedAt.getTime() || !matches(f)) return null;
  return { kind: f.kind, app: f.app };
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
  const window = followupWindow(now);
  const [events, staff, plans] = await Promise.all([loadEvents(admin, followupReadSince(now)), loadStaff(admin), listActivePlans(admin)]);
  const candidates = followupCandidates(events, window, staff);
  const bookCandidatesAll = bookFollowupCandidates(events, window, staff, new Set());
  if (candidates.length === 0 && bookCandidatesAll.length === 0) return [];
  const ids = [...new Set([...candidates.map((c) => c.userId), ...bookCandidatesAll.map((c) => c.userId)])];
  const [grants, mobiles, books, owned, failures] = await Promise.all([
    loadGrants(admin, ids),
    loadMobiles(admin, ids),
    loadBooks(admin),
    loadOwnedBooks(admin, bookCandidatesAll.map((c) => c.userId)),
    loadFailures(window, now),
  ]);
  const kept = keepUnpaid(candidates, grants, plans, now);
  // One message a person: a student still owing a pass is listed for the pass alone.
  const passUserIds = new Set(kept.map((c) => c.userId));
  const keptBooks = keepUnpaidBooks(
    bookFollowupCandidates(events, window, staff, passUserIds),
    owned,
    books,
    grants,
    now
  );

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
    const failure = failureFor(failures, c.userId, c.openedAt, (f) => f.planId !== null);
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
      failure,
      message: followupMessage({ firstName: followupFirstName(preferred, name), examName, planLabel: c.plan.label, price, parentUrl, failure }),
    });
  }

  // Ebooks (2026-11-26): no parent link (a parent's page sells passes only) and no exam in the message.
  for (const c of keptBooks) {
    const { data: u } = await admin.auth.admin.getUserById(c.userId);
    const meta = (u?.user?.user_metadata ?? null) as Record<string, unknown> | null;
    const name = accountNameOf(meta);
    const preferred = typeof meta?.preferred_name === "string" ? meta.preferred_name : null;
    const email = u?.user?.email ?? null;
    const price = formatPrice(c.amountPaise, "INR");
    const failure = failureFor(failures, c.userId, c.openedAt, (f) => f.ebookSlug === c.slug);
    rows.push({
      name: preferred?.trim() || name?.trim() || email || "(no name)",
      email,
      mobile: mobiles.get(c.userId) ?? null,
      examName: null,
      planLabel: c.title,
      price,
      leftAt: c.lastOpenedAt,
      gate: "store",
      reason: null,
      failure,
      message: followupMessage({ firstName: followupFirstName(preferred, name), examName: null, planLabel: c.title, price, parentUrl: null, failure }),
    });
  }
  return rows.sort((a, b) => a.leftAt.getTime() - b.leftAt.getTime());
}

export { buildFollowupEmail };
