/**
 * Reads behind the Review tab's "To fix" list (2026-11-08). Rows only; the
 * grouping and labels are lib/review/fixList.
 *
 * Read with the STUDENT'S OWN login: user_activity is own-row by RLS, and
 * mock_tests shows them published mocks and their own practice tests (a title
 * they cannot read falls back to "a mock"). Takes the client as a parameter so
 * `npm run review:smoke` can drive the same reads.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { MISS_KINDS } from "@/lib/drill/select";
import { readInChunks } from "@/lib/supabase/readInChunks";
import type { MissRow } from "./fixList";

type Raw = {
  ref_id: string;
  kind: MissRow["kind"];
  created_at: string;
  surface: string | null;
  self_mark: string | null;
  mock_id: string | null;
};

/** Every miss row on these questions (the caller keeps the newest per question).
 *  Ids 200 a request, each request paged (readInChunks: both PostgREST limits). */
export async function loadMissRows(db: SupabaseClient, userId: string, questionIds: readonly string[]): Promise<MissRow[]> {
  const rows = await readInChunks<Raw>(questionIds, (ids, from, to) =>
    db
      .from("user_activity")
      .select("ref_id, kind, created_at, surface:metadata->>surface, self_mark:metadata->>selfMark, mock_id:metadata->>mockId")
      .eq("user_id", userId)
      .in("kind", [...MISS_KINDS])
      .in("ref_id", ids)
      .order("id")
      .range(from, to)
      .returns<Raw[]>()
  );
  return rows.map((r) => ({
    questionId: r.ref_id,
    kind: r.kind,
    at: r.created_at,
    surface: r.surface,
    selfMark: r.self_mark,
    mockId: r.mock_id,
  }));
}

/** Titles of the mocks these misses came from; a mock the student cannot read is left out. */
export async function loadMockTitles(db: SupabaseClient, mockIds: readonly string[]): Promise<Map<string, string>> {
  const rows = await readInChunks<{ id: string; title: string }>(mockIds, (ids, from, to) =>
    db.from("mock_tests").select("id, title").in("id", ids).order("id").range(from, to).returns<{ id: string; title: string }[]>()
  );
  return new Map(rows.map((r) => [r.id, r.title]));
}
