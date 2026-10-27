/**
 * Reads public.sales_by_period (migration 0197) for /dashboard/sales.
 * Service-role only: the page checks for a superadmin first.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { SalesGrain, SalesPeriodRow } from "./summary";

type Row = {
  period: string;
  passes_sold: number;
  passes_refunded: number;
  pass_paise: number | string;
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
    passesSold: r.passes_sold,
    passesRefunded: r.passes_refunded,
    passPaise: Number(r.pass_paise),
    booksSold: r.books_sold,
    booksRefunded: r.books_refunded,
    bookPaise: Number(r.book_paise),
  }));
}
