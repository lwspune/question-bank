/**
 * Delete an assembled quiz from PYQ Vault AND propagate the delete to nda-tracker
 * (so a deleted quiz doesn't leave an orphaned draft there). Deleting the quizzes
 * row cascade-clears its quiz_atoms_map (FK ON DELETE CASCADE), freeing the atoms
 * back into the coverage pool. The cross-app delete is a `{action:"delete", id}`
 * POST to the same import endpoint used for push (idempotent by id = slugToUuid).
 *
 * Used by the `quiz:delete` CLI. Caller passes a service-role client + the push
 * creds (or null to skip propagation).
 */
import type { SupabaseClient } from "@supabase/supabase-js";

export type DeleteQuizResult =
  | { ok: true; deleted: boolean; id: string | null; pushDetail: string }
  | { ok: false; error: string };

export async function deleteQuiz(
  db: SupabaseClient,
  slug: string,
  push?: { url: string; secret: string } | null
): Promise<DeleteQuizResult> {
  const { data: quiz, error: readErr } = await db
    .from("quizzes")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (readErr) return { ok: false, error: `read quiz failed: ${readErr.message}` };
  if (!quiz) return { ok: true, deleted: false, id: null, pushDetail: "no such quiz in PYQ Vault" };

  const id = quiz.id as string;
  const { error: delErr } = await db.from("quizzes").delete().eq("id", id);
  if (delErr) return { ok: false, error: `delete failed: ${delErr.message}` };

  let pushDetail = "not propagated — NDA_TRACKER_IMPORT_URL / QUIZ_IMPORT_SECRET not set";
  if (push) {
    try {
      const res = await fetch(push.url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${push.secret}` },
        body: JSON.stringify({ action: "delete", id }),
      });
      pushDetail = res.ok
        ? "deleted on nda-tracker"
        : `nda-tracker delete failed: HTTP ${res.status} ${(await res.text()).slice(0, 140)}`;
    } catch (e) {
      pushDetail = `nda-tracker delete error: ${e instanceof Error ? e.message : String(e)}`;
    }
  }
  return { ok: true, deleted: true, id, pushDetail };
}
