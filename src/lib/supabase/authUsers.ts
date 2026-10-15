/**
 * Every auth user, paged. Extracted from lib/batches/invitesAdmin.ts on
 * 2026-09-27 when /dashboard/feedback needed the same read, so there is one
 * paged copy rather than two.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { displayName } from "@/lib/students/derive";

export type AuthUserLite = {
  id: string;
  email: string | null;
  user_metadata: { name?: string; full_name?: string } | null;
};

/**
 * Every auth user, PAGED.
 *
 * listUsers({ perPage: 1000 }) silently returns only the first page — the same
 * shape as the PostgREST 1000-row cap this project has been bitten by five
 * times, and it fails the same way: no error, just a short list. members/admin
 * gets away with one page because it hydrates STAFF (7 rows). Its callers
 * (batch invites, the /dashboard/feedback names) hydrate across ALL accounts,
 * which grow with every signup, so a single page would eventually render
 * students as "(unknown)" and let an already-enrolled student be re-invited.
 */
export async function listAllAuthUsers(admin: SupabaseClient): Promise<AuthUserLite[]> {
  const out: AuthUserLite[] = [];
  for (let page = 1; ; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw new Error(`listAllAuthUsers: ${error.message}`);
    const batch = data?.users ?? [];
    for (const u of batch) {
      out.push({
        id: u.id,
        email: u.email ?? null,
        user_metadata: (u.user_metadata as AuthUserLite["user_metadata"]) ?? null,
      });
    }
    if (batch.length < 1000) break;
  }
  return out;
}

/**
 * Display names (the Google name, else the email) for these accounts. Moved
 * here from lib/feedback/adminStats.ts on 2026-10-15 when /dashboard/chat
 * needed the same lookup. An id with no account is left out of the map.
 */
export async function namesForUsers(admin: SupabaseClient, ids: Iterable<string>): Promise<Map<string, string>> {
  const wanted = new Set(ids);
  const names = new Map<string, string>();
  if (wanted.size === 0) return names;
  for (const u of await listAllAuthUsers(admin)) {
    if (wanted.has(u.id)) names.set(u.id, displayName(u.user_metadata, u.email));
  }
  return names;
}
