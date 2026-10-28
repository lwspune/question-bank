/**
 * Reads public.sales_by_period and sales_funnel_students (migrations 0197, 0199, 0200) for
 * /dashboard/sales.
 * Service-role only: the page checks for a superadmin first.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { DayWindow, FunnelStudents, SalesGrain, SalesPeriodRow } from "./summary";

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
  }));
}

/** Distinct students who met a paywall, and who started a pass checkout, over `window`. */
export async function loadFunnelStudents(admin: SupabaseClient, window: DayWindow): Promise<FunnelStudents> {
  const { data, error } = await admin.rpc("sales_funnel_students", { p_from: window.from, p_to: window.to });
  if (error) throw new Error(`sales_funnel_students(${window.from}..${window.to}): ${error.message}`);
  const row = ((data ?? []) as { paywall_students: number; checkout_students: number }[])[0];
  return { paywallStudents: row?.paywall_students ?? 0, checkoutStudents: row?.checkout_students ?? 0 };
}
