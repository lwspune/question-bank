import {
  addCartToPaperAction,
  createPaperAction,
} from "@/app/dashboard/papers/actions";

export type CreatePaperResult =
  | { ok: true; id: string; added: number; alreadyIn: number }
  | { ok: false; error: string; createdId?: string };

/**
 * Create a draft paper and commit a set of questions into it — the sequence BOTH
 * cart doors run: the "Create paper" button in the cart footer, and
 * AddToPaperDialog's create mode. It lives in one place so the two cannot drift
 * (a future batch id or section template lands here once, not twice).
 *
 * The two doors deliberately differ only in what they do AFTERWARDS: the button
 * navigates into the paper, the dialog toasts and keeps you on /browse.
 *
 * A failure AFTER the paper row exists returns `createdId`, so the caller can say
 * the paper was made and is empty. Reporting a bare error there would send the
 * user hunting for a paper they'd been told was never created.
 */
export async function createPaperWithQuestions(
  title: string,
  questionIds: string[]
): Promise<CreatePaperResult> {
  const created = await createPaperAction(title);
  if (!created.ok) return { ok: false, error: created.error };

  const res = await addCartToPaperAction(created.id, questionIds);
  if (!res.ok) return { ok: false, error: res.error, createdId: created.id };

  return {
    ok: true,
    id: created.id,
    added: res.added,
    alreadyIn: res.alreadyIn,
  };
}
