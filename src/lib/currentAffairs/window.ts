/**
 * The authoring window for a Current-Affairs pool, and the dated/evergreen split.
 *
 * ## Where the two constants come from
 *
 * MEASURED over all 191 NDA Current-Affairs PYQs (2017-2026), by the lag between
 * the exam and the newest year the question references:
 *
 *   same calendar year as the exam   62  (56%)
 *   previous calendar year           33  (30%)   -> cumulative 86%
 *   two or more years earlier        15  (14%)
 *
 * For a September sitting "same calendar year" is 0-8 months back and "previous
 * year" is 9-20. So a 20-month reach covers ~86% of the dated questions where an
 * 8-month reach covers ~56%, and that is the entire argument for
 * `WINDOW_BACK_MONTHS`. Re-run the measurement before changing it; do not tune it
 * to make a report look better.
 *
 * `FRESHNESS_CEILING_MONTHS` rests on WEAKER evidence and is labelled as such.
 * Only eleven PYQs carry an explicit month+year in the STEM rather than in a
 * solution we wrote ourselves (which would measure our own prose, not UPSC's
 * paper-setting). Their lag runs 2 to 11 months and is never fresher than 2;
 * NDA II 2026's freshest datable item was the March 2026 uranium agreement, six
 * months out. Eleven rows is a documented ASSUMPTION, not a derived constant.
 *
 * ## What this module refuses to do
 *
 * A bare year is not silently promoted to a month. 40% of the corpus carries no
 * year at all and most of the rest carries only a year, so defaulting the month
 * would mean the majority of every report rested on invented precision. See
 * `WindowVerdict`'s "partial" and `EventLag`'s span.
 */
import type { EventDate, EventLag, MonthSpan, CaGenre, WindowVerdict } from "./types";

/** How far back a pool should reach. 86% coverage. See the header. */
export const WINDOW_BACK_MONTHS = 20;

/** How close to the exam is still worth authoring. An assumption — see the header. */
export const FRESHNESS_CEILING_MONTHS = 2;

const MONTH_OF: Record<string, number> = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
};

const MONTH_ALT = Object.keys(MONTH_OF).join("|");

/**
 * A plausible EVENT year, deliberately narrow. `20[0-2][0-9]` rejects "2400
 * metres" and "1947 newtons" without a units allow-list, and the word boundaries
 * stop it matching inside a longer number.
 */
const YEAR_SRC = "20[0-2][0-9]";

/** Months since year 0. The unit every comparison here works in. */
export function monthIndex(year: number, month: number): number {
  return year * 12 + month;
}

function splitMonthKey(key: string): { year: number; month: number } {
  const [y, m] = key.split("-");
  const year = Number(y);
  const month = Number(m);
  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
    throw new Error(`examMonth must be "YYYY-MM", got ${JSON.stringify(key)}`);
  }
  return { year, month };
}

/**
 * Every date the text names, in order of appearance.
 *
 * A month-precision hit CONSUMES its year, so "March 2026" yields one date
 * rather than a `{2026, 3}` and a spurious bare `{2026, null}` that would then
 * be scored twice by the window check.
 */
export function parseEventDates(text: string): EventDate[] {
  const src = text ?? "";
  const out: Array<{ at: number; date: EventDate }> = [];
  const consumed: Array<[number, number]> = [];

  const monthYear = new RegExp(`\\b(${MONTH_ALT})\\s+(${YEAR_SRC})\\b`, "gi");
  for (let m = monthYear.exec(src); m; m = monthYear.exec(src)) {
    consumed.push([m.index, m.index + m[0].length]);
    out.push({
      at: m.index,
      date: { year: Number(m[2]), month: MONTH_OF[m[1].toLowerCase()] },
    });
  }

  const bareYear = new RegExp(`\\b(${YEAR_SRC})\\b`, "g");
  for (let m = bareYear.exec(src); m; m = bareYear.exec(src)) {
    const at = m.index;
    if (consumed.some(([from, to]) => at >= from && at < to)) continue;
    out.push({ at, date: { year: Number(m[1]), month: null } });
  }

  return out.sort((a, b) => a.at - b.at).map((x) => x.date);
}

