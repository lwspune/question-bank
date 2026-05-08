import { createSupabaseServerClient } from "@/lib/supabase/server";

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
