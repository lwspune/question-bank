/**
 * /dashboard/sales: the pure core that turns the database's per-period sales
 * into the page's table and summary cards (2026-10-28).
 *
 * Days are IST calendar days: a sale at 23:45 IST belongs to that day, not the
 * next, though it is already the next day in UTC. Weeks start on Monday (what
 * Postgres `date_trunc('week')` returns), months on the 1st.
 */
import { describe, it, expect } from "vitest";
import {
  cardsSince,
  fillPeriods,
  istDate,
  paidShare,
  parseGrain,
  periodStart,
  salesSince,
  summaryCards,
  sumRows,
  windowKey,
  type SalesPeriodRow,
} from "@/lib/sales/summary";

const row = (period: string, over: Partial<SalesPeriodRow> = {}): SalesPeriodRow => ({
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
  passUsdCents: 0,
  ...over,
});

describe("istDate", () => {
  it("keeps a 23:45 IST sale on its own day", () => {
    expect(istDate(new Date("2026-10-27T18:15:00Z"))).toBe("2026-10-27");
  });
  it("moves to the next day at IST midnight", () => {
    expect(istDate(new Date("2026-10-27T18:30:00Z"))).toBe("2026-10-28");
  });
});

describe("periodStart", () => {
  it("is the day itself for a day", () => {
    expect(periodStart("2026-10-28", "day")).toBe("2026-10-28");
  });
  it("starts a week on Monday, Sunday included in the week before it", () => {
    expect(periodStart("2026-10-28", "week")).toBe("2026-10-26");
    expect(periodStart("2026-11-01", "week")).toBe("2026-10-26");
    expect(periodStart("2026-10-26", "week")).toBe("2026-10-26");
  });
  it("starts a month on the 1st", () => {
    expect(periodStart("2026-10-28", "month")).toBe("2026-10-01");
  });
});

describe("parseGrain", () => {
  it("accepts day, week and month and falls back to day", () => {
    expect(parseGrain("week")).toBe("week");
    expect(parseGrain("month")).toBe("month");
    expect(parseGrain("day")).toBe("day");
    expect(parseGrain("year")).toBe("day");
    expect(parseGrain(undefined)).toBe("day");
  });
});

describe("salesSince", () => {
  it("is the start of the oldest period shown", () => {
    expect(salesSince("day", "2026-10-28", 3)).toBe("2026-10-26");
    expect(salesSince("week", "2026-10-28", 2)).toBe("2026-10-19");
    expect(salesSince("month", "2026-01-15", 3)).toBe("2025-11-01");
  });
});

describe("fillPeriods", () => {
  it("lists every period newest first, with zeros where nothing sold", () => {
    const sold = row("2026-10-27", { passesSold: 2, passPaise: 39800 });
    expect(fillPeriods([sold], "day", "2026-10-28", 3)).toEqual([row("2026-10-28"), sold, row("2026-10-26")]);
  });
  it("steps weeks back from this week's Monday", () => {
    expect(fillPeriods([], "week", "2026-10-28", 2).map((r) => r.period)).toEqual(["2026-10-26", "2026-10-19"]);
  });
  it("steps months back across a year end", () => {
    expect(fillPeriods([], "month", "2026-01-15", 3).map((r) => r.period)).toEqual([
      "2026-01-01",
      "2025-12-01",
      "2025-11-01",
    ]);
  });
  it("leaves out rows older than the window", () => {
    expect(fillPeriods([row("2026-10-01", { passesSold: 1 })], "day", "2026-10-28", 2)).toEqual([
      row("2026-10-28"),
      row("2026-10-27"),
    ]);
  });
});

describe("sumRows", () => {
  it("adds orders, passes and books, and the money kept", () => {
    const t = sumRows([
      row("2026-10-27", { passOrders: 5, passesSold: 2, passesRefunded: 1, passPaise: 19900 }),
      row("2026-10-26", { passOrders: 1, bookOrders: 2, booksSold: 1, bookPaise: 4900 }),
    ]);
    expect(t).toEqual({ passOrders: 6, passesSold: 2, bookOrders: 2, booksSold: 1, refunded: 1, paise: 24800 });
  });
});

describe("summaryCards", () => {
  const today = "2026-10-28";
  const days = [
    row("2026-10-28", { passesSold: 1, passPaise: 19900 }),
    row("2026-10-27", { passesSold: 2, passPaise: 39800 }),
    row("2026-10-22", { booksSold: 1, bookPaise: 4900 }), // 7th day back: inside "last 7 days"
    row("2026-10-21", { passesSold: 1, passPaise: 19900 }), // 8th day back: the week before
    row("2026-10-01", { passesSold: 1, passPaise: 9900 }),
    row("2026-09-30", { passesSold: 3, passPaise: 29700 }),
  ];
  const cards = summaryCards(days, today);
  const byLabel = Object.fromEntries(cards.map((c) => [c.label, c]));

  it("compares today with yesterday", () => {
    expect(byLabel["Today"].current.paise).toBe(19900);
    expect(byLabel["Today"].previous.paise).toBe(39800);
    expect(byLabel["Today"].previousLabel).toBe("Yesterday");
  });
  it("counts the last 7 days including today, against the 7 before", () => {
    expect(byLabel["Last 7 days"].current.paise).toBe(19900 + 39800 + 4900);
    expect(byLabel["Last 7 days"].previous.paise).toBe(19900);
  });
  it("compares this month so far with the whole of last month", () => {
    expect(byLabel["This month"].current.paise).toBe(19900 + 39800 + 4900 + 19900 + 9900);
    expect(byLabel["This month"].previous.paise).toBe(29700);
    expect(byLabel["This month"].previousLabel).toBe("Last month");
  });
  it("names the IST days each card covers, for its distinct-student counts", () => {
    expect(byLabel["Today"].window).toEqual({ from: today, to: today });
    expect(byLabel["Today"].previousWindow).toEqual({ from: "2026-10-27", to: "2026-10-27" });
    expect(byLabel["Last 7 days"].window).toEqual({ from: "2026-10-22", to: today });
    expect(byLabel["Last 7 days"].previousWindow).toEqual({ from: "2026-10-15", to: "2026-10-21" });
    expect(byLabel["This month"].window).toEqual({ from: "2026-10-01", to: today });
    expect(byLabel["This month"].previousWindow).toEqual({ from: "2026-09-01", to: "2026-09-30" });
  });
  it("reads days back to the 1st of last month, which always covers the 14 the weeks need", () => {
    expect(cardsSince(today)).toBe("2026-09-01");
    expect(cardsSince("2026-03-01")).toBe("2026-02-01");
    expect(cards).toHaveLength(3);
  });
});

describe("windowKey", () => {
  it("tells windows apart, an open start included", () => {
    expect(windowKey({ from: "2026-10-22", to: "2026-10-28" })).toBe("2026-10-22..2026-10-28");
    expect(windowKey({ from: null, to: "2026-10-28" })).toBe("start..2026-10-28");
  });
});

describe("paidShare", () => {
  it("is the share of checkout students who bought, rounded to a whole percent", () => {
    expect(paidShare(5, 10)).toBe(50);
    expect(paidShare(1, 3)).toBe(33);
  });
  it("is null with no checkout, so the page shows a dash, not 0% or a division by zero", () => {
    expect(paidShare(0, 0)).toBeNull();
    expect(paidShare(1, 0)).toBeNull();
  });
});
