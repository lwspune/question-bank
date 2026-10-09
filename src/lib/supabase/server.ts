import { createClient } from "@supabase/supabase-js";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { buildFetch } from "./buildFetch";

type CookieToSet = { name: string; value: string; options?: CookieOptions };

/**
 * Anon Supabase client with NO cookie binding. Use for fully public reads
 * (e.g. /notes pages) where the page should be cacheable via `revalidate`.
 * Cookie-aware clients force dynamic rendering on every request.
 *
 * Both clients here route through the shared build fetch DURING `next build`
 * (a cap on requests in flight + a deadline, lib/supabase/buildFetch); live,
 * `global.fetch` is undefined and supabase-js uses its own.
 */
export function createSupabaseAnonClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false }, global: { fetch: buildFetch() } }
  );
}

export function createSupabaseServerClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: { fetch: buildFetch() },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component where cookies are read-only.
            // The middleware refreshes the session cookie, so this can be ignored.
          }
        },
      },
    }
  );
}
