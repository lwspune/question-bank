import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionSuperadmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import AppHeader from "@/components/AppHeader";
import { formatPrice, formatRupees } from "@/lib/billing/plans";
import { loadDeclines, loadFunnelStudents, loadSalesByPeriod } from "@/lib/sales/query";
import {
  DECLINE_GROUPS,
  DECLINE_GROUP_LABELS,
  summariseDeclines,
  type DeclineSummary,
} from "@/lib/billing/declineReasons";
import {
  PERIODS_SHOWN,
  SALES_GRAINS,
  cardsSince,
  fillPeriods,
  istDate,
  paidShare,
  parseGrain,
  salesSince,
  summaryCards,
  sumRows,
  windowKey,
  type DayWindow,
  type FunnelStudents,
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
  // The Practice share of the passes (0212), so the two prices read apart.
  const practice = t.practiceSold > 0 ? ` (${t.practiceSold} Practice)` : "";
  const parts = [
    `${t.passesSold} ${t.passesSold === 1 ? "pass" : "passes"}${practice}`,
    `${t.booksSold} ${t.booksSold === 1 ? "book" : "books"}`,
  ];
  if (t.refunded > 0) parts.push(`${t.refunded} refunded`);
  return parts.join(" · ");
}

/** "35 met a paywall · 6 started checkout (7 orders)": the pass funnel's first two steps, in students. */
function funnelLine(f: FunnelStudents | undefined, t: SalesTotals): string {
  if (!f) return "";
  const books = t.bookOrders > 0 ? ` · ${t.bookOrders} book ${t.bookOrders === 1 ? "order" : "orders"}` : "";
  return `${f.paywallStudents} met a paywall · ${f.checkoutStudents} started checkout (${t.passOrders} ${
    t.passOrders === 1 ? "order" : "orders"
  })${books}`;
}

const percent = (n: number | null) => (n === null ? "–" : `${n}%`);

/** The day the "Tell us why" question went on the offers (IST). */
const DECLINES_SINCE = "2026-11-05";

/**
 * "Why students didn't buy": the one-tap answers under the answer-limit and
 * download-box offers (2026-11-05), by reason, student group and offer.
 */
