/**
 * Cross-paper question-reuse lookup (the soft-warn feature).
 *
 * Goal: when building a paper, surface that a question is ALREADY used in one of
 * the org's other papers — so a teacher doesn't unknowingly repeat a question.
 * It's purely read-side over the existing `paper_questions` junction (which
 * finalize keeps intact), so there's no new storage, write path, or RLS policy.
 *
 * Scope is org-wide BY CONSTRUCTION: the `paper_questions` read policy
 * (migration 0039) only exposes rows whose paper belongs to the caller's org,
 * so a normal authed query can never see another org's usage. Both draft and
 * finalized papers count — finalize keeps the junction rows, it doesn't clear
 * them.
 *
 * "Soft" lives in the UI: this layer only reports usage; it never blocks an add.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { PaperStatus } from "./types";

/** One place a question is already used. */
export type UsageRef = {
  paperId: string;
  title: string;
  status: PaperStatus;
  /** finalized_at for a finalized paper, else updated_at (may be null). */
  date: string | null;
};

/** Raw row shape from the paper_questions → papers embed. */
export type UsageQueryRow = {
  question_id: string;
  paper:
    | {
        id: string;
        title: string;
        status: PaperStatus;
        finalized_at: string | null;
        updated_at: string | null;
      }
    | Array<{
        id: string;
        title: string;
        status: PaperStatus;
        finalized_at: string | null;
        updated_at: string | null;
      }>
    | null;
};

type RawPaper = NonNullable<Exclude<UsageQueryRow["paper"], unknown[]>>;

const flattenPaper = (p: UsageQueryRow["paper"]): RawPaper | null =>
  Array.isArray(p) ? p[0] ?? null : p;

/**
 * Group raw rows into question_id → UsageRef[], deduped by paper and sorted
 * most-recent first. Pure — the DB round-trip lives in getQuestionUsage.
 */
export function summarizeUsage(rows: UsageQueryRow[]): Map<string, UsageRef[]> {
  const byQuestion = new Map<string, Map<string, UsageRef>>();
  for (const r of rows) {
    const paper = flattenPaper(r.paper);
    if (!paper) continue;
    const ref: UsageRef = {
      paperId: paper.id,
      title: paper.title,
      status: paper.status,
      date: paper.status === "finalized" ? paper.finalized_at : paper.updated_at,
    };
    let papers = byQuestion.get(r.question_id);
    if (!papers) {
      papers = new Map();
      byQuestion.set(r.question_id, papers);
    }
    // dedupe by paperId — the same paper can't legitimately appear twice, but
    // be defensive so the count is never inflated.
    papers.set(paper.id, ref);
  }

  const out = new Map<string, UsageRef[]>();
  for (const [questionId, papers] of byQuestion) {
    const refs = Array.from(papers.values()).sort((a, b) =>
      // most-recent first; nulls sort last
      (b.date ?? "").localeCompare(a.date ?? "")
    );
    out.set(questionId, refs);
  }
  return out;
}

/**
 * A short chip label. Org-wide: `Used in "Maths Mock 3" (issued) +2`.
 * Batch-scoped (`opts.batchScoped`): `Repeated for this batch — "Maths Mock 3"
 * (issued) +2` — the per-batch non-repetition warning. "" when empty.
 */
export function formatUsageLabel(
  refs: UsageRef[],
  opts: { batchScoped?: boolean } = {}
): string {
  if (refs.length === 0) return "";
  const [first, ...rest] = refs;
  const state = first.status === "finalized" ? "issued" : "draft";
  const base = opts.batchScoped
    ? `Repeated for this batch — "${first.title}" (${state})`
    : `Used in "${first.title}" (${state})`;
  return rest.length > 0 ? `${base} +${rest.length}` : base;
}

/** The subset of ids NOT used in any other paper (for the "skip used" action). */
export function filterUnused(
  ids: string[],
  usage: Map<string, UsageRef[]>
): string[] {
  return ids.filter((id) => (usage.get(id)?.length ?? 0) === 0);
}

/**
 * Look up which of `candidateIds` are already used in OTHER papers in the
 * caller's org. RLS org-scopes the result; pass `excludePaperId` to omit the
 * paper currently being edited (so "already in THIS paper" isn't mislabeled as
 * cross-paper reuse — that's the separate within-paper dedup path).
 *
 * Pass `batchId` to scope the warning to ONE batch (migration 0054): only papers
 * whose `batch_id` matches count, via an `!inner` join filter — this is the
 * per-batch non-repetition check ("used for THIS cohort"). Omit it for the
 * org-wide behavior (a question may still legitimately recur across batches).
 *
 * Keyed by the candidate id list (bounded by page/cart size), so it's immune to
 * the PostgREST 1000-row cap.
 */
export async function getQuestionUsage(
  client: SupabaseClient,
  candidateIds: string[],
  excludePaperId?: string,
  batchId?: string | null
): Promise<Map<string, UsageRef[]>> {
  const ids = Array.from(new Set(candidateIds.filter(Boolean)));
  if (ids.length === 0) return new Map();

  // Batch-scoped needs an inner join so a non-matching batch drops the row;
  // org-wide keeps the plain (left) embed. summarizeUsage skips null embeds.
  const embed = batchId
    ? "question_id, paper:papers!inner(id, title, status, finalized_at, updated_at)"
    : "question_id, paper:papers!paper_id(id, title, status, finalized_at, updated_at)";

  let query = client.from("paper_questions").select(embed).in("question_id", ids);
  if (excludePaperId) query = query.neq("paper_id", excludePaperId);
  if (batchId) query = query.eq("paper.batch_id", batchId);

  const { data, error } = await query;
  if (error) throw new Error(`getQuestionUsage: ${error.message}`);
  return summarizeUsage((data ?? []) as unknown as UsageQueryRow[]);
}
