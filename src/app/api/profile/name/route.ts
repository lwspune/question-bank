/**
 * PATCH /api/profile/name — the name /me greets a student by ("Not you?").
 *
 * Stored as user_metadata.preferred_name on the student's OWN auth record (their
 * session client, so no service role), not over full_name: the account name can
 * be a parent's, and a Google sign-in rewrites full_name. An empty name clears
 * it, falling back to the account name. Validated with the same rule as a name
 * shown on the results page (letters and spaces, 2-60 characters).
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isShowableName } from "@/lib/results/check";

const BodySchema = z.object({ name: z.string().max(80) });

export async function PATCH(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const parsed = BodySchema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const name = parsed.data.name.trim().replace(/\s+/g, " ");
  if (name !== "" && !isShowableName(name)) {
    return NextResponse.json({ error: "Use letters and spaces only, 2 to 60 characters." }, { status: 400 });
  }

  const { error } = await createSupabaseServerClient().auth.updateUser({
    data: { preferred_name: name === "" ? null : name },
  });
  if (error) {
    console.error("preferred name save", error.message);
    return NextResponse.json({ error: "Could not save your name." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
