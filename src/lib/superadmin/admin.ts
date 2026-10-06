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
import { listMembers, type MemberRow } from "@/lib/members/admin";

export type OrgStat = {
  id: string;
  name: string;
  memberCount: number;
  adminCount: number;
  questionCount: number;
  paperCount: number;
  batchCount: number;
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
    const [questions, papers, batches] = await Promise.all(
      (["questions", "papers", "batches"] as const).map((t) =>
        admin.from(t).select("id", { count: "exact", head: true }).eq("org_id", o.id)
      )
    );
    out.push({
      id: o.id,
      name: o.name,
      memberCount: total.get(o.id) ?? 0,
      adminCount: admins.get(o.id) ?? 0,
      questionCount: questions.count ?? 0,
      paperCount: papers.count ?? 0,
      batchCount: batches.count ?? 0,
    });
  }
  return out;
}

export type CreateOrgResult = { ok: true; id: string } | { ok: false; error: string };

/** Onboard a new org (tenant). Service-role. */
export async function createOrg(name: string): Promise<CreateOrgResult> {
  const clean = name.trim();
  const invalid = orgNameProblem(clean);
  if (invalid) return { ok: false, error: invalid };
  const admin = createSupabaseAdminClient();
  if (await nameTakenByOther(admin, clean, null)) {
    return { ok: false, error: "An organization with that name already exists." };
  }
  const { data, error } = await admin
    .from("organizations")
    .insert({ name: clean })
    .select("id")
    .single();
  if (error) return { ok: false, error: error.message };
  return { ok: true, id: data.id as string };
}

// ────────────────────────────────────────────────────────────────────
// rename / detail / delete (2026-10-06)
// ────────────────────────────────────────────────────────────────────

type AdminClient = ReturnType<typeof createSupabaseAdminClient>;
export type OrgResult = { ok: true } | { ok: false; error: string };

function orgNameProblem(clean: string): string | null {
  if (!clean) return "Give the organization a name.";
  if (clean.length > 120) return "Name is too long (max 120).";
  return null;
}

/** Case-insensitive: org names should be distinct. `selfId` may keep its own. */
async function nameTakenByOther(admin: AdminClient, clean: string, selfId: string | null) {
  // ilike treats % and _ as wildcards; escape them so "A_B" can't match "AxB".
  const pattern = clean.replace(/[\\%_]/g, (c) => `\\${c}`);
  const { data } = await admin.from("organizations").select("id").ilike("name", pattern);
  return (data ?? []).some((r) => r.id !== selfId);
}

async function loadOrg(admin: AdminClient, id: string) {
  const { data } = await admin
    .from("organizations")
    .select("id, name, created_at, deletion_protected")
    .eq("id", id)
    .maybeSingle<{ id: string; name: string; created_at: string; deletion_protected: boolean }>();
  return data;
}

/**
 * Rename an org. A protected org (migration 0135, the content org) is refused
 * here and again by its trigger: /api/sync/mock finds it BY NAME.
 */
