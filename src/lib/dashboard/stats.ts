import type { SupabaseClient } from "@supabase/supabase-js";

export type ByExamRow = {
  examId: string;
  examName: string;
  count: number;
};

export type DashboardStats = {
  totalQuestions: number;
  examsCovered: number;
  chaptersCovered: number;
  daysSinceLastUpload: number | null;
  byExam: ByExamRow[];
  /**
   * True when a read failed and every number above is a PLACEHOLDER, not data.
   *
   * Callers must not treat a zero as "this org is empty" without checking this
   * first — see the `isFresh` guard in app/dashboard/page.tsx, which would
   * otherwise show the new-org onboarding screen to an org holding 57k rows.
   */
  unavailable: boolean;
};

const MS_PER_DAY = 1000 * 60 * 60 * 24;

type RpcShape = {
  total_questions: number;
  chapters_covered: number;
  by_exam: { exam_id: string; exam_name: string; count: number }[];
};

/**
 * A fresh placeholder each call — never a shared const, so a caller mutating
 * the returned object cannot poison the next caller's result.
 */
function unavailableStats(): DashboardStats {
  return {
    totalQuestions: 0,
    examsCovered: 0,
    chaptersCovered: 0,
    daysSinceLastUpload: null,
    byExam: [],
    unavailable: true,
  };
}

export async function getDashboardStats(
  client: SupabaseClient,
  orgId: string
): Promise<DashboardStats> {
  // Aggregate counts go through the RPC so we never hit PostgREST's implicit
  // 1000-row cap (the previous .select(...).length implementation silently
  // truncated once an org crossed 1000 questions). The upload_jobs read is a
  // single row and is unaffected, so it stays as a parallel direct query.
  const [{ data: rpcData, error: rpcErr }, { data: lastJob, error: jErr }] =
    await Promise.all([
      client.rpc("get_dashboard_stats", { p_org_id: orgId }),
      client
        .from("upload_jobs")
        .select("created_at")
        .eq("org_id", orgId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]);

  // DEGRADE, DON'T THROW. These five numbers are decorative; the rest of the
  // dashboard (Members, Branches, Papers, Reports) is the actual tool. Throwing
  // here took the whole page down whenever Postgres cancelled the aggregate on
  // its 8s statement_timeout (SQLSTATE 57014) — measured on prod 2026-08-22 at
  // 21 successes against 21 cancellations, i.e. ~half of all dashboard loads.
  if (rpcErr || jErr) {
    // Boundary log: this is the only place the DB error text survives.
    console.error(
      "dashboard stats read failed:",
      rpcErr?.message ?? jErr?.message
    );
    return unavailableStats();
  }

  const stats = (rpcData as RpcShape | null) ?? {
    total_questions: 0,
    chapters_covered: 0,
    by_exam: [],
  };

  const byExam: ByExamRow[] = (stats.by_exam ?? []).map((r) => ({
    examId: r.exam_id,
    examName: r.exam_name,
    count: r.count,
  }));

  const daysSinceLastUpload =
    lastJob?.created_at != null
      ? Math.floor(
          (Date.now() - new Date(lastJob.created_at).getTime()) / MS_PER_DAY
        )
      : null;

  return {
    totalQuestions: stats.total_questions,
    examsCovered: byExam.length,
    chaptersCovered: stats.chapters_covered,
    daysSinceLastUpload,
    byExam,
    unavailable: false,
  };
}
