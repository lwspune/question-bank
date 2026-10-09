import { createClient } from "@supabase/supabase-js";
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
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: buildFetch() },
    }
  );
}
