/**
 * One student's `attempt_answers` rows, read through THEIR OWN attempts (TECH_DEBT_SPEC.md 3.2 b).
 *
 * WHY: reading `attempt_answers` with no filter of its own leaves the access rule to drop every
 * other student's rows, so Postgres reads the whole table (69,104 rows on 2026-11-05; 604 ms mean
 * under load). Asking for the student's attempt ids first lets the primary key
 * (attempt_id, question_id) find their rows directly: 16.6 -> 7.7 ms warm for the heaviest
 * student, and the cost now grows with that student's answers, not everyone's.
 *
 * The access rule still applies on top: a client can only ever see its own answers.
 * Ids go into `.in()` in chunks (a few hundred uuids overflow the request URL; CLAUDE.md
 * pitfalls), and each chunk is paged past the 1,000-row cap.
 * Spec: tests/own-answers.integration.test.ts.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { readAllPages } from "@/lib/supabase/readAllPages";
import { readInChunks } from "@/lib/supabase/readInChunks";

/** The answered-row predicate, mirroring isAnswered in lib/mocks/answers.ts (a tick set counts, 0215). */
export const ANSWERED_FILTER = "selected_label.not.is.null,numeric_response.not.is.null,selected_labels.not.is.null";

export type OwnAnswerOptions = {
  /** Only rows with an answer, not flag-only rows. */
  answeredOnly?: boolean;
  /** Attempt ids per request; tests set it small to exercise chunking. */
  chunk?: number;
};

/** The student's attempt ids, newest first. */
async function ownAttemptIds(db: SupabaseClient, userId: string): Promise<string[]> {
  const rows = await readAllPages<{ id: string }>((from, to) =>
    db.from("mock_attempts").select("id").eq("user_id", userId).order("started_at", { ascending: false }).order("id").range(from, to)
  );
  return rows.map((r) => r.id);
}

/**
 * Every answer row of the student's attempts, newest attempt first (rows within an attempt in
 * question order). `select` is a PostgREST column list.
 */
export async function readOwnAnswerRows<T>(
  db: SupabaseClient,
  userId: string,
  select: string,
  opts: OwnAnswerOptions = {}
): Promise<T[]> {
  const ids = await ownAttemptIds(db, userId);
  return readInChunks<T>(
    ids,
    async (part, from, to) => {
      let q = db.from("attempt_answers").select(select).in("attempt_id", part);
      if (opts.answeredOnly) q = q.or(ANSWERED_FILTER);
      // `select` is a runtime string, so the client cannot type the rows: the caller names them.
      const { data, error } = await q.order("attempt_id").order("question_id").range(from, to);
      return { data: (data ?? []) as T[], error };
    },
    { chunk: opts.chunk }
  );
}
