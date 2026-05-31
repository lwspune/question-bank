import { NextResponse, type NextRequest } from "next/server";
import { requireAdmin, HttpError } from "@/lib/auth";
import {
  grantEntitlement,
  listEntitlements,
  revokeEntitlement,
} from "@/lib/entitlements/admin";
import { SCOPE_ALL } from "@/lib/entitlements/access";

export const maxDuration = 30;

type Body =
  | { action: "list" }
  | {
      action: "grant";
      email: string;
      scope?: string;
      expiresAt?: string | null;
      note?: string | null;
    }
  | { action: "revoke"; id: string };

export async function POST(request: NextRequest) {
  try {
    const member = await requireAdmin();
    const body = (await request.json().catch(() => null)) as Body | null;
    if (!body || typeof body !== "object" || !("action" in body)) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    switch (body.action) {
      case "list": {
        const result = await listEntitlements();
        if (result.kind === "error") return err500(result.message);
        return NextResponse.json({ ok: true, rows: result.rows });
      }
      case "grant": {
        const result = await grantEntitlement({
          email: body.email,
          scope: body.scope ?? SCOPE_ALL,
          expiresAt: body.expiresAt ?? null,
          note: body.note ?? null,
          grantedBy: member.user.id,
        });
        switch (result.kind) {
          case "ok":
            return NextResponse.json({ ok: true, id: result.id });
          case "invalid":
            return bad(result.message);
          case "user_not_found":
            return NextResponse.json(
              {
                error:
                  "No account for that email. Ask the student to sign up first, then grant access.",
              },
              { status: 404 }
            );
          case "error":
            return err500(result.message);
        }
        break;
      }
      case "revoke": {
        const result = await revokeEntitlement(body.id);
        switch (result.kind) {
          case "ok":
            return NextResponse.json({ ok: true });
          case "not_found":
            return NextResponse.json(
              { error: "Entitlement not found" },
              { status: 404 }
            );
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
    console.error("admin entitlements route error", err);
    return err500("internal error");
  }
}

function bad(msg: string) {
  return NextResponse.json({ error: msg }, { status: 400 });
}
function err500(msg: string) {
  console.error("admin entitlements error:", msg);
  return NextResponse.json({ error: "internal error" }, { status: 500 });
}
