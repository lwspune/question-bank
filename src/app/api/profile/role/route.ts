/**
 * /api/profile/role: "Are you a teacher or a student?" (migration 0258).
 *
 * GET ?box=<download box>: should this box ask? `{ ask: true }` only for a
 * signed-in account that is not staff (institute member or platform admin)
 * and has not answered yet. When it says yes it records the question as seen,
 * once per box per day: the answer rate's denominator.
 *
 * POST { role, box }: save the answer to the student's OWN profile row through
 * their JWT (RLS own-row, 0045). The database refuses any value other than
 * teacher or student (0258's CHECK), and so does the parser before it.
 *
 * Every response is `{ ask }`, `{ ok: true }` or `{ error }`.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSuperadmin } from "@/lib/auth";
import { getOwnUserRole, updateOwnProfile } from "@/lib/profile/service";
import { isDownloadBox, parseRoleAnswer, roleQuestionShownEvent, shouldAskRole } from "@/lib/profile/userRole";
import { logActivityOnce } from "@/lib/activity/service";

type Db = ReturnType<typeof createSupabaseServerClient>;

/** Institute member or platform admin: never asked. */
async function isStaffAccount(db: Db, userId: string): Promise<boolean> {
  const [{ data: membership }, superadmin] = await Promise.all([
    db.from("org_members").select("user_id").eq("user_id", userId).maybeSingle(),
    isSuperadmin(userId),
  ]);
  return !!membership || superadmin;
}

export async function GET(request: NextRequest) {
  const box = request.nextUrl.searchParams.get("box");
  if (!isDownloadBox(box)) return NextResponse.json({ error: "Unknown box." }, { status: 400 });

  const db = createSupabaseServerClient();
  const { data } = await db.auth.getUser();
  if (!data.user) return NextResponse.json({ ask: false });
  const userId = data.user.id;

  try {
    const [isStaff, role] = await Promise.all([isStaffAccount(db, userId), getOwnUserRole(db, userId)]);
    const ask = shouldAskRole({ signedIn: true, isStaff, role });
    if (ask) await logActivityOnce(db, userId, roleQuestionShownEvent(userId, box, new Date()));
    return NextResponse.json({ ask });
  } catch (e) {
    console.error("role question read", e instanceof Error ? e.message : e);
    // Failing closed costs one unasked box; failing open could ask staff.
    return NextResponse.json({ ask: false });
  }
}

export async function POST(request: NextRequest) {
  const parsed = parseRoleAnswer(await request.json().catch(() => null));
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const db = createSupabaseServerClient();
  const { data } = await db.auth.getUser();
  if (!data.user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  const userId = data.user.id;

  try {
    if (await isStaffAccount(db, userId)) {
      return NextResponse.json({ error: "Staff accounts are not asked." }, { status: 403 });
    }
    await updateOwnProfile(db, userId, { userRole: parsed.role });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("role question save", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "Could not save." }, { status: 500 });
  }
}
