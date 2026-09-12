/**
 * Sittings of a pushed paper — the vault's record of which tracker exams a
 * paper became.
 *
 * WHY THE VAULT HAS TO REMEMBER THIS. The tracker's exam id used to be derived
 * from the paper alone (`exam_vault_<paperId>`), which made a second conduct
 * unreachable: it upserted the first exam, and once that had results it was
 * refused. Now the id is derived from (paper, sitting), so the vault must know
 * which sittings exist — and it cannot ask the tracker, which exposes no list
 * endpoint and is at 12/12 Vercel Hobby functions.
 *
 * Three things depend on the record and none survives a bare counter: which
 * exam a sitting became (so a re-push updates it rather than minting another),
 * what the sitting was FOR (the label is unrecoverable afterwards — the tracker
 * cannot rename an exam), and idempotence against a double-click.
 *
 * Reads and writes go through the CALLER's client, so RLS scopes them to papers
 * that caller can actually reach (migration 0097 mirrors the 0058 predicate).
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { PriorSitting } from "./paperPush";

type Row = {
  sitting_no: number;
  tracker_exam_id: string;
  label: string | null;
  pushed_at: string;
};

/** Every sitting of this paper, ascending. */
export async function listPaperSittings(
  client: SupabaseClient,
  paperId: string
): Promise<PriorSitting[]> {
  const { data, error } = await client
    .from("paper_pushes")
    .select("sitting_no, tracker_exam_id, label, pushed_at")
    .eq("paper_id", paperId)
    .order("sitting_no", { ascending: true });

  if (error) throw new Error(`listPaperSittings: ${error.message}`);
  return ((data ?? []) as unknown as Row[]).map((r) => ({
    sittingNo: r.sitting_no,
    examId: r.tracker_exam_id,
    label: r.label,
    pushedAt: r.pushed_at,
  }));
}

/**
 * Record a sitting.
 *
 * IDEMPOTENT BY THE DATABASE, not by the caller: `paper_pushes_unique_sitting`
 * means a double-click cannot produce two rows, and a re-push of an existing
 * sitting is a no-op here rather than an error. That is why this ignores a
 * duplicate instead of throwing — the push itself already succeeded, and
 * failing the action afterwards would tell the operator a completed push had
 * failed.
 */
export async function recordPaperSitting(
  client: SupabaseClient,
  input: {
    paperId: string;
    sittingNo: number;
    trackerExamId: string;
    label: string | null;
    pushedBy: string | null;
  }
): Promise<void> {
  const { error } = await client.from("paper_pushes").insert({
    paper_id: input.paperId,
    sitting_no: input.sittingNo,
    tracker_exam_id: input.trackerExamId,
    label: input.label,
    pushed_by: input.pushedBy,
  });

  // 23505 = unique_violation, and here it can only ever be the benign one.
  // `trackerExamId` embeds the paper id, so two different papers structurally
  // cannot produce the same exam id -- which leaves only "this (paper, sitting)
  // is already recorded", the desired end state. If the derivation ever stops
  // embedding the paper id, `paper_pushes_unique_exam` becomes reachable and
  // this swallow must be split by constraint name.
  if (error && (error as { code?: string }).code !== "23505") {
    throw new Error(`recordPaperSitting: ${error.message}`);
  }
}
