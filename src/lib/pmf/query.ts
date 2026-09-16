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
} from "./snapshot";

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
};

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
    cohorts: raw.cohorts ?? [],
    features: raw.features ?? [],
    segments: raw.segments ?? [],
  };
}
