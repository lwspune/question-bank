/** The page's read, with the service-role client. The page is superadmin-gated. */
import "server-only";
import { createTypedAdminClient } from "@/lib/supabase/admin";
import { fetchExamFeatures } from "./query";
import type { CoverageResult } from "./build";

export async function getExamFeatures(): Promise<CoverageResult> {
  return fetchExamFeatures(createTypedAdminClient());
}
