/**
 * What a Current-Affairs pool should contain, and how a built one scores.
 *
 * DERIVED FROM THE PYQ HISTORY, never hand-typed. A hand-typed weight table is a
 * snapshot, and this one has already been wrong: the Sep-2026 pool put 25% of
 * its 88 questions in Defence (PYQ share 17%) and 19% in Science & Technology
 * (PYQ share 10%) while starving International Affairs and Government Schemes,
 * the two chapters with the LARGEST PYQ share. Nobody chose that shape — there
 * was simply nothing to check it against, which is what `scorePool` now is.
 *
 * The evergreen rate is per chapter and not merely bank-wide, because the spread
 * is the finding: Defence Current-Affairs PYQs are 64% evergreen (exercise
 * names, ship classes, book titles) where International Affairs is 14% (dated
 * summits and agreements). A single bank-wide rate would tell an author to write
 * the same mix everywhere and be wrong in both directions at once.
 */
import { classifyGenre, newestEventDate, windowVerdict } from "./window";
import type {
  Blueprint,
  CaRow,
  ChapterScore,
  MonthSpan,
  PoolScore,
  Seat,
} from "./types";

/**
 * A chapter is called over- or under-filled when it misses by at least this many
 * seats AND by at least this fraction of its target. Both terms are needed: the
 * absolute one stops a 1-seat chapter firing on every pool, the relative one
 * stops a 20-seat chapter being judged by the same yardstick as a 3-seat one.
 *
 * CALIBRATED AGAINST REAL DATA, and the first value was wrong. The fraction was
 * 0.5 until the audit was run on the Sep-2026 pool, where it reported ONLY
 * Science & Technology (+8 on a target of 9) and stayed silent on the three
 * misses that mattered most: Defence +7 on 15, International Affairs -6 on 16,
 * Government Schemes -7 on 16. Each is a 37-47% miss on one of the four largest
 * chapters, and "off by half" turned out to be a bar a big chapter can hide
 * under indefinitely. A chapter delivering 9 of 16 seats is materially off by
 * any reading, so the bar is 0.3. Do not raise it to quieten a report.
 *
 * TRIAGE thresholds — the audit never fails a build on them.
 */
export const SEAT_DELTA_MIN = 2;
export const SEAT_DELTA_FRACTION = 0.3;

/** Genre is called out when the pool's evergreen share misses by this much. */
export const GENRE_TOLERANCE = 0.1;

/** The window is called out when this fraction of DATED rows falls outside it. */
export const WINDOW_OUT_TOLERANCE = 0.2;

function isEvergreen(r: CaRow): boolean {
  return classifyGenre(`${r.text} ${r.solution ?? ""}`) === "evergreen";
}

/** Per-chapter weights and evergreen rates, from a Current-Affairs PYQ history. */
export function caBlueprint(rows: CaRow[]): Blueprint {
  const total = rows.length;
  if (total === 0) {
    return { totalPyq: 0, sittings: 0, chapters: [], evergreenRate: 0 };
  }

  const byChapter = new Map<string, CaRow[]>();
  for (const r of rows) {
    const list = byChapter.get(r.chapter);
    if (list) list.push(r);
    else byChapter.set(r.chapter, [r]);
  }

  const chapters = [...byChapter.entries()]
    .map(([chapter, rs]) => ({
      chapter,
      pyqCount: rs.length,
      share: rs.length / total,
      evergreenRate: rs.filter(isEvergreen).length / rs.length,
    }))
    .sort((a, b) => b.share - a.share || a.chapter.localeCompare(b.chapter));

  const sittings = new Set(
    rows.filter((r) => r.pyqYear !== null).map((r) => `${r.pyqYear}-${r.pyqMonth ?? ""}`)
  ).size;

  return {
    totalPyq: total,
    sittings,
    chapters,
    evergreenRate: rows.filter(isEvergreen).length / total,
  };
}

/**
 * Split a pool of `poolSize` questions across the chapters.
 *
 * Largest-remainder, so the seats sum to EXACTLY `poolSize` rather than to
 * whatever rounding leaves — an author handed a table that sums to 99 has to
 * guess where the hundredth goes, and will guess differently each time. Ties
 * break on chapter name so the same history always prints the same table.
 */
