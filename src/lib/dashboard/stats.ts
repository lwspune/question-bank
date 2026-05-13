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
};

const MS_PER_DAY = 1000 * 60 * 60 * 24;

type RpcShape = {
  total_questions: number;
  chapters_covered: number;
  by_exam: { exam_id: string; exam_name: string; count: number }[];
};

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

  if (rpcErr) throw new Error(`dashboard stats: ${rpcErr.message}`);
  if (jErr) throw new Error(`dashboard stats: ${jErr.message}`);

  const stats = (rpcData as RpcShape | null) ?? {
    total_questions: 0,
    chapters_covered: 0,
    by_exam: [],
  };

  const byExam: ByExamRow[] = stats.by_exam.map((r) => ({
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
  };
}
