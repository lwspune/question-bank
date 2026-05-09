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

export async function getDashboardStats(
  client: SupabaseClient,
  orgId: string
): Promise<DashboardStats> {
  type QuestionTaxonomy = {
    exam_id: string;
    chapter_id: string;
    exams: { name: string } | { name: string }[] | null;
  };

  const [{ data: rows, error: qErr }, { data: lastJob, error: jErr }] =
    await Promise.all([
      client
        .from("questions")
        .select("exam_id, chapter_id, exams!exam_id(name)")
        .eq("org_id", orgId)
        .returns<QuestionTaxonomy[]>(),
      client
        .from("upload_jobs")
        .select("created_at")
        .eq("org_id", orgId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]);

  if (qErr) throw new Error(`dashboard stats: ${qErr.message}`);
  if (jErr) throw new Error(`dashboard stats: ${jErr.message}`);

  const data = rows ?? [];
  const examNames = new Map<string, string>();
  const examCounts = new Map<string, number>();
  const chapterIds = new Set<string>();

  for (const r of data) {
    const exam = Array.isArray(r.exams) ? r.exams[0] : r.exams;
    if (exam?.name && !examNames.has(r.exam_id)) {
      examNames.set(r.exam_id, exam.name);
    }
    examCounts.set(r.exam_id, (examCounts.get(r.exam_id) ?? 0) + 1);
    chapterIds.add(r.chapter_id);
  }

  const byExam: ByExamRow[] = [...examCounts.entries()]
    .map(([examId, count]) => ({
      examId,
      examName: examNames.get(examId) ?? "(unknown)",
      count,
    }))
    .sort((a, b) => b.count - a.count);

  const daysSinceLastUpload =
    lastJob?.created_at != null
      ? Math.floor(
          (Date.now() - new Date(lastJob.created_at).getTime()) / MS_PER_DAY
        )
      : null;

  return {
    totalQuestions: data.length,
    examsCovered: examCounts.size,
    chaptersCovered: chapterIds.size,
    daysSinceLastUpload,
    byExam,
  };
}
