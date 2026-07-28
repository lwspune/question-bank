import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  hasSupabaseAuthCookie,
  deriveIdentity,
  ANON_IDENTITY,
  type PageIdentity,
} from "@/lib/auth-identity";

export type { PageIdentity };

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export type SessionUser = {
  id: string;
  email: string;
};

export type SessionMember = {
  user: SessionUser;
  orgId: string;
  orgName: string;
  role: "ADMIN" | "TEACHER";
};

export async function getSessionUser(): Promise<SessionUser | null> {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !user.email) return null;
  return { id: user.id, email: user.email };
}

export async function getSessionMember(): Promise<SessionMember | null> {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !user.email) return null;

  const { data: membership } = await supabase
    .from("org_members")
    .select("role, org:organizations(id, name)")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!membership || !membership.org) return null;

  const org = Array.isArray(membership.org) ? membership.org[0] : membership.org;
  return {
    user: { id: user.id, email: user.email },
    orgId: org.id,
    orgName: org.name,
    role: membership.role as "ADMIN" | "TEACHER",
  };
}

/**
 * Resolve the viewer of a PUBLIC page in a single pass.
 *
 * Replaces the `getSessionMember()` + `getSessionUser()` + `getSessionSuperadmin()`
 * trio that `/browse` used to await sequentially — three Supabase clients and
 * three `auth.getUser()` calls per request, on the site's busiest and most
 * anon-heavy route. Here: one cookie sniff (free) short-circuits anon entirely,
 * then one `getUser()` and the two membership lookups run in parallel.
 *
 * Use this on public pages that only need the three booleans. Pages that need the
 * org id/name/role still want `getSessionMember()`.
 */
export async function getPageIdentity(): Promise<PageIdentity> {
  // No Supabase cookie ⇒ no session ⇒ nothing to ask Supabase about. This is the
  // path the overwhelming majority of /browse traffic takes.
  if (!hasSupabaseAuthCookie(cookies().getAll().map((c) => c.name))) {
    return ANON_IDENTITY;
  }

  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !user.email) return ANON_IDENTITY;

  const [{ data: membership }, superadmin] = await Promise.all([
    supabase
      .from("org_members")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle(),
    isSuperadmin(user.id),
  ]);

  return deriveIdentity({
    hasUser: true,
    isOrgMember: !!membership,
    isSuperadmin: superadmin,
  });
}

export async function requireAdmin(): Promise<SessionMember> {
  const member = await getSessionMember();
  if (!member) throw new HttpError(401, "Not signed in");
  if (member.role !== "ADMIN") throw new HttpError(403, "Admin access required");
  return member;
}

/**
 * Platform superadmin — the ONLY identity allowed to add or edit question
 * CONTENT (questions/options/taxonomy/tags/uploads), across all orgs. Distinct
 * from org membership (a superadmin need not be an org_members row). Identity
 * lives in `platform_admins` (migration 0056), a locked table readable only via
 * the service-role client here + the SECURITY DEFINER RLS helper.
 */
export async function isSuperadmin(userId: string): Promise<boolean> {
  const admin = createSupabaseAdminClient();
  const { data } = await admin
    .from("platform_admins")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();
  return !!data;
}

/** The signed-in user IF they're a platform superadmin, else null. */
export async function getSessionSuperadmin(): Promise<SessionUser | null> {
  const user = await getSessionUser();
  if (!user) return null;
  return (await isSuperadmin(user.id)) ? user : null;
}

/** Guard for content add/edit routes — superadmin only. */
export async function requireSuperadmin(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) throw new HttpError(401, "Not signed in");
  if (!(await isSuperadmin(user.id))) {
    throw new HttpError(403, "Only the platform admin can add or edit content.");
  }
  return user;
}

/**
 * Editor = ADMIN or TEACHER. Both can edit question content (text,
 * options, taxonomy moves, tags, images, leave-set, audit-stamped saves).
 * INSERT, DELETE, upload, taxonomy auto-create, visibility flip, reports
 * triage, and member management remain admin-only and use `requireAdmin`.
 */
export async function requireEditor(): Promise<SessionMember> {
  const member = await getSessionMember();
  if (!member) throw new HttpError(401, "Not signed in");
  if (member.role !== "ADMIN" && member.role !== "TEACHER") {
    throw new HttpError(403, "Editor access required");
  }
  return member;
}
