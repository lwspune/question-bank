/**
 * Superadmin cross-org helpers (service-role). The platform superadmin manages
 * every org from one console: see all orgs, onboard a new one, and provision its
 * admins/teachers. Guarded by requireSuperadmin at the action/route layer; these
 * use the service-role client because they legitimately cross org boundaries
 * (RLS scopes normal users to a single org).
 *
 * Member provisioning reuses members/admin.ts (createMember/listMembers already
 * take an explicit orgId) — here the superadmin may target ANY org.
 */
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export type OrgStat = {
  id: string;
  name: string;
  memberCount: number;
  adminCount: number;
  questionCount: number;
};

/** Every org with member + PUBLIC-question counts, name-sorted. Service-role. */
export async function listOrgsWithStats(): Promise<OrgStat[]> {
  const admin = createSupabaseAdminClient();
  const { data: orgs, error } = await admin
    .from("organizations")
    .select("id, name")
    .order("name");
  if (error) throw new Error(`listOrgsWithStats: ${error.message}`);

  // org_members is small (staff only) — count in memory.
  const { data: members } = await admin.from("org_members").select("org_id, role");
  const total = new Map<string, number>();
  const admins = new Map<string, number>();
  for (const m of (members ?? []) as { org_id: string; role: string }[]) {
    total.set(m.org_id, (total.get(m.org_id) ?? 0) + 1);
    if (m.role === "ADMIN") admins.set(m.org_id, (admins.get(m.org_id) ?? 0) + 1);
  }

  const out: OrgStat[] = [];
  for (const o of (orgs ?? []) as { id: string; name: string }[]) {
    // count:"exact" head — cap-safe (not a row-derived count).
    const { count } = await admin
      .from("questions")
      .select("id", { count: "exact", head: true })
      .eq("org_id", o.id);
    out.push({
      id: o.id,
      name: o.name,
      memberCount: total.get(o.id) ?? 0,
      adminCount: admins.get(o.id) ?? 0,
      questionCount: count ?? 0,
    });
  }
  return out;
}

export type CreateOrgResult = { ok: true; id: string } | { ok: false; error: string };

/** Onboard a new org (tenant). Service-role. */
export async function createOrg(name: string): Promise<CreateOrgResult> {
  const clean = name.trim();
  if (!clean) return { ok: false, error: "Give the organization a name." };
  if (clean.length > 120) return { ok: false, error: "Name is too long (max 120)." };
  const admin = createSupabaseAdminClient();
  // Guard against a duplicate name (case-insensitive) — org names should be distinct.
  const { data: existing } = await admin
    .from("organizations")
    .select("id")
    .ilike("name", clean)
    .maybeSingle();
  if (existing) return { ok: false, error: "An organization with that name already exists." };
  const { data, error } = await admin
    .from("organizations")
    .insert({ name: clean })
    .select("id")
    .single();
  if (error) return { ok: false, error: error.message };
  return { ok: true, id: data.id as string };
}