/**
 * The most recent date the text names, keeping month precision where it exists.
 *
 * Within the newest year a month-precision reading WINS over a bare one. A bare
 * "2026" could in principle mean December and so be later, but preferring the
 * precise reading is what lets `windowVerdict` return a decision at all instead
 * of shrugging "partial" on every question that happens to repeat its year.
 */
export function newestEventDate(text: string): EventDate | null {
  const dates = parseEventDates(text);
  if (dates.length === 0) return null;
  const year = Math.max(...dates.map((d) => d.year));
  const months = dates.filter((d) => d.year === year && d.month !== null).map((d) => d.month!);
  return { year, month: months.length ? Math.max(...months) : null };
}

/** Does the question name a point in time, or is it a standing fact? */
export function classifyGenre(text: string): CaGenre {
  return parseEventDates(text).length > 0 ? "dated" : "evergreen";
}

const RECENCY_WORDS = /\b(recently|latest|currently|current|ongoing|last\s+year|this\s+year)\b/i;
const FISCAL_SPAN = new RegExp(`\\b${YEAR_SRC}\\s*[-\\u2013\\u2014]\\s*[0-9]{2}\\b`);

/**
 * Why a genre call on this text might be wrong.
 *
 * The classifier is a regex over year tokens, so it is a heuristic and this is
 * it declaring its own soft spots rather than the audit asserting a clean split.
 * Returns null when there is nothing to caveat.
 */
export function evergreenCaveat(text: string): string | null {
  const src = text ?? "";
  if (FISCAL_SPAN.test(src)) {
    return "carries a two-digit fiscal span (e.g. 2025-26), which dates it more tightly than the year alone";
  }
  if (parseEventDates(src).length === 0 && new RegExp(`\\b(${MONTH_ALT})\\b`, "i").test(src)) {
    return "names a month with no year, so it cannot be placed in the window";
  }
  if (RECENCY_WORDS.test(src)) {
    return "carries a floating recency word (recently/latest/current), which goes stale silently";
  }
  return null;
}

/**
 * The span a pool for this sitting should author against.
 *
 * `examMonth` is "YYYY-MM" because month precision is all the bank records
 * (`pyq_month` is 'Apr' / 'Sep') and all this decision needs.
 */
export function poolWindow(examMonth: string): MonthSpan {
  const { year, month } = splitMonthKey(examMonth);
  const t = monthIndex(year, month);
  return { fromIndex: t - WINDOW_BACK_MONTHS, toIndex: t - FRESHNESS_CEILING_MONTHS };
}

/** Whether an event falls inside the window, with "partial" for a bare year that straddles. */
export function windowVerdict(event: EventDate, span: MonthSpan): WindowVerdict {
  if (event.month !== null) {
    const at = monthIndex(event.year, event.month);
    return at >= span.fromIndex && at <= span.toIndex ? "in" : "out";
  }
  const yearFrom = monthIndex(event.year, 1);
  const yearTo = monthIndex(event.year, 12);
  if (yearFrom >= span.fromIndex && yearTo <= span.toIndex) return "in";
  if (yearTo < span.fromIndex || yearFrom > span.toIndex) return "out";
  return "partial";
}

/**
 * How long before the exam the event falls — a SPAN, because a bare year is one.
 *
 * Clamped at zero: an event dated after the exam month is a transcription or
 * authoring error, and reporting a negative lag invites someone to average it.
 */
export function eventLag(event: EventDate, examMonth: string): EventLag {
  const { year, month } = splitMonthKey(examMonth);
  const t = monthIndex(year, month);
  if (event.month !== null) {
    const lag = Math.max(0, t - monthIndex(event.year, event.month));
    return { minMonths: lag, maxMonths: lag };
  }
  return {
    minMonths: Math.max(0, t - monthIndex(event.year, 12)),
    maxMonths: Math.max(0, t - monthIndex(event.year, 1)),
  };
}
