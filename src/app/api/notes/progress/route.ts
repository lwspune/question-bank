/**
 * POST /api/notes/progress — a signed-in student saves their OWN /notes progress
 * (bookmark, mark mastered, checkpoint score, or a last-viewed touch). Writes
 * their notes_progress row through the user's JWT (RLS own-row upsert, 0046).
 *
 * Body is validated + normalized by the pure sanitizeProgressWrite; a no-op
 * write is rejected so an empty row can't be created.
 */
import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { sanitizeProgressWrite } from "@/lib/notes/progress";
import { saveOwnProgress } from "@/lib/notes/progressService";
import { logActivityBatch } from "@/lib/activity/service";
import type { ActivityEvent } from "@/lib/activity/events";

export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = sanitizeProgressWrite(raw);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const db = createSupabaseServerClient();
    await saveOwnProgress(db, user.id, parsed.value);

    // Engagement spine (0052): only the meaningful learning events — a mastery
    // toggle and a completed checkpoint. Bookmark / last-viewed touches are too
    // noisy for the spine. Best-effort.
    const w = parsed.value;
    const events: ActivityEvent[] = [];
    if (w.mastered === true) {
      events.push({
        kind: "chapter_mastered",
        refId: w.subtopicSlug,
        refKind: "notes_subtopic",
        metadata: { chapterSlug: w.chapterSlug, subjectRoute: w.subjectRoute },
      });
    }
    if (w.checkpoint) {
      events.push({
        kind: "note_checkpoint",
        refId: w.subtopicSlug,
        refKind: "notes_subtopic",
        metadata: {
          chapterSlug: w.chapterSlug,
          subjectRoute: w.subjectRoute,
          score: w.checkpoint.score,
          total: w.checkpoint.total,
        },
      });
    }
    await logActivityBatch(db, user.id, events);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("notes progress save error", err);
    return NextResponse.json({ error: "Could not save your progress." }, { status: 500 });
  }
}
