/**
 * Pure helpers for resolving the viewer of a PUBLIC page in one pass.
 *
 * `/browse` is the site's most-visited route and is overwhelmingly anon. It used
 * to answer "who is this?" three separate times per request (org member, signed-in
 * user, superadmin), each opening its own Supabase client and each awaiting its
 * own `auth.getUser()`, sequentially. These two functions let the impure resolver
 * in `auth.ts` do it once — and skip it altogether when the request carries no
 * Supabase auth cookie, which no anon request ever does.
 *
 * Kept separate from `auth.ts` (which imports `next/headers`) so the decision
 * logic is unit-testable without a request scope.
 */

/** The three booleans a public page needs about its viewer. */
export type PageIdentity = {
  /** Any authenticated account — self-serve student OR org staff. */
  isSignedIn: boolean;
  /** Org member (ADMIN or TEACHER) — unlocks paper-builder affordances. */
  isStaff: boolean;
  /** Platform superadmin — the only identity that may edit question content. */
  canEditContent: boolean;
};

export const ANON_IDENTITY: PageIdentity = {
  isSignedIn: false,
  isStaff: false,
  canEditContent: false,
};

/**
 * Does this cookie name look like a Supabase auth cookie?
 *
 * DELIBERATELY PERMISSIVE — it matches the chunked `.0`/`.1` halves of a large
 * session and the mid-OAuth `-code-verifier` too. The asymmetry is the point: a
 * false positive costs one wasted lookup that returns null anyway, while a false
 * negative would silently downgrade a signed-in staff member to anon and strip
 * their affordances. When in doubt, say yes and let the real auth call decide.
 */
export function isSupabaseAuthCookieName(name: string): boolean {
  return name.startsWith("sb-") && name.includes("auth-token");
}

/**
 * True when the request MIGHT carry a session. Reading cookie names is free;
 * `auth.getUser()` is not — so this is the cheap gate in front of it.
 */
export function hasSupabaseAuthCookie(cookieNames: readonly string[]): boolean {
  return cookieNames.some(isSupabaseAuthCookieName);
}

/**
 * Map the raw lookup results onto the page's three booleans.
 *
 * Note the two axes are INDEPENDENT (migration 0056): a superadmin lives in
 * `platform_admins` and need not hold an `org_members` row, so `canEditContent`
 * must not be derived from `isStaff` or vice versa. No user ⇒ nothing granted,
 * whatever the other flags say.
 */
export function deriveIdentity(input: {
  hasUser: boolean;
  isOrgMember: boolean;
  isSuperadmin: boolean;
}): PageIdentity {
  if (!input.hasUser) return ANON_IDENTITY;
  return {
    isSignedIn: true,
    isStaff: input.isOrgMember,
    canEditContent: input.isSuperadmin,
  };
}
