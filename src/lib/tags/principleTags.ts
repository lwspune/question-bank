import type { SupabaseClient } from "@supabase/supabase-js";

export type PrincipleTag = {
  principleSlug: string;
  taggedByLlm: boolean;
  taggedAt: string;
};

export type SetTagsResult = {
  added: number;
  removed: number;
  kept: number;
};

type Row = {
  principle_slug: string;
  tagged_by_llm: boolean;
  tagged_at: string;
};

/**
 * Load every principle tag attached to a question. RLS scopes (anon sees only
 * tags on PUBLIC questions; org members additionally see own-org PRIVATE).
 */
export async function getTagsForQuestion(
  client: SupabaseClient,
  questionId: string
): Promise<PrincipleTag[]> {
  const { data, error } = await client
    .from("question_principle_tags")
    .select("principle_slug, tagged_by_llm, tagged_at")
    .eq("question_id", questionId);
  if (error) throw new Error(`getTagsForQuestion: ${error.message}`);
  return (data ?? []).map((r) => ({
    principleSlug: (r as Row).principle_slug,
    taggedByLlm: (r as Row).tagged_by_llm,
    taggedAt: (r as Row).tagged_at,
  }));
}

/**
 * Replace the full set of principle slugs on a question. Diffs against current
 * state:
 * - INSERTs slugs not currently present
 * - DELETEs current slugs not in `slugs`
 * - Leaves shared slugs untouched
 */
export async function setTagsForQuestion(
  client: SupabaseClient,
  questionId: string,
  slugs: string[],
  opts: { taggedByLlm?: boolean } = {}
): Promise<SetTagsResult> {
  const current = await getTagsForQuestion(client, questionId);
  const currentSet = new Set(current.map((t) => t.principleSlug));
  const desiredSet = new Set(slugs);

  const toInsert = slugs.filter((s) => !currentSet.has(s));
  const toDelete = current
    .map((t) => t.principleSlug)
    .filter((s) => !desiredSet.has(s));
  const kept = current.length - toDelete.length;

  if (toDelete.length > 0) {
    const { error } = await client
      .from("question_principle_tags")
      .delete()
      .eq("question_id", questionId)
      .in("principle_slug", toDelete);
    if (error) throw new Error(`setTagsForQuestion delete: ${error.message}`);
  }

  if (toInsert.length > 0) {
    const rows = toInsert.map((s) => ({
      question_id: questionId,
      principle_slug: s,
      tagged_by_llm: opts.taggedByLlm ?? false,
    }));
    const { error } = await client.from("question_principle_tags").insert(rows);
    if (error) throw new Error(`setTagsForQuestion insert: ${error.message}`);
  }

  return { added: toInsert.length, removed: toDelete.length, kept };
}

/**
 * List every question_id tagged with a given principle. RLS scopes.
 */
export async function getQuestionIdsForPrinciple(
  client: SupabaseClient,
  principleSlug: string
): Promise<string[]> {
  const { data, error } = await client
    .from("question_principle_tags")
    .select("question_id")
    .eq("principle_slug", principleSlug);
  if (error) throw new Error(`getQuestionIdsForPrinciple: ${error.message}`);
  return (data ?? []).map((r) => (r as { question_id: string }).question_id);
}

/**
 * Batch-load tags for multiple principle slugs in a single round-trip. Used by
 * the /guide principles index + each /principles/[slug] page so each render is
 * one DB call regardless of how many slugs need their qCount.
 *
 * Returns Map<principleSlug, questionIds[]>. Slugs with zero tagged questions
 * are omitted from the map (callers should treat missing as length-0).
 */
export async function loadPrincipleQuestionIds(
  client: SupabaseClient,
  slugs: string[]
): Promise<Map<string, string[]>> {
  if (slugs.length === 0) return new Map();
  const { data, error } = await client
    .from("question_principle_tags")
    .select("question_id, principle_slug")
    .in("principle_slug", slugs);
  if (error) throw new Error(`loadPrincipleQuestionIds: ${error.message}`);

  const map = new Map<string, string[]>();
  for (const row of (data ?? []) as { question_id: string; principle_slug: string }[]) {
    const arr = map.get(row.principle_slug) ?? [];
    arr.push(row.question_id);
    map.set(row.principle_slug, arr);
  }
  return map;
}
