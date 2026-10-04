import "server-only";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasFreeDownloadLeft } from "./freeDownload";

/**
 * Whether the signed-in caller still has their one free download (server
 * pages only; reads cookies). Kept apart from freeDownload.ts so the pure-ish
 * helpers stay importable from tests without a request scope.
 */
export async function sessionFreeDownloadLeft(): Promise<boolean> {
  const user = await getSessionUser();
  if (!user) return false;
  return hasFreeDownloadLeft(createSupabaseServerClient(), user.id);
}
