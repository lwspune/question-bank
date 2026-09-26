import "server-only";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { userHasAccess } from "./query";

/**
 * True if the signed-in viewer holds an active grant covering `scope`.
 * Reads through the viewer's own RLS-bound client. False when signed out.
 */
export async function sessionHasScope(scope: string): Promise<boolean> {
  const user = await getSessionUser();
  if (!user) return false;
  return userHasAccess(createSupabaseServerClient(), user.id, scope);
}
