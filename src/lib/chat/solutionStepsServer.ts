/**
 * Reads a question's stored solution and cuts it into steps for "Teach me
 * step by step" (lib/chat/solutionSteps.ts). Through the anon client, so only
 * PUBLIC questions: a PRIVATE or missing one reads as no steps. A failed read
 * is no steps too, and never fails the caller: step by step is an addition.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { solutionSteps, type SolutionSteps } from "./solutionSteps";

export type LoadedSteps = SolutionSteps & { format: string | null };

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function loadSolutionSteps(anon: SupabaseClient, questionId: string): Promise<LoadedSteps | null> {
  if (!UUID_RE.test(questionId)) return null;
  const { data, error } = await anon
    .from("questions")
    .select("solution, solution_visual, question_format")
    .eq("id", questionId)
    .eq("visibility", "PUBLIC")
    .maybeSingle();
  if (error) {
    console.error("loadSolutionSteps:", error.message);
    return null;
  }
  if (!data) return null;
  const row = data as { solution: string | null; solution_visual: unknown; question_format: string | null };
  const steps = solutionSteps({ solution: row.solution, visual: row.solution_visual });
  return steps ? { ...steps, format: row.question_format } : null;
}
