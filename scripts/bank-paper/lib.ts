/**
 * Pure core for assembling a /dashboard/papers paper out of EXISTING bank rows.
 *
 * Distinct from scripts/practice-paper/, which INGESTS a printed LWS test (new
 * question rows + a paper that mirrors the printed Q-order). Here the questions
 * already exist and the only decisions are which ones to take and in what order.
 *
 * Deliberately deterministic — no Math.random. A re-run picks the same 60
 * questions, so a dry run is a truthful preview of what --apply will write.
 */
export type Difficulty = "EASY" | "MODERATE" | "HARD";

export const DIFFICULTIES: Difficulty[] = ["EASY", "MODERATE", "HARD"];

export type Cand = { id: string; chapterId: string; difficulty: Difficulty };

export type Quota = Record<Difficulty, number>;

/**
 * Take `quota[d]` questions of each difficulty, in stable id order.
 *
 * A quota that outruns supply is REPORTED as a shortfall rather than quietly
 * back-filled from another difficulty — the caller decides whether a paper that
 * misses its difficulty shape is acceptable, because silently swapping HARD for
 * MODERATE changes what the paper tests without anyone noticing.
 */
export function selectByQuota(
  cands: Cand[],
  quota: Quota
): { picked: Cand[]; shortfall: Partial<Quota> } {
  const picked: Cand[] = [];
  const shortfall: Partial<Quota> = {};

  for (const d of DIFFICULTIES) {
    const want = quota[d] ?? 0;
    if (want <= 0) continue;
    const available = cands
      .filter((c) => c.difficulty === d)
      .sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
    picked.push(...available.slice(0, want));
    if (available.length < want) shortfall[d] = want - available.length;
  }

  return { picked, shortfall };
}

export type Shape = Record<Difficulty, number>;

/** Largest-remainder apportionment, so the parts sum to exactly `total`. */
function apportion(total: number, shape: Shape): Quota {
  const weight = DIFFICULTIES.reduce((s, d) => s + Math.max(0, shape[d] ?? 0), 0);
  if (total <= 0 || weight <= 0) return { EASY: 0, MODERATE: 0, HARD: 0 };

  const exact = DIFFICULTIES.map((d) => ({ d, v: (total * Math.max(0, shape[d] ?? 0)) / weight }));
  const out = { EASY: 0, MODERATE: 0, HARD: 0 } as Quota;
  for (const { d, v } of exact) out[d] = Math.floor(v);

  let left = total - DIFFICULTIES.reduce((s, d) => s + out[d], 0);
  const byRemainder = [...exact].sort((a, b) => b.v - Math.floor(b.v) - (a.v - Math.floor(a.v)));
  for (let i = 0; left > 0; i++, left--) out[byRemainder[i % byRemainder.length].d]++;
  return out;
}

/**
 * Take `take` questions from one chapter, aiming at `shape` but treating it as a
 * PREFERENCE, not a contract.
 *
 * This is the deliberate opposite of selectByQuota. There the caller named an
 * exact per-difficulty count, so a thin difficulty must be reported rather than
 * substituted. Here the caller named a TOTAL — that total is the ask, and the
 * shape is how to spend it — so a difficulty that runs short is back-filled from
 * the others and only a genuinely undersized pool produces a shortfall. The
 * achieved shape is visible in the returned picks, so the substitution is never
 * silent at the call site.
 */
export function selectTotal(
  cands: Cand[],
  take: number,
  shape: Shape
): { picked: Cand[]; shortfall: number } {
  if (take <= 0) return { picked: [], shortfall: 0 };

  const byDiff = new Map<Difficulty, Cand[]>(
    DIFFICULTIES.map((d) => [
      d,
      cands
        .filter((c) => c.difficulty === d)
        .sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0)),
    ])
  );

  const want = apportion(take, shape);
  const picked: Cand[] = [];
  for (const d of DIFFICULTIES) picked.push(...(byDiff.get(d) ?? []).slice(0, want[d]));

  // Back-fill: spend whatever the shape could not place on the difficulties that
  // still have supply, in a fixed order so the result stays deterministic.
  let deficit = take - picked.length;
  for (const d of DIFFICULTIES) {
    if (deficit <= 0) break;
    const rest = (byDiff.get(d) ?? []).slice(want[d]);
    const extra = rest.slice(0, deficit);
    picked.push(...extra);
    deficit -= extra.length;
  }

  return { picked, shortfall: Math.max(0, take - picked.length) };
}

/**
 * Lay the paper out EASY -> MODERATE -> HARD, round-robining the groups (one
 * group per chapter) inside each tier so the two topics alternate rather than
 * arriving as two solid blocks. Within a tier a group keeps its incoming order.
 */
export function orderPaper(groups: Cand[][]): Cand[] {
  const out: Cand[] = [];

  for (const d of DIFFICULTIES) {
    const tiers = groups.map((g) => g.filter((c) => c.difficulty === d));
    const longest = Math.max(0, ...tiers.map((t) => t.length));
    for (let i = 0; i < longest; i++) {
      for (const tier of tiers) {
        if (i < tier.length) out.push(tier[i]);
      }
    }
  }

  return out;
}
