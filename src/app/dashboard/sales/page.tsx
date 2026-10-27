import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionSuperadmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import AppHeader from "@/components/AppHeader";
import { formatRupees } from "@/lib/billing/plans";
import { loadSalesByPeriod } from "@/lib/sales/query";
import {
  PERIODS_SHOWN,
  SALES_GRAINS,
  cardsSince,
  fillPeriods,
  istDate,
  parseGrain,
  salesSince,
  summaryCards,
  sumRows,
  type SalesGrain,
  type SalesTotals,
} from "@/lib/sales/summary";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const GRAIN_LABEL: Record<SalesGrain, string> = { day: "Daily", week: "Weekly", month: "Monthly" };

/** "Tue 28 Oct" · "Week of 26 Oct" · "Oct 2026". Periods are IST dates, so format them as UTC. */
function periodLabel(period: string, grain: SalesGrain): string {
  const d = new Date(`${period}T00:00:00Z`);
  const fmt = (o: Intl.DateTimeFormatOptions) => d.toLocaleDateString("en-IN", { timeZone: "UTC", ...o });
  if (grain === "month") return fmt({ month: "short", year: "numeric" });
  if (grain === "week") return `Week of ${fmt({ day: "numeric", month: "short" })}`;
  return fmt({ weekday: "short", day: "numeric", month: "short" });
}

function counts(t: SalesTotals): string {
  const parts = [`${t.passesSold} ${t.passesSold === 1 ? "pass" : "passes"}`, `${t.booksSold} ${t.booksSold === 1 ? "book" : "books"}`];
  if (t.refunded > 0) parts.push(`${t.refunded} refunded`);
  return parts.join(" · ");
}

/**
 * /dashboard/sales: passes and books sold, and the money kept, per day, week
 * or month (2026-10-28). Platform-wide money, so superadmin only, like
 * /dashboard/pricing. Numbers come from public.sales_by_period (0196).
 */