export async function renameOrg(id: string, name: string): Promise<OrgResult> {
  const clean = name.trim();
  const invalid = orgNameProblem(clean);
  if (invalid) return { ok: false, error: invalid };
  const admin = createSupabaseAdminClient();
  const org = await loadOrg(admin, id);
  if (!org) return { ok: false, error: "Organization not found." };
  if (org.deletion_protected) {
    return { ok: false, error: `${org.name} is protected and cannot be renamed.` };
  }
  if (await nameTakenByOther(admin, clean, id)) {
    return { ok: false, error: "An organization with that name already exists." };
  }
  const { error } = await admin.from("organizations").update({ name: clean }).eq("id", id);
  if (error) {
    console.error("renameOrg:", error.message);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

export type OrgDetail = {
  id: string;
  name: string;
  createdAt: string;
  deletionProtected: boolean;
  adminCount: number;
  members: MemberRow[];
  counts: {
    questions: number;
    papers: number;
    batches: number;
    branches: number;
    /** Enrollments in this org's batches (a student in two batches counts twice). */
    enrollments: number;
    /** question_reports + concept_reports: both RESTRICT the org's delete. */
    reports: number;
  };
};

async function countWhere(admin: AdminClient, table: string, col: string, value: string) {
  const { count } = await admin
    .from(table)
    .select("*", { count: "exact", head: true })
    .eq(col, value);
  return count ?? 0;
}

/** One org with its members and what it owns. Service-role; null when missing. */
export async function getOrgDetail(id: string): Promise<OrgDetail | null> {
  const admin = createSupabaseAdminClient();
  const org = await loadOrg(admin, id);
  if (!org) return null;

  const [members, questions, papers, batches, branches, qReports, cReports, batchRows] =
    await Promise.all([
      listMembers(id),
      countWhere(admin, "questions", "org_id", id),
      countWhere(admin, "papers", "org_id", id),
      countWhere(admin, "batches", "org_id", id),
      countWhere(admin, "branches", "org_id", id),
      countWhere(admin, "question_reports", "org_id", id),
      countWhere(admin, "concept_reports", "org_id", id),
      admin.from("batches").select("id").eq("org_id", id),
    ]);
  if (members.kind === "error") throw new Error(`getOrgDetail: ${members.message}`);

  // An org has a handful of batches, so one .in() stays well under the URL limit.
  const batchIds = (batchRows.data ?? []).map((b) => b.id as string);
  let enrollments = 0;
  if (batchIds.length > 0) {
    const { count } = await admin
      .from("batch_enrollments")
      .select("*", { count: "exact", head: true })
      .in("batch_id", batchIds);
    enrollments = count ?? 0;
  }

  return {
    id: org.id,
    name: org.name,
    createdAt: org.created_at,
    deletionProtected: org.deletion_protected,
    adminCount: members.members.filter((m) => m.role === "ADMIN").length,
    members: members.members,
    counts: {
      questions,
      papers,
      batches,
      branches,
      enrollments,
      reports: qReports + cReports,
    },
  };
}

/**
 * Delete an org and everything it owns (papers, batches with their enrollments
 * and assignments, branches). Members lose staff access; their logins remain as
 * ordinary student accounts.
 *
 * Refused unless `typedName` matches exactly, the org is not protected (also
 * enforced by the 0135 trigger), it owns NO questions (a delete would cascade
 * them) and it has no reports (their foreign keys RESTRICT the delete; a clear
 * message beats a constraint error).
 */
export async function deleteOrg(id: string, typedName: string): Promise<OrgResult> {
  const admin = createSupabaseAdminClient();
  const org = await loadOrg(admin, id);
  if (!org) return { ok: false, error: "Organization not found." };
  if (typedName.trim() !== org.name) {
    return { ok: false, error: "Type the organization's name exactly to confirm." };
  }
  if (org.deletion_protected) {
    return { ok: false, error: `${org.name} is protected and cannot be deleted.` };
  }
  const questions = await countWhere(admin, "questions", "org_id", id);
  if (questions > 0) {
    return {
      ok: false,
      error: `${org.name} owns ${questions.toLocaleString()} question(s). Deleting it would delete them too.`,
    };
  }
  const reports =
    (await countWhere(admin, "question_reports", "org_id", id)) +
    (await countWhere(admin, "concept_reports", "org_id", id));
  if (reports > 0) {
    return { ok: false, error: `${org.name} has ${reports} report(s). Resolve or remove them first.` };
  }
  const { error } = await admin.from("organizations").delete().eq("id", id);
  if (error) {
    console.error("deleteOrg:", error.message);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

/** How many orgs exist, for the /superadmin link card. Head count, cap-safe. */
export async function countOrgs(): Promise<number> {
  const { count } = await createSupabaseAdminClient()
    .from("organizations")
    .select("id", { count: "exact", head: true });
  return count ?? 0;
}
