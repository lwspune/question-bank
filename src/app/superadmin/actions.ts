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
import { createOrg, listOrgsWithStats, type OrgStat } from "@/lib/superadmin/admin";
import { createMember, type MemberRole } from "@/lib/members/admin";
import {
  setTeacherAccessRequestStatus,
  type TeacherRequestStatus,
} from "@/lib/teacherAccess/service";

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
}): Promise<Result<{ userId: string }>> {
  const denied = await gate();
  if (denied) return denied;
  const result = await createMember(input.orgId, {
    email: input.email,
    password: input.password,
    name: input.name,
    role: input.role,
  });
  switch (result.kind) {
    case "ok":
      revalidatePath("/superadmin");
      return { ok: true, userId: result.userId };
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

function msg(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}
