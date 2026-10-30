import "server-only";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { loadEntitlements, userHasAccess } from "./query";
import { hasActiveScope } from "./access";

/**
 * True if the signed-in viewer holds an active grant covering `scope`.
 * Reads through the viewer's own RLS-bound client. False when signed out.
 */
export async function sessionHasScope(scope: string): Promise<boolean> {
  const user = await getSessionUser();
  if (!user) return false;
  return userHasAccess(createSupabaseServerClient(), user.id, scope);
}

/** True if the signed-in viewer holds a grant covering ANY of `scopes` (a site-level pass check). */
export async function sessionHasAnyScope(scopes: readonly string[]): Promise<boolean> {
  const user = await getSessionUser();
  if (!user) return false;
  const rows = await loadEntitlements(createSupabaseServerClient(), user.id);
  const now = Date.now();
  return scopes.some((s) => hasActiveScope(rows, s, now));
}