export default async function SalesPage({ searchParams }: { searchParams?: { view?: string } }) {
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const grain = parseGrain(searchParams?.view);
  const today = istDate(new Date());
  const shown = PERIODS_SHOWN[grain];
  const admin = createSupabaseAdminClient();

  let loaded;
  try {
    loaded = await Promise.all([
      loadSalesByPeriod(admin, grain, salesSince(grain, today, shown)),
      loadSalesByPeriod(admin, "day", cardsSince(today)),
      loadSalesByPeriod(admin, "month", null),
    ]);
  } catch (err) {
    console.error("dashboard/sales:", err);
    loaded = null;
  }

  const rows = loaded ? fillPeriods(loaded[0], grain, today, shown) : [];
  const cards = loaded ? summaryCards(loaded[1], today) : [];
  const allTime = loaded ? sumRows(loaded[2]) : null;
  const windowTotal = sumRows(rows);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Sales</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Passes and books sold, and the money kept after refunds. Days are Indian time.
          </p>
        </header>

        {!loaded ? (
          <p role="alert" className="rounded-lg border border-destructive/40 p-4 text-sm text-destructive">
            Could not load sales. Reload the page; if it keeps failing, the server log says why.
          </p>
        ) : (
          <>
            <section aria-label="Summary" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {cards.map((c) => (
                <div key={c.label} className="rounded-lg border bg-card p-4">
                  <p className="text-xs font-medium text-muted-foreground">{c.label}</p>
                  <p className="mt-1 text-2xl font-semibold tabular-nums">{formatRupees(c.current.paise)}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{counts(c.current)}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {c.previousLabel}: <span className="tabular-nums">{formatRupees(c.previous.paise)}</span> (
                    {c.previous.passesSold + c.previous.booksSold} sold)
                  </p>
                </div>
              ))}
              {allTime && (
                <div className="rounded-lg border bg-card p-4">
                  <p className="text-xs font-medium text-muted-foreground">All time</p>
                  <p className="mt-1 text-2xl font-semibold tabular-nums">{formatRupees(allTime.paise)}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{counts(allTime)}</p>
                </div>
              )}
            </section>

            <section className="space-y-3 rounded-lg border bg-card p-4">
              <nav aria-label="Group sales by" className="flex flex-wrap gap-2">
                {SALES_GRAINS.map((g) => (
                  <Link
                    key={g}
                    href={g === "day" ? "/dashboard/sales" : `/dashboard/sales?view=${g}`}
                    prefetch={false}
                    aria-current={g === grain ? "page" : undefined}
                    className={cn(
                      "rounded-md border px-3 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      g === grain ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"
                    )}
                  >
                    {GRAIN_LABEL[g]}
                  </Link>
                ))}
              </nav>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[34rem] text-sm">
                  <caption className="sr-only">
                    {GRAIN_LABEL[grain]} sales, the last {shown} {grain === "day" ? "days" : `${grain}s`}, newest first
                  </caption>
                  <thead>
                    <tr className="border-b text-left text-xs text-muted-foreground">
                      <th scope="col" className="py-1.5 pr-3 font-medium">
                        {grain === "day" ? "Day" : grain === "week" ? "Week" : "Month"}
                      </th>
                      <th scope="col" className="py-1.5 pr-3 text-right font-medium">Passes</th>
                      <th scope="col" className="py-1.5 pr-3 text-right font-medium">Pass ₹</th>
                      <th scope="col" className="py-1.5 pr-3 text-right font-medium">Books</th>
                      <th scope="col" className="py-1.5 pr-3 text-right font-medium">Book ₹</th>
                      <th scope="col" className="py-1.5 pr-3 text-right font-medium">Total ₹</th>
                      <th scope="col" className="py-1.5 text-right font-medium">Refunds</th>
                    </tr>
                  </thead>
                  <tbody className="tabular-nums">
                    {rows.map((r) => {
                      const empty = r.passesSold + r.booksSold === 0;
                      return (
                        <tr key={r.period} className={cn("border-b last:border-0", empty && "text-muted-foreground")}>
                          <th scope="row" className="py-1.5 pr-3 text-left font-normal">
                            {periodLabel(r.period, grain)}
                          </th>
                          <td className="py-1.5 pr-3 text-right">{r.passesSold}</td>
                          <td className="py-1.5 pr-3 text-right">{formatRupees(r.passPaise)}</td>
                          <td className="py-1.5 pr-3 text-right">{r.booksSold}</td>
                          <td className="py-1.5 pr-3 text-right">{formatRupees(r.bookPaise)}</td>
                          <td className="py-1.5 pr-3 text-right font-medium">{formatRupees(r.passPaise + r.bookPaise)}</td>
                          <td className="py-1.5 text-right">{r.passesRefunded + r.booksRefunded}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="tabular-nums">
                    <tr className="border-t font-medium">
                      <th scope="row" className="py-1.5 pr-3 text-left">Total</th>
                      <td className="py-1.5 pr-3 text-right">{windowTotal.passesSold}</td>
                      <td className="py-1.5 pr-3 text-right">{formatRupees(rows.reduce((s, r) => s + r.passPaise, 0))}</td>
                      <td className="py-1.5 pr-3 text-right">{windowTotal.booksSold}</td>
                      <td className="py-1.5 pr-3 text-right">{formatRupees(rows.reduce((s, r) => s + r.bookPaise, 0))}</td>
                      <td className="py-1.5 pr-3 text-right">{formatRupees(windowTotal.paise)}</td>
                      <td className="py-1.5 text-right">{windowTotal.refunded}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <p className="text-xs text-muted-foreground">
                A refunded sale counts in Passes or Books and in Refunds, and its money is not in the totals. Every
                paid sale counts, staff included, so the totals match Razorpay. Who bought and per-book detail:{" "}
                <Link href="/dashboard/entitlements" className="underline underline-offset-2">Access</Link> and the
                store section of <Link href="/dashboard/growth" className="underline underline-offset-2">Growth</Link>.
              </p>
            </section>
          </>
        )}
      </main>
    </>
  );
}
