import "server-only";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isPaperFree } from "./freeDownload";
import { isFormulaSheetFree } from "./freeFormulaSheet";

/**
 * Whether `paperKey` is free for the signed-in caller (server pages only;
 * reads cookies). Kept apart from freeDownload.ts so the pure-ish helpers stay
 * importable from tests without a request scope.
 */
export async function sessionPaperFree(paperKey: string | null): Promise<boolean> {
  const user = await getSessionUser();
  if (!user) return false;
  return isPaperFree(createSupabaseServerClient(), user.id, paperKey);
}

/** Whether the formula sheet named by `sheetKey` is free for the signed-in caller (2026-10-10). */
export async function sessionFormulaSheetFree(sheetKey: string): Promise<boolean> {
  const user = await getSessionUser();
  if (!user) return false;
  return isFormulaSheetFree(createSupabaseServerClient(), user.id, sheetKey);
}