function DeclinesCard({ summary }: { summary: DeclineSummary | null }) {
  return (
    <section aria-labelledby="declines-heading" className="space-y-3 rounded-lg border bg-card p-4">
      <div>
        <h2 id="declines-heading" className="text-base font-semibold">
          Why students didn&apos;t buy
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Answers to &ldquo;Not buying today? Tell us why&rdquo; under the answer-limit offer and the download boxes,
          since 5 Nov 2026. One answer per student per offer per day; staff left out.
        </p>
      </div>
      {!summary ? (
        <p role="alert" className="text-sm text-destructive">
          Could not load the answers. Reload the page; the server log says why.
        </p>
      ) : summary.answers === 0 ? (
        <p className="text-sm text-muted-foreground">No answers yet.</p>
      ) : (
        <>
          <p className="text-sm">
            {summary.answers} {summary.answers === 1 ? "answer" : "answers"} from {summary.students}{" "}
            {summary.students === 1 ? "student" : "students"}
            {summary.afterCheckout > 0 && `, ${summary.afterCheckout} after closing a checkout`}.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] text-sm">
              <caption className="sr-only">Reasons for not buying, by student group and by offer</caption>
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th scope="col" className="py-1.5 pr-3 font-medium">Reason</th>
                  <th scope="col" className="py-1.5 pr-3 text-right font-medium">All</th>
                  {DECLINE_GROUPS.map((g) => (
                    <th key={g} scope="col" className="py-1.5 pr-3 text-right font-medium">
                      {DECLINE_GROUP_LABELS[g]}
                    </th>
                  ))}
                  <th scope="col" className="py-1.5 pr-3 text-right font-medium">Answer limit</th>
                  <th scope="col" className="py-1.5 text-right font-medium">Downloads</th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {summary.reasons.map((r) => (
                  <tr key={r.reason} className={cn("border-b last:border-0", r.total === 0 && "text-muted-foreground")}>
                    <th scope="row" className="py-1.5 pr-3 text-left font-normal">
                      {r.label}
                    </th>
                    <td className="py-1.5 pr-3 text-right font-medium">{r.total}</td>
                    {DECLINE_GROUPS.map((g) => (
                      <td key={g} className="py-1.5 pr-3 text-right">
                        {r.byGroup[g]}
                      </td>
                    ))}
                    <td className="py-1.5 pr-3 text-right">{r.byOffer.answers}</td>
                    <td className="py-1.5 text-right">{r.byOffer.downloads}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="tabular-nums">
                <tr className="border-t font-medium">
                  <th scope="row" className="py-1.5 pr-3 text-left">Total</th>
                  <td className="py-1.5 pr-3 text-right">{summary.answers}</td>
                  {DECLINE_GROUPS.map((g) => (
                    <td key={g} className="py-1.5 pr-3 text-right">
                      {summary.groups[g]}
                    </td>
                  ))}
                  <td className="py-1.5 pr-3 text-right">
                    {summary.reasons.reduce((s, r) => s + r.byOffer.answers, 0)}
                  </td>
                  <td className="py-1.5 text-right">{summary.reasons.reduce((s, r) => s + r.byOffer.downloads, 0)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">
            Group comes from the student&apos;s profile: their stated stage, else the exams they chose. Class 9-12
            takes school and Class 11-12 exams; Not known means no stage and no exam on the profile. &ldquo;Payment
            didn&apos;t work&rdquo; is offered only after a student closes the Razorpay checkout.
          </p>
        </>
      )}
    </section>
  );
}

/**
 * /dashboard/sales: passes and books sold, and the money kept, per day, week
 * or month (2026-10-28). Platform-wide money, so superadmin only, like
 * /dashboard/pricing. Numbers come from public.sales_by_period (0197; orders
 * created on Razorpay since 0199; the pass funnel in students since 0200) and,
 * for distinct students over a card's days, public.sales_funnel_students.
 */
export default async function SalesPage(props: { searchParams?: Promise<{ view?: string }> }) {
  const searchParams = await props.searchParams;
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const grain = parseGrain(searchParams?.view);
  const today = istDate(new Date());
  const shown = PERIODS_SHOWN[grain];
  const admin = createSupabaseAdminClient();

  // Distinct students cannot be added up from rows, so each window asks the database itself.
  const tableWindow: DayWindow = { from: salesSince(grain, today, shown), to: today };
  const allTimeWindow: DayWindow = { from: null, to: today };
  const windows = [
    tableWindow,
    allTimeWindow,
    ...summaryCards([], today).flatMap((c) => [c.window, c.previousWindow]),
  ];

  let loaded;
  let funnel = new Map<string, FunnelStudents>();
  try {
    const [byPeriod, students] = await Promise.all([
      Promise.all([
        loadSalesByPeriod(admin, grain, tableWindow.from),
        loadSalesByPeriod(admin, "day", cardsSince(today)),
        loadSalesByPeriod(admin, "month", null),
      ]),
      Promise.all(windows.map(async (w) => [windowKey(w), await loadFunnelStudents(admin, w)] as const)),
    ]);
    loaded = byPeriod;
    funnel = new Map(students);
  } catch (err) {
    console.error("dashboard/sales:", err);
    loaded = null;
  }

  // Apart from the sales reads, so a failure here leaves the rest of the page.
  let declines: DeclineSummary | null = null;
  try {
    declines = summariseDeclines(await loadDeclines(admin, DECLINES_SINCE));
  } catch (err) {
    console.error("dashboard/sales declines:", err);
  }

  const rows = loaded ? fillPeriods(loaded[0], grain, today, shown) : [];
  const cards = loaded ? summaryCards(loaded[1], today) : [];
  const allTime = loaded ? sumRows(loaded[2]) : null;
  const windowTotal = sumRows(rows);
  const tableFunnel = funnel.get(windowKey(tableWindow)) ?? { paywallStudents: 0, checkoutStudents: 0 };

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Sales</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            The pass funnel (students who met a paywall, started a checkout, bought), books sold, and the money
            kept after refunds. Days are Indian time.
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
                  <p className="mt-1 text-xs text-muted-foreground">{funnelLine(funnel.get(windowKey(c.window)), c.current)}</p>
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
                  <p className="mt-1 text-xs text-muted-foreground">
                    {funnelLine(funnel.get(windowKey(allTimeWindow)), allTime)}
                  </p>
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
                <table className="w-full min-w-[54rem] text-sm">
                  <caption className="sr-only">
                    {GRAIN_LABEL[grain]} sales, the last {shown} {grain === "day" ? "days" : `${grain}s`}, newest first
                  </caption>
                  <thead>
                    <tr className="border-b text-left text-xs text-muted-foreground">
                      <th scope="col" className="py-1.5 pr-3 font-medium">
                        {grain === "day" ? "Day" : grain === "week" ? "Week" : "Month"}
                      </th>
                      <th scope="col" className="py-1.5 pr-3 text-right font-medium">Met paywall</th>
                      <th scope="col" className="py-1.5 pr-3 text-right font-medium">
                        Checkout <span className="font-normal">(orders)</span>
                      </th>
                      <th scope="col" className="py-1.5 pr-3 text-right font-medium">Passes</th>
                      <th scope="col" className="py-1.5 pr-3 text-right font-medium">
                        <span className="font-normal">of which</span> Practice
                      </th>
                      <th scope="col" className="py-1.5 pr-3 text-right font-medium">Paid</th>
                      <th scope="col" className="py-1.5 pr-3 text-right font-medium">Pass ₹</th>
                      <th scope="col" className="py-1.5 pr-3 text-right font-medium">Pass $</th>
                      <th scope="col" className="py-1.5 pr-3 text-right font-medium">Book orders</th>
                      <th scope="col" className="py-1.5 pr-3 text-right font-medium">Books</th>
                      <th scope="col" className="py-1.5 pr-3 text-right font-medium">Book ₹</th>
                      <th scope="col" className="py-1.5 pr-3 text-right font-medium">Total ₹</th>
                      <th scope="col" className="py-1.5 text-right font-medium">Refunds</th>
                    </tr>
                  </thead>
                  <tbody className="tabular-nums">
                    {rows.map((r) => {
                      const empty = r.passesSold + r.booksSold + r.passOrders + r.bookOrders + r.paywallStudents === 0;
                      return (
                        <tr key={r.period} className={cn("border-b last:border-0", empty && "text-muted-foreground")}>
                          <th scope="row" className="py-1.5 pr-3 text-left font-normal">
                            {periodLabel(r.period, grain)}
                          </th>
                          <td className="py-1.5 pr-3 text-right">{r.paywallStudents}</td>
                          <td className="py-1.5 pr-3 text-right">
                            {r.checkoutStudents} <span className="text-xs text-muted-foreground">({r.passOrders})</span>
                          </td>
                          <td className="py-1.5 pr-3 text-right">{r.passesSold}</td>
                          <td className="py-1.5 pr-3 text-right">{r.practiceSold}</td>
                          <td className="py-1.5 pr-3 text-right">{percent(paidShare(r.passesSold, r.checkoutStudents))}</td>
                          <td className="py-1.5 pr-3 text-right">{formatRupees(r.passPaise)}</td>
                          <td className="py-1.5 pr-3 text-right">{formatPrice(r.passUsdCents, "USD")}</td>
                          <td className="py-1.5 pr-3 text-right">{r.bookOrders}</td>
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
                      <td className="py-1.5 pr-3 text-right">{tableFunnel.paywallStudents}</td>
                      <td className="py-1.5 pr-3 text-right">
                        {tableFunnel.checkoutStudents}{" "}
                        <span className="text-xs font-normal text-muted-foreground">({windowTotal.passOrders})</span>
                      </td>
                      <td className="py-1.5 pr-3 text-right">{windowTotal.passesSold}</td>
                      <td className="py-1.5 pr-3 text-right">{windowTotal.practiceSold}</td>
                      <td className="py-1.5 pr-3 text-right">
                        {percent(paidShare(windowTotal.passesSold, tableFunnel.checkoutStudents))}
                      </td>
                      <td className="py-1.5 pr-3 text-right">{formatRupees(rows.reduce((s, r) => s + r.passPaise, 0))}</td>
                      <td className="py-1.5 pr-3 text-right">
                        {formatPrice(rows.reduce((s, r) => s + r.passUsdCents, 0), "USD")}
                      </td>
                      <td className="py-1.5 pr-3 text-right">{windowTotal.bookOrders}</td>
                      <td className="py-1.5 pr-3 text-right">{windowTotal.booksSold}</td>
                      <td className="py-1.5 pr-3 text-right">{formatRupees(rows.reduce((s, r) => s + r.bookPaise, 0))}</td>
                      <td className="py-1.5 pr-3 text-right">{formatRupees(windowTotal.paise)}</td>
                      <td className="py-1.5 text-right">{windowTotal.refunded}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <p className="text-xs text-muted-foreground">
                The pass funnel counts students. Met paywall: signed-in students shown any pass offer (the answer
                limit, a download box, the drill, mock and chapter-test limits, saves). Checkout: those who created a
                Razorpay order, with the orders in brackets. Paid: passes sold out of Checkout. A student counts once
                per row and once in each total. A checkout on one day and its payment on the next land on different
                days, so one day can show over 100%. Recorded from: download boxes 28 Sep, pass orders 4 Oct, the
                answer limit 7 Oct, book orders 28 Oct 2026. A refunded sale counts in Passes or Books and in Refunds, and its money
                is not in the totals. Every
                paid sale counts, staff included, so the totals match Razorpay. Who bought and per-book detail:{" "}
                <Link href="/dashboard/entitlements" className="underline underline-offset-2">Access</Link> and the
                store section of <Link href="/dashboard/growth" className="underline underline-offset-2">Growth</Link>.
              </p>
            </section>

            <DeclinesCard summary={declines} />
          </>
        )}
      </main>
    </>
  );
}
