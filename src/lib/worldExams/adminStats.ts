/** The page's read, with the service-role client. The page is superadmin-gated. */
import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { fetchWorldExams } from "./query";

export async function getWorldExams() {
  return fetchWorldExams(createSupabaseAdminClient());
}
