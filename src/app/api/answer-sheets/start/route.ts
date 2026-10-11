/**
 * POST /api/answer-sheets/start: begin uploading an answer sheet for one board
 * paper (migration 0153). Returns one signed upload link per file; the browser
 * uploads straight to private storage, then calls ../[id]/submit.
 *
 * The student is the SESSION user. The request is checked before anything is
 * read (validateStartRequest).
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { validateStartRequest } from "@/lib/answerSheets/upload";
import { findPublishedPaper, startSubmission } from "@/lib/answerSheets/service";

export async function POST(request: NextRequest) {
  const parsed = validateStartRequest(await request.json().catch(() => null));
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const { data } = await createSupabaseServerClient().auth.getUser();
  if (!data.user) return NextResponse.json({ error: "Please sign in to upload your answers." }, { status: 401 });

  try {
    const admin = createSupabaseAdminClient();
    const paper = await findPublishedPaper(admin, parsed.value.examSlug, parsed.value.paperSlug);
    if (!paper) return NextResponse.json({ error: "This paper is not available." }, { status: 404 });
    const outcome = await startSubmission(admin, data.user.id, paper.id, parsed.value.files);
    if (outcome.kind === "limit") {
      return NextResponse.json(
        { error: "You have already sent one answer sheet today. Send the next one tomorrow." },
        { status: 409 }
      );
    }
    return NextResponse.json({ ok: true, submissionId: outcome.submissionId, uploads: outcome.uploads });
  } catch (e) {
    console.error("answer sheet start", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "Could not start the upload. Please try again." }, { status: 500 });
  }
}
