/**
 * How /dashboard/world-exams arranges the rows: shortlist, grouping, filters,
 * revenue totals. Pure; the rows come from model.ts already checked.
 */
import { REGIONS, RIGHTS, VERDICTS, type RegionId, type RightsId, type VerdictId, type WorldExam } from "./model";

export type Filters = { region?: RegionId; verdict?: VerdictId; rights?: RightsId };

const VERDICT_ORDER = VERDICTS.map((v) => v.id) as VerdictId[];

export function shortlist(exams: WorldExam[]): WorldExam[] {
  return exams.filter((e) => e.shortlistRank !== null).sort((a, b) => a.shortlistRank! - b.shortlistRank!);
}

/** Only the values the page knows; anything else is dropped, never an error. */
export function parseFilters(params: Record<string, string | string[] | undefined>): Filters {
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const out: Filters = {};
  const region = one(params.region);
  const verdict = one(params.verdict);
  const rights = one(params.rights);
  if (region && REGIONS.some((r) => r.id === region)) out.region = region as RegionId;
  if (verdict && VERDICTS.some((v) => v.id === verdict)) out.verdict = verdict as VerdictId;
  if (rights && RIGHTS.some((r) => r.id === rights)) out.rights = rights as RightsId;
  return out;
}

export function filterExams(exams: WorldExam[], f: Filters): WorldExam[] {
  return exams.filter(
    (e) => (!f.region || e.region === f.region) && (!f.verdict || e.verdict === f.verdict) && (!f.rights || e.rights === f.rights),
  );
}

export type RegionGroup = { region: RegionId; label: string; countries: { country: string; exams: WorldExam[] }[] };

/** Regions in REGIONS order, countries A-Z, exams by verdict (live first) then name. */
export function groupByRegion(exams: WorldExam[]): RegionGroup[] {
  return REGIONS.map((r) => {
    const inRegion = exams.filter((e) => e.region === r.id);
    const countries = [...new Set(inRegion.map((e) => e.country))].sort((a, b) => a.localeCompare(b));
    return {
      region: r.id,
      label: r.label,
      countries: countries.map((country) => ({
        country,
        exams: inRegion
          .filter((e) => e.country === country)
          .sort((a, b) => VERDICT_ORDER.indexOf(a.verdict) - VERDICT_ORDER.indexOf(b.verdict) || a.exam.localeCompare(b.exam)),
      })),
    };
  }).filter((g) => g.countries.length > 0);
}

export type RevenueTotal = { country: string; low: number; mid: number; high: number };

/** Gross USD a year per country, summed over the rows that carry an estimate. */
export function revenueByCountry(exams: WorldExam[]): RevenueTotal[] {
  const by = new Map<string, RevenueTotal>();
  for (const e of exams) {
    if (!e.revenue) continue;
    const t = by.get(e.country) ?? { country: e.country, low: 0, mid: 0, high: 0 };
    t.low += e.revenue.low.usd;
    t.mid += e.revenue.mid.usd;
    t.high += e.revenue.high.usd;
    by.set(e.country, t);
  }
  return [...by.values()].sort((a, b) => a.country.localeCompare(b.country));
}

export function verdictCounts(exams: WorldExam[]): Record<VerdictId, number> {
  const counts = Object.fromEntries(VERDICT_ORDER.map((v) => [v, 0])) as Record<VerdictId, number>;
  for (const e of exams) counts[e.verdict] += 1;
  return counts;
}
