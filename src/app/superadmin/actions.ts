"use server";

/**
 * Server actions for the superadmin console. Every action is gated by
 * requireSuperadmin (throws 401/403 otherwise); the underlying helpers use the
 * service-role client because the superadmin legitimately crosses org
 * boundaries. Member provisioning reuses the org-scoped members helpers with an
 * explicit target orgId.
 */
import { revalidatePath } from "next/cache";
import { requireSuperadmin, HttpError } from "@/lib/auth";
import {
  createOrg,
  deleteOrg,
  listOrgsWithStats,
  renameOrg,
  type OrgStat,
} from "@/lib/superadmin/admin";
import { createMember, updateMemberRole, type MemberRole } from "@/lib/members/admin";
import {
  setTeacherAccessRequestStatus,
  type TeacherRequestStatus,
} from "@/lib/teacherAccess/service";
import {
  setContactMessageStatus,
  type ContactMessageStatus,
} from "@/lib/contact/service";

type Err = { ok: false; error: string };
type Result<T = unknown> = ({ ok: true } & T) | Err;

async function gate(): Promise<Err | null> {
  try {
    await requireSuperadmin();
    return null;
  } catch (e) {
    if (e instanceof HttpError) return { ok: false, error: e.message };
    return { ok: false, error: "Not authorized." };
  }
}

export async function listOrgsAction(): Promise<Result<{ orgs: OrgStat[] }>> {
  const denied = await gate();
  if (denied) return denied;
  try {
    return { ok: true, orgs: await listOrgsWithStats() };
  } catch (e) {
    return { ok: false, error: msg(e) };
  }
}

export async function createOrgAction(name: string): Promise<Result<{ id: string }>> {
  const denied = await gate();
  if (denied) return denied;
  const res = await createOrg(name);
  if (!res.ok) return res;
  revalidatePath("/superadmin");
  return { ok: true, id: res.id };
}

export async function createOrgMemberAction(input: {
  orgId: string;
  email: string;
  password: string;
  name: string;
  role: MemberRole;
}): Promise<Result<{ userId: string; linked: boolean }>> {
  const denied = await gate();
  if (denied) return denied;
  // Superadmin may promote an existing account (staff often sign up as students
  // first). createMember links it WITHOUT touching its password.
  const result = await createMember(
    input.orgId,
    {
      email: input.email,
      password: input.password,
      name: input.name,
      role: input.role,
    },
    { linkExistingAccount: true }
  );
  switch (result.kind) {
    case "ok":
      revalidatePath("/superadmin");
      return { ok: true, userId: result.userId, linked: result.linked };
    case "invalid_email":
      return { ok: false, error: "Email looks invalid." };
    case "invalid_password":
      return { ok: false, error: "Password must be at least 8 characters." };
    case "invalid_name":
      return { ok: false, error: "Name is required." };
    case "invalid_role":
      return { ok: false, error: "Role must be ADMIN or TEACHER." };
    case "already_member":
      return { ok: false, error: "This email is already a member of an org." };
    case "email_taken_other_org":
      return { ok: false, error: "This email already belongs to another org's member." };
    case "email_has_account":
      return { ok: false, error: "This email already has a login." };
    case "error":
      return { ok: false, error: result.message };
  }
}

export async function setTeacherRequestStatusAction(
  id: string,
  status: TeacherRequestStatus
): Promise<Result> {
  const denied = await gate();
  if (denied) return denied;
  const res = await setTeacherAccessRequestStatus(id, status);
  if (!res.ok) return res;
  revalidatePath("/superadmin");
  return { ok: true };
}

export async function setContactMessageStatusAction(
  id: string,
  status: ContactMessageStatus
): Promise<Result> {
  const denied = await gate();
  if (denied) return denied;
  const res = await setContactMessageStatus(id, status);
  if (!res.ok) return res;
  revalidatePath("/superadmin");
  return { ok: true };
}

function msg(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

export async function renameOrgAction(orgId: string, name: string): Promise<Result> {
  const denied = await gate();
  if (denied) return denied;
  const res = await renameOrg(orgId, name);
  if (!res.ok) return res;
  revalidatePath("/superadmin/orgs");
  revalidatePath(`/superadmin/orgs/${orgId}`);
  return { ok: true };
}

export async function deleteOrgAction(orgId: string, typedName: string): Promise<Result> {
  const denied = await gate();
  if (denied) return denied;
  const res = await deleteOrg(orgId, typedName);
  if (!res.ok) return res;
  revalidatePath("/superadmin/orgs");
  return { ok: true };
}

export async function setMemberRoleAction(input: {
  orgId: string;
  userId: string;
  role: MemberRole;
}): Promise<Result> {
  let callerId: string;
  try {
    callerId = (await requireSuperadmin()).id;
  } catch (e) {
    return { ok: false, error: e instanceof HttpError ? e.message : "Not authorized." };
  }
  const res = await updateMemberRole(input.orgId, callerId, input.userId, input.role);
  switch (res.kind) {
    case "ok":
      revalidatePath(`/superadmin/orgs/${input.orgId}`);
      return { ok: true };
    case "would_remove_last_admin":
      return { ok: false, error: "This is the org's only admin. Make someone else admin first." };
    case "cannot_change_own_role":
      return { ok: false, error: "You can't change your own role here." };
    case "not_member":
      return { ok: false, error: "That person is no longer a member." };
    case "invalid_role":
      return { ok: false, error: "Role must be Admin or Teacher." };
    case "error":
      return { ok: false, error: res.message };
  }
}
