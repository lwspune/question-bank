/**
 * /dashboard/sales: turns public.sales_by_period's rows (migrations 0197, 0199, 0200) into the
 * page's table and summary cards. Pure: dates are IST calendar days as
 * "YYYY-MM-DD" strings, done in UTC arithmetic so the server's own time zone
 * never shifts a day.
 */

export type SalesGrain = "day" | "week" | "month";
export const SALES_GRAINS: readonly SalesGrain[] = ["day", "week", "month"];

/** How many periods the table shows for each grain. */
export const PERIODS_SHOWN: Record<SalesGrain, number> = { day: 30, week: 12, month: 12 };

/**
 * One period's sales. Money is what was kept: refunded sales count as sold and refunded, not in the money.
 * Orders are the Razorpay orders the site created (checkouts started), paid or not; pass orders count
 * from 2026-10-04 and book orders from 2026-10-28, when the order route began recording each.
 * The pass funnel counts STUDENTS: those who met a paywall, then those who started a checkout.
 * They are distinct within the period, so they cannot be added across rows (see FunnelStudents).
 */
export type SalesPeriodRow = {
  /** Start of the period, IST: the day, the week's Monday or the month's 1st. */
  period: string;
  paywallStudents: number;
  checkoutStudents: number;
  passOrders: number;
  passesSold: number;
  passesRefunded: number;
  passPaise: number;
  bookOrders: number;
  booksSold: number;
  booksRefunded: number;
  bookPaise: number;
};

export type SalesTotals = {
  passOrders: number;
  passesSold: number;
  bookOrders: number;
  booksSold: number;
  refunded: number;
  paise: number;
};

/** A run of IST days, both ends included; `from` null = since the first record. */
export type DayWindow = { from: string | null; to: string };

/** Distinct students over a DayWindow (public.sales_funnel_students, 0200). */
export type FunnelStudents = { paywallStudents: number; checkoutStudents: number };

export const windowKey = (w: DayWindow): string => `${w.from ?? "start"}..${w.to}`;

export type SummaryCard = {
  label: string;
  current: SalesTotals;
  window: DayWindow;
  previousLabel: string;
  previous: SalesTotals;
  previousWindow: DayWindow;
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
  paywallStudents: 0,
  checkoutStudents: 0,
  passOrders: 0,
  passesSold: 0,
  passesRefunded: 0,
  passPaise: 0,
  bookOrders: 0,
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
      passOrders: t.passOrders + r.passOrders,
      passesSold: t.passesSold + r.passesSold,
      bookOrders: t.bookOrders + r.bookOrders,
      booksSold: t.booksSold + r.booksSold,
      refunded: t.refunded + r.passesRefunded + r.booksRefunded,
      paise: t.paise + r.passPaise + r.bookPaise,
    }),
    { passOrders: 0, passesSold: 0, bookOrders: 0, booksSold: 0, refunded: 0, paise: 0 }
  );
}

/** Day rows from `from` to `to`, both IST days, inclusive. */
const within = (days: SalesPeriodRow[], w: DayWindow) =>
  days.filter((d) => (w.from === null || d.period >= w.from) && d.period <= w.to);

/** Checkout students who bought, as a whole percent; null with no checkout. */
export function paidShare(bought: number, checkoutStudents: number): number | null {
  return checkoutStudents > 0 ? Math.round((bought / checkoutStudents) * 100) : null;
}

/**
 * Today against yesterday, the last 7 days (today included) against the 7
 * before, and this month so far against the whole of last month. `days` are
 * day rows reaching back to cardsSince(today).
 */
export function summaryCards(days: SalesPeriodRow[], today: string): SummaryCard[] {
  const back = (n: number) => stepBack(today, "day", n);
  const monthStart = periodStart(today, "month");
  const lastMonthStart = stepBack(monthStart, "month", 1);
  const card = (label: string, window: DayWindow, previousLabel: string, previousWindow: DayWindow): SummaryCard => ({
    label,
    current: sumRows(within(days, window)),
    window,
    previousLabel,
    previous: sumRows(within(days, previousWindow)),
    previousWindow,
  });
  return [
    card("Today", { from: today, to: today }, "Yesterday", { from: back(1), to: back(1) }),
    card("Last 7 days", { from: back(6), to: today }, "7 days before", { from: back(13), to: back(7) }),
    card("This month", { from: monthStart, to: today }, "Last month", {
      from: lastMonthStart,
      to: stepBack(monthStart, "day", 1),
    }),
  ];
}
