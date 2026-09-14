/**
 * Reads the /dashboard/students roster through the get_student_roster RPC
 * (migration 0098) and maps it onto the view-model.
 *
 * Takes the Supabase client as an argument rather than creating one, so the probe
 * in scripts/students/smoke.ts can drive this exact code path outside Next. The
 * `server-only` wrapper that supplies the service-role client is admin.ts.
 *
 * The aggregate lives in SQL on purpose: attempt_answers is ~53k rows, and counting
 * per-user from a row payload would silently truncate at the PostgREST 1000-row cap.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { displayName, providerLabel } from "./derive";
import type { StudentRosterRow } from "./roster";

/** One row as the RPC returns it (snake_case, straight from Postgres). */
export type RosterRpcRow = {
  user_id: string;
  email: string | null;
  raw_user_meta: { full_name?: string; name?: string } | null;
  provider: string | null;
  signed_up: string;
  last_sign_in: string | null;
  mobile: string | null;
  city: string | null;
  stage: string | null;
  target_exams: string[] | null;
  whatsapp_opt_in: boolean;
  mocks_submitted: number;
  mocks_started: number;
  avg_pct: number | string | null;
  qs_answered: number;
  notes_subtopics: number;
  notes_subjects: number;
  notes_mastered: number;
  notes_checkpoints: number;
  bookmarks: number;
  last_active: string | null;
};

/** Postgres `numeric` arrives over PostgREST as a string — coerce, keeping null as null. */
function num(v: number | string | null): number | null {
  if (v === null) return null;
  const n = typeof v === "string" ? Number(v) : v;
  return Number.isFinite(n) ? n : null;
}

const PAGE = 1000;

export async function fetchStudentRoster(db: SupabaseClient): Promise<StudentRosterRow[]> {
  // Paged in 1000-row windows: a set-returning RPC is subject to the same PostgREST
  // row cap as a table select, so reading it in one shot would start silently
  // dropping students once the roster outgrows the cap.
  const raw: RosterRpcRow[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db.rpc("get_student_roster").range(from, from + PAGE - 1);
    if (error) throw new Error(`fetchStudentRoster: ${error.message}`);
    // Cast: the generated DB types don't carry this RPC's signature, so supabase-js
    // infers a single object for an unknown function. The shape is asserted by the
    // migration's RETURNS TABLE and exercised by `npm run students:smoke`.
    const batch = (data ?? []) as unknown as RosterRpcRow[];
    raw.push(...batch);
    if (batch.length < PAGE) break;
  }

  return raw
    .map((r) => ({
      id: r.user_id,
      name: displayName(r.raw_user_meta, r.email),
      email: r.email ?? "(no email)",
      provider: providerLabel(r.provider),
      signedUp: r.signed_up,
      lastSignIn: r.last_sign_in,
      mobile: r.mobile,
      city: r.city,
      stage: r.stage,
      targetExams: r.target_exams ?? [],
      whatsappOptIn: r.whatsapp_opt_in,
      mocksSubmitted: r.mocks_submitted,
      mocksStarted: r.mocks_started,
      avgPct: num(r.avg_pct),
      qsAnswered: r.qs_answered,
      notesSubtopics: r.notes_subtopics,
      notesSubjects: r.notes_subjects,
      notesMastered: r.notes_mastered,
      notesCheckpoints: r.notes_checkpoints,
      bookmarks: r.bookmarks,
      lastActive: r.last_active,
    }))
    // Default order = the engagement leaderboard the roster is read for. The client
    // re-sorts; this only decides what the first paint shows.
    .sort((a, b) => b.mocksSubmitted - a.mocksSubmitted);
}
