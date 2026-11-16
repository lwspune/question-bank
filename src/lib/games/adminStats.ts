/** The page's read, with the service-role client. The page is superadmin-gated. */
import "server-only";
import { createTypedAdminClient } from "@/lib/supabase/admin";
import { fetchGames } from "./query";

export async function getGames() {
  return fetchGames(createTypedAdminClient());
}
