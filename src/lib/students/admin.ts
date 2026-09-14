/**
 * Admin read for the /dashboard/students roster. Service-role: the roster spans
 * auth.users plus every student's own-row-RLS engagement data, so it reads through
 * the get_student_roster RPC (migration 0098), which is granted to service_role
 * alone. The page itself is superadmin-gated.
 *
 * Thin wrapper: the query + mapping live in rosterQuery.ts so the smoke probe can
 * drive them outside Next (this module's `server-only` guard cannot resolve there).
 */
import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { fetchStudentRoster } from "./rosterQuery";
import type { StudentRosterRow } from "./roster";

export async function listStudentRoster(): Promise<StudentRosterRow[]> {
  return fetchStudentRoster(createSupabaseAdminClient());
}
