/**
 * Pure predicates for the global-teardown sweep. Extracted so they can be
 * unit-tested without a live DB.
 *
 * Every integration test creates throwaway rows under a throwaway org whose
 * name carries an 8-hex run-id token (`randomUUID().slice(0, 8)`), e.g.
 * "Resolver Org fd90dd5f", "EditSetOrg_3e39bcfa", "UpDelete Org A da693ef2".
 * That run-id token is the robust, content-independent signal for "this is
 * test data" — it survives even when the fixture itself uses a real sha256
 * content_hash and sits under canonical taxonomy (the upload-flow fixtures).
 *
 * The token is matched only as a STANDALONE word (bounded by start/end,
 * whitespace, or underscore) so a real name can't trip it by coincidentally
 * containing 8 consecutive hex letters mid-word.
 */

/** Real orgs that must NEVER be swept, even if their name somehow matched. */
export const REAL_ORG_NAMES: ReadonlySet<string> = new Set(["LWS Pune"]);

/** A standalone 8-hex run-id token (the `randomUUID().slice(0,8)` tests embed). */
const RUN_ID_TOKEN = /(^|[\s_])[0-9a-f]{8}([\s_]|$)/;

/** True when a name embeds a test run-id token. */
export function hasRunIdToken(name: string): boolean {
  return RUN_ID_TOKEN.test(name.trim());
}

/** True for a throwaway test organization (run-id token, never a real org). */
export function isTestOrgName(name: string): boolean {
  const n = name.trim();
  if (REAL_ORG_NAMES.has(n)) return false;
  return hasRunIdToken(n);
}

/**
 * True for a test-created taxonomy node (subject/chapter/subtopic). Test
 * taxonomy is global (no org_id) so it can't cascade from the org sweep; it's
 * matched by the same run-id token. Canonical taxonomy ("Mathematics",
 * "Optics (Ray)", "Chemical Thermodynamics") never carries one.
 */
export function isTestTaxonomyName(name: string): boolean {
  return hasRunIdToken(name);
}

/**
 * True for a throwaway test auth user. Tests create users with `admin.auth`
 * under the reserved, non-routable `@test.local` domain (e.g.
 * "edit-set-admin-3e39bcfa@test.local") — a real signup never uses it. The
 * org cascade clears `org_members` but NOT the `auth.users` row behind it, so
 * these are swept separately by email domain.
 */
export function isTestAuthEmail(email: string | null | undefined): boolean {
  return typeof email === "string" && email.trim().toLowerCase().endsWith("@test.local");
}
