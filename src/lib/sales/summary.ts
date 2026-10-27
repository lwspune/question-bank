/**
 * /dashboard/sales: turns public.sales_by_period's rows (migration 0196) into the
 * page's table and summary cards. Pure: dates are IST calendar days as
 * "YYYY-MM-DD" strings, done in UTC arithmetic so the server's own time zone
 * never shifts a day.
 */

export type SalesGrain = "day" | "week" | "month";
export const SALES_GRAINS: readonly SalesGrain[] = ["day", "week", "month"];

/** How many periods the table shows for each grain. */
export const PERIODS_SHOWN: Record<SalesGrain, number> = { day: 30, week: 12, month: 12 };

/** One period's sales. Money is what was kept: refunded sales count as sold and refunded, not in the money. */
export type SalesPeriodRow = {
  /** Start of the period, IST: the day, the week's Monday or the month's 1st. */
  period: string;
  passesSold: number;
  passesRefunded: number;
  passPaise: number;
  booksSold: number;
  booksRefunded: number;
  bookPaise: number;
};

export type SalesTotals = { passesSold: number; booksSold: number; refunded: number; paise: number };

export type SummaryCard = {
  label: string;
  current: SalesTotals;
  previousLabel: string;
  previous: SalesTotals;
};

const IST_OFFSET_MS = 330 * 60 * 1000;
const DAY_MS = 86_400_000;

export function parseGrain(value: string | undefined): SalesGrain {
  return SALES_GRAINS.includes(value as SalesGrain) ? (value as SalesGrain) : "day";
}

/** The IST calendar day `now` falls on. */
export function istDate(now: Date): string {
  return new Date(now.getTime() + IST_OFFSET_MS).toISOString().slice(0, 10);
}

const toMs = (date: string) => Date.parse(`${date}T00:00:00Z`);
const fromMs = (ms: number) => new Date(ms).toISOString().slice(0, 10);

/** The start of the period `date` falls in: itself, its week's Monday, or its month's 1st. */
export function periodStart(date: string, grain: SalesGrain): string {
  if (grain === "day") return date;
  if (grain === "month") return `${date.slice(0, 7)}-01`;
  const weekday = (new Date(toMs(date)).getUTCDay() + 6) % 7; // Monday = 0
  return fromMs(toMs(date) - weekday * DAY_MS);
}

/** The start of the period `n` periods before the one starting on `start`. */
function stepBack(start: string, grain: SalesGrain, n: number): string {
  if (grain === "day") return fromMs(toMs(start) - n * DAY_MS);
  if (grain === "week") return fromMs(toMs(start) - n * 7 * DAY_MS);
  const d = new Date(toMs(start));
  return fromMs(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() - n, 1));
}

/** The start of the oldest of `count` periods ending with today's: the window the table asks for. */
export function salesSince(grain: SalesGrain, today: string, count: number): string {
  return stepBack(periodStart(today, grain), grain, Math.max(count - 1, 0));
}

/** The first day the summary cards read: the 1st of last month, always more than the 14 days the weeks need. */
export function cardsSince(today: string): string {
  return stepBack(periodStart(today, "month"), "month", 1);
}

const emptyRow = (period: string): SalesPeriodRow => ({
  period,
  passesSold: 0,
  passesRefunded: 0,
  passPaise: 0,
  booksSold: 0,
  booksRefunded: 0,
  bookPaise: 0,
});

/** `count` periods, newest first, ending with today's; a period with no sales is a row of zeros. */
export function fillPeriods(rows: SalesPeriodRow[], grain: SalesGrain, today: string, count: number): SalesPeriodRow[] {
  const byPeriod = new Map(rows.map((r) => [r.period, r]));
  const newest = periodStart(today, grain);
  return Array.from({ length: count }, (_, i) => {
    const period = stepBack(newest, grain, i);
    return byPeriod.get(period) ?? emptyRow(period);
  });
}

export function sumRows(rows: SalesPeriodRow[]): SalesTotals {
  return rows.reduce<SalesTotals>(
    (t, r) => ({
      passesSold: t.passesSold + r.passesSold,
      booksSold: t.booksSold + r.booksSold,
      refunded: t.refunded + r.passesRefunded + r.booksRefunded,
      paise: t.paise + r.passPaise + r.bookPaise,
    }),
    { passesSold: 0, booksSold: 0, refunded: 0, paise: 0 }
  );
}

/** Day rows from `from` to `to`, both IST days, inclusive. */
const between = (days: SalesPeriodRow[], from: string, to: string) =>
  days.filter((d) => d.period >= from && d.period <= to);

/**
 * Today against yesterday, the last 7 days (today included) against the 7
 * before, and this month so far against the whole of last month. `days` are
 * day rows reaching back to cardsSince(today).
 */
export function summaryCards(days: SalesPeriodRow[], today: string): SummaryCard[] {
  const back = (n: number) => stepBack(today, "day", n);
  const monthStart = periodStart(today, "month");
  const lastMonthStart = stepBack(monthStart, "month", 1);
  return [
    { label: "Today", current: sumRows(between(days, today, today)), previousLabel: "Yesterday", previous: sumRows(between(days, back(1), back(1))) },
    {
      label: "Last 7 days",
      current: sumRows(between(days, back(6), today)),
      previousLabel: "7 days before",
      previous: sumRows(between(days, back(13), back(7))),
    },
    {
      label: "This month",
      current: sumRows(between(days, monthStart, today)),
      previousLabel: "Last month",
      previous: sumRows(between(days, lastMonthStart, stepBack(monthStart, "day", 1))),
    },
  ];
}
