/**
 * GET /api/notes/drill (2026-11-15): one page of a notes drill link's questions,
 * for the panel the link opens on the notes page (NotesDrillPanel), so a student
 * practises without leaving the concept they were reading.
 *
 *   ?ids=<up to 20 ids>                 a concept's tagged questions, in that order
 *   ?subtopic=<id>&kind=pyq|all&page=N  a whole topic, paged and ordered as /browse
 *
 * The anon client: PUBLIC questions only, nothing personal, so the CDN keeps a
 * response for a day like the notes page itself. Answers inside the panel go
 * through the card's own free-answer counter, not through here.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { queryQuestions, queryQuestionsByIds, type QuestionRow } from "@/lib/questions/query";
import { EMPTY_FILTERS } from "@/lib/questions/filters";
import { DRILL_PAGE_SIZE, parseDrillRequest } from "@/lib/notes/drillPanel";

const CACHE = "public, s-maxage=86400, stale-while-revalidate=3600";

export async function GET(request: NextRequest) {
  const req = parseDrillRequest(request.nextUrl.searchParams);
  if (!req.ok) return NextResponse.json({ error: req.error }, { status: 400 });

  const client = createSupabaseAnonClient();
  let rows: QuestionRow[];
  let total: number;
  try {
    if (req.mode === "ids") {
      rows = await queryQuestionsByIds(client, req.ids, { withRepeatLines: true });
      total = rows.length;
    } else {
      const result = await queryQuestions(
        client,
        null,
        { ...EMPTY_FILTERS, subtopicIds: [req.subtopicId], kind: req.kind, page: req.page },
        DRILL_PAGE_SIZE,
        { withRepeatLines: true }
      );
      rows = result.rows;
      total = result.totalCount;
    }
  } catch (e) {
    // A page past the end (questions made private since the notes page was
    // cached): PostgREST refuses the range rather than returning nothing.
    if (e instanceof Error && /range not satisfiable/i.test(e.message)) {
      return NextResponse.json({ rows: [], total: 0 }, { headers: { "Cache-Control": CACHE } });
    }
    console.error("notes drill read failed", request.nextUrl.search, e);
    return NextResponse.json({ error: "Could not load these questions." }, { status: 500 });
  }

  return NextResponse.json({ rows, total }, { headers: { "Cache-Control": CACHE } });
}
