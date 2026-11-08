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
import type { MissRow } from "./fixList";

/** An `.in()` list rides in the URL: chunk the FILTER at ~200 ids. */
const IN_CHUNK = 200;
/** And page the RESULT under PostgREST's silent 1000-row cap. */
const PAGE = 1000;

type Raw = {
  ref_id: string;
  kind: MissRow["kind"];
  created_at: string;
  surface: string | null;
  self_mark: string | null;
  mock_id: string | null;
};

/** Every miss row on these questions (the caller keeps the newest per question). */
export async function loadMissRows(db: SupabaseClient, userId: string, questionIds: readonly string[]): Promise<MissRow[]> {
  const ids = [...new Set(questionIds)];
  const out: MissRow[] = [];
  for (let i = 0; i < ids.length; i += IN_CHUNK) {
    const chunk = ids.slice(i, i + IN_CHUNK);
    for (let from = 0; ; from += PAGE) {
      const { data, error } = await db
        .from("user_activity")
        .select("ref_id, kind, created_at, surface:metadata->>surface, self_mark:metadata->>selfMark, mock_id:metadata->>mockId")
        .eq("user_id", userId)
        .in("kind", [...MISS_KINDS])
        .in("ref_id", chunk)
        .order("id")
        .range(from, from + PAGE - 1);
      if (error) throw new Error(`loadMissRows: ${error.message}`);
      const rows = (data ?? []) as Raw[];
      for (const r of rows) {
        out.push({
          questionId: r.ref_id,
          kind: r.kind,
          at: r.created_at,
          surface: r.surface,
          selfMark: r.self_mark,
          mockId: r.mock_id,
        });
      }
      if (rows.length < PAGE) break;
    }
  }
  return out;
}

/** Titles of the mocks these misses came from; a mock the student cannot read is left out. */
export async function loadMockTitles(db: SupabaseClient, mockIds: readonly string[]): Promise<Map<string, string>> {
  const ids = [...new Set(mockIds)];
  const out = new Map<string, string>();
  for (let i = 0; i < ids.length; i += IN_CHUNK) {
    const { data, error } = await db.from("mock_tests").select("id, title").in("id", ids.slice(i, i + IN_CHUNK));
    if (error) throw new Error(`loadMockTitles: ${error.message}`);
    for (const r of (data ?? []) as { id: string; title: string }[]) out.set(r.id, r.title);
  }
  return out;
}
