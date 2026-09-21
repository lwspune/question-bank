/**
 * The PMF snapshot read, as a plain function over a Supabase client.
 *
 * Deliberately NOT `server-only`: this is the half `npm run pmf:smoke` drives
 * against live data. /dashboard/pmf is an auth-gated `ƒ` route, so `next build`
 * never renders it — a green build proves it compiles and nothing more. The
 * server-only wrapper (with the service-role client) lives in adminStats.ts,
 * mirroring students/rosterQuery.ts vs students/admin.ts.
 *
 * Aggregation happens in Postgres (migration 0103) — cap-safe past 1000 rows.
 * Nothing here computes a rate; every derived number comes from the pure core
 * in ./snapshot.ts.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  CohortRow,
  FeatureRow,
  SegmentRow,
  AttemptCounts,
  FunnelCounts,
  DifficultyCounts,
  ShareCounts,
  StickinessCounts,
} from "./snapshot";
import { SHARE_LIVE_SINCE } from "./snapshot";

/** The mature (signed up 28d+ ago) pool the lift + segment arms are drawn from. */
export type MaturePool = { students: number; signalled: number; retained: number };

export type PmfSnapshot = {
  generatedAt: string;
  weeks: number;
  funnel: FunnelCounts;
  maturePool: MaturePool;
  cohorts: CohortRow[];
  features: FeatureRow[];
  segments: SegmentRow[];
  attempts: AttemptCounts;
  difficulty: DifficultyCounts;
  nps: { scores: number[]; eligible: number };
  stickiness: StickinessCounts;
};

/**
 * Zero counts for the share loop — the shape the page renders when the RPC has
 * not answered. Distinct from "no shares happened": the page reads `reportable`
 * off the opportunity count, so an all-zero row renders as "not yet
 * measurable", never as a 0% share rate.
 */
export function emptyShareCounts(): ShareCounts {
  return {
    events: 0,
    withScore: 0,
    byChannel: { whatsapp: 0, share: 0, copy: 0 },
    byMock: [],
    opportunities: 0,
    inboundSignups: 0,
  };
}

/**
 * The share loop (0109), via get_share_snapshot (migration 0111).
 *
 * Anchored to SHARE_LIVE_SINCE rather than to the PMF window: the only valid
 * denominator is attempts that could actually have seen the share button. See
 * that constant, and the migration header.
 *
 * Guarded — a share panel that cannot load must not take the whole PMF page
 * down with it. The failure is warned and rendered as zeroes, which the page
 * shows as "not yet measurable" rather than as a rate.
 */
export async function fetchShareSnapshot(
  db: SupabaseClient,
  since: string = SHARE_LIVE_SINCE
): Promise<ShareCounts> {
  const { data, error } = await db.rpc("get_share_snapshot", { p_since: since });
  if (error) {
    console.warn(`fetchShareSnapshot: ${error.message}`);
    return emptyShareCounts();
  }
  if (!data || typeof data !== "object") return emptyShareCounts();

  const raw = data as Partial<ShareCounts>;
  const base = emptyShareCounts();
  return {
    ...base,
    ...raw,
    byChannel: { ...base.byChannel, ...(raw.byChannel ?? {}) },
    byMock: raw.byMock ?? [],
  };
}

export function emptySnapshot(weeks: number): PmfSnapshot {
  return {
    generatedAt: new Date().toISOString(),
    weeks,
    funnel: { students: 0, signalled: 0, returned: 0, habit: 0 },
    maturePool: { students: 0, signalled: 0, retained: 0 },
    cohorts: [],
    features: [],
    segments: [],
    attempts: { started: 0, submitted: 0, expired: 0, stranded: 0, live: 0 },
    difficulty: { tooEasy: 0, justRight: 0, tooHard: 0, responses: 0 },
    nps: { scores: [], eligible: 0 },
    // A null firstSignalDay is what an un-upgraded RPC and a genuinely empty
    // bank have in common, and both must read as "no window to average over"
    // rather than as a 0% stickiness. viewStickiness withholds on exactly that.
    stickiness: {
      windowDays: 28,
      windowStart: "",
      mau: 0,
      wau: 0,
      dauToday: 0,
      studentDays: 0,
      activeDays: [],
      firstSignalDay: null,
    },
  };
}

export async function fetchPmfSnapshot(
  db: SupabaseClient,
  weeks = 12
): Promise<PmfSnapshot> {
  const { data, error } = await db.rpc("get_pmf_snapshot", { p_weeks: weeks });
  if (error) throw new Error(`fetchPmfSnapshot: ${error.message}`);
  if (!data || typeof data !== "object") return emptySnapshot(weeks);

  // Merge over an empty snapshot so a field the DB has not started emitting
  // cannot crash the render — same guard as getActivityShape.
  const raw = data as Partial<PmfSnapshot>;
  const base = emptySnapshot(weeks);
  return {
    ...base,
    ...raw,
    funnel: { ...base.funnel, ...(raw.funnel ?? {}) },
    maturePool: { ...base.maturePool, ...(raw.maturePool ?? {}) },
    attempts: { ...base.attempts, ...(raw.attempts ?? {}) },
    difficulty: { ...base.difficulty, ...(raw.difficulty ?? {}) },
    nps: { ...base.nps, ...(raw.nps ?? {}) },
    stickiness: { ...base.stickiness, ...(raw.stickiness ?? {}) },
    cohorts: raw.cohorts ?? [],
    features: raw.features ?? [],
    segments: raw.segments ?? [],
  };
}
