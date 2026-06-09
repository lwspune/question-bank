/**
 * Admin read for the /dashboard/leads view. Service-role (quiz_leads is
 * admin-only RLS) — same pattern as listAssembledQuizzes. Returns flat lead rows
 * joined to their quiz title; the page rolls them up by mobile via
 * rollupLeadsByMobile (src/lib/quiz/leads.ts).
 */
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { LeadRow } from "./leads";

export type LeadWithQuiz = LeadRow & {
  score: number;
  total: number;
  utm_source: string | null;
  quizTitle: string | null;
};

export async function listLeads(limit = 500): Promise<LeadWithQuiz[]> {
  const db = createSupabaseAdminClient();
  const { data, error } = await db
    .from("quiz_leads")
    .select(
      "quiz_id, name, mobile, score, best_score, attempts, total, last_attempt_at, first_seen_at, utm_source, quizzes(title)"
    )
    .order("last_attempt_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(`list leads failed: ${error.message}`);

  return ((data ?? []) as unknown as Array<Record<string, unknown>>).map((r) => ({
    quiz_id: (r.quiz_id as string) ?? null,
    name: r.name as string,
    mobile: r.mobile as string,
    score: (r.score as number) ?? 0,
    best_score: (r.best_score as number) ?? 0,
    attempts: (r.attempts as number) ?? 1,
    total: (r.total as number) ?? 0,
    last_attempt_at: r.last_attempt_at as string,
    first_seen_at: r.first_seen_at as string,
    utm_source: (r.utm_source as string) ?? null,
    quizTitle: ((r.quizzes as { title?: string } | null)?.title as string) ?? null,
  }));
}
