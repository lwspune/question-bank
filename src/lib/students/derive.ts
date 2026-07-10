/**
 * Pure helpers for the /dashboard/students roster. No I/O — unit-tested in
 * tests/students-derive.test.ts. `admin.ts` supplies the auth users + the staff
 * id set; this filters org staff out (students are auth.users with no
 * org_members row) and shapes the display rows.
 */

export type AuthUserLite = {
  id: string;
  email: string | null;
  created_at: string;
  app_metadata?: { provider?: string } | null;
};

export type StudentRow = {
  id: string;
  email: string;
  createdAt: string;
  provider: string;
};

/** Friendly sign-in method. A password signup carries provider 'email' (or none). */
export function providerLabel(provider: string | null | undefined): string {
  if (!provider || provider === "email") return "Email";
  if (provider === "google") return "Google";
  return provider.charAt(0).toUpperCase() + provider.slice(1);
}

/** Students = auth users NOT in the staff (org_members) set, newest signup first. */
export function deriveStudents(users: AuthUserLite[], staffIds: Set<string>): StudentRow[] {
  return users
    .filter((u) => !staffIds.has(u.id))
    .map((u) => ({
      id: u.id,
      email: u.email ?? "(no email)",
      createdAt: u.created_at,
      provider: providerLabel(u.app_metadata?.provider),
    }))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
