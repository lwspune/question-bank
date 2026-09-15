/**
 * `server-only` wrapper for the taxonomy-link read: supplies the service-role
 * client and nothing else. Logic lives in taxonomyQuery.ts so `npm run
 * perf:smoke` can drive it outside Next — the same split as service.ts <-
 * query.ts.
 *
 * Service-role is not strictly required here (taxonomy is global and readable
 * by anon), but the caller already holds an admin client for this page and a
 * second client per render buys nothing.
 *
 * FAILS SOFT. Only the links depend on this; every number on the page comes
 * from the RPC. A taxonomy read that throws must not blank a diagnosis, so the
 * error is logged at this boundary and an empty map returned.
 */
import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { fetchTaxonomyLinks } from "./taxonomyQuery";
import { EMPTY_TAXONOMY_LINKS, type TaxonomyLinks } from "./links";

export async function getTaxonomyLinks(
  examName: string,
  subjectName: string
): Promise<TaxonomyLinks> {
  try {
    return await fetchTaxonomyLinks(createSupabaseAdminClient(), examName, subjectName);
  } catch (err) {
    console.error("getTaxonomyLinks failed; rendering without topic links", err);
    return EMPTY_TAXONOMY_LINKS;
  }
}
