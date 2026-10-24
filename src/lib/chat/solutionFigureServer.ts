/**
 * Reads the solution figures of the questions V explained (lib/chat/solutionFigure.ts),
 * through the anon client, so only PUBLIC questions. A failed read shows no
 * figure and never fails the reply: the figure is a small addition.
 */
import type { SupabaseClient } from "@supabase/supabase-js";

/** Each question's stored solution figure, for those that have one. Ids are a chat's few, so one `.in()` read. */
export async function loadSolutionFigures(anon: SupabaseClient, ids: readonly string[]): Promise<Map<string, string>> {
  const out = new Map<string, string>();
  const unique = [...new Set(ids)];
  if (unique.length === 0) return out;
  const { data, error } = await anon
    .from("questions")
    .select("id, solution_image_url")
    .in("id", unique)
    .eq("visibility", "PUBLIC")
    .not("solution_image_url", "is", null);
  if (error) {
    console.error("solution figures read failed:", error.message);
    return out;
  }
  for (const r of (data ?? []) as { id: string; solution_image_url: string | null }[]) {
    if (r.solution_image_url) out.set(r.id, r.solution_image_url);
  }
  return out;
}