export function allocateSeats(bp: Blueprint, poolSize: number): Seat[] {
  if (bp.chapters.length === 0 || poolSize <= 0) {
    return bp.chapters.map((c) => ({ chapter: c.chapter, total: 0, evergreen: 0, dated: 0 }));
  }

  const raw = bp.chapters.map((c) => ({
    chapter: c.chapter,
    exact: c.share * poolSize,
    evergreenRate: c.evergreenRate,
  }));

  const totals = new Map(raw.map((r) => [r.chapter, Math.floor(r.exact)]));
  let left = poolSize - [...totals.values()].reduce((a, b) => a + b, 0);

  const byRemainder = [...raw].sort(
    (a, b) =>
      (b.exact - Math.floor(b.exact)) - (a.exact - Math.floor(a.exact)) ||
      a.chapter.localeCompare(b.chapter)
  );
  for (let i = 0; left > 0; i = (i + 1) % byRemainder.length, left--) {
    const key = byRemainder[i].chapter;
    totals.set(key, (totals.get(key) ?? 0) + 1);
  }

  return raw.map((r) => {
    const total = totals.get(r.chapter) ?? 0;
    const evergreen = Math.round(total * r.evergreenRate);
    return { chapter: r.chapter, total, evergreen, dated: total - evergreen };
  });
}

/**
 * Score a built pool against the blueprint.
 *
 * Returns findings, never a verdict. A pool that misses its blueprint may be
 * deliberately skewed — a year with an unusually busy defence calendar is a real
 * reason to over-fill Defence — so the caller prints this and a human decides.
 * See `scripts/current-affairs/audit.ts`, which always exits 0.
 */
export function scorePool(pool: CaRow[], bp: Blueprint, span: MonthSpan): PoolScore {
  const seats = allocateSeats(bp, pool.length);
  const seatOf = new Map(seats.map((s) => [s.chapter, s]));

  const chapterNames = [
    ...bp.chapters.map((c) => c.chapter),
    ...pool.map((r) => r.chapter).filter((c) => !seatOf.has(c)),
  ].filter((c, i, xs) => xs.indexOf(c) === i);

  const chapters: ChapterScore[] = chapterNames.map((chapter) => {
    const mine = pool.filter((r) => r.chapter === chapter);
    const seat = seatOf.get(chapter);
    return {
      chapter,
      target: seat?.total ?? 0,
      actual: mine.length,
      delta: mine.length - (seat?.total ?? 0),
      targetEvergreen: seat?.evergreen ?? 0,
      actualEvergreen: mine.filter(isEvergreen).length,
    };
  });

  const window = { in: 0, partial: 0, out: 0, undated: 0 };
  for (const r of pool) {
    const blob = `${r.text} ${r.solution ?? ""}`;
    const event = newestEventDate(blob);
    // An evergreen row has no date to place. Counted, never judged — scoring it
    // "out" would punish exactly the genre the pool is short of.
    if (!event) window.undated += 1;
    else window[windowVerdict(event, span)] += 1;
  }

  const evergreenCount = pool.filter(isEvergreen).length;
  const genre = {
    targetRate: bp.evergreenRate,
    actualRate: pool.length ? evergreenCount / pool.length : 0,
  };

  const findings: string[] = [];
  if (pool.length > 0) {
    for (const c of chapters) {
      const big = Math.abs(c.delta) >= SEAT_DELTA_MIN;
      const proportional = Math.abs(c.delta) >= SEAT_DELTA_FRACTION * Math.max(c.target, 1);
      if (big && proportional) {
        findings.push(
          `${c.chapter}: ${c.actual} authored against a target of ${c.target} ` +
            `(${c.delta > 0 ? "+" : ""}${c.delta}). PYQ share is what sets the target.`
        );
      }
    }

    const genreGap = genre.actualRate - genre.targetRate;
    if (Math.abs(genreGap) >= GENRE_TOLERANCE) {
      const pct = (x: number) => `${Math.round(x * 100)}%`;
      findings.push(
        `Evergreen share is ${pct(genre.actualRate)} against ${pct(genre.targetRate)} in the PYQ ` +
          `history. ${genreGap < 0 ? "Under" : "Over"}-weighted: the evergreen genre is the ` +
          `named-entity lookup (a scheme, an alliance, a fellowship), not a dated news event.`
      );
    }

    const dated = window.in + window.partial + window.out;
    if (dated > 0 && window.out / dated >= WINDOW_OUT_TOLERANCE) {
      findings.push(
        `${window.out} of ${dated} dated questions fall OUTSIDE the authoring window ` +
          `(too old, or fresher than the paper-setting ceiling).`
      );
    }
  }

  return { poolSize: pool.length, chapters, genre, window, findings };
}
