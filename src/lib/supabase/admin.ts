import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/db";
import { buildFetch } from "./buildFetch";

/**
 * Service-role client. Bypasses RLS — never import in client code.
 * Use only from server-only contexts (route handlers, server actions, scripts).
 *
 * During `next build` its requests go through the shared build fetch (a cap
 * on requests in flight + a deadline); live, `global.fetch` is undefined and
 * supabase-js uses its own.
 */
export function createSupabaseAdminClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceRoleKey(), adminOptions());
}

/** The same service-role client, typed from the schema (src/types/db.ts). Use it for new code. */
export function createTypedAdminClient() {
  return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceRoleKey(), adminOptions());
}

function serviceRoleKey(): string {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }
  return process.env.SUPABASE_SERVICE_ROLE_KEY;
}

function adminOptions() {
  return { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: buildFetch() } };
}
