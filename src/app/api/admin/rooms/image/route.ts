/**
 * POST /api/admin/rooms/image: upload a picture for a team circle post
 * (migration 0295). Superadmin only, checked first. Multipart: `slug` + `file`.
 * The type is read from the file's bytes (PNG or JPEG, at most 1 MB); it lands
 * at circles/<slug>/<uuid>.<ext> in the public question-images bucket, and the
 * post that names it is saved by POST /api/admin/rooms { action: "post" }.
 */
import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { requireSuperadmin, HttpError } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { BUCKET, publicImageUrl } from "@/lib/storage/imageUrl";
import { checkTeamImage, teamImagePath, TEAM_IMAGE_MAX_BYTES } from "@/lib/rooms/teamImage";

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export async function POST(request: NextRequest) {
  try {
    await requireSuperadmin();
    const form = await request.formData().catch(() => null);
    const slug = String(form?.get("slug") ?? "");
    const file = form?.get("file");
    if (!SLUG_RE.test(slug) || slug.length > 60 || !(file instanceof File)) {
      return NextResponse.json({ error: "Choose a circle and a picture." }, { status: 400 });
    }
    if (file.size > TEAM_IMAGE_MAX_BYTES) {
      return NextResponse.json({ error: "The picture must be 1 MB or smaller. Save it as a JPEG to make it smaller." }, { status: 400 });
    }
    const bytes = new Uint8Array(await file.arrayBuffer());
    const check = checkTeamImage(bytes.subarray(0, 16), bytes.length);
    if (!check.ok) return NextResponse.json({ error: check.error }, { status: 400 });

    const path = teamImagePath(slug, randomUUID(), check.ext);
    const db = createSupabaseAdminClient();
    const { error } = await db.storage.from(BUCKET).upload(path, bytes, { contentType: check.contentType, upsert: false });
    if (error) throw new Error(error.message);
    return NextResponse.json({ path, url: publicImageUrl(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "", path) });
  } catch (err) {
    if (err instanceof HttpError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("rooms image upload failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Could not upload the picture." }, { status: 500 });
  }
}
