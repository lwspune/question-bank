/**
 * Pure helpers for the /dashboard/students roster. No I/O — unit-tested in
 * tests/students-derive.test.ts. `admin.ts` supplies the auth users + the staff
 * id set; this filters org staff out (students are auth.users with no
 * org_members row) and shapes the display rows.
 */

export type UserMeta = { full_name?: string; name?: string } | null | undefined;

export type AuthUserLite = {
  id: string;
  email: string | null;
  created_at: string;
  app_metadata?: { provider?: string } | null;
  user_metadata?: UserMeta;
};

export type StudentRow = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  provider: string;
  /** Contact mobile captured post-signup (canonical 91XXXXXXXXXX), or null. */
  mobile: string | null;
};

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

/** Students = auth users NOT in the staff (org_members) set, newest signup first.
 *  `mobileById` maps user id → captured contact mobile (from student_profiles);
 *  absent ⇒ null (student hasn't given a number yet). */
export function deriveStudents(
  users: AuthUserLite[],
  staffIds: Set<string>,
  mobileById?: Map<string, string>
): StudentRow[] {
  return users
    .filter((u) => !staffIds.has(u.id))
    .map((u) => ({
      id: u.id,
      name: displayName(u.user_metadata, u.email),
      email: u.email ?? "(no email)",
      createdAt: u.created_at,
      provider: providerLabel(u.app_metadata?.provider),
      mobile: mobileById?.get(u.id) ?? null,
    }))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
