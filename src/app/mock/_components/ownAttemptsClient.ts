"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { OwnAttemptRow } from "@/lib/mocks/attempted";

/**
 * The signed-in student's own mock attempts, read from the BROWSER.
 *
 * Own-row RLS (`mock_attempts_select_own`, migration 0044) scopes this to the
 * caller with no explicit filter, exactly as fetchAllOwnProgress does for
 * /notes. The read is client-side so the catalogue pages stay ISR-static: a
 * server-side session read would mark them dynamic and delete their prerendered
 * HTML.
 *
 * UNFILTERED BY MOCK, DELIBERATELY. Scoping to the ids on the page would mean
 * an `.in()` list in the URL — a second, smaller limit (~200 ids) that has
 * nothing to do with the row cap — and would refetch on every page. One read of
 * the student's whole history is smaller than that and serves any page.
 */
export async function fetchOwnAttempts(): Promise<OwnAttemptRow[]> {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("mock_attempts")
    .select("mock_id, status, score, max_score, expires_at, started_at")
    // PostgREST silently truncates at 1000 rows — the cap that has produced
    // wrong answers in this codebase five times. Measured 2026-09-21: 755
    // attempts across 195 students, heaviest student 40, mean 13.5. 500 is
    // ~12x the heaviest real history; ordering newest-first means that if a
    // student ever does exceed it, what survives is their recent history
    // rather than an arbitrary slice.
    .order("started_at", { ascending: false })
    .limit(500);

  // A failed read is not an error state worth showing: the badge is additive,
  // and a card with no badge is the same card the page has always rendered.
  if (error || !data) return [];

  return data.map((r) => {
    const row = r as Record<string, unknown>;
    return {
      mockId: row.mock_id as string,
      status: row.status as OwnAttemptRow["status"],
      score: row.score === null ? null : Number(row.score),
      maxScore: row.max_score === null ? null : Number(row.max_score),
      expiresAt: row.expires_at as string,
      startedAt: row.started_at as string,
    };
  });
}
