/**
 * Reads public.sales_by_period and sales_funnel_students (migrations 0197, 0199, 0200) for
 * /dashboard/sales, and the students' "why I didn't buy" answers (2026-11-05).
 * Service-role only: the page checks for a superadmin first.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { istDate, type DayWindow, type FunnelStudents, type SalesGrain, type SalesPeriodRow } from "./summary";
import { PAYWALL_GATES, type PaywallGate } from "@/lib/activity/clientEvents";
import { isDeclineReason, withoutSameDayBuyers, type DeclineRow, type PassPurchaseDay } from "@/lib/billing/declineReasons";
import { EXAM_REGISTRY, type ExamTier } from "@/lib/exam/examContext";
import { resolveStudentTier } from "@/lib/exam/examFeed";
import { isStage, sanitizeTargetExams } from "@/lib/profile/onboarding";
import { summariseParentLinks, type ParentLinkSummary } from "@/lib/billing/parentLink";

type Row = {
  period: string;
  paywall_students: number;
  checkout_students: number;
  pass_orders: number;
  passes_sold: number;
  passes_refunded: number;
  pass_paise: number | string;
  book_orders: number;
  books_sold: number;
  books_refunded: number;
  book_paise: number | string;
  pass_usd_cents: number | string | null;
  practice_sold: number | null;
};

/** Sales per period from the IST day `since` (null = from the first sale), oldest first. */
export async function loadSalesByPeriod(
  admin: SupabaseClient,
  grain: SalesGrain,
  since: string | null
): Promise<SalesPeriodRow[]> {
  const { data, error } = await admin.rpc("sales_by_period", {
    p_grain: grain,
    p_since: since ? `${since}T00:00:00+05:30` : null,
  });
  if (error) throw new Error(`sales_by_period(${grain}): ${error.message}`);
  return ((data ?? []) as Row[]).map((r) => ({
    period: r.period,
    paywallStudents: r.paywall_students,
    checkoutStudents: r.checkout_students,
    passOrders: r.pass_orders,
    passesSold: r.passes_sold,
    passesRefunded: r.passes_refunded,
    passPaise: Number(r.pass_paise),
    bookOrders: r.book_orders,
    booksSold: r.books_sold,
    booksRefunded: r.books_refunded,
    bookPaise: Number(r.book_paise),
    passUsdCents: Number(r.pass_usd_cents ?? 0),
    practiceSold: r.practice_sold ?? 0,
  }));
}

const PAGE = 1000;
/** `.in()` puts the ids in the URL; a few hundred uuids overflow it. */
const IN_CHUNK = 200;

/**
 * Every "Not buying today? Tell us why" answer from the IST day `since`
 * (2026-11-05), staff left out, each with the student's tier from their
 * profile (stated stage first, else their target exams). An answer from a
 * student who bought a pass the same IST day is left out: they did buy.
 */
