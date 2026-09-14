/**
 * Shared pure helpers for rendering a user's identity. No I/O — unit-tested in
 * tests/students-derive.test.ts. Used by the /dashboard/students roster plus the
 * mocks and feedback admin readouts, which all need the same name/provider
 * display rules.
 */

export type UserMeta = { full_name?: string; name?: string } | null | undefined;

/** Friendly sign-in method. A password signup carries provider 'email' (or none). */
export function providerLabel(provider: string | null | undefined): string {
  if (!provider || provider === "email") return "Email";
  if (provider === "google") return "Google";
  return provider.charAt(0).toUpperCase() + provider.slice(1);
}

/** Display name from OAuth metadata (Google carries full_name), else the email.
 *  ~26% of self-serve students (email/password signups) have no name. */
export function displayName(meta: UserMeta, email: string | null): string {
  const n = (meta?.full_name ?? meta?.name ?? "").trim();
  return n || email || "(no name)";
}
