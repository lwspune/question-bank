/**
 * Admin read for the /dashboard/students roster. Service-role: the student list
 * is the set of auth.users with no org_members row, and both auth.users +
 * org_members require the admin API / service role. Mirrors listMembers, but
 * INVERTS the filter (students = everyone who is NOT a member).
 */
import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { deriveStudents, type AuthUserLite, type StudentRow } from "./derive";

export async function listStudents(): Promise<StudentRow[]> {
  const admin = createSupabaseAdminClient();

  // Staff to exclude.
  const { data: members, error: mErr } = await admin.from("org_members").select("user_id");
  if (mErr) throw new Error(`listStudents members: ${mErr.message}`);
  const staff = new Set((members ?? []).map((m) => m.user_id as string));

  // All auth users (paginate — the roster grows).
  const users: AuthUserLite[] = [];
  for (let page = 1; ; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw new Error(`listStudents users: ${error.message}`);
    const batch = data?.users ?? [];
    for (const uu of batch) {
      users.push({
        id: uu.id,
        email: uu.email ?? null,
        created_at: uu.created_at,
        app_metadata: (uu.app_metadata as { provider?: string } | null) ?? null,
      });
    }
    if (batch.length < 1000) break;
  }

  return deriveStudents(users, staff);
}
