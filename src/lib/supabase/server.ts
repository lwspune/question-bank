import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/db";
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
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, anonOptions());
}

/**
 * The same anon client, typed from the schema (src/types/db.ts, TECH_DEBT_SPEC.md 3.3): rows come
 * back with their real column types instead of `any`. Use it for new code.
 */
export function createTypedAnonClient() {
  return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, anonOptions());
}

function anonOptions() {
  return { auth: { persistSession: false }, global: { fetch: buildFetch() } };
}

export function createSupabaseServerClient() {
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, serverOptions());
}

/**
 * The same signed-in client, typed from the schema (src/types/db.ts). Use it for new code.
 * The return type comes from supabase-js: @supabase/ssr 0.5.2's own generics predate the
 * generated types' format and turn every row into `never` (tests/db-types.test.ts caught it).
 */
export function createTypedServerClient(): SupabaseClient<Database> {
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, serverOptions());
}

function serverOptions() {
  // Next 16: cookies() returns a promise; the callbacks await it, so the factories above stay
  // synchronous for their callers. It is CALLED here, at creation, on purpose: outside a request
  // it throws right away, where the caller's try/catch sees it, as before Next 16. Called inside
  // the callbacks, the same error surfaced later as an unhandled rejection (TECH_DEBT_SPEC.md 4.1).
  const cookieStore = cookies();
  return {
    global: { fetch: buildFetch() },
    cookies: {
      async getAll() {
        return (await cookieStore).getAll();
      },
      async setAll(cookiesToSet: CookieToSet[]) {
        try {
          const store = await cookieStore;
          cookiesToSet.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // Called from a Server Component where cookies are read-only.
          // The middleware refreshes the session cookie, so this can be ignored.
        }
      },
    },
  };
}
