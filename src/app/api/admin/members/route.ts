import { NextResponse, type NextRequest } from "next/server";
import { requireAdmin, HttpError } from "@/lib/auth";
import {
  createMember,
  listMembers,
  removeMember,
  resetMemberPassword,
  updateMemberRole,
  type MemberRole,
} from "@/lib/members/admin";

export const maxDuration = 30;

type Body =
  | { action: "list" }
  | { action: "create"; email: string; password: string; name: string; role: MemberRole }
  | { action: "reset"; userId: string; newPassword: string }
  | { action: "remove"; userId: string }
  | { action: "update_role"; userId: string; role: MemberRole };

export async function POST(request: NextRequest) {
  try {
    const member = await requireAdmin();
    const body = (await request.json().catch(() => null)) as Body | null;
    if (!body || typeof body !== "object" || !("action" in body)) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    switch (body.action) {
      case "list": {
        const result = await listMembers(member.orgId);
        if (result.kind === "error") return err500(result.message);
        return NextResponse.json({ ok: true, members: result.members });
      }
      case "create": {
        const result = await createMember(member.orgId, {
          email: body.email,
          password: body.password,
          name: body.name,
          role: body.role,
        });
        switch (result.kind) {
          case "ok":
            return NextResponse.json({ ok: true, userId: result.userId });
          case "invalid_email":
            return bad("Email looks invalid");
          case "invalid_password":
            return bad("Password must be at least 8 characters");
          case "invalid_name":
            return bad("Name is required");
          case "invalid_role":
            return bad("Role must be ADMIN or TEACHER");
          case "already_member":
            return conflict("This email is already a member of your org");
          case "email_taken_other_org":
            return conflict(
              "This email belongs to a member of another org — they can't be added here"
            );
          case "error":
            return err500(result.message);
        }
        break;
      }
      case "reset": {
        const result = await resetMemberPassword(
          member.orgId,
          body.userId,
          body.newPassword
        );
        switch (result.kind) {
          case "ok":
            return NextResponse.json({ ok: true });
          case "invalid_password":
            return bad("Password must be at least 8 characters");
          case "not_member":
            return NextResponse.json(
              { error: "Member not found in your org" },
              { status: 404 }
            );
          case "error":
            return err500(result.message);
        }
        break;
      }
      case "remove": {
        const result = await removeMember(
          member.orgId,
          member.user.id,
          body.userId
        );
        switch (result.kind) {
          case "ok":
            return NextResponse.json({ ok: true });
          case "not_member":
            return NextResponse.json(
              { error: "Member not found in your org" },
              { status: 404 }
            );
          case "cannot_remove_self":
            return forbidden("You can't remove yourself");
          case "would_remove_last_admin":
            return forbidden("Can't remove the last admin from this org");
          case "error":
            return err500(result.message);
        }
        break;
      }
      case "update_role": {
        const result = await updateMemberRole(
          member.orgId,
          member.user.id,
          body.userId,
          body.role
        );
        switch (result.kind) {
          case "ok":
            return NextResponse.json({ ok: true });
          case "invalid_role":
            return bad("Role must be ADMIN or TEACHER");
          case "not_member":
            return NextResponse.json(
              { error: "Member not found in your org" },
              { status: 404 }
            );
          case "cannot_change_own_role":
            return forbidden("You can't change your own role");
          case "would_remove_last_admin":
            return forbidden("Can't demote the last admin in this org");
          case "error":
            return err500(result.message);
        }
        break;
      }
      default:
        return bad("Unknown action");
    }
    return err500("unreachable");
  } catch (err) {
    if (err instanceof HttpError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("admin members route error", err);
    return err500("internal error");
  }
}

function bad(msg: string) {
  return NextResponse.json({ error: msg }, { status: 400 });
}
function forbidden(msg: string) {
  return NextResponse.json({ error: msg }, { status: 403 });
}
function conflict(msg: string) {
  return NextResponse.json({ error: msg }, { status: 409 });
}
function err500(msg: string) {
  console.error("admin members error:", msg);
  return NextResponse.json({ error: "internal error" }, { status: 500 });
}