export async function loadDeclines(admin: SupabaseClient, since: string): Promise<DeclineRow[]> {
  const [members, admins] = await Promise.all([
    admin.from("org_members").select("user_id"),
    admin.from("platform_admins").select("user_id"),
  ]);
  if (members.error) throw new Error(`loadDeclines org_members: ${members.error.message}`);
  if (admins.error) throw new Error(`loadDeclines platform_admins: ${admins.error.message}`);
  const staff = new Set([...(members.data ?? []), ...(admins.data ?? [])].map((r) => r.user_id as string));

  const events: { user_id: string; metadata: Record<string, unknown> | null; created_at: string }[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await admin
      .from("user_activity")
      .select("user_id, metadata, created_at")
      .eq("kind", "paywall_event")
      .eq("metadata->>step", "declined")
      .gte("created_at", `${since}T00:00:00+05:30`)
      .order("created_at", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`loadDeclines user_activity: ${error.message}`);
    const rows = (data ?? []) as typeof events;
    events.push(...rows.filter((r) => !staff.has(r.user_id)));
    if (rows.length < PAGE) break;
  }

  const ids = [...new Set(events.map((e) => e.user_id))];
  const tierById = new Map<string, ExamTier | null>();
  for (let i = 0; i < ids.length; i += IN_CHUNK) {
    const chunk = ids.slice(i, i + IN_CHUNK);
    const { data, error } = await admin.from("student_profiles").select("user_id, stage, target_exams").in("user_id", chunk);
    if (error) throw new Error(`loadDeclines student_profiles: ${error.message}`);
    for (const p of (data ?? []) as { user_id: string; stage: unknown; target_exams: unknown }[]) {
      tierById.set(
        p.user_id,
        resolveStudentTier(
          { stage: isStage(p.stage) ? p.stage : null, targetExams: sanitizeTargetExams(p.target_exams) },
          EXAM_REGISTRY
        )
      );
    }
  }

  const out: DeclineRow[] = [];
  for (const e of events) {
    const m = e.metadata ?? {};
    const gate = m.gate;
    if (!isDeclineReason(m.reason) || typeof gate !== "string" || !(PAYWALL_GATES as readonly string[]).includes(gate)) {
      continue;
    }
    out.push({
      userId: e.user_id,
      reason: m.reason,
      gate: gate as PaywallGate,
      afterCheckout: m.afterCheckout === true,
      tier: tierById.get(e.user_id) ?? null,
      day: istDate(new Date(e.created_at)),
      onClose: m.onClose === true,
    });
  }

  const purchases: PassPurchaseDay[] = [];
  for (let i = 0; i < ids.length; i += IN_CHUNK) {
    const chunk = ids.slice(i, i + IN_CHUNK);
    const { data, error } = await admin
      .from("entitlements")
      .select("user_id, granted_at")
      .eq("source", "razorpay")
      .gte("granted_at", `${since}T00:00:00+05:30`)
      .in("user_id", chunk);
    if (error) throw new Error(`loadDeclines entitlements: ${error.message}`);
    for (const g of (data ?? []) as { user_id: string; granted_at: string }[]) {
      purchases.push({ userId: g.user_id, day: istDate(new Date(g.granted_at)) });
    }
  }
  return withoutSameDayBuyers(out, purchases);
}

/** Distinct students who met a paywall, and who started a pass checkout, over `window`. */
export async function loadFunnelStudents(admin: SupabaseClient, window: DayWindow): Promise<FunnelStudents> {
  const { data, error } = await admin.rpc("sales_funnel_students", { p_from: window.from, p_to: window.to });
  if (error) throw new Error(`sales_funnel_students(${window.from}..${window.to}): ${error.message}`);
  const row = ((data ?? []) as { paywall_students: number; checkout_students: number }[])[0];
  return { paywallStudents: row?.paywall_students ?? 0, checkoutStudents: row?.checkout_students ?? 0 };
}

/**
 * "Ask a parent to pay" from the IST day `since` (2026-11-09, migration 0244):
 * the funnel events (written under the student's id) and the passes a parent
 * paid (entitlement note `parent_link:<code>`, refunds left out).
 */
export async function loadParentLinks(admin: SupabaseClient, since: string): Promise<ParentLinkSummary> {
  const from = `${since}T00:00:00+05:30`;
  const events: { userId: string; step: string }[] = [];
  for (let offset = 0; ; offset += PAGE) {
    const { data, error } = await admin
      .from("user_activity")
      .select("user_id, metadata->>step")
      .eq("kind", "paywall_event")
      .in("metadata->>step", ["parent_link_created", "parent_link_opened", "parent_checkout_opened"])
      .gte("created_at", from)
      .order("created_at", { ascending: true })
      .range(offset, offset + PAGE - 1);
    if (error) throw new Error(`loadParentLinks user_activity: ${error.message}`);
    const rows = (data ?? []) as unknown as { user_id: string; step: string }[];
    events.push(...rows.map((r) => ({ userId: r.user_id, step: r.step })));
    if (rows.length < PAGE) break;
  }
  const { data: paid, error } = await admin
    .from("entitlements")
    .select("amount_paise")
    .eq("source", "razorpay")
    .eq("status", "active")
    .like("note", "parent_link:%")
    .gte("granted_at", from);
  if (error) throw new Error(`loadParentLinks entitlements: ${error.message}`);
  return summariseParentLinks(
    events,
    ((paid ?? []) as { amount_paise: number | null }[]).map((p) => ({ amountPaise: p.amount_paise ?? 0 }))
  );
}
