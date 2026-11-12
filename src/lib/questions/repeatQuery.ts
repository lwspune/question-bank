/**
 * The repeat line's read (2026-11-12): question ids -> the line under each
 * answered question (lib/questions/repeatLine.ts).
 *
 * Reads the homework plans' groups (migration 0216), a PUBLISHED plan's only:
 * RLS says so for anon and signed-in readers, and the query says so again for
 * a service-role caller, which RLS does not bind. Not part of
 * queryQuestionsByIds on purpose: the Word export, the paper builder and V
 * read questions there and have no use for the line.
 *
 * Ids go in the URL, so they are chunked at 200 (the request line overflows
 * well before the 1000-row result cap). A question sits in one or two groups,
 * so a chunk returns a few hundred rows at most.
 * Spec: tests/repeat-line.integration.test.ts.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { repeatLine, type RepeatGroup, type RepeatLine } from "./repeatLine";

const CHUNK = 200;

/** PostgREST returns a to-one embed as an object; the client's inferred type says array. Take either. */
type OneOrMany<T> = T | T[] | null;
type RawGroup = { tier: "repeat" | "type"; sittings: string[]; plan: OneOrMany<{ slug: string }> };
type Raw = { question_id: string; n: number; group: OneOrMany<RawGroup> };

const one = <T,>(v: OneOrMany<T>): T | null => (Array.isArray(v) ? (v[0] ?? null) : v);

export async function loadRepeatLines(client: SupabaseClient, ids: readonly string[]): Promise<Map<string, RepeatLine>> {
  const out = new Map<string, RepeatLine>();
  const unique = [...new Set(ids)];
  if (unique.length === 0) return out;

  const groupsOf = new Map<string, Map<string, RepeatGroup>>();
  for (let i = 0; i < unique.length; i += CHUNK) {
    const chunk = unique.slice(i, i + CHUNK);
    const { data, error } = await client
      .from("homework_plan_group_questions")
      .select("question_id, n, group:homework_plan_groups!inner(tier, sittings, plan:homework_plans!inner(slug))")
      // RLS already hides an unpublished plan, but not from the service role.
      .eq("group.plan.published", true)
      .in("question_id", chunk);
    if (error) throw new Error(`repeat lines: ${error.message}`);
    for (const r of (data ?? []) as Raw[]) {
      const group = one(r.group);
      const plan = group ? one(group.plan) : null;
      if (!group || !plan) continue;
      const groups = groupsOf.get(r.question_id) ?? new Map<string, RepeatGroup>();
      // A case study lists each part as its own member row of the same group.
      groups.set(`${plan.slug} ${r.n}`, { tier: group.tier, sittings: group.sittings, n: r.n, planSlug: plan.slug });
      groupsOf.set(r.question_id, groups);
    }
  }

  for (const [questionId, groups] of groupsOf) {
    const line = repeatLine([...groups.values()]);
    if (line) out.set(questionId, line);
  }
  return out;
}

/** Best-effort: a failed read shows no line rather than breaking the page. */
export async function loadRepeatLinesSafe(client: SupabaseClient, ids: readonly string[]): Promise<Map<string, RepeatLine>> {
  try {
    return await loadRepeatLines(client, ids);
  } catch (err) {
    console.error("[repeat-line] read failed", err);
    return new Map();
  }
}
